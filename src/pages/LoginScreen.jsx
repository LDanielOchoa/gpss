// src/pages/LoginScreen.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import axios from 'axios';

const API_URL = 'https://gpss.onrender.com/verificar-cedula'; // La URL de tu backend en Render

const LoginScreen = () => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const navigate = useNavigate();

  const onLoginPressed = async () => {
    if (isNaN(email.value)) {
      setEmail({ ...email, error: 'La cédula debe ser un número válido' });
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        cedula: email.value,
      });

      const { success, message } = response.data;

      if (success) {
        // Almacena la cédula en localStorage
        localStorage.setItem('userName', email.value);

        navigate('/dashboard');
      } else {
        alert(message);
      }
    } catch (error) {
      alert('No se pudo conectar con el servidor.');
    }
  };

  return (
    <Background className="flex flex-col items-center justify-center min-h-screen p-4">
  <Logo className="logoo" />
  <Header>Bienvenido de vuelta</Header>
  
  <TextInput
    placeholder="Ingresa tu cédula"  
    value={email.value}
    onChange={(e) => setEmail({ value: e.target.value, error: '' })}
    error={!!email.error}
    errorText={email.error}
  />
  
  <Button onClick={onLoginPressed}>
    Iniciar Sesión
  </Button>
</Background>

  );
};

export default LoginScreen;
