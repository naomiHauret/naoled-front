import { Effect, ShaderMaterial } from "babylonjs"
import { addCrustSlice } from "app/views/3d/Crust"

import waterFragmentShader from "app/views/3d/shaders/water/fragment.glsl"
import waterVertexShader from "app/views/3d/shaders/water/vertex.glsl"

export const createWater = (scene, size, note) => {
  const waterCrust = addCrustSlice(scene, "water", 4.5, size + 15, size + 15, -3.75)

  Effect.ShadersStore["customVertexShader"] = waterVertexShader
  Effect.ShadersStore["customFragmentShader"] = waterFragmentShader

  const shaderMaterial = new ShaderMaterial(
    "shader",
    scene,
    {
      vertex: "custom",
      fragment: "custom",
    },
    {
      needAlphaBlending: true,
      attributes: ["position", "normal", "uv"],
      uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
    },
  )

  waterCrust.material = shaderMaterial

  waterSetNote(waterCrust, note, 0, scene)

  let time = 0
  scene.registerBeforeRender(() => {
    waterCrust.material.setFloat("time", time)
    time += 0.1
  })
  return waterCrust
}

export const waterSetNote = (waterCrust, note, prevNote, scene) => {
  let prev = prevNote
  const sign = note > prevNote ? 1 : -1

  scene.registerBeforeRender(function waterTween() {
    if (prev >= note && sign === 1) scene.unregisterBeforeRender(waterTween)
    if (prev <= note && sign === -1) scene.unregisterBeforeRender(waterTween)
    prev += 0.01 * sign
    prev = Math.round(prev * 100) / 100
    waterCrust.material.setFloat("colorChange", prev)
    waterCrust.setPivotMatrix(BABYLON.Matrix.Translation(0, 2.5, 0))
    waterCrust.scaling.y = prev * 5 + 1
    waterCrust.material.setFloat("amplitudeChange", prev)
  })
}
