
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';
import { GradeStats } from '@/types';
import { calculateGPA } from '@/services/gradeService';

interface GradeDistributionChartProps {
  gradeStats: GradeStats;
  height?: number;
}

const GradeDistributionChart: React.FC<GradeDistributionChartProps> = ({ 
  gradeStats,
  height = 300 
}) => {
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
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-medium">{`${data.name}: ${data.count} students`}</p>
          <p className="text-sm text-muted-foreground">{`${((data.count / totalStudents) * 100).toFixed(1)}% of class`}</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    const radius = 10;
    
    return (
      <text 
        x={x + width / 2} 
        y={y - radius} 
        fill="#000"
        textAnchor="middle" 
        dominantBaseline="middle"
      >
        {value}
      </text>
    );
  };

  const colors = {
    A: "#22c55e", // green-500
    B: "#3b82f6", // blue-500
    C: "#eab308", // yellow-500
    D: "#f97316", // orange-500
    F: "#ef4444", // red-500
    W: "#6b7280", // gray-500
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
            radius={[4, 4, 0, 0]}
            maxBarSize={60}
          >
            {data.map((entry, index) => (
              <Bar 
                key={`bar-${index}`} 
                dataKey="count" 
                fill={colors[entry.name as keyof typeof colors]} 
                className={entry.className}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GradeDistributionChart;
