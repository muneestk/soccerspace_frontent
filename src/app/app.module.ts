import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ManagerListReducer, UserListReducer, tournamentListReducer } from './components/state/app.reducer';
import {MatButtonModule} from '@angular/material/button';
import { NgConfirmModule } from 'ng-confirm-box';
import { MatTableModule } from '@angular/material/table';
import { PopupComponent } from './components/popup/popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SocketIoModule } from 'ngx-socket-io';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { environment } from 'src/environments/environment.development';





@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    LoadingSpinnerComponent,
    
   
    
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
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatDividerModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule,
    NgConfirmModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    StoreModule.forRoot({
      allUsers : UserListReducer,
      allManagers : ManagerListReducer ,
      allTournaments : tournamentListReducer
   
    }),
    EffectsModule.forRoot([appEffects]),
     MatSidenavModule,
     SocketIoModule.forRoot({url:"http://localhost:3000"})
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
              environment.NEXT_PUBLIC_Google_API_Key
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
