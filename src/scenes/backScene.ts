import Phaser from 'phaser';
import SceneManager from '../managers/sceneManager';
import { Font, ImageTexture, Sound } from '../enum';

export default class BackScene extends Phaser.Scene {
  private sceneManager: SceneManager = SceneManager.getInstance();

  constructor() {
    super({ key: 'BackScene' });
  }

  preload() {
    Object.entries(ImageTexture).forEach(([key, value]) => {
      this.load.image(value, `assets/images/${value}.png`);
    });

    Object.entries(Font).forEach(([key, value]) => {
      this.loadFont(value, `assets/fonts/${value}.ttf`);
    });

    Object.entries(Sound).forEach(([key, value]) => {
      this.load.audio(value, `assets/sounds/${value}.mp3`);
    });
  }

  create() {
    // 배경 생성
    this.sceneManager.setBackground(this);

    // 배경 사운드 생성
    this.sound.add('background').play();

    // 씬 런치
    this.scene.launch('IntroScene');
  }

  update() {
    // 배경 이동
    this.sceneManager.backgroundManager.updatePosition();
  }

  // 폰트 로드
  private loadFont(name: string, url: string) {
    new FontFace(name, `url(${url})`)
      .load()
      .then((loaded) => document.fonts.add(loaded))
      .catch((error) => error);
  }
}
