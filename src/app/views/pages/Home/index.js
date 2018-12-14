import { h } from "hyperapp"
import { Engine } from "babylonjs"
import { createScene } from "app/views/3d/Scene"
import Layout from "app/views/components/Layout"
import Event from "app/views/components/Event"
import Loader from "app/views/components/Loader"
import { views, facts, viewsId } from "content"

export default () => (state, actions) => {
  const { renderCity } = actions
  const changeViewDelay = process.env.NODE_ENV === "development" ? 5000 : 60000
  const list = Object.keys(state).filter((value) => value.toLowerCase().includes(state.uiInfo.toLowerCase()))

  return (
    <Layout state={state} actions={actions}>
      <canvas
        oncreate={() => {
          renderCity()
        }}
        class="w-75 h-100vh touch-none"
        id="render"
      />
      <aside
        oncreate={() => setInterval(actions.changeView, changeViewDelay)}
        class="w-25 flex flex-col pa-45 bg-greyLightest relative"
      >
        <h1 id="categoryTitle" class="text-black fw-medium fs-xl mb-15">
          {views[state.uiInfo].title}
        </h1>
        <p class="text-greyDark fs-sm mb-45" id="description">
          {views[state.uiInfo].text}
        </p>
        {
          state[list] !== undefined && state[list].length > 0 ? <ul id="eventsList" class="maxh-80vh mnh-20 ph-20 overflow-y-auto">

          { state[list].map((event, index) => (
              <li key={index}>
                <Event data={event} />
              </li>
            ))}
          </ul> : <Loader />
        }
        <div id="importantRealLifeMessage" class="mt-auto pa-45 bg-purple">
          <p class="fs-lg pa-0 text-grey">{facts[state.randomFact]}</p>
        </div>
      </aside>
    </Layout>
  )
}
