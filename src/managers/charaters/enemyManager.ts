import Phaser from 'phaser';
import CollisionHandler from '../../handlers/collisionHandler';
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
import { scoreConfig } from '../../config';
import {
  EnemyMode,
  EnemyType,
  GroupType,
  ImageTexture,
  TimerName,
} from '../../enum';

export default class EnemyManager {
  private scene: Phaser.Scene;
  private collisionHandler: CollisionHandler;
  private timerHandler: TimerHandler;
  private scoreManager: ScoreManager;
  private gaugeManager: GaugeManager;
  private ultronRepulsorManager: UltronRepulsorManager;
  private enemies: Group;
  private ironman!: Ironman;
  private enemy!: Enemy;

  constructor(
    scene: Phaser.Scene,
    collisionHandler: CollisionHandler,
    timerHandler: TimerHandler,
    groupManager: GroupManager,
    scoreManager: ScoreManager,
    gaugeManager: GaugeManager,
    ironmanManager: IronmanManager,
    ultronRepulsorManager: UltronRepulsorManager
  ) {
    this.scene = scene;
    this.collisionHandler = collisionHandler;
    this.timerHandler = timerHandler;
    this.scoreManager = scoreManager;
    this.gaugeManager = gaugeManager;
    this.ultronRepulsorManager = ultronRepulsorManager;
    this.ironman = ironmanManager.get();
    this.enemies = groupManager.get(GroupType.ENEMIES);

    for (const enemy of Object.values(EnemyType)) {
      this.create(enemy);
    }
  }

  // 빌런 생성
  public create(enemytype: EnemyType) {
    const gameWidth = this.scene.game.canvas.width;
    const gameHeight = this.scene.game.canvas.height;

    let imageTexture: ImageTexture;

    switch (enemytype) {
      case EnemyType.ULTRON1:
        imageTexture = ImageTexture.ULTRON1_NORMAL;
        break;
      case EnemyType.ULTRON2:
        imageTexture = ImageTexture.ULTRON2_NORMAL;
        break;
      case EnemyType.ULTRON3:
        imageTexture = ImageTexture.ULTRON3_NORMAL;
        break;
      case EnemyType.ROCK:
        imageTexture = ImageTexture.ROCK_NORMAL;
        break;
    }

    this.enemy = new Enemy(this.scene, 0, 0, imageTexture, enemytype);

    const targetWidth = this.enemy.displayWidth;
    const targetHeight = this.enemy.displayHeight;
    const randomY = Phaser.Math.Between(
      targetHeight / 2,
      gameHeight - targetHeight / 2
    );

    this.enemy.setPosition(gameWidth - targetWidth / 2, randomY);

    this.enemies.add(this.enemy);

    // 울트론1 공격 핸들러 등록
    if (enemytype === EnemyType.ULTRON1) this.ultron1Attack(this.enemy);
    if (enemytype === EnemyType.ULTRON2) this.ultron2Attack(this.enemy);
  }

  // 빌런 이동
  public updatePosition() {
    if (this.enemies!.getLength() <= 0) return;

    this.enemies.children.entries.forEach((child) => {
      const enemy = child as Enemy;

      const speed = enemy.getSpeed();
      const type = enemy.getType();

      // 빌런 이동
      enemy.x -= speed;

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

  // 빌런 모드 변경
  private setTexture(enemy: Enemy, mode: EnemyMode) {
    const type = enemy.getType();
    if (type === EnemyType.ULTRON1) {
      switch (mode) {
        case EnemyMode.NORMAL:
          enemy.setTexture(ImageTexture.ULTRON1_NORMAL);
          break;
        case EnemyMode.ATTACK:
          enemy.setTexture(ImageTexture.ULTRON1_ATTACK);
          break;
      }
    }
    if (type === EnemyType.ULTRON2) {
      switch (mode) {
        case EnemyMode.NORMAL:
          enemy.setTexture(ImageTexture.ULTRON2_NORMAL);
          break;
        case EnemyMode.ATTACK:
          enemy.setTexture(ImageTexture.ULTRON2_ATTACK);
          break;
      }
    }
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
        // 제거
        enemy.destroy();

        // 재생성
        this.create(type);

        // 게이지 업데이트
        this.gaugeManager.updateGauges(type);

        // 스코어 추가
        this.scoreManager.increaseScore(scoreConfig[type]);
      }
    }
  }

  // 울트론1 공격
  private ultron1Attack(enemy: Enemy) {
    this.collisionHandler.handleIronmanUltron1Collision(
      this.ironman,
      enemy,
      () => {
        this.setTexture(enemy, EnemyMode.ATTACK);

        this.timerHandler.handleultronMode(() => {
          if (enemy && enemy.active) this.setTexture(enemy, EnemyMode.NORMAL);
        });
      }
    );
  }

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
