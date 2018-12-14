import io from "socket.io-client"
import { Engine } from "babylonjs"
import { createScene } from "app/views/3d/Scene"
import { viewsId, facts } from "content"
import { waterSetNote } from "app/views/3d/Water"

const url = process.env.NODE_ENV === "production" ? process.env.SOCKET_URL_PROD : process.env.SOCKET_URL_DEV
const socket = io(url)
let scene, waterCrust

export default {
  //
  // City
  renderCity: () => (state, actions) => {
    const canvas = document.querySelector("#render")
    const engine = new Engine(canvas, true)
    const size = 40

    const sceneObj = createScene(engine, canvas, size)

    scene = sceneObj.scene
    waterCrust = sceneObj.waterCrust

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

  //
  // City effects
  listen: () => (state, actions) => {
    socket.on("event", () => {
      console.log("hello from socket")
    })

    socket.on("ashbinAdd", (data) => {

      actions.onAshbinEvents(data)
    })

    socket.on("trashIn", (data) => {
      data.type = "in"
      actions.onTrashEvents(data)
    })

    socket.on("trashOut", (data) => {
      data.type = "out"
      actions.onTrashEvents(data)
    })

    socket.on("openDoor", (data) => {
      data.type = "open"
      actions.onDoorEvents(data)
    })

    socket.on("closeDoor", (data) => {
      data.type = "close"
      actions.onDoorEvents(data)
    })

    socket.on("switchLightOn", (data) => {
      data.type = "on"
      actions.onLightEvents(data)
    })

    socket.on("switchLightOff", (data) => {
      data.type = "off"
      actions.onLightEvents(data)
    })

    socket.on("stairsAdd", (data) => {
        actions.onStairsEvents(data)
    })
  },

  //
  // Trash
  onTrashEvents: (data) => (state, actions) => {
    console.log("hello from trash event treatment", data)
    const score= data.score/9960
    data.text = data.type === "out" ? "Déchet non recyclé 👎" : "Déchet recyclé 👍"
    waterSetNote(waterCrust, score, state.score, scene )
    state.trashEvents.push(data)

    // switch data type (trash in/out), 3d effect go here...
    // Niveau + couleur de l'eau

    return {
      ...state,
      score,
    }
  },

  //
  // Light
  onLightEvents: (data) => (state, actions) => {
    console.log("hello from light event treatment")
    const score= data.score/9960
    data.text = data.type === "on" ? "Lumière allumée pour rien 👎" : "Lumière éteinte 👍"
    waterSetNote(waterCrust, score, state.score, scene )
    state.lightEvents.push(data)

    // switch data type (light on/off), 3d effect go here...

    return {
      ...state,
    }
  },

  //
  // Door
  onDoorEvents: (data) => (state, actions) => {
    console.log("hello from door event treatment")
    const score = data.score / 9960
    data.text = data.type === "open" ? "Porte ouverte avec le chauffage allumé 👎" : "Porte fermée 👍"
    waterSetNote(waterCrust, score, state.score, scene )
    state.score= data.score/9960
    state.doorEvents.push(data)
    // switch data type (light open/closed), 3d effect go here...

    return {
      ...state,
      score
    }
  },

  //
  // Ashbin
  onAshbinEvents: (data) => (state, actions) => {
    console.log("hello from ashbin event treatment")
    const score = data.score / 9960
    waterSetNote(waterCrust, newScore, state.score, scene )
    state.ashbinEvents.push(data)

    // 3d effect go here...

    return {
      ...state,
      score,
    }
  },

  //
  // Stairs
  onStairsEvents: (data) => (state, actions) => {
    console.log("hello from stairs event treatment")
    data.text = "Libérez l'énergie ! ⚡"
    const score = data.score / 9960
    waterSetNote(waterCrust, score, state.score, scene )
    state.stairsEvents.push(data)

    // 3d effect go here...

    return {
      ...state,
      score,
    }
  },

  //
  // Change UI stuff to display
  changeView: () => (state, actions) => {
    const previousUI = viewsId.indexOf(state.uiInfo)
    const length = viewsId.length - 1
    const newUI = previousUI < length ? viewsId[previousUI + 1] : viewsId[0]

    return {
      uiInfo: newUI,
      randomFact: Math.floor(Math.random() * facts.length),
    }
  },
}
