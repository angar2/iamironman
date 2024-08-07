import Phaser from 'phaser';
import MainScene from './scenes/mainScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 2048,
  height: 1200,
  scene: [MainScene],
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
