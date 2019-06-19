using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Banico.Core.Repositories;
using Banico.EntityFrameworkCore.Repositories;
using Banico.EntityFrameworkCore.Settings;

namespace Banico.EntityFrameworkCore
{
  public class DataStartup
  {
    public void ConfigureServices(IConfiguration configuration, IServiceCollection services)
    {
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