import Phaser from 'phaser';
import { EnemyType } from '../../enum';
import { healthConfig, scaleConfig, speedConfig } from '../../config';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  private speed: number;
  private _type: EnemyType;
  private health: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    enemyType: EnemyType
  ) {
    super(scene, x, y, texture);

    // 설정
    this.name = enemyType;
    this.speed = speedConfig[enemyType];
    this._type = enemyType;
    this.health = healthConfig[enemyType];

    // sprite 추가
    scene.add.existing(this);
    scene.physics.add.existing(this);

    const scale =
      (scene.game.canvas.height * scaleConfig[enemyType]) / this.height;
    this.setScale(scale);
  }

  public getType() {
    return this._type;
  }

  public getSpeed() {
    return this.speed;
  }

  public getHealth() {
    return this.health;
  }

  public decreaseHealth(damage: number) {
    // 체력 감소
    this.health -= damage;

    // 체력 소진 여부 반환
    return this.health <= 0;
  }
}
