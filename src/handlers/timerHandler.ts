import Phaser from 'phaser';
import { timerConfig } from '../config';
import { DurationName, IronmanMode, TimerName } from '../enum';

export default class TimerHandler {
  private scene: Phaser.Scene;

  private repulsorModeTimerEvent: Phaser.Time.TimerEvent | null = null;
  private hitModeTimerEvent: Phaser.Time.TimerEvent | null = null;
  private gatherModeTimerEvent: Phaser.Time.TimerEvent | null = null;
  private beamModeTimerEvent: Phaser.Time.TimerEvent | null = null;
  private hitSetupTimerEvent: Phaser.Time.TimerEvent | null = null;
  private ultron1ModeTimerEvent: Phaser.Time.TimerEvent | null = null;
  private ultronRepulsorFireTimerEvent: Phaser.Time.TimerEvent | null = null;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  // 타이머 이벤트 제거
  public removeTimerEvent(timerName: TimerName) {
    this[timerName]?.destroy();
    this[timerName] = null;
  }

  // 아이언맨 모드 변환 타이머
  public handleIronmanMode(mode: IronmanMode, callback: () => void) {
    // 타이머 제거
    if (this.repulsorModeTimerEvent) this.repulsorModeTimerEvent.remove();
    if (this.hitModeTimerEvent) this.hitModeTimerEvent.remove();

    const names = this.getIronmanTimerDurationName(mode);

    this[names.timerName] = this.scene.time.addEvent({
      delay: timerConfig[names.durationName],
      callback: () => callback(),
      callbackScope: this,
    });
  }

  // 아이언맨 피격 감지 설정(무적 상태) 타이머
  public handleIronmanHitSetup(callback: () => void) {
    this.hitSetupTimerEvent = this.scene.time.addEvent({
      delay: timerConfig.hitSetupDuration,
      callback: () => callback(),
      callbackScope: this,
    });
  }

  // 울트론 공격 모드 변환 타이머
  public handleultronMode(callback: () => void) {
    this.ultron1ModeTimerEvent = this.scene.time.addEvent({
      delay: timerConfig.ultronModeDuration,
      callback: () => callback(),
      callbackScope: this,
    });
  }

  // 울트론2 리펄서 발사 타이머
  public handleultronRepulsorFire(callback: () => void) {
    this.ultronRepulsorFireTimerEvent = this.scene.time.addEvent({
      delay: timerConfig.ultronRepulsorFireDuration,
      callback: () => callback(),
      callbackScope: this,
    });
  }

  // 아이언맨 타이머/지속시간 이름 가져오기
  private getIronmanTimerDurationName(mode: IronmanMode) {
    switch (mode) {
      case IronmanMode.HIT:
        return {
          timerName: TimerName.HIT,
          durationName: DurationName.HIT,
        };
        break;
      case IronmanMode.GATHER:
        return {
          timerName: TimerName.GATHER,
          durationName: DurationName.GATHER,
        };
        break;
      case IronmanMode.BEAM:
        return {
          timerName: TimerName.BEAM,
          durationName: DurationName.BEAM,
        };
        break;
      default:
        return {
          timerName: TimerName.REPULSOR,
          durationName: DurationName.REPULSOR,
        };
    }
  }
}
