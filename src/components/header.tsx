import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { useAuthStore } from "../context/useAuthStore";

interface HeaderProps {
  text?: string;
}

const Header = (props: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  console.log(props, "futuras", props.text);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Buscando:", searchQuery);
  };

    const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo-container">
          <Link to="/" className="logo">
            DISTRISHULK
          </Link>
        </div>

        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <div className="search-input-container">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Buscar"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
              />
            </div>
          </form>
        </div>

        <div className="user-actions">
          <Link to="/mi-cuenta" className="user-btn">
            <i className="fas fa-user"></i>
            <span>Mi Cuenta</span>
          </Link>
          <Link to="/mis-pedidos" className="user-btn">
            <i className="fas fa-shopping-bag"></i>
            <span>Mis Pedidos</span>
          </Link>
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Salir</span>
          </button>
        </div>
      </div>
      <div className="main-nav-wapper">    
      <nav className="main-nav">
        <ul>
          <li>
            <Link to="/" className="nav-link active">
              INICIO
            </Link>
          </li>
          <li>
            <Link to="/productos" className="nav-link">
              PRODUCTOS
            </Link>
          </li>
          <li>
            <Link to="/pedidos" className="nav-link">
              PEDIDOS
            </Link>
          </li>
          <li>
            <Link to="/perfil" className="nav-link">
              PERFIL
            </Link>
          </li>
          <li>
            <Link to="/promociones" className="nav-link">
              PROMOCIONES
            </Link>
          </li>
          <li>
            <Link to="/contacto" className="nav-link">
              CONTACTO
            </Link>
          </li>
        </ul>
      </nav>
      </div>        
    </header>
  );
};

export default Header;
