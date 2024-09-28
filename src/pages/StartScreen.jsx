// src/pages/StartScreen.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/Background';
import Logo from '../components/Logo';

const StartScreen = () => {
  const navigate = useNavigate();

  return (
    <Background className="flex flex-col items-center justify-center min-h-screen p-4">
      <Logo />
      <h1 className="text-4xl font-bold mb-4">Bienvenido</h1>
      
      <p className="text-lg mb-4">
        ¡Hola! Cordial saludo a todos los auxiliares. Lamentamos informarles que la 
        aplicación se encuentra fuera de servicio hasta nuevo aviso.
      </p>

      <p className="text-lg mb-4">
        Pedimos por favor realizar su reporte interno por medio del grupo de WhatsApp.
      </p>

      <p className="text-lg mb-8">
        Lo sentimos mucho por las molestias y agradecemos su comprensión.
      </p>
    </Background>
  );
};

export default StartScreen;
