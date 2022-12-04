import logoGithub from '../img/logoGithub.png';
import { Container } from './styles';
import Input from '../components/Input';
import Item from '../components/Item';
import { useState } from 'react';
import Button from '../components/Button';
import { api } from '../pages/services/api';

function App() {
  const [repos, setRepos] = useState([]);
  const [currentRepo, setCurrentRepo] = useState('');

  const handleSearchRepo = async () => {

    const {data} = await api.get(`repos/${currentRepo}`);
    
    if(data.id) {
      const isExist = repos.find(repo => repo.id === data.id);
      if(!isExist){
        setRepos(prev => [...prev, data]);
        setCurrentRepo('');
        return
      } else {
        alert('Repositório já adicionado!')
      } 
    } else {
      alert('Repositório não encontrado!')
    }
  }

  const handleRemoveRepo = (id) => {
    const newList = repos.filter(repo => repo.id !== id);
    setRepos(newList);
  }


  return (
    <Container>
      <img src={logoGithub} width={72} height={72} alt="Logo GitHub"/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <Item handleRemoveRepo={handleRemoveRepo} repo={repo} />)}  
    </Container>
  );
}

export default App;
