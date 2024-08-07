import { StateName } from '../enum';

export default class StateManager {
  private isBeamModeActive: boolean;
  private isInvincible: boolean;
  private currentGaugeCount: number;
  constructor() {
    this.isBeamModeActive = false;
    this.isInvincible = false;
    this.currentGaugeCount = 0;
  }

  // 상태 가져오기
  public getState(stateName: StateName) {
    return this[stateName] as boolean;
  }

  // 개수 가져오기
  public getCount(stateName: StateName) {
    return this[stateName] as number;
  }

  // 상태 업데이트
  public updateState(stateName: StateName, value: boolean) {
    (this as any)[stateName] = value;
  }

  // 개수 업데이트
  public updateCount(stateName: StateName, value: number) {
    (this as any)[stateName] = value;
  }
}
