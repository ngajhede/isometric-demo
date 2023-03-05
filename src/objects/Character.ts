export default class Character extends Phaser.GameObjects.Sprite {
  public scene: Phaser.Scene
  public id: string
  public name: string
  public health: number
  public attack: number
  public defense: number
  public x: number
  public y: number
  public movementDistance: number
  public attackDistance: number
  public sprite: string
  public selected: boolean
  public layer: Phaser.Tilemaps.TilemapLayer
  constructor(
    scene: Phaser.Scene,
    id: string,
    name: string,
    health: number,
    attack: number,
    defense: number,
    x: number,
    y: number,
    movementDistance: number,
    attackDistance: number,
    sprite: string,
    layer: Phaser.Tilemaps.TilemapLayer
  ) {
    super(scene, x, y, sprite)
    scene.add.existing(this)

    this.id = id
    this.name = name
    this.health = health
    this.attack = attack
    this.defense = defense
    this.x = x + 16
    this.y = y
    this.movementDistance = movementDistance
    this.attackDistance = attackDistance
    this.sprite = sprite
    this.layer = layer

    this.create()
  }

  public create() {
    // Select when clicking on character
    this.setInteractive()

    const boxes = this.scene.add.group()

    this.on('pointerover', () => {
      this.selected = true
      const pos = this.getTilePosition()
      const canWalkTo = this.getTilesSorrounding(pos.x - 2, pos.y - 1, this.movementDistance, this.layer.layer)

      canWalkTo.forEach((tile: any) => {
        const worldPos = this.getWorldPosition(tile.x, tile.y)
        boxes.add(
          this.scene.add
            .isobox(worldPos.x + 16, worldPos.y + 8, 32, 1, 0x00ff00)
            .setAlpha(0.4)
            .setDepth(0)
            .setOrigin(0.5, 0.5)
        )
      })
    })

    this.on('pointerout', () => {
      this.selected = false
      boxes.clear(true)
    })
  }

  getTilesSorrounding(x: number, y: number, width: number, layerData: Phaser.Tilemaps.LayerData) {
    return Phaser.Tilemaps.Components.GetTilesWithin(
      x,
      y,
      width,
      width,
      {
        isNotEmpty: true
        //isColliding: false,
        //hasInterestingFace: false,
      },
      layerData
    )
  }

  getTilePosition(): Phaser.Math.Vector2 {
    return Phaser.Tilemaps.Components.IsometricWorldToTileXY(
      this.x,
      this.y + 8,
      true,
      new Phaser.Math.Vector2(),
      this.scene.cameras.main,
      this.layer.layer
    )
  }

  getWorldPosition(x, y): Phaser.Math.Vector2 {
    return Phaser.Tilemaps.Components.IsometricTileToWorldXY(
      x,
      y,
      new Phaser.Math.Vector2(),
      this.scene.cameras.main,
      this.layer.layer
    )
  }

  public selectCharacter(): void {
    this.selected = true
  }

  public attackCharacter(target: Character, x: number, y: number): void {
    // TODO
  }

  public moveCharacter(x: number, y: number): void {
    // TODO
  }
}
