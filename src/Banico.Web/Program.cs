using Banico.Web;
using Banico.EntityFrameworkCore;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using Microsoft.Extensions.Configuration;

public class Program {
     public static void Main (string[] args) {
         var host = BuildWebHost (args);
         using (var scope = host.Services.CreateScope ()) {
             var services = scope.ServiceProvider;
             try {
                var context = services.GetRequiredService<AppDbContext>();
                // no need to initialize
                // DbInitializer.Initialize(context);
            } catch (Exception ex) {
                 var logger = services.GetRequiredService<ILogger<Program>> ();
                 logger.LogError (ex, "An error occurred while seeding the database.");
             }
         }

         host.Run ();
     }
     public static IWebHost BuildWebHost(string[] args)
     {
        // var configuration = new ConfigurationBuilder()
        //     .AddJsonFile("appsettings.json", false, true)
        //     .Build();
            
        return WebHost.CreateDefaultBuilder(args)
            //.UseConfiguration(configuration)
            .ConfigureAppConfiguration((context, config) =>
            {
                IHostingEnvironment env = context.HostingEnvironment;

                var settingsPath = Path.Combine(Directory.GetCurrentDirectory(), "Config");
                config
                    .SetBasePath(settingsPath)
                    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                    .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true);
            })
            .UseKestrel()
            .UseContentRoot(Directory.GetCurrentDirectory())
            .UseIISIntegration()
            .UseStartup<Startup>()
            .ConfigureKestrel((context, options) =>
            {
                // Set properties and call methods on options
            })
            .Build ();
     }
 }
