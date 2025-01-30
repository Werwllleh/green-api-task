import React from 'react';
import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import FormAuthentication from "@/components/form-authentication";


export default async function Page() {

  const nextCookies = await cookies();
  const id = nextCookies.get('id')?.value;
  const token = nextCookies.get('token')?.value;

  if (id && token) {
    redirect('/')
  }


  return (
    <div className="page sign-in-page">
      <div className="sign-in-page__form">
        <FormAuthentication />
      </div>
    </div>
  );
}
