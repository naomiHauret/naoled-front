
import { Scene, Color3, FreeCamera, Vector3, Color4, MeshBuilder, Mesh, HemisphericLight, PointLight, StandardMaterial } from 'babylonjs'
import { createCity } from 'app/City'
import { createCrust, addCrustSlice } from 'app/Crust'

export const createScene = (engine, canvas, size) => {
    const scene = new Scene(engine)
    scene.clearColor = new Color4(1, 0, 0, 0)


    // Camera
    const camera = new FreeCamera("camera", new Vector3(-95, 40, -105), scene)
    camera.setTarget(Vector3.Zero())

    // Light
    const light1 = new HemisphericLight("light1", new Vector3(1, 0, 0), scene)
    const light2 = new PointLight("light2", new Vector3(0, 60, 0), scene)

    // Materials
    // - water
    const materialWater = new StandardMaterial('materialWater', scene)
    materialWater.diffuseColor = Color3.Blue()
    materialWater.emissiveColor = new Color3(0.0, 0.5, 0.75)
    materialWater.alpha = 0.75

    ////
    //  MESHES
    ////
    const group = Mesh.CreateBox("naoLED", 1, scene)

    // City
    const city = createCity(scene)
    city.parent = group
    city.position.y = 6

    // CRUST
    const crust = createCrust(scene, size)
    const waterCrust = addCrustSlice(scene, "water", 1.5, size + 15, size + 15, -4.75)
    waterCrust.parent = crust
    waterCrust.material = materialWater

    crust.parent = group

    return scene
  }


