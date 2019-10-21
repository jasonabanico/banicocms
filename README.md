# Banico CMS is a lean modular system for building content, communication, collaboration, commerce, and community platforms, with ASP.Net Core, Angular, and Bootstrap.

http://banico.org

<ul>
    <li>Get Git: https://git-scm.com/downloads</li>
    <li>Get .Net Core SDK: https://dotnet.microsoft.com/download</li>
    <li>Get NodeJS and NPM: https://nodejs.org/en/</li>
    <li>Get Visual Studio Code (recommended editor): https://code.visualstudio.com/</li>
    <li>Get DB: MySQL https://www.mysql.com/downloads/ or SQLite https://sqlite.org/download.html</li> 
    <li>Set ASP.Net Hosting Environment: https://andrewlock.net/how-to-set-the-hosting-environment-in-asp-net-core/</li>
</ul>

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
