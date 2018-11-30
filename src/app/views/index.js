import { h } from "hyperapp"
import { Switch, Route } from "@hyperapp/router"
import Home from "app/views/pages/Home"
import About from "app/views/pages/About"
import Dashboard from "app/views/pages/Dashboard"
import History from "app/views/pages/History"

export default ({ state, actions, match }) => {
  return (
    <Switch>
      <Route render={Home} path={"/"} />
      <Route render={About} path={"/about"} />
      <Route render={Dashboard} path={"/dashboard"} />
      <Route render={History} path={"/history"} />
    </Switch>
  )
}
