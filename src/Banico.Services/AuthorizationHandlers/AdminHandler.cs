using System.Threading.Tasks;
//using System.Web.Http.Dependencies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authentication;

using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
//using Microsoft.Extensions.Logging.AzureAppServices;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

//using Microsoft.ApplicationInsights.AspNetCore;
using Microsoft.AspNetCore.NodeServices;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using System.Security.Claims;
using Banico.Core.Entities;
using System.IdentityModel.Tokens.Jwt;
// using AspNet.Security.OAuth.LinkedIn;

// using Microsoft.AspNetCore.Http;
// using Microsoft.Extensions.Configuration;
// using Microsoft.Extensions.DependencyInjection;
// using Microsoft.Extensions.DependencyInjection.Abstractions;

namespace Banico.Services
{
    public class AdminHandler : AuthorizationHandler<AdminRequirement>
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly IClaimsService _claimsService;

        public AdminHandler(
            IServiceProvider serviceProvider,
            IClaimsService claimsService)
        {
            _serviceProvider = serviceProvider;
            _claimsService = claimsService;
        }

        public string GetUserId(AuthorizationHandlerContext context)
        {
            return _claimsService.GetUserId(context);
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, AdminRequirement requirement)
        {
            IConfiguration configuration = _serviceProvider.GetService<IConfiguration>();

            if (context.User != null)
            {
                if (context.User.Identity != null)
                {
                    bool isSuperAdmin = _claimsService.IsSuperAdmin(context);
                    if (isSuperAdmin)
                    {
                        context.Succeed(requirement);
                    }
                    else
                    {
                        if (context.User.IsInRole("Admin"))
                        {
                            context.Succeed(requirement);
                        }
                    }
                }
                else
                {
                    Console.WriteLine("CONTEXT.USER.IDENTITY IS NULL!");
                }
            }
            else
            {
                Console.WriteLine("CONTEXT.USER IS NULL!");
            }

            return Task.CompletedTask;
        }
    }
}