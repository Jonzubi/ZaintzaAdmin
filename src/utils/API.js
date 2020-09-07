import axios from 'axios';
import { API_URL } from './envConfig';

const getCuidadores = () =>
  axios.get(
    `${API_URL}/api/procedures/getCuidadoresConValoraciones?requiredCards=100&maxDistance=1000`,
  );

const getAnuncios = () =>
  axios.get(`${API_URL}/api/procedures/getAnunciosConPerfil`);

export { getCuidadores, getAnuncios };
