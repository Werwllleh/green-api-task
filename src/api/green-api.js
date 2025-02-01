import axios from 'axios';

export const getUserInfo = async (id, token) => {
  return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/waInstance${id}/getWaSettings/${token}`)
}

export const getUserDialogs = async (id, token) => {
  try {

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/waInstance${id}/getChats/${token}`);
    return response.data.filter((chat) => chat.archive !== true && chat.name);

  } catch (error) {
    console.error("Ошибка получения диалогов:", error);
  }
}

export const getChatHistory = async (id, token, chatId, count) => {
  try {
    const body = {chatId, count};

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/waInstance${id}/getChatHistory/${token}`,
      body
    );

    return response.data.filter((message) => message.textMessage && message.textMessage !== '').reverse();

  } catch (error) {
    console.error("Ошибка получения истории чата:", error);
    return []; // В случае ошибки возвращаем пустой массив
  }
};

export const sendMessage = async (id, token, chatId, message) => {

  try {

    console.log(chatId)

    const body = {
      "chatId": chatId.includes('@c.us') ? chatId : `${chatId}@c.us`, // ID чата
      "message": message, // Сообщение
    };

    return await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/waInstance${id}/sendMessage/${token}`, body)
  } catch (error) {
    console.error('Ошибка отправки сообщения', error);
  }

}

// Функция для получения уведомления
export const receiveNotification = async (id, token) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/waInstance${id}/receiveNotification/${token}`);

    return response.data;

  } catch (error) {
    console.error("Ошибка при получении уведомлений:", error);
  }
};

// Функция для удаления уведомления
export const deleteNotification = async (id, token, receiptId) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/waInstance${id}/deleteNotification/${token}/${receiptId}`);
  } catch (error) {
    console.error("Ошибка при удалении уведомления:", error);
  }
};

