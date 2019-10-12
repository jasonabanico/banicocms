using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;

namespace Banico.Services
{
    public class ClaimsService : IClaimsService
    {
        private bool isDebug = false;
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
            this.WriteDebugMessage("Getting Username");
            var username = string.Empty;
            if (user != null) 
            {
                this.WriteDebugMessage("User object found");
                if (user.Identity.IsAuthenticated)
                {
                    this.WriteDebugMessage("User authenticated");
                    var nameId = user.FindFirst(ClaimTypes.NameIdentifier);
                    if (nameId == null) {
                        this.WriteDebugMessage("NameIdentifier not found");
                        nameId = user.FindFirst(JwtRegisteredClaimNames.Sub);
                        if (nameId == null) {
                            this.WriteDebugMessage("Sub not found");
                        }
                    }
                    if (nameId != null)
                    {
                        this.WriteDebugMessage("Username is " + nameId.Value);
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
            var isAdmin = user.IsInRole("Admin");
            this.WriteDebugMessage("ClaimsService: IsAdmin role check returns " + isAdmin.ToString());
            return isAdmin;
        }

        public bool IsSuperAdmin(string username)
        {
            this.WriteDebugMessage("ClaimsService: IsSuperAdmin check");
            bool result = false;

            if (!string.IsNullOrEmpty(username))
            {
                string superAdminConfig = _configuration["SuperAdmins"];
                string[] superAdmins = superAdminConfig.Split(',');
                foreach (string superAdmin in superAdmins)
                {
                    this.WriteDebugMessage("ClaimsService: Check if username matches " + superAdmin);
                    if (username == superAdmin)
                    {
                        result = true;
                    }
                }
            }

            this.WriteDebugMessage("ClaimsService: IsSuperAdmin returns " + result);
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
            this.WriteDebugMessage("ClaimsService: Getting user id");
            string id = string.Empty;
            if (user == null)
            {
                return string.Empty;
            }

            if (user.Identity.IsAuthenticated)
            {                
                //userId = user.FindFirst(Helpers.JwtClaimIdentifiers.Id).Value;
                id = user.FindFirst("id").Value;
            }

            this.WriteDebugMessage("ClaimsService: User id is " + id);
            return id;
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