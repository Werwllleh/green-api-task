'use client';
import React from 'react';
import { Button, Form, Input } from 'antd';
import {getUserInfo} from '../../api/green-api';

export default function Page() {

  const onFinish = async (values) => {
    await getUserInfo(values.id, values.token).then((res) => {
      console.log(res)
    })
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="page sign-in-page">
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="sign-in-page__form"
      >
        <div className="sign-in-page__form-body">
          <div className="sign-in-page__form-fields">
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
          <div className="sign-in-page__form-footer">
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Войти
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
}
