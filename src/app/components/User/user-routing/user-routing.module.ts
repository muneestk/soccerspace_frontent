import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingRoutingModule } from './user-routing-routing.module';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { UserHomeComponent } from '../user-home/user-home.component';
import { UsernavComponent } from '../usernav/usernav.component';
import { FooterComponent } from '../footer/footer.component';
import { VerifyComponent } from '../verify/verify.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { SigleTournamentDetailsComponent } from '../sigle-tournament-details/sigle-tournament-details.component';
import { RegisterTournamentComponent } from '../register-tournament/register-tournament.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { MatIconModule } from '@angular/material/icon';
import { MytournamentsComponent } from '../mytournaments/mytournaments.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MyTournamentSingleDetailsComponent } from '../my-tournament-single-details/my-tournament-single-details.component';
import { MyTournamentRgisterdTeamsComponent } from '../my-tournament-rgisterd-teams/my-tournament-rgisterd-teams.component';
import { ButtonModule } from 'primeng/button';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { MatSelectModule } from '@angular/material/select';
import { ExploreSideNavComponent } from '../explore-side-nav/explore-side-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule} from '@angular/material/slider';
import {MatListModule} from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxLoadingModule } from 'ngx-loading';
import { FixtureUserComponent } from '../fixture-user/fixture-user.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    UserHomeComponent,
    UsernavComponent,
    FooterComponent,
    VerifyComponent,
    UserProfileComponent,
    SigleTournamentDetailsComponent,
    RegisterTournamentComponent,
    ForgotPasswordComponent,
    MytournamentsComponent,
    MyTournamentSingleDetailsComponent,
    MyTournamentRgisterdTeamsComponent,
    ExploreSideNavComponent,
    FixtureUserComponent


  ],
  imports: [
    CommonModule,
    UserRoutingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxSkeletonLoaderModule,
    GoogleSigninButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    ButtonModule,
    OrganizationChartModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatSliderModule,
    MatAutocompleteModule,
    NgxLoadingModule.forRoot({}),
    CdkAccordionModule
    


  ],
  
})
export class UserRoutingModule { }
