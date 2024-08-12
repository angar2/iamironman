import Phaser from 'phaser';
import CollisionZone from '../dynamics/collisionZone';
import { collisionElementConfig, scaleConfig, speedConfig } from '../../config';
import { EnemyWeaponType } from '../../enum';
import CollisionZoneGroup from '../dynamics/collisionZoneGroup';

export default class UltronRepulsor extends Phaser.GameObjects.Image {
  private speed: number;
  private _type: EnemyWeaponType;
  public collisionZones!: CollisionZoneGroup;
  public colliderHandlers: Phaser.Physics.Arcade.Collider[] = [];
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    // 설정
    this.name = EnemyWeaponType.ULTRON_REPULSOR;
    this._type = EnemyWeaponType.ULTRON_REPULSOR;
    this.speed = speedConfig.ultronRepulsor;

    // sprite 추가
    scene.add.existing(this);

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
