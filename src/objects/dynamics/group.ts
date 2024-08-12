import Phaser from 'phaser';
import Ironman from '../charaters/ironman';
import Enemy from '../charaters/enemy';
import Repulsor from '../weapons/repulsor';
import Beam from '../weapons/beam';
import UltronRepulsor from '../weapons/ultronRepulsor';
import { CollisionZonesGroupType, GroupType } from '../../enum';

export default class Group extends Phaser.GameObjects.Group {
  public _type: GroupType | CollisionZonesGroupType;
  private parent!: Ironman | Enemy | Repulsor | Beam | UltronRepulsor;

  constructor(
    scene: Phaser.Scene,
    config: Phaser.Types.Physics.Arcade.PhysicsGroupConfig,
    groupType: GroupType | CollisionZonesGroupType
  ) {
    super(scene, config);

    // 설정
    this.name = groupType;
    this._type = groupType;
  }

  public getCollisionParent() {
    return this.parent;
  }

  public updateCollisionParent(
    parent: Ironman | Enemy | Repulsor | Beam | UltronRepulsor
  ) {
    this.parent = parent;
  }
}
