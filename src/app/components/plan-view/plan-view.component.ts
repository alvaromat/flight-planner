import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Plan } from 'src/app/model/plan';
import { MapsService } from 'src/app/services/maps/maps.service';
import { BaseMap } from 'src/app/model/map';

@Component({
  selector: 'app-plan-view',
  templateUrl: './plan-view.component.html',
  styleUrls: ['./plan-view.component.scss']
})
export class PlanViewComponent implements OnChanges {

  constructor(private mapService: MapsService) { }

  @Input() plan: Plan;
  @Output() delete = new EventEmitter<void>();
  map: BaseMap;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.plan) {
      const mapId = (changes.plan.currentValue as Plan).mapId;
      this.map = this.mapService.get(mapId);
    }
  }

}
