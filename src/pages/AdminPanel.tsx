
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import CSVImporter from '@/components/admin/CSVImporter';

const AdminPanel = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('professors');
  
  // In a real implementation, these would be hooked up to actual API endpoints
  const handleProfessorsImport = (data: any[]) => {
    console.log('Professors data to import:', data);
    toast({
      title: "Professors Import Complete",
      description: `Successfully processed ${data.length} professor records.`,
    });
  };
  
  const handleCoursesImport = (data: any[]) => {
    console.log('Courses data to import:', data);
    toast({
      title: "Courses Import Complete",
      description: `Successfully processed ${data.length} course records.`,
    });
  };
  
  const handleGradesImport = (data: any[]) => {
    console.log('Grades data to import:', data);
    toast({
      title: "Grade Data Import Complete",
      description: `Successfully processed ${data.length} grade distribution records.`,
    });
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
        <p className="text-muted-foreground mb-6">Import and manage data for Santa Monica College</p>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="professors">Professors</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="grades">Grade Distributions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="professors">
            <Card>
              <CardHeader>
                <CardTitle>Import Professors</CardTitle>
                <CardDescription>
                  Upload a CSV file with professor data. Required columns: name, department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CSVImporter
                  onImport={handleProfessorsImport}
                  requiredColumns={['name', 'department']}
                />
              </CardContent>
              <CardFooter className="border-t pt-6">
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold mb-1">Column Format:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>name: Professor full name (e.g., "John Smith")</li>
                    <li>department: Academic department (e.g., "Mathematics")</li>
                  </ul>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>Import Courses</CardTitle>
                <CardDescription>
                  Upload a CSV file with course data. Required columns: code, number, title, units, department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CSVImporter
                  onImport={handleCoursesImport}
                  requiredColumns={['code', 'number', 'title', 'units', 'department']}
                />
              </CardContent>
              <CardFooter className="border-t pt-6">
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold mb-1">Column Format:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>code: Department code (e.g., "MATH")</li>
                    <li>number: Course number (e.g., "101")</li>
                    <li>title: Course title (e.g., "College Algebra")</li>
                    <li>units: Number of units (e.g., "3")</li>
                    <li>department: Academic department (e.g., "Mathematics")</li>
                  </ul>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="grades">
            <Card>
              <CardHeader>
                <CardTitle>Import Grade Distributions</CardTitle>
                <CardDescription>
                  Upload a CSV file with grade distribution data. Required columns: professorId, courseId, term, aCount, bCount, cCount, dCount, fCount, wCount
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CSVImporter
                  onImport={handleGradesImport}
                  requiredColumns={['professorId', 'courseId', 'term', 'aCount', 'bCount', 'cCount', 'dCount', 'fCount', 'wCount']}
                />
              </CardContent>
              <CardFooter className="border-t pt-6">
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold mb-1">Column Format:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>professorId: Database ID of the professor</li>
                    <li>courseId: Database ID of the course</li>
                    <li>term: Academic term (e.g., "Fall 2023")</li>
                    <li>aCount: Number of A grades</li>
                    <li>bCount: Number of B grades</li>
                    <li>cCount: Number of C grades</li>
                    <li>dCount: Number of D grades</li>
                    <li>fCount: Number of F grades</li>
                    <li>wCount: Number of W grades (withdrawals)</li>
                  </ul>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPanel;
