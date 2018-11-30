import { h, app } from "hyperapp"
import { location } from "@hyperapp/router"
import actions from "app/actions"
import App from "app/views"
import "./index.css"

import { semaine } from 'app/views/components/Chart'

const state = {
  location: location.state,
}

const bodyTag = document.querySelector("body")
const enhancedActions = Object.assign({}, { location: location.actions }, actions)
const view = (state, actions) => <App state={state} actions={enhancedActions} />
const main = app(state, enhancedActions, view, bodyTag)
const unsubscribe = location.subscribe(main.location)

const ctx = document.getElementById('chart').getContext('2d')
if(chart) {
  var dashboardChart = semaine(ctx);
}
