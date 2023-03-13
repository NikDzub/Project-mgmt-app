import React from 'react';

import Spinner from '../components/Spinner';
import ClientInfo from '../components/ClientInfo';
import DeleteProjectBtn from '../components/DeleteProjectBtn';
import EditProjectForm from '../components/EditProjectForm';

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

  let statusColor = 'text-danger';

  switch (data.project.status) {
    case 'In progress': {
      statusColor = 'text-primary';
      break;
    }
    case 'Completed': {
      statusColor = 'text-success';
    }
  }

  return (
    <>
      {!loading && !error && (
        <div className="card bg-light mx-auto p-4">
          <Link to="/" className="btn btn-dark btn-sm w-auto d-inline ms-auto">
            Back
          </Link>
          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>

          <p>
            Status:{' '}
            <strong className={`${statusColor}`}>{data.project.status}</strong>
          </p>

          <ClientInfo client={data.project.client}></ClientInfo>

          <div className="d-flex flex-column">
            <EditProjectForm project={data.project}></EditProjectForm>
            <DeleteProjectBtn projectId={id}></DeleteProjectBtn>
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
