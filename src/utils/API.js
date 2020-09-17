import axios from 'axios';
import { API_URL } from './envConfig';
import { token } from './token';

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
    token,
  });

const unBanUser = (idCuidador) =>
  axios.post(`${API_URL}/api/procedures/unBanUser`, {
    idCuidador,
    token,
  });

const deleteImgContact = (idCuidador) =>
  axios.post(`${API_URL}/api/procedures/deleteCuidadorImg`, {
    idCuidador,
    token,
  });

const isUserBanned = (idPerfil) =>
  axios.get(`${API_URL}/api/procedures/isUserBanned/${idPerfil}`);

export {
  getCuidadores,
  getAnuncios,
  banUser,
  unBanUser,
  deleteImgContact,
  isUserBanned,
};
