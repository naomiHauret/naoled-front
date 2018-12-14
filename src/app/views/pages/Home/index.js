import { h } from "hyperapp"
import { Engine } from "babylonjs"
import { createScene } from "app/views/3d/Scene"
import Layout from "app/views/components/Layout"
import Event from "app/views/components/Event"
import { render } from "lit-html"

export default () => (state, actions) => {
  const { renderCity } = actions
  console.log(state.trashEvents)
  return (
    <Layout state={state} actions={actions}>
      <canvas
        oncreate={() => {
          renderCity()
        }}
        class="w-75 h-100vh touch-none"
        id="render"
      />
      <aside class="grow-1 flex flex-col pa-45 bg-greyLightest">
        <h1 id="categoryTitle" class="text-black fw-medium fs-xl mb-15">
          Gobelets de café
        </h1>
        <p class="text-greyDark fs-sm mb-45" id="description">
          Historique en direct des gobelets récupérés depuis la machine à café et dex gobelets jétés dans la bonne
          poubelle
        </p>
        <ul id="eventsList" class="maxh-80vh mnh-20 ph-20 overflow-y-auto">
          {console.log(state.ashbinEvents)}
          {state.ashbinEvents.map((event, index) => (
            <li key={index}>
              {event.time}
            </li>
          ))}
        </ul>
        <div id="importantRealLifeMessage" class="mt-auto pa-45 bg-purple">
          <p class="fs-lg pa-0 text-grey">
            Attention à la pollution y’a plein d’ours polaires qui sont morts, c’est très très grave
          </p>
        </div>
      </aside>
    </Layout>
  )
}
