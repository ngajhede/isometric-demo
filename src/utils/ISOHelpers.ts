export function screenToIso(x: number, y: number, tileSize: number): Phaser.Math.Vector2 {
  const isoX = (2 * y + x) / 2
  const isoY = (2 * y - x) / 2
  return new Phaser.Math.Vector2(isoX, isoY).scale(tileSize)
}

export function isoToScreen(x: number, y: number, tileSize: number): Phaser.Math.Vector2 {
  const screenX = x - y
  const screenY = (x + y) / 2
  return new Phaser.Math.Vector2(screenX, screenY).scale(tileSize)
}

export function getTileAtScreenPos(layer: Phaser.Tilemaps.TilemapLayer, x: number, y: number): Phaser.Tilemaps.Tile {
  const isoPos = screenToIso(x, y, layer.tilemap.tileWidth)
  return layer.getTileAtWorldXY(isoPos.x, isoPos.y)
}
