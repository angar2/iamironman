import Phaser from 'phaser';
import CollisionHandler from '../../handlers/collisionHandler';
import GroupManager from '../groupManager';
import IronmanManager from '../charaters/ironmanManager';
import EnemyManager from '../charaters/enemyManager';
import Group from '../../objects/dynamics/group';
import Ironman from '../../objects/charaters/ironman';
import Repulsor from '../../objects/weapons/repulsor';
import Beam from '../../objects/weapons/beam';
import Enemy from '../../objects/charaters/enemy';
import {
  collisionElementConfig,
  intervalConfig,
  maxConfig,
} from '../../config';
import { GroupType, ImageTexture } from '../../enum';

export default class RepulsorManager {
  private scene: Phaser.Scene;
  private collisionHandler: CollisionHandler;
  private groupManager: GroupManager;
  private enemyManager: EnemyManager;
  private ironman: Ironman;
  private repulsors: Group;
  private weapons: Group;
  private lastRepulsorFireTime: number;

  constructor(
    scene: Phaser.Scene,
    collisionHandler: CollisionHandler,
    groupManager: GroupManager,
    ironmanManager: IronmanManager,
    enemyManager: EnemyManager
  ) {
    this.scene = scene;
    this.collisionHandler = collisionHandler;
    this.groupManager = groupManager;
    this.enemyManager = enemyManager;
    this.ironman = ironmanManager.get();
    this.repulsors = groupManager.get(GroupType.REPULSORS);
    this.weapons = groupManager.get(GroupType.WEAPONS);
    this.lastRepulsorFireTime = 0;
  }

  // 리펄서 발사
  public fire() {
    if (
      this.repulsors.getLength() >= maxConfig.repulsor ||
      this.scene.time.now <=
        this.lastRepulsorFireTime + intervalConfig.repulsorFireTime
    )
      return;

    // 리펄서 생성 위치 지정
    const posX = this.ironman.x + this.ironman.displayWidth * 0.62;
    const posY = this.ironman.y + this.ironman.displayHeight * -0.33;

    const repulsor = new Repulsor(
      this.scene,
      posX,
      posY,
      ImageTexture.REPULSOR
    );

    // 리펄서 발사 시간 스템프
    this.lastRepulsorFireTime = this.scene.time.now;

    // 그룹 추가
    this.repulsors.add(repulsor);
    this.weapons.add(repulsor);

    // 리펄서 사운드 재생
    repulsor.playSound();

    // 아이언맨 공격 감지 핸들러 등록
    const enemies = this.groupManager
      .get(GroupType.ENEMIES)
      .getChildren() as Enemy[];

    this.collisionHandler.handleAttack(
      repulsor,
      enemies,
      (enemy: Enemy, weapon: Repulsor | Beam) => {
        // 빌런 데미지 처리
        this.enemyManager.damage(enemy, weapon);

        // 리펄서일 경우 제거
        if (weapon instanceof Repulsor) this.remove(weapon);
      }
    );
  }

  // 리펄서 위치 변경
  public updatePosition() {
    if (this.repulsors.getLength() <= 0) return;

    this.repulsors!.children.entries.forEach((child) => {
      const repulsor = child as Repulsor;

      const speed = this.scene.game.canvas.width * repulsor.getSpeed();

      // 리펄서 이동
      repulsor.setX(repulsor.x + speed);

      // 리펄서 충돌 감지 영역 이동
      this.updateCollisionZones(repulsor);

      // 일정 간격/화면을 벗어나면 리펄서 제거
      if (
        repulsor.x > this.scene.game.canvas.width ||
        repulsor.x >
          repulsor.getInitialPos().x +
            this.scene.game.canvas.width * intervalConfig.repulsorFireDistance
      )
        this.remove(repulsor);
    });
  }

  // 리펄서 충돌 감지 영역 이동
  public updateCollisionZones(repulsor: Repulsor) {
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

  // 리펄서 제거
  private remove(repulsor: Repulsor) {
    for (let colliderHandler of repulsor.colliderHandlers) {
      if (colliderHandler) {
        colliderHandler.destroy();
      }
    }
    repulsor.collisionZones.clear(true, true);
    repulsor.destroy();
  }
}
