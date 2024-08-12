import Repulsor from './objects/weapons/repulsor';
import UltronRepulsor from './objects/weapons/ultronRepulsor';

// 스크린 대비 Sprite 크기
export const scaleConfig = {
  background: 1,
  ironman: 0.07,
  ultron1: 0.12,
  ultron2: 0.09,
  ultron3: 0.18,
  rock: 0.15,
  repulsor: 0.05,
  beam: 0.8,
  ultronRepulsor: 0.05,
  health: 0.035,
  score: 0.03,
};

// 콘텐츠 속도
export const speedConfig = {
  background: 4,
  ironman: 10,
  ultron1: 10,
  ultron2: 6,
  ultron3: 14,
  rock: 4,
  repulsor: 14,
  ultronRepulsor: 8,
};

// 캐릭터 콘텐츠 체력
export const healthConfig = {
  ironman: 5,
  ultron1: 300,
  ultron2: 200,
  ultron3: 200,
  rock: 700,
};

// 무기 콘텐츠 공격력
export const damageConfig = {
  repulsor: 100,
  beam: 30,
  ultronRepulsor: 100,
};

// 콘텐츠 최대 개수
export const maxConfig = {
  gauge: 20,
  repulsor: 3,
};

// 콘텐츠 스코어
export const scoreConfig = {
  normal: 1,
  ultron1: 200,
  ultron2: 200,
  ultron3: 100,
  rock: 300,
};

// 빌런 콘텐츠 게이지 개수
export const gaugeConfig = {
  ultron1: 2,
  ultron2: 2,
  ultron3: 1,
  rock: 3,
};

// 타이머 이벤트 시간
export const timerConfig = {
  repulsorModeDuration: 300,
  hitModeDuration: 2000,
  gatherModeDuration: 1500,
  beamModeDuration: 5000,
  hitSetupDuration: 3000,
  ultronModeDuration: 500,
  ultronRepulsorFireDuration: 800,
};

// 시간 간격
export const intervalConfig = {
  repulsorFireTime: 200,
  repulsorFireDistance: 4,
};

// 충돌 감지 존 위치 요소
export const collisionElementConfig = {
  heros: {
    ironman: {
      normal: [
        { x: -5, y: -44, w: 18, h: 12 },
        { x: -10, y: -32, w: 55, h: 12 },
        { x: 0, y: -19, w: 100, h: 14 },
        { x: -2, y: -7, w: 36, h: 10 },
        { x: 10, y: 5, w: 68, h: 14 },
        { x: -5, y: 15, w: 34, h: 6 },
        { x: -28, y: 23, w: 20, h: 10 },
        { x: -35, y: 39, w: 10, h: 22 },
      ],
      repulsor: [
        { x: 10, y: -46, w: 10, h: 6 },
        { x: 12, y: -34, w: 72, h: 18 },
        { x: -2, y: -18, w: 26, h: 14 },
        { x: -10, y: -4, w: 30, h: 14 },
        { x: -11, y: 8, w: 36, h: 10 },
        { x: -15, y: 18, w: 44, h: 10 },
        { x: -37, y: 28, w: 8, h: 10 },
        { x: -44, y: 41, w: 10, h: 16 },
      ],
      hit: [
        { x: -17, y: -45, w: 18, h: 10 },
        { x: 2, y: -32, w: 90, h: 16 },
        { x: -22, y: -18, w: 55, h: 12 },
        { x: 13, y: -5, w: 66, h: 14 },
        { x: 15, y: 4, w: 48, h: 4 },
        { x: 12, y: 8, w: 30, h: 4 },
        { x: 16, y: 24, w: 16, h: 28 },
        { x: 25, y: 43, w: 16, h: 10 },
      ],
      gather: [
        { x: 15, y: -46, w: 21, h: 6 },
        { x: 5, y: -31, w: 58, h: 24 },
        { x: 1, y: -15, w: 34, h: 8 },
        { x: 5, y: -7, w: 50, h: 8 },
        { x: 9, y: 3, w: 62, h: 12 },
        { x: 11, y: 13, w: 67, h: 8 },
        { x: 4, y: 23, w: 75, h: 12 },
        { x: 1, y: 34, w: 90, h: 10 },
        { x: 0, y: 44, w: 100, h: 10 },
      ],
      beam: [
        { x: 2, y: -43, w: 17, h: 14 },
        { x: 1, y: -31, w: 47, h: 10 },
        { x: -1, y: -20, w: 97, h: 12 },
        { x: 7, y: -9, w: 36, h: 10 },
        { x: 10, y: 2, w: 54, h: 12 },
        { x: 10, y: 12, w: 63, h: 8 },
        { x: 4, y: 22, w: 76, h: 12 },
        { x: 2, y: 33, w: 90, h: 10 },
        { x: 0, y: 44, w: 100, h: 12 },
      ],
    },
  },
  enemies: {
    ultron1: {
      normal: [
        { x: -27, y: -45, w: 12, h: 8 },
        { x: -19, y: -35, w: 60, h: 12 },
        { x: -11, y: -26, w: 41, h: 6 },
        { x: -11, y: -14, w: 35, h: 18 },
        { x: -4, y: 5, w: 52, h: 20 },
        { x: 2, y: 18, w: 64, h: 6 },
        { x: 10, y: 30, w: 72, h: 18 },
        { x: 44, y: 44, w: 10, h: 10 },
      ],
      attack: [
        { x: -12, y: -45, w: 10, h: 10 },
        { x: 0, y: -36, w: 36, h: 8 },
        { x: -14, y: -26, w: 71, h: 12 },
        { x: 3, y: -13, w: 28, h: 14 },
        { x: 4, y: 0, w: 38, h: 12 },
        { x: 6, y: 9, w: 42, h: 6 },
        { x: 16, y: 24, w: 57, h: 24 },
        { x: 45, y: 42, w: 8, h: 12 },
      ],
    },
    ultron2: {
      normal: [
        { x: -13, y: -45, w: 16, h: 10 },
        { x: -3, y: -36, w: 46, h: 8 },
        { x: -2, y: -22, w: 94, h: 20 },
        { x: 2, y: -9, w: 29, h: 6 },
        { x: -4, y: 5, w: 58, h: 22 },
        { x: 4, y: 22, w: 69, h: 12 },
        { x: 4, y: 33, w: 80, h: 10 },
        { x: 42, y: 43, w: 14, h: 10 },
      ],
      attack: [
        { x: -12, y: -45, w: 10, h: 10 },
        { x: -20, y: -32, w: 56, h: 16 },
        { x: -3, y: -20, w: 25, h: 8 },
        { x: 4, y: -11, w: 28, h: 10 },
        { x: 3, y: 1, w: 43, h: 14 },
        { x: 12, y: 18, w: 60, h: 20 },
        { x: 12, y: 32, w: 65, h: 8 },
        { x: 44, y: 42, w: 9, h: 12 },
      ],
    },
    ultron3: {
      normal: [
        { x: -11, y: -46, w: 6, h: 4 },
        { x: -11, y: -38, w: 26, h: 12 },
        { x: -24, y: -24, w: 51, h: 16 },
        { x: -19, y: -9, w: 55, h: 14 },
        { x: -14, y: 3, w: 58, h: 10 },
        { x: 12, y: 14, w: 66, h: 12 },
        { x: 22, y: 28, w: 54, h: 16 },
        { x: 45, y: 42, w: 8, h: 12 },
      ],
      attack: [
        { x: -11, y: -46, w: 6, h: 4 },
        { x: -11, y: -38, w: 26, h: 12 },
        { x: -24, y: -24, w: 51, h: 16 },
        { x: -19, y: -9, w: 55, h: 14 },
        { x: -14, y: 3, w: 58, h: 10 },
        { x: 12, y: 14, w: 66, h: 12 },
        { x: 22, y: 28, w: 54, h: 16 },
        { x: 45, y: 42, w: 8, h: 12 },
      ],
    },
    rock: {
      normal: [
        { x: 14, y: -45, w: 44, h: 10 },
        { x: 7, y: -34, w: 81, h: 12 },
        { x: 5, y: -21, w: 90, h: 14 },
        { x: 2, y: -7, w: 95, h: 14 },
        { x: -1, y: 7, w: 96, h: 14 },
        { x: -4, y: 21, w: 92, h: 14 },
        { x: -10, y: 34, w: 76, h: 12 },
        { x: -24, y: 45, w: 31, h: 10 },
      ],
      attack: [
        { x: 14, y: -45, w: 44, h: 10 },
        { x: 7, y: -34, w: 81, h: 12 },
        { x: 5, y: -21, w: 90, h: 14 },
        { x: 2, y: -7, w: 95, h: 14 },
        { x: -1, y: 7, w: 96, h: 14 },
        { x: -4, y: 21, w: 92, h: 14 },
        { x: -10, y: 34, w: 76, h: 12 },
        { x: -24, y: 45, w: 31, h: 10 },
      ],
    },
  },
  weapons: {
    repulsor: {
      normal: [
        { x: 18, y: -44, w: 28, h: 8 },
        { x: 19, y: -34, w: 46, h: 12 },
        { x: 15, y: -21, w: 68, h: 14 },
        { x: 2, y: -7, w: 96, h: 14 },
        { x: 2, y: 7, w: 96, h: 14 },
        { x: 15, y: 21, w: 68, h: 14 },
        { x: 19, y: 34, w: 46, h: 12 },
        { x: 18, y: 44, w: 26, h: 8 },
      ],
    },
    beam: {
      normal: [
        { x: -43, y: -43, w: 4, h: 8 },
        { x: -42, y: -33, w: 12, h: 10 },
        { x: -1, y: -21, w: 95, h: 14 },
        { x: 0, y: -7, w: 99, h: 14 },
        { x: 0, y: 7, w: 99, h: 14 },
        { x: -1, y: 21, w: 95, h: 14 },
        { x: -41, y: 33, w: 12, h: 10 },
        { x: -42, y: 43, w: 8, h: 8 },
      ],
    },
    ultronRepulsor: {
      normal: [
        { x: -30, y: -43, w: 10, h: 6 },
        { x: -30, y: -34, w: 24, h: 12 },
        { x: -28, y: -21, w: 38, h: 14 },
        { x: -6, y: -7, w: 88, h: 14 },
        { x: -6, y: 7, w: 88, h: 14 },
        { x: -28, y: 21, w: 38, h: 14 },
        { x: -30, y: 34, w: 24, h: 12 },
        { x: -30, y: 43, w: 10, h: 6 },
      ],
    },
  },
};
