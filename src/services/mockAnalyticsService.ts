
// This file simulates API responses from a backend service
// In a real implementation, this would connect to your Node.js backend

export interface DataPoint {
  month: string;
  revenue: number;
  customers: number;
  region: string;
}

export interface TableData {
  headers: string[];
  rows: any[][];
}

export interface QueryResponse {
  answer: string;
  chartData?: DataPoint[];
  tableData?: TableData;
  chartType?: 'bar' | 'line' | 'pie' | 'area';
  error?: string;
}

// Mock database with sample data
const sampleData: DataPoint[] = [
  { month: 'Jan', revenue: 45000, customers: 120, region: 'North' },
  { month: 'Feb', revenue: 52000, customers: 140, region: 'North' },
  { month: 'Mar', revenue: 49000, customers: 130, region: 'North' },
  { month: 'Apr', revenue: 60000, customers: 160, region: 'North' },
  { month: 'May', revenue: 55000, customers: 150, region: 'North' },
  { month: 'Jan', revenue: 38000, customers: 100, region: 'South' },
  { month: 'Feb', revenue: 42000, customers: 110, region: 'South' },
  { month: 'Mar', revenue: 41000, customers: 105, region: 'South' },
  { month: 'Apr', revenue: 45000, customers: 115, region: 'South' },
  { month: 'May', revenue: 44000, customers: 112, region: 'South' },
  { month: 'Jan', revenue: 51000, customers: 130, region: 'East' },
  { month: 'Feb', revenue: 53000, customers: 135, region: 'East' },
  { month: 'Mar', revenue: 56000, customers: 140, region: 'East' },
  { month: 'Apr', revenue: 62000, customers: 150, region: 'East' },
  { month: 'May', revenue: 59000, customers: 145, region: 'East' },
  { month: 'Jan', revenue: 42000, customers: 110, region: 'West' },
  { month: 'Feb', revenue: 43000, customers: 115, region: 'West' },
  { month: 'Mar', revenue: 45000, customers: 120, region: 'West' },
  { month: 'Apr', revenue: 48000, customers: 125, region: 'West' },
  { month: 'May', revenue: 47000, customers: 122, region: 'West' },
];

// More complex data for financial analytics
const financialData = {
  categories: ['Product Sales', 'Services', 'Licensing', 'Maintenance'],
  quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
  departments: ['Sales', 'Marketing', 'R&D', 'Support'],
  years: [2021, 2022, 2023],
  metrics: ['Revenue', 'Expenses', 'Profit', 'ROI'],
  // Would contain actual data in a real implementation
};

// Sample queries and responses
const queryPatterns: Record<string, (query: string) => QueryResponse> = {
  revenueByRegion: (query: string) => {
    // Group data by region
    const regions = [...new Set(sampleData.map(d => d.region))];
    const data = regions.map(region => {
      const regionData = sampleData.filter(d => d.region === region);
      const totalRevenue = regionData.reduce((sum, d) => sum + d.revenue, 0);
      return { month: region, revenue: totalRevenue, customers: 0, region };
    });
    
    return {
      answer: `Here's the revenue breakdown by region. The ${data.sort((a, b) => b.revenue - a.revenue)[0].region} region has the highest total revenue at $${data.sort((a, b) => b.revenue - a.revenue)[0].revenue.toLocaleString()}.`,
      chartData: data,
      chartType: 'bar',
      tableData: {
        headers: ['Region', 'Total Revenue'],
        rows: data.map(d => [d.region, `$${d.revenue.toLocaleString()}`])
      }
    };
  },
  
  revenueOverTime: (query: string) => {
    // Group by month across all regions
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    const data = months.map(month => {
      const monthData = sampleData.filter(d => d.month === month);
      const totalRevenue = monthData.reduce((sum, d) => sum + d.revenue, 0);
      const totalCustomers = monthData.reduce((sum, d) => sum + d.customers, 0);
      return { month, revenue: totalRevenue, customers: totalCustomers, region: 'All' };
    });
    
    return {
      answer: `Revenue is showing ${data[0].revenue < data[data.length-1].revenue ? 'an upward' : 'a downward'} trend over time. The highest revenue was in ${data.sort((a, b) => b.revenue - a.revenue)[0].month} at $${data.sort((a, b) => b.revenue - a.revenue)[0].revenue.toLocaleString()}.`,
      chartData: data,
      chartType: 'line',
      tableData: {
        headers: ['Month', 'Total Revenue', 'Total Customers'],
        rows: data.map(d => [d.month, `$${d.revenue.toLocaleString()}`, d.customers])
      }
    };
  },
  
  customersByRegion: (query: string) => {
    // Group customers by region
    const regions = [...new Set(sampleData.map(d => d.region))];
    const data = regions.map(region => {
      const regionData = sampleData.filter(d => d.region === region);
      const totalCustomers = regionData.reduce((sum, d) => sum + d.customers, 0);
      return { month: region, revenue: 0, customers: totalCustomers, region };
    });
    
    return {
      answer: `Customer distribution varies by region. The ${data.sort((a, b) => b.customers - a.customers)[0].region} region has the highest number of customers at ${data.sort((a, b) => b.customers - a.customers)[0].customers}.`,
      chartData: data,
      chartType: 'pie',
      tableData: {
        headers: ['Region', 'Total Customers'],
        rows: data.map(d => [d.region, d.customers])
      }
    };
  },
  
  revenuePerCustomer: (query: string) => {
    // Calculate revenue per customer by region
    const regions = [...new Set(sampleData.map(d => d.region))];
    const data = regions.map(region => {
      const regionData = sampleData.filter(d => d.region === region);
      const totalRevenue = regionData.reduce((sum, d) => sum + d.revenue, 0);
      const totalCustomers = regionData.reduce((sum, d) => sum + d.customers, 0);
      const revenuePerCustomer = totalRevenue / totalCustomers;
      return { 
        month: region, 
        revenue: revenuePerCustomer, 
        customers: totalCustomers, 
        region 
      };
    });
    
    return {
      answer: `Revenue per customer analysis shows that the ${data.sort((a, b) => b.revenue - a.revenue)[0].region} region has the highest revenue per customer at $${Math.round(data.sort((a, b) => b.revenue - a.revenue)[0].revenue).toLocaleString()}.`,
      chartData: data,
      chartType: 'bar',
      tableData: {
        headers: ['Region', 'Revenue per Customer', 'Total Customers'],
        rows: data.map(d => [d.region, `$${Math.round(d.revenue).toLocaleString()}`, d.customers])
      }
    };
  },
  
  growthAnalysis: (query: string) => {
    // Compare first month to last month for growth analysis
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    const regions = [...new Set(sampleData.map(d => d.region))];
    
    const growthData = regions.map(region => {
      const firstMonthData = sampleData.find(d => d.region === region && d.month === months[0]);
      const lastMonthData = sampleData.find(d => d.region === region && d.month === months[months.length - 1]);
      
      if (!firstMonthData || !lastMonthData) return null;
      
      const revenueGrowth = ((lastMonthData.revenue - firstMonthData.revenue) / firstMonthData.revenue) * 100;
      const customerGrowth = ((lastMonthData.customers - firstMonthData.customers) / firstMonthData.customers) * 100;
      
      return {
        region,
        revenueGrowth: parseFloat(revenueGrowth.toFixed(2)),
        customerGrowth: parseFloat(customerGrowth.toFixed(2))
      };
    }).filter(d => d !== null) as {region: string, revenueGrowth: number, customerGrowth: number}[];
    
    // Convert to chart format
    const chartData = growthData.map(d => ({
      month: d.region,
      revenue: d.revenueGrowth,
      customers: d.customerGrowth,
      region: d.region
    }));
    
    return {
      answer: `Growth analysis from January to May shows that the ${growthData.sort((a, b) => b.revenueGrowth - a.revenueGrowth)[0].region} region had the highest revenue growth at ${growthData.sort((a, b) => b.revenueGrowth - a.revenueGrowth)[0].revenueGrowth}%. For customer growth, the ${growthData.sort((a, b) => b.customerGrowth - a.customerGrowth)[0].region} region led with ${growthData.sort((a, b) => b.customerGrowth - a.customerGrowth)[0].customerGrowth}% increase.`,
      chartData,
      chartType: 'bar',
      tableData: {
        headers: ['Region', 'Revenue Growth', 'Customer Growth'],
        rows: growthData.map(d => [d.region, `${d.revenueGrowth}%`, `${d.customerGrowth}%`])
      }
    };
  }
};

// Function to analyze the query and return appropriate response
export const analyzeQuery = async (query: string): Promise<QueryResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Convert query to lowercase for easier matching
  const lowerQuery = query.toLowerCase();
  
  // Check for revenue by region
  if (lowerQuery.includes('revenue') && lowerQuery.includes('region')) {
    return queryPatterns.revenueByRegion(query);
  }
  
  // Check for revenue over time
  if (lowerQuery.includes('revenue') && 
     (lowerQuery.includes('trend') || lowerQuery.includes('time') || lowerQuery.includes('month'))) {
    return queryPatterns.revenueOverTime(query);
  }
  
  // Check for customer by region
  if (lowerQuery.includes('customer') && lowerQuery.includes('region')) {
    return queryPatterns.customersByRegion(query);
  }
  
  // Check for revenue per customer
  if (lowerQuery.includes('revenue') && lowerQuery.includes('per') && lowerQuery.includes('customer')) {
    return queryPatterns.revenuePerCustomer(query);
  }
  
  // Check for growth analysis
  if (lowerQuery.includes('growth') || lowerQuery.includes('trend') || 
      (lowerQuery.includes('compare') && lowerQuery.includes('month'))) {
    return queryPatterns.growthAnalysis(query);
  }
  
  // Default response for unrecognized queries
  return {
    answer: "I couldn't find specific data matching your query. Please try rephrasing your question or asking about revenue by region, revenue trends over time, customers by region, revenue per customer, or growth analysis.",
    error: "No matching data pattern found"
  };
};
