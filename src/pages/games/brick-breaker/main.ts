import Phaser from "phaser";
const MAX_HEIGHT = 470;

class BrickBreakerGame extends Phaser.Scene {
  private ball: Phaser.Physics.Arcade.Sprite;
  private paddle: Phaser.Physics.Arcade.Sprite;
  private bricks: Phaser.Physics.Arcade.StaticGroup;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private score: number = 0;
  private scoreText: Phaser.GameObjects.Text;
  private timerText: Phaser.GameObjects.Text;
  private gameTime: number = 120; // 120 seconds for the game

  constructor() {
    super("brick-breaker-game");
  }

  preload() {
    // Load assets
    this.load.image("ball", "ball.png");
    this.load.image("paddle", "random.png");
    this.load.image("brick", "random.png");
  }

  create() {
    const graphics = this.add.graphics();

    // Enable collision body visualization
    this.physics.world.debugGraphic = graphics;

    this.physics.world.debugBodyColor = 0xff0000; // Set the color for the collision bodies
    this.physics.world.debugBodyColor = true;

    // Create ball
    this.ball = this.physics.add.sprite(400, 500, "ball");
    this.ball.setDisplaySize(32, 32);
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);
    this.ball.setVelocity(200, -200);

    // Create paddle
    this.paddle = this.physics.add.sprite(400, 420, "paddle");
    this.paddle.setDisplaySize(32, 32);

    this.paddle.setImmovable();

    // Create bricks
    this.bricks = this.physics.add.staticGroup();
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 5; j++) {
        const brick = this.bricks.create(80 + i * 64, 50 + j * 32, "brick");
        brick.setDisplaySize(32, 32);
        brick.setOrigin(0, 0);
      }
    }

    // Add collisions
    this.physics.add.collider(
      this.ball,
      this.bricks,
      this.hitBrick,
      undefined,
      this
    );
    this.physics.add.collider(this.ball, this.paddle);

    // Cursor keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // Create score text
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "16px",
      color: "#fff",
    });

    // Create timer text
    this.timerText = this.add.text(600, 16, "Time: 120", {
      fontSize: "16px",
      color: "#fff",
    });

    // Start the timer
    this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    // Paddle movement
    if (this.cursors.left.isDown) {
      this.paddle.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
      this.paddle.setVelocityX(300);
    } else {
      this.paddle.setVelocityX(0);
    }

    // Ball and paddle bounds
    this.paddle.setX(Phaser.Math.Clamp(this.paddle.x, 52, 748));
    if (this.ball.y > MAX_HEIGHT) {
      this.resetBall();
    }
  }

  private hitBrick(
    ball: Phaser.GameObjects.GameObject,
    brick: Phaser.GameObjects.GameObject
  ) {
    brick.destroy();
    this.updateScore(10); // Add 10 points for each brick
  }

  private resetBall() {
    this.ball.setPosition(400, 500);
    this.ball.setVelocity(200, -200);
  }

  private updateScore(points: number) {
    this.score += points;
    this.scoreText.setText("Score: " + this.score);
  }

  private updateTimer() {
    this.gameTime--;
    this.timerText.setText("Time: " + this.gameTime);

    if (this.gameTime <= 0) {
      // Handle game over logic here
      this.physics.pause();
      this.add.text(300, 250, "Game Over", { fontSize: "64px", color: "#fff" });
    }
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 740,
  height: MAX_HEIGHT,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: BrickBreakerGame,
  parent: "game",
};

export const startGame = () => {
  new Phaser.Game(config);
};
