import React from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api';

export default function App() {
  const [input, setInput] = React.useState('');
  const [cep, setCep] = React.useState({});

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  async function handleSearch() {
    if (!input) {
      alert('Preencha algum cep');
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    } catch {
      alert('Digite um cep válido');
      setInput('');
    }
  }
  return (
    <>
      <div className="container">
        <h1 className="title">Buscar Cep</h1>
        <div className="container-input">
          <input
            type="text"
            placeholder="Buscar CEP"
            value={input}
            onChange={handleChange}
          ></input>
          <button className="button-search" onClick={handleSearch}>
            <FiSearch size={25} color={'#fff'}></FiSearch>
          </button>
        </div>

        {Object.keys(cep).length > 1 && (
          <main className="main">
            <h2> {cep.cep}</h2>
            <span> {cep.logradouro}</span>
            <span>{cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span>
              {cep.localidade} - {cep.uf}
            </span>
          </main>
        )}
      </div>
    </>
  );
}
