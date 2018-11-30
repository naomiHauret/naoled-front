import { Engine } from "babylonjs"
import { createScene } from "app/views/3d/Scene"

export default {
  renderCity: (el) => (state, actions) => {
    const canvas = el
    const engine = new Engine(canvas, true)
    const size = 40
    const scene = createScene(engine, canvas, size)
    engine.runRenderLoop(() => {
      scene.render()
    })
    window.addEventListener("resize", () => {
      engine.resize()
    })
    return {
      ...state,
    }
  },
}