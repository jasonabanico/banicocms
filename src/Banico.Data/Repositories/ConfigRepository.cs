using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq.Expressions;
using System;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Banico.Core.Entities;
using Banico.Core.Repositories;

namespace Banico.Data.Repositories
{
    public class ConfigRepository : IConfigRepository
    {
        public AppDbContext DbContext { get; set; }

        public ConfigRepository(
            AppDbContext dbContext
        )
        {
            this.DbContext = dbContext;
        }

        public async Task<Config> Get(
            string id,
            string module,
            string name)
        {
            var configs = from config in this.DbContext.Configs
                where 
                    (config.Id == id || 
                        string.IsNullOrEmpty(id)) &&
                    (config.Module == module || 
                        string.IsNullOrEmpty(module)) &&
                    (config.Name == name ||
                        string.IsNullOrEmpty(name))
                select config;
 
            return await configs.FirstOrDefaultAsync();
        }

        public async Task<List<Config>> GetAll()
        {
            var configs = from config in this.DbContext.Configs
                select config;
 
            return await configs.ToListAsync<Config>();
        }

        public async Task<Config> AddOrUpdate(Config config)
        {
            if (string.IsNullOrEmpty(config.Id)) 
            {
                return await this.Add(config);
            }
            else
            {
                return await this.Update(config);
            }
        }

        public async Task<Config> Add(Config config)
        {
            config.Id = Guid.NewGuid().ToString();
            this.DbContext.Configs.Add(config);
            var result = await this.DbContext.SaveChangesAsync();

            if (result > 0)
            {
                return config;
            }

            return new Config();
        }

        public async Task<Config> Update(Config config)
        {
            var storedConfig = (await this.Get(config.Id,
                string.Empty, string.Empty));

            if (storedConfig != null)
            {
                storedConfig.Name = config.Name;
                storedConfig.Value = config.Value;
                
                var result = await this.DbContext.SaveChangesAsync();

                if (result > 0)
                {
                    return config;
                }
            }

            return new Config();
        }

        public async Task<Config> Delete(string id)
        {
            var config = await this.Get(id, string.Empty, string.Empty);
            this.DbContext.Remove(config);
            var result = await this.DbContext.SaveChangesAsync();

            if (result > 0)
            {
                return config;
            }

            return new Config();
        }

    }
}