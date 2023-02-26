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
    super.setPosition(x, y)
    return this
  }

  getTileCoordinates(): Phaser.Math.Vector2 {
    const tileX = Math.floor((2 * this.x - this.y) / (2 * this.radius))
    const tileY = Math.floor((this.y + this.x) / (2 * this.radius))
    return new Phaser.Math.Vector2(tileX, tileY)
  }
}

export default Character
