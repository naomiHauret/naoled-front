import { h } from "hyperapp"

function formatSeconds(milliseconds, format) {
  const dateObj = new Date(milliseconds)

  function getDoubleDigits(value) {
    return ("0" + value).slice(-2)
  }

  const o = {
    hh: getDoubleDigits(dateObj.getHours()),
    mm: getDoubleDigits(dateObj.getMinutes()),
    ss: getDoubleDigits(dateObj.getSeconds())
  }

  const dilimeter = format.match(/[^\w]/)[0];
  return format.split(dilimeter).map(function (f) {
    return o[f]
  }).join(dilimeter)
}


export default (data) => {
  return (
    <div class="bg-white radius-lg fs-sm flex wrap justify-between shadow-base pl-20 pr-35 pv-15 mb-15">
      <span class="text-greyDark fw-medium"> {formatSeconds(+data.data.time, "hh:mm")} </span> <span class="text-grey"> {data.data.text} </span>
    </div>
  )
}
