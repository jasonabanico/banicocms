using GraphQL.Types;
using Banico.Core.Entities;
using Banico.Core.Repositories;

namespace Banico.Api.Models
{
    public class MaxPageSizeType : ObjectGraphType<MaxPageSize>
    {
        public MaxPageSizeType()
        {
            Field(x => x.Count,  nullable:true);
        }
    }
}