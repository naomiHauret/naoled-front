import { h } from "hyperapp"

export default () => {
  return (
    <div class="tc">
      <div class="loader relative block pin m-a">
        <span class="absolute block pin m-a" />
      </div>
      <small class="block fs-xs m-a pa-45 text-grey">En attente de données...</small>
    </div>
  )
}
