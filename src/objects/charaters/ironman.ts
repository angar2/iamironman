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

  public createCollisionZones() {
    // 그룹의 모든 객체 제거
    this.collisionZones.clear(true, true);

    const collisionElement = {
      ironman: {
        normal: [
          { x: 34, y: 2, w: 21, h: 11 },
          { x: 13, y: 13, w: 55, h: 12 },
          { x: 0, y: 25, w: 100, h: 12 },
          { x: 30, y: 37, w: 36, h: 12 },
          { x: 26, y: 49, w: 68, h: 15 },
          { x: 20, y: 64, w: 40, h: 5 },
          { x: 10, y: 69, w: 10, h: 31 },
        ],
        repulsor: [
          { x: 56, y: 2, w: 9, h: 5 },
          { x: 27, y: 7, w: 71, h: 17 },
          { x: 40, y: 24, w: 22, h: 8 },
          { x: 30, y: 32, w: 23, h: 15 },
          { x: 22, y: 47, w: 34, h: 15 },
          { x: 12, y: 62, w: 44, h: 10 },
          { x: 10, y: 72, w: 10, h: 6 },
          { x: 6, y: 78, w: 8, h: 10 },
          { x: 2, y: 88, w: 8, h: 10 },
        ],
        hit: [
          { x: 56, y: 2, w: 9, h: 5 },
          { x: 27, y: 7, w: 71, h: 17 },
          { x: 40, y: 24, w: 22, h: 8 },
          { x: 30, y: 32, w: 23, h: 15 },
          { x: 22, y: 47, w: 34, h: 15 },
          { x: 12, y: 62, w: 44, h: 10 },
          { x: 10, y: 72, w: 10, h: 6 },
          { x: 6, y: 78, w: 8, h: 10 },
          { x: 2, y: 88, w: 8, h: 10 },
        ],
        gather: [
          { x: 56, y: 2, w: 9, h: 5 },
          { x: 27, y: 7, w: 71, h: 17 },
          { x: 40, y: 24, w: 22, h: 8 },
          { x: 30, y: 32, w: 23, h: 15 },
          { x: 22, y: 47, w: 34, h: 15 },
          { x: 12, y: 62, w: 44, h: 10 },
          { x: 10, y: 72, w: 10, h: 6 },
          { x: 6, y: 78, w: 8, h: 10 },
          { x: 2, y: 88, w: 8, h: 10 },
        ],
        beam: [
          { x: 56, y: 2, w: 9, h: 5 },
          { x: 27, y: 7, w: 71, h: 17 },
          { x: 40, y: 24, w: 22, h: 8 },
          { x: 30, y: 32, w: 23, h: 15 },
          { x: 22, y: 47, w: 34, h: 15 },
          { x: 12, y: 62, w: 44, h: 10 },
          { x: 10, y: 72, w: 10, h: 6 },
          { x: 6, y: 78, w: 8, h: 10 },
          { x: 2, y: 88, w: 8, h: 10 },
        ],
      },
    };

    const elements = collisionElementConfig.ironman[this.mode];
    // const elements = collisionElement.ironman[this.mode];

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

    // element.forEach(({ x, y, w, h }) => {
    //   this.collisionZones.push(
    //     this.scene.physics.add
    //       .body(
    //         this.x + this.displayWidth * (x / 100),
    //         this.y + this.displayHeight * (y / 100)
    //       )
    //       .setSize(
    //         this.displayWidth * (w / 100),
    //         this.displayHeight * (h / 100)
    //       )
    //     // .setOffset(0.5, 0.5)
    //     // .setImmovable(true)
    //   );
    // });
  }
}
