
import { Scene, Color3, FreeCamera, Vector3, MeshBuilder, Mesh, HemisphericLight, StandardMaterial } from 'babylonjs'
import { addBuilding } from 'app/Building'

export const createScene = (engine, canvas, size) => {
    const scene = new Scene(engine)

    // Camera
    const camera = new FreeCamera("camera1", new Vector3(-5, 5, -45), scene)
    camera.setTarget(Vector3.Zero())
    camera.tran
    camera.attachControl(canvas, true) // set camera controls

    // Light
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene)
    light.intensity = 0.7

    // Materials
    const materialWater = new StandardMaterial('materialWater', scene)
    materialWater.diffuseColor = Color3.Blue()
    materialWater.emissiveColor = new Color3(0.1, 0.1, 0.1)
    materialWater.alpha = 0.5


    ////
    //  MESHES
    ////
    // GROUND
    const ground = Mesh.CreateGround("ground", size, size, 0, scene)

    // BUILDINGS
    // - addBuilding(scene, name, height, width, depth, y)
    addBuilding(scene, '1a', 10, 3, 3, 5)

    // EARTH


    // WATER
    const watercube = MeshBuilder.CreateBox("watercube", { height: 0.5, width: size, depth: size }, scene)
    watercube.material = materialWater
    watercube.position.y = -5


    return scene
  }


