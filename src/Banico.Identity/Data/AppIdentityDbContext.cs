
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
                var connectionStringBuilder = new Microsoft.Data.Sqlite.SqliteConnectionStringBuilder { DataSource = "banico-identity.db" };
                var connectionString = connectionStringBuilder.ToString();

                var provider = Configuration["AppIdentityDBProvider"];
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
                    case "sqllite":
                        optionsBuilder.UseSqlite(connectionString);
                        break;
            }
        }
    }
}
