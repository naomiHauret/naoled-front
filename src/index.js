import './index.css'
import io from "socket.io-client"
import { Engine } from 'babylonjs'
import { createScene } from 'app/Scene'

const url = ""
const socket = io(url)

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('render')
  const engine = new Engine(canvas, true)
  const size  = 20
  const scene = createScene(engine, canvas, size)
  engine.runRenderLoop(() => {
    scene.render()
  })

  window.addEventListener('resize', () => {
    engine.resize()
  })
})


