import axios from 'axios';

export const getUserInfo = async (id, token) => {
  return await axios.get(`${process.env.NEXT_API_URL}/waInstance${id}/getWaSettings/${token}`)
}
