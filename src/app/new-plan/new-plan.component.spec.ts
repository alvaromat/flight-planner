import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlanComponent } from './new-plan.component';
import { MapsService } from '../services/maps/maps.service';
import { MOCK_MAPS } from '../services/maps/maps.mock';
import { SharedModule } from '../shared/shared.module';

describe('NewPlanComponent', () => {
  let component: NewPlanComponent;
  let fixture: ComponentFixture<NewPlanComponent>;
  let mapsSpy: jasmine.SpyObj<MapsService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('MapsService', ['getAll']);

    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [NewPlanComponent],
      providers: [{ provide: MapsService, useValue: spy }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPlanComponent);
    component = fixture.componentInstance;
    mapsSpy = TestBed.get(MapsService);
  });

  it('should get the maps on init', () => {
    mapsSpy.getAll.and.returnValue(MOCK_MAPS);
    component.ngOnInit();
    expect(component.maps).toBe(MOCK_MAPS);
  });

  it('should select the first map returned by the service', () => {
    mapsSpy.getAll.and.returnValue(MOCK_MAPS);
    component.ngOnInit();
    expect(component.form.controls.map.value).toBe(MOCK_MAPS[0]);
  });
});
