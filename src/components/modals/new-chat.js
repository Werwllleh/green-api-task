import {Button, Form, Input, Modal} from "antd";
import {sendMessage} from "@/api/green-api";
import {getCookie} from "@/functions/get-cookie";
import {useMessagesStore} from "@/stores/messages-store";

const {TextArea} = Input;


const NewChat = ({active, setActive}) => {

  const [form] = Form.useForm();

  const handleCancel = () => {
    setActive(false);
  };

  const handleSubmit = async (values) => {
    // console.log(values);

    const id = getCookie()?.id;
    const token = getCookie()?.token;

    if (id && token) {
      const sendMessageResponse = await sendMessage(id, token, values.phoneNumber, values.message);

      if (sendMessageResponse.status === 200) {
        useMessagesStore.setState({ currentDialogId: `${values.phoneNumber}@c.us` });
        handleCancel();
        form.resetFields();
      }
    }
  }


  return (
    <Modal className="modal-new-chat" title="Создать новый чат" okText={false} open={active} footer={null}
           onCancel={handleCancel}>
      <div className="modal-new-chat__body">
        <Form form={form} layout={'vertical'} onFinish={handleSubmit} className="modal-new-chat__form">
          <div className="modal-new-chat__form-fields">
            <Form.Item
              label="Номер телефона:"
              name="phoneNumber"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value || value.trim() === '') {
                      return Promise.reject(new Error('Введите номер телефона!'));
                    }
                    if (!/^\d+$/.test(value)) {
                      return Promise.reject(new Error('Допустимы только цифры!'));
                    }
                    if (!value.startsWith('7')) {
                      return Promise.reject(new Error('Номер должен начинаться с 7'));
                    }
                    if (value.length !== 11) {
                      return Promise.reject(new Error('Номер должен содержать 11 цифр!'));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input type="tel" maxLength={11}/>
            </Form.Item>
            <Form.Item
              label="Текст сообщения:"
              name="message"
              rules={[
                {
                  required: true,
                  message: 'Поле сообщения пустое!',
                },
              ]}
            >
              <TextArea/>
            </Form.Item>
          </div>
          <div className="modal-new-chat__form-footer">
            <Button type="primary" htmlType="submit">Отправить</Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default NewChat;
