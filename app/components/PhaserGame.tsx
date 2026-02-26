"use client";

import { useEffect, useRef } from "react";

export default function PhaserGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<any>(null);

  useEffect(() => {
    const loadGame = async () => {
      if (!containerRef.current || gameRef.current) return;

      const Phaser = await import("phaser");

      class MainScene extends Phaser.Scene {
        player!: Phaser.Physics.Arcade.Sprite;
        cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
        items!: Phaser.Physics.Arcade.Group;
        score = 0;
        scoreText!: Phaser.GameObjects.Text;
        isGameOver = false;

        constructor() {
          super("main");
        }

        preload() {
          this.load.image("player", "/images/george.png"); this.load.image("bomb", "/images/police.png"); this.load.image("gold", "/images/melon.png"); this.load.image("silver", "/images/kfc.png");
        }

        create() {
          this.isGameOver = false;
          this.score = 0;
          this.cameras.main.setBackgroundColor("#87CEEB");

          // --- PLAYER ---
          this.player = this.physics.add.sprite(400, 530, "player");
          this.player.setScale(0.5); // 3x bigger than the original 0.5 scale
          this.player.setImmovable(true);
          this.player.setCollideWorldBounds(true);

          this.cursors = this.input.keyboard!.createCursorKeys();
          
          // --- ITEMS GROUP ---
          this.items = this.physics.add.group();

          // --- SPAWN LOOP ---
          this.time.addEvent({
            delay: 800,
            loop: true,
            callback: () => { if (!this.isGameOver) this.spawnItem(); },
          });

          // --- COLLISION ---
          this.physics.add.overlap(this.player, this.items, (_: any, item: any) => 
            this.handleCollision(item)
          );

          this.scoreText = this.add.text(20, 20, "Score: 0", {
            fontSize: "32px",
            color: "#000",
            fontStyle: "bold"
          });
        }

        spawnItem() {
          const rand = Math.random();
          let texture = "silver";
          let points = 1;
          let isBomb = false;

          if (rand < 0.25) {
            texture = "bomb";
            isBomb = true;
          } else if (rand < 0.45) {
            texture = "gold";
            points = 5;
          }

          const x = Phaser.Math.Between(50, 750);
          
          // Fix: Create and scale first, then set physics properties
          const item = this.items.create(x, -50, texture);
          item.setScale(0.5); // 3x bigger than the original 0.4 scale

          const body = item.body as Phaser.Physics.Arcade.Body;
          body.setVelocityY(Phaser.Math.Between(200, 350)); 

          (item as any).isBomb = isBomb;
          (item as any).pointValue = points;
        }

        handleCollision(item: any) {
          if (item.isBomb) {
            this.triggerGameOver();
            return;
          }
          this.score += item.pointValue;
          this.scoreText.setText("Score: " + this.score);
          item.destroy();
        }

        triggerGameOver() {
          this.isGameOver = true;
          this.physics.pause();
          this.player.setTint(0xff0000);

          this.add.text(400, 280, "YOU Not Breathn now", {
            fontSize: "84px",
            color: "#ff0000",
            fontStyle: "bold",
            stroke: "#000",
            strokeThickness: 6
          }).setOrigin(0.5);

          this.add.text(400, 380, "Click to Restart", {
            fontSize: "28px",
            color: "#fff"
          }).setOrigin(0.5);

          this.input.once("pointerdown", () => this.scene.restart());
        }

        update() {
          if (this.isGameOver) return;
          this.player.setVelocityX(0);

          if (this.cursors.left?.isDown) this.player.setVelocityX(-500);
          else if (this.cursors.right?.isDown) this.player.setVelocityX(500);

          this.items.getChildren().forEach((item: any) => {
            if (item.y > 650) item.destroy();
          });
        }
      }

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: containerRef.current,
        physics: { default: "arcade", arcade: { debug: false } },
        render: { pixelArt: true }, // Keeps images sharp when scaled up
        scene: MainScene,
      };

      gameRef.current = new Phaser.Game(config);
    };

    loadGame();
    return () => gameRef.current?.destroy(true);
  }, []);

  return <div ref={containerRef} />;
}