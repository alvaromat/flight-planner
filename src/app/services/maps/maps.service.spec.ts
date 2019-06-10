import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';
import { MOCK_MAPS } from './maps.mock';
import { BaseMap } from 'src/app/model/map';

describe('MapsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('#getAll should return the list of maps', () => {
    const service: MapsService = TestBed.get(MapsService);
    expect(service.getAll()).toBe(MOCK_MAPS);
  });

  it('#get should return the correct map from the list of maps', () => {
    const service: MapsService = TestBed.get(MapsService);
    const fakeMap = { id: 5, URI: 'fake', name: 'fake' };
    service.maps = [fakeMap] as BaseMap[];
    expect(service.get(5)).toBe(fakeMap);
  });

});
