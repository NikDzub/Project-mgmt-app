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

  return (
    <>
      {!loading && !error && (
        <div className="card mx-auto p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>
          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>

          <p>
            Status: <strong>{data.project.status}</strong>
          </p>

          <ClientInfo client={data.project.client}></ClientInfo>

          <EditProjectForm project={data.project}></EditProjectForm>

          <div className="d-flex">
            <DeleteProjectBtn projectId={id}></DeleteProjectBtn>
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
