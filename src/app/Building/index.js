import { MeshBuilder } from 'babylonjs'

export const addBuilding = (scene, name, height, width, depth, y) => {
  let building = MeshBuilder.CreateBox("building", { height: height, width: width, depth: depth }, scene)
  building.position.y = y
}
