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
      const textures = {
        [IronmanMode.NORMAL]: ImageTexture.IRONMAN_NORMAL,
        [IronmanMode.REPULSOR]: ImageTexture.IRONMAN_REPULSOR,
        [IronmanMode.HIT]: ImageTexture.IRONMAN_HIT,
        [IronmanMode.GATHER]: ImageTexture.IRONMAN_GATHER,
        [IronmanMode.BEAM]: ImageTexture.IRONMAN_BEAM,
      };

      this.ironman.setTexture(textures[mode]);

      // 아이언맨 사이즈 재설정
      this.ironman.setSize(this.ironman.frame.width, this.ironman.frame.height);

      // 아이언맨 모드 업데이트
      this.ironman.mode = mode;

      // 충돌 감지 영역 업데이트
      this.ironman.updateCollisionZones();
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
