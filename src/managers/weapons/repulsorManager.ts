import Phaser from 'phaser';
import GroupManager from '../groupManager';
import IronmanManager from '../charaters/ironmanManager';
import Group from '../../objects/group';
import Ironman from '../../objects/charaters/ironman';
import Repulsor from '../../objects/weapons/repulsor';
import { maxConfig } from '../../config';
import { GroupType, ImageTexture } from '../../enum';

export default class RepulsorManager {
  private scene: Phaser.Scene;
  private ironman: Ironman;
  private repulsors: Group;
  private weapons: Phaser.Physics.Arcade.Group;
  private nextRepulsorTime: number;

  constructor(
    scene: Phaser.Scene,
    groupManager: GroupManager,
    ironmanManager: IronmanManager
  ) {
    this.scene = scene;
    this.nextRepulsorTime = 0;
    this.ironman = ironmanManager.get();
    this.repulsors = groupManager.get(GroupType.REPULSORS);
    this.weapons = groupManager.get(GroupType.WEAPONS);
  }

  // 리펄서 발사
  public fire() {
    if (
      this.repulsors.getLength() >= maxConfig.repulsor ||
      this.scene.time.now <= this.nextRepulsorTime
    )
      return;

    // 리펄서 생성 위치 지정
    const posX = this.ironman.x + this.ironman.displayWidth / 0.9;
    const posY = this.ironman.y - this.ironman.displayHeight / 3.5;

    // 리펄서 생성
    const repulsor = new Repulsor(
      this.scene,
      posX,
      posY,
      ImageTexture.REPULSOR
    );

    // 그룹 추가
    this.repulsors.add(repulsor);
    this.weapons.add(repulsor);
  }

  // 리펄서 위치 변경/제거
  public updatePosition() {
    if (this.repulsors.getLength() <= 0) return;

    this.repulsors!.children.entries.forEach((child) => {
      const repulsor = child as Repulsor;

      const speed = repulsor.getSpeed();

      // 리펄서 이동
      repulsor.x += speed;

      // 화면을 벗어나면 리펄서 제거
      if (repulsor.x > this.scene.game.canvas.width) repulsor.destroy();
    });
  }
}
