import React from 'react';
import { FaGithub } from 'react-icons/fa'

const GithubLink = () => {
    return (
        <div className="github" title="Ir al repositorio"> <a
            href="https://github.com/IrisMazzuca/pokedex">
            <FaGithub /></a>
        </div>
    );
}

export default GithubLink;