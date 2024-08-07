import Group from '../objects/group';
import { GroupType } from '../enum';

export default class GroupManager {
  private scene: Phaser.Scene;
  private groups: { [key in GroupType]?: Group } = {};
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.create();
  }

  // 그룹 생성
  public create() {
    Object.values(GroupType).forEach((groupType) => {
      this.groups[groupType] = new Group(
        this.scene,
        {
          classType: Phaser.Physics.Arcade.Sprite,
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
}
