import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { Inject, NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpXhrBackend } from '@angular/common/http';
import { TransferHttpCacheModule } from '@nguniversal/common';
//import { AuthenticateXHRBackend } from './authenticate-xhr.backend';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { IdentityModule } from './identity/identity.module';
import { PipesModule } from './pipes/pipes.module';
import { PluginsModule } from './plugins/plugins.module';
import { SharedModule } from './shared/shared.module';
import { ShellModule } from './shell/shell.module';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/auth/auth.guard';
import { ConfigsService } from './shared/services/configs.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'Banico.Web' }),
    HttpClientModule,
    TransferHttpCacheModule,
    BrowserTransferStateModule,
    FormsModule,
    ReactiveFormsModule,
    ApolloModule,
    HttpLinkModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    AdminModule,
    IdentityModule,
    PipesModule,
    PluginsModule,
    SharedModule,
    ShellModule
  ],
  providers: [
    Location, 
    AuthService,
    ConfigsService,
    AuthGuard, {
      provide: LocationStrategy, 
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModuleShared { 
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
    ,@Inject('BASE_URL') private baseUrl: string
  ) { 
    apollo.create({
      link: httpLink.create({ uri: baseUrl + 'api/GraphQL' }),
      cache: new InMemoryCache()
    });
  }
}
