import { TestBed } from '@angular/core/testing';

import { PlansService } from './plans.service';
import { StorageService } from '../storage/storage.service';
import { Plan } from 'src/app/model/plan';

describe('PlansService', () => {
  let storageService: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    const storage = jasmine.createSpyObj('StorageService', ['get', 'set']);
    TestBed.configureTestingModule({
      providers: [
        { provide: StorageService, useValue: storage }
      ]
    });
    storageService = TestBed.get(StorageService);
  });

  it('#constructor should init the storage if it is empty', () => {
    storageService.get.and.returnValue(null);
    const service: PlansService = TestBed.get(PlansService);
    expect(storageService.set.calls.allArgs()[0]).toEqual(['plans', []], 'should set plans to []');
    expect(storageService.set.calls.allArgs()[1]).toEqual(['plans_last', 0], 'should set plans last id to 0');
  });

  it('#create should add the new plan and should update the last id', () => {
    const fakeStorage = { plans: [], plans_last: 99 };
    storageService.get.and.callFake((key) => fakeStorage[key]);
    storageService.set.and.callFake((key, value) => fakeStorage[key] = value);

    const newPlan = { name: 'new plan', creation: new Date(), mapId: 1, points: [] } as Plan;

    const service: PlansService = TestBed.get(PlansService);
    service.create(newPlan);

    expect(fakeStorage.plans).toEqual([newPlan]);
    expect(fakeStorage.plans_last).toBe(100);
    expect(fakeStorage.plans[0].id).toBe(100);
  });

});
