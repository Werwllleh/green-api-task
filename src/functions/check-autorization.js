'use client'
import {getUserInfo} from "@/api/green-api";
import {useUserStore} from "@/stores/user-store";
import {getCookie} from "@/functions/get-cookie";
import {useRouter} from "next/router";


export const checkUser = async () => {

  const cookie = getCookie();
  const router = useRouter()

  const id =  cookie.id;
  const token = cookie.token;

  let userInfo = null;

  if (id && token) {
    try {
      const res = await getUserInfo(id, token);
      userInfo = res.data; // Предполагаем, что getUserInfo возвращает fetch-объект

      // Обновляем состояние стора
      useUserStore.setState({ data: userInfo });
      console.log(useUserStore.getState().data);

      return router.push('/');
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  }

  if (!userInfo) {
    return router.push('/sign-in');
  }
}
