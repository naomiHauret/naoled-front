import { h } from "hyperapp"
import Layout from "app/views/components/Layout"

export default () => (state, actions) => {
  return (
    <Layout state={state} actions={actions}>
      <div>This is about</div>
    </Layout>
  )
}
