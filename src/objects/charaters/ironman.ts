import Phaser from 'phaser';
import CollisionZoneGroup from '../dynamics/collisionZoneGroup';
import CollisionZone from '../dynamics/collisionZone';
import {
  collisionElementConfig,
  healthConfig,
  scaleConfig,
  speedConfig,
} from '../../config';
import { HeroType, IronmanMode } from '../../enum';

export default class Ironman extends Phaser.GameObjects.Sprite {
  private _type: HeroType;
  private speed: number;
  private health: number;
  public mode: IronmanMode;
  public collisionZones!: CollisionZoneGroup;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    // 설정
    this.name = HeroType.IRONMAN;
    this._type = HeroType.IRONMAN;
    this.speed = speedConfig.ironman;
    this.health = healthConfig.ironman;
    this.mode = IronmanMode.NORMAL;

    // sprite 추가
    scene.add.existing(this);

    const scale = (scene.game.canvas.width * scaleConfig.ironman) / this.width;
    this.setScale(scale);

    this.createCollisionZones();
  }

  public getSpeed(): number {
    return this.speed;
  }

  public getHealth() {
    return this.health;
  }

  // 충돌 감지 영역 생성
  private createCollisionZones() {
    // 충돌 감지 영역 생성
    this.collisionZones = new CollisionZoneGroup(this.scene, {
      classType: CollisionZone,
      runChildUpdate: true,
    });

    const elements = collisionElementConfig.heros.ironman[this.mode];

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

  // 충돌 감지 영역 업데이트
  public updateCollisionZones() {
    // 기존 충돌 감지 영역 제거
    this.collisionZones.clear(true, true);

    const elements = collisionElementConfig.heros.ironman[this.mode];

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
