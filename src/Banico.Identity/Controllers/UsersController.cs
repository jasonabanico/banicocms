using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Banico.Core.Entities;
using Banico.Identity.ViewModels.Users;

namespace Banico.Web
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Authorize(Policy="Admin")]
    public class UsersController : Controller
    {
        private readonly UserManager<AppUser> userManager;
        private readonly RoleManager<AppRole> roleManager;
        private readonly IConfiguration _configuration;

        public UsersController(
            UserManager<AppUser> userManager, 
            RoleManager<AppRole> roleManager,
            IConfiguration configuration)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
        }


        [HttpGet]
        public List<AppUser> GetAll()
        {
            var result = userManager.Users.ToList();
            return result;
        }

        [HttpGet]
        public async Task<AppUser> Get(string id)
        {
            if (!String.IsNullOrEmpty(id))
            {
                return await userManager.FindByIdAsync(id);
            }
            return new AppUser();
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] AppUser user)
        {
            IdentityResult result = await userManager.CreateAsync(user);
            if (result.Succeeded)
            {
                return Ok(user);
            } else {
                return BadRequest(result.Errors);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Update([FromBody] AppUser user)
        {
            if (user != null)
            {
                user = await this.UpdateUser(user);
                IdentityResult result = await userManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    return Ok(user);
                }
                else
                {
                    return BadRequest(result.Errors);
                }
            }

            return BadRequest(user);
        }

        [HttpGet]
        public async Task<string> GetUserRole(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            var userRole = await userManager.GetRolesAsync(user);
            string existingRole = string.Empty;
            string existingRoleId = string.Empty;
            if ((userRole != null) && (userRole.Count() > 0))
            {
                existingRole = userManager.GetRolesAsync(user).Result.Single();
                existingRoleId = roleManager.Roles.Single(r => r.Name == existingRole).Id;
            }

            return existingRoleId;
        }

        [HttpPost]
        public async Task<IActionResult> UpdateRole([FromBody] UpdateRoleModel model)
        {
            var user = await userManager.FindByIdAsync(model.Id);
            if (user != null)
            {
                AppRole applicationRole = await roleManager.FindByIdAsync(model.RoleId);
                if (applicationRole != null)
                {
                    IdentityResult newRoleResult = await userManager.AddToRoleAsync(user, applicationRole.Name);
                    if (newRoleResult.Succeeded)
                    {
                        return Ok(user);
                    }
                    else
                    {
                        return BadRequest(newRoleResult.Errors);
                    }
                } else {
                    return BadRequest("Role ID is null - " + model.RoleId);
                }
            }

            return BadRequest(user);
        }

        private async Task<AppUser> UpdateUser(AppUser user)
        {
            AppUser storedUser = await userManager.FindByIdAsync(user.Id);
            storedUser.FirstName = user.FirstName;
            storedUser.LastName = user.LastName;
            storedUser.Alias = user.Alias;
            storedUser.Email = user.Email;

            return storedUser;
        }

        [HttpPost]
        public async Task<IActionResult> Delete(string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                AppUser user = await userManager.FindByIdAsync(id);
                if (user != null)
                {
                    IdentityResult result = await userManager.DeleteAsync(user); 
                    if (result.Succeeded)
                    {
                        return Ok(id);
                    }
                }
            }
            return BadRequest(id);
        }
    }
}
