import Phaser from 'phaser';
import { scaleConfig, speedConfig } from '../../config';
import { WeaponType } from '../../enum';

export default class UltronRepulsor extends Phaser.Physics.Arcade.Image {
  private speed: number;
  private _type: WeaponType;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    // 설정
    this.name = WeaponType.ULTRON_REPULSOR;
    this._type = WeaponType.ULTRON_REPULSOR;
    this.speed = speedConfig.ultronRepulsor;

    // sprite 추가
    scene.add.existing(this);
    scene.physics.add.existing(this);

    const scale =
      (scene.game.canvas.width * scaleConfig.ultronRepulsor) / this.width;
    this.setScale(scale);
  }

  public getType() {
    return this._type;
  }

  public getSpeed() {
    return this.speed;
  }
}
