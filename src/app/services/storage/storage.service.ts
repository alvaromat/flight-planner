import { Injectable } from '@angular/core';

/** Encapsulates localStorage. Simplifies testing of other services. */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: Storage = window.localStorage;

  get<T>(key: string) {
    return JSON.parse(this.storage.getItem(key)) as T;
  }

  set(key: string, value: any) {
    return this.storage.setItem(key, JSON.stringify(value));
  }
}
