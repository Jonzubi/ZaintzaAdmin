import axios from 'axios';
import { API_URL } from './envConfig';

const getCuidadores = () =>
  axios.get(
    `${API_URL}/api/procedures/getCuidadoresConValoraciones?requiredCards=100&maxDistance=1000`,
  );

const getAnuncios = () =>
  axios.get(`${API_URL}/api/procedures/getAnunciosConPerfil`);

const banUser = (idCuidador, banDays) =>
  axios.post(`${API_URL}/api/procedures/banUser`, {
    idCuidador,
    banDays,
  });

const unBanUser = (idCuidador) =>
  axios.post(`${API_URL}/api/procedures/unBanUser`, {
    idCuidador,
  });

const deleteImgContact = (idCuidador) =>
  axios.post(`${API_URL}/api/procedures/deleteCuidadorImg`, {
    idCuidador,
  });

export { getCuidadores, getAnuncios, banUser, unBanUser, deleteImgContact };
