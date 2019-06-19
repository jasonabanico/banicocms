using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq.Expressions;
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Banico.Core.Entities;
using Banico.Core.Repositories;
using Banico.EntityFrameworkCore.Settings;

namespace Banico.EntityFrameworkCore.Repositories
{
    public class ConfigRepository : IConfigRepository
    {
        public IConfiguration Configuration { get; set; }
        public AppDbContext DbContext { get; set; }

        public ConfigRepository(IConfiguration configuration, AppDbContext dbContext)
        {
            this.Configuration = configuration;
            this.DbContext = dbContext;
        }

        private async Task<Config> GetIsInitialized()
        {
            List<Config> initConfigs = await this.Get(string.Empty, string.Empty, "initialized");

            Config initConfig = new Config();
            if (initConfigs.Count > 0)
            {
                return initConfigs[0];
            }

            return new Config();
        }

        public async Task<bool> IsInitialized()
        {
            Config isInitialized = await this.GetIsInitialized();

             if ((string.IsNullOrEmpty(isInitialized.Value)) || (isInitialized.Value == "n"))
            {
                return false;
            }

            return true;
        }

        private List<Config> GetInitialSettings()
        {
            var configInitialSettings = new ConfigInitialSettings();
            this.Configuration.Bind(nameof(ConfigInitialSettings), configInitialSettings);
            string[] configs = configInitialSettings.Configs;

            List<Config> output = new List<Config>();

            foreach (string config in configs)
            {
                string[] configElements = config.Split(","[0]);
                Config initialConfig = new Config();
                initialConfig.Module = configElements[0];
                initialConfig.Name = configElements[1];
                initialConfig.Value = configElements[2];
                output.Add(initialConfig);
            }

            return output;
        }

        public async Task<bool> SetInitialSettings() 
        {
            bool initialized = await this.IsInitialized();

            if (!initialized)
            {
                List<Config> initialConfigs = this.GetInitialSettings();

                foreach (Config initialConfig in initialConfigs)
                {
                    await this.AddOrUpdate(initialConfig);
                }

                Config initConfig = await this.GetIsInitialized();
                initConfig.Value = "y";
                await this.AddOrUpdate(initConfig);
            }

            return true;
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