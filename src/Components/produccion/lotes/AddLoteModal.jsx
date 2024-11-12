import { Form, Modal, Input } from "antd";
import React from "react";
import { addLote } from "@AP/Lote";

const AddLoteModal = ({ openModal, closeModal, reload }) => {
  const [form] = Form.useForm();
  
  return (
    <Modal
      getContainer={false}
      title={"Nuevo Lote"}
      open={openModal}
      onCancel={()=>closeModal(false)}
      okText="Añadir"
      onOk={form.submit}
      centered={true}
      width={400}
    >
      <Form
        style={{ margin: "0 auto" }}
        size="large"
        form={form}
        labelAlign="center"
        id="formulariocrear" 
        layout="vertical"
        onFinish={async (values) =>{
            await addLote(values)
            form.resetFields()
            reload()
            closeModal(false)
        }}
      >
        <Form.Item
          style={{ marginTop: 20 }}
          name="password"
          label="Contraseña"
          rules={[
            {
              required: true,
              message: "Contraseña requerido",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddLoteModal;