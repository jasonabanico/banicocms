
using Banico.Core.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Banico.Identity.Data
{
    public class AppIdentityDbContext : IdentityDbContext<AppUser,AppRole, string>
    {
        private readonly bool isMigration = false;
        private IConfigurationRoot Configuration;

        public AppIdentityDbContext(IConfigurationRoot configuration)
        {
            isMigration = true;
            Configuration = configuration;
        }

        public AppIdentityDbContext(DbContextOptions options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (isMigration)
            {
                string connectionString = this.Configuration.GetConnectionString("AppIdentityDbContext");

                var provider = Configuration["AppDbProvider"];
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
