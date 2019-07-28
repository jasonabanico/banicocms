using System.Security.Claims;
using GraphQL.Authorization;

namespace Banico.Api.Models
{
    public class GraphQLUserContext : IProvideClaimsPrincipal
    {
        public ClaimsPrincipal User { get; set; }
    }
}