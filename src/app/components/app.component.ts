import {Component, provide} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {NavbarComponent} from './navbar.component';
import {ToolbarComponent} from './toolbar.component';
import {HomeComponent} from '../../home/components/home.component';
import {AboutComponent} from '../../about/components/about.component';

import {AsyncService} from '../../shared/services/async-services/async-service.service';
import {BpRestfulService} from '../../shared/services/async-services/bp-restful-async-service.service';

import {BpRestfulCommandBuilder} from '../../shared/services/commands/builders/bp-restful-command-builder.service';

import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';


import {provideStore} from '@ngrx/store';
import {API_URL} from '../../shared/config/config';
import {parentReducer} from '../../shared/services/reducers/parent.reducer';
import {ParentModel} from '../../shared/services/models/parent.model';

import {RestfulGateway} from '../../shared/services/gateways/restful-gateway.service';

import {HTTP_PROVIDERS} from 'angular2/http';
import {BP_HTTP} from '../../shared/services/channels/bp-http.channel';
import {AuthHttp, AuthConfig} from 'angular2-jwt/angular2-jwt';

const API_SCHEMA = 'http:';
const API_HOST = 'localhost:3000';
const API_PATH = 'v1';

// const getDefaultToken = () => {
//   return btoa(JSON.stringify({
//     typ: 'JWT',
//     alg: 'none'
//   })) + '.' + btoa(JSON.stringify({
//     aud: 'guest',
//     sub: 'guest'
//   })) + '.';
// };

const providers = [
  provide(AsyncService, { useClass: BpRestfulService, multi: true }),
  BpRestfulCommandBuilder,
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provideStore({ parent: parentReducer }),
  ParentModel,
  RestfulGateway,
  provide(API_URL, { useValue: `${API_SCHEMA}//${API_HOST}/${API_PATH}` }),
  provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' }),
  provide(AuthConfig, {
    useValue: new AuthConfig({
      noJwtError: 'No JWT'
    })
  }),
  provide(BP_HTTP, { useClass: AuthHttp })
];

@Component({
  selector: 'sd-app',
  moduleId: module.id,
  templateUrl: './app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent, ToolbarComponent],
  providers
})
@RouteConfig([
  { path: '/',      name: 'Home',  component: HomeComponent  },
  { path: '/about', name: 'About', component: AboutComponent }
])
export class AppComponent {}
