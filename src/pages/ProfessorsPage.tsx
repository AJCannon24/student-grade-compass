
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProfessorCard from '@/components/professors/ProfessorCard';
import { Professor } from '@/types';
import { getProfessors, searchProfessors } from '@/services/professorService';

const ProfessorsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [filteredProfessors, setFilteredProfessors] = useState<Professor[]>([]);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(true);
  const [departments, setDepartments] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        setIsLoading(true);
        let data: Professor[];
        
        if (initialQuery) {
          data = await searchProfessors(initialQuery);
        } else {
          data = await getProfessors();
        }
        
        setProfessors(data);
        setFilteredProfessors(data);
        
        // Extract unique departments
        const uniqueDepartments = Array.from(new Set(data.map(p => p.department))).sort();
        setDepartments(uniqueDepartments);
      } catch (error) {
        console.error("Error fetching professors:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfessors();
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL query parameter
    setSearchParams({ q: searchQuery });
    
    // Filter professors
    if (searchQuery.trim() === '') {
      setFilteredProfessors(professors);
    } else {
      const filtered = professors.filter(professor =>
        professor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        professor.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProfessors(filtered);
    }
  };

  const handleDepartmentFilter = (department: string) => {
    setSelectedDepartment(department);
    
    if (department === '') {
      setFilteredProfessors(professors);
    } else {
      const filtered = professors.filter(professor => professor.department === department);
      setFilteredProfessors(filtered);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Professors</h1>
        
        <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
          <div className="w-full md:w-64 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search professors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button 
                type="submit" 
                size="icon" 
                variant="ghost" 
                className="absolute right-0 top-0 h-10 w-10"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </form>
            
            <div className="space-y-2">
              <h3 className="font-medium">Departments</h3>
              <div className="space-y-1">
                <Button
                  variant={selectedDepartment === '' ? 'default' : 'ghost'}
                  className="justify-start w-full"
                  onClick={() => handleDepartmentFilter('')}
                >
                  All Departments
                </Button>
                {departments.map(dept => (
                  <Button
                    key={dept}
                    variant={selectedDepartment === dept ? 'default' : 'ghost'}
                    className="justify-start w-full"
                    onClick={() => handleDepartmentFilter(dept)}
                  >
                    {dept}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-48 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : filteredProfessors.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No professors found matching your search criteria.</p>
              </div>
            ) : (
              <>
                <p className="mb-4 text-muted-foreground">
                  Showing {filteredProfessors.length} {filteredProfessors.length === 1 ? 'professor' : 'professors'}
                  {selectedDepartment && ` in ${selectedDepartment}`}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProfessors.map(professor => (
                    <ProfessorCard key={professor.id} professor={professor} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfessorsPage;
