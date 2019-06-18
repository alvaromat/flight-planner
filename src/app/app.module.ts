import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PlansListComponent } from './components/plans-list/plans-list.component';
import { NewPlanComponent } from './components/new-plan/new-plan.component';
import { SharedModule } from './shared/shared.module';
import { PlanViewComponent } from './components/plan-view/plan-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlansListComponent,
    NewPlanComponent,
    PlanViewComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'new', component: NewPlanComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
