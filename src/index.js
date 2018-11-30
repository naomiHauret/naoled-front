import "./index.css"
import socket from "socket.io-client"
import { Engine } from "babylonjs"
import { navigate } from "app/routes"
import { createScene } from "app/views/3d/Scene"

const url = process.env.NODE_ENV === "production" ? process.env.SOCKET_URL_PROD : process.env.SOCKET_URL_DEV
const socket = io(url)

socket.on("event", (e) => {
  console.log(e)
})

navigate(window.location.pathname)

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("render")
  if (canvas) {
    const engine = new Engine(canvas, true)
    const size = 40
    const scene = createScene(engine, canvas, size)
    engine.runRenderLoop(() => {
      scene.render()
    })
    window.addEventListener("resize", () => {
      engine.resize()
    })

    socket.on('ashbinAdd', data => {
      console.log('ashbinAdd', data)
    })

    socket.on('trashIn', data => {
      console.log('trashIn', data)
    })

    socket.on('trashOut', data => {
      console.log('trashOut', data)
    })
  }
})
