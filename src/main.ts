import Phaser from 'phaser';
import IntroScene from './scenes/introScene';
import MainScene from './scenes/mainScene';
import OverScene from './scenes/overScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 2048,
  height: 1200,
  scene: [IntroScene, MainScene, OverScene],
  physics: {
    default: 'arcade',
    arcade: {
      // 중력
      gravity: { x: 0, y: 0 },
    },
  },
  fps: {
    target: 60, // 기준
    min: 30, // 최소
  },
  input: {
    keyboard: true,
  },
};

const game = new Phaser.Game(config);
