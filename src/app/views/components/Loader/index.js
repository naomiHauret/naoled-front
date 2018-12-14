import { h } from "hyperapp"

export default (props) => {
  return (
    <div class="tc" {...props}>
      <div class="loader relative block pin m-a">
        <span class="absolute block pin m-a" />
      </div>
      <small class="block fs-xs m-a pa-45 text-grey">En attente de données...</small>
    </div>
  )
}
