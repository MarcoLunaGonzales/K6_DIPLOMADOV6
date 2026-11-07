import http from 'k6/http';

/*export const options = {
    vus: 10, // Número de usuarios virtuales
    duration: '30s', // Duración de la prueba
};*/

export const options = {
    scenarios: {
        usuarios_escalonados: {
            executor: 'ramping-vus',
            startVUs: 1,
            stages: [
                { duration: '6s', target: 20 },
                { duration: '6s', target: 40 },
                { duration: '6s', target: 60 },
                { duration: '6s', target: 80 },
                { duration: '6s', target: 100 },
                { duration: '6s', target: 120 },
                { duration: '6s', target: 140 },
                { duration: '6s', target: 160 },
                { duration: '6s', target: 200 },
            ],
        },
    },
};

/*export const options = {
    stages: [
        { duration: '20s', target: 20 },
        { duration: '45s', target: 50 },
        { duration: '20s', target: 10 },
    ],
};*/

export default function () {    
    http.get('https://quickpizza.grafana.com/');
}