
import React from 'react';
import { Link } from 'react-router-dom';
import { Professor } from '@/types';

interface ProfessorHeaderProps {
  professor: Professor;
  error: string | null;
}

const ProfessorHeader: React.FC<ProfessorHeaderProps> = ({ professor, error }) => {
  if (error || !professor) {
    return (
      <div className="container py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="text-muted-foreground mb-6">{error || 'Professor not found'}</p>
        <Link to="/professors">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Back to Professors</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <Link to="/professors" className="text-blue-600 hover:underline mb-2 inline-block">
        &larr; Back to All Professors
      </Link>
      <h1 className="text-3xl font-bold">{professor.name}</h1>
      <p className="text-xl text-muted-foreground">{professor.department}</p>
    </div>
  );
};

export default ProfessorHeader;
