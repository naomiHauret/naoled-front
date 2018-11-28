import './index.css'
import io from "socket.io-client"
import { Engine } from 'babylonjs'
import { createScene } from 'app/Scene'

const url = 'http://localhost:5000'
const socket = io(url)

socket.on('event', e => {
  console.log(e)
})

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('render')
  const engine = new Engine(canvas, true)
  const size  = 40
  const scene = createScene(engine, canvas, size)
  engine.runRenderLoop(() => {
    scene.render()
  })

  window.addEventListener('resize', () => {
    engine.resize()
  })
})


