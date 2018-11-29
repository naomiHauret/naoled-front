
import { ParticleSystem, Texture, Vector3, Color4 } from 'babylonjs'

export const createFire = (name, scene) => {
  const particleSystem = new ParticleSystem(name, 2000, scene) // Create a particle system
  particleSystem.particleTexture = new Texture(require('./../../../../assets/textures/flame.png'), scene) //Texture of each particle
  particleSystem.minEmitBox = new Vector3(.5, 0, .5)
  particleSystem.maxEmitBox = new Vector3(-.5, 0, -.5)

  // Colors of all particles
  particleSystem.color1 = new Color4(1, 0.05, 0, 1)
  particleSystem.color2 = new Color4(0.1, 0.1, 0.1, 1)

  particleSystem.colorDead = new Color4(0.3, 0, 0, 0)

  // Size of each particle (random between...
  particleSystem.minSize = 0.9
  particleSystem.maxSize = 3

  // Life time of each particle (random between...
  particleSystem.minLifeTime = .4
  particleSystem.maxLifeTime = .5

  particleSystem.emitRate = 1000 // Emission rate
  particleSystem.blendMode = ParticleSystem.BLENDMODE_MULTIPLYADD   // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
  particleSystem.gravity = new Vector3(0, 29.81, 0)   // Set the gravity of all particles

  // Direction of each particle after it has been emitted
  particleSystem.direction1 = new Vector3(3, 6, -3)
  particleSystem.direction2 = new Vector3(-3, 6, 3)

  // Angular speed, in radians
  particleSystem.minAngularSpeed = Math.PI
  particleSystem.maxAngularSpeed = Math.PI

  // Speed
  particleSystem.minEmitPower = 1
  particleSystem.maxEmitPower = 3
  particleSystem.updateSpeed = 0.003

  particleSystem.start() // Start the particle system

  return particleSystem
}


