import React from 'react';

import { FaList } from 'react-icons/fa';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PROJECT } from '../../mutations/projectMutations';
import { GET_PROJECT } from '../../queries/projectQueries';

const EditProjectForm = ({ project }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState('new');

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    // refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name && !description && !status) {
      return alert('Please fill in all fields');
    }

    updateProject(name, description, status);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary btn-sm w-25 align-text-center mt-2"
        data-bs-toggle="modal"
        data-bs-target="#EditProjectModal"
      >
        <div className="d-flex align-items-center justify-content-center">
          <FaList style={{ marginRight: '5px' }}></FaList>
          <div>Edit</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="EditProjectModal"
        tabIndex="-1"
        aria-labelledby="EditProjectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="EditProjectModalLabel">
                {project.name}
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

export default EditProjectForm;
