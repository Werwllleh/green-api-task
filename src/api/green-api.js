import axios from 'axios';

export const getUserInfo = async (id, token) => {
  return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/waInstance${id}/getWaSettings/${token}`)
}

export const getLastIncomingMessages = async (id, token) => {
  return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/waInstance${id}/lastIncomingMessages/${token}`)
}

export const getUserDialogs = async (id, token) => {
  return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/waInstance${id}/getChats/${token}`)
}

export const getChatHistory = async (id, token, chatId, count) => {

  const body = {
    "chatId": chatId, // ID чата
    "count": count, // Сообщение
  };

  return await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/waInstance${id}/getChatHistory/${token}`, body)
}

export const sendMessage = async (id, token, phoneNumber, message) => {

  const body = {
    "chatId": `${phoneNumber}@c.us`, // ID чата
    "message": message, // Сообщение
  };

  return await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/waInstance${id}/sendMessage/${token}`, body)
}
