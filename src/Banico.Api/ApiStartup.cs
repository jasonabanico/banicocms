using Microsoft.Extensions.DependencyInjection;
using GraphQL;
using GraphQL.Types;
using Banico.Core.Repositories;
using Banico.Data.Repositories;
using Banico.Api.Models;
using Banico.Api.Services;

namespace Banico.Api
{
  public class ApiStartup
  {
    public void ConfigureServices(IServiceCollection services)
    {
      //services.AddSingleton<IDocumentWriter, DocumentWriter>();
      services.AddSingleton<IDocumentExecuter, DocumentExecuter>();
      
      services.AddSingleton<IAccessService, AccessService>();
      services.AddSingleton<BanicoQuery>();
      services.AddSingleton<BanicoMutation>();
      services.AddSingleton<SectionType>();
      services.AddSingleton<SectionInputType>();
      services.AddSingleton<SectionItemType>();
      services.AddSingleton<SectionItemInputType>();
      services.AddSingleton<ContentItemType>();
      services.AddSingleton<ContentItemInputType>();
      services.AddSingleton<ConfigType>();
      services.AddSingleton<ConfigInputType>();

      var sp = services.BuildServiceProvider();
      services.AddSingleton<ISchema>(new BanicoSchema(new FuncDependencyResolver(type => sp.GetService(type))));
    }
  }
}