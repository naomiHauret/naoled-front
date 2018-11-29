import { html, render } from 'lit-html'
import { eventComponentFrom } from 'app/views/components/Event'

  const events = [{
    time: '12:15',
    title: 'Hello, this is event',
  }, {
    time: '13:15',
    title: 'Hello, this is event 2',
    },{
    time: '14:15',
      title: 'Hello, this is event 3',
  }, {
    time: '16:15',
      title: 'Hello, this is event 4',
  }, {
    time: '18:15',
      title: 'Hello, this is event 5',
  }]
  const eventsListTemplate = []
  const eventsList = html`
      <ul>
        ${events.map((event) => html`${eventComponentFrom(event)}`)}
      </ul>
    `

export const home = () => html`
    <canvas class="w-75 h-100vh touch-none" id="render"></canvas>
    <aside class="grow-1" id="events">
        ${eventsList}
    </aside>
`
