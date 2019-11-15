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
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Banico.Core.Repositories;
using Banico.Core.Entities;

namespace Banico.Identity.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ConfigController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IConfigRepository _configRepository;
 
        public ConfigController(
            IConfiguration configuration, 
            IConfigRepository configRepository)
        {
            _configuration = configuration;
            _configRepository = configRepository;
        }

        [HttpPost]
        [Authorize(Policy="SuperAdmin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<bool> SetInitialSettings()
        {
            var result = await _configRepository.SetInitialSettings();
            return result;
        }

        [HttpGet]
        public bool DomainAsTenant()
        {
            return _configuration["DomainAsTenant"] == "y";
        }

        [HttpPost]
        public async Task<Config> Get([FromBody] string id, [FromBody] string module, [FromBody] string name)
        {
            List<Config> results = await _configRepository.Get(id, module, name);
            if (results.Count > 0)
            {
                return results[0];
            }

            return new Config();
        }
    }
}
