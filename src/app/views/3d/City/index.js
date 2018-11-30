import { MeshBuilder, Mesh, Vector3, Color3, PBRMetallicRoughnessMaterial } from "babylonjs"

export const createCity = (scene) => {
  const buildingMaterial = new PBRMetallicRoughnessMaterial("pbr", scene)
  buildingMaterial.baseColor = new Color3(1.0, 1.0, 1.0)
  buildingMaterial.metallic = 0
  buildingMaterial.roughness = 1.0

  // Group
  const cityGroup = Mesh.CreateBox("cityGroup", 1, scene)
  const borroughGroup = Mesh.CreateBox("borrough1", 1, scene)

  // Chilren
  const building1 = MeshBuilder.CreateBox("building1", { height: 25, width: 10, depth: 10 }, scene)
  building1.parent = borroughGroup
  building1.position.y = 15
  building1.material = buildingMaterial
  building1.receiveShadows = true

  const building2 = MeshBuilder.CreateBox("building2", { height: 22, width: 5, depth: 5 }, scene)
  building2.parent = borroughGroup
  building2.position = new Vector3(8, 10, -5)
  building2.material = buildingMaterial
  building2.receiveShadows = true

  const building3 = MeshBuilder.CreateBox("building3", { height: 10, width: 4, depth: 4 }, scene)
  building3.parent = borroughGroup
  building3.position = new Vector3(0, 4.5, -15)
  building3.material = buildingMaterial
  building3.receiveShadows = true

  const building4 = MeshBuilder.CreateBox("building4", { height: 5, width: 3, depth: 3 }, scene)
  building4.parent = borroughGroup
  building4.position = new Vector3(8, 0, -10)
  building4.material = buildingMaterial
  building4.receiveShadows = true

  const building5 = MeshBuilder.CreateBox("building5", { height: 18, width: 4, depth: 4 }, scene)
  building5.parent = borroughGroup
  building5.position = new Vector3(-10, 9, -15)
  building5.material = buildingMaterial
  building5.receiveShadows = true

  const building6 = MeshBuilder.CreateBox("building6", { height: 45, width: 12, depth: 12 }, scene)
  building6.parent = borroughGroup
  building6.position = new Vector3(-10, 20, 12)
  building6.material = buildingMaterial
  building6.receiveShadows = true

  const building7 = MeshBuilder.CreateBox("building7", { height: 50, width: 14, depth: 14 }, scene)
  building7.parent = borroughGroup
  building7.position = new Vector3(10, 20, 12)
  building7.material = buildingMaterial
  building7.receiveShadows = true

  const building8 = MeshBuilder.CreateBox("building8", { height: 1.5, width: 4, depth: 8 }, scene)
  building8.parent = borroughGroup
  building8.position = new Vector3(10, 1, -15)
  building8.material = buildingMaterial
  building8.receiveShadows = true

  const building9 = MeshBuilder.CreateBox("building9", { height: 5, width: 4, depth: 8 }, scene)
  building9.parent = borroughGroup
  building9.position = new Vector3(-15, 1, -5)
  building9.material = buildingMaterial
  building9.receiveShadows = true

  const building10 = MeshBuilder.CreateBox("building10", { height: 10, width: 2, depth: 8 }, scene)
  building10.parent = borroughGroup
  building10.position = new Vector3(-15, 1, -5)
  building10.material = buildingMaterial
  building10.receiveShadows = true

  const building11 = MeshBuilder.CreateBox("building11", { height: 12, width: 7, depth: 12 }, scene)
  building11.parent = borroughGroup
  building11.position = new Vector3(20, 2, 5)
  building11.material = buildingMaterial
  building11.receiveShadows = true

  const subground = MeshBuilder.CreateBox("subground", { height: 0.5, width: 25, depth: 28 }, scene)
  subground.parent = cityGroup
  subground.position = new Vector3(0, -5.5, 0)
  subground.material = buildingMaterial
  subground.receiveShadows = true

  borroughGroup.parent = cityGroup
  borroughGroup.position = new Vector3(0, -5.8, 0)

  return cityGroup
}
