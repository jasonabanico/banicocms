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

        public ConfigRepository(AppDbContext dbContext)
        {
            this.DbContext = dbContext;
        }

        public async Task<List<Config>> Get(
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

            return await configs.ToListAsync();
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
            var storedConfigs = (await this.Get(config.Id,
                string.Empty, string.Empty));

            if (storedConfigs.Count() > 0)
            {
                Config storedConfig = storedConfigs[0];
                storedConfig.Name = config.Name;
                storedConfig.Value = config.Value;
                storedConfig.UpdatedBy = config.UpdatedBy;
                storedConfig.UpdatedDate = config.UpdatedDate;
                
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
            var configs = await this.Get(id, string.Empty, string.Empty);
            if (configs.Count() > 0)
            {
                Config config = configs[0];
                this.DbContext.Remove(config);
                var result = await this.DbContext.SaveChangesAsync();

                if (result > 0)
                {
                    return config;
                }
            }

            return new Config();
        }

    }
}