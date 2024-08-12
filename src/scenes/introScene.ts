import Phaser from 'phaser';
import BackgroundManager from '../managers/displays/backgroundManager';
import { ImageTexture } from '../enum';

export default class IntroScene extends Phaser.Scene {
  private backgroundManager!: BackgroundManager;

  private titleText!: Phaser.GameObjects.Text;
  private startText!: Phaser.GameObjects.Text;

  private enterKey!: Phaser.Input.Keyboard.Key;
  private blinkTimer!: Phaser.Time.TimerEvent;

  constructor() {
    super({ key: 'IntroScene' });
  }

  preload() {
    this.load.setBaseURL('images');

    Object.entries(ImageTexture).forEach(([key, value]) => {
      this.load.image(value, `${value}.png`);
    });
  }

  create() {
    // 배경 관리자
    this.backgroundManager = new BackgroundManager(this);

    this.titleText = this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY * 0.8,
        'I AM IRONMAN',
        {
          fontFamily: '"Press Start 2P"',
          fontSize: `${this.cameras.main.width * 0.05}px`,
          color: '#E7D50B',
          align: 'center',
        }
      )
      .setOrigin(0.5, 0.5);

    this.startText = this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY * 1.4,
        'Press Enter to Start the Game',
        {
          fontFamily: '"VT323"',
          fontSize: `${this.cameras.main.width * 0.034}px`,
          color: '#ffffff',
          align: 'center',
        }
      )
      .setOrigin(0.5, 0.5);

    // Enter 키 입력 설정
    this.enterKey = this.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );

    // 깜빡임 효과
    this.blinkTimer = this.time.addEvent({
      delay: 1000,
      callback: () => this.startText.setVisible(!this.startText.visible),
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    // 배경 이동
    this.backgroundManager.updatePosition();

    if (this.enterKey.isDown) this.startGame();
  }

  private blinkText() {
    this.startText.setVisible(!this.startText.visible);
  }

  private startGame() {
    // 깜빡임 타이머 삭제
    if (this.blinkTimer) this.blinkTimer.destroy();

    // 메인 씬으로 전환
    this.scene.start('MainScene');
  }
}
