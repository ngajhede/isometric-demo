import Phaser from 'phaser'

class Character extends Phaser.GameObjects.Graphics {
  private readonly radius = 4

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, { x: x, y: y })
    this.drawCharacter()
    scene.add.existing(this)
  }

  private drawCharacter(): void {
    this.fillStyle(0x9f2b68)
    this.fillCircle(0, 0, this.radius)
    this.lineStyle(2, 0x000000)
  }

  setPosition(x: number, y: number): this {
    this.scene.tweens.add({
      targets: this,
      x: x,
      y: y,
      duration: 750,
      ease: 'Sine.InOut'
    })
    return this
  }
}

export default Character
