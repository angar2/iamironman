import Phaser from 'phaser';
import GroupManager from '../groupManager';
import UltronRepulsor from '../../objects/weapons/ultronRepulsor';
import Group from '../../objects/group';
import Enemy from '../../objects/charaters/enemy';
import { GroupType, ImageTexture } from '../../enum';

export default class UltronRepulsorManager {
  private scene: Phaser.Scene;
  private ultronRepulsors: Group;

  constructor(scene: Phaser.Scene, groupManager: GroupManager) {
    this.scene = scene;
    this.ultronRepulsors = groupManager.get(GroupType.ULTORON_REPULSORS);
  }

  // 울트론2 리펄서 발사
  public fire(enemy: Enemy) {
    // 리펄서 생성 위치 지정
    const posX = enemy.x - enemy.displayWidth / 1.5;
    const posY = enemy.y - enemy.displayHeight / 3;

    // 리펄서 생성
    const ultronRepulsor = new UltronRepulsor(
      this.scene,
      posX,
      posY,
      ImageTexture.ULTRON_REPULSOR
    );

    // 그룹 추가
    this.ultronRepulsors.add(ultronRepulsor);
  }

  // 울트론2 리펄서 위치 변경/제거
  public updatePosition() {
    if (this.ultronRepulsors.getLength() <= 0) return;

    console.log(this.ultronRepulsors.getLength());
    this.ultronRepulsors!.children.entries.forEach((child) => {
      const repulsor = child as UltronRepulsor;

      const speed = repulsor.getSpeed();

      // 리펄서 이동
      repulsor.x -= speed;

      // 화면을 벗어나면 리펄서 제거
      if (repulsor.x < 0) {
        repulsor.destroy();
      }
    });

    // if (this.ultron2)
    //   this.setUltronMode(UltronType.ULTRON2, UltronMode.NORMAL);
  }
}
