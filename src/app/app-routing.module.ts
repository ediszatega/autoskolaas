import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TestModuleComponent } from './components/test-module/test-module.component';

const routes: Routes = [
  { path: 'o-nama', component: AboutUsComponent },
  { path: 'testovi', component: TestModuleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
