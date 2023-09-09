import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Notes from './Notes';
import AddNote from './AddNote';

const Home = ({showAlert}) => {
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigateTo('/login');
    }
  }, []);

  return (
    <div className="container">
      <AddNote showAlert={showAlert}/>
      <Notes showAlert={showAlert}/>
    </div>
  )
}

export default Home
