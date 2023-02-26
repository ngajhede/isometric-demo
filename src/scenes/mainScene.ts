import { registerCameraControls } from '../utils/Camera'

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    // add text
    const hellotext = this.add.text(100, 100, 'Hello World')

    this.time.delayedCall(2000, () => {
      hellotext.setText('Hello again')
      hellotext.setColor('#ff00ff')
    })

    registerCameraControls(this.input, this.cameras.main)
    this.cameras.main.pan(150, 100, 0)
  }

  update() {}
}
