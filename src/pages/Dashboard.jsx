import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Background from '../components/Background';
import Logo from '../components/Logo';
import TextInput from '../components/TextInput';

const API_URL = 'https://gpss.onrender.com/guardar-registro';

export default function Dashboard() {
  const [registro, setRegistro] = useState('');
  const [lugarIntegraciones, setLugarIntegraciones] = useState('');
  const [userName, setUserName] = useState('');
  const [mensajeEnviado, setMensajeEnviado] = useState(false);
  const [latitud, setLatitud] = useState(null);
  const [longitud, setLongitud] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getUserName = async () => {
      try {
        const cedula = localStorage.getItem('userName');
        if (cedula) {
          setUserName(cedula);
        }
      } catch (error) {
        console.error('Error al obtener la cédula del usuario:', error);
      }
    };

    getUserName();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitud(position.coords.latitude);
        setLongitud(position.coords.longitude);
      },
      (error) => {
        console.error('Error obteniendo la geolocalización:', error);
        setError('Error obteniendo la geolocalización');
      }
    );
  }, []);

  const handleEnviar = async (e) => {
    e.preventDefault(); // Prevenir la recarga de la página
    if (registro === '' || lugarIntegraciones === '') {
      alert('Debe seleccionar una opción para el registro y el lugar/integración');
      return;
    }

    if (!latitud || !longitud) {
      alert('No se pudo obtener la ubicación.');
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        cedula: userName,
        opcion: registro,
        lugar: lugarIntegraciones,
        latitud,
        longitud
      });

      if (response.data.success) {
        setMensajeEnviado(true);
        setTimeout(() => {
          setMensajeEnviado(false);
        }, 3000);
      } else {
        alert('Hubo un problema al enviar los datos');
      }
    } catch (error) {
      console.error('Error enviando los datos:', error);
      alert('Hubo un problema con el servidor');
    }
  };

  return (
    <Background className="min-h-screen flex items-center justify-center bg-black-100">
      <div className="bg-card w-full max-w-md p-8 rounded-lg text-center">
        <Logo className="mb-6 mx-auto" />

        <div className="bold mb-5 text-left">
          <label className="block text-sm font-medium text-black-100">Cédula:</label>
          <TextInput
            type="text"
            value={userName || 'Cédula no registrada'}
            readOnly
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <form className="mt-4" onSubmit={handleEnviar}>
          <div className="mb-4 text-left">
            <label htmlFor="tipo-registro" className="block text-sm font-medium text-black-100">Turno: </label>
            <select
              value={registro}
              onChange={(e) => setRegistro(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="entrada">Entrada</option>
              <option value="salida">Salida</option>
            </select>
          </div>

          <div className="mb-4 text-left">
            <label htmlFor="lugar-integracion" className="block text-sm font-medium text-primary">Lugar de Integración: </label>
            <select
              value={lugarIntegraciones}
              onChange={(e) => setLugarIntegraciones(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="praocc">PRAOCC</option>
              <option value="praori">PRAORI</option>
              <option value="ossur">HOSSUR</option>
              <option value="ace">ACE</option>
              <option value="lay">LAY</option>
              <option value="tri">TRI</option>
              <option value="hosnor">HOSNOR</option>
              <option value="exp">EXP</option>
              <option value="lauva">LAUVA</option>
              <option value="san">SAN</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition duration-300 w-full"
            disabled={!registro || !lugarIntegraciones} // Deshabilita el botón si no se han seleccionado opciones
          >
            Enviar
          </button>

          {mensajeEnviado && (
            <p className="text-green-500 text-center text-lg mt-4">
              ¡Datos enviados con éxito!
            </p>
          )}
        </form>
      </div>
    </Background>
  );
}
