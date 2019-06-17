import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanViewComponent } from './plan-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MapsService } from 'src/app/services/maps/maps.service';
import { SimpleChanges } from '@angular/core';
import { MOCK_MAPS } from 'src/app/services/maps/maps.mock';
import { Plan } from 'src/app/model/plan';

fdescribe('PlanViewComponent', () => {
  let component: PlanViewComponent;
  let fixture: ComponentFixture<PlanViewComponent>;
  let mapsService: jasmine.SpyObj<MapsService>;

  const fakeMap = MOCK_MAPS[0];
  const fakePlan = { id: 99, name: 'new plan', creation: new Date(), mapId: 1, points: [] } as Plan;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('MapsService', ['get']);
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [PlanViewComponent],
      providers: [
        { provide: MapsService, useValue: spy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanViewComponent);
    mapsService = TestBed.get(MapsService);
    component = fixture.componentInstance;
  });

  it('should fetch the correct map from the mapService on ngOnChanges', () => {
    const changes: SimpleChanges = {
      plan: {
        previousValue: undefined,
        currentValue: fakePlan,
        firstChange: true,
        isFirstChange: () => true
      }
    } as SimpleChanges;
    mapsService.get.and.returnValue(fakeMap);
    fixture.detectChanges();
    component.ngOnChanges(changes);
    expect(component.map).toBe(fakeMap);
  });
});
