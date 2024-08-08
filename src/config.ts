// 스크린 대비 Sprite 크기
export const scaleConfig = {
  background: 1,
  ironman: 0.2,
  ultron1: 0.18,
  ultron2: 0.2,
  ultron3: 0.1,
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
  ultron3: 16,
  rock: 4,
  repulsor: 16,
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
  ultron1ModeDuration: 500,
  ultronRepulsorFireDuration: 800,
};

// 시간 간격
export const intervalConfig = {
  repulsorFireTime: 200,
  repulsorFireDistance: 4,
};

// 충돌 감지 존 위치 요소
export const collisionElementConfig = {
  ironman: {
    normal: [
      { x: 34, y: 0, w: 21, h: 13 },
      { x: 13, y: 13, w: 55, h: 12 },
      { x: 0, y: 25, w: 100, h: 12 },
      { x: 30, y: 37, w: 36, h: 12 },
      { x: 26, y: 49, w: 68, h: 15 },
      { x: 20, y: 64, w: 40, h: 5 },
      { x: 14, y: 69, w: 20, h: 10 },
      { x: 10, y: 79, w: 10, h: 21 },
    ],
    repulsor: [
      { x: 56, y: 0, w: 9, h: 7 },
      { x: 27, y: 7, w: 71, h: 17 },
      { x: 32, y: 24, w: 26, h: 23 },
      { x: 22, y: 47, w: 34, h: 15 },
      { x: 12, y: 62, w: 44, h: 10 },
      { x: 10, y: 72, w: 10, h: 6 },
      { x: 6, y: 78, w: 8, h: 10 },
      { x: 0, y: 88, w: 10, h: 12 },
    ],
    hit: [
      { x: 24, y: 0, w: 17, h: 10 },
      { x: 8, y: 10, w: 90, h: 16 },
      { x: 0, y: 26, w: 57, h: 11 },
      { x: 30, y: 37, w: 66, h: 15 },
      { x: 42, y: 52, w: 48, h: 5 },
      { x: 50, y: 57, w: 30, h: 6 },
      { x: 57, y: 63, w: 18, h: 28 },
      { x: 68, y: 91, w: 16, h: 9 },
    ],
    gather: [
      { x: 56, y: 0, w: 21, h: 7 },
      { x: 26, y: 7, w: 58, h: 24 },
      { x: 34, y: 31, w: 34, h: 8 },
      { x: 30, y: 39, w: 50, h: 8 },
      { x: 29, y: 47, w: 60, h: 12 },
      { x: 27, y: 59, w: 67, h: 8 },
      { x: 18, y: 67, w: 75, h: 12 },
      { x: 8, y: 79, w: 90, h: 10 },
      { x: 0, y: 89, w: 100, h: 11 },
    ],
    beam: [
      { x: 44, y: 0, w: 17, h: 13 },
      { x: 28, y: 13, w: 47, h: 11 },
      { x: 0, y: 24, w: 100, h: 13 },
      { x: 39, y: 37, w: 36, h: 10 },
      { x: 33, y: 47, w: 54, h: 12 },
      { x: 29, y: 59, w: 63, h: 8 },
      { x: 18, y: 67, w: 75, h: 12 },
      { x: 8, y: 79, w: 90, h: 10 },
      { x: 0, y: 89, w: 100, h: 11 },
    ],
  },
};
