import React, { useEffect, useState } from "react";
import { Button, Input, Row, Col, Layout, Typography } from "antd";
import { signIn } from "../config/authCalls";
import { useAuth } from "../host/useAuth";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Login() {
  const { user } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/navbar');
  }, [user, navigate]);

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  const login = async () => {
    const result = await signIn(username, password);
    if (result) {
      navigate('/navbar');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', maxWidth: '100%', padding: '0 20px' }}>
      <Header style={{ backgroundColor: '#E4594C', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', width: '100%' }}>
        <Title level={3} style={{ color: '#fff', margin: 0 }}>Iniciar Sesión</Title>
      </Header>
      <Content style={{ flex: 1, backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', width: '100%' }}>
        <Title level={2}>Login</Title>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <Row style={{ marginBottom: '10px' }}>
            <Col span={24}>
              <Input
                size='large'
                placeholder='Correo de usuario'
                value={username}
                onChange={changeUsername}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: '20px' }}>
            <Col span={24}>
              <Input.Password
                size="large"
                placeholder="Contraseña"
                value={password}
                onChange={changePassword}
              />
            </Col>
          </Row>
          <Button type="primary" onClick={login} style={{ width: '100%' }}>Login</Button>
        </div>
      </Content>
    </Layout>
  );
}
