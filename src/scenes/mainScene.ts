import Character from '../objects/Character'
import { registerCameraControls } from '../utils/Camera'

export default class MainScene extends Phaser.Scene {
  map: Phaser.Tilemaps.Tilemap
  layer: Phaser.Tilemaps.TilemapLayer
  marker: Phaser.GameObjects.IsoBox
  private character!: Character

  constructor() {
    super({ key: 'MainScene' })
  }

  preload() {
    this.load.tilemapTiledJSON('tilemap', '/assets/tilemaps/testmap.json')
    this.load.image('testset', '/assets/tilesets/testset.png')
  }

  create() {
    if (process.env.NODE_ENV === 'development') {
      const graphics = this.add.graphics()
      graphics.lineStyle(2, 0xffffff, 1)
      graphics.strokeRect(0, 0, this.game.config.width as number, this.game.config.height as number)
    }

    this.map = this.make.tilemap({ key: 'tilemap' })
    const tiles = this.map.addTilesetImage('testset', 'testset')
    this.layer = this.map.createLayer(
      'Walkable',
      tiles,
      (this.game.config.width as number) / 2,
      (this.game.config.height as number) / 2 - this.map.heightInPixels / 2
    )

    // center camera
    this.cameras.main.centerOn((this.game.config.width as number) / 2, (this.game.config.height as number) / 2)

    // Register camera controls
    registerCameraControls(this.input, this.cameras.main)

    const charPos = Phaser.Tilemaps.Components.IsometricTileToWorldXY(
      19,
      10,
      new Phaser.Math.Vector2(),
      this.cameras.main,
      this.layer.layer
    )

    // Create character and add to scene at tile 10, 10 and convert to world coordinates
    this.character = new Character(this, charPos.x, charPos.y)

    // move charafter on click
    this.input.on('pointerdown', pointer => {
      const tile = Phaser.Tilemaps.Components.IsometricWorldToTileXY(
        pointer.worldX,
        pointer.worldY + 8,
        true,
        new Phaser.Math.Vector2(),
        this.cameras.main,
        this.layer.layer
      )

      const worldPos = Phaser.Tilemaps.Components.IsometricTileToWorldXY(
        tile.x,
        tile.y,
        new Phaser.Math.Vector2(),
        this.cameras.main,
        this.layer.layer
      )

      console.warn(`MOVING TO TILE: ${tile.x} ${tile.y}`)

      this.character.setPosition(worldPos.x, worldPos.y)
    })

    // create isobox
    this.marker = this.add.isobox(0, 0, 32, 2, 0xffffff, 0.1)
    this.marker.setAlpha(0.5)

    // draw the coordiantes of every tile in the map
    this.layer.forEachTile(tile => {
      const worldPos = Phaser.Tilemaps.Components.IsometricTileToWorldXY(
        tile.x,
        tile.y,
        new Phaser.Math.Vector2(),
        this.cameras.main,
        this.layer.layer
      )
      const text = this.add.text(worldPos.x, worldPos.y, `${tile.x} ${tile.y}`, {
        color: '#ffffff',
        fontSize: '10px'
      })
      text.setOrigin(0.5, 0.5)
    })
  }

  update() {
    const pointer = this.input.activePointer
    const tile = Phaser.Tilemaps.Components.IsometricWorldToTileXY(
      pointer.worldX,
      pointer.worldY + 8,
      true,
      new Phaser.Math.Vector2(),
      this.cameras.main,
      this.layer.layer
    )

    const worldPos = Phaser.Tilemaps.Components.IsometricTileToWorldXY(
      tile.x,
      tile.y,
      new Phaser.Math.Vector2(),
      this.cameras.main,
      this.layer.layer
    )

    console.log(`Tile: ${tile.x}, ${tile.y} World: ${worldPos.x}, ${worldPos.y}`)
    this.marker.setPosition(worldPos.x, worldPos.y, 0)
  }
}
