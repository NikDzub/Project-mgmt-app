import React from 'react';

import { FaExclamationCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <FaExclamationCircle
        className="text-danger"
        size="4em"
      ></FaExclamationCircle>
      <br></br>
      <h2>404</h2>
      <p>Sorry, this page does not exist</p>
      <Link to="/" className="btn btn-primary">
        Go back
      </Link>
    </div>
  );
};

export default NotFound;
