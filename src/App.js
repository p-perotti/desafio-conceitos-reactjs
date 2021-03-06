import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [newRepository, setNewRepository] = useState('');

  useEffect(() => {
    api.get('repositories').then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', { title: newRepository });
  
    if (response.data) {
      setRepositories([...repositories, response.data]);
      setNewRepository('');
    }
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <input type="text" value={newRepository} onChange={(event) => (
        setNewRepository(event.target.value)
      )} />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
