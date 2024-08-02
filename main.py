import pygame
import random

pygame.init()

#================================================= 게임 기본 설정 =========================================================

# 아이콘
gameIcon = pygame.image.load('assets/images/life.png')
pygame.display.set_icon(gameIcon)

# 화면 크기
screenWidth = 1024
screenHeight = 600
screen = pygame.display.set_mode((screenWidth, screenHeight))

# 게임 타이틀
pygame.display.set_caption("I am Ironman")

# FPS
clock = pygame.time.Clock()

# 폰트
gameFontBig = pygame.font.Font(None, 60) # 폰트 객체 생성 (폰트, 크기)
gameFontSmall = pygame.font.Font(None, 40)

# 게임 모드
gameMode = 0 # (0: 시작 화면, 1: 플레이 화면, 2: 게임오버 화면)



#================================================= 컨텐츠 설정 ===========================================================

# 사운드
backgroundSound = pygame.mixer.Sound('assets/sounds/background.mp3').play() # 배경음악
repulsorSound = pygame.mixer.Sound('assets/sounds/repulsor.wav')
attackSound = pygame.mixer.Sound('assets/sounds/attack.wav')
hitSound = pygame.mixer.Sound('assets/sounds/hit.wav')
gameoverSound = pygame.mixer.Sound('assets/sounds/gameover.mp3')

# 배경 이미지
background = pygame.image.load('assets/images/background.png')
backgroundSize = background.get_rect().size
backgroundWidth = backgroundSize[0]
backgroundHeight = backgroundSize[1]
backgroundPosX = 0
backgroundPosX2 = screenWidth
backgroundPosY = 0


# 아이언맨 이미지 / 좌표
ironmanMotion1 = pygame.image.load('assets/images/ironman.png')
ironmanMotion2 = pygame.image.load('assets/images/ironman_2.png')
ironmanMotion3 = pygame.image.load('assets/images/ironman_3.png')
ironmanMotion4 = pygame.image.load('assets/images/ironman_4.png')
ironmanMotion5 = pygame.image.load('assets/images/ironman_5.png')
ironman = ironmanMotion1

ironmanSize = ironman.get_rect().size
ironmanWidth = ironmanSize[0]
ironmanHeight = ironmanSize[1]
ironmanPosX = -ironmanWidth # 화면 밖(왼쪽)에서 등장
ironmanPosY = (screenHeight / 2) - (ironmanHeight / 2)


# 울트론1 이미지 / 좌표
ultronMotion1 = pygame.image.load('assets/images/ultron.png')
ultronMotion2 = pygame.image.load('assets/images/ultron_1_2.png')
ultron = ultronMotion1

ultronSize = ultron.get_rect().size
ultronWidth = ultronSize[0]
ultronHeight = ultronSize[1]
ultronPosX = screenWidth - ultronWidth
ultronPosY = random.randint(0, screenHeight - ultronHeight)

# 울트론2 이미지 / 좌표
ultron2Motion1 = pygame.image.load('assets/images/ultron_2.png')
ultron2Motion2 = pygame.image.load('assets/images/ultron_2_2.png')
ultron2 = ultron2Motion1

ultron2Size = ultron2.get_rect().size
ultron2Width = ultron2Size[0]
ultron2Height = ultron2Size[1]
ultron2PosX = screenWidth - ultron2Width
ultron2PosY = random.randint(0, screenHeight - ultron2Height)

# 울트론3 이미지 / 좌표
ultron3 = pygame.image.load('assets/images/ultron_3.png')
ultron3Size = ultron3.get_rect().size
ultron3Width = ultron3Size[0]
ultron3Height = ultron3Size[1]
ultron3PosX = screenWidth - ultron2Width
ultron3PosY = random.randint(0, screenHeight - ultron3Height)

# 바위 이미지 / 좌표
rock = pygame.image.load('assets/images/rock.png')
rockSize = rock.get_rect().size
rockWidth = rockSize[0]
rockHeight = rockSize[1]
rockPosX = screenWidth - rockWidth
rockPosY = random.randint(0, screenHeight - rockHeight)


# 리펄서 이미지
repulsor = pygame.image.load('assets/images/repulsor.png')
repulsorSize = repulsor.get_rect().size
repulsorWidth = repulsorSize[0]
repulsorHeight = repulsorSize[1]
repulsors = []

# 빔 이미지 / 좌표
beam = pygame.image.load('assets/images/beam.png')
beamSize = beam.get_rect().size
beamWidth = beamSize[0]
beamHeight = beamSize[1]
beamPosX = screenWidth
beamPosY = screenHeight

# 울트론2 리펄서 이미지
repulsor_2 = pygame.image.load('assets/images/repulsor_ultron.png')
repulsor_2Size = repulsor_2.get_rect().size
repulsor_2Width = repulsorSize[0]
repulsor_2Height = repulsorSize[1]
repulsor_2PosX = screenWidth
repulsor_2PosY = screenHeight


# 아이언맨 시작 포인트 이미지
ironmanStart = pygame.image.load('assets/images/ironman_start_position.png')
ironmanStartSize = ironmanStart.get_rect().size
ironmanStartWidth = ironmanStartSize[0]
ironmanStartHeight = ironmanStartSize[1]
ironmanStartPosX = screenWidth / 3
ironmanStartPosY = (screenHeight / 2) - (ironmanHeight / 2)

# 울트론2 리펄서 랜덤포인트 이미지
repulsor_2Random = pygame.image.load('assets/images/repulsor_ultron_random.png')
repulsor_2RandomSize = repulsor_2Random.get_rect().size
repulsor_2RandomWidth = repulsorSize[0]
repulsor_2RandomHeight = repulsorSize[1]
repulsor_2RandomPosX = random.randint(512, screenWidth- ultron2Width)
repulsor_2RandomPosY = ultron2PosY


# 목숨 이미지
ironmanLife = pygame.image.load('assets/images/life.png')
ironmanLifeSize = ironman.get_rect().size
ironmanLifeWidth = ironmanSize[0]
ironmanLifeHeight = ironmanSize[1]
ironmanLifes = [(10,50), (40,50), (70,50)]

# 빔 게이지 이미지 / 좌표
gaugeFill = pygame.image.load('assets/images/gauge_fill.png')
gaugeShadow = pygame.image.load('assets/images/gauge_shadow.png')
gaugeFillSize = gaugeFill.get_rect().size
gaugeFillWidth = gaugeFillSize[0]
gaugeFillHeight = gaugeFillSize[1]
gaugeFills = [(250,10), (265,10), (280,10), (295,10), (310,10), (325,10), (340,10), (355,10), (370,10), (385,10)]



#================================================ 부가 컨텐츠 설정 ========================================================

# 컨텐츠 속도
backgroundSpeed = 0.1 # 배경
ironmanSpeed = 0.3 # 아이언맨
ultronSpeed = 0.3 # 울트론1
ultron2Speed = 0.15 # 울트론2
ultron3Speed = 0.6 # 울트론3
rockSpeed = 0.15 # 바위
repulsorSpeed = 0.5 # 리펄서
repulsor_2Speed = 0.6 # 울트론2 리펄서

# 적 피통
ultronStack = 2
ultron2Stack = 2
ultron3Stack = 1
rockStack = 3

# 리펄서 부가 설정
repulsorMax = 3 # 발사수
nextRepulsorTime = 0 # 발사 시간
repulsorDelayTime = 200 # 딜레이 시간

# 상단바 변수
score = 0
life = 3 # 초기 아이언맨 목숨 개수
beamGauge = 0 # 빔샷 게이지 모음 (100단위)

# 경우의 수 확인 변수
repulsorsRem = -1 # 리펄서 충돌 여부
repulsorsDis = -1 # 리펄서 이탈 여부
ironmanLifeRem = -1 # 목숨 삭제 여부

# 형태 구분 변수
ironmanMode = 0 # 이미지 변환시 꼬임을 방지하는 역할 ( 0: 기본, 1: 빔 발사 )
beamMode = 0 # 빔 위치 지정 / 아이언맨 이미지 구분 시 사용 ( 0: 기본, 1: 발동, 2: 준비, 3: 발사 )
ultronRepulsorMode = 0 # 울트론2 리펄서 발동 ( 0: 기본, 1: 리펄서 발사 )

# 아이언맨 이동 좌표 크기
toX = 0
toY = 0

# 초기 시간 설정
gameStartTime = 0
collidedTime = 0 # 최근 충돌 시간
ironmanTransTime = 0
ultronTransTime = 0
beamTime = 0

# 메세지
gameMsg = ''


#===================================================== 함수 =============================================================

# 게임 컨텐츠 초기 세팅하기
def gameReset():
    global background, ironman, ultron, ultron2, ultron3, backgroundPosX, backgroundPosX2, backgroundPosY, ironmanPosX, ironmanPosY, ultronPosX, ultronPosY, ultron2PosX, ultron3PosX, ultron3PosY,  rockPosX, rockPosY ,repulsors, beamPosX, beamPosY, repulsor_2PosX, repulsor_2PosY, repulsor_2RandomPosX, repulsor_2RandomPosY, ironmanLifes, ultronStack, ultron2Stack, ultron3Stack, rockStack, score, life, beamGauge, repulsorsRem, repulsorsDis, ironmanLifeRem, ironmanMode, beamMode, ultronRepulsorMode,toX, toY, gameStartTime, collidedTime, ironmanTransTime, ultronTransTime, beamTime, gameMsg
    background = background
    ironman = ironmanMotion1
    ultron = ultron
    ultron2 = ultron2
    ultron3 = ultron3
    backgroundPosX = 0
    backgroundPosX2 = screenWidth
    backgroundPosY = 0
    ironmanPosX = -ironmanWidth  # 화면 밖(왼쪽)에서 등장
    ironmanPosY = (screenHeight / 2) - (ironmanHeight / 2)
    ultronPosX = screenWidth - ultronWidth
    ultronPosY = random.randint(0, screenHeight - ultronHeight)
    ultron2PosX = screenWidth - ultron2Width
    ultron2PosY = random.randint(0, screenHeight - ultron2Height)
    ultron3PosX = screenWidth - ultron3Width
    ultron3PosY = random.randint(0, screenHeight - ultron3Height)
    rockPosX = screenWidth - rockWidth
    rockPosY = random.randint(0, screenHeight - rockHeight)
    repulsors = []
    beamPosX = screenWidth
    beamPosY = screenHeight
    repulsor_2PosX = screenWidth
    repulsor_2PosY = screenHeight
    repulsor_2RandomPosX = random.randint(512, screenWidth - ultron2Width)
    repulsor_2RandomPosY = ultron2PosY
    ironmanLifes = [(10, 50), (40, 50), (70, 50)]

    # 적 피통
    ultronStack = 2
    ultron2Stack = 2
    ultron3Stack = 1
    rockStack = 3

    # 상단바 변수
    score = 0
    life = 3  # 초기 아이언맨 목숨 개수
    beamGauge = 0  # 빔샷 게이지 모음 (100단위)

    # 경우의 수 확인 변수
    repulsorsRem = -1  # 리펄서 충돌 여부
    repulsorsDis = -1  # 리펄서 이탈 여부
    ironmanLifeRem = -1  # 목숨 삭제 여부

    # 형태 구분 변수
    ironmanMode = 0  # 이미지 변환시 꼬임을 방지하는 역할 ( 0: 기본, 1: 빔 발사 )
    beamMode = 0  # 빔 위치 지정 / 아이언맨 이미지 구분 시 사용 ( 0: 기본, 1: 발동, 2: 준비, 3: 발사 )
    ultronRepulsorMode = 0  # 울트론2 리펄서 발동 ( 0: 기본, 1: 리펄서 발사 )

    # 아이언맨 이동 좌표 크기
    toX = 0
    toY = 0

    # 초기 시간 설정
    gameStartTime = 0
    collidedTime = 0  # 최근 충돌 시간
    ironmanTransTime = 0
    ultronTransTime = 0
    beamTime = 0

    # 메세지
    gameMsg = ''

def gameStart():
    global gameMsg, gameStartTime, ironmanSpeed, gameMode
    gameMsg = 'GAME START'
    gameStartTime = currentTime
    ironmanSpeed = 0.3
    gameMode = 1

# 점수 올리기
def scoreUp(SCORE):
    global score
    score += SCORE

# 목숨 제거하기
def lifeDown(LIFE):
    global life, collidedTime, ironmanLifeRem
    if currentTime - collidedTime < 2000:
        life -= 0
    else:
        life -= 1
        ironmanLifeRem = LIFE - 1
        collidedTime = currentTime
        hitSound.play()
        transMode(ironmanMotion3)

# 이미지(mode) 바꾸기
def transMode(WHO):
    global ironman, ironmanTransTime, ultron, ultron2, ultronTransTime
    if WHO == ironmanMotion2:
        ironman = ironmanMotion2
        ironmanTransTime = currentTime
    elif WHO == ironmanMotion3:
        ironman = ironmanMotion3
        ironmanTransTime = currentTime
    elif WHO == ultron:
        ultron = ultronMotion2
        ultronTransTime = currentTime
    elif WHO == ultron2:
        ultron2 = ultron2Motion2
        ultronTransTime = currentTime

# 적 공격하기
def attack(WHO):
    global beamGauge, ultronStack, ultron2Stack, ultron3Stack, rockStack, ultronPosX, ultronPosY, ultron2PosX, ultron2PosY, ultronRepulsorMode, ultron3PosX, ultron3PosY, rockPosX, rockPosY
    if WHO == ultron:
        if ultronStack == 1:
            ultronPosX = screenWidth - ultronWidth
            ultronPosY = random.randint(0, screenHeight - ultronHeight)
            ultronStack = 2
            beamGauge += 100
        else:
            ultronStack -= 1
    if WHO == ultron2:
        if ultron2Stack == 1:
            ultron2PosX = screenWidth - ultron2Width
            ultron2PosY = random.randint(0, screenHeight - ultron2Height)
            ultron2Stack = 2
            beamGauge += 100
            ultronRepulsorMode = 0
        else:
            ultron2Stack -= 1
    if WHO == ultron3:
        if ultron3Stack == 1:
            ultron3PosX = screenWidth - ultron3Width
            ultron3PosY = random.randint(0, screenHeight - ultron3Height)
            ultron2Stack = 1
            beamGauge += 100
        else:
            ultron2Stack -= 1
    if WHO == rock:
        if rockStack  == 1:
            rockPosX = screenWidth - rockWidth
            rockPosY = random.randint(0, screenHeight - rockHeight)
            rockStack = 3
            beamGauge += 300
        else:
            rockStack  -= 1

# 필살기(beam) 쏘기
def beamShot():
    global beamTime, beamMode, ironmanMode
    beamTime = currentTime
    beamMode = 1
    ironmanMode = 1

def ultronRepulsorShot():
    global ultronRepulsorMode
    ultronRepulsorMode = 1

# 리펄서 충돌 처리하기
def colliderRepulsor(RECT, SCORE, IDX):
    global repulsorsRem

    repulsorsRem = IDX
    scoreUp(SCORE)
    attack(RECT)
    attackSound.play()

# 빔 충돌 처리하기
def colliderBeam(RECT, SCORE):

    scoreUp(SCORE)
    attack(RECT)
    attackSound.play()

# 아이언맨 충돌 처리하기
def colliderironman(RECT):

    if beamMode == 3:
        if RECT == ultron:
            transMode(RECT)
    else:
        if RECT == ultron:
            transMode(RECT)
        lifeDown(life)

# 이탈된/충돌된 리펄서/목숨 삭제하기
def remove(REM, WHAT):
    global repulsorsDis, repulsorsRem, ironmanLifeRem
    if REM == repulsorsDis:  # 이탈된 리펄서은 0이상의 idx값을 가지므로 true일 경우
        repulsorsDis = -1
    elif REM == repulsorsRem: # 충돌된 리펄서은 0이상의 idx값을 가지므로 true일 경우
        repulsorsRem = -1
    elif REM == ironmanLifeRem:  # 충돌된 목숨은 0이상의 idx값을 가지므로 true일 경우
        ironmanLifeRem = -1
    del WHAT[REM] # 전달받은 'WHAT'에서 해당하는 idx의 값을 삭제

# 게임 종료하기
def gameOver():
    global gameMsg, gameMode
    gameMode = 2
    gameoverSound.play()

# 재시작/종료 여부 선택하기
def gameModeChoice(CHOICE):
    global gameMode, running

    if CHOICE == 'y':
        gameMode = 0
        gameReset()
    elif CHOICE == 'n':
        running = False


# def checkButtons(POS): # pos: 마우스 클릭 좌표
#     global running, gameMsg # 전역변수의 값을 바꾸기 위해선 명시주어야함
#     if startButton.collidepoint(POS): # startButton의 좌표들 안에 파라미터(pos)값이 있을 경우
#         gameMsg = ''


#================================================== 게임 구동 ===========================================================

running = True
while running:

    # 초당 프레임 수 설정
    dt = clock.tick(60)

    # 현재 시간 설정
    currentTime = pygame.time.get_ticks()


    #============================================== 게임 플레이 화면 ======================================================
    if gameMode == 1:

        # 게임 시작 메세지 삭제
        if currentTime - gameStartTime > 1500:
            gameMsg = ''

        # 아이언맨 모드 복귀
        if currentTime - ironmanTransTime > 400 and ironmanMode == 0:
            ironman = ironmanMotion1

        # 울트론1 모드 복귀
        if currentTime - ultronTransTime > 400:
            ultron = ultronMotion1

        # 울트론2 모드 복귀
        if currentTime - ultronTransTime > 800:
            ultron2 = ultron2Motion1

        # 빔 모드 변경
        if beamMode > 0:
            # 빔 준비
            if currentTime - beamTime <= 1000 and beamMode == 1:
                ironman = ironmanMotion4
                beamMode = 2
            # 빔 on
            elif 1000 < currentTime - beamTime <= 5000 and beamMode == 2:
                ironman = ironmanMotion5
                beamMode = 3
            # 빔 off
            elif currentTime - beamTime > 5000 and beamMode == 3:
                ironman = ironmanMotion1
                beamMode = 0 # 빔 모든 초기화
                ironmanMode = 0 # 아이언맨 모드 초기화
                beamGauge = 0 # 빔 게이지 초기화

        # 점수 상승
        score += 1

        # 이벤트 처리
        for event in pygame.event.get():

            if event.type == pygame.QUIT: # 창이 닫히는 이벤트
                running = False

            if event.type == pygame.MOUSEBUTTONUP: # 마우스가 클릭되는 이벤트
                clickPos = pygame.mouse.get_pos()

            if event.type == pygame.KEYDOWN: # 키가 눌러지는 이벤트
                if event.key == pygame.K_LEFT: # ←
                    toX -= ironmanSpeed
                elif event.key == pygame.K_RIGHT: # →
                    toX += ironmanSpeed
                elif event.key == pygame.K_UP: # ↑
                    toY -= ironmanSpeed
                elif event.key == pygame.K_DOWN: # ↓
                    toY += ironmanSpeed

                elif event.key == pygame.K_SPACE: # space bar
                    if len(repulsors) < repulsorMax and currentTime >= nextRepulsorTime: # repulsors의 발사 개수(리스트)가 최대가 되지 않고, 발사 가능 시간이 딜레이 시간을 지났다면
                        if not beamMode == 3: # 빔 발사 중에는 기본공격 불가
                            nextRepulsorTime = currentTime + repulsorDelayTime # 발사 가능 시간에 다시 딜레이 시간를 부여
                            repulsorPosX = ironmanPosX + ironmanWidth # 리펄서 위치 지정
                            repulsorPosY = ironmanPosY - 16
                            repulsors.append([repulsorPosX, repulsorPosY]) # 리펄서 발사 개수 추가
                            transMode(ironmanMotion2) # 아이언맨 이미지 변경
                            repulsorSound.play()

                elif event.key == pygame.K_b: # B
                    if beamGauge >= 1000: # 빔 게이지가 가득 찼을 경우
                        beamPosX = ironmanPosX + 35 # 빔 위치 지정
                        beamPosY = ironmanPosY + 16
                        beamShot() # 빔 발사


            if event.type == pygame.KEYUP: # 키가 떼지는 이벤트
                if event.key == pygame.K_LEFT or event.key == pygame.K_RIGHT:
                    toX = 0
                elif event.key == pygame.K_UP or event.key == pygame.K_DOWN:
                    toY = 0



        #======================================== 컨텐츠 위치 업데이트 [이동 표시] ==========================================

        # 배경 위치값 업데이트
        backgroundPosX -= backgroundSpeed * dt
        backgroundPosX2 -= backgroundSpeed * dt

        # 배경 위치 업데이트
        if backgroundPosX < -backgroundWidth:
            backgroundPosX = screenWidth

        if backgroundPosX2 < -backgroundWidth:
            backgroundPosX2 = screenWidth


        # 아이언맨 위치값 업데이트
        ironmanPosX += toX * dt
        ironmanPosY += toY * dt

        # 화면 경계값 처리(width)
        if ironmanPosX < 0:
            ironmanPosX = 0
        elif ironmanPosX > screenWidth - ironmanWidth:
            ironmanPosX = screenWidth - ironmanWidth

        # 화면 경계값 처리(height)
        if ironmanPosY < 0:
            ironmanPosY = 0
        elif ironmanPosY > screenHeight - ironmanHeight:
            ironmanPosY = screenHeight - ironmanHeight


        # 울트론1 위치값 업데이트
        ultronPosX -= ultronSpeed * dt

        # 울트론1 위치 재정의 (울트론1 위치 리셋)
        if ultronPosX < -ultronWidth:
            ultronPosX = screenWidth - ultronWidth
            ultronPosY = random.randint(0, screenHeight - ultronHeight)
            ultronStack = 2

        # 울트론2 위치값 업데이트
        ultron2PosX -= ultronSpeed * dt

        # 울트론2 위치 재정의 (위치 리셋)
        if ultron2PosX < -ultron2Width:
            ultron2PosX = screenWidth - ultron2Width
            ultron2PosY = random.randint(0, screenHeight - ultron2Height)
            ultron2Stack = 2
            repulsor_2RandomPosX = random.randint(512, ultron2PosX)
            repulsor_2RandomPosY = ultron2PosY

        # 울트론3 위치값 업데이트
        ultron3PosX -= ultron3Speed * dt

        # 울트론3 위치 재정의 (위치 리셋)
        if ultron3PosX < -ultron3Width:
            ultron3PosX = screenWidth - ultron3Width
            ultron3PosY = random.randint(0, screenHeight - ultron3Height)
            ultron3Stack = 1

        # 바위 위치값 업데이트
        rockPosX -= rockSpeed * dt

        # 바위 위치 재정의 (위치 리셋)
        if rockPosX < -rockWidth:
            rockPosX = screenWidth - rockWidth
            rockPosY = random.randint(0, screenHeight - rockHeight)
            rockStack = 3

        # 리펄서 위치 위치값 업데이트 / 재정의 (발사 위치)
        repulsors = [ [b[0] + repulsorSpeed * dt , b[1]] for b in repulsors ] # 발사된 리펄서 모음

        # 빔 위치 재정의 (발사 위치) -> 아이언맨이 돌아다닐 수 있기 때문.
        if beamMode == 3:
            beamPosX = ironmanPosX + 35
            beamPosY = ironmanPosY + 16
        else:
            beamPosX = screenWidth
            beamPosY = screenHeight



        #===================================== 컨텐츠 rect 정보 업데이트 [충돌 처리] ========================================

        # 아이언맨 rect 정보 업데이트
        ironmanRect = ironman.get_rect()
        ironmanRect.left = ironmanPosX
        ironmanRect.top = ironmanPosY

        # 울트론1 rect 정보 업데이트
        ultronRect = ultron.get_rect()
        ultronRect.left = ultronPosX
        ultronRect.top = ultronPosY

        # 울트론2 rect 정보 업데이트
        ultron2Rect = ultron2.get_rect()
        ultron2Rect.left = ultron2PosX
        ultron2Rect.top = ultron2PosY

        # 울트론3 rect 정보 업데이트
        ultron3Rect = ultron3.get_rect()
        ultron3Rect.left = ultron3PosX
        ultron3Rect.top = ultron3PosY

        # 바위 rect 정보 업데이트
        rockRect = rock.get_rect()
        rockRect.left = rockPosX
        rockRect.top = rockPosY

        # 리펄서 위치 / rect 정보 업데이트
        for repulsorIdx, repulsorVal in enumerate(repulsors): # 발사된 리펄서 위치
            repulsorPosX = repulsorVal[0]
            repulsorPosY = repulsorVal[1]

            repulsorRect = repulsor.get_rect()
            repulsorRect.left = repulsorPosX
            repulsorRect.top = repulsorPosY

            # 이탈 처리 (리펄서)
            if repulsorRect.left > screenWidth:
                repulsorsDis = repulsorIdx

            # 충돌 처리 (리펄서 vs ??)
            if repulsorRect.colliderect(ultronRect): # 울트론
                colliderRepulsor(ultron, 200, repulsorIdx)
            if repulsorRect.colliderect(ultron2Rect): # 울트론2
                colliderRepulsor(ultron2, 200, repulsorIdx)
            if repulsorRect.colliderect(ultron3Rect): # 울트론3
                colliderRepulsor(ultron3, 200, repulsorIdx)
            if repulsorRect.colliderect(rockRect): # 바위
                colliderRepulsor(rock, 300, repulsorIdx)

        # 빔 rect 정보 업데이트
        beamRect = beam.get_rect()
        beamRect.left = beamPosX
        beamRect.top = beamPosY

        # 충돌 처리 (빔 vs ??)
        if beamRect.colliderect(ultronRect): # 울트론
            colliderBeam(ultron, 200)
        elif beamRect.colliderect(ultron2Rect): # 울트론2
            colliderBeam(ultron2, 200)
        elif beamRect.colliderect(ultron3Rect): # 울트론3
            colliderBeam(ultron3, 200)
        elif beamRect.colliderect(rockRect): # 바위
            colliderBeam(rock, 300)

        # 울트론2 리펄서 랜덤 포인트 rect 정보 업데이트
        repulsor_2RandomRect = repulsor_2Random.get_rect()
        repulsor_2RandomRect.left = repulsor_2RandomPosX
        repulsor_2RandomRect.top = repulsor_2RandomPosY

        # 충돌 처리 (울트론2 vs 울트론2 리펄서 랜덤 포인트)
        if repulsor_2RandomRect.colliderect(ultron2Rect):
            ultronRepulsorShot()
            transMode(ultron2)
            repulsor_2PosX = ultron2PosX - 80 # 랜덤 포인트가 울트론2에 닿으면 리펄서 좌표 정의
            repulsor_2PosY = ultron2PosY - 30

        # 울트론2 리펄서 위치값 업데이트
        if ultronRepulsorMode == 1:
            repulsor_2PosX -= repulsor_2Speed * dt

        # 울트론2 리펄서 rect 정보 업데이트
        repulsor_2Rect = repulsor_2.get_rect()
        repulsor_2Rect.left = repulsor_2PosX
        repulsor_2Rect.top = repulsor_2PosY


        # 충돌 처리 (아이언맨 vs ??)
        if ironmanRect.colliderect(ultronRect): # 울트론1
            colliderironman(ultron)
        elif ironmanRect.colliderect(ultron2Rect): # 울트론2
            colliderironman(ultron2)
        elif ironmanRect.colliderect(ultron3Rect): # 울트론3
            colliderironman(ultron3)
        elif ironmanRect.colliderect(rockRect): # 바위
            colliderironman(rock)
        elif ironmanRect.colliderect(repulsor_2Rect): # 울트론2 리펄서
            colliderironman(repulsor_2)




        # 이탈된 / 충돌된 컨텐츠 제거
        if repulsorsDis > -1:  # 이탈된 리펄서는 0이상의 idx값을 가지므로 true일 경우
            remove(repulsorsDis, repulsors)
        if repulsorsRem > -1: # 충돌된 리펄서는 0이상의 idx값을 가지므로 true일 경우
            remove(repulsorsRem, repulsors)
        if ironmanLifeRem > -1:  # 충돌된 목숨은 0이상의 idx값을 가지므로 true일 경우
            remove(ironmanLifeRem, ironmanLifes)


        # 게임오버
        if life < 1:  # 목숨이 1개 미만일 경우
            gameOver()



        #============================================== 화면 그리기  =====================================================
        # 배경
        screen.blit(background, (backgroundPosX, 0))
        # 배경2
        screen.blit(background, (backgroundPosX2, 0))
        # 아이언맨
        screen.blit(ironman, (ironmanPosX, ironmanPosY))


        # 울트론1
        screen.blit(ultron, (ultronPosX, ultronPosY))
        # 울트론2
        screen.blit(ultron2, (ultron2PosX, ultron2PosY))
        # 울트론3
        screen.blit(ultron3, (ultron3PosX, ultron3PosY))
        # 바위 그리기
        screen.blit(rock, (rockPosX, rockPosY))


        # 리펄서
        for repulsorPosX, repulsorPosY in repulsors:
            screen.blit(repulsor, (repulsorPosX, repulsorPosY))
        # 빔
        screen.blit(beam, (beamPosX, beamPosY))
        # 울트론2 리펄서(랜덤 포인트)
        screen.blit(repulsor_2Random, (repulsor_2RandomPosX, repulsor_2RandomPosY))
        # 울트론2 리펄서
        if ultronRepulsorMode == 1:
            screen.blit(repulsor_2, (repulsor_2PosX, repulsor_2PosY))

        # 점수
        scoreShow = gameFontSmall.render("score: {}".format(score), True, (255, 255, 255))
        screen.blit(scoreShow, (10, 10))
        # 목숨
        for ironmanLifePosX, ironmanLifePosY in ironmanLifes:
            screen.blit(ironmanLife, (ironmanLifePosX, ironmanLifePosY))
        # 게이지(빈칸)
        for gaugeFillPosX, gaugeFillPosY in gaugeFills:
            screen.blit(gaugeShadow, (gaugeFillPosX, gaugeFillPosY) )
        # 게이지(채움)
        for idx, (gaugeFillPosX, gaugeFillPosY) in enumerate(gaugeFills):
            if idx < beamGauge / 100:
                screen.blit(gaugeFill, (gaugeFillPosX, gaugeFillPosY))


        # 메세지
        msg = gameFontBig.render(gameMsg, True, (255, 255, 0))
        msgRect = msg.get_rect(center=(screenWidth / 2, screenHeight / 2))
        screen.blit(msg, msgRect)



    #================================================ 오프닝 화면 ========================================================
    elif gameMode == 0:

        if currentTime - gameStartTime > 2000:
            ironman = ironmanMotion1

        # 이벤트 처리
        for event in pygame.event.get():

            if event.type == pygame.QUIT:  # 창이 닫히는 이벤트
                running = False

        # 아이언맨 위치값 업데이트
        ironmanPosX += (ironmanSpeed * dt / 2)

        # 아이언맨 rect 정보 업데이트
        ironmanRect = ironman.get_rect()
        ironmanRect.left = ironmanPosX
        ironmanRect.top = ironmanPosY

        # 아이언맨 시작 포인트 rect 정보 업데이트
        ironmanStartRect = ironmanStart.get_rect()
        ironmanStartRect.left = ironmanStartPosX
        ironmanStartRect.top = ironmanStartPosY

        # 충돌 처리 (아이언맨 vs 아이언맨 시작 포인트)
        if ironmanRect.colliderect(ironmanStartRect):
            ironmanSpeed = 0
            gameStart()

        # 배경
        screen.blit(background, (0, 0))
        # 아이언맨
        screen.blit(ironman, (ironmanPosX, ironmanPosY))
        # 아이언맨 시작 포인트
        screen.blit(ironmanStart, (ironmanStartPosX, ironmanStartPosY))

        # 메세지
        msg = gameFontBig.render(gameMsg, True, (255, 255, 0))
        msgRect = msg.get_rect(center=(screenWidth / 2, screenHeight / 2))
        screen.blit(msg, msgRect)


    # =========================================== 재시작/종료 선택 화면 ====================================================

    elif gameMode == 2:

        # 이벤트 처리
        for event in pygame.event.get():

            if event.type == pygame.QUIT:  # 창이 닫히는 이벤트
                running = False

            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_y: # Y
                    gameModeChoice('y')

                elif event.key == pygame.K_n: # N
                    gameModeChoice('n')

        # 배경
        screen.blit(background, (backgroundPosX, 0))
        # 아이언맨
        screen.blit(ironman, (ironmanPosX, ironmanPosY))
        # 울트론1
        screen.blit(ultron, (ultronPosX, ultronPosY))
        # 울트론2
        screen.blit(ultron2, (ultron2PosX, ultron2PosY))
        # 울트론3
        screen.blit(ultron3, (ultron3PosX, ultron3PosY))
        # 바위 그리기
        screen.blit(rock, (rockPosX, rockPosY))

        # 리펄서
        for repulsorPosX, repulsorPosY in repulsors:
            screen.blit(repulsor, (repulsorPosX, repulsorPosY))
        # 빔
        screen.blit(beam, (beamPosX, beamPosY))
        # 울트론2 리펄서(랜덤 포인트)
        screen.blit(repulsor_2Random, (repulsor_2RandomPosX, repulsor_2RandomPosY))
        # 울트론2 리펄서
        if ultronRepulsorMode == 1:
            screen.blit(repulsor_2, (repulsor_2PosX, repulsor_2PosY))

        # 점수
        scoreShow = gameFontSmall.render("score: {}".format(score), True, (255, 255, 255))
        screen.blit(scoreShow, (10, 10))
        # 목숨
        for ironmanLifePosX, ironmanLifePosY in ironmanLifes:
            screen.blit(ironmanLife, (ironmanLifePosX, ironmanLifePosY))
        # 게이지(빈칸)
        for gaugeFillPosX, gaugeFillPosY in gaugeFills:
            screen.blit(gaugeShadow, (gaugeFillPosX, gaugeFillPosY) )
        # 게이지(채움)
        for idx, (gaugeFillPosX, gaugeFillPosY) in enumerate(gaugeFills):
            if idx < beamGauge / 100:
                screen.blit(gaugeFill, (gaugeFillPosX, gaugeFillPosY))

        # 메세지
        msg = gameFontBig.render("GAME OVER", True, (255, 255, 0))
        msgRect = msg.get_rect(center=(screenWidth / 2, (screenHeight / 2) - 50))
        screen.blit(msg, msgRect)

        msg2 = gameFontSmall.render("REPLAY?", True, (255, 255, 255))
        msg2Rect = msg2.get_rect(center=(screenWidth / 2, (screenHeight / 2) + 20))
        screen.blit(msg2, msg2Rect)

        msg3 = gameFontSmall.render("Y / N", True, (255, 255, 255))
        msg3Rect = msg3.get_rect(center=(screenWidth / 2, (screenHeight / 2) + 55))
        screen.blit(msg3, msg3Rect)


    # 게임화면 업데이트
    pygame.display.update()

# 딜레이
pygame.time.delay(1000)

# 게임 종료
pygame.quit()