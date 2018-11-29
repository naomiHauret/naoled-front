import './index.css'
import io from "socket.io-client"
import { Engine } from 'babylonjs'
import { createScene } from 'app/Scene'
import { navigate } from 'routes'

const url = process.env.NODE_ENV === 'production' ? process.env.SOCKET_URL_PROD : process.env.SOCKET_URL_DEV
const socket = io(url)

socket.on('event', e => {
  console.log(e)
})

navigate(window.location.pathname)

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('render')
  if(canvas) {
    const engine = new Engine(canvas, true)
    const size  = 40
    const scene = createScene(engine, canvas, size)
    engine.runRenderLoop(() => {
      scene.render()
    })

    window.addEventListener('resize', () => {
      engine.resize()
    })
  }
})


