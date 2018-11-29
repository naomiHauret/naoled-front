import { html } from 'lit-html'

export const eventComponentFrom = (event) => html`
  <div class='bg-white radius-lg fs-sm flex wrap justify-between shadow-base pl-20 pr-35 pv-15 mb-15'>
    <span class="text-greyDark fw-medium">
      ${event.time}
    </span>
    <span class="text-grey">
      ${event.title}
    </span>
  </div>
`