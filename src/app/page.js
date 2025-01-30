import {getUserDialogs, getUserInfo} from "@/api/green-api";
import {cookies} from "next/headers";
import Content from "@/components/content";
import {redirect} from "next/navigation";



export default async function Home() {

  const nextCookies = await cookies();
  const id = nextCookies.get('id')?.value;
  const token = nextCookies.get('token')?.value;

  let data = null;
  let chatList = [];

  if (id && token) {
    const response = await getUserInfo(id, token);
    data = response.data;

    const responseChats = await getUserDialogs(id, token);
    chatList = responseChats.data.filter((chat) => chat.archive !== true && chat.name)
  } else {
    redirect('/sign-in')
  }


  return (
    <Content serverData={data} chatList={chatList} />
  );
}
