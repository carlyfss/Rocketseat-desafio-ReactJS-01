import React, { useEffect, useState } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(res => {
      setRepositories(res.data);
    })
  }, [repositories])

  async function handleAddRepository() {
    const res = await api.post('/repositories', {
      title: `New Repo ${Date.now()}`,
      url: `www.${Date.now()}.com`,
      techs: ['Node.js', 'React.js'],
    })
  }

  async function handleRemoveRepository(id) {
    const res = await api.delete(`/repositories/${id}`);
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repo => 
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        )}

      </ul>
      
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}


export default App;
