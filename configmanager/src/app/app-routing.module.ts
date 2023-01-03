import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/services/guards/auth-guard.service";
import { ConfigEditComponent } from "./config/config-edit/config-edit/config-edit.component";
import { ConfigListComponent } from "./config/config-list/config-list.component";
import { ConfigComponent } from "./config/config.component";
import { ClientlistComponent } from "./configuration/configurationlist/client/clientlist/clientlist.component";
import { ConfigurationlistComponent } from "./configuration/configurationlist/configurationlist.component";
import { DepartmentlistComponent } from "./configuration/configurationlist/department/departmentlist/departmentlist.component";
import { EditComponent } from "./configuration/configurationlist/edit/edit.component";
import { PositionlistComponent } from "./configuration/configurationlist/position/positionlist/positionlist.component";
import { DashboardComponent } from "./dashboard/dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ForgotpassComponent } from "./user/forgotpass/forgotpass.component";
import { SignupComponent } from "./user/signup/signup/signup.component";
import { UserComponent } from "./user/user/user/user.component";
import { UsersComponent } from "./users/users.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/Dashboard', pathMatch: 'full'},
    {path: 'Dashboard', canActivate: [AuthGuard], component: DashboardComponent},
    {path: 'Numeros', canActivate: [AuthGuard], component: ConfigComponent, children: [
        {path: '', redirectTo: '/Numeros/List', pathMatch: 'full'},
        {path: 'List', component: ConfigListComponent},
        {path: 'New', component: ConfigEditComponent},
        {path: 'Edit/:id', component: ConfigEditComponent}
    ]},
    {path: 'Configuration', canActivate: [AuthGuard], component: ConfigurationlistComponent, children: [
        {path: '', redirectTo: '/Configuration/Position', pathMatch: 'full'},
        {path: 'Position', component: PositionlistComponent},
        {path: 'Department', component: DepartmentlistComponent},
        {path: 'Client', component: ClientlistComponent},
        {path: 'New', component: EditComponent },
        {path: 'Edit', component: EditComponent},
    ]},
    {path: 'Users', canActivate: [AuthGuard], component: UsersComponent},
    {path: 'User', canActivate: [AuthGuard], component: UserComponent},
    {path: 'Signup', component: SignupComponent},
    {path: 'Login', component: LoginComponent},
    {path: 'ForgotPassword', component: ForgotpassComponent},
    {path: 'NotFound', component: PageNotFoundComponent, data: {message: 'Page not found!'}},
    {path: '**', redirectTo: '/NotFound'},
    
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}