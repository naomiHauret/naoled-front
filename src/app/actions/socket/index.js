import io from "socket.io-client"
const url = process.env.NODE_ENV === "production" ? process.env.SOCKET_URL_PROD : process.env.SOCKET_URL_DEV
const socket = io(url)

export default {
  listen: () => (state, actions) => {
    socket.on("ashbinAdd", (data) => {
      console.log("ashbinAdd", data)
    })

    socket.on("trashIn", (data) => {
      console.log("trashIn", data)
    })

    socket.on("trashOut", (data) => {
      console.log("trashOut", data)
    })

    socket.on("openDoor", (data) => {
      console.log("openDoor", data)
    })

    socket.on("closeDoor", (data) => {
      console.log("closeDoor", data)
    })

    socket.on("switchLightOn", (data) => {
      console.log("Light switched on", data)
    })

    socket.on("switchLightOff", (data) => {
      console.log("Light switched off", data)
    })

    socket.on("stairsAdd", (data) => {
      console.log("Stairs triggered", data)
    })

    return {
      ...state,
    }
  },
}
