using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace Banico.Services
{
    public interface IClaimsService
    {
        string GetUsername(AuthorizationHandlerContext context);
        string GetUsername(ClaimsPrincipal user);
        bool IsSuperAdmin(AuthorizationHandlerContext context);
        bool IsSuperAdmin(ClaimsPrincipal user);
        bool IsSuperAdmin(string username);
        string GetUserId(AuthorizationHandlerContext context);
        string GetUserId(ClaimsPrincipal user);
    }
}