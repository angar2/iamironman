import Phaser from 'phaser';
import TimerHandler from '../../handlers/timerHandler';
import Ironman from '../../objects/charaters/ironman';
import { ImageTexture, IronmanMode } from '../../enum';

export default class IronmanManager {
  private scene: Phaser.Scene;
  private timerHandler: TimerHandler;
  private ironman!: Ironman;

  constructor(scene: Phaser.Scene, timerHandler: TimerHandler) {
    this.scene = scene;
    this.timerHandler = timerHandler;

    this.create();
  }

  // 아이언맨 생성
  public create() {
    const gameWidth = this.scene.game.canvas.width;
    const gameHeight = this.scene.game.canvas.height;

    this.ironman = new Ironman(
      this.scene,
      gameWidth / 4,
      gameHeight / 2,
      ImageTexture.IRONMAN_NORMAL
    );
  }

  // 아이언맨 가져오기
  public get() {
    return this.ironman;
  }

  // 아이언맨 모드 변경
  private setTexture(mode: IronmanMode) {
    if (this.ironman) {
      switch (mode) {
        case IronmanMode.NORMAL:
          this.ironman.setTexture(ImageTexture.IRONMAN_NORMAL);
          break;
        case IronmanMode.REPULSOR:
          this.ironman.setTexture(ImageTexture.IRONMAN_REPULSOR);
          break;
        case IronmanMode.HIT:
          this.ironman.setTexture(ImageTexture.IRONMAN_HIT);
          this.ironman.setPosition(
            this.ironman.x - this.ironman.displayWidth / 1.5,
            this.ironman.y - this.ironman.displayHeight / 8
          );
          break;
        case IronmanMode.GATHER:
          this.ironman.setTexture(ImageTexture.IRONMAN_GATHER);
          break;
        case IronmanMode.BEAM:
          this.ironman.setTexture(ImageTexture.IRONMAN_BEAM);
          break;
      }
    }
  }

  // 아이언맨 모드별 타이머 설정 함수
  public transform(mode: IronmanMode, callback?: () => void) {
    this.setTexture(mode);

    // 모드 유지 타이머 설정
    this.timerHandler.handleIronmanMode(mode, () => {
      this.setTexture(
        mode === IronmanMode.GATHER ? IronmanMode.BEAM : IronmanMode.NORMAL
      );
      if (callback) callback(); // () => 빔 발사 후 제거
    });
  }
}
