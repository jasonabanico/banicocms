using System.Security.Claims;

namespace Banico.Api.Models
{
    public class GraphQLUserContext
    {
        public ClaimsPrincipal User { get; set; }
    }
}