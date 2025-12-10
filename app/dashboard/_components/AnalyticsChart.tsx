"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export type AnalyticsItem = {
  name: string;
  steps: number;
};

interface AnalyticsChartProps {
  data?: AnalyticsItem[]; 
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data = [] }) => {
  return (
    <div className="w-full p-5">
      <h2 className="text-xl font-bold mb-4">Tours & Steps Analytics</h2>

      <div className="w-full h-80 bg-white rounded-xl p-4 shadow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="steps" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;
