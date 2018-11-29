
import { Scene, Color3, FreeCamera, Vector3, Color4, MeshBuilder, Mesh, HemisphericLight, PointLight, StandardMaterial, ShadowGenerator } from 'babylonjs'
import { createCity } from 'app/views/3d/City'
import { createCrust, addCrustSlice } from 'app/views/3d/Crust'
import upgradeMesh from 'app/views/3d/Subdivide'

import waterFragmentShader from 'app/views/3d/shaders/water/fragment.glsl'
import waterVertexShader from 'app/views/3d/shaders/water/vertex.glsl'

export const createScene = (engine, canvas, size) => {
    upgradeMesh()
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
    const waterCrust = addCrustSlice(scene, "water", 4.5, size + 15, size + 15, -3.75)
    waterCrust.parent = crust

    // Materials
    // - water
    BABYLON.Effect.ShadersStore["customVertexShader"] = waterVertexShader
    BABYLON.Effect.ShadersStore["customFragmentShader"] = waterFragmentShader

    var shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, {
      vertex: "custom",
      fragment: "custom",
    },
    {
      needAlphaBlending : true,
      attributes: ["position", "normal", "uv"],
      uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
    })

    waterCrust.material = shaderMaterial

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

    let time = 0.
    scene.registerBeforeRender(function() {
        waterCrust.material.setFloat("time", time)
        time +=0.1
    })

    return scene
  }


