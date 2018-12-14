import { h } from "hyperapp"
import { Engine } from "babylonjs"
import { createScene } from "app/views/3d/Scene"
import Layout from "app/views/components/Layout"
import Event from "app/views/components/Event"
import Loader from "app/views/components/Loader"
import { views, facts, viewsId } from "content"
import anime from "animejs"

export default () => (state, actions) => {
  const { renderCity } = actions
  const changeViewDelay = 60000
  const list = Object.keys(state).filter((value) => value.toLowerCase().includes(state.uiInfo.toLowerCase())) // get which list to loop on

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
        <h1
          onupdate={(e) =>
            anime({
              targets: e,
              translateX: [-25, 0],
              duration: 1350,
              opacity: [0, 1],
              easing: "easeOutExpo",
            })
          }
          id="categoryTitle"
          class="text-black fw-medium fs-xl mb-15"
        >
          {views[state.uiInfo].title}
        </h1>
        <p
          class="text-greyDark fs-sm mb-45"
          id="description"
          onupdate={(e) =>
            anime({
              targets: e,
              translateX: [-25, 0],
              duration: 1250,
              delay: 75,
              opacity: [0, 1],
              easing: "easeOutExpo",
            })
          }
        >
          {views[state.uiInfo].text}
        </p>
        {state[list] !== undefined && state[list].length > 0 ? (
          <ul
            id="eventsList"
            class="maxh-80vh mnh-20 ph-20"
            onupdate={(e) => {
              return anime({
                targets: "li",
                translateY: [10, 0],
                opacity: [0, 1],
                overflowY: ["hidden", "auto"],
                easing: "easeInOutQuart",
                duration: (el, i, l) => {
                  return 250 + i * 100
                },
                elasticity: (el, i, l) => {
                  return 200 + i * 200
                },
              })
            }}
          >
            {state[list].map((event, index) => (
              <li key={index}>
                <Event data={event} />
              </li>
            ))}
          </ul>
        ) : (
          <Loader
            onupdate={(e) =>
              anime({
                targets: e,
                duration: 1000,
                delay: 450,
                opacity: [0, 1],
                translateY: [15, 0],
                easing: "easeInOutQuart",
              })
            }
            onremove={(e) =>
              anime({
                targets: e,
                duration: 850,
                opacity: [0, 1],
                translateY: [0, -20],
                easing: "easeInOutExpo",
              })
            }
          />
        )}
        <div
          id="importantRealLifeMessage"
          onupdate={(e) =>
            anime({
              targets: e,
              translateX: [-25, 0],
              duration: 1150,
              delay: 250,
              opacity: [0, 1],
              easing: "easeOutExpo",
            })
          }
          class="mt-auto"
        >
          <p class="fs-lg pa-0 text-greyDark">{facts[state.randomFact]}</p>
        </div>
      </aside>
      <div class="fixed flex scoreCounter radius-100 relative items-center justify-center shadow-light">
        <span class="text-greyDark fs-xl fw-medium" onupdate={(e) => anime({
          targets: e,
          innerHTML: state.score,
          round: 1,
          easing: "easeInOutQuart",
          delay: 1350,
          duration: 2500,
        })} />
        <span class="text-grey absolute fs-sm">/ 9960</span>
      </div>
    </Layout>
  )
}
