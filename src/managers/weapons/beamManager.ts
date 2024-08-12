import Phaser from 'phaser';
import StateManager from '../stateManager';
import CollisionHandler from '../../handlers/collisionHandler';
import GroupManager from '../groupManager';
import GaugeManager from '../displays/gaugeManager';
import IronmanManager from '../charaters/ironmanManager';
import EnemyManager from '../charaters/enemyManager';
import Group from '../../objects/dynamics/group';
import Ironman from '../../objects/charaters/ironman';
import Repulsor from '../../objects/weapons/repulsor';
import Beam from '../../objects/weapons/beam';
import Enemy from '../../objects/charaters/enemy';
import { GroupType, ImageTexture, StateName } from '../../enum';
import { collisionElementConfig } from '../../config';

export default class BeamManager {
  private scene: Phaser.Scene;
  private stateManager: StateManager;
  private collisionHandler: CollisionHandler;
  private groupManager: GroupManager;
  private gaugeManager: GaugeManager;
  private enemyManager: EnemyManager;
  private ironman: Ironman;
  private beams: Group;
  private weapons: Group;
  private beam: Beam | null = null;

  constructor(
    scene: Phaser.Scene,
    stateManager: StateManager,
    collisionHandler: CollisionHandler,
    groupManager: GroupManager,
    gaugeManager: GaugeManager,
    ironmanManager: IronmanManager,
    enemyManager: EnemyManager
  ) {
    this.scene = scene;
    this.stateManager = stateManager;
    this.collisionHandler = collisionHandler;
    this.groupManager = groupManager;
    this.gaugeManager = gaugeManager;
    this.enemyManager = enemyManager;
    this.ironman = ironmanManager.get();
    this.beams = groupManager.get(GroupType.BEAMS);
    this.weapons = groupManager.get(GroupType.WEAPONS);
  }

  // 빔 발사
  public fire() {
    // 발사
    const beam = new Beam(this.scene, 0, 0, ImageTexture.BEAM);

    this.beam = beam;
    this.beams.add(this.beam);
    this.weapons!.add(this.beam);

    // 아이언맨 공격 감지 핸들러 등록
    const enemies = this.groupManager
      .get(GroupType.ENEMIES)
      .getChildren() as Enemy[];

    this.collisionHandler.handleAttack(
      beam,
      enemies,
      (enemy: Enemy, weapon: Repulsor | Beam) => {
        // 빌런 데미지 처리
        this.enemyManager.damage(enemy, weapon);

        // 빔 제거
        this.remove();

        // 빔 재생성
        this.fire();
      }
    );
  }

  // 빔 충돌 감지 핸들러 등록
  public updateColliders() {
    const beam = this.beam;
    if (!this.beam) return;

    const enemies = this.groupManager
      .get(GroupType.ENEMIES)
      .getChildren() as Enemy[];
    for (const enemy of enemies) {
      let colliderHandler: Phaser.Physics.Arcade.Collider | null =
        this.scene.physics.add.collider(
          beam!.collisionZones,
          enemy.collisionZones,
          () => {
            // 빌런 데미지 처리
            this.enemyManager.damage(enemy, beam!);
            this.remove();
            this.fire();
          },
          undefined,
          this
        );
      beam!.colliderHandlers.push(colliderHandler);
    }
  }

  // 빔 위치 변경
  public updatePosition() {
    if (!this.ironman || !this.beam) return;

    // 아이언맨의 위치를 기준으로 빔 위치 업데이트
    this.beam.setX(this.ironman.x + this.beam.displayWidth * 0.503);
    this.beam.setY(this.ironman.y + this.beam.displayHeight * -0.88);

    // 빔 충돌 감지 영역 이동
    this.updateCollisionZones(this.beam);
  }

  // 빔 충돌 감지 영역 이동
  public updateCollisionZones(repulsor: Beam) {
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

  // 빔 제거
  public remove() {
    if (!this.beam) return;
    for (const colliderHandler of this.beam.colliderHandlers) {
      colliderHandler.destroy();
    }
    this.beam.collisionZones.clear(true, true);
    this.beam.destroy();
    this.beam = null;
    this.stateManager.updateState(StateName.IS_BEAM_MODE_ACTIVE, false);
    this.gaugeManager.resetGauges();
  }
}
