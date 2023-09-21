import { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

type HeaderProps = {
  title: string;
  showSearchIcon: boolean;
  showProfileIcon: boolean;
};

export default function Header({ title, showProfileIcon, showSearchIcon }: HeaderProps) {
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header>
      <h1 data-testid="page-title">{title}</h1>
      {showSearchIcon && (
        <div>
          <button onClick={ () => setShowSearchInput(!showSearchInput) }>
            <img src={ searchIcon } alt="Pesquisar" data-testid="search-top-btn" />
            {showSearchInput && (
              <input type="text" placeholder="Pesquisar" data-testid="search-input" />
            )}
          </button>
        </div>
      )}
      {showProfileIcon && (
        <Link to="/profile">
          <img src={ profileIcon } alt="Perfil" data-testid="profile-top-btn" />
        </Link>
      )}
    </header>
  );
}
