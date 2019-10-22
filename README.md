# Banico CMS is a lean modular system for building content, communication, collaboration, commerce, and community platforms, with ASP.Net Core, Angular, and Bootstrap.

http://banico.org

Prerequisites:

<ul>
    <li>Git: https://git-scm.com/downloads</li>
    <li>.Net Core SDK: https://dotnet.microsoft.com/download</li>
    <li>NodeJS and NPM: https://nodejs.org/en/</li>
    <li>Visual Studio Code (recommended editor): https://code.visualstudio.com/</li>
    <li>MySQL https://www.mysql.com/downloads/ or SQLite https://sqlite.org/download.html</li> 
    <li>ASP.Net Hosting Environment: https://andrewlock.net/how-to-set-the-hosting-environment-in-asp-net-core/</li>
</ul>

Local Dev Environment Setup:

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

# edit app setting values

# run banico
dotnet run
```

Azure Deployment Notes:

These are some fixes that I had to make to get the app run on Azure Web Apps.

<ul>
    <li>When using "MySQL In App", don't directly use the value in the connection string environment variable. Instead, get its value, then rewrite the connection string using a standard format. https://stackoverflow.com/questions/40549509/asp-net-mvc-application-in-azure-with-mysql-in-app</li>
    <li>Add the setting "WEBSITE_NODE_DEFAULT_VERSION", and providing the highest value available (check Kudu). https://stackoverflow.com/questions/46772705/attempt-to-connect-to-node-timed-out-after-60000ms</li>
</ul>
