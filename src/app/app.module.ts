import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { PhasesSectionComponent } from './components/home/sections/phases-section/phases-section.component';
import { TestModuleComponent } from './components/test-module/test-module.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TestSelectionComponent } from './components/test-module/test-selection/test-selection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PageTitleComponent } from './components/common/page-title/page-title.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './login/login.component';
import { VerifyEmailComponent } from './login/verify-email/verify-email.component';
import { TestLoginComponent } from './components/test-module/test-login/test-login.component';
import { TestPasswordComponent } from './components/test-module/test-password/test-password.component';
import { NewsComponent } from './components/news/news.component';
import { AddNewsComponent } from './components/news/add-news/add-news.component';
import { NewsDetailsComponent } from './components/news/news-details/news-details.component';
import { EditNewsComponent } from './components/news/edit-news/edit-news.component';
import { ContactComponent } from './components/contact/contact.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    PhasesSectionComponent,
    TestModuleComponent,
    TestSelectionComponent,
    GalleryComponent,
    PageTitleComponent,
    LoginComponent,
    VerifyEmailComponent,
    TestLoginComponent,
    TestPasswordComponent,
    NewsComponent,
    AddNewsComponent,
    NewsDetailsComponent,
    EditNewsComponent,
    ContactComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
