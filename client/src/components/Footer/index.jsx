import React from 'react';

const Footer = () => {
  const github = 'https://github.com/IsabelGomez87';
  return (
    <nav className="aboutMe">
      <a className="aboutMe__link" target="_blank" href={github} rel="noreferrer">
        <i className="fab fa-github" />
        Github
      </a>
    </nav>
  );
};

export default (Footer);
