import { Form, Modal, Input, InputNumber, Button, Select } from "antd";
import React, { useState, useEffect } from "react";
import { addCorte } from "@AP/Corte";
import { getProductoByLote } from "@AA/Producto";
import { getTrabajadores } from "@AA/Usuario";
import { useParams } from "react-router-dom";

const AddCorteModal = ({ openModal, closeModal, reload }) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [productos, setProductos] = useState([]);
  const [talleres, setTalleres] = useState([]);
  useEffect(() => {
    getProductoByLote(id, setProductos)
    getTrabajadores("talleres", setTalleres);
  }, []);

  return (
    <Modal
      getContainer={false}
      title="NUEVOS CORTES"
      styles={{header:{textAlign:"center"}}}
      open={openModal}
      onCancel={() => closeModal(false)}

      okText="Añadir"
      onOk={form.submit}
      centered
      width={600}
    >
      <Form
        style={{ margin: "0 auto" }}
        size="large"
        form={form}
        labelAlign="center"
        layout="vertical"
        onFinish={async (values) => {
          await addCorte(id, values);
          form.resetFields();
          reload();
          closeModal(false);
        }}
        initialValues={{
          detalles: [{ cantidad_enviada: null, talla: null, taller_id: null }],
        }}
      >
        <Form.Item
          name="producto_id"
          label="Producto"
          rules={[
            {
              required: true,
              message: "Producto es requerido",
            },
          ]}
        >
          <Select placeholder="Seleccione productos">
            {productos?.map((producto) => (
              <Select.Option key={`producto_${producto.producto_id}`} value={producto.producto_id}>
                {producto.nombre}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.List name="detalles">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <div key={field.key} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <Form.Item
                    name={[field.name, "cantidad_enviada"]}
                    label="Cantidad Enviada"
                    rules={[{ required: true, message: "Cantidad enviada es requerida" }]}
                  >
                    <InputNumber  style={{width:"100%"}} min={1} />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "talla"]}
                    label="Talla"
                    rules={[{ required: true, message: "Talla es requerida" }]}
                  >
                    <InputNumber  style={{width:"100%"}}/>
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "taller_id"]}
                    label="Taller"
                  >
                    <Select placeholder="Seleccione el taller">
                      {talleres.map((taller) => (
                        <Select.Option key={`taller_${taller.trabajador_id}`} value={taller.trabajador_id}>
                          {`${taller.nombre} ${taller.ap_paterno} ${taller.ap_materno}`}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Button type="danger" onClick={() => remove(field.name)}>
                    Eliminar
                  </Button>
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Agregar Detalle
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default AddCorteModal;
