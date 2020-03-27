import React, {useState} from 'react';
import {FiLogIn} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';


export default function Logon(){

    const[id, setId] = useState('');
    const history = useHistory();

    async function handleLogon(e){
        e.preventDefault();

        try {
            const response = await api.post('sessions', {id});
            console.log(response.data.name);
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            
            history.push('/profile'); //Envia para rota Raiz
        } catch (error) {
            alert('Falha no Login, tente novamente');
        }
        
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the hero"/>

                <form onSubmit={handleLogon}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={ e=> setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho Cdastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    )
}
