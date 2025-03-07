import React, { useEffect, useState } from 'react';
import { useAuth } from '../host/useAuth';
import { LogoutOutlined } from '@ant-design/icons';
import { readDataFirestore, readAllDataFirestore, writeDataFirestore, deleteDataFirestore } from '../config/firestoreCalls';
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
    if (user) {
      readUser();
      readTasks();
    }
  }, [user]);

  const readUser = async () => {
    const luser2 = await readDataFirestore('users', 'email', user.email);
    if (!luser2.empty) {
      setLocalUser(luser2.docs[0].data());
    } else {
      setLocalUser(null);
    }
  };

  const readTasks = async () => {
    const tasksData = await readAllDataFirestore('tasks');
    setTasks(tasksData.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const hasAddPermission = (user) => {
    return user.permission?.includes('add') || user['permissionadd']?.includes('add');
  };

  const addTask = async () => {
    if (localUser && hasAddPermission(localUser)) {
      if (newTask.trim()) {
        const newTaskData = { text: newTask, createdBy: user.email, createdAt: new Date().toLocaleString() };
        const docRef = await writeDataFirestore('tasks', newTaskData);
        setTasks([...tasks, { id: docRef.id, ...newTaskData }]);
        setNewTask('');
      }
    } else {
      alert('No tienes permiso para agregar tareas.');
    }
  };

  const hasDeletePermission = (user) => {
    return user.permission?.includes('delete') || user['permissiondelete']?.includes('delete');
  };

  const removeTask = async (taskId) => {
    if (localUser && hasDeletePermission(localUser)) {
      await deleteDataFirestore('tasks', taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } else {
      alert('No tienes permiso para eliminar tareas.');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', maxWidth: '100%', padding: '0 20px' }}>
      <Header style={{ backgroundColor: '#001529', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={3} style={{ color: '#fff', margin: 0 }}>
          {localUser ? localUser.name : 'Usuario'}
        </Title>
        <LogoutOutlined onClick={handleLogout} style={{ cursor: 'pointer', fontSize: '24px', marginRight: '20px' }} />
      </Header>
      <Content style={{ flex: 1, padding: '20px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
        <Title level={2}>To-Do List</Title>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <Input
            placeholder="Nueva tarea"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            style={{ flex: '1 1 300px', marginRight: '10px', marginBottom: '10px' }}
          />
          <Button type="primary" onClick={addTask} style={{ flex: '0 0 auto' }}>Añadir</Button>
        </div>
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={tasks}
          renderItem={(item) => (
            <List.Item style={{ display: 'flex', alignItems: 'center', margin: '0' }}>
              <Card style={{ flex: 1, margin: '0' }}>
                <div className="ant-card-body" style={{ padding: '5px' }}>
                  <p>{item.text}</p>
                  <p style={{ fontSize: '12px', color: 'gray' }}>Creado por: {item.createdBy}</p>
                  <p style={{ fontSize: '12px', color: 'gray' }}>Fecha y hora: {item.createdAt}</p>
                </div>
              </Card>
              <Button 
                type="link" 
                onClick={() => removeTask(item.id)} 
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