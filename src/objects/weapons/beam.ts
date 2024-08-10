import Phaser from 'phaser';
import GroupManager from '../../managers/groupManager';
import Group from '../group';
import CollisionZone from '../collisionZone';
import { CollisionZonesGroupType, ImageTexture, WeaponType } from '../../enum';
import { collisionElementConfig, damageConfig, scaleConfig } from '../../config';

export default class Beam extends Phaser.Physics.Arcade.Image {
  private _type: WeaponType;
  private damage: number;
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
    this.name = WeaponType.BEAM;
    this._type = WeaponType.BEAM;
    this.damage = damageConfig.beam;
    this.collisionZones = groupManager.getCollisionZones(
      CollisionZonesGroupType.BEAM
    );

    // sprite 추가
    scene.add.existing(this);
    scene.physics.add.existing(this);

    const scale = (scene.game.canvas.width * scaleConfig.beam) / this.width;
    this.setScale(scale).setOrigin(0, 0).setDepth(9);

    this.createCollisionZones();
  }

  public getType() {
    return this._type;
  }

  public getDamage() {
    return this.damage;
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
