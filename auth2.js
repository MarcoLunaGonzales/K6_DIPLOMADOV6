import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1s', target: 1 }, // Sube a 1 usuario virtual
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],   // Menos del 1% de errores
    http_req_duration: ['p(95)<500'], // El 95% de las peticiones en menos de 500ms
  },
};

// 1. Fase de Configuración (Se ejecuta UNA sola vez antes de iniciar la carga)
export function setup() {
  const loginUrl = 'https://dummyjson.com/auth/login';
  
  const payload = JSON.stringify({
    username: 'emilys',
    password: 'emilyspass',
    expiresInMins: 30,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let res = http.post(loginUrl, payload, params);

  // Validamos que el login haya sido exitoso
  check(res, {
    'login exitoso (status 200)': (r) => r.status === 200,
    'token recibido': (r) => r.json('accessToken') !== undefined,
  });

  console.log(`Login exitoso. Token recibido: ${res.json('accessToken')}`);
  return { token: res.json('accessToken') };
}

// 2. Función principal que ejecutan los usuarios virtuales concurrentemente
export default function (data) {
  const token = data.token;
  const protectedUrl = 'https://dummyjson.com/auth/me';

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Inyectamos el token en la cabecera
    },
  };

  let res = http.get(protectedUrl, params);

  // Validamos que el endpoint protegido devuelva los datos del usuario
  check(res, {
    'status es 200 en /auth/me': (r) => r.status === 200,
    'username correcto': (r) => r.json('username') === 'emilys',
  });
  
  console.log(`Respuesta JSON: ${JSON.stringify(res.json())}`);

  sleep(1); // Pausa de 1 segundo entre iteraciones
}