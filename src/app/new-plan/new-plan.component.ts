import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapsService } from '../services/maps/maps.service';
import { BaseMap } from '../model/map';
import { PlansService } from '../services/plans/plans.service';
import { Plan } from '../model/plan';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-plan',
  templateUrl: './new-plan.component.html',
  styleUrls: ['./new-plan.component.scss']
})
export class NewPlanComponent implements OnInit {

  maps: BaseMap[];

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    map: new FormControl(),
    points: new FormControl([], Validators.required)
  });

  constructor(private mapsService: MapsService, private plansService: PlansService, private router: Router) { }

  ngOnInit() {
    this.maps = this.mapsService.getAll();
    this.form.controls.map.setValue(this.maps[0]);
  }

  addPlan() {
    const formValue = this.form.value;
    const plan: Plan = { name: formValue.name, mapId: formValue.map.id, points: formValue.points, creation: new Date() };
    this.plansService.create(plan);
    this.router.navigate(['']);
  }

  cancel() {
    this.router.navigate(['']);
  }

  addPoint(x: number, y: number) {
    this.form.controls.points.value.push({ x, y });
    this.form.controls.points.updateValueAndValidity();
  }

}
