import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ShareModule } from './share/share.module';

import { environment } from '../environments/environment';
import { DEMOComponent } from './_demo/demo.component';
import { AppComponent } from './app.component';
import { routes } from './app.routing.module';
import { IpsApiService } from './share/services/ips-api.service';
import { PassPortService, AuthService } from './share/services/auth/auth.service';
import { ReStorageService } from './share/services/storage/storage.service';
import { StorageService } from 'rebirth-storage';
import { RebirthHttpModule } from 'rebirth-http';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent, DEMOComponent
  ],
  imports     : [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ShareModule,
    NgZorroAntdModule,
    RebirthHttpModule,
    RouterModule.forRoot(routes, environment.production ? { preloadingStrategy: PreloadAllModules } : {})
  ],
  providers   : [
    Title,
    PassPortService,
    AuthService,
    ReStorageService,
    StorageService
  ],
  bootstrap   : [ AppComponent ]
})
export class AppModule {
}
