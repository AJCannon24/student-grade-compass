
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { GradeStats } from '@/types';
import { calculateGPA, getTotalStudents } from '@/services/gradeService';
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
  
  const gradeData = [
    { name: 'A', count: gradeStats.aCount, className: 'grade-a', category: 'letter' },
    { name: 'B', count: gradeStats.bCount, className: 'grade-b', category: 'letter' },
    { name: 'C', count: gradeStats.cCount, className: 'grade-c', category: 'letter' },
    { name: 'D', count: gradeStats.dCount, className: 'grade-d', category: 'letter' },
    { name: 'F', count: gradeStats.fCount, className: 'grade-f', category: 'letter' },
    { name: 'W', count: gradeStats.wCount, className: 'grade-w', category: 'withdrawal' }
  ];

  const specialGradeData = [
    { name: 'P', count: gradeStats.pCount, className: 'grade-p', category: 'pass' },
    { name: 'NP', count: gradeStats.npCount, className: 'grade-np', category: 'pass' },
    { name: 'IX', count: gradeStats.ixCount, className: 'grade-ix', category: 'special' },
    { name: 'RD', count: gradeStats.rdCount, className: 'grade-rd', category: 'special' },
    { name: 'EW', count: gradeStats.ewCount, className: 'grade-ew', category: 'withdrawal' }
  ];
  
  // Filter out grades with zero counts to avoid clutter
  const allGradeData = [...gradeData, ...specialGradeData.filter(grade => grade.count > 0)];

  const gpa = calculateGPA(gradeStats);
  const totalStudents = getTotalStudents(gradeStats);
  
  // Define consistent colors for each grade
  const getGradeColor = (name: string, isDark: boolean) => {
    const colorMap: Record<string, string> = {
      A: isDark ? '#4ade80' : '#22c55e', // green-400/green-500
      B: isDark ? '#a3e635' : '#84cc16', // lime-400/lime-500
      C: isDark ? '#facc15' : '#eab308', // yellow-400/yellow-500
      D: isDark ? '#fb923c' : '#f97316', // orange-400/orange-500
      F: isDark ? '#f87171' : '#ef4444', // red-400/red-500
      W: isDark ? '#94a3b8' : '#64748b', // slate-400/slate-500
      P: isDark ? '#60a5fa' : '#3b82f6', // blue-400/blue-500
      NP: isDark ? '#a78bfa' : '#8b5cf6', // violet-400/violet-500
      IX: isDark ? '#c084fc' : '#a855f7', // purple-400/purple-500
      RD: isDark ? '#e879f9' : '#d946ef', // fuchsia-400/fuchsia-500
      EW: isDark ? '#cbd5e1' : '#94a3b8'  // slate-300/slate-400
    };
    
    return colorMap[name] || (isDark ? '#3b82f6' : '#2563eb'); // default blue
  };

  const gradeDescriptions: Record<string, string> = {
    A: 'Excellent',
    B: 'Good',
    C: 'Average',
    D: 'Poor',
    F: 'Failure',
    W: 'Withdrawal',
    P: 'Pass',
    NP: 'No Pass',
    IX: 'Incomplete',
    RD: 'Report Delayed',
    EW: 'Excused Withdrawal'
  };

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border rounded shadow-lg">
          <p className="font-medium">{`${data.name}: ${data.count} students`}</p>
          <p className="text-sm text-muted-foreground">{`${((data.count / totalStudents) * 100).toFixed(1)}% of class`}</p>
          {gradeDescriptions[data.name] && (
            <p className="text-xs text-muted-foreground">{gradeDescriptions[data.name]}</p>
          )}
        </div>
      );
    }
    return null;
  };

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
          data={allGradeData}
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
            radius={[4, 4, 0, 0]}
            maxBarSize={60}
            name="Students"
            fill={(data) => getGradeColor(data.name, isDark)}
          />
        </BarChart>
      </ResponsiveContainer>
      
      <div className="mt-4 text-xs text-muted-foreground">
        <p>Note: Only letter grades (A, B, C, D, F) are included in GPA calculation.</p>
        <p>P = Pass, NP = No Pass, IX = Incomplete, RD = Report Delayed, EW = Excused Withdrawal</p>
      </div>
    </div>
  );
};

export default GradeDistributionChart;
