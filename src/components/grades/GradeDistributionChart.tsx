
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { GradeStats } from '@/types';
import { calculateGPA } from '@/services/gradeService';
import { useTheme } from '@/hooks/use-theme';

interface GradeDistributionChartProps {
  gradeStats: GradeStats;
  height?: number;
}

const GradeDistributionChart: React.FC<GradeDistributionChartProps> = ({ 
  gradeStats,
  height = 300 
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const data = [
    { name: 'A', count: gradeStats.aCount, className: 'grade-a' },
    { name: 'B', count: gradeStats.bCount, className: 'grade-b' },
    { name: 'C', count: gradeStats.cCount, className: 'grade-c' },
    { name: 'D', count: gradeStats.dCount, className: 'grade-d' },
    { name: 'F', count: gradeStats.fCount, className: 'grade-f' },
    { name: 'W', count: gradeStats.wCount, className: 'grade-w' }
  ];

  const gpa = calculateGPA(gradeStats);
  const totalStudents = 
    gradeStats.aCount + 
    gradeStats.bCount + 
    gradeStats.cCount + 
    gradeStats.dCount + 
    gradeStats.fCount +
    gradeStats.wCount;

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border rounded shadow-lg">
          <p className="font-medium">{`${data.name}: ${data.count} students`}</p>
          <p className="text-sm text-muted-foreground">{`${((data.count / totalStudents) * 100).toFixed(1)}% of class`}</p>
        </div>
      );
    }
    return null;
  };

  // Monochromatic blue color palette
  const blueColor = isDark ? "#3b82f6" : "#2563eb"; // blue-500/blue-600

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Grade Distribution</h3>
        <div className="text-right">
          <div className="font-medium">GPA: {gpa.toFixed(2)}</div>
          <div className="text-sm text-muted-foreground">Term: {gradeStats.term}</div>
          <div className="text-sm text-muted-foreground">Total students: {totalStudents}</div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="count"
            fill={blueColor}
            radius={[4, 4, 0, 0]}
            maxBarSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GradeDistributionChart;
