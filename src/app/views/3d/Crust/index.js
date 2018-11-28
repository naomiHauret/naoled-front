import { MeshBuilder, Mesh } from "babylonjs"

export const createCrust = (scene, size) => {
  // Group
  const crustGroup = Mesh.CreateBox("crustGroup", 1, scene)

  const pbr = new BABYLON.PBRMetallicRoughnessMaterial("pbr", scene)
  pbr.baseColor = new BABYLON.Color3(1.0, 1.0, 1.0)
  pbr.metallic = 0
  pbr.roughness = 1.0

  // Chilren
  const earthCrust1 = MeshBuilder.CreateBox("earth1", { height: 0.5, width: size, depth: size }, scene)
  earthCrust1.parent = crustGroup
  earthCrust1.material = pbr
  earthCrust1.position.y = 0
  earthCrust1.receiveShadows = true

  const earthCrust2 = MeshBuilder.CreateBox("earth2", { height: 2, width: size, depth: size }, scene)
  earthCrust2.parent = crustGroup
  earthCrust2.position.y = -0.5
  earthCrust2.material = pbr

  earthCrust2.receiveShadows = true

  const earthCrust3 = MeshBuilder.CreateBox("earth3", { height: 2, width: size, depth: size }, scene)
  earthCrust3.parent = crustGroup
  earthCrust3.position.y = -2.5
  earthCrust3.receiveShadows = true
  earthCrust3.material = pbr

  const earthCrust4 = MeshBuilder.CreateBox("earth3", { height: 1, width: size, depth: size }, scene)
  earthCrust4.parent = crustGroup
  earthCrust4.position.y = -3.5
  earthCrust4.receiveShadows = true
  earthCrust4.material = pbr

  return crustGroup
}

export const addCrustSlice = (scene, name, height, width, depth, y) => {
  const crust = MeshBuilder.CreateBox(name, { height: height, width: width, depth: depth }, scene)
  crust.position.y = y
  crust.increaseFacets(200)
  return crust
}
