import Phaser from 'phaser';

enum IronmanMode {
  NORMAL = 'normal',
  REPULSOR = 'repulsor',
  HIT = 'hit',
  GATHER = 'gather',
  BEAM = 'beam',
}

enum UltronType {
  ULTRON1 = 'ultron1',
  ULTRON2 = 'ultron2',
}

enum UltronMode {
  NORMAL = 'normal',
  ATTACK = 'attack',
}

export default class MainScene extends Phaser.Scene {
  private keys: {
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | null;
    b: Phaser.Input.Keyboard.Key | null;
    y: Phaser.Input.Keyboard.Key | null;
    n: Phaser.Input.Keyboard.Key | null;
    space: Phaser.Input.Keyboard.Key | null;
  } = {
    cursors: null,
    b: null,
    y: null,
    n: null,
    space: null,
  };
  private gameWidth: number = 0;
  private gameHeight: number = 0;

  private background: Phaser.GameObjects.Sprite | null = null;
  private backgroundCopy: Phaser.GameObjects.Sprite | null = null;

  private score = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private scoreIncreaseInterval = 200;
  private ScorePerFrame = 10;

  private gaugeBlocks: Phaser.GameObjects.Graphics[] = [];
  private maxGaugeBlock = 10;
  private gaugeWidth: number = 0;
  private gaugeHeight: number = 0;
  private filledColor = 0x22b14c;
  private unfilledColor = 0x7f7f7f;
  private currentGaugeIndex = 0;

  private ironman: Phaser.Physics.Arcade.Sprite | null = null;
  private ironmanMode: IronmanMode = IronmanMode.NORMAL;
  private isBeamModeActive: boolean = false;

  private enemies: Phaser.Physics.Arcade.Group | null = null;
  private ultron1: Phaser.Physics.Arcade.Sprite | null = null;
  private ultron2: Phaser.Physics.Arcade.Sprite | null = null;
  private ultron3: Phaser.Physics.Arcade.Sprite | null = null;
  private rock: Phaser.Physics.Arcade.Sprite | null = null;

  private lifeScale: number = 0;
  private repulsorScale: number = 0;
  private beamScale: number = 0;
  private ultron1Scale: number = 0;
  private ultron2Scale: number = 0;
  private ultron3Scale: number = 0;
  private rockScale: number = 0;
  private ultronRepulsorScale: number = 0;

  private repulsorTimerEvent: Phaser.Time.TimerEvent | null = null;
  private hitTimerEvent: Phaser.Time.TimerEvent | null = null;
  private gatherTimerEvent: Phaser.Time.TimerEvent | null = null;
  private beamTimerEvent: Phaser.Time.TimerEvent | null = null;
  private ultronRepulsorTimerEvent: Phaser.Time.TimerEvent | null = null;

  private life: Phaser.Physics.Arcade.Sprite | null = null;
  private lives: Phaser.GameObjects.Sprite[] = [];
  private maxLives: number = 5;
  private isInvincible: boolean = false;

  private weapons: Phaser.Physics.Arcade.Group | null = null;
  private repulsor: Phaser.Physics.Arcade.Sprite | null = null;
  private repulsors: Phaser.Physics.Arcade.Group | null = null;
  private repulsorMax: number = 5;
  private nextRepulsorTime: number = 0;
  private repulsorDelayTime: number = 250;

  private beam: Phaser.Physics.Arcade.Sprite | null = null;

  private ultronRepulsor: Phaser.Physics.Arcade.Sprite | null = null;
  private isFiredUltronRepulsor: boolean = false;

  private backgroundSpeed: number = 4;
  private ironmanSpeed: number = 400;
  private repulsorSpeed: number = 10;
  private ultron1Speed: number = 12;
  private ultron2Speed: number = 6;
  private ultron3Speed: number = 18;
  private rockSpeed: number = 4;
  private ultronRepulsorSpeed: number = 8;

  private repulsorModeDuration: number = 300;
  private hitModeDuration: number = 2000;
  private invincibleDuration: number = 3000;
  private gatherModeDuration: number = 1500;
  private beamModeDuration: number = 5000;
  private ultronRepulsorFireDuration: number = 800;
  private ultron1ModeDuration: number = 500;

  private hitOverlapHandler!: Phaser.Physics.Arcade.Collider;
  private attackOverlapHandler!: Phaser.Physics.Arcade.Collider;
  private ultron1OverlapHandler!: Phaser.Physics.Arcade.Collider;

  constructor() {
    super({ key: 'Scene' });
  }

  preload() {
    this.load.setBaseURL('images');
    this.load.image('background', 'background.png');
    this.load.image('ironman1', 'ironman_1.png');
    this.load.image('ironman2', 'ironman_2.png');
    this.load.image('ironman3', 'ironman_3.png');
    this.load.image('ironman4', 'ironman_4.png');
    this.load.image('ironman5', 'ironman_5.png');
    this.load.image('ultron1_1', 'ultron_1_1.png');
    this.load.image('ultron1_2', 'ultron_1_2.png');
    this.load.image('ultron2_1', 'ultron_2_1.png');
    this.load.image('ultron2_2', 'ultron_2_2.png');
    this.load.image('ultron3_1', 'ultron_3_1.png');
    this.load.image('rock', 'rock.png');
    this.load.image('repulsor', 'repulsor.png');
    this.load.image('beam', 'beam.png');
    this.load.image('ultronRepulsor', 'repulsor_ultron.png');
    this.load.image('life', 'life.png');
  }

  create() {
    // 화면 크기
    this.gameWidth = this.scale.width;
    this.gameHeight = this.scale.height;

    // 배경
    this.background = this.add.sprite(0, 0, 'background').setOrigin(0, 0);
    this.backgroundCopy = this.add
      .sprite(this.gameWidth, 0, 'background')
      .setOrigin(0, 0);

    let backgroundScale = this.gameWidth / this.background.width;

    this.background.setScale(backgroundScale);
    this.backgroundCopy.setScale(backgroundScale);

    // 아이언맨
    this.ironman = this.physics.add.sprite(
      this.gameWidth / 4,
      this.gameHeight / 2,
      'ironman1'
    );
    let ironmanScale = (this.gameHeight * 0.2) / this.ironman.height;
    this.ironman.setScale(ironmanScale);

    // 적 그룹
    this.enemies = this.physics.add.group();

    // 울트론1
    this.ultron1 = this.physics.add.sprite(0, 0, 'ultron1_1');
    this.ultron1Scale = (this.gameHeight * 0.18) / this.ultron1.height;
    this.ultron1.destroy();

    // 울트론2
    this.ultron2 = this.physics.add.sprite(0, 0, 'ultron2_1');
    this.ultron2Scale = (this.gameHeight * 0.2) / this.ultron2.height;
    this.ultron2.destroy();

    // 울트론3
    this.ultron3 = this.physics.add.sprite(0, 0, 'ultron3_1');
    this.ultron3Scale = (this.gameHeight * 0.1) / this.ultron3.height;
    this.ultron3.destroy();

    // 바위
    this.rock = this.physics.add.sprite(0, 0, 'rock');
    this.rockScale = (this.gameHeight * 0.15) / this.rock.height;
    this.rock.destroy();

    this.spawnUltron1();
    this.spawnUltron2();
    this.spawnUltron3();
    this.spawnRock();

    // 무기 그룹
    this.weapons = this.physics.add.group();

    // 아이언맨 리펄서 그룹
    this.repulsors = this.physics.add.group();

    // 아이언맨 리펄서
    this.repulsor = this.physics.add.sprite(0, 0, 'repulsor');
    this.repulsorScale = (this.gameWidth * 0.05) / this.repulsor.width;
    this.repulsor.destroy();

    // 아이언맨 유니빔
    this.beam = this.physics.add.sprite(0, 0, 'beam');
    this.beamScale = (this.gameWidth * 0.8) / this.beam.width;
    this.beam.destroy();

    // 울트론2 리펄서
    this.ultronRepulsor = this.physics.add.sprite(0, 0, 'ultronRepulsor');
    this.ultronRepulsorScale =
      (this.gameWidth * 0.04) / this.ultronRepulsor.height;
    this.ultronRepulsor.destroy();

    // 아이언맨 목숨
    this.life = this.physics.add.sprite(0, 0, 'life');
    this.lifeScale = (this.gameWidth * 0.034) / this.life!.height;
    this.life.destroy();

    this.createLives();

    // 게이지
    this.createGaugeBlocks();

    // 스코어
    const fontSize = Math.floor(this.gameWidth * 0.03);
    this.scoreText = this.add.text(
      this.gameWidth / 40,
      this.gameHeight / 40,
      `score ${this.score}`,
      {
        fontSize: `${fontSize}px`,
      }
    );

    // 스코어 증가 타이머 설정
    this.time.addEvent({
      delay: this.scoreIncreaseInterval,
      callback: this.updateScore,
      callbackScope: this,
      loop: true,
    });

    // 키 설정
    this.keys = {
      cursors: this.input.keyboard!.createCursorKeys(),
      b: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.B),
      y: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.Y),
      n: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.N),
      space: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    };

    // 키 이벤트
    // SPACE
    this.input.keyboard!.on('keydown-SPACE', () => {
      if (this.isBeamModeActive) return;

      // 리펄서 발사
      if (
        this.repulsors!.getLength() < this.repulsorMax &&
        this.time.now > this.nextRepulsorTime
      )
        this.fireRepulsor();

      // 아이언맨 리펄서 모드 전환
      this.setupModeTimer(IronmanMode.REPULSOR);
    });

    // B
    this.input.keyboard!.on('keydown-B', () => {
      if (this.isBeamModeActive) return;
      if (this.currentGaugeIndex < this.maxGaugeBlock) return;

      this.setupModeTimer(IronmanMode.GATHER);
      this.setupModeTimer(IronmanMode.BEAM);
    });

    this.handleIronmanHit();
  }

  update() {
    // 배경 이동
    if (this.background?.active) this.updateBackgroundPos();

    // 아이언맨 이동
    if (this.ironman?.active) this.updateIronmanPos();

    // 리펄서 이동
    if (this.repulsors!.getLength() > 0) this.updateRepulsorPos();

    // 유니빔 이동
    if (this.isBeamModeActive) this.updateBeamPos();

    // 적 이동
    if (this.enemies!.getLength() > 0) this.updateEnemiesPos();

    // 울트론2 리펄서 이동
    if (this.ultronRepulsor?.active) this.updateUltronRepulsorPos();

    // 적 공격
    if (this.enemies!.getLength() > 0 && this.weapons!.getLength() > 0)
      this.handleAttackEnemies();
  }

  // 울트론1 생성
  private spawnUltron1() {
    const randomY = Phaser.Math.Between(
      this.ultron1!.displayHeight / 2,
      this.gameHeight - this.ultron1!.displayHeight / 2
    );
    this.ultron1 = this.physics.add
      .sprite(
        this.gameWidth + this.ultron1!.displayWidth / 2,
        randomY,
        'ultron1_1'
      )
      .setScale(this.ultron1Scale);

    this.enemies!.add(this.ultron1);

    // 울트론1 공격 핸들러 등록
    this.handleUltron1Attack();
  }

  // 울트론2 생성
  private spawnUltron2() {
    const randomY = Phaser.Math.Between(
      this.ultron2!.displayHeight / 2,
      this.gameHeight - this.ultron2!.displayHeight / 2
    );
    this.ultron2 = this.physics.add
      .sprite(
        this.gameWidth + this.ultron2!.displayWidth / 2,
        randomY,
        'ultron2_1'
      )
      .setScale(this.ultron2Scale);

    this.enemies!.add(this.ultron2);

    // 울트론2 리펄서 핸들러 등록
    this.handleUltron2Attack();
  }

  // 울트론3 생성
  private spawnUltron3() {
    const randomY = Phaser.Math.Between(
      this.ultron3!.displayHeight / 2,
      this.gameHeight - this.ultron3!.displayHeight / 2
    );
    this.ultron3 = this.physics.add
      .sprite(
        this.gameWidth + this.ultron3!.displayWidth / 2,
        randomY,
        'ultron3_1'
      )
      .setScale(this.ultron3Scale);

    this.enemies!.add(this.ultron3);
  }

  // 바위 생성
  private spawnRock() {
    const randomY = Phaser.Math.Between(
      this.rock!.displayHeight / 2,
      this.gameHeight - this.rock!.displayHeight / 2
    );
    this.rock = this.physics.add
      .sprite(this.gameWidth + this.rock!.displayWidth / 2, randomY, 'rock')
      .setScale(this.rockScale);

    this.enemies!.add(this.rock);
  }

  // 배경 위치 변경
  private updateBackgroundPos() {
    const background = this.background!;
    const backgroundCopy = this.backgroundCopy!;

    background.x -= this.backgroundSpeed;
    backgroundCopy.x -= this.backgroundSpeed;

    if (background.x <= -background.displayWidth)
      background.x = background.displayWidth;

    if (backgroundCopy.x <= -backgroundCopy.displayWidth)
      backgroundCopy.x = backgroundCopy.displayWidth;
  }

  // 아이언맨 위치 변경
  private updateIronmanPos() {
    const padding = 10;
    const ironmanWidth = this.ironman!.displayWidth;
    const ironmanHeight = this.ironman!.displayHeight;

    // 위치 조정
    this.ironman!.setVelocity(0);

    if (this.keys.cursors!.left.isDown)
      this.ironman!.setVelocityX(-this.ironmanSpeed);
    if (this.keys.cursors!.right.isDown)
      this.ironman!.setVelocityX(this.ironmanSpeed);

    if (this.keys.cursors!.up.isDown)
      this.ironman!.setVelocityY(-this.ironmanSpeed);
    if (this.keys.cursors!.down.isDown)
      this.ironman!.setVelocityY(this.ironmanSpeed);

    // 위치값 가져오기
    const posX =
      this.ironman!.x +
      (this.ironman!.body!.velocity.x * this.game.loop.delta) / 1000;
    const posY =
      this.ironman!.y +
      (this.ironman!.body!.velocity.y * this.game.loop.delta) / 1000;

    // 좌우 경계 확인 및 조정
    if (posX < padding + ironmanWidth / 2)
      this.ironman!.setX(padding + ironmanWidth / 2);
    if (posX > this.gameWidth - padding - ironmanWidth / 2)
      this.ironman!.setX(this.gameWidth - padding - ironmanWidth / 2);
    if (posY < padding + ironmanHeight / 2)
      this.ironman!.setY(padding + ironmanHeight / 2);
    if (posY > this.gameHeight - padding - ironmanHeight / 2)
      this.ironman!.setY(this.gameHeight - padding - ironmanHeight / 2);
  }

  private updateEnemiesPos() {
    // 울트론1 이동
    if (this.ultron1!.active) {
      this.ultron1!.x -= this.ultron1Speed;
      if (this.ultron1!.x < 0) {
        this.ultron1!.destroy();
        this.spawnUltron1();
      }
    }

    // 울트론2 이동
    if (this.ultron2!.active) {
      this.ultron2!.x -= this.ultron2Speed;
      if (this.ultron2!.x < 0) {
        this.ultron2!.destroy();
        this.isFiredUltronRepulsor = false;
        this.spawnUltron2();
      }
    }

    // 울트론3 이동
    if (this.ultron3!.active) {
      this.ultron3!.x -= this.ultron3Speed;
      if (this.ultron3!.x < 0) {
        this.ultron3!.destroy();
        this.spawnUltron3();
      }
    }

    // 바위 이동
    if (this.rock!.active) {
      this.rock!.x -= this.rockSpeed;
      if (this.rock!.x < 0) {
        this.rock!.destroy();
        this.spawnRock();
      }
    }
  }

  // 리펄서 위치 변경/제거
  private updateRepulsorPos() {
    this.repulsors!.children.entries.forEach((child) => {
      const repulsor = child as Phaser.Physics.Arcade.Sprite;

      // 리펄서 이동
      repulsor.x += this.repulsorSpeed;

      // 화면을 벗어나면 리펄서 제거
      if (repulsor.x > this.gameWidth) {
        repulsor.destroy();
        this.repulsors!.killAndHide(repulsor);
      }
    });
  }

  // 울트론2 리펄서 위치 변경/제거
  private updateUltronRepulsorPos() {
    this.ultronRepulsor!.x -= this.ultronRepulsorSpeed;
    if (this.ultronRepulsor!.x < 0) {
      this.ultronRepulsor!.destroy();
      if (this.ultron2) {
        this.setUltronMode(UltronType.ULTRON2, UltronMode.NORMAL);
      }
    }
  }

  // 유니빔 위치 변경
  private updateBeamPos() {
    // 아이언맨의 위치를 기준으로 유니빔 위치 업데이트
    const beamPosX = this.ironman!.x + this.beam!.displayWidth / 1.95;
    const beamPosY = this.ironman!.y - this.ironman!.displayHeight / 3.4;

    this.beam!.setPosition(beamPosX, beamPosY);
  }

  // 아이언맨 목숨 생성
  private createLives() {
    for (let i = 0; i < this.maxLives; i++) {
      let life = this.add
        .sprite(
          this.gameWidth / 28 + (i * this.gameWidth) / 30 / 1.3,
          this.gameHeight / 8,
          'life'
        )
        .setScale(this.lifeScale);

      this.lives.push(life);
    }
  }

  // 아이언맨 목숨 감소
  private decreaseLife() {
    if (this.lives.length > 0 && !this.isInvincible) {
      let life = this.lives.pop();
      if (life) life.destroy();
      this.isInvincible = true;
    }

    if (this.hitOverlapHandler)
      this.physics.world.removeCollider(this.hitOverlapHandler);

    this.time.addEvent({
      delay: this.invincibleDuration,
      callback: () => {
        this.isInvincible = false;

        this.handleIronmanHit();
      },
      callbackScope: this,
    });
  }

  // 스코어 업데이트
  private updateScore() {
    this.score += this.ScorePerFrame;
    this.scoreText.setText(`score ${this.score}`);
  }

  // 게이지 블럭 생성
  createGaugeBlocks() {
    this.gaugeWidth = this.gameWidth * 0.015;
    this.gaugeHeight = this.gameHeight * 0.04;

    let gaugePosX = this.gameWidth / 4;
    let gaugePosY = this.gameHeight / 40;

    for (let i = 0; i < this.maxGaugeBlock; i++) {
      let gaugeBlock = this.add.graphics();
      gaugeBlock.setPosition(
        gaugePosX + (this.gaugeWidth + this.gaugeWidth / 3) * i,
        gaugePosY
      );
      gaugeBlock.fillStyle(this.unfilledColor, 1.0);
      gaugeBlock.fillRect(0, 0, this.gaugeWidth, this.gaugeHeight);
      this.gaugeBlocks.push(gaugeBlock);
    }
  }

  // 게이지 블럭 업데이트
  private updateGaugeBlocks() {
    if (this.currentGaugeIndex < this.maxGaugeBlock) {
      let gaugeBlock = this.gaugeBlocks[this.currentGaugeIndex];
      gaugeBlock.clear();
      gaugeBlock.fillStyle(this.filledColor, 1.0);
      gaugeBlock.fillRect(0, 0, this.gaugeWidth, this.gaugeHeight);
      this.currentGaugeIndex++;
    }
  }

  // 게이지 블럭 리셋
  private resetGaugeBlocks() {
    if (this.currentGaugeIndex >= this.maxGaugeBlock) {
      for (let i = 0; i < this.gaugeBlocks.length; i++) {
        this.gaugeBlocks[i].clear();
        this.gaugeBlocks[i].fillStyle(this.unfilledColor, 1.0);
        this.gaugeBlocks[i].fillRect(0, 0, this.gaugeWidth, this.gaugeHeight);
      }
      this.currentGaugeIndex = 0;
    }
  }

  // 아이언맨 모드 변경
  private setIronmanMode(mode: IronmanMode) {
    this.ironmanMode = mode;

    if (this.ironman) {
      switch (this.ironmanMode) {
        case IronmanMode.NORMAL:
          this.ironman.setTexture('ironman1');
          break;
        case IronmanMode.REPULSOR:
          this.ironman.setTexture('ironman2');
          break;
        case IronmanMode.HIT:
          this.ironman.setTexture('ironman3');
          this.ironman.setPosition(
            this.ironman.x - this.ironman.displayWidth / 1.5,
            this.ironman.y - this.ironman.displayHeight / 8
          );
          break;
        case IronmanMode.GATHER:
          this.ironman.setTexture('ironman4');
          break;
        case IronmanMode.BEAM:
          this.ironman.setTexture('ironman5');
          break;
      }
    }
  }

  // 아이언맨 모드별 타이머 설정 함수
  private setupModeTimer(mode: IronmanMode) {
    // 리펄서 모드 타이머 제거
    if (this.repulsorTimerEvent) this.repulsorTimerEvent.remove();
    if (this.hitTimerEvent) this.hitTimerEvent.remove();

    switch (mode) {
      case IronmanMode.REPULSOR:
        this.setIronmanMode(mode);

        // 모드 유지 타이머 설정
        this.repulsorTimerEvent = this.time.addEvent({
          delay: this.repulsorModeDuration,
          callback: () => this.setIronmanMode(IronmanMode.NORMAL),
          callbackScope: this,
        });
        break;
      case IronmanMode.HIT:
        this.setIronmanMode(mode);

        // 모드 유지 타이머 설정
        this.hitTimerEvent = this.time.addEvent({
          delay: this.hitModeDuration,
          callback: () => {
            this.setIronmanMode(IronmanMode.NORMAL);
          },
          callbackScope: this,
        });
        break;
      case IronmanMode.GATHER:
        this.setIronmanMode(mode);
        this.isBeamModeActive = true;

        // 모드 유지 타이머 설정
        this.gatherTimerEvent = this.time.addEvent({
          delay: this.gatherModeDuration,
          callback: () => {
            this.setIronmanMode(IronmanMode.BEAM);
            this.fireBeam();
          },
          callbackScope: this,
        });
        break;
      case IronmanMode.BEAM:
        // 모드 유지 타이머 설정
        this.beamTimerEvent = this.time.addEvent({
          delay: this.beamModeDuration,
          callback: () => {
            this.setIronmanMode(IronmanMode.NORMAL);
            this.beam!.destroy();
            this.isBeamModeActive = false;
            this.resetGaugeBlocks();
          },
          callbackScope: this,
        });
        break;
    }
  }

  // 울트론 모드 변경
  private setUltronMode(type: UltronType, mode: UltronMode) {
    if (type === UltronType.ULTRON1 && this.ultron1?.active) {
      switch (mode) {
        case UltronMode.NORMAL:
          this.ultron1.setTexture('ultron1_1');
          break;
        case UltronMode.ATTACK:
          this.ultron1.setTexture('ultron1_2');
          break;
      }
    }
    if (type === UltronType.ULTRON2 && this.ultron2?.active) {
      switch (mode) {
        case UltronMode.NORMAL:
          this.ultron2.setTexture('ultron2_1');
          break;
        case UltronMode.ATTACK:
          this.ultron2.setTexture('ultron2_2');
          break;
      }
    }
  }

  // 아이언맨 피격
  private handleIronmanHit() {
    this.hitOverlapHandler = this.physics.add.overlap(
      this.ironman!,
      this.enemies!,
      () => {
        this.setupModeTimer(IronmanMode.HIT);
        this.decreaseLife();
      },
      () =>
        this.ironman &&
        this.enemies &&
        !this.isInvincible &&
        !this.isBeamModeActive,
      this
    );
  }

  // 적 공격
  private handleAttackEnemies() {
    this.attackOverlapHandler = this.physics.add.overlap(
      this.enemies!,
      this.weapons!,
      (enemy: any, weapon: any) => {
        if (enemy && weapon) {
          switch (enemy) {
            case this.ultron1:
              console.log('ultron1');
              if (this.ultron1OverlapHandler)
                this.physics.world.removeCollider(this.ultron1OverlapHandler);
              this.spawnUltron1();
              break;
            case this.ultron2:
              console.log('ultron2');
              if (this.ultronRepulsorTimerEvent)
                this.ultronRepulsorTimerEvent.destroy();
              this.spawnUltron2();
              break;
            case this.ultron3:
              console.log('ultron3');
              this.spawnUltron3();
              break;
          }
          switch (weapon.getData('weaponType')) {
            case 'repulsor':
              weapon.destroy();
              break;
            case 'beam':
              break;
          }

          enemy.destroy();
          this.updateGaugeBlocks();
        }
      },
      undefined,
      this
    );
  }

  // 울트론1 공격
  private handleUltron1Attack() {
    if (this.ultron1OverlapHandler)
      this.physics.world.removeCollider(this.ultron1OverlapHandler);

    this.ultron1OverlapHandler = this.physics.add.overlap(
      this.ironman!,
      this.ultron1!,
      () => {
        this.setUltronMode(UltronType.ULTRON1, UltronMode.ATTACK);

        this.time.addEvent({
          delay: this.ultron1ModeDuration,
          callback: () => {
            this.setUltronMode(UltronType.ULTRON1, UltronMode.NORMAL);
          },
          callbackScope: this,
        });
      },
      undefined,
      this
    );
  }

  // 울트론2 공격
  private handleUltron2Attack() {
    this.ultronRepulsorTimerEvent = this.time.addEvent({
      delay: this.ultronRepulsorFireDuration,
      callback: () => {
        this.setUltronMode(UltronType.ULTRON2, UltronMode.ATTACK);
        this.fireUltronRepulsor();
      },
      callbackScope: this,
    });
  }

  // 리펄서 발사
  private fireRepulsor() {
    this.nextRepulsorTime = this.time.now + this.repulsorDelayTime;

    // 위치 지정
    const posX = this.ironman!.x + this.ironman!.displayWidth / 0.9;
    const posY = this.ironman!.y - this.ironman!.displayHeight / 3.5;

    // 발사
    let repulsor = this.physics.add
      .sprite(posX, posY, 'repulsor')
      .setScale(this.repulsorScale)
      .setData('weaponType', 'repulsor');
    this.repulsors!.add(repulsor);
    this.weapons!.add(repulsor);
  }

  // 유니빔 발사
  private fireBeam() {
    // 위치 지정
    const posX = this.ironman!.x + this.beam!.displayWidth / 1.9;
    const posY = this.ironman!.y - this.ironman!.displayHeight / 3.4;

    // 발사
    this.beam = this.physics.add
      .sprite(posX, posY, 'beam')
      .setScale(this.beamScale)
      .setData('weaponType', 'beam');

    this.weapons!.add(this.beam);
  }

  // 울트론2 리펄서 발사
  private fireUltronRepulsor() {
    if (this.isFiredUltronRepulsor) return;

    // 위치 지정
    const posX = this.ultron2!.x - this.ultron2!.displayWidth / 1.5;
    const posY = this.ultron2!.y - this.ultron2!.displayHeight / 3;

    // 발사
    this.ultronRepulsor = this.physics.add
      .sprite(posX, posY, 'ultronRepulsor')
      .setScale(this.ultronRepulsorScale);

    this.isFiredUltronRepulsor = true;
    this.enemies!.add(this.ultronRepulsor);
  }
}
