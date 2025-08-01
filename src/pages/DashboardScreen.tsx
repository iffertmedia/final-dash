import { FaUser } from 'react-icons/fa';
import React, { useEffect } from 'react';
// [converted from react-native] import { div, span, FlatList, spanInput, RefreshControl, Dimensions } from 'react-native';
import { useProductStore } from '../state/useProductStore';
import { ProductCard } from '../components/ProductCard';
import { LogoFooter } from '../components/LogoFooter';
import { CategoryFilter } from '../components/CategoryFilter';
import { fetchProductsWithFallback } from '../services/googleSheets';
import { cn } from '../utils/cn';

const width = window.innerWidth;
const cardWidth = (width - 48) / 2; // 2 cards per row with 16px padding on sides and 16px gap

export const DashboardScreen: React.FC = () => {
  const { 
    products, 
    setProducts, 
    searchQuery, 
    setSearchQuery, 
    filteredProducts,
    adminspans
  } = useProductStore();

  const headerspan = adminspans.find(t => t.key === 'dashboard-header')?.content || 'TikTok Shop Affiliate Dashboard';
  const subtitlespan = adminspans.find(t => t.key === 'dashboard-subtitle')?.content || 'Tap products to get higher commissions';

  useEffect(() => {
    // Load products data on first render
    const loadProducts = async () => {
      if (products.length === 0) {
        try {
          const fetchedProducts = await fetchProductsWithFallback();
          setProducts(fetchedProducts);
        } catch (error) {
          console.error('Failed to load products:', error);
        }
      }
    };

    loadProducts();
  }, [products.length, setProducts]);

const handleRefresh = async () => {
  try {
    const fetchedProducts = await fetchProductsWithFallback();
    setProducts(fetchedProducts);
  } catch (error) {
    console.error('Refresh failed:', error);
  }
};

  <button
  onClick={handleRefresh}
  className="mt-2 px-4 py-2 bg-black text-white rounded"
>
  Refresh Products
</button>

  const renderProduct = ({ item, index }: { item: typeof mockProducts[0], index: number }) => (
    <ProductCard 
      product={item} 
      style={{ width: cardWidth }}
      className={cn(
        "mb-4",
        index % 2 === 0 ? "mr-2" : "ml-2"
      )}
    />
  );

  const displayedProducts = filteredProducts();

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div 
        className="bg-white px-4 pb-4 border-b border-gray-100"
        style={{ paddingTop: 16 }}
      >
        {/* Title */}
        <span className="text-2xl font-bold text-gray-900 mb-2">
          {headerspan}
        </span>
        <span className="text-gray-600 mb-4">
          {subtitlespan}
        </span>

        {/* Search Bar */}
        <div className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
          <span role="img" aria-label="search">🔍</span>
          <spanInput
  placeholder="Search products..."
  value={searchQuery}
  onChangespan={setSearchQuery}
  className="flex-1 ml-2 text-base"
  placeholderspanColor="#9ca3af"
/>
          {searchQuery.length > 0 && (
            <Ionicons 
              name="close-circle" 
              size={20} 
              color="#6b7280" 
              onPress={() => setSearchQuery('')}
            />
          )}
        </div>
      </div>

      {/* Category Filter */}
      <CategoryFilter />

      {/* Products Grid */}
<div className="grid grid-cols-2 gap-4 px-4 pt-4 pb-[100px]">
  {displayedProducts.map((product, index) => (
    <ProductCard
      key={product.id}
      product={product}
      style={{ width: cardWidth }}
      className={cn(index % 2 === 0 ? "mr-2" : "ml-2")}
    />
  ))}
</div>
  );
};

export default DashboardScreen;
