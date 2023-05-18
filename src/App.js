/* eslint-disable jsx-a11y/iframe-has-title */
// npm install react-icons --save
// npm install axios // biblioteca para requisicoes http

import './styles.css'
import { FiSearch } from 'react-icons/fi'; // icones
import { useState } from 'react';
import apiCep from './services/api';


function App() {

  const [input, setInput] = useState('') // campo de busca, inicia vazio
  const [cep, setCep] = useState({}) // {} = representa o inicio com objeto vazio


  async function handleSearch() {
    // 04167001/json/

    if (input === '') {         // verifica se o campo está vazio ao clicar
      alert("Preencha o cep")
      return;
    }

    try {
      const response1 = await apiCep.get(`${input}/json`)

      // adiciona o input/json para a api base
      // console.log(response.data)  //dentro da propriedade "data" do JSON encontra-se as informacoes de endereço
      setCep(response1.data) //guada conteudo do objeto CEP em setCep
      setInput('') // limpa




    } catch (error) {
      alert('Erro ao buscar')
      setInput('') // retorna o campo de busca para vazio
    }
  }


  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <div className="containerInput">
        <input
          type="text" placeholder="Digite o CEP..."
          value={input} onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#FFF' />
        </button>
      </div>



      {Object.keys(cep).length > 0 && (  // renderiza o main se há conteudo no useState objeto CEP
        <main className='main'>          {/* janela com info do CEP */}
          <h2>CEP: {cep.cep}</h2>        {/* acessa o cep dentro do objeto CEP */}
          <span>{cep.logradouro}</span>  {/* acessa o logradouro dentro do objeto CEP */}
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade}</span>
          <span>{cep.cep}</span>
          {/* <span>
            <a href="https://www.google.com/maps/embed/v1/place?key=AIzaSyB4GnBKY-DqBQJmxzHl--rUdWcUjxzj2zE&q=Eiffel+Tower,Paris+France">Maps</a>
          </span>

          iframe
            width="600"
            height="450"
            style={{ border: "0" }}
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place
            ?key=AIzaSyB4GnBKY-DqBQJmxzHl--rUdWcUjxzj2zE
            &q=04167001" >
          </iframe>
          <text>{cep.cep} </text> */}
        </main>

      )}
    </div>
  );
}

export default App;
