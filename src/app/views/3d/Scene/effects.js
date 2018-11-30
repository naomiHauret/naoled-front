import { ParticleSystem, ParticleHelper, Texture, Vector3, Color4, SpriteManager, Sprite } from "babylonjs"
import flameTexture from "assets/textures/flame.png"
import smokeTexture from "assets/textures/smoke.png"
import trashTexture from "assets/textures/trash.png"

export const createFire = (name, scene) => {
  const fire = new ParticleSystem(name, 2000, scene) // Create a particle system
  fire.particleTexture = new Texture(flameTexture, scene) //Texture of each particle
  fire.minEmitBox = new Vector3(0.5, 0, 0.5)
  fire.maxEmitBox = new Vector3(-0.5, 0, -0.5)

  // Colors of all particles
  fire.color1 = new Color4(1, 0.05, 0, 1)
  fire.color2 = new Color4(0.1, 0.1, 0.1, 1)
  fire.colorDead = new Color4(0.3, 0, 0, 0)

  // Size of each particle (random between...
  fire.minSize = 0.9
  fire.maxSize = 3

  // Life time of each particle (random between...
  fire.minLifeTime = 0.4
  fire.maxLifeTime = 0.5

  fire.emitRate = 1000 // Emission rate
  fire.blendMode = ParticleSystem.BLENDMODE_MULTIPLYADD // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
  fire.gravity = new Vector3(0, 29.81, 0) // Set the gravity of all particles

  // Direction of each particle after it has been emitted
  fire.direction1 = new Vector3(3, 6, -3)
  fire.direction2 = new Vector3(-3, 6, 3)

  // Angular speed, in radians
  fire.minAngularSpeed = Math.PI
  fire.maxAngularSpeed = Math.PI

  // Speed
  fire.minEmitPower = 1
  fire.maxEmitPower = 3
  fire.updateSpeed = 0.003

  fire.start() // Start the particle system

  return fire
}

export const createSmoke = (name, scene, origin) => {
  // Particle system
  const smoke = ParticleHelper.CreateDefault(new Vector3.Zero(), 2000)
  const smokeCloud = origin === "floor" ? smoke.createConeEmitter(0.6, 1) : smoke.createHemisphericEmitter(0.6, 1)
  smoke.emitRate = 20

  // Size
  smoke.addSizeGradient(0.0, 2.0, 2.0)
  smoke.addSizeGradient(1.0, 5.0, 8.0)

  // Lifetime
  smoke.minLifeTime = 2
  smoke.maxLifeTime = 8

  // Rotation
  smoke.minInitialRotation = -Math.PI / 2
  smoke.maxInitialRotation = Math.PI / 2

  // Rotation over lifetime
  smoke.addAngularSpeedGradient(0, 0)
  smoke.addAngularSpeedGradient(1.0, -0.4, 0.4)

  // Color over lifetime
  smoke.addColorGradient(0.0, new Color4(190 / 255, 180 / 255, 180 / 255, 0.0))
  smoke.addColorGradient(0.2, new Color4(190 / 255, 180 / 255, 180 / 255, 128 / 255))
  smoke.addColorGradient(0.6, new Color4(110 / 255, 100 / 255, 100 / 255, 60 / 255))
  smoke.addColorGradient(1.0, new Color4(110 / 255, 100 / 255, 100 / 255, 0.0))

  // Texture
  smoke.isAnimationSheetEnabled = true
  smoke.particleTexture = new Texture(smokeTexture, scene)
  smoke.blendMode = ParticleSystem.BLENDMODE_MULTIPLY
  smoke.spriteCellWidth = 256
  smoke.spriteCellHeight = 256
  smoke.startSpriteCellID = Math.floor(Math.random() * (3 - 0 + 1)) + 0
  smoke.endSpriteCellID = smoke.startSpriteCellID
  smoke.spriteCellChangeSpeed = 1

  // Start
  smoke.start(30)

  return smoke
}

export const createTrash = (name, scene, number) => {
  // Parameters : name, imgUrl, capacity, cellSize, scene
  let trashBagsPack = new SpriteManager(name, "https://i.ibb.co/mqPWq4c/trasssssh.png", number, 800, scene) // Sprite manager to optimize GPU ressources

  for (let i = 0; i < 2000; i++) {
    let trash = new Sprite("trash", trashBagsPack)
    trash.size = Math.floor(Math.random() * 25) + 15
    trash.position.x = Math.floor(Math.random() * 50) + -25
    trash.position.z = Math.floor(Math.random() * 35) + -25

    trash.isPickable = false
  }

  return trashBagsPack
}
