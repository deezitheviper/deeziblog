import React from 'react';
import logo from "../assets/img/deezi.png"
const Footer = () => {
    return (
        <div className='footer'>
        <img className='logo' src={logo} alt="" />
        <span>Deeziblog</span>            
        </div>
    );
};

export default Footer;