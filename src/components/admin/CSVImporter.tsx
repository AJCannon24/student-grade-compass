
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FilePlus, CheckCircle, AlertCircle } from 'lucide-react';

interface CSVImporterProps {
  onImport: (data: any[]) => void;
  requiredColumns?: string[];
}

const CSVImporter: React.FC<CSVImporterProps> = ({ onImport, requiredColumns = [] }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    setError(null);
    setSuccess(false);
    setPreview([]);
    
    // Basic file type validation
    if (!selectedFile.name.endsWith('.csv')) {
      setError('Please upload a CSV file.');
      return;
    }
    
    // Read and parse the CSV file
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const data = parseCSV(text);
        
        // Validate required columns
        const headers = Object.keys(data[0] || {});
        const missingColumns = requiredColumns.filter(col => !headers.includes(col));
        
        if (missingColumns.length > 0) {
          setError(`Missing required columns: ${missingColumns.join(', ')}`);
          return;
        }
        
        // Show a preview of the data (first 3 rows)
        setPreview(data.slice(0, 3));
      } catch (err) {
        setError('Failed to parse the CSV file. Please check the format.');
        console.error('CSV parsing error:', err);
      }
    };
    
    reader.onerror = () => {
      setError('Failed to read the file. Please try again.');
    };
    
    reader.readAsText(selectedFile);
  };

  const parseCSV = (text: string): any[] => {
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1)
      .filter(line => line.trim() !== '')
      .map(line => {
        const values = line.split(',').map(v => v.trim());
        const row: Record<string, string> = {};
        
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        
        return row;
      });
  };

  const handleImport = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        try {
          const text = event.target?.result as string;
          const data = parseCSV(text);
          
          // Call the onImport callback with the parsed data
          onImport(data);
          
          setSuccess(true);
          setFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        } catch (err) {
          setError('Failed to process the CSV file.');
          console.error('CSV processing error:', err);
        } finally {
          setIsProcessing(false);
        }
      };
      
      reader.onerror = () => {
        setError('Failed to read the file. Please try again.');
        setIsProcessing(false);
      };
      
      reader.readAsText(file);
    } catch (err) {
      setError('An unexpected error occurred.');
      setIsProcessing(false);
      console.error('Import error:', err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <Input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
          id="csv-file-input"
        />
        <label htmlFor="csv-file-input" className="cursor-pointer">
          <div className="flex flex-col items-center justify-center space-y-2">
            {!file ? (
              <>
                <Upload className="h-10 w-10 text-gray-400" />
                <p className="text-sm font-medium">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  CSV files only (max 10MB)
                </p>
              </>
            ) : (
              <>
                <FilePlus className="h-10 w-10 text-blue-500" />
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </>
            )}
          </div>
        </label>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Data imported successfully.
          </AlertDescription>
        </Alert>
      )}

      {preview.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Preview (first 3 rows):</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  {Object.keys(preview[0]).map((header, idx) => (
                    <th key={idx} className="p-2 text-left border">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {Object.values(row).map((cell, cellIdx) => (
                      <td key={cellIdx} className="p-2 border">
                        {String(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button
          type="button"
          onClick={handleImport}
          disabled={!file || isProcessing || !!error}
        >
          {isProcessing ? 'Processing...' : 'Import CSV'}
        </Button>
      </div>
    </div>
  );
};

export default CSVImporter;
