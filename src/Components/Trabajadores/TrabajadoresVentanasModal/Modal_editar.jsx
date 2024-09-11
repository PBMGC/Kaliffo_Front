import React, { useEffect, useState } from "react";
import { Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import { CargarEditar, manejonumeros, fetchTiendas,manejotexto, editar } from "../../../Shared/Funciones/Funciones_Fetch";

const Modal_editar = ({
  ModalEditarAbierto,
  closeModalEditar,
  tipo_trabajador,
  id,
  EdicionExitosa
}) => {

  const [form] = Form.useForm();
  const[tiendas,setTiendas]=useState([])
  
  useEffect(() => {
    if(id){
      CargarEditar(id,form)
      form.setFieldsValue({usuario_id:id})
      if(tipo_trabajador==="ventas"){
        fetchTiendas(setTiendas)
    }
    }
  }, [tipo_trabajador,id]);

  return (
    <Modal
      getContainer={false}
      title={`Editar Trabajador de ${tipo_trabajador}`}
      open={ModalEditarAbierto}
      onCancel={closeModalEditar}
      okText="Guardar"
      onOk={form.submit}
      centered={true}
      width={700}
    >
      <Form
        style={{ maxWidth: 600, margin: "0 auto" }}
        size="large"
        form={form}
        labelAlign="center"
        id="formularioeditar"
        onFinish={async (values) => {
          await editar(values)
          EdicionExitosa()
        }}
      >
        <Form.Item
          style={{ marginTop: 20 }}
          name="nombreE"
          label="Nombres"
          rules={[
            {
              required: true,
              message: "Nombres requeridos",
            },
          ]}
        >
          <Input onChange={manejotexto(form, "nombreE")} />
        </Form.Item>

        <Row
          justify="space-around"
          align="middle"
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col span={12} className="gutter-row">
            <Form.Item
              name="ap_paternoE"
              label="Apellido Paterno"
              rules={[
                {
                  required: true,
                  message: "Apellido Paterno Requerido",
                },
              ]}
            >
              <Input onChange={manejotexto(form, "ap_paternoE")} />
            </Form.Item>
          </Col>

          <Col span={12} className="gutter-row">
            <Form.Item
              name="ap_maternoE"
              label="Apellido Materno"
              rules={[
                {
                  required: true,
                  message: "Apellido Materno Requerido",
                },
              ]}
            >
              <Input onChange={manejotexto(form, "ap_maternoE")} />
            </Form.Item>
          </Col>
        </Row>

        <Row
          justify="space-around"
          align="middle"
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col span={12} className="gutter-row">
            <Form.Item
              label="Fecha Nacimiento"
              name="fecha_nacimientoE"
              rules={[
                {
                  required: true,
                  message: "Fecha Nacimiento requerido",
                },
              ]}
            >
              <DatePicker format={"YYYY-MM-DD"} placeholder="YYYY-MM-DD" />
            </Form.Item>
          </Col>

          <Col span={12} className="gutter-row">
            <Form.Item
              name="telefonoE"
              label="Telefono"
              rules={[
                {
                  required: true,
                  message: "Telefono Requerido",
                },
              ]}
            >
              <Input
                maxLength={9}
                showCount
                onChange={manejonumeros(form, "telefonoE")}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row
          justify="space-around"
          align="middle"
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col span={10} className="gutter-row">
            <Form.Item
              name="dniE"
              label="DNI"
              rules={[
                {
                  required: true,
                  message: "DNI requerido",
                },
              ]}
            >
              <Input
                maxLength={8}
                showCount
                onChange={manejonumeros(form, "dniE")}
              />
            </Form.Item>
          </Col>

          <Col span={14} className="gutter-row">
            {tipo_trabajador === "ventas" ? (
              <Form.Item
                name="tienda_id"
                label="Tienda Asignada"
                rules={[
                  {
                    required: true,
                    message: "Tienda Asignada",
                  },
                ]}
              >
                <Select
                  options={tiendas.map((tienda) => ({
                    value: tienda.tienda_id,
                    label: tienda.tienda,
                    key: tienda.tienda_id,
                  }))}
                />
              </Form.Item>
            ) : null}
          </Col>
        </Row>

        <Form.Item name="usuario_id" noStyle>
          <Input type="hidden" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Modal_editar;