import { render } from 'lit-html'

import { home } from 'app/views/pages/Home'
import { dashboard } from 'app/views/pages/Dashboard'
import { history } from 'app/views/pages/History'
import { about } from 'app/views/pages/About'

const routes = {
    '/': home(),
    '/dashboard': dashboard(),
    '/history': history(),
    '/about': about(),
}

export const navigate = (route) => {
    let main = document.querySelector('main')
    render(routes[route], main)
}
