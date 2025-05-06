
import React from 'react';

const ProfessorLoadingSkeleton: React.FC = () => {
  return (
    <div className="container py-8">
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default ProfessorLoadingSkeleton;
