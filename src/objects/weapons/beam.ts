import Phaser from 'phaser';
import CollisionZoneGroup from '../dynamics/collisionZoneGroup';
import CollisionZone from '../dynamics/collisionZone';
import { WeaponType } from '../../enum';
import {
  collisionElementConfig,
  damageConfig,
  scaleConfig,
} from '../../config';

export default class Beam extends Phaser.GameObjects.Image {
  private _type: WeaponType;
  private damage: number;
  public collisionZones!: CollisionZoneGroup;
  public colliderHandlers: Phaser.Physics.Arcade.Collider[] = [];

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    // 설정
    this.name = WeaponType.BEAM;
    this._type = WeaponType.BEAM;
    this.damage = damageConfig.beam;

    // sprite 추가
    scene.add.existing(this);

    const scale = (scene.game.canvas.width * scaleConfig.beam) / this.width;
    this.setScale(scale).setDepth(9);

    this.createCollisionZones();
  }

  public getType() {
    return this._type;
  }

  public getDamage() {
    return this.damage;
  }

  // 충돌 감지 영역 생성
  public createCollisionZones() {
    // 충돌 감지 영역 생성
    this.collisionZones = new CollisionZoneGroup(this.scene, {
      classType: CollisionZone,
      runChildUpdate: true,
    });

    const elements = collisionElementConfig.weapons[this._type].normal;

    elements.forEach(({ x, y, w, h }) => {
      const collisionZone = new CollisionZone(
        this.scene,
        this.x + this.displayWidth * (x / 100),
        this.y + this.displayHeight * (y / 100),
        this.displayWidth * (w / 100),
        this.displayHeight * (h / 100)
      );

      this.collisionZones.add(collisionZone);
    });
  }
}
