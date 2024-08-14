import Phaser from 'phaser';
import CollisionZoneGroup from '../dynamics/collisionZoneGroup';
import CollisionZone from '../dynamics/collisionZone';
import {
  collisionElementConfig,
  damageConfig,
  scaleConfig,
  speedConfig,
} from '../../config';
import { WeaponType } from '../../enum';

export default class Repulsor extends Phaser.GameObjects.Image {
  private speed: number;
  private _type: WeaponType;
  private damage: number;
  private initialPosition: Phaser.Math.Vector2;
  public collisionZones!: CollisionZoneGroup;
  public colliderHandlers: Phaser.Physics.Arcade.Collider[] = [];
  private sound: Phaser.Sound.BaseSound;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    // 설정
    this.name = WeaponType.REPULSOR;
    this._type = WeaponType.REPULSOR;
    this.speed = speedConfig.repulsor;
    this.damage = damageConfig.repulsor;
    this.initialPosition = new Phaser.Math.Vector2(x, y);
    this.sound = this.scene.sound.add('repulsor');

    // sprite 추가
    scene.add.existing(this);

    const scale = (scene.game.canvas.width * scaleConfig.repulsor) / this.width;
    this.setScale(scale);

    this.createCollisionZones();
  }

  public getType() {
    return this._type;
  }

  public getDamage() {
    return this.damage;
  }

  public getSpeed() {
    return this.speed;
  }

  public getInitialPos() {
    return this.initialPosition;
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

  // 사운드 재생
  public playSound() {
    return this.sound.play();
  }
}
