import Phaser from 'phaser';

export default class Score extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string | string[],
    style: Phaser.Types.GameObjects.Text.TextStyle
  ) {
    super(scene, x, y, text, style);

    // 설정
    this.name = 'score';
    this.setDepth(10);

    // sprite 추가
    scene.add.existing(this);
  }

  public getSize() {
    return { width: this.width, height: this.height };
  }
}
