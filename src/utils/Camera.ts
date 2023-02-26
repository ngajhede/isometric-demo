export function registerCameraControls(input, camera) {
  camera.setZoom(2)

  input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
    if (deltaY > 0) {
      const newZoom = camera.zoom - 1
      if (newZoom > 0.1) {
        camera.zoomTo(newZoom, 200, 'Power2')
      }
    }

    if (deltaY < 0) {
      const newZoom = camera.zoom + 1
      if (newZoom < 10) {
        camera.zoomTo(newZoom, 200, 'Power2')
      }
    }
  })

  input.on('pointermove', pointer => {
    if (!pointer.isDown) return

    camera.scrollX -= (pointer.x - pointer.prevPosition.x) / camera.zoom
    camera.scrollY -= (pointer.y - pointer.prevPosition.y) / camera.zoom
  })
}
