
import { Scene, Color3, FreeCamera, Vector3, Color4, MeshBuilder, Mesh, HemisphericLight, PointLight, StandardMaterial, ShadowGenerator } from 'babylonjs'
import { createCity } from 'app/City'
import { createCrust, addCrustSlice } from 'app/Crust'

export const createScene = (engine, canvas, size) => {
    const scene = new Scene(engine)
    scene.clearColor = new Color4(0, 0, 0, 0)


    // Camera
    // const camera = new FreeCamera("camera", new Vector3(-95, 40, -105), scene)
    const camera = new BABYLON.ArcRotateCamera("Camera", 0.0, 1.3, 80, new BABYLON.Vector3(0, 10.0, 0), scene)

    camera.attachControl(canvas, false)
    camera.setTarget(Vector3.Zero())

    // Light
    const light1 = new HemisphericLight("light1", new Vector3(0, 1, 0), scene)
    light1.intensity = 0.8

    const light2 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(60, -600, 200), scene)
    light2.intensity = 1

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
    
    const shadowGenerator = new ShadowGenerator(1024, light2)

    city._children[1]._children.forEach(element => {
      shadowGenerator.getShadowMap().renderList.push(element)
    })


    shadowGenerator.forceBackFacesOnly = true
    shadowGenerator.usePoissonSampling = true


    const lensEffect = new BABYLON.LensRenderingPipeline('lens', {
      edge_blur: 0,
      chromatic_aberration: 0.0,
      distortion: 0,
      dof_focus_distance: 30,
      dof_aperture: 3.0,			// set this very high for tilt-shift effect
      grain_amount: 1.0,
      dof_pentagon: false,
      dof_threshold: 1.0,
      dof_darken: 0
    }, scene, 1.0, camera)

    const postProcess = new BABYLON.FxaaPostProcess("fxaa", 1.0, camera)
    const postProcess2 = new BABYLON.ImageProcessingPostProcess("processing", 1.0, camera)
    postProcess2.vignetteWeight = 10
    postProcess2.vignetteStretch = 2
    postProcess2.vignetteColor = new BABYLON.Color4(1, 0, 0, 0)

    // Pour passer en mode REEEEED
    // postProcess2.vignetteEnabled = true

  
    return scene
  }


