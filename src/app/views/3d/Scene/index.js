import {
  FxaaPostProcess,
  LensRenderingPipeline,
  ShaderMaterial,
  ParticleSystem,
  Texture,
  Scene,
  Effect,
  ImageProcessingPostProcess,
  Color3,
  ArcRotateCamera,
  Vector3,
  Color4,
  MeshBuilder,
  Mesh,
  HemisphericLight,
  DirectionalLight,
  StandardMaterial,
  ShadowGenerator,
  Animation,
  QuinticEase,
  QuarticEase,
  EasingFunction,
} from "babylonjs"
import { createCity } from "app/views/3d/City"
import { createFire, createSmoke, createTrash } from "app/views/3d/Scene/effects"
import { createCrust, addCrustSlice } from "app/views/3d/Crust"
import { createWater, waterSetNote } from "app/views/3d/Water"
import upgradeMesh from "app/views/3d/Subdivide"

export let cr

export const createScene = (engine, canvas, size) => {
  upgradeMesh()
  const scene = new Scene(engine)
  scene.clearColor = new Color4(0, 0, 0, 0)

  // Camera
  const camera = new ArcRotateCamera("camera", 105, 50, -105, Vector3(105, 50, -105), scene)
  camera.setPosition(new Vector3(-105, 50, -105))
  // Light
  const light1 = new HemisphericLight("light1", new Vector3(0, 1, 0), scene)
  light1.intensity = 0.8

  const light2 = new DirectionalLight("DirectionalLight", new Vector3(60, -600, 200), scene)
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

  // Value between 0 and 1 for the global note (0 everything is fine, 1 is anarchy)
  const waterCrust = createWater(scene, size, 0)
  waterCrust.parent = crust

  crust.parent = group

  const shadowGenerator = new ShadowGenerator(1024, light2)

  city._children[1]._children.forEach((element) => {
    shadowGenerator.getShadowMap().renderList.push(element)
  })

  shadowGenerator.forceBackFacesOnly = true
  shadowGenerator.usePoissonSampling = true

  const lensEffect = new LensRenderingPipeline(
    "lens",
    {
      edge_blur: 0,
      chromatic_aberration: 0.0,
      distortion: 0,
      dof_focus_distance: 50,
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

  const postProcess = new FxaaPostProcess("fxaa", 1.0, camera)
  const postProcess2 = new ImageProcessingPostProcess("processing", 1.0, camera)
  postProcess2.vignetteWeight = 10
  postProcess2.vignetteStretch = 2
  postProcess2.vignetteColor = new Color4(1, 0, 0, 0)

  // Pour passer en mode REEEEED
  // postProcess2.vignetteEnabled = true

  camera.setTarget(group)
  ////
  // ANIMATION
  ////
  const frameRate = 50
  const rotateCamAnimation = new Animation(
    "camPos",
    "alpha",
    30,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_RELATIVE,
  )
  const rotateCamAnimationKeys1 = [
    {
      frame: 0,
      value: 0,
    },
    {
      frame: 3 * frameRate,
      value: -0.85,
    },
    {
      frame: 15 * frameRate,
      value: -1.5,
    },
    {
      frame: 25 * frameRate,
      value: -1.5,
    },
  ]
  rotateCamAnimation.setKeys(rotateCamAnimationKeys1)

  const moveCamForwardAnimation = new Animation(
    "camPos",
    "radius",
    30,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CYCLE,
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
  const moveCamEasingFunction = new QuinticEase()
  const rotateCamEasingFunction = new QuarticEase()
  moveCamEasingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT)
  rotateCamEasingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT)
  rotateCamAnimation.setEasingFunction(rotateCamEasingFunction)
  moveCamForwardAnimation.setEasingFunction(moveCamEasingFunction)

  scene.beginDirectAnimation(camera, [rotateCamAnimation, moveCamForwardAnimation], 0, 25 * frameRate, true, 1)

  // Init city state here according to initial score
  /*
  const fire1 = createFire("fire1", scene)
  fire1.emitter = new Vector3(6, 25, 0.5)

  const fire2 = createFire("fire2", scene)
  fire2.emitter = new Vector3(16, 20, 0.5)

  const smoke1 = createSmoke("smoke1", scene, "sky")
  smoke1.emitter = new Vector3(20, 35, 0.5)

  // Example add trash
  // const trashPack1 = createTrash("trash1", scene, 20)

  // Example setNote for water
  // setTimeout(() => {
  //   const newNote = 0.95
  //   const oldNote = 0
  // waterSetNote(waterCrust, newNote, oldNote, scene )
  // }, 5000)
  */

  return { scene, waterCrust }
}
