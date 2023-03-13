import React from 'react';

import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { DELETE_PROJECT } from '../../mutations/projectMutations';
import { useMutation } from '@apollo/client';

const DeleteProjectbtn = ({ projectId }) => {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => {
      navigate('/');
    },
  });

  return (
    <div
      onClick={deleteProject}
      className="mt-2 btn btn-danger btn-sm w-25 d-inline mr-auto"
    >
      Delete
    </div>
  );
};

export default DeleteProjectbtn;
