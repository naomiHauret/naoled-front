import Chart from 'chart.js'

export let semaine = (ctx) => {
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
            datasets: [
                {
                    label: 'Cigarettes',
                    data: [12, 19, 3, 5, 6],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Gobelets',
                    data: [-14, -3, -6, -1, -9],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Lumière',
                    data: [-5, -3, -2, -12, -15],
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Chauffage',
                    data: [-7, -4, -3, -8, -17, -13],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true,
                }]
            }
        }
    })
}

export let day = (ctx) => {
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['0h', '3h', '6h', '9h', '12h', '15h', '18h', '21h', '23h59'],
            datasets: [
                {
                    label: 'Cigarettes',
                    data: [12, 19, 3, 5, 6, 19, 3, 5, 6],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Gobelets',
                    data: [-14, -3, -6, -1, -9, -3, -2, -12, -15],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Lumière',
                    data: [-5, -3, -2, -12, -15, -4, -3, -8, -17],
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Chauffage',
                    data: [-7, -4, -3, -8, -17, -3, -6, -1, -9],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true,
                }]
            }
        }
    })
}

export let month = (ctx) => {
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            datasets: [
                {
                    label: 'Cigarettes',
                    data: [12, 19, 3, 5, 6, 19, 3, 5, 6, 19, 3, 5],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Gobelets',
                    data: [-14, -3, -6, -1, -9, -3, -2, -12, -15, -3, -8, -17],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Lumière',
                    data: [-5, -3, -2, -12, -15, -4, -3, -8, -17, -4, -3, -8],
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Chauffage',
                    data: [-7, -4, -3, -8, -17, -3, -6, -1, -9, -3, -8, -17],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true,
                }]
            }
        }
    })
}