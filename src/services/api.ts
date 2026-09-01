import axios from 'axios';

// URL de produção do my-json-server, apontando pro nosso repositório
// agudos-connect-api (db.json publicado no GitHub) — funciona de qualquer
// lugar (emulador, celular físico, web), sem precisar rodar nada localmente.
const API_BASE_URL = 'https://my-json-server.typicode.com/dorfusouza/agudos-connect-api';

// Alternativas pra quando quiser rodar o json-server LOCAL (`npm start` dentro
// de agudos-connect-api, porta 3001) em vez da versão de produção — deixamos
// comentado só pra referência, não usamos por padrão:
//
// - Emulador Android: 'http://10.0.2.2:3001'
// - Expo Go em celular físico (mesma rede Wi-Fi): 'http://SEU_IP_LOCAL:3001'
//   (descobrir o IP com `ipconfig`, ex. 192.168.0.x)

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});
