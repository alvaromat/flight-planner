import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MapsService } from '../services/maps/maps.service';
import { BaseMap } from '../model/map';

@Component({
  selector: 'app-new-plan',
  templateUrl: './new-plan.component.html',
  styleUrls: ['./new-plan.component.scss']
})
export class NewPlanComponent implements OnInit {

  maps: BaseMap[];

  form = new FormGroup({
    name: new FormControl(''),
    map: new FormControl()
  });

  constructor(private mapsService: MapsService) { }

  ngOnInit() {
    this.maps = this.mapsService.getAll();
    this.form.controls.map.setValue(this.maps[0]);
  }

}
