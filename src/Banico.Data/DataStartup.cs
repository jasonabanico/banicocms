using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Banico.Core.Repositories;
using Banico.Data.Repositories;
using Banico.Data.Settings;

namespace Banico.Data
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
  }
}