import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, Package, MapPin } from 'lucide-react';
import { getSalesReport } from '../services/api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface SalesData {
  salesByProduct: Array<{
    Product: {
      name: string;
      region: string;
    };
    total_sales: string;
    total_revenue: string;
  }>;
  averageTicket: number;
  totalPurchases: number;
  totalRevenue: number;
}

export default function AdminDashboard() {
  const [salesData, setSalesData] = useState<SalesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSalesData = async () => {
      try {
        const response = await getSalesReport();
        setSalesData(response.data);
      } catch (error) {
        console.error('Error loading sales data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSalesData();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Carregando dados...</div>;
  }

  if (!salesData) {
    return <div className="text-center py-8 text-red-600">Erro ao carregar dados do dashboard</div>;
  }

  const { salesByProduct, averageTicket, totalPurchases, totalRevenue } = salesData;

  // Preparar dados para os gráficos
  const productSalesData = salesByProduct.map((sale) => ({
    name: sale.Product.name,
    vendas: parseInt(sale.total_sales),
    receita: parseFloat(sale.total_revenue),
    regiao: sale.Product.region,
  }));

  const regionData = salesByProduct.reduce((acc: { name: string; value: number }[], sale) => {
    const existingRegion = acc.find(r => r.name === sale.Product.region);
    if (existingRegion) {
      existingRegion.value += parseInt(sale.total_sales);
    } else {
      acc.push({
        name: sale.Product.region,
        value: parseInt(sale.total_sales),
      });
    }
    return acc;
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <TrendingUp className="text-indigo-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total de Vendas</p>
              <p className="text-2xl font-bold text-gray-800">
                {totalPurchases}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Receita Total</p>
              <p className="text-2xl font-bold text-gray-800">
                R$ {totalRevenue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Package className="text-yellow-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Ticket Médio</p>
              <p className="text-2xl font-bold text-gray-800">
                R$ {averageTicket.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <MapPin className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Regiões Atendidas</p>
              <p className="text-2xl font-bold text-gray-800">
                {regionData.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Vendas por Produto */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Vendas por Produto</h2>
          <BarChart width={500} height={300} data={productSalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="vendas" fill="#8884d8" name="Quantidade" />
          </BarChart>
        </div>

        {/* Gráfico de Vendas por Região */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Distribuição por Região</h2>
          <PieChart width={500} height={300}>
            <Pie
              data={regionData}
              cx={250}
              cy={150}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {regionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Tabela de Produtos Mais Vendidos */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Detalhamento de Vendas</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Região
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {productSalesData.map((product, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.vendas}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.regiao}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}