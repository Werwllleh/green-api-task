"use client";
import React, {useEffect, useState} from 'react';
import Sidebar from "@/components/sidebar";
import {useUserStore} from "@/stores/user-store";
import ChatList from "@/components/chat-list";
import {useMessagesStore} from "@/stores/messages-store";
import {Button, Empty, Modal} from "antd";
import NewChat from "@/components/modals/new-chat";
import ChatMessages from "@/components/chat-messages";
import ChatInput from "@/components/chat-input";


const Content = ({serverData, chatList}) => {

  useEffect(() => {
    if (serverData) {
      useUserStore.setState({data: serverData})
    }
    if (chatList) {
      // console.log(chatList);
      useMessagesStore.setState({dialogs: chatList})
    }
  }, [serverData, chatList]);

  const [activeTab, setActiveTab] = useState("chats");

  /*useEffect(() => {
    console.log(activeTab)
  }, [activeTab]);*/

  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <>
      <div className="content">
        <div className="content__body">
          <div className="content__sidebar">
            <Sidebar setActiveTab={setActiveTab}/>
          </div>
          <div className="content__preview">
            <div className="content__preview-actions">
              <Button onClick={() => setIsModalOpen(true)}>Создать чат</Button>
            </div>
            {activeTab === "chats" && <ChatList/>}
            {activeTab === "profile" && ''}
          </div>
          <div className="content__chats">
            {!useMessagesStore().currentDialogId && (
              <div className="content__chats-empty">
                <Empty description={'Выберите диалог'} />
              </div>
            )}
            {useMessagesStore().currentDialogId && (
              <div className="content__chats-messages">
                <ChatMessages />
                <ChatInput />
              </div>
            )}
          </div>
        </div>
      </div>
      <NewChat active={isModalOpen} setActive={setIsModalOpen} />

    </>
  );
};

export default Content;
