import React, { useEffect, useState } from "react";
import { Button, Input, Row, Col, Layout, Typography } from "antd";
import { signIn } from "../config/authCalls"; // Importa la función signIn
import { useAuth } from "../host/useAuth"; // Importa el hook useAuth
import { useNavigate } from "react-router-dom"; // Importa Navigate

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Login() {
  const { user } = useAuth(); // Usa el hook useAuth
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Usa Navigate

  useEffect(() => {
    if (user) navigate('/navbar'); // Redirige a /navbar si el usuario está autenticado
  }, [user, navigate]);

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  const login = async () => {
    const result = await signIn(username, password); // Usa la función de inicio de sesión
    if (result) {
      navigate('/navbar'); // Redirige a /navbar después de un inicio de sesión exitoso
    }
  };

  return (
    <Layout style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
      <Header style={{ backgroundColor: '#001529', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={3} style={{ color: '#fff', margin: 0 }}>Iniciar Sesión</Title>
      </Header>
      <Content style={{ flex: 1, padding: '20px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Title level={2}>Login</Title>
        <div style={{ width: '300px' }}>
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