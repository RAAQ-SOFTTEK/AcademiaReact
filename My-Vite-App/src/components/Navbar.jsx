import React, { useEffect, useState } from 'react';
import { useAuth } from '../host/useAuth';
import { LogoutOutlined } from '@ant-design/icons';
import { readDataFirestore } from '../config/firestoreCalls';
import { useNavigate } from 'react-router-dom';
import { Input, Button, List, Card, Layout, Typography } from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Navbar() {
  const { logout, user } = useAuth();
  const [localUser, setLocalUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    readUser();
  }, [user]);

  const readUser = async () => {
    const luser2 = await readDataFirestore('users', 'email', user.email);
    if (!luser2.empty) {
      setLocalUser(luser2.docs[0].data());
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const hasAddPermission = (user) => {
    return user.permission?.includes('add') || user['permissionadd']?.includes('add');
  };

  const addTask = () => {
    if (localUser && hasAddPermission(localUser)) {
      if (newTask.trim()) {
        setTasks([...tasks, newTask]);
        setNewTask('');
      }
    } else {
      alert('No tienes permiso para agregar tareas.');
    }
  };

  const hasDeletePermission = (user) => {
    return user.permission?.includes('delete') || user['permissiondelete']?.includes('delete');
  };

  const removeTask = (index) => {
    if (localUser && hasDeletePermission(localUser)) {
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
    } else {
      alert('No tienes permiso para eliminar tareas.');
    }
  };

  return (
    <Layout style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
      <Header style={{ backgroundColor: '#001529', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={3} style={{ color: '#fff', margin: 0 }}>
          {localUser ? localUser.name : 'Usuario'}
        </Title>
        <LogoutOutlined onClick={handleLogout} style={{ cursor: 'pointer', fontSize: '24px', marginRight: '20px' }} />
      </Header>
      <Content style={{ flex: 1, padding: '20px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
        <Title level={2}>To-Do List</Title>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <Input
            placeholder="Nueva tarea"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            style={{ width: '400px', marginRight: '10px' }}
          />
          <Button type="primary" onClick={addTask}>Añadir</Button>
        </div>
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={tasks}
          renderItem={(item, index) => (
            <List.Item style={{ display: 'flex', alignItems: 'center' }}>
              <Card style={{ flex: 1 }}>
                {item}
              </Card>
              <Button 
                type="link" 
                onClick={() => removeTask(index)} 
                style={{ 
                  marginLeft: '10px', 
                  border: '1px solid red', 
                  padding: '8px 16px', 
                  lineHeight: '1.5' 
                }}
              >
                Eliminar
              </Button>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
}
