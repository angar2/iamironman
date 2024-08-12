import Phaser from 'phaser';
import StateManager from '../stateManager';
import IronmanManager from './ironmanManager';
import RepulsorManager from '../weapons/repulsorManager';
import BeamManager from '../weapons/beamManager';
import Ironman from '../../objects/charaters/ironman';
import { collisionElementConfig, maxConfig, speedConfig } from '../../config';
import { IronmanMode, StateName } from '../../enum';

export default class IronmanControlManager {
  private scene: Phaser.Scene;
  private stateManager: StateManager;
  private ironmanManager: IronmanManager;
  private repulsorManager: RepulsorManager;
  private beamManager: BeamManager;
  private ironman: Ironman;

  constructor(
    scene: Phaser.Scene,
    stateManager: StateManager,
    ironmanManager: IronmanManager,
    repulsorManager: RepulsorManager,
    beamManager: BeamManager
  ) {
    this.scene = scene;
    this.stateManager = stateManager;
    this.ironmanManager = ironmanManager;
    this.repulsorManager = repulsorManager;
    this.beamManager = beamManager;
    this.ironman = ironmanManager.get();
  }

  // 아이언맨 이동
  public updatePosition(isUpdown: boolean, isPlus: boolean) {
    const speed = isPlus ? speedConfig.ironman : -speedConfig.ironman;

    isUpdown
      ? this.ironman.setY(this.ironman.y + speed)
      : this.ironman.setX(this.ironman.x + speed);

    // 이동 제한 범위 설정
    this.setMovementBounds();

    // 아이언맨 충돌 감지 영역 이동
    this.updateCollisionZones();
  }

  // 아이언맨 충돌 감지 영역 이동
  public updateCollisionZones() {
    const elements = collisionElementConfig.heros.ironman[this.ironman.mode];

    this.ironman.collisionZones.children.entries.forEach((child, index) => {
      const zone = child as Phaser.Physics.Arcade.Image;

      // 충돌 영역 위치 업데이트
      zone.setX(
        this.ironman.x + this.ironman.displayWidth * (elements[index].x / 100)
      );
      zone.setY(
        this.ironman.y + this.ironman.displayHeight * (elements[index].y / 100)
      );
    });
  }

  // 이동 제한 범위 설정
  private setMovementBounds() {
    const gameWidth = this.scene.game.canvas.width;
    const gameHeight = this.scene.game.canvas.height;
    const ironmanWidth = this.ironman!.displayWidth;
    const ironmanHeight = this.ironman!.displayHeight;

    // 좌우 경계 확인 및 조정
    if (this.ironman.x - ironmanWidth / 2 < 0)
      this.ironman!.setX(ironmanWidth / 2);
    if (this.ironman.x - ironmanWidth / 2 > gameWidth - ironmanWidth)
      this.ironman!.setX(gameWidth - ironmanWidth / 2);
    if (this.ironman.y - ironmanHeight / 2 < 0)
      this.ironman!.setY(ironmanHeight / 2);
    if (this.ironman.y - ironmanHeight / 2 > gameHeight - ironmanHeight)
      this.ironman!.setY(gameHeight - ironmanHeight / 2);
  }

  // 아이언맨 리펄서 공격
  public attackRepulsor() {
    if (this.stateManager.getState(StateName.IS_BEAM_MODE_ACTIVE)) return;

    // 아이언맨 리펄서 모드 전환
    this.ironmanManager.transform(IronmanMode.REPULSOR);

    // 리펄서 발사
    this.repulsorManager.fire();
  }

  // 아이언맨 빔 공격
  public async attackBeam() {
    if (
      this.stateManager.getState(StateName.IS_BEAM_MODE_ACTIVE) ||
      this.stateManager.getCount(StateName.CURRENT_GAUGE_COUNT) <
        maxConfig.gauge
    )
      return;

    this.stateManager.updateState(StateName.IS_BEAM_MODE_ACTIVE, true);

    // 아이언맨 준비 모드 전환
    await new Promise<void>((resolve) => {
      this.ironmanManager.transform(IronmanMode.GATHER, () => {
        // 빔 발사
        this.beamManager.fire();
        resolve();
      });
    });

    // 아이언맨 빔 모드 전환
    await new Promise<void>((resolve) => {
      this.ironmanManager.transform(IronmanMode.BEAM, () => {
        // 빔 제거
        this.beamManager.remove();
        resolve();
      });
    });
  }
}
