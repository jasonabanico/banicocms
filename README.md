# Banico CMS is a lean modular system for building content, communication, collaboration, commerce, and community platforms, with ASP.Net Core, Angular, and Bootstrap.

http://banico.org

<ul>
    <li>Get Git: https://git-scm.com/downloads</li>
    <li>Get .Net Core: https://www.microsoft.com/net/core</li>
    <li>Get .Net CLI: https://github.com/dotnet/cli/tree/release/2.0.0#installers-and-binaries</li>
    <li>Get Mono: http://www.mono-project.com/download/</li>
    <li>Get NodeJS and NPM: https://nodejs.org/en/</li>
    <li>Get Visual Studio Code (recommended editor): https://code.visualstudio.com/</li>
    <li>Get SQLite: https://sqlite.org/download.html</li> 
    <li>Set ASP.Net Hosting Environment: https://andrewlock.net/how-to-set-the-hosting-environment-in-asp-net-core/</li>
</ul>

```bash
# clone repository
git clone https://github.com/jasebanico/banicocms

# get and build dependencies
cd banicocms/src/Banico.Web
npm install && npm run build:dev && dotnet restore

# build
dotnet build

# use default settings for now, customize later
cd Config
cp sample.front.component.html front.component.html
cp sample.appsettings.json appsettings.json
cp sample.app.config.ts app.config.ts

# edit app setting values

# create database
cd ..
dotnet ef database update --context AppIdentityDbContext
dotnet ef database update --context AppDbContext

# run banico
dotnet run
```
