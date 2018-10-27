using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using GraphQL.Types;
using Banico.Core.Entities;
using Banico.Core.Repositories;
using System;

namespace Banico.Api.Models
{
    public class BanicoMutation : ObjectGraphType
    {
        private IHttpContextAccessor _httpContextAccessor { get; set; }

        public BanicoMutation(
            IHttpContextAccessor httpContextAccessor,
            ISectionRepository sectionRepository,
            ISectionItemRepository sectionItemRepository,
            IContentItemRepository contentItemRepository,
            IConfigRepository configRepository
        )
        {
            _httpContextAccessor = httpContextAccessor;

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
                    return sectionRepository.AddOrUpdate(section);
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
                    return sectionItemRepository.AddOrUpdate(sectionItem);
                });

            Field<ContentItemType>(
                "addOrUpdateContentItem",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ContentItemInputType>> { Name = "contentItem" }
                ),
                resolve: context =>
                {
                    var contentItem = context.GetArgument<ContentItem>("contentItem");
                    this.StampItem(contentItem);
                    return contentItemRepository.AddOrUpdate(contentItem);
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
                    return configRepository.AddOrUpdate(config);
                });
        }

        private string GetCurrentUserId()
        {
            ClaimsPrincipal caller = _httpContextAccessor.HttpContext.User;

            if ((caller != null) && (caller.Claims != null)) {
                var userIdClaim = caller.Claims.Single(c => c.Type == "id");
                if (userIdClaim != null) {
                    return userIdClaim.Value;
                }
            }

            return string.Empty;
        }

        private void StampItem(Item item) {
            string user = this.GetCurrentUserId();
            
            if (string.IsNullOrEmpty(item.Id)) {
                item.CreatedBy = user;
                item.CreatedDate = DateTimeOffset.UtcNow;
            } else {
                item.UpdatedBy = user;
                item.UpdatedDate = DateTimeOffset.UtcNow;
            }
        }
    }
}