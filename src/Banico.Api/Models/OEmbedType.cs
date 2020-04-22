using GraphQL.Types;
using Banico.Core.Entities;
using Banico.Core.Repositories;

namespace Banico.Api.Models
{
    public class OEmbedType : ObjectGraphType<OEmbed>
    {
        public OEmbedType()
        {
            Field(x => x.Response,  nullable:true);
        }
    }
}