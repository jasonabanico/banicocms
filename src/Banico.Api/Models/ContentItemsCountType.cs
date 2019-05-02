using GraphQL.Types;
using Banico.Core.Entities;
using Banico.Core.Repositories;

namespace Banico.Api.Models
{
    public class ContentItemsCountType : ObjectGraphType<ContentItemsCount>
    {
        public ContentItemsCountType()
        {
            Field(x => x.Count, nullable:true);
        }
    }
}