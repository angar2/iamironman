import Phaser from 'phaser';
import TimerHandler from '../../handlers/timerHandler';
import GroupManager from '../groupManager';
import ScoreManager from '../displays/scoreManager';
import GaugeManager from '../displays/gaugeManager';
import IronmanManager from './ironmanManager';
import UltronRepulsorManager from '../weapons/ultronRepulsorManager';
import Group from '../../objects/group';
import Ironman from '../../objects/charaters/ironman';
import Enemy from '../../objects/charaters/enemy';
import Repulsor from '../../objects/weapons/repulsor';
import Beam from '../../objects/weapons/beam';
import { collisionElementConfig, scoreConfig } from '../../config';
import {
  EnemyMode,
  EnemyType,
  GroupType,
  ImageTexture,
  TimerName,
} from '../../enum';

export default class EnemyManager {
  private scene: Phaser.Scene;
  private timerHandler: TimerHandler;
  private groupManager: GroupManager;
  private scoreManager: ScoreManager;
  private gaugeManager: GaugeManager;
  private ultronRepulsorManager: UltronRepulsorManager;
  private enemies: Group;
  private ironman!: Ironman;
  private enemy: { [key in EnemyType]?: Enemy } = {};

  constructor(
    scene: Phaser.Scene,
    timerHandler: TimerHandler,
    groupManager: GroupManager,
    scoreManager: ScoreManager,
    gaugeManager: GaugeManager,
    ironmanManager: IronmanManager,
    ultronRepulsorManager: UltronRepulsorManager
  ) {
    this.scene = scene;
    this.timerHandler = timerHandler;
    this.groupManager = groupManager;
    this.scoreManager = scoreManager;
    this.gaugeManager = gaugeManager;
    this.ultronRepulsorManager = ultronRepulsorManager;
    this.ironman = ironmanManager.get();
    this.enemies = groupManager.get(GroupType.ENEMIES);

    for (const enemy of Object.values(EnemyType)) {
      this.create(enemy);
    }
    // this.ultron1Attack();
  }

  // 빌런 생성
  public create(enemytype: EnemyType) {
    const gameWidth = this.scene.game.canvas.width;
    const gameHeight = this.scene.game.canvas.height;

    const textureMap = {
      [EnemyType.ULTRON1]: ImageTexture.ULTRON1_NORMAL,
      [EnemyType.ULTRON2]: ImageTexture.ULTRON2_NORMAL,
      [EnemyType.ULTRON3]: ImageTexture.ULTRON3_NORMAL,
      [EnemyType.ROCK]: ImageTexture.ROCK_NORMAL,
    };
    const imageTexture = textureMap[enemytype];

    const enemy = new Enemy(
      this.scene,
      0,
      0,
      imageTexture,
      enemytype,
      this.groupManager
    );

    const targetWidth = enemy.displayWidth;
    const targetHeight = enemy.displayHeight;
    const randomY = Phaser.Math.Between(
      targetHeight / 2,
      gameHeight - targetHeight / 2
    );

    enemy.setPosition(gameWidth - targetWidth / 2, randomY);

    this.enemy[enemytype] = enemy;
    this.enemies.add(enemy);

    enemytype === EnemyType.ULTRON2 && this.ultron2Attack(enemy);
  }

  // 빌런 이동
  public updatePosition() {
    if (this.enemies!.getLength() <= 0) return;

    this.enemies.children.entries.forEach((child) => {
      const enemy = child as Enemy;

      const speed = enemy.getSpeed();
      const type = enemy.getType();

      // 빌런 이동
      enemy.setX(enemy.x - speed);

      // 빌런 충돌 감지 영역 이동
      this.updateCollisionZones(enemy);

      // 화면을 벗어날 경우
      if (enemy.x < 0) {
        // 빌런 제거
        enemy.destroy();

        // 특정 빌런 설정
        switch (type) {
          case EnemyType.ULTRON1:
            this.timerHandler.removeTimerEvent(TimerName.ULTRON_1_MODE);
            break;
          case EnemyType.ULTRON2:
            this.timerHandler.removeTimerEvent(TimerName.ULTROM_REPULSOR_FIRE);
            break;
        }

        // 재생성
        this.create(type);
      }
    });
  }

  // 빌런 충돌 감지 영역 이동
  public updateCollisionZones(enemy: Enemy) {
    const elements =
      collisionElementConfig.enemies[enemy.getType()][enemy.mode];

    enemy.collisionZones.children.entries.forEach((child, index) => {
      const zone = child as Phaser.Physics.Arcade.Image;

      // 충돌 영역 위치 업데이트
      zone.setX(enemy.x + enemy.displayWidth * (elements[index].x / 100));
      zone.setY(enemy.y + enemy.displayHeight * (elements[index].y / 100));
    });
  }

  // 빌런 모드 변경
  public setTexture(enemy: Enemy, mode: EnemyMode) {
    const textureMap = {
      [EnemyType.ULTRON1]: {
        [EnemyMode.NORMAL]: ImageTexture.ULTRON1_NORMAL,
        [EnemyMode.ATTACK]: ImageTexture.ULTRON1_ATTACK,
      },
      [EnemyType.ULTRON2]: {
        [EnemyMode.NORMAL]: ImageTexture.ULTRON2_NORMAL,
        [EnemyMode.ATTACK]: ImageTexture.ULTRON2_ATTACK,
      },
    };
    
    const type = enemy.getType();
    const texture = textureMap[type as keyof typeof textureMap]?.[mode];
    texture && enemy.setTexture(texture);
  }

  // 빌런 피격
  public damage(enemy: Enemy, weapon: Repulsor | Beam) {
    const type = enemy.getType();
    if (enemy) {
      switch (type) {
        case EnemyType.ULTRON1:
          this.timerHandler.removeTimerEvent(TimerName.ULTRON_1_MODE);
          break;
        case EnemyType.ULTRON2:
          this.timerHandler.removeTimerEvent(TimerName.ULTROM_REPULSOR_FIRE);
          break;
      }

      // 데미지 처리
      const damage = weapon.getDamage();
      const isEliminated = enemy.decreaseHealth(damage);

      // 체력이 모두 소진된 경우
      if (isEliminated) {
        // 빌런 제거
        enemy.destroy(true);

        // 빌런 재생성
        this.create(type);

        // 게이지 업데이트
        this.gaugeManager.updateGauges(type);

        // 스코어 추가
        this.scoreManager.increaseScore(scoreConfig[type]);
      }
    }
  }

  // // 울트론1 공격
  // private ultron1Attack() {
  //   this.collisionHandler.handleIronmanUltron1Collision(
  //     (enemy: Enemy) => {
  //       this.setTexture(enemy, EnemyMode.ATTACK)

  //       this.timerHandler.handleultronMode(() => {
  //         if (enemy && enemy.active) this.setTexture(enemy, EnemyMode.NORMAL);
  //       });
  //     }
  //   );
  // }

  // 울트론2 공격
  private ultron2Attack(enemy: Enemy) {
    this.timerHandler.handleultronRepulsorFire(() => {
      if (enemy && enemy.active) {
        this.setTexture(enemy, EnemyMode.ATTACK);
        this.ultronRepulsorManager.fire(enemy);
      }
    });
  }
}
