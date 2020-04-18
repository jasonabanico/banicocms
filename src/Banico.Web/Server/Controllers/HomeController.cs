using Banico.Web.Server.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading.Tasks;

namespace Banico.Web.Controllers
{
    public class HomeController : Controller {
        protected readonly IWebHostEnvironment HostingEnvironment;
        protected readonly IConfiguration _configuration;
        public HomeController(
            IWebHostEnvironment hostingEnv,
            IConfiguration configuration
        )
        {
            this.HostingEnvironment = hostingEnv;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<IActionResult> Index () {
            // https://github.com/angular/universal/issues/1587
            // SSR ERROR:
            // Microsoft.AspNetCore.NodeServices.HostingModels.NodeInvocationException: Injector has already been destroyed.
            // Error: Injector has already been destroyed.
            //     at R3Injector.assertNotDestroyed (/www/ClientApp/dist/main-server.js:545:2392)
            //     at R3Injector.get (/www/ClientApp/dist/main-server.js:545:1383)
            //     at NgModuleRef$1.get (/www/ClientApp/dist/main-server.js:1105:812)
            //     at /www/ClientApp/dist/main-server.js:3891:3211
            //     at step (/www/ClientApp/dist/main-server.js:1497:2909)
            //     at Object.next (/www/ClientApp/dist/main-server.js:1497:2194)
            //     at fulfilled (/www/ClientApp/dist/main-server.js:1497:1712)
            //     at ZoneDelegate.invoke (/www/ClientApp/dist/vendor.js:3726:7504)
            //     at Zone.run (/www/ClientApp/dist/vendor.js:3726:2464)
            //     at /www/ClientApp/dist/vendor.js:3733:3352

            // var prerenderResult = await this.Request.BuildPrerender ();

            // this.ViewData["SpaHtml"] = prerenderResult.Html; // our <app-root /> from Angular
            // this.ViewData["Title"] = prerenderResult.Globals["title"]; // set our <title> from Angular
            // this.ViewData["Styles"] = prerenderResult.Globals["styles"]; // put styles in the correct place
            // this.ViewData["Scripts"] = prerenderResult.Globals["scripts"]; // scripts (that were in our header)
            // this.ViewData["Meta"] = prerenderResult.Globals["meta"]; // set our <meta> SEO tags
            // this.ViewData["Links"] = prerenderResult.Globals["links"]; // set our <link rel="canonical"> etc SEO tags
            // this.ViewData["TransferData"] = prerenderResult.Globals["transferData"]; // our transfer data set to window.TRANSFER_CACHE = {};
            // if (!this.HostingEnvironment.IsDevelopment ()) {
            //     this.ViewData["ServiceWorker"] = "<script>'serviceWorker'in navigator&&navigator.serviceWorker.register('/serviceworker')</script>";
            // }

            return View ();
        }

        [HttpGet]
        [Route("sitemap.xml")]
        public IActionResult SitemapXml() => Content($@"<?xml version=""1.0"" encoding=""utf-8""?>
                 <urlset xmlns=""http://www.sitemaps.org/schemas/sitemap/0.9"">
                    <url>
                        <loc>http://localhost:4251/home</loc>
                        <lastmod>{ DateTime.Now.ToString("yyyy-MM-dd")}</lastmod>
                    </url>
                    <url>
                        <loc>http://localhost:4251/counter</loc>
                        <lastmod>{DateTime.Now.ToString("yyyy-MM-dd")}</lastmod>
                    </url>
                    </urlset>", "text/xml");

        public IActionResult Error() => View();
    }
}
