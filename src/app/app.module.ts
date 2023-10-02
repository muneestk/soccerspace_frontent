import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './service/user.service';
import { AdminService } from './service/admin.service';
import { ManagerService } from './service/manager.service';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { CommonInterceptorInterceptor } from './common-interceptor.interceptor';
import {MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { appEffects } from './components/state/app.effects';
import { ManagerListReducer, UserListReducer } from './components/state/app.reducer';
import {MatButtonModule} from '@angular/material/button';
import { NgConfirmModule } from 'ng-confirm-box';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    HttpClientModule,
    // FormsModule,
    // ReactiveFormsModule,
    SocialLoginModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    NgConfirmModule,
    MatTableModule,
    StoreModule.forRoot({
      allUsers : UserListReducer,
      allManagers : ManagerListReducer
   
    }),
     EffectsModule.forRoot([appEffects])

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
