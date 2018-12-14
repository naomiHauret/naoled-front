import { h } from "hyperapp"

export default (data) => {
  return (
    <div class="bg-white radius-lg fs-sm flex wrap justify-between shadow-base pl-20 pr-35 pv-15 mb-15">
      <span class="text-greyDark fw-medium"> {data.time} </span> <span class="text-grey"> {data.text} </span>
    </div>
  )
}
