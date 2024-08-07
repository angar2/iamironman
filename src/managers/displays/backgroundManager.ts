import Phaser from 'phaser';
import Background from '../../objects/displays/background';
import { ImageTexture } from '../../enum';
import { speedConfig } from '../../config';

export default class BackgroundManager {
  private scene: Phaser.Scene;
  private backgrounds: Background[];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.backgrounds = [];

    this.create();
  }

  // 배경 생성
  public create() {
    const leftBackground = new Background(
      this.scene,
      0,
      0,
      ImageTexture.BACKGROUND
    ).setOrigin(0, 0);

    const rightBackground = new Background(
      this.scene,
      leftBackground.displayWidth,
      0,
      ImageTexture.BACKGROUND
    ).setOrigin(0, 0);

    this.backgrounds.push(leftBackground, rightBackground);
  }

  // 배경 이동
  public updatePosition() {
    this.backgrounds.forEach((background) => {
      background.x -= speedConfig.background;

      // 화면의 왼쪽 끝을 넘어가면 위치 리셋
      if (background.x <= -background.displayWidth) {
        background.x = background.displayWidth;
      }
    });
  }
}
