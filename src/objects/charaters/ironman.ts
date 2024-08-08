import Phaser from 'phaser';
import GroupManager from '../../managers/groupManager';
import Group from '../group';
import CollisionZone from '../collisionZone';
import {
  collisionElementConfig,
  healthConfig,
  scaleConfig,
  speedConfig,
} from '../../config';
import { GroupType, ImageTexture, IronmanMode } from '../../enum';

export default class Ironman extends Phaser.Physics.Arcade.Image {
  private speed: number;
  private health: number;
  public mode: IronmanMode;
  public collisionZones!: Group;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    groupManager: GroupManager
  ) {
    super(scene, x, y, texture);

    // 설정
    this.name = 'ironman';
    this.speed = speedConfig.ironman;
    this.health = healthConfig.ironman;
    this.mode = IronmanMode.NORMAL;
    this.collisionZones = groupManager.get(GroupType.COLLISION_ZONES);

    // sprite 추가
    scene.add.existing(this);
    scene.physics.add.existing(this);

    const scale =
      (scene.game.canvas.height * scaleConfig.ironman) / this.height;
    this.setScale(scale).setOrigin(0, 0);

    this.createCollisionZones();
  }

  public getSpeed(): number {
    return this.speed;
  }

  public getHealth() {
    return this.health;
  }

  // 충격 감지 센서 생성
  public createCollisionZones() {
    // 기존 충격 감지 센서 제거
    this.collisionZones.clear(true, true);

    const elements = collisionElementConfig.ironman[this.mode];

    elements.forEach(({ x, y, w, h }) => {
      const collisionZone = new CollisionZone(
        this.scene,
        this.x + this.displayWidth * (x / 100),
        this.y + this.displayHeight * (y / 100),
        ImageTexture.COLLISION_ZONE
      )
        .setSize(this.displayWidth * (w / 100), this.displayHeight * (h / 100))
        .setOffset(0, 0);

      this.collisionZones.add(collisionZone);
    });
  }
}
