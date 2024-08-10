import Phaser from 'phaser';
import GroupManager from '../../managers/groupManager';
import Group from '../group';
import CollisionZone from '../collisionZone';
import { collisionElementConfig, scaleConfig, speedConfig } from '../../config';
import { CollisionZonesGroupType, EnemyWeaponType, ImageTexture } from '../../enum';

export default class UltronRepulsor extends Phaser.Physics.Arcade.Image {
  private speed: number;
  private _type: EnemyWeaponType;
  public collisionZones: Group;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    groupManager: GroupManager
  ) {
    super(scene, x, y, texture);

    // 설정
    this.name = EnemyWeaponType.ULTRON_REPULSOR;
    this._type = EnemyWeaponType.ULTRON_REPULSOR;
    this.speed = speedConfig.ultronRepulsor;
    this.collisionZones = groupManager.getCollisionZones(
      CollisionZonesGroupType.ULTRON_REPULSOR
    );

    // sprite 추가
    scene.add.existing(this);
    scene.physics.add.existing(this);

    const scale =
      (scene.game.canvas.width * scaleConfig.ultronRepulsor) / this.width;
    this.setScale(scale);

    this.createCollisionZones();
  }

  public getType() {
    return this._type;
  }

  public getSpeed() {
    return this.speed;
  }

  // 충격 감지 영역 생성
  public createCollisionZones() {
    // 기존 충격 감지 영역 제거
    this.collisionZones.clear(true, true);

    const elements = collisionElementConfig.weapons[this._type].normal;

    elements.forEach(({ x, y, w, h }) => {
      const collisionZone = new CollisionZone(
        this.scene,
        this.x + this.displayWidth * (x / 100),
        this.y + this.displayHeight * (y / 100),
        0,
        0,
        // ImageTexture.COLLISION_ZONE
      )
        .setSize(this.displayWidth * (w / 100), this.displayHeight * (h / 100))
        // .setOffset(0, 0);

      collisionZone.who = this._type;

      this.collisionZones.add(collisionZone);
      this.collisionZones.updateCollisionParent(this);
    });
  }
}
