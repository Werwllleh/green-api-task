'use client'

import {useMessagesStore} from "@/stores/messages-store";

const ChatList = () => {


  const dialogs = useMessagesStore((state) => state.dialogs);

  return (
    <ul className="chat-list">
      {dialogs.length > 0 && dialogs.map((dialog) => {

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
