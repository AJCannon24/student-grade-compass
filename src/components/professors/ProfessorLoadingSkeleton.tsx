
import React from 'react';

const ProfessorLoadingSkeleton: React.FC = () => {
  return (
    <div className="container py-8">
      <div className="animate-pulse space-y-4">
        <div className="flex space-x-2 items-center mb-4">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-5 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="h-5 bg-gray-200 rounded w-1/3 mb-6"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="lg:col-span-2">
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-4">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorLoadingSkeleton;
