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
    public class SuperAdminHandler : AuthorizationHandler<SuperAdminRequirement>
    {
        private readonly IServiceProvider _serviceProvider;

        public SuperAdminHandler(
            IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public string GetUserId(AuthorizationHandlerContext context)
        {
            var userId = string.Empty;
            var contextUser = context.User;
            if (contextUser != null) 
            {
                if (contextUser.Identity.IsAuthenticated)
                {
                    userId = context.User.FindFirst("id").Value;
                }
            }
            return userId;
        }

        public string GetUsername(AuthorizationHandlerContext context)
        {
            var userId = string.Empty;
            var contextUser = context.User;
            if (contextUser != null) 
            {
                if (contextUser.Identity.IsAuthenticated)
                {
                    userId = context.User.FindFirst(JwtRegisteredClaimNames.Sub).Value;
                }
            }
            return userId;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, SuperAdminRequirement requirement)
        {
            IConfiguration configuration = _serviceProvider.GetService<IConfiguration>();

            Console.WriteLine("1111111");
            if (context.User != null)
            {
                Console.WriteLine("22222222");
                if (context.User.Identity != null)
                {
                    Console.WriteLine("3333333");
                    string username = this.GetUsername(context);
                    Console.WriteLine(username);
            
                    string superAdminConfig = configuration["SuperAdmins"];
                    string[] superAdmins = superAdminConfig.Split(',');
                    foreach (string superAdmin in superAdmins)
                    {
                        Console.WriteLine(superAdmin);
                        if (username == superAdmin)
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