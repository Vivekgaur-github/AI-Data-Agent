
import React from 'react';
import { DataPoint, TableData } from '@/services/mockAnalyticsService';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface DataVisualizerProps {
  data?: {
    chartData?: DataPoint[];
    tableData?: TableData;
    chartType?: 'bar' | 'line' | 'pie' | 'area';
    answer: string;
    error?: string;
  };
}

const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F97316', '#EC4899'];

const DataVisualizer: React.FC<DataVisualizerProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  if (data.error) {
    return (
      <Alert>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{data.error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Alert>
        <AlertDescription className="text-lg">{data.answer}</AlertDescription>
      </Alert>

      {data.chartData && data.chartData.length > 0 && (
        <div className="h-[400px] w-full">
          <ChartContainer
            config={{
              revenue: { label: "Revenue" },
              customers: { label: "Customers" },
            }}
          >
            {data.chartType === 'bar' && (
              <BarChart data={data.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="revenue" name="Revenue" fill="#8B5CF6" />
                {data.chartData[0] && data.chartData[0].customers > 0 && (
                  <Bar dataKey="customers" name="Customers" fill="#3B82F6" />
                )}
              </BarChart>
            )}
            
            {data.chartType === 'line' && (
              <LineChart data={data.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#8B5CF6"
                  activeDot={{ r: 8 }}
                />
                {data.chartData[0] && data.chartData[0].customers > 0 && (
                  <Line
                    type="monotone"
                    dataKey="customers"
                    name="Customers"
                    stroke="#3B82F6"
                    activeDot={{ r: 6 }}
                  />
                )}
              </LineChart>
            )}
            
            {data.chartType === 'pie' && (
              <PieChart>
                <Pie
                  data={data.chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={150}
                  fill="#8B5CF6"
                  dataKey="customers"
                  nameKey="month"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {data.chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
              </PieChart>
            )}
            
            {data.chartType === 'area' && (
              <AreaChart data={data.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.3}
                />
                {data.chartData[0] && data.chartData[0].customers > 0 && (
                  <Area
                    type="monotone"
                    dataKey="customers"
                    name="Customers"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.3}
                  />
                )}
              </AreaChart>
            )}
          </ChartContainer>
        </div>
      )}

      {data.tableData && (
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>Analytical Results</TableCaption>
            <TableHeader>
              <TableRow>
                {data.tableData.headers.map((header, i) => (
                  <TableHead key={i}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.tableData.rows.map((row, i) => (
                <TableRow key={i}>
                  {row.map((cell, j) => (
                    <TableCell key={j}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default DataVisualizer;
