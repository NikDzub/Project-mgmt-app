import React from 'react';

import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';

const ClientInfo = ({ client }) => {
  return (
    <>
      <h5 className="mt-5">Client Information</h5>

      <ul className="list-group">
        <li className="list-group-item">
          <FaIdBadge className="icon mx-1"></FaIdBadge>
          {client.name}
        </li>

        <li className="list-group-item">
          <FaEnvelope className="icon mx-1"></FaEnvelope>
          {client.email}
        </li>

        <li className="list-group-item">
          <FaPhone className="icon mx-1"></FaPhone>
          {client.phone}
        </li>
      </ul>
    </>
  );
};

export default ClientInfo;
