import Phaser from 'phaser';

export default class Gauge extends Phaser.GameObjects.Graphics {
  private width: number;
  private height: number;
  private filled: number;
  private unfilled: number;

  constructor(scene: Phaser.Scene) {
    super(scene);

    // 설정
    this.name = 'gauge';
    this.filled = 0x22b14c;
    this.unfilled = 0x7f7f7f;
    this.width = scene.game.canvas.width * 0.015;
    this.height = this.scene.game.canvas.height * 0.04;
    this.setDepth(10);

    // sprite 추가
    scene.add.existing(this);
  }

  public getSize() {
    return { width: this.width, height: this.height };
  }
  public getColor() {
    return { filled: this.filled, unfilled: this.unfilled };
  }
}
