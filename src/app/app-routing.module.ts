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

const routes: Routes = [
  { path: '', redirectTo: 'pocetna', pathMatch: 'full' },
  { path: 'pocetna', component: HomeComponent },
  { path: 'o-nama', component: AboutUsComponent },
  { path: 'testovi', component: TestSelectionComponent },
  { path: 'testovi/:id', component: TestModuleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
