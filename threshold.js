import http from 'k6/http';

export const options = {
    vus: 10,
    duration: '30s',
    thresholds: {
        http_req_duration: ['p(95)<240'], // 95% de las solicitudes deben ser menores a 200ms
        http_req_failed: ['rate<0.01'], // Menos del 1% de las solicitudes deben fallar
    },
};

export default function () {
    const idProducto = Math.floor(Math.random() * 100) + 1; // Genera un ID de producto aleatorio entre 1 y 100
    const res = http.get('https://dummyjson.com/products/${idProducto}');
}