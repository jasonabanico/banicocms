using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;

namespace Banico.Services
{
    public class ClaimsService : IClaimsService
    {
        private IConfiguration _configuration;
        public ClaimsService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GetUsername(AuthorizationHandlerContext context)
        {
            var user = context.User;
            return GetUsername(user);
        }

        public string GetUsername(ClaimsPrincipal user)
        {
            var username = string.Empty;
            if (user != null) 
            {
                if (user.Identity.IsAuthenticated)
                {
                    var nameId = user.FindFirst(ClaimTypes.NameIdentifier);
                    if (nameId != null)
                    {
                        username = nameId.Value;
                    }
                }
            }
            return username;
        }

        public bool IsSuperAdmin(AuthorizationHandlerContext context)
        {
            if (context == null)
            {
                return false;
            }

            var user = context.User;
            return IsSuperAdmin(user);
        }
        
        public bool IsAdmin(AuthorizationHandlerContext context)
        {
            if (context == null)
            {
                return false;
            }

            var user = context.User;
            return IsAdmin(user);
        }

        public bool IsSuperAdmin(ClaimsPrincipal user)
        {
            if (user == null)
            {
                return false;
            }

            string username = this.GetUsername(user);
            return IsSuperAdmin(username);
        }

        public bool IsAdmin(ClaimsPrincipal user)
        {
            return user.IsInRole("Admin");
        }

        public bool IsSuperAdmin(string username)
        {
            bool result = false;

            if (!string.IsNullOrEmpty(username))
            {
                string superAdminConfig = _configuration["SuperAdmins"];
                string[] superAdmins = superAdminConfig.Split(',');
                foreach (string superAdmin in superAdmins)
                {
                    if (username == superAdmin)
                    {
                        result = true;
                    }
                }
            }

            return result;
        }

        public string GetUserId(AuthorizationHandlerContext context)
        {
            if (context == null)
            {
                return string.Empty;
            }

            var user = context.User;
            return GetUserId(user);
        }

        public string GetUserId(ClaimsPrincipal user)
        {
            if (user == null)
            {
                return string.Empty;
            }

            if (user.Identity.IsAuthenticated)
            {
                // userId = user.FindFirst(Helpers.JwtClaimIdentifiers.Id).Value;
                return user.FindFirst("id").Value;
            }

            return string.Empty;
        }

    }
}