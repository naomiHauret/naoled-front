<<<<<<< HEAD

import { Scene, Animation, Color3, ArcRotateCamera, Vector3, Color4, MeshBuilder, Mesh, HemisphericLight, PointLight, StandardMaterial } from 'babylonjs'
import { createCity } from 'app/City'
import { createCrust, addCrustSlice } from 'app/Crust'

export const createScene = (engine, canvas, size) => {
    const scene = new Scene(engine)
    scene.clearColor = new Color4(1, 0, 0, 0)

    // Light
    const light1 = new HemisphericLight("light1", new Vector3(1, 0, 0), scene)
    const light2 = new PointLight("light2", new Vector3(0, 60, 0), scene)
=======
import {
  Scene,
  Animation,
  Color3,
  ArcRotateCamera,
  Vector3,
  Color4,
  MeshBuilder,
  Mesh,
  HemisphericLight,
  PointLight,
  StandardMaterial,
  ShadowGenerator,
} from "babylonjs"
import { createCity } from "app/City"
import { createCrust, addCrustSlice } from "app/Crust"

export const createScene = (engine, canvas, size) => {
  const scene = new Scene(engine)
  scene.clearColor = new Color4(0, 0, 0, 0)

  // Light
  const light1 = new HemisphericLight("light1", new Vector3(0, 1, 0), scene)
  light1.intensity = 0.8
>>>>>>> :wrench: added git hookst to workflow

  const light2 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(60, -600, 200), scene)
  light2.intensity = 1

  // Camera
  const camera = new ArcRotateCamera("camera", 5, -20, 150, Vector3(0, 0, 0), scene)
  camera.setPosition(new Vector3(-105, 50, -105))

  // Materials
  // - water
  const materialWater = new StandardMaterial("materialWater", scene)
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

<<<<<<< HEAD
    // Camera
    const camera = new ArcRotateCamera('camera', 5, -20, 150, Vector3(0, 0, 0), scene)
    camera.setPosition(new Vector3(-105, 50, -105))
    camera.setTarget(group)

    // Animation
    //for camera move forward
    const rotateCamAnimation = new Animation("camPos", "alpha", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
    const rotateCamAnimationKeys1 = [{
        frame: 0,
        value: 0
      }, {
        frame: 250,
        value: 1
      }
    ]

    rotateCamAnimation.setKeys(rotateCamAnimationKeys1)
    camera.animations.push(rotateCamAnimation)
    scene.beginAnimation(camera, 0, 100, true, 1)

    return scene
  }

=======
  // CRUST
  const crust = createCrust(scene, size)
  const waterCrust = addCrustSlice(scene, "water", 1.5, size + 15, size + 15, -4.75)
  waterCrust.parent = crust
  waterCrust.material = materialWater

  crust.parent = group

  const shadowGenerator = new ShadowGenerator(1024, light2)

  city._children[1]._children.forEach((element) => {
    shadowGenerator.getShadowMap().renderList.push(element)
  })

  shadowGenerator.forceBackFacesOnly = true
  shadowGenerator.usePoissonSampling = true

  const lensEffect = new BABYLON.LensRenderingPipeline(
    "lens",
    {
      edge_blur: 0,
      chromatic_aberration: 0,
      distortion: 0.8,
      dof_focus_distance: 40,
      dof_aperture: 3.0, // set this very high for tilt-shift effect
      grain_amount: 1.0,
      dof_pentagon: false,
      dof_threshold: 1.0,
      dof_darken: 0,
    },
    scene,
    1.0,
    camera,
  )

  const postProcess = new BABYLON.FxaaPostProcess("fxaa", 1.0, camera)
  const postProcess2 = new BABYLON.ImageProcessingPostProcess("processing", 1.0, camera)
  postProcess2.vignetteWeight = 10
  postProcess2.vignetteStretch = 2
  postProcess2.vignetteColor = new BABYLON.Color4(1, 0, 0, 0)

  // Pour passer en mode REEEEED
  postProcess2.vignetteEnabled = true

  camera.setTarget(group)
  ////
  // ANIMATION
  ////
  const frameRate = 50
  const rotateCamAnimation = new Animation(
    "camPos",
    "alpha",
    30,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE,
  )
  const rotateCamAnimationKeys1 = [
    {
      frame: 0,
      value: 0,
    },
    {
      frame: 3 * frameRate,
      value: 0.85,
    },
    {
      frame: 15 * frameRate,
      value: 1.5,
    },
    {
      frame: 25 * frameRate,
      value: 1.5,
    },
  ]
  rotateCamAnimation.setKeys(rotateCamAnimationKeys1)

  const moveCamForwardAnimation = new Animation(
    "camPos",
    "radius",
    30,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE,
  )
  const moveCamForwardAnimationKeys1 = [
    {
      frame: 0,
      value: 200,
    },
    {
      frame: 3 * frameRate,
      value: 100,
    },
    {
      frame: 8 * frameRate,
      value: 100,
    },
    {
      frame: 15 * frameRate,
      value: 200,
    },
  ]

  moveCamForwardAnimation.setKeys(moveCamForwardAnimationKeys1)
  scene.beginDirectAnimation(camera, [rotateCamAnimation, moveCamForwardAnimation], 0, 25 * frameRate, true, 1)
>>>>>>> :wrench: added git hookst to workflow

  return scene
}
