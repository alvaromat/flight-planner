import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlanComponent } from './new-plan.component';
import { MapsService } from '../../services/maps/maps.service';
import { MOCK_MAPS } from '../../services/maps/maps.mock';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { PlansService } from '../../services/plans/plans.service';
import { Router } from '@angular/router';

describe('NewPlanComponent', () => {
  let component: NewPlanComponent;
  let fixture: ComponentFixture<NewPlanComponent>;
  let mapsService: jasmine.SpyObj<MapsService>;
  let plansService: jasmine.SpyObj<PlansService>;

  const fakeMap = MOCK_MAPS[0];

  beforeEach(async(() => {
    const mapsSpy = jasmine.createSpyObj('MapsService', ['getAll']);
    const plansSpy = jasmine.createSpyObj('PlansService', ['create']);
    const router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      declarations: [NewPlanComponent],
      providers: [
        { provide: MapsService, useValue: mapsSpy },
        { provide: PlansService, useValue: plansSpy },
        { provide: Router, useValue: router }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPlanComponent);
    component = fixture.componentInstance;
    mapsService = TestBed.get(MapsService);
    plansService = TestBed.get(PlansService);
  });

  it('should get the maps on init', () => {
    mapsService.getAll.and.returnValue(MOCK_MAPS);
    component.ngOnInit();
    expect(component.maps).toBe(MOCK_MAPS);
  });

  it('should select the first map returned by the service', () => {
    mapsService.getAll.and.returnValue(MOCK_MAPS);
    component.ngOnInit();
    expect(component.form.controls.map.value).toBe(MOCK_MAPS[0]);
  });

  it('#addPlan should make a call to the plans service and go to home', () => {
    component.form.patchValue({ map: fakeMap, name: 'name' });
    component.addPlan();
    expect(plansService.create).toHaveBeenCalled();
    const newPlan = plansService.create.calls.first().args[0];
    expect(newPlan.name).toBe('name');
    expect(newPlan.mapId).toBe(fakeMap.id);

    const router = TestBed.get(Router);
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('#cancel should navigate to home', () => {
    const router = TestBed.get(Router);
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('#addPoint should update the form value', () => {
    component.addPoint(50, 50);
    expect(component.form.value.points).toEqual([{ x: 50, y: 50 }]);
  });


});
