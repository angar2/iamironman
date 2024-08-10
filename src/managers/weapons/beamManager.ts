import Phaser from 'phaser';
import StateManager from '../stateManager';
import GroupManager from '../groupManager';
import GaugeManager from '../displays/gaugeManager';
import IronmanManager from '../charaters/ironmanManager';
import Group from '../../objects/group';
import Ironman from '../../objects/charaters/ironman';
import Beam from '../../objects/weapons/beam';
import { GroupType, ImageTexture, StateName } from '../../enum';
import { collisionElementConfig } from '../../config';

export default class BeamManager {
  private scene: Phaser.Scene;
  private stateManager: StateManager;
  private groupManager: GroupManager;
  private gaugeManager: GaugeManager;
  private ironman: Ironman;
  private weapons: Group;
  private beam: Beam | null = null;

  constructor(
    scene: Phaser.Scene,
    stateManager: StateManager,
    groupManager: GroupManager,
    gaugeManager: GaugeManager,
    ironmanManager: IronmanManager
  ) {
    this.scene = scene;
    this.stateManager = stateManager;
    this.groupManager = groupManager;
    this.gaugeManager = gaugeManager;
    this.ironman = ironmanManager.get();
    this.weapons = groupManager.get(GroupType.WEAPONS);
  }

  // 빔 발사
  public fire() {
    const gameWidth = this.scene.game.canvas.width;
    const gameHeight = this.scene.game.canvas.height;

    // 발사
    this.beam = new Beam(
      this.scene,
      gameWidth * 2,
      gameHeight * 2,
      ImageTexture.BEAM,
      this.groupManager
    );

    this.weapons!.add(this.beam);
  }

  // 빔 위치 변경
  public updatePosition() {
    if (!this.ironman || !this.beam) return;

    // 아이언맨의 위치를 기준으로 빔 위치 업데이트
    const PosX = this.ironman.x + this.beam.displayWidth * 0.05;
    const PosY = this.ironman.y + this.beam.displayHeight * 0.18;

    this.beam.setPosition(PosX, PosY);

    // 빔 충돌 감지 영역 이동
    this.updateCollisionZones(this.beam);
  }

  // 빔 충돌 감지 영역 이동
  public updateCollisionZones(repulsor: Beam) {
    const elements =
      collisionElementConfig.weapons[repulsor.getType()]['normal'];

    repulsor.collisionZones.children.entries.forEach((child, index) => {
      const zone = child as Phaser.Physics.Arcade.Image;
      // 충돌 영역 위치 업데이트
      zone.setX(repulsor.x + repulsor.displayWidth * (elements[index].x / 100));
      zone.setY(
        repulsor.y + repulsor.displayHeight * (elements[index].y / 100)
      );
    });
  }

  // 빔 제거
  public destroy() {
    if (!this.beam) return;
    this.beam.collisionZones.clear(true, true);
    this.beam.destroy();
    this.beam = null;
    this.stateManager.updateState(StateName.IS_BEAM_MODE_ACTIVE, false);
    this.gaugeManager.resetGauges();
  }
}
