import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManagerHomeComponent } from './components/Manager/manager-home/manager-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './service/user.service';
import { ManagerSignupComponent } from './components/Manager/manager-signup/manager-signup.component';
import { ManagerLoginComponent } from './components/Manager/manager-login/manager-login.component';
import { AdminService } from './service/admin.service';
import { ManagerService } from './service/manager.service';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { VerifyManagerComponent } from './components/Manager/verify-manager/verify-manager.component';
import { CommonInterceptorInterceptor } from './common-interceptor.interceptor';
import {MatIconModule} from '@angular/material/icon';






@NgModule({
  declarations: [
    AppComponent,
    ManagerHomeComponent,
    ManagerSignupComponent,
    ManagerLoginComponent,
    VerifyManagerComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    MatIconModule
  ],
  providers: [
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '80902647843-4966kmts5ceeckm6h4rqdkn6bmctef58.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig
    },
    UserService,
    AdminService,
    ManagerService,
    {provide : HTTP_INTERCEPTORS , useClass : CommonInterceptorInterceptor,multi:true}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class AppModule { }
