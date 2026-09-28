import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/loginPage.css';

const RegisterPage = () => {
    const [nombre, setNombre] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5100/usuarios/register', {
            nombre,
            email,
            password,
        });
            alert('Usuario registrado correctamente');
            console.log(res.data);

            navigate('/login');
            } catch (error: any) {
                alert('Error añ registra usuario');
                console.error(error.res?.data || error.message);
            }
     }; 

    const handleVolver = () => {
    navigate('/'); // redirige al HomePage
  };

    return (
        <div>
            
            <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
              <h1>Registrate</h1>
                <div>
                    <label htmlFor="">Nombre</label>
                    <input type="text" 
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)} required
                    />
                </div>
                <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-registerSubmit">Registrarse</button>
            </form>

             {/* Botón para volver */}
      <button onClick={handleVolver} className="btn-register">
        Volver
      </button>
        </div>
        </div>
    );
}

export default RegisterPage;