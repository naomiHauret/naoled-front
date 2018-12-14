import { h, app } from "hyperapp"
import { location } from "@hyperapp/router"
import actions from "app/actions"
import App from "app/views"
import "./index.css"
import { viewsId } from "content"

const state = {
  location: location.state,
  uiInfo: viewsId[0],
  randomFact: 0,
  ashbinEvents: [],
  trashEvents: [],
  doorEvents: [],
  lightEvents: [],
  stairsEvents: [],
  score: 0,
}

const bodyTag = document.querySelector("body")
const enhancedActions = Object.assign({}, { location: location.actions }, actions)
const view = (state, actions) => <App state={state} actions={enhancedActions} />
const main = app(state, enhancedActions, view, bodyTag)
const unsubscribe = location.subscribe(main.location)
