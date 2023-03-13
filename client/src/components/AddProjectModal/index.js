import React from 'react';

import { useState } from 'react';

import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from '../../queries/clientQueries';
import { GET_PROJECTS } from '../../queries/projectQueries';
import { ADD_PROJECT } from '../../mutations/projectMutations';

import { FaList } from 'react-icons/fa';
import Spinner from '../Spinner';

const AddProjectModal = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('new');
  const [clientId, setClientId] = useState('');

  //Get clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name !== '' && description !== '' && status !== '' && clientId !== '') {
      addProject(name, description, status, clientId);

      setName('');
      setDescription('');
      setStatus('new');
      setClientId('');
    } else {
      alert('Please fill in all fields');
    }
  };

  if (loading) {
    return null;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-sm btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#AddProjectModal"
      >
        <div className="d-flex align-items-center">
          <FaList style={{ marginRight: '5px' }}></FaList>
          <div>Add Project</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="AddProjectModal"
        tabIndex="-1"
        aria-labelledby="AddProjectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="AddProjectModalLabel">
                New Project
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="form" onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="form-control"
                    type="text"
                  ></input>
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    className="form-control"
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    id="status"
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  >
                    <option value="new">Not Started</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Client</label>
                  <select
                    className="form-select"
                    id="clientId"
                    value={clientId}
                    onChange={(e) => {
                      setClientId(e.target.value);
                    }}
                  >
                    <option>Select Client</option>
                    {data.clients.map((client) => {
                      return (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <button
                  className="btn btn-primary"
                  type="submit"
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProjectModal;
