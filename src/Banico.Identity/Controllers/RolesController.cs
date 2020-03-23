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
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Banico.Identity.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Authorize(Policy="SuperAdmin")]

    public class RolesController : Controller
    {
        private readonly RoleManager<AppRole> roleManager;
        private readonly IConfiguration _configuration;

        public RolesController(RoleManager<AppRole> roleManager,
            IConfiguration configuration)
        {
            this.roleManager = roleManager;
            _configuration = configuration;
        }

        [HttpGet]
        public List<AppRole> GetAll()
        {
            var result = roleManager.Roles.ToList();
            return result;
        }

        [HttpGet]
        public async Task<AppRole> Get(string id)
        {
            if (!String.IsNullOrEmpty(id))
            {
                return await roleManager.FindByIdAsync(id);
            }
            return new AppRole();
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]AppRole role)
        {
            role.Id = Guid.NewGuid().ToString();
            role.CreatedDate = DateTime.UtcNow;
            IdentityResult result = await roleManager.CreateAsync(role);

            if (!result.Succeeded) {
                return BadRequest(result.Errors);
            }

            return Ok(role);
        }

        [HttpPost]
        public async Task<IActionResult> Update(string id, [FromBody]AppRole role)
        {
            if (!string.IsNullOrEmpty(id))
            {
                var exists = await roleManager.FindByIdAsync(id);
                if (exists != null) {
                    IdentityResult result = await roleManager.UpdateAsync(role);

                    if (!result.Succeeded) {
                        return BadRequest(result.Errors);
                    }

                    return Ok(role);
                } 
                else 
                {
                    return BadRequest(role);
                }
            }
            return BadRequest(id);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                AppRole role = await roleManager.FindByIdAsync(id);
                if (role != null)
                {
                    IdentityResult roleRuslt = roleManager.DeleteAsync(role).Result;
                    if (roleRuslt.Succeeded)
                    {
                        return Ok(id);
                    }
                }
            }
            return BadRequest(id);
        }
    }
}
