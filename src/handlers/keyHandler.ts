import Phaser from 'phaser';
import IronmanManager from '../managers/charaters/ironmanManager';
import IronmanControlManager from '../managers/charaters/ironmanControlManager';
import Ironman from '../objects/charaters/ironman';

export default class KeyHandler {
  private scene: Phaser.Scene;
  private ironmanManager: IronmanManager;
  private ironmanControlManager: IronmanControlManager;
  private ironman: Ironman;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(
    scene: Phaser.Scene,
    ironmanManager: IronmanManager,
    ironmanControlManager: IronmanControlManager
  ) {
    this.scene = scene;
    this.ironmanManager = ironmanManager;
    this.ironmanControlManager = ironmanControlManager;
    this.ironman = this.ironmanManager.get();
    this.cursors = this.scene.input.keyboard!.createCursorKeys();

    this.createKeyEvents();
  }

  // 키 함수 할당
  private createKeyEvents() {
    this.scene.input.keyboard!.on('keydown-SPACE', this.handleKeySpace, this);
    this.scene.input.keyboard!.on('keydown-B', this.handleKeyB, this);
  }

  // Space bar 키 이벤트
  private handleKeySpace() {
    this.ironmanControlManager.attackRepulsor();
  }

  // B 키 이벤트
  private handleKeyB() {
    this.ironmanControlManager.attackBeam();
  }

  // Cursors 키 이벤트
  private handleKeyCursor() {
    // this.ironman.setVelocity(0);

    if (this.cursors.left.isDown)
      this.ironmanControlManager.updatePosition(false, false);
    if (this.cursors.right.isDown)
      this.ironmanControlManager.updatePosition(false, true);
    if (this.cursors.up.isDown)
      this.ironmanControlManager.updatePosition(true, false);
    if (this.cursors.down.isDown)
      this.ironmanControlManager.updatePosition(true, true);
  }

  // 아이언맨 위치 업데이트
  public updateIronmanPosition() {
    if (!this.ironman?.active) return;

    this.handleKeyCursor();
  }
}
