import Phaser from 'phaser';
import SceneManager from '../managers/sceneManager';
import { ImageTexture } from '../enum';

export default class BackScene extends Phaser.Scene {
  private sceneManager: SceneManager = SceneManager.getInstance();

  constructor() {
    super({ key: 'BackScene' });
  }

  preload() {
    this.load.setBaseURL('images');

    Object.entries(ImageTexture).forEach(([key, value]) => {
      this.load.image(value, `${value}.png`);
    });
  }

  create() {
    // 배경 생성
    this.sceneManager.setBackground(this);

    // 씬 런치
    this.scene.launch('IntroScene');
  }

  update() {
    // 배경 이동
    this.sceneManager.backgroundManager.updatePosition();

    const scenes = this.scene.manager.scenes;
  }
}
