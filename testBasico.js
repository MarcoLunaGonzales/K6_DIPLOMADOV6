import http from 'k6/http';

/*export const options = {
    vus: 10, // Número de usuarios virtuales
    duration: '30s', // Duración de la prueba
};*/

/*export const options = {
    scenarios: {
        usuarios_escalonados: {
            executor: 'ramping-vus',
            startVUs: 1,
            stages: [
                { duration: '3s', target: 2 },
                { duration: '3s', target: 3 },
                { duration: '3s', target: 4 },
                { duration: '3s', target: 5 },
                { duration: '3s', target: 6 },
                { duration: '3s', target: 7 },
                { duration: '3s', target: 8 },
                { duration: '3s', target: 9 },
                { duration: '3s', target: 10 },
            ],
        },
    },
};*/

export const options = {
    stages: [
        { duration: '20s', target: 20 },
        { duration: '45s', target: 50 },
        { duration: '20s', target: 10 },
    ],
};

export default function () {    
    http.get('https://quickpizza.grafana.com/');
}