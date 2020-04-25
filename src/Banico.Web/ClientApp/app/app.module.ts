import {
  BrowserModule,
  BrowserTransferStateModule
} from "@angular/platform-browser";
import { Inject, NgModule } from "@angular/core";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
  CommonModule
} from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HttpXhrBackend } from "@angular/common/http";
import { TransferHttpCacheModule } from "@nguniversal/common";
//import { AuthenticateXHRBackend } from './authenticate-xhr.backend';
import { ApolloModule, Apollo } from "apollo-angular";
import { DefaultOptions } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { RetryLink } from "apollo-link-retry";
import { InMemoryCache } from "apollo-cache-inmemory";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { MarkdownModule } from "ngx-markdown";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { PipesModule } from "./pipes/pipes.module";
import { PluginsModule } from "./plugins/plugins.module";
import { SharedModule } from "./shared/shared.module";
import { ShellModule } from "./shell/shell.module";
import { AuthService } from "./shared/services/auth.service";
import { AuthGuard } from "./shared/auth/auth.guard";
import { ConfigsService } from "./shared/services/configs.service";
import { ToastrService } from "./shared/services/toastr.service";
import { IdentityAccountModule } from "./identity/account/account.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: "Banico.Web" }),
    HttpClientModule,
    TransferHttpCacheModule,
    BrowserTransferStateModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ApolloModule,
    HttpLinkModule,
    MDBBootstrapModule.forRoot(),
    MarkdownModule.forRoot(),
    AppRoutingModule,
    PipesModule,
    IdentityAccountModule,
    PluginsModule,
    SharedModule,
    ShellModule
  ],
  providers: [
    Location,
    AuthService,
    ConfigsService,
    ToastrService,
    AuthGuard,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModuleShared {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    authService: AuthService,
    @Inject("BASE_URL") private baseUrl: string
  ) {
    const authLink = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token = authService.getToken();
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : ""
        }
      };
    });

    const retryLink = new RetryLink({
      delay: {
        initial: 300,
        max: Infinity,
        jitter: true
      },
      attempts: {
        max: 10,
        retryIf: (error, _operation) => !!error
      }
    });

    const defaultOptions: DefaultOptions = {
      watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "ignore"
      },
      query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all"
      }
    };

    const link = ApolloLink.from([
      retryLink,
      authLink.concat(httpLink.create({ uri: baseUrl + "api/GraphQL" }))
    ]);

    apollo.create({
      link: link,
      cache: new InMemoryCache(),
      defaultOptions: defaultOptions
    });
  }
}
