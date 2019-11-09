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
        private bool isDebug = false;
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
                    var isSectionAdmin = _accessService.Allowed("admin/sections", false).Result;
                    this.WriteDebugMessage("BanicoMutation: isSectionAdmin " + isSectionAdmin.ToString());
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
                    var isSectionItemAdmin = _accessService.Allowed("admin/sectionItems", false).Result;
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
                    if (_accessService.IsEnabled(contentItem.Module).Result)
                    {
                        if (_accessService.Allowed(contentItem).Result)
                        {
                            this.StampItem(contentItem);
                            var userId = _accessService.GetUserId();
                            var isAdmin = _accessService.IsAdminOrSuperAdmin();
                            return contentItemRepository.AddOrUpdate(contentItem, userId, isAdmin);
                        }
                        else
                        {
                            throw new UnauthorizedAccessException("Add or update of content module " + contentItem.Module + " is not allowed.");
                        }
                    }
                    else
                    {
                        throw new UnauthorizedAccessException("Content module " + contentItem.Module + " is not enabled.");
                    }
                });

            Field<ContentItemType>(
                "deleteContentItem",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                {
                    var id = context.GetArgument<String>("id");
                    var userId = _accessService.GetUserId();
                    var isAdmin = _accessService.IsAdminOrSuperAdmin();
                    return contentItemRepository.Delete(id, userId, isAdmin);
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
                    var isSuperAdmin = _accessService.IsSuperAdmin();
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
                item.Tenant = _accessService.DomainTenant();
            } 
            else
            {
                item.UpdatedBy = user;
                item.UpdatedDate = DateTimeOffset.UtcNow;
            }
        }

        private void WriteDebugMessage(string message)
        {
            if (this.isDebug)
            {
                Console.WriteLine("-----> " + message);
            }
        }
    }
}