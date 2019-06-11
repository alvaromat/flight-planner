import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PlansListComponent } from './plans-list/plans-list.component';
import { NewPlanComponent } from './new-plan/new-plan.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlansListComponent,
    NewPlanComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
