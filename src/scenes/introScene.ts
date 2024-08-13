import Phaser from 'phaser';
import { ImageTexture } from '../enum';

export default class IntroScene extends Phaser.Scene {
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
    this.titleText = this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY * 0.8,
        'I AM IRONMAN',
        {
          fontFamily: '"Press Start 2P"',
          fontSize: `${this.cameras.main.width * 0.06}px`,
          color: '#E7D50B',
          align: 'center',
        }
      )
      .setShadow(
        this.cameras.main.width * 0.006,
        this.cameras.main.width * 0.004,
        '#E70B0B'
      )
      .setLetterSpacing(-this.cameras.main.width * 0.002)
      .setOrigin(0.5, 0.5);

    this.startText = this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY * 1.4,
        'Press Enter to Start',
        {
          fontFamily: '"VT323"',
          fontSize: `${this.cameras.main.width * 0.034}px`,
          color: '#ffffff',
          align: 'center',
        }
      )
      .setLetterSpacing(this.cameras.main.width * 0.001)
      .setOrigin(0.5, 0.5);

    // Enter 키 입력 설정
    this.enterKey = this.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );

    // 깜빡임 효과
    this.blinkTimer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        if (this.startText.style.color === '#ffffff')
          this.startText.setColor('#E70B0B');
        else this.startText.setColor('#ffffff');
      },
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    if (this.enterKey.isDown) this.startGame();
  }

  private startGame() {
    // 깜빡임 타이머 삭제
    if (this.blinkTimer) this.blinkTimer.destroy();

    // 메인 씬으로 전환
    this.scene.switch('PlayScene');
  }
}
