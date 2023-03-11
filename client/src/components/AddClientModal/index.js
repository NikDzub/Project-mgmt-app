import React from 'react';

import { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../../mutations/clientMutations';
import { GET_CLIENTS } from '../../queries/clientQueries';

import { FaUser } from 'react-icons/fa';

const AddClientModal = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name !== '' && email !== '' && phone !== '') {
      addClient(name, email, phone);

      setName('');
      setEmail('');
      setPhone('');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser style={{ marginRight: '5px' }}></FaUser>
          <div>Add Client</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        tabIndex="-1"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addClientModalLabel">
                Add Client
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
                  <label className="form-label">Email</label>
                  <input
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="form-control"
                    type="email"
                  ></input>
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    id="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    className="form-control"
                    type="tel"
                  ></input>
                </div>

                <button
                  className="btn btn-secondary"
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

export default AddClientModal;
