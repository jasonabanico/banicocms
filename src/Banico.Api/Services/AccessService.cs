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
        private IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<AppUser> _userManager;
        private readonly IClaimsService _claimsService;
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
            _configRepository = configRepository;
        }

        public string GetUserId()
        {
            return _claimsService.GetUsername(_httpContextAccessor.HttpContext.User);
        }

        public bool IsUser()
        {
            return !string.IsNullOrEmpty(this.GetUserId());
        }

        public bool IsSuperAdmin()
        {
            return _claimsService.IsSuperAdmin(_httpContextAccessor.HttpContext.User);
        }

        public bool IsAdmin()
        {
            bool isSuperAdmin = this.IsSuperAdmin();

            // to-do: check roles too

            return isSuperAdmin;
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
            return await this.Allowed(contentItem.Module);
        }

        public async Task<bool> Allowed(string module)
        {
            // if (await this.Active(contentItem))
            {
                List<Config> config = await _configRepository.Get("", module + "/manage", "canActivate");

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

        public async Task<string> GetUserDomain()
        {
            var user = await this.GetUser();
            var email = user.Email;
            MailAddress address = new MailAddress(email);
            string host = address.Host;
            var domainParser = new DomainParser(new WebTldRuleProvider());
            var domainName = domainParser.Get(host);

            return domainName.RegistrableDomain;
        }
    }
}
