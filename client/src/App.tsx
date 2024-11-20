import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ChatInterface from './components/ChatInterface';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { User, Product } from './types';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showPurchased, setShowPurchased] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();

  const handleLogin = (email: string, role: 'admin' | 'customer') => {
    setUser({
      id: email, // Usando o email como ID para simplificar
      email,
      name: email.split('@')[0],
      role,
    });
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold">E-commerce System</h1>
            {user.role === 'customer' ? (
              <>
                <button
                  onClick={() => setShowPurchased(false)}
                  className={`px-3 py-1 rounded transition-colors ${
                    !showPurchased ? 'bg-indigo-500' : 'hover:bg-indigo-500'
                  }`}
                >
                  Produtos
                </button>
                <button
                  onClick={() => setShowPurchased(true)}
                  className={`px-3 py-1 rounded transition-colors ${
                    showPurchased ? 'bg-indigo-500' : 'hover:bg-indigo-500'
                  }`}
                >
                  Meus Produtos
                </button>
              </>
            ) : (
              <span className="px-3 py-1 bg-indigo-500 rounded">
                Painel Admin
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span>{user.email}</span>
            <button
              onClick={() => setUser(null)}
              className="px-3 py-1 bg-indigo-500 rounded hover:bg-indigo-400"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto py-8">
        {user.role === 'admin' ? (
          <AdminDashboard />
        ) : (
          <ProductList 
            showPurchased={showPurchased} 
            onSupportRequest={setSelectedProduct}
            userId={user.email}
          />
        )}
      </main>

      {user.role === 'customer' && (
        <ChatInterface supportProduct={selectedProduct} />
      )}
    </div>
  );
}