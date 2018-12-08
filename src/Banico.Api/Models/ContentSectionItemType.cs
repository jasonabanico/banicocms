using GraphQL.Types;
using Banico.Core.Entities;
using Banico.Core.Repositories;

namespace Banico.Api.Models
{
    public class ContentSectionItemType : ObjectGraphType<ContentSectionItem>
    {
        public ContentSectionItemType()
        {
            Field(x => x.SectionItem, type:typeof(SectionItemType),  nullable:true);
        }
    }
}