using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using GraphQL.Types;
using Banico.Core.Entities;
using Banico.Core.Repositories;
using Banico.Api.Services;

namespace Banico.Api.Models
{
    public class BanicoMutation : ObjectGraphType
    {
        private IConfiguration _configuration;
        private IConfigRepository _configRepository;
        private IAccessService _accessService;

        public BanicoMutation(
            IConfiguration configuration,
            ISectionRepository sectionRepository,
            ISectionItemRepository sectionItemRepository,
            IContentItemRepository contentItemRepository,
            IConfigRepository configRepository,
            IAccessService accessService
        )
        {
            _configuration = configuration;
            _configRepository = configRepository;
            _accessService = accessService;

            Name = "Mutation";
            
            Field<SectionType>(
                "addOrUpdateSection",
                arguments: new QueryArguments(
                    // <SectionInputType>
                    new QueryArgument<NonNullGraphType<SectionInputType>> { Name = "section" }
                ),
                resolve: context =>
                {
                    var section = context.GetArgument<Section>("section");
                    this.StampItem(section);
                    var isSectionAdmin = _accessService.Allowed("admin/sections").Result;
                    return sectionRepository.AddOrUpdate(section, isSectionAdmin);
                });

            Field<SectionItemType>(
                "addOrUpdateSectionItem",
                arguments: new QueryArguments(
                    // <SectionInputType>
                    new QueryArgument<NonNullGraphType<SectionItemInputType>> { Name = "sectionItem" }
                ),
                resolve: context =>
                {
                    var sectionItem = context.GetArgument<SectionItem>("sectionItem");
                    this.StampItem(sectionItem);
                    var isSectionItemAdmin = _accessService.Allowed("admin/sectionItems").Result;
                    return sectionItemRepository.AddOrUpdate(sectionItem, isSectionItemAdmin);
                });

            Field<ContentItemType>(
                "addOrUpdateContentItem",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ContentItemInputType>> { Name = "contentItem" }
                ),
                resolve: context =>
                {
                    var contentItem = context.GetArgument<ContentItem>("contentItem");
                    if (_accessService.Allowed(contentItem).Result)
                    {
                        this.StampItem(contentItem);
                        var userId = _accessService.GetUserId();
                        var isAdmin = _accessService.IsAdmin().Result;
                        return contentItemRepository.AddOrUpdate(contentItem, userId, isAdmin);
                    }
                    else
                    {
                        return new ContentItem();
                    }
                });

            Field<ConfigType>(
                "addOrUpdateConfig",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ConfigInputType>> { Name = "config" }
                ),
                resolve: context =>
                {
                    var config = context.GetArgument<Config>("config");
                    this.StampItem(config);
                    var isSuperAdmin = _accessService.IsSuperAdmin().Result;
                    return configRepository.AddOrUpdate(config, isSuperAdmin);
                });
        }

        private void StampItem(Item item) 
        {
            string user = _accessService.GetUserId();

            if (string.IsNullOrEmpty(item.Id)) 
            {
                item.CreatedBy = user;
                item.CreatedDate = DateTimeOffset.UtcNow;
            } 
            else 
            {
                item.UpdatedBy = user;
                item.UpdatedDate = DateTimeOffset.UtcNow;
            }
        }


        private async Task<bool> Active(ContentItem contentItem)
        {
            List<Config> config = await _configRepository.Get("", contentItem.Module, "isActive");

            if (config.Count > 0)
            {
                return config[0].Value == "y";
            }

            return false;
        }
     }
}