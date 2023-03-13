import React from 'react';

import Spinner from '../components/Spinner';
import ClientInfo from '../components/ClientInfo';

import { Link, useParams } from 'react-router-dom';
import { GET_PROJECT } from '../queries/projectQueries';
import { useQuery } from '@apollo/client';

const Project = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  console.log(data);
  return (
    <>
      {!loading && !error && (
        <div className="card mx-auto p-5">
          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>

          <p>
            Status: <strong>{data.project.status}</strong>
          </p>

          <ClientInfo client={data.project.client}></ClientInfo>

          <Link
            to="/"
            className="mt-2 btn btn-primary btn-sm w-25 d-inline mr-auto"
          >
            Back
          </Link>
        </div>
      )}
    </>
  );
};

export default Project;
