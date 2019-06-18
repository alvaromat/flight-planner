import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansListComponent } from './plans-list.component';
import { PlansService } from '../../services/plans/plans.service';
import { Plan } from '../../model/plan';
import { PlanViewComponent } from '../plan-view/plan-view.component';
import { SharedModule } from '../../shared/shared.module';

describe('PlansListComponent', () => {
  let component: PlansListComponent;
  let fixture: ComponentFixture<PlansListComponent>;
  let plansService: jasmine.SpyObj<PlansService>;
  const fakePlan = { id: 99, name: 'new plan', creation: new Date(), mapId: 1, points: [] } as Plan;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('PlansService', ['getAll', 'remove']);
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [PlansListComponent, PlanViewComponent],
      providers: [
        { provide: PlansService, useValue: spy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansListComponent);
    component = fixture.componentInstance;
    plansService = TestBed.get(PlansService);
  });

  it('should load all the maps on init', () => {
    plansService.getAll.and.returnValue([fakePlan]);
    component.ngOnInit();
    expect(component.plans).toEqual([fakePlan]);
  });

  it('#delete handler should call the plansService remove plan', () => {
    component.ngOnInit();
    component.delete(fakePlan);
    expect(plansService.remove).toHaveBeenCalledWith(fakePlan.id);
  });

  it('#delete handler should reload the plans', () => {
    plansService.getAll.and.returnValue([fakePlan]);
    component.ngOnInit();
    expect(plansService.getAll).toHaveBeenCalledTimes(1);
    component.delete(fakePlan);
    expect(plansService.getAll).toHaveBeenCalledTimes(2);
  });

});
