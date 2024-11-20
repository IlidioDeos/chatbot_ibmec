import React, { useEffect, useState } from 'react';
import { Package, ShoppingCart, MessageCircle, RefreshCw } from 'lucide-react';
import { Product } from '../types';
import { getProducts, createPurchase, getPurchases } from '../services/api';

interface ProductListProps {
  showPurchased?: boolean;
  onSupportRequest?: (product: Product) => void;
  userId?: string;
}

export default function ProductList({ 
  showPurchased = false,
  onSupportRequest,
  userId
}: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [purchasedProductIds, setPurchasedProductIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  
  const loadPurchases = async () => {
    if (!userId) return;
    try {
      const response = await getPurchases(userId);
      const purchasedIds = response.data.map((purchase: any) => purchase.Product.id);
      setPurchasedProductIds(purchasedIds);
    } catch (error) {
      console.error('Error loading purchases:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const productsResponse = await getProducts();
        setProducts(productsResponse.data);
        if (userId) {
          await loadPurchases();
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId, showPurchased]);
  
  const handlePurchase = async (productId: string) => {
    if (!userId || purchasing) return;

    try {
      setPurchasing(true);
      await createPurchase({
        productId,
        customerId: userId,
        quantity: 1
      });
      await loadPurchases(); // Recarregar as compras após uma nova compra
      alert('Produto comprado com sucesso!');
    } catch (error) {
      console.error('Error making purchase:', error);
      alert('Erro ao realizar a compra. Por favor, tente novamente.');
    } finally {
      setPurchasing(false);
    }
  };

  const handleSupport = (product: Product) => {
    onSupportRequest?.(product);
  };

  const displayProducts = showPurchased
    ? products.filter(p => purchasedProductIds.includes(p.id))
    : products;

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Package className="text-indigo-600" size={24} />
        <h1 className="text-2xl font-bold text-gray-800">
          {showPurchased ? 'Meus Produtos' : 'Produtos Disponíveis'}
        </h1>
      </div>

      {displayProducts.length === 0 && showPurchased && (
        <p className="text-gray-600 text-center py-8">
          Você ainda não comprou nenhum produto.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
          >
            <div className="p-6 flex-1">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-indigo-600">
                  R$ {Number(product.price).toFixed(2)}
                </span>
                <span className="text-sm text-gray-500">Região: {product.region}</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t">
              <div className="space-y-2">
                {showPurchased ? (
                  <>
                    <button
                      onClick={() => handlePurchase(product.id)}
                      disabled={purchasing}
                      className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                      <RefreshCw size={20} />
                      Comprar Novamente
                    </button>
                    <button
                      onClick={() => handleSupport(product)}
                      className="w-full flex items-center justify-center gap-2 bg-white border border-indigo-600 text-indigo-600 py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors"
                    >
                      <MessageCircle size={20} />
                      Suporte
                    </button>
                  </>
                ) : (
                  <>
                    {purchasedProductIds.includes(product.id) ? (
                      <div className="w-full flex items-center justify-center gap-2 bg-green-100 text-green-800 py-2 px-4 rounded-lg">
                        <ShoppingCart size={20} />
                        Produto já adquirido
                      </div>
                    ) : (
                      <button
                        onClick={() => handlePurchase(product.id)}
                        disabled={purchasing}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                      >
                        <ShoppingCart size={20} />
                        {purchasing ? 'Processando...' : 'Comprar'}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}