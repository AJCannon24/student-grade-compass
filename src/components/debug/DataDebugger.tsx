
import React, { useEffect, useState } from 'react';
import { getProfessors } from '@/services/professorService';
import { getGradeStats } from '@/services/gradeService';

const DataDebugger = () => {
  const [professors, setProfessors] = useState<any[]>([]);
  const [gradeStats, setGradeStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const professorsData = await getProfessors();
        const gradeStatsData = await getGradeStats();
        
        setProfessors(professorsData);
        setGradeStats(gradeStatsData);
      } catch (err) {
        console.error('Error loading debug data:', err);
        setError('Failed to load data for debugging');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  if (!showDebug) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          onClick={() => setShowDebug(true)}
          className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow-lg"
        >
          Debug
        </button>
      </div>
    );
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-[80vh] overflow-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-300 dark:border-gray-600">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Data Debugger</h3>
        <button 
          onClick={() => setShowDebug(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Close
        </button>
      </div>
      
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Professors ({professors.length})</h4>
            <div className="text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded overflow-auto max-h-40">
              <pre>{JSON.stringify(professors.slice(0, 2), null, 2)}</pre>
              {professors.length > 2 && <p className="text-gray-500 mt-1">...and {professors.length - 2} more</p>}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Grade Stats ({gradeStats.length})</h4>
            <div className="text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded overflow-auto max-h-40">
              <pre>{JSON.stringify(gradeStats.slice(0, 2), null, 2)}</pre>
              {gradeStats.length > 2 && <p className="text-gray-500 mt-1">...and {gradeStats.length - 2} more</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataDebugger;
