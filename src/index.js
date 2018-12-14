import { h, app } from "hyperapp"
import { location } from "@hyperapp/router"
import debug from 'hyperapp-debug'
import actions from "app/actions"
import App from "app/views"
import "./index.css"

const state = {
  location: location.state,
  ashbinEvents: [],
  trashEvents: [{id: 'iohfihef', time: '6486464453'}],
  doorEvents: [],
  lightEvents: [],
  stairsEvents: [],
}

const bodyTag = document.querySelector("body")
const enhancedActions = Object.assign({}, { location: location.actions }, actions)
const view = (state, actions) => <App state={state} actions={enhancedActions} />
const main = app(state, enhancedActions, view, bodyTag)
const unsubscribe = location.subscribe(main.location)
process.env.NODE_ENV === 'development' && debug(app)(state, enhancedActions, view)
