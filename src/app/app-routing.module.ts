import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TestModuleComponent } from './components/test-module/test-module.component';
import { HomeComponent } from './components/home/home.component';
import { TestSelectionComponent } from './components/test-module/test-selection/test-selection.component';
import { LoginComponent } from './login/login.component';
import { VerifyEmailComponent } from './login/verify-email/verify-email.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { TestLoginComponent } from './components/test-module/test-login/test-login.component';
import { TestPasswordComponent } from './components/test-module/test-password/test-password.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { TestGuard } from './shared/guards/test.guard';

const routes: Routes = [
  { path: '', redirectTo: 'pocetna', pathMatch: 'full' },
  { path: 'pocetna', component: HomeComponent },
  { path: 'o-nama', component: AboutUsComponent },
  { path: 'test-login', component: TestLoginComponent },
  {
    path: 'test-password',
    component: TestPasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'testovi',
    component: TestSelectionComponent,
    canActivate: [TestGuard],
  },
  {
    path: 'testovi/:id',
    component: TestModuleComponent,
    canActivate: [TestGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent, canActivate: [AuthGuard] },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'verify-email-address',
    component: VerifyEmailComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
