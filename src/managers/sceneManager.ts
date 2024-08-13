import Phaser from 'phaser';
import BackgroundManager from './displays/backgroundManager';

export default class SceneManager {
  private static instance: SceneManager;
  public backgroundManager!: BackgroundManager;

  private constructor() {}

  public static getInstance() {
    if (!SceneManager.instance) {
      this.instance = new SceneManager();
    }
    return SceneManager.instance;
  }

  public setBackground(scene: Phaser.Scene) {
    this.backgroundManager = new BackgroundManager(scene);
    this.backgroundManager.create();
  }
}
