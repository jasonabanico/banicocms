using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Banico.Core.Entities;
using Banico.Core.Repositories;
using Microsoft.AspNetCore.Http;
using System;
using Nager.PublicSuffix;
using System.Net.Mail;
using System.IdentityModel.Tokens.Jwt;
using Banico.Services;

namespace Banico.Api.Services
{
    public class AccessService : IAccessService
    {
        private bool isDebug = false;
        private IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<AppUser> _userManager;
        private readonly IClaimsService _claimsService;
        private readonly IConfiguration _configuration;
        private IConfigRepository _configRepository;

        public AccessService(
            IHttpContextAccessor httpContextAccessor,
            IClaimsService claimsService,
            UserManager<AppUser> userManager,
            IConfiguration configuration,
            IConfigRepository configRepository
        )
        {
            _httpContextAccessor = httpContextAccessor;
            _claimsService = claimsService;
            _userManager = userManager;
            _configuration = configuration;
            _configRepository = configRepository;
        }

        public string GetUserId()
        {
            return _claimsService.GetUserId(_httpContextAccessor.HttpContext.User);
        }

        public bool IsUser()
        {
            return !string.IsNullOrEmpty(this.GetUserId());
        }

        public bool IsSuperAdmin()
        {
            return _claimsService.IsSuperAdmin(_httpContextAccessor.HttpContext.User);
        }

        public bool IsAdminOrSuperAdmin()
        {
            bool isSuperAdmin = this.IsSuperAdmin();

            bool isAdmin = this.IsAdmin();

            return isSuperAdmin || isAdmin;
        }

        public bool IsAdmin()
        {
            return _claimsService.IsAdmin(_httpContextAccessor.HttpContext.User);
        }

        private async Task<AppUser> GetUser()
        {
            string userId = this.GetUserId();
            var user = await _userManager.FindByIdAsync(userId);
            return user;
        }

        public string GetUsername()
        {
            return _claimsService.GetUsername(_httpContextAccessor.HttpContext.User);
        }

        public async Task<bool> Allowed(ContentItem contentItem)
        {
            return await this.Allowed(contentItem.Module, true);
        }

        public async Task<bool> IsEnabled(string moduleAndFunction)
        {
            bool result = false;
            var module = moduleAndFunction.Split('/')[0];
            var rootModule = module.Split('-')[0];
            List<Config> config = await _configRepository.Get("", rootModule, "isEnabled");

            if (config.Count > 0)
            {
                if (config[0].Value == "y")
                {
                    result = true;
                }
            }

            this.WriteDebugMessage("AccessService: Checking if enabled " + moduleAndFunction + " returns " + result.ToString());
            return result;
        }

        public async Task<bool> Allowed(string module, bool enabledRequired)
        {
            this.WriteDebugMessage("AccessService: Checking if allowed " + module);
            if (!enabledRequired || await this.IsEnabled(module))
            {
                List<Config> config = await _configRepository.Get("", module + "/manage", "canActivate");

                if (config.Count > 0)
                {
                    string permission = config[0].Value;

                    this.WriteDebugMessage("AccessService: Permission required is " + permission);
                    switch (permission.ToLower())
                    {
                        case "public": return true;
                        case "user": return this.IsUser();
                        case "admin": return this.IsAdminOrSuperAdmin();
                        case "superadmin": return this.IsSuperAdmin();
                    }
                }
            }

            return false;
        }

        public string DomainTenant()
        {
            if (_configuration["DomainAsTenant"] == "y")
            {
                return this.GetUserDomain().Result;
            }

            return string.Empty;
        }

        public async Task<string> GetUserDomain()
        {
            var user = await this.GetUser();

            if (user == null)
            {
                return string.Empty;
            }

            if (!string.IsNullOrEmpty(user.Tenant))
            {
                return user.Tenant;
            }
            
            var email = user.Email;
            MailAddress address = new MailAddress(email);
            string host = address.Host;
            var domainParser = new DomainParser(new WebTldRuleProvider());
            var domainName = domainParser.Get(host);

            return domainName.RegistrableDomain;
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
