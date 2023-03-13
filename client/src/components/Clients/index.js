import React from 'react';

import Spinner from '../Spinner';
import ClientRow from './ClientRow';

import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from '../../queries/clientQueries';

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) {
    return <Spinner></Spinner>;
  }
  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => {
              return <ClientRow client={client} key={client.id}></ClientRow>;
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Clients;
