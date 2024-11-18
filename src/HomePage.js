import React, { useState } from 'react';
import { ShoppingCart, Leaf } from 'lucide-react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SecondPage from './SecondPage';
import HomePage from './HomePage';

const products = {
  Aldi: [
    { id: 1, name: 'Organic Kale', price: 3.99, image: '1.png', vegan: true, ecological: true },
    { id: 2, name: 'Carrots', price: 2.49, image: '2.png', vegan: true, ecological: false },
    { id: 3, name: 'Heirloom Tomatoes', price: 4.99, image: '3.png', vegan: true, ecological: true },
    { id: 10, name: 'Spinach', price: 3.49, image: '4.png', vegan: false, ecological: true },
    { id: 11, name: 'Bell Peppers', price: 2.99, image: '5.png', vegan: true, ecological: false },
    { id: 12, name: 'Cucumber', price: 1.99, image: '6.png', vegan: false, ecological: true },
    { id: 13, name: 'Broccoli', price: 3.29, image: '7.png', vegan: true, ecological: true },
    { id: 14, name: 'Eggplant', price: 2.79, image: '8.png', vegan: false, ecological: false },
    { id: 15, name: 'Zucchini', price: 2.59, image: '9.png', vegan: true, ecological: true }
  ],
  Carrefour: [
    { id: 11, name: 'Bell Peppers', price: 2.99, image: '5.png', vegan: true, ecological: false },
    { id: 1, name: 'Organic Kale', price: 3.99, image: '1.png', vegan: true, ecological: true },
    { id: 13, name: 'Broccoli', price: 3.29, image: '7.png', vegan: true, ecological: true },
    { id: 14, name: 'Eggplant', price: 2.79, image: '8.png', vegan: false, ecological: false },
    { id: 2, name: 'Carrots', price: 2.49, image: '2.png', vegan: true, ecological: false },
    { id: 12, name: 'Cucumber', price: 1.99, image: '6.png', vegan: false, ecological: true },
    { id: 10, name: 'Spinach', price: 3.49, image: '4.png', vegan: false, ecological: true },
    { id: 15, name: 'Zucchini', price: 2.59, image: '9.png', vegan: true, ecological: true }
  ],
  ecologicalmarket: [
    { id: 3, name: 'Heirloom Tomatoes', price: 4.99, image: '3.png', vegan: true, ecological: true },
    { id: 14, name: 'Eggplant', price: 2.79, image: '8.png', vegan: false, ecological: false },
    { id: 10, name: 'Spinach', price: 3.49, image: '4.png', vegan: false, ecological: true },
    { id: 11, name: 'Bell Peppers', price: 2.99, image: '5.png', vegan: true, ecological: false },
    { id: 1, name: 'Organic Kale', price: 3.99, image: '1.png', vegan: true, ecological: true },
    { id: 2, name: 'Carrots', price: 2.49, image: '2.png', vegan: true, ecological: false },
    { id: 12, name: 'Cucumber', price: 1.99, image: '6.png', vegan: false, ecological: true },
    { id: 13, name: 'Broccoli', price: 3.29, image: '7.png', vegan: true, ecological: true },
    { id: 15, name: 'Zucchini', price: 2.59, image: '9.png', vegan: true, ecological: true }
  ]
};

const EcoFoodMarketplace = () => {
  const [activeCategory, setActiveCategory] = useState('Aldi');
  const [filters, setFilters] = useState({
    vegan: false,
    ecological: false,
    minPrice: 0,
    maxPrice: 8
  });

  const toggleFilter = (filterType) => {
    setFilters((prev) => ({ ...prev, [filterType]: !prev[filterType] }));
  };

  const handlePriceChange = (e, type) => {
    const value = parseFloat(e.target.value) || 0;
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const filteredProducts = products[activeCategory].filter((product) =>
    (!filters.vegan || product.vegan) &&
    (!filters.ecological || product.ecological) &&
    product.price >= filters.minPrice &&
    product.price <= filters.maxPrice
  );

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-green-600 text-white p-4 flex justify-start gap-4 items-center">
        <div className="flex items-center space-x-4">
          <Leaf size={32} className="text-white" />
          <h1 className="text-2xl font-bold">Eco Shop</h1>
        </div>
      <Link to="/second" className='text-2xl'>Compare</Link>
      <Link to="/" className='text-2xl'>Shop</Link>
      </nav>

      {/* Categories */}
      <div className="bg-green-100 flex justify-center space-x-6 p-4">
        {Object.keys(products).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded ${
              activeCategory === category
                ? 'bg-green-600 text-white'
                : 'bg-green-200 text-green-800'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col items-center space-y-4 p-4 bg-green-50">
        <div className="flex space-x-4">
          <button
            onClick={() => toggleFilter('vegan')}
            className={`px-4 py-2 rounded ${
              filters.vegan ? 'bg-green-600 text-white' : 'bg-green-200 text-green-800'
            }`}
          >
            Vegan Only
          </button>
          <button
            onClick={() => toggleFilter('ecological')}
            className={`px-4 py-2 rounded ${
              filters.ecological
                ? 'bg-green-600 text-white'
                : 'bg-green-200 text-green-800'
            }`}
          >
            Ecological Only
          </button>
        </div>
        <div className="w-full max-w-md">
          <label className="block text-green-700 mb-2">
            Price Range:
          </label>
          <div className="flex space-x-4">
            <div className="flex flex-col items-center w-1/2">
              <label className="text-green-700 mb-1">Min</label>
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => handlePriceChange(e, 'minPrice')}
                min="0"
                step="0.1"
                className="border rounded px-2 py-1 w-full"
                placeholder="Min Price"
              />
            </div>
            <div className="flex flex-col items-center w-1/2">
              <label className="text-green-700 mb-1">Max</label>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => handlePriceChange(e, 'maxPrice')}
                min="0"
                step="0.1"
                className="border rounded px-2 py-1 w-full"
                placeholder="Max Price"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <main className="grid grid-cols-3 gap-6 p-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md text-center">
            <img src={`/images/${product.image}`}
             alt={product.name}
              className="mx-auto mb-4 w-48 h-48 object-cover"
            />
            <h3 className="text-lg font-semibold text-green-700">{product.name}</h3>
            <div className="flex justify-center space-x-2 mb-2">
              {product.vegan && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                  Vegan
                </span>
              )}
              {product.ecological && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  Ecological
                </span>
              )}
            </div>
            <p className="text-green-600 mb-4">${product.price.toFixed(2)}</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full">
              Buy Now
            </button>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-green-800 text-white p-8 text-center">
        <p> 2024 Eco Shop - Sustainable Food Marketplace</p>
      </footer>
    </div>
  );
};

export default EcoFoodMarketplace;
