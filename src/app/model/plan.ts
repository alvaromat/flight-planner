import { Point } from './point';

export interface Plan {
  id: number;
  name: string;
  mapId: number;
  points: Point[];
  creation: Date;
}
