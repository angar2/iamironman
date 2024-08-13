import Phaser from 'phaser';
import BackScene from './scenes/backScene';
import IntroScene from './scenes/introScene';
import PlayScene from './scenes/playScene';
import OverScene from './scenes/overScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 2048,
  height: 1200,
  scene: [BackScene, IntroScene, PlayScene, OverScene],
  physics: {
    default: 'arcade',
    arcade: {
      // 중력
      gravity: { x: 0, y: 0 },
    },
  },
  fps: {
    target: 60, // 기준
    min: 60, // 최소
  },
  input: {
    keyboard: true,
  },
};

const game = new Phaser.Game(config);
