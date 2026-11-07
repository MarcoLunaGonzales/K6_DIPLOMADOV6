import http from 'k6/http';

/*
CONDICIONES CON LAS CUALES VAMOS A EJECUTAR LAS PRUEBAS
*/

export default function(){
    http.get('https://quickpizza.grafana.com/');
}