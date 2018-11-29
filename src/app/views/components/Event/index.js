import { html } from 'lit-html'

export const eventComponentFrom = (event) => html`
  <li class='fs-sm flex justify-between shadow-base pl-20 pr-35 pv-15 mb-15'>
    <span>
      ${event.time}
    </span>
    <span>
      ${event.title}
    </span>
  </li>
`