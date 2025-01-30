'use client'
import React from 'react';
import {Button, Form, Input} from "antd";
import {getUserInfo} from "@/api/green-api";
import {useUserStore} from "@/stores/user-store";
import {redirect} from "next/navigation";

const FormAuthentication = () => {

  const onFinish = async (values) => {
    await getUserInfo(values.id, values.token).then((res) => {
      console.log(res)
      if (res.status === 200) {
        document.cookie = `id = ${values.id}`;
        document.cookie = `token = ${values.token}`;
        useUserStore.setState({ data: res.data });
        redirect('/');
      }
    })
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{
        id: process.env.NEXT_PUBLIC_API_ID || '',
        token: process.env.NEXT_PUBLIC_API_TOKEN || '',
      }}
      className="form-authentication"
    >
      <div className="form-authentication__body">
        <div className="form-authentication__fields">
          <Form.Item
            label="ID"
            name="id"
            rules={[
              {
                required: true,
                message: 'Введите Ваш ID!',
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Token"
            name="token"
            rules={[
              {
                required: true,
                message: 'Введите Ваш token!',
              },
            ]}
          >
            <Input.Password/>
          </Form.Item>
        </div>
        <div className="form-authentication__footer">
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default FormAuthentication;
