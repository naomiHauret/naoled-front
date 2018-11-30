import { h } from "hyperapp"
import { Engine } from "babylonjs"
import { createScene } from "app/views/3d/Scene"
import Layout from "app/views/components/Layout"
import Event from "app/views/components/Event"
import { render } from "lit-html";

const events = [
  {
    id: 0,
    time: "12:15",
    title: "Hello, this is event",
  },
  {
    id: 1,
    time: "13:15",
    title: "Hello, this is event 2",
  },
  {
    id: 2,
    time: "14:15",
    title: "Hello, this is event 3",
  },
  {
    id: 3,
    time: "16:15",
    title: "Hello, this is event 4",
  },
  {
    id: 4,
    time: "18:15",
    title: "Hello, this is event 5",
  },
]

export default () => (state, actions) => {
  const { renderCity } = actions
  return <Layout state={state} actions={actions}>
    <canvas oncreate={(e) => {renderCity(e)}} class="w-75 h-100vh touch-none" id="render"></canvas>
    <aside class="grow-1 flex flex-col pa-45 bg-greyLightest">
        <h1 id="categoryTitle" class="text-black fw-medium fs-xl mb-15">Gobelets de café</h1>
        <p class="text-greyDark fs-sm mb-45" id="description">
          Historique en direct des gobelets récupérés depuis la machine à café et dex gobelets jétés dans la bonne poubelle
      </p>
        <ul id="eventsList" class="maxh-80vh mnh-20 ph-20 overflow-y-auto">
          {events.map((event, index) => <li key={index}>
              <Event event={event} />
            </li>)
          }
        </ul>
        <div id="importantRealLifeMessage" class="mt-auto pa-45 bg-purple">
          <p class="fs-lg pa-0 text-grey">
            Attention à la pollution y’a plein d’ours polaires qui sont morts, c’est très très grave
        </p>
        </div>
    </aside>
  </Layout>

}
