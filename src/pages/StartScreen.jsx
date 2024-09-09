// src/pages/StartScreen.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Button from '../components/Button';

const StartScreen = () => {
  const navigate = useNavigate();

  return (
    <Background className="flex flex-col items-center justify-center min-h-screen p-4">
      <Logo />
      <h1 className="text-4xl font-bold mb-4">Bienvenido</h1>
      <p className="text-lg mb-8">Inicia sesión para continuar</p>
      <Button onClick={() => navigate('/login')}>Iniciar Sesión</Button>
    </Background>
  );
};

export default StartScreen;
