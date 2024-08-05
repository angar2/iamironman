import Phaser from 'phaser';
import MainScene from './mainScene';

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
  input: {
    keyboard: true,
  },
};

const game = new Phaser.Game(config);
