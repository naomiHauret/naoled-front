import { render } from 'lit-html'

import { home } from '../pages/home'
import { dashboard } from '../pages/dashboard'
import { history } from '../pages/history'
import { about } from '../pages/about'

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
