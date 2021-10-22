import React from 'react';


const Footer = () => {

    const URL = "https://www.sofka.com.co/es/sofka-university/";

    return (
        <div className="footer-content">
            <div>
                <h2>
                    Questions & Answers
                </h2>
                <ul>
                    <li>
                        Permite a registrar preguntas de cualquier tipo y categoría
                    </li>
                    <li>
                        Publicadar preguntas por un usuario registrado al sistema
                    </li>
                    <li>
                        Cualquier persona puede ver las preguntas y respuestas
                    </li>
                </ul>
            </div>
                
            <code>
                <a target="_blank" rel="noopener noreferrer" href={URL}>
                    &copy; Copyright {new Date().getFullYear()} Sofka University
                </a>
            </code>
        </div>
    )
}

export default Footer