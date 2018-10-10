using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Banico.Core.Entities;

namespace Banico.Web
{
    [Route("api/[controller]/[action]")]
    [Authorize(Policy="SuperAdmin")]
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
        public async Task<List<AppUser>> GetAll()
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
        public async Task<IActionResult> Add([FromBody] AppUser user, [FromBody] string appRoleId)
        {
            IdentityResult result = await userManager.CreateAsync(user);
            if (result.Succeeded)
            {
                AppRole role = await roleManager.FindByIdAsync(appRoleId);
                if (role != null)
                {
                    IdentityResult roleResult = await userManager.AddToRoleAsync(user, role.Name);
                    if (roleResult.Succeeded)
                    {
                        return Ok(user);
                    }
                } else {
                    return Ok(user);
                }
            } else {
                return BadRequest(result.Errors);
            }

            return BadRequest("");
        }

        [HttpPost]
        public async Task<IActionResult> Update([FromBody] AppUser user, [FromBody] string appRoleId)
        {
            if (user != null)
            {
                var userRole = await userManager.GetRolesAsync(user);
                string existingRole = string.Empty;
                string existingRoleId = string.Empty;
                if ((userRole != null) && (userRole.Count() > 0))
                {
                    existingRole = userManager.GetRolesAsync(user).Result.Single();
                    existingRoleId = roleManager.Roles.Single(r => r.Name == existingRole).Id;
                }
                IdentityResult result = await userManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    if (existingRoleId != appRoleId)
                    {
                        if (!string.IsNullOrEmpty(existingRole))
                        {
                            IdentityResult roleResult = await userManager.RemoveFromRoleAsync(user, existingRole);
                            if (!roleResult.Succeeded) {
                                return BadRequest(roleResult.Errors);
                            }
                        }

                        AppRole applicationRole = await roleManager.FindByIdAsync(appRoleId);
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
                            return BadRequest("Role ID is null - " + appRoleId);
                        }
                    } else {
                        return Ok(user);
                    }
                }
                else
                {
                    return BadRequest(result.Errors);
                }
            }

            return BadRequest(user);
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
