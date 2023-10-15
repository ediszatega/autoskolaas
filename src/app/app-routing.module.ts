import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TestModuleComponent } from './components/test-module/test-module.component';
import { HomeComponent } from './components/home/home.component';
import { TestSelectionComponent } from './components/test-module/test-selection/test-selection.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { LoginComponent } from './login/login.component';
import { VerifyEmailComponent } from './login/verify-email/verify-email.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { TestLoginComponent } from './components/test-module/test-login/test-login.component';
import { TestPasswordComponent } from './components/test-module/test-password/test-password.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { TestGuard } from './shared/guards/test.guard';
import { NewsComponent } from './components/news/news.component';
import { AddNewsComponent } from './components/news/add-news/add-news.component';
import { NewsDetailsComponent } from './components/news/news-details/news-details.component';
import { EditNewsComponent } from './components/news/edit-news/edit-news.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: 'pocetna', pathMatch: 'full' },
  { path: 'pocetna', component: HomeComponent },
  { path: 'o-nama', component: AboutUsComponent },
  { path: 'galerija', component: GalleryComponent },
  { path: 'kontakt', component: ContactComponent },
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
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'verify-email-address',
    component: VerifyEmailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'novosti',
    component: NewsComponent,
  },
  {
    path: 'novosti-dodaj',
    component: AddNewsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'novosti/:id',
    component: NewsDetailsComponent,
  },
  {
    path: 'novosti/:id/uredi',
    component: EditNewsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
