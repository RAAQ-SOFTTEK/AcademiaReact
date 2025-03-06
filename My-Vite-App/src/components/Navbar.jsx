import React, { useEffect, useState } from 'react';
import { useAuth } from '../host/useAuth';
import { LogoutOutlined } from '@ant-design/icons';
import { readDataFirestore } from '../config/firestoreCalls';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { Input, Button, List } from 'antd'; // Importa componentes de Ant Design

export default function Navbar() {
  const { logout, user } = useAuth();
  const [localUser, setLocalUser] = useState(null);
  const [tasks, setTasks] = useState([]); // Estado para las tareas
  const [newTask, setNewTask] = useState(''); // Estado para la nueva tarea
  const navigate = useNavigate(); // Usa navigate

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
    await logout(); // Llama a la función de logout
    navigate('/login'); // Redirige a la página de login
  };

  const hasAddPermission = (user) => {
    return user.permission?.includes('add') || user['permissionadd']?.includes('add');
  };

  const addTask = () => {
    if (localUser && hasAddPermission(localUser)) { // Verifica si el usuario tiene el permiso de add
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
    if (localUser && hasDeletePermission(localUser)) { // Verifica si el usuario tiene el permiso de delete
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
    } else {
      alert('No tienes permiso para eliminar tareas.');
    }
  };

  return (
    <div style={{ textAlign: 'right' }}>
      {localUser && <>{localUser.name}</>} <LogoutOutlined onClick={handleLogout} /> {/* Usa handleLogout */}
      <div style={{ textAlign: 'left', marginTop: '20px' }}>
        <Input
          placeholder="Nueva tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ width: '200px', marginRight: '10px' }}
        />
        <Button onClick={addTask}>Añadir</Button>
        <List
          bordered
          dataSource={tasks}
          renderItem={(item, index) => (
            <List.Item
              actions={[<Button type="link" onClick={() => removeTask(index)}>Eliminar</Button>]}
            >
              {item}
            </List.Item>
          )}
          style={{ marginTop: '20px' }}
        />
      </div>
    </div>
  );
}