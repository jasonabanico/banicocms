# Discontinued
This projected is discontinued. The ideas for this CMS is now being implemented in Blazor.
Check out BlazorWorld at https://github.com/blazorworld/blazorworld.

# Banico CMS is a lean modular system for building content, communication, collaboration, commerce, and community platforms, with ASP.Net Core, Angular, and Bootstrap.

http://banico.org

## Prerequisites

<ul>
    <li>Git: https://git-scm.com/downloads</li>
    <li>.Net Core SDK: https://dotnet.microsoft.com/download</li>
    <li>NodeJS and NPM: https://nodejs.org/en/</li>
    <li>Visual Studio Code (recommended editor): https://code.visualstudio.com/</li>
    <li>MySQL https://www.mysql.com/downloads/ or SQLite https://sqlite.org/download.html</li> 
    <li>ASP.Net Hosting Environment: https://andrewlock.net/how-to-set-the-hosting-environment-in-asp-net-core/</li>
</ul>

## Local Dev Environment Setup

```bash
# clone repository
git clone https://github.com/jasebanico/banicocms

# get and build dependencies
cd banicocms/src/Banico.Web
npm install && npm run build:dev && dotnet restore

# use default settings for now, customize later
cd Config
cp sample.home.component.html home.component.html
cp sample.appsettings.json appsettings.json
cp sample.app.config.ts app.config.ts
cp sample._Header.cshtml ../Views/Shared/_Header.cshtml
cp sample._Footer.cshtml ../Views/Shared/_Footer.cshtml

# optional: create environment specific appsettings, such as
# appsettings.development.json or appsettings.production.json

# edit app setting values

# run banico
dotnet run
```

## Azure Web App Deployment Notes

<ul>
    <li>If using Azure DevOps, use azure-pipelines.yml for the build pipeline.</li>
    <li>Add the following Application Settings in your web app Configuration:
        <ul>
            <li>"ASPNETCORE_ENVIRONMENT", and set to "production"</li>
            <li>"WEBSITE_NODE_DEFAULT_VERSION", and provide the highest value available, eg. 10.16.3 (check Kudu). https://stackoverflow.com/questions/46772705/attempt-to-connect-to-node-timed-out-after-60000ms</li>
        </ul>
    </li>
    <li>If using MySQL In App, make sure that it is turned on.</li>
    <li>Restart the app after Initializing the config.</li>
</ul>
