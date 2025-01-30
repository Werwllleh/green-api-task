"use client";
import Avatar from "@/components/avatar";
import {MessageOutlined} from "@ant-design/icons";

const Sidebar = ({setActiveTab}) => {


  return (
    <div className="sidebar">
      <div className="sidebar__body">
        <div className="sidebar__top">
          <button
            onClick={() => setActiveTab("chats")}
            data-type={'chats'}
            className="sidebar__button"
          >
            <MessageOutlined />
          </button>
        </div>
        <div className="sidebar__bottom">
          <button
            onClick={() => setActiveTab("profile")}
            data-type={'profile'}
            className="sidebar__button"
          >
            <Avatar />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
