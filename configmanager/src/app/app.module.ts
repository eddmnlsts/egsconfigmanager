import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ConfigListComponent } from './config/config-list/config-list.component';
import { ConfigEditComponent } from './config/config-edit/config-edit/config-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommandsComponent } from './config/config-list/config-list-commands/config-list-commands/commands/commands.component';

import { NumeroService } from 'src/services/numero.service';
import { ConfigComponent } from './config/config.component';
import { AppService } from 'src/services/app.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GlobalService } from 'src/services/global.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { AlertService } from 'src/services/alert.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { DropdownDirective } from './directives/dropdown.directive';
import { LoginComponent } from './login/login.component';
import { AuthService } from 'src/services/guards/auth.service';
import { AuthGuard } from 'src/services/guards/auth-guard.service';
import { EncryptDecryptService } from 'src/services/encryptDecrypt.service';
import { NgChartsModule } from 'ng2-charts';
import { ChartsComponent } from './dashboard/charts/charts.component';
import { SignupComponent } from './user/signup/signup/signup.component';
import { UserComponent } from './user/user/user/user.component';
import { ImageuploadComponent } from './imageupload/imageupload/imageupload.component';
import { EdituserComponent } from './user/user/edituser/edituser.component';
import { ThirdPartyService } from 'src/services/thirdpartyservice';
import { WidgetsComponent } from './dashboard/widgets/widgets/widgets.component';
import { ActivityhistoryComponent } from './user/user/activityhistory/activityhistory.component';
import { ConfigurationlistComponent } from './configuration/configurationlist/configurationlist.component';
import { DepartmentlistComponent } from './configuration/configurationlist/department/departmentlist/departmentlist.component';
import { PositionlistComponent } from './configuration/configurationlist/position/positionlist/positionlist.component';
import { ClientlistComponent } from './configuration/configurationlist/client/clientlist/clientlist.component';
import { ListComponent } from './configuration/configurationlist/list/list.component';
import { EditComponent } from './configuration/configurationlist/edit/edit.component';
import { ForgotpassComponent } from './user/forgotpass/forgotpass.component';
import { AutoLogoutService } from 'src/services/autologoffservice';
import { UserperdepComponent } from './dashboard/charts/userperdep/userperdep.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    ConfigListComponent,
    ConfigEditComponent,
    CommandsComponent,

    DropdownDirective,
     ConfigComponent,
     PageNotFoundComponent,
     TooltipDirective,
     LoginComponent,
     ChartsComponent,
     SignupComponent,
     UserComponent,
     ImageuploadComponent,
     EdituserComponent,
     WidgetsComponent,
     ActivityhistoryComponent,
     ConfigurationlistComponent,
     DepartmentlistComponent,
     PositionlistComponent,
     ClientlistComponent,
     ListComponent,
     EditComponent,
     ForgotpassComponent,
     UserperdepComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    NgxSpinnerModule.forRoot({type: 'square-jelly-box'}),
    NgxPaginationModule,
    NgChartsModule
  ],
  providers: [GlobalService, AlertService, NumeroService, AuthService, AuthGuard, EncryptDecryptService, ThirdPartyService, AutoLogoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
