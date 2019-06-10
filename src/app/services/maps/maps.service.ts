import { Injectable } from '@angular/core';
import { MOCK_MAPS } from './maps.mock';

/**
 * Mimics a service that get Maps from a backend.
 */
@Injectable({
  providedIn: 'root'
})
export class MapsService {

  maps = MOCK_MAPS;

  getAll() {
    return this.maps;
  }

  get(mapId: number) {
    return this.maps.find(map => map.id === mapId);
  }
}
