import { h } from "hyperapp"
import Layout from "app/views/components/Layout"

export default () => (state, actions) => {
    return (
        <Layout state={state} actions={actions}>
            <div>Dashboard</div>
            <section class='w-75 h-100vh touch-none ph-20'>
                <canvas id='chart'></canvas>
                <input class='slider' oninput='' name='range' type='range' min='1' max='4' step='1' />
                <ul class='slider-labels text-greyDark fs-sm mb-45'>
                    <li>Jour</li>
                    <li>Semaine</li>
                    <li>Mois</li>
                    <li>Année</li>
                </ul>
            </section>

            <aside class='grow-1 flex flex-col bg-greyLightest ph-20'>
                <h1 id="categoryTitle" class="text-black fw-medium fs-xl mb-15">Détails</h1>
                <p class="text-greyDark fs-sm mb-45" id="description">
                    Historique des différents indicateurs au cours de la semaine
                </p>
                <ul id="eventsList" class="maxh-80vh mnh-20 ph-20 overflow-y-auto">
                    <li>-200 cafés</li>
                    <li>-50 chauffage</li>
                    <li>-70 lumière</li>
                    <li>125 cigarettes</li>
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
