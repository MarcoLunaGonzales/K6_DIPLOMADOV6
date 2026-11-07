import http from 'k6/http';
import {check} from 'k6';

export const options = {
    vus: 10,
    duration: '30s',
};

export default function () {
    const res = http.get('https://dummyjson.com/products');

    check(res, {
        'El estado es 200 Ok y Todo Ok': (r) => r.status === 200,
        'En el servicio de https://dummyjson.com': (r) => r.body.includes('description'),
        'El tiempo por SLA debe ser menor a 200ms': (r) => r.timings.duration < 200,
        'Tamaño de la respuesta debe ser menor a 45kb': (r) => r.body.length < 45 * 1024,
    });
}