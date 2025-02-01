import {useEffect, useState} from "react";
import {useMessagesStore} from "@/stores/messages-store";
import {getCookie} from "@/functions/get-cookie";
import {deleteNotification, getChatHistory, receiveNotification} from "@/api/green-api";
import {Empty} from "antd";


const ChatMessages = () => {
  const dialogId = useMessagesStore((state) => state.currentDialogId);
  const [messageHistory, setMessageHistory] = useState([]);


  // Загружаем историю сообщений при выборе чата
  useEffect(() => {
    let timeoutId; // Идентификатор таймера для очистки

    const fetchMessages = async () => {
      if (!dialogId) return;

      const id = getCookie()?.id;
      const token = getCookie()?.token;

      if (id && token) {
        try {
          // Используем setTimeout для задержки
          timeoutId = setTimeout(async () => {
            const messages = await getChatHistory(id, token, dialogId, 100);
            if (Array.isArray(messages)) {
              setMessageHistory(messages);
            }
          }, 1500);
        } catch (error) {
          console.error("Ошибка загрузки сообщений:", error);
        }
      }
    };

    fetchMessages();

    // Очистка таймера при размонтировании компонента
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [dialogId]);

  // Функция для получения новых уведомлений
  const fetchNotifications = async () => {
    const id = getCookie()?.id;
    const token = getCookie()?.token;

    if (!id || !token) return;

    try {
      const response = await receiveNotification(id, token);

      if (!response?.body) return;

      const {receiptId, body} = response;

      const isIncomingMessage = body.typeWebhook === "incomingMessageReceived";
      const isOutgoingMessage = body.typeWebhook === "outgoingMessageReceived" || body.typeWebhook === "outgoingAPIMessageReceived";

      if (isIncomingMessage || isOutgoingMessage) {
        const chatId = body.senderData.chatId;
        const messageId = body.idMessage;
        const messageType = isIncomingMessage ? 'incoming' : 'outgoing';

        if (chatId === dialogId) {
          const messageData = body.messageData;

          if (messageData?.typeMessage === "textMessage" && messageData?.textMessageData?.textMessage) {
            const newMessage = {
              type: messageType,
              idMessage: messageId,
              textMessage: messageData.textMessageData.textMessage,
            };
            setMessageHistory((prevMessages) => [...prevMessages, newMessage]);
          }

          // Обрабатываем расширенные текстовые сообщения
          if (messageData?.typeMessage === "extendedTextMessage" && messageData?.extendedTextMessageData?.text) {
            const newMessage = {
              type: messageType,
              idMessage: messageId,
              textMessage: messageData.extendedTextMessageData.text,
            };
            setMessageHistory((prevMessages) => [...prevMessages, newMessage]);
          }
        }
      }

      await deleteNotification(id, token, receiptId);
    } catch (error) {
      console.error("Ошибка при получении уведомлений:", error);
    }
  };

  // Периодически опрашиваем сервер на наличие новых уведомлений
  useEffect(() => {
    const interval = setInterval(fetchNotifications, 5000); // Опрашиваем каждые 5 секунд

    return () => clearInterval(interval); // Очищаем интервал при размонтировании компонента
  }, [dialogId]);


  return (
    <>
      {messageHistory.length > 0 && (
        <ul className="chat-messages">
          {messageHistory.map((message, index) => (
            <li key={message.id || index} className={`chat-messages__message ${message.type}`}>
              <p className="chat-messages__message-text">{message.textMessage}</p>
            </li>
          ))}
        </ul>
      )}
      {messageHistory.length === 0 && (
        <div className="chat-messages__empty">
          <Empty description={'Нет сообщений'}/>
        </div>
      )}
    </>
  );
};

export default ChatMessages;
