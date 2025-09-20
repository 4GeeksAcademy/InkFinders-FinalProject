// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = ({ user }) => {
  if (!user) return <p>No hay usuario cargado</p>;

  return (
    <div className="UserProfile-container">
      <div className="main-content">
        <div className="profile-section">
          <div className="profile-card">
            <div className="profile-info">
              <div className="avatar-container">
                <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80" />
              </div>
              <div className="profile-details">
                <h2>Perfil Usuario</h2>
                <p className="profile-item">Nick: {book.user_name}</p>
                <p className="profile-item">Email: {user.email}</p>
                <p className="profile-item">Descripcion: {user.description}</p>
                <div className="rating">
                  <span className="score">97</span>
                  <span className="star">💎</span>
                  <span className="reviews">33</span>
                </div>
              </div>
            </div>
            <div className="profile-actions">
              <button className="action-btn"></button>
              <button className="action-btn"></button>
              <button className="action-btn"></button>
            </div>
          </div>

          <div className="collections-section">
            <h3>Mis colecciones</h3>
            <div className="collection-buttons">
              <Link to="/favoritos">
                <button className="collection-btn">Favoritos</button>
              </Link>

              <Link to="/leidos">
                <button className="collection-btn">Leidos</button>
              </Link>

              <Link to="/por-leer">
                <button className="collection-btn">Por leer</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="sidebar">
          <div className="search-section">
            <h3>Encuentra tu propias lecturas</h3>
            <div className="search container">
              <input
                type="text"
                placeholder="Que aventura quieres vivir hoy"
                className="search-input"
              />
              <button className="search-btn"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
