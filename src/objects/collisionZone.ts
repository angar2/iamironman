import Phaser from 'phaser';
import Enemy from '../objects/charaters/enemy';
import UltronRepulsor from '../objects/weapons/ultronRepulsor';

export default class CollisionZone extends Phaser.GameObjects.Zone {
// export default class CollisionZone extends Phaser.Physics.Arcade.Image {
  public who: string;
  private parent!: Enemy | UltronRepulsor;

  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    super(scene, x, y, width, height);
  // constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    // super(scene, x, y, texture);
    

    // 설정
    this.who = '';

    // sprite 추가
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  // 충돌 감지 영역 부모 객체 가져오기
  public getCollisionParent() {
    return this.parent;
  }

  // 충돌 감지 영역 부모 객체 업데이트
  public updateCollisionParent(parent: Enemy | UltronRepulsor) {
    this.parent = parent;
  }
}
