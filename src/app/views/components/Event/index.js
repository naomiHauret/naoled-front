import { html } from 'lit-html'

export const eventComponentFrom = (event) => html`
  <li class='flex justify-between shadow-base'>
    ${event.time} ${event.title}
  </li>
`