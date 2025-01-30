'use client'

import {getChatHistory} from "@/api/green-api";
import {useMessagesStore} from "@/stores/messages-store";
import {getCookie} from "@/functions/get-cookie";
import {useEffect} from "react";

const ChatList = () => {



  const dialogs = useMessagesStore((state) => state.dialogs);
  const currentDialogId = useMessagesStore((state) => state.currentDialogId);

  console.log(dialogs);

  useEffect(() => {
    console.log(currentDialogId)
  }, [currentDialogId]);


  return (
    <ul className="chat-list">
      {dialogs.length > 0 && dialogs.map((dialog) => {

        const id = getCookie()?.id;
        const token = getCookie()?.token;


        // const chatHistory = getChatHistory(id, token, dialog.id, 1);
        // console.log(chatHistory)


        return (
          <li
            key={dialog.id}
            className="chat-list__dialog chat-dialog"
            onClick={() => {useMessagesStore.setState({currentDialogId: dialog.id})}}
          >
            <div className="chat-dialog__body">
              <div className="chat-dialog__avatar"></div>
              <div className="chat-dialog__text">
                <h4 className="chat-dialog__name">{dialog.name}</h4>
                <p className="chat-dialog__message"></p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  );
};

export default ChatList;
