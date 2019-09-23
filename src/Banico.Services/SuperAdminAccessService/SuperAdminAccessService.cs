using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Banico.Core.Entities;
using Banico.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;

namespace Banico.Services
{
    public class SuperAdminAccessService : ISuperAdminAccessService
    {
        public UserManager<AppUser> _userManager;
        public RoleManager<AppRole> _roleManager;
        public IConfiguration _configuration;

        public SuperAdminAccessService (
            UserManager<AppUser> userManager,
            RoleManager<AppRole> roleManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }
        
        public bool IsSuperAdminUsername(string username)
        {
            string superAdminConfig = _configuration["SuperAdmins"];
            if (!string.IsNullOrEmpty(superAdminConfig))
            {
                string[] superAdmins = superAdminConfig.Split(',');
                foreach (string superAdmin in superAdmins)
                {
                    if (username == superAdmin)
                    {
                        return true;
                    }
                }
            }

            return false;
        }

        public async Task<bool> IsSuperAdmin(IPrincipal user)
        {
            string username = ((System.Security.Claims.ClaimsIdentity)user.Identity).
                FindFirst(JwtRegisteredClaimNames.Sub).Value;
            
            if (this.IsSuperAdminUsername(username))
            {
                return true;
            }

            var applicationUser = await _userManager.FindByNameAsync(user.Identity.Name);
            if (applicationUser != null)
            {
                var userRole = _userManager.GetRolesAsync(applicationUser).Result;
                if ((userRole != null) && (userRole.Count() > 0))
                {
                    var role = _roleManager.Roles.Single(r => r.Name == "SuperAdmin");
                    if (role != null)
                    {
                        return true;
                    }
                }
            }

            return false;
        }
    }
}