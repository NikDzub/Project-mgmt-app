import React from 'react';

import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../../../mutations/clientMutations';
import { GET_PROJECTS } from '../../../queries/projectQueries';
import { GET_CLIENTS } from '../../../queries/clientQueries';

import { FaTrash } from 'react-icons/fa';

const ClientRow = ({ client }) => {
  const [DeleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button onClick={DeleteClient} className="btn btn-danger btn-sm">
          <FaTrash className="icon"></FaTrash>
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
