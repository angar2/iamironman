import Phaser from 'phaser';
import Score from '../../objects/displays/score';
import { scaleConfig, scoreConfig } from '../../config';

export default class ScoreManager {
  private scene: Phaser.Scene;
  private scoreDisplay!: Score;
  private score: number;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.score = 0;

    this.createScoreDisplay();
  }

  // 스코어 디스플레이 생성
  public createScoreDisplay() {
    const gameWidth = this.scene.game.canvas.width;
    const gameHeight = this.scene.game.canvas.height;

    const fontSize = Math.floor(gameWidth * scaleConfig.score);

    this.scoreDisplay = new Score(
      this.scene,
      gameWidth / 46,
      gameHeight / 7,
      `${this.score}`,
      {
        fontSize: `${fontSize}px`,
      }
    );
  }

  // 스코어 증가
  public increaseScore(score: number = scoreConfig.normal) {
    this.score += score;
    this.scoreDisplay?.setText(`${this.score}`);
  }
}
