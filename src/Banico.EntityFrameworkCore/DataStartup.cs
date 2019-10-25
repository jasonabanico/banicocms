using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Banico.Core.Repositories;
using Banico.EntityFrameworkCore.Repositories;
using Banico.EntityFrameworkCore.Settings;
using System;
using kedzior.io.ConnectionStringConverter;

namespace Banico.EntityFrameworkCore
{
  public class DataStartup
  {
    public void ConfigureServices(IConfiguration configuration, IServiceCollection services)
    {
      string appDbContextConnectionString = configuration.GetConnectionString("AppDbContext");

      // Override with Azure connection string if exists
      var azureConnectionStringEnvironmentVariable = configuration["AzureConnectionStringEnvironmentVariable"];
      if (!string.IsNullOrEmpty(azureConnectionStringEnvironmentVariable))
      {
          appDbContextConnectionString = Environment.GetEnvironmentVariable(azureConnectionStringEnvironmentVariable);
          appDbContextConnectionString = AzureMySQL.ToMySQLStandard(appDbContextConnectionString);
      }

      var provider = configuration["AppDbProvider"];
      if (string.IsNullOrEmpty(provider))
      {
          provider = "sqlite";
      }
      switch(provider.ToLower())
      {
          case "mssql":
              services.AddDbContext<AppDbContext>(options =>
                  options.UseSqlServer(appDbContextConnectionString,
                  optionsBuilder => optionsBuilder.MigrationsAssembly("Banico.EntityFrameworkCore")));
              break;
          case "mysql":
              services.AddDbContext<AppDbContext>(options =>
                  options.UseMySql(appDbContextConnectionString,
                  optionsBuilder => optionsBuilder.MigrationsAssembly("Banico.EntityFrameworkCore")));
              break;
          case "sqlite":
              if (string.IsNullOrEmpty(appDbContextConnectionString))
              {
                  var connectionStringBuilder = new Microsoft.Data.Sqlite.SqliteConnectionStringBuilder { DataSource = "banico.db" };
                  appDbContextConnectionString = connectionStringBuilder.ToString();
              }
              services.AddDbContext<AppDbContext>(options =>
                  options.UseSqlite(appDbContextConnectionString,
                  optionsBuilder => optionsBuilder.MigrationsAssembly("Banico.EntityFrameworkCore")));
              break;
      }

      services.AddOptions();
      services.AddScoped<IInviteRepository, InviteRepository>();
      services.AddScoped<ISectionRepository, SectionRepository>();
      services.AddScoped<ISectionItemRepository, SectionItemRepository>();
      services.AddScoped<IContentItemRepository, ContentItemRepository>();
      services.AddScoped<IConfigRepository, ConfigRepository>();
    }

    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
      {
        var context = serviceScope.ServiceProvider.GetRequiredService<AppDbContext>();
        context.Database.Migrate();
      }
    }
  }
}