import React from "react";
import { Form, Modal, Input, InputNumber, Row } from "antd";

import { addProducto } from "@AA/Producto";

const AddProductoModal = ({ openModal, closeModal, reload }) => {
  const [form] = Form.useForm();
  
  return (
    <Modal
      getContainer={false}
      title={"Nuevo Producto"}
      open={openModal}
      onCancel={closeModal}
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
            await addProducto(values)
            form.resetFields()
            reload()
            closeModal()
        }}
      >
        <Form.Item
          style={{ marginTop: 20 }}
          name="nombre"
          label="Nombre del Producto"
          rules={[
            {
              required: true,
              message: "Nombre requerido",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Row gutter={16} style={{gap : "20px"}}>
          <Form.Item
            style={{ marginLeft: 10 }}
            name="precioBase"
            label="Precio Base"
            rules={[
              {
                type:"number",
                required: true,
                message: "Precio requerido",
              },
            ]}
          >
            <InputNumber min={1} placeholder="S/"/>
          </Form.Item>
          <Form.Item
            name="descuento"
            label="Descuento"
            rules={[
              {
                type:"number",
                required: true,
                message: "Descuento requerido",
              },
            ]}
          >
            <InputNumber min={1}  placeholder="%" />
          </Form.Item>
  
        </Row>
      </Form>
    </Modal>
  );
};

export default AddProductoModal;
