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
import { FormsModule } from '@angular/forms';

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
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
