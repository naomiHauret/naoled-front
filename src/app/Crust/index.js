import { MeshBuilder, Mesh } from 'babylonjs'

export const createCrust = (scene, size) => {
  // Group
  const crustGroup = Mesh.CreateBox("crustGroup", 1, scene)

  // Chilren
  const earthCrust1 = MeshBuilder.CreateBox("earth1", { height: 0.5, width: size, depth: size }, scene)
  earthCrust1.parent = crustGroup
  earthCrust1.position.y = 0

  const earthCrust2 = MeshBuilder.CreateBox("earth2", { height: 2, width: size, depth: size }, scene)
  earthCrust2.parent = crustGroup
  earthCrust2 .position.y = -0.5

  const earthCrust3 = MeshBuilder.CreateBox("earth3", { height: 2, width: size, depth: size }, scene)
  earthCrust3.parent = crustGroup
  earthCrust3.position.y = -2.5

  const earthCrust4 = MeshBuilder.CreateBox("earth3", { height: 1, width: size, depth: size }, scene)
  earthCrust4.parent = crustGroup
  earthCrust4.position.y = -3.5

  return crustGroup
}

export const addCrustSlice = (scene, name, height, width, depth, y) => {
  const crust = MeshBuilder.CreateBox(name, { height: height, width: width, depth: depth }, scene)
  crust.position.y = y
  return crust
}
