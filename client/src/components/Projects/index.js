import React from 'react';

import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../../queries/projectQueries';

import Spinner from '../Spinner';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) {
    return <Spinner></Spinner>;
  }
  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <>
      {data.projects.length > 0 ? (
        <div className="row">
          {data.projects.map((project) => {
            return (
              <ProjectCard project={project} key={project.id}></ProjectCard>
            );
          })}
        </div>
      ) : (
        <div>No projects</div>
      )}
    </>
  );
};

export default Projects;
