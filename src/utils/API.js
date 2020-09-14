import axios from 'axios';
import { API_URL } from './envConfig';

const getCuidadores = () =>
  axios.get(
    `${API_URL}/api/procedures/getCuidadoresConValoraciones?requiredCards=100&maxDistance=1000`,
  );

const getAnuncios = () =>
  axios.get(`${API_URL}/api/procedures/getAnunciosConPerfil`);

const banUser = (idCuidador, banDays, banType) =>
  axios.post(`${API_URL}/api/procedures/banUser`, {
    idCuidador,
    banDays,
    banType,
  });

export { getCuidadores, getAnuncios, banUser };
