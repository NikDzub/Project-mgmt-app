import React from 'react';

const ProjectCard = ({ project }) => {
  let statusColor = 'text-danger';

  switch (project.status) {
    case 'In progress': {
      statusColor = 'text-primary';
      break;
    }
    case 'Completed': {
      statusColor = 'text-success';
    }
  }

  return (
    <div className="col-md-6">
      <div className="card mb-3 bg-light">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{project.name}</h5>

            <a className="btn btn-sm btn-dark" href={`/projects/${project.id}`}>
              View
            </a>
          </div>
          <p>
            Status :{' '}
            <strong className={`${statusColor} m-0`}>{project.status}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
