import { Component, OnInit } from '@angular/core';
import { PlansService } from '../services/plans/plans.service';
import { Plan } from '../model/plan';

@Component({
  selector: 'app-plans-list',
  templateUrl: './plans-list.component.html',
  styleUrls: ['./plans-list.component.scss']
})
export class PlansListComponent implements OnInit {

  plans: Plan[];

  constructor(private plansService: PlansService) { }

  ngOnInit() {
    this.plans = this.plansService.getAll();
  }

  delete(plan: Plan) {
    this.plansService.remove(plan.id);
    this.plans = this.plansService.getAll();
  }

}
