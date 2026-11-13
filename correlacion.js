import http from 'k6/http';
import {check} from 'k6';

export const options = {
    vus: 101,
    duration: '30s',
};

export default function () {
    const serverUrl = 'https://dummyjson.com'; // servidor de pruebAS PARAMETRIZACION
    //const serverUrl = 'https://dummyjson.net'; // servidor de pruebAS
    // https://dummyjson.net/ servidor preproduccion
    const url = `${serverUrl}/users/`;
    const res = http.get(url);
    const bodyJson = res.json();
    const usuarios = bodyJson.users;

    const idUsuarios = usuarios ?  usuarios.map((usuario) => usuario.id) : [];
    const edadUsuarios = usuarios ?  usuarios.map((usuario) => usuario.age) : [];

    //console.log(`Ids de Usuarios: ${idUsuarios.join(', ')}`);
    //console.log(`Edades de  Usuarios: ${edadUsuarios.join(', ')}`);

    //del arreglo de Ids sacaremos aleatoriamente un Id para hacer la peticion de un usuario en especifico
    const selectIdUsuario = idUsuarios[Math.floor(Math.random() * idUsuarios.length)];

    //console.log(`Id utilizado para segunda peticion: ${selectIdUsuario}`);
    const urlSecundaria = `${serverUrl}/users/${selectIdUsuario}`;
    const resSecundaria = http.get(urlSecundaria);

}