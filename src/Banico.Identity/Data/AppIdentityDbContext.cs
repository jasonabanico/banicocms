
using Banico.Core.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Banico.Identity.Data
{
    public class AppIdentityDbContext : IdentityDbContext<AppUser,AppRole, string>
    {
        private readonly bool _isMigration = false;
        private IConfigurationRoot _configuration;

        public AppIdentityDbContext(IConfigurationRoot configuration)
        {
            _isMigration = true;
            _configuration = configuration;
        }

        public AppIdentityDbContext(DbContextOptions options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (_isMigration)
            {
                string connectionString = _configuration.GetConnectionString("AppIdentityDbContext");

                var provider = _configuration["AppDbProvider"];
                if (string.IsNullOrEmpty(provider))
                {
                    provider = "sqlite";
                }
                switch(provider.ToLower())
                {
                    case "mssql":
                        optionsBuilder.UseSqlServer(connectionString);
                        break;
                    case "mysql":
                        optionsBuilder.UseMySql(connectionString);
                        break;
                    case "sqlite":
                        if (string.IsNullOrEmpty(connectionString))
                        {
                            var connectionStringBuilder = new Microsoft.Data.Sqlite.SqliteConnectionStringBuilder { DataSource = "banico-identity.db" };
                            connectionString = connectionStringBuilder.ToString();
                        }
                        optionsBuilder.UseSqlite(connectionString);
                        break;
                }
            }
        }
    }
}
