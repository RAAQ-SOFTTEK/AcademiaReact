import React, { useEffect, useState } from "react";
import { Button, Input, Row, Col } from "antd";
import { signIn } from "../config/authCalls"; // Importa la función signIn
import { useAuth } from "../host/useAuth"; // Importa el hook useAuth
import { useNavigate } from "react-router-dom"; // Importa Navigate

export default function Login() {

    const { user } = useAuth(); // Usa el hook useAuth
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Usa Navigate

    useEffect(() => {
        if(user) console.log('/navbar')
    }
    , [user]);

    const changePassword = (e) => {
        setPassword(e.target.value);
    };

    const changeUsername = (e) => {
        setUsername(e.target.value);
    };

    const login = () => {
        signIn(username, password); // Usa la función de inicio de sesión
    };

    return (
        <div>
            {JSON.stringify(user)}
            <Row>
                <Col xs={24} sm={24} md={12} lg={12}> 
                    <Input
                        size='small'
                        placeholder='correo de usuario'
                        value={username}
                        onChange={changeUsername}
                    />
                </Col>
            </Row>
            <Row>
                <Input.Password 
                    size="small" 
                    placeholder="contraseña" 
                    value={password}
                    onChange={changePassword}
                />
            </Row>
            <Button onClick={login}>Login</Button> {/* Corrige la propiedad onClick */}
        </div>
    );
}