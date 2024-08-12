import Phaser from 'phaser';
import CollisionHandler from '../../handlers/collisionHandler';
import StateManager from '../stateManager';
import GroupManager from '../groupManager';
import IronmanManager from '../charaters/ironmanManager';
import HealthManager from '../displays/healthManager';
import UltronRepulsor from '../../objects/weapons/ultronRepulsor';
import Group from '../../objects/dynamics/group';
import Ironman from '../../objects/charaters/ironman';
import Enemy from '../../objects/charaters/enemy';
import { GroupType, ImageTexture, IronmanMode, StateName } from '../../enum';
import { collisionElementConfig } from '../../config';

export default class UltronRepulsorManager {
  private scene: Phaser.Scene;
  private stateManager: StateManager;
  private collisionHandler: CollisionHandler;
  private ironmanManager: IronmanManager;
  private healthManager: HealthManager;
  private ultronRepulsors: Group;
  private ironman: Ironman;

  constructor(
    scene: Phaser.Scene,
    stateManager: StateManager,
    collisionHandler: CollisionHandler,
    groupManager: GroupManager,
    ironmanManager: IronmanManager,
    healthManager: HealthManager
  ) {
    this.scene = scene;
    this.stateManager = stateManager;
    this.collisionHandler = collisionHandler;
    this.ironmanManager = ironmanManager;
    this.healthManager = healthManager;
    this.ultronRepulsors = groupManager.get(GroupType.ULTORON_REPULSORS);
    this.ironman = ironmanManager.get();
  }

  // 울트론2 리펄서 발사
  public fire(enemy: Enemy) {
    // 리펄서 생성 위치 지정
    const posX = enemy.x - enemy.displayWidth / 1.5;
    const posY = enemy.y - enemy.displayHeight / 3;

    // 리펄서 생성
    const ultronRepulsor = new UltronRepulsor(
      this.scene,
      posX,
      posY,
      ImageTexture.ULTRON_REPULSOR
    );

    // 그룹 추가
    this.ultronRepulsors.add(ultronRepulsor);

    // 아이언맨 피격 감지 핸들러 등록
    this.collisionHandler.handleHit(
      this.ironman,
      ultronRepulsor,
      () => {
        // 아이언맨 모드 변환
        this.ironmanManager.transform(IronmanMode.HIT);

        // 아이언맨 데미지 처리
        this.healthManager.decrease();
      },
      () =>
        !this.stateManager.getState(StateName.IS_INVINCIBLE) &&
        !this.stateManager.getState(StateName.IS_BEAM_MODE_ACTIVE)
    );
  }

  // 울트론2 리펄서 위치 변경
  public updatePosition() {
    if (this.ultronRepulsors.getLength() <= 0) return;

    this.ultronRepulsors!.children.entries.forEach((child) => {
      const repulsor = child as UltronRepulsor;

      const speed = repulsor.getSpeed();

      // 리펄서 이동
      repulsor.x -= speed;

      // 울트론2 리펄서 충돌 감지 영역 이동
      this.updateCollisionZones(repulsor);

      // 화면을 벗어나면 리펄서 제거
      if (repulsor.x < 0) this.remove(repulsor);
    });
  }

  // 울트론2 리펄서 충돌 감지 영역 이동
  public updateCollisionZones(repulsor: UltronRepulsor) {
    const elements =
      collisionElementConfig.weapons[repulsor.getType()]['normal'];

    repulsor.collisionZones.children.entries.forEach((child, index) => {
      const zone = child as Phaser.Physics.Arcade.Image;
      // 충돌 영역 위치 업데이트
      zone.setX(repulsor.x + repulsor.displayWidth * (elements[index].x / 100));
      zone.setY(
        repulsor.y + repulsor.displayHeight * (elements[index].y / 100)
      );
    });
  }

  // 울트론2 리펄서 제거
  private remove(repulsor: UltronRepulsor) {
    for (const colliderHandler of repulsor.colliderHandlers) {
      colliderHandler.destroy();
    }
    repulsor.collisionZones.clear(true, true);
    repulsor.destroy();
  }
}
