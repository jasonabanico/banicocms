using System.IO;
using Banico.EntityFrameworkCore.Settings;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Banico.EntityFrameworkCore
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
    
            var configDefaultSettings = new ConfigDefaultSettings();
            configuration.Bind(nameof(ConfigDefaultSettings), configDefaultSettings);

            return new AppDbContext(configDefaultSettings);
        }

    }
}
