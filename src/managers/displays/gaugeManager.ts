import Phaser from 'phaser';
import StateManager from '../stateManager';
import Gauge from '../../objects/displays/gauge';
import { EnemyType, StateName } from '../../enum';
import { gaugeConfig, maxConfig } from '../../config';

export default class GaugeManager {
  private scene: Phaser.Scene;
  private stateManager: StateManager;
  private gaugeBar: Gauge[];

  constructor(scene: Phaser.Scene, stateManager: StateManager) {
    this.scene = scene;
    this.stateManager = stateManager;
    this.gaugeBar = [];

    this.createGaugeBar();
  }

  // 게이지 바 생성
  public createGaugeBar() {
    const gameWidth = this.scene.game.canvas.width;
    const gameHeight = this.scene.game.canvas.height;

    this.gaugeBar = Array.from({ length: maxConfig.gauge }, (_, i) => {
      let gauge = new Gauge(this.scene);

      const width = gauge.getSize().width;
      const height = gauge.getSize().height;
      const spacing = i * (width + width / 3);

      gauge
        .setPosition(gameWidth / 40 + spacing, gameHeight / 11)
        .fillStyle(gauge.getColor().unfilled, 1.0)
        .fillRect(0, 0, width, height);

      return gauge;
    });
  }

  // 게이지 바 업데이트
  public updateGauges(enemyType: EnemyType) {
    // 빌런의 게이지 업데이트 개수 가져오기
    const count = gaugeConfig[enemyType];
    const currentGaugeCount = this.stateManager.getCount(
      StateName.CURRENT_GAUGE_COUNT
    );

    if (currentGaugeCount >= maxConfig.gauge) return;

    // 업데이트할 게이지 수 계산
    const endGaugeIndex = Math.min(currentGaugeCount + count, maxConfig.gauge);

    // 현재 인덱스부터 endGaugeIndex까지 인덱스 배열 생성
    const indexesToUpdate = Array.from(
      { length: endGaugeIndex - currentGaugeCount },
      (_, i) => currentGaugeCount + i
    );

    // 게이지 색상 업데이트
    indexesToUpdate.forEach((index) => {
      const gauge = this.gaugeBar[index];
      gauge.clear();
      gauge.fillStyle(gauge.getColor().filled, 1.0);
      gauge.fillRect(0, 0, gauge.getSize().width, gauge.getSize().height);
    });

    // 게이지 카운트 업데이트
    this.stateManager.updateCount(StateName.CURRENT_GAUGE_COUNT, endGaugeIndex);
  }

  // 게이지 바 리셋
  public resetGauges() {
    if (
      this.stateManager.getCount(StateName.CURRENT_GAUGE_COUNT) <
      maxConfig.gauge
    )
      return;

    this.gaugeBar.forEach((gauge) => {
      gauge.clear();
      gauge.fillStyle(gauge.getColor().unfilled, 1.0);
      gauge.fillRect(0, 0, gauge.getSize().width, gauge.getSize().height);
    });

    // 게이지 카운트 업데이트
    this.stateManager.updateCount(StateName.CURRENT_GAUGE_COUNT, 0);
  }
}
