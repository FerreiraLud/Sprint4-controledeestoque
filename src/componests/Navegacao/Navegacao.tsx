import { type JSX } from 'react';
import './Navegacao.css'; // Importando CSS para estilos

function Navegacao(): JSX.Element {
  return (
    <nav className="navegacao">
      <div className="nav-container">
        <h1 className="nav-logo">Meu Site</h1>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="/endereco" className="nav-link">Endereco</a>
          </li>
          <li className="nav-item">
            <a href="#servicos" className="nav-link">Serviços</a>
          </li>
          <li className="nav-item">
            <a href="#contato" className="nav-link">Contato</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navegacao;