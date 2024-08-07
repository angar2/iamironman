import Phaser from 'phaser';
import { GroupType } from '../enum';

export default class Group extends Phaser.Physics.Arcade.Group {
  private _type: GroupType;

  constructor(
    scene: Phaser.Scene,
    config: Phaser.Types.Physics.Arcade.PhysicsGroupConfig,
    groupType: GroupType
  ) {
    super(scene.physics.world, scene, config);

    // 설정
    this.name = groupType;
    this._type = groupType;
  }
}
