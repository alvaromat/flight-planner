import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Plan } from 'src/app/model/plan';

const PLANS_KEY = 'plans';
const PLANS_LAST_ID_KEY = 'plans_last';


@Injectable({
  providedIn: 'root'
})
export class PlansService {

  constructor(private storage: StorageService) {
    const plansExist = storage.get(PLANS_KEY) !== null;
    if (!plansExist) {
      this.initStorage();
    }
  }

  private initStorage() {
    this.storage.set(PLANS_KEY, []);
    this.storage.set(PLANS_LAST_ID_KEY, 0);
  }

  private getLastId() {
    return this.storage.get<number>(PLANS_LAST_ID_KEY);
  }

  getAll() {
    return this.storage.get<Plan[]>(PLANS_KEY);
  }

  create(plan: Plan) {
    const plans = this.getAll();
    const newPlanId = this.getLastId() + 1;

    plan.id = newPlanId;
    plans.unshift(plan);

    this.storage.set(PLANS_KEY, plans);
    this.storage.set(PLANS_LAST_ID_KEY, newPlanId);

    return plan;
  }

  update(updatedPlan: Plan): void {
    const plans = this.getAll();
    const updatedPlanIndex = plans.findIndex(plan => plan.id === updatedPlan.id);

    if (updatedPlanIndex !== -1) {
      plans[updatedPlanIndex] = updatedPlan;
    } else {
      plans.unshift(updatedPlan);
    }

    this.storage.set(PLANS_KEY, plans);
  }
}
