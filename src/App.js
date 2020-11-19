import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";
//useEffect => usado para disparar funções sempre que a gente tiver alguma
//informação alterada ou não

function App() {
  //Estado
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
      api.get('repositories').then(response => {
        setRepositories(response.data);
       
      });
    }, []);

  async function handleAddRepository() {
   const response = await api.post('repositories', {
     title: `Novo  Repositorio`,
     url: "http://github.com/ThalesFreitas",
     techs: ['Nodejs', 'ReactJS']
	   
   });
   //Imutabilidade
   setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`repositories/${id}`);
     
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
   }
  

  return (
    <div>

      <ul data-testid="repository-list">
      {repositories.map(repository => (<li key={repository.id} >{repository.title}
        
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
      ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
