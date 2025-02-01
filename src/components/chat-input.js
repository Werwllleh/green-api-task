import React, {useEffect, useState} from 'react';
import {Button, Form, Input} from "antd";
import {SendOutlined} from "@ant-design/icons";
import {useMessagesStore} from "@/stores/messages-store";
import {getCookie} from "@/functions/get-cookie";
import {sendMessage} from "@/api/green-api";
const {TextArea} = Input;

const ChatInput = () => {

  const [form] = Form.useForm();

  const dialogId = useMessagesStore((state) => state.currentDialogId);

  const sendFunc = async (values) => {

    const id = getCookie()?.id;
    const token = getCookie()?.token;

    if (id && dialogId && token && values.messageText?.trim() !== '') {
      try {
        const response = await sendMessage(id, token, dialogId, values.messageText.trim());

        if (response.status === 200) {
          form.resetFields(); // Очищаем поле ввода
        }
      } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
      }
    }
  }

  return (
    <div className="chat-messages__textarea">
      <div className="chat-messages__textarea-body">
        <Form form={form} onFinish={sendFunc}>
          <Form.Item name="messageText">
            <TextArea placeholder="Введите сообщение..." />
          </Form.Item>
          <Button htmlType="submit" className="chat-messages__textarea-send"><SendOutlined /></Button>
        </Form>
      </div>
    </div>
  );
};

export default ChatInput;
