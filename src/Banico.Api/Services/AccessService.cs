using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Banico.Core.Entities;
using Banico.Core.Repositories;
using Microsoft.AspNetCore.Http;

namespace Banico.Api.Services
{
    public class AccessService : IAccessService
    {
        private IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _configuration;
        private IConfigRepository _configRepository;

        public AccessService(
            IHttpContextAccessor httpContextAccessor,
            UserManager<AppUser> userManager,
            IConfiguration configuration,
            IConfigRepository configRepository
        )
        {
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
            _configuration = configuration;
            _configRepository = _configRepository;
        }

        public string GetCurrentUserId()
        {
            return _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }

        public bool IsUser()
        {
            return !string.IsNullOrEmpty(this.GetCurrentUserId());
        }

        public bool IsAdmin()
        {
            bool result = false;
            string username = this.GetUsername().Result;

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

        public async Task<string> GetUsername()
        {
            string userId = this.GetCurrentUserId();
            var user = await _userManager.FindByIdAsync(userId);

            return user.UserName;
        }

        public async Task<bool> Allowed(ContentItem contentItem)
        {
            // if (await this.Active(contentItem))
            {
                List<Config> config = await _configRepository.Get("", contentItem.Module + "/manage", "canActivate");

                if (config.Count > 0)
                {
                    string permission = config[0].Value;

                    switch (permission)
                    {
                        case "public": return true;
                        case "user": return this.IsUser();
                        case "admin": return this.IsAdmin();
                    }
                }
            }

            return false;
        }

    }
}
