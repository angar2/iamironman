import Phaser from 'phaser';

export default class OverScene extends Phaser.Scene {
  private titleText!: Phaser.GameObjects.Text;
  private restartText!: Phaser.GameObjects.Text;
  private pressText!: Phaser.GameObjects.Text;
  private yKey!: Phaser.Input.Keyboard.Key;
  private nKey!: Phaser.Input.Keyboard.Key;
  private blinkTimer!: Phaser.Time.TimerEvent;

  constructor() {
    super({ key: 'OverScene' });
  }

  preload() {}

  create() {
    this.sound.add('gameover').play();

    this.titleText = this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY * 0.8,
        'GAME OVER',
        {
          fontFamily: 'PressStart2P',
          fontSize: `${this.cameras.main.width * 0.04}px`,
          color: '#E7D50B',
          align: 'center',
        }
      )
      // .setShadow(
      //   this.cameras.main.width * 0.006,
      //   this.cameras.main.width * 0.004,
      //   '#E70B0B'
      // )
      .setLetterSpacing(-this.cameras.main.width * 0.002)
      .setOrigin(0.5, 0.5);

    this.restartText = this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY * 1.2,
        'Replay ?',
        {
          fontFamily: '"VT323"',
          fontSize: `${this.cameras.main.width * 0.034}px`,
          color: '#ffffff',
          align: 'center',
        }
      )
      .setLetterSpacing(this.cameras.main.width * 0.001)
      .setOrigin(0.5, 0.5);

    this.pressText = this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY * 1.35,
        'Press Y | N',
        {
          fontFamily: '"VT323"',
          fontSize: `${this.cameras.main.width * 0.034}px`,
          color: '#ffffff',
          align: 'center',
        }
      )
      .setLetterSpacing(this.cameras.main.width * 0.001)
      .setOrigin(0.5, 0.5);

    // 키 입력 설정
    this.yKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
    this.nKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.N);

    // 깜빡임 효과
    this.blinkTimer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        if (this.pressText.style.color === '#ffffff')
          this.pressText.setColor('#E70B0B');
        else this.pressText.setColor('#ffffff');
      },
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    if (this.yKey.isDown) this.startGame();
    if (this.nKey.isDown) this.finishGame();
  }

  private startGame() {
    // 깜빡임 타이머 삭제
    if (this.blinkTimer) this.blinkTimer.destroy();

    // 메인 씬으로 전환
    this.scene.resume('BackScene');
    this.scene.switch('PlayScene');
  }

  private finishGame() {
    // 깜빡임 타이머 삭제
    if (this.blinkTimer) this.blinkTimer.destroy();

    // 인트로 씬으로 전환
    this.scene.stop('PlayScene');
    this.scene.resume('BackScene');
    this.scene.switch('IntroScene');
  }
}
