import Group from '../objects/group';
import CollisionZone from '../objects/collisionZone';
import { CollisionZonesGroupType, GroupType } from '../enum';

export default class GroupManager {
  private scene: Phaser.Scene;
  private groups: { [key in GroupType]?: Group } = {};
  private collisionZonesGroups: { [key in CollisionZonesGroupType]?: Group } =
    {};
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.create();
    this.createCollisionZones();
  }

  // 그룹 생성
  public create() {
    Object.values(GroupType).forEach((groupType) => {
      this.groups[groupType] = new Group(
        this.scene,
        {
          classType: Phaser.Physics.Arcade.Image,
          runChildUpdate: true,
        },
        groupType
      );
    });
  }

  // 그룹 가져오기
  public get(groupType: GroupType) {
    return this.groups[groupType] as Group;
  }

  // 충돌 감지 영역 그룹 생성
  public createCollisionZones() {
    Object.values(CollisionZonesGroupType).forEach((groupType) => {
      this.collisionZonesGroups[groupType] = new Group(
        this.scene,
        {
          classType: CollisionZone,
          runChildUpdate: true,
        },
        groupType
      );
    });
  }

  // 충돌 감지 영역 그룹 가져오기
  public getCollisionZones(groupType: CollisionZonesGroupType) {
    return this.collisionZonesGroups[groupType] as Group;
  }
}
