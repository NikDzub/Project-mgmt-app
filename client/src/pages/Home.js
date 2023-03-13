import React from 'react';

import Projects from '../components/Projects';
import AddClientModal from '../components/AddClientModal';
import Clients from '../components/Clients';

const Home = () => {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientModal></AddClientModal>
      </div>
      <Projects></Projects>
      <hr></hr>
      <Clients></Clients>
    </>
  );
};

export default Home;
