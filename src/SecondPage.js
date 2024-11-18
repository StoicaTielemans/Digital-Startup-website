import React, { useState } from 'react';
import { ShoppingCart, Leaf } from 'lucide-react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SecondPage from './SecondPage';
import HomePage from './HomePage';

const products = [
  { id: 1, name: 'Organic Kale', price: 3.99, image: '1.png', vegan: true, ecological: true },
  { id: 2, name: 'Carrots', price: 2.49, image: '2.png', vegan: true, ecological: false },
  { id: 3, name: 'Heirloom Tomatoes', price: 4.99, image: '3.png', vegan: true, ecological: true },
  { id: 10, name: 'Spinach', price: 3.49, image: '4.png', vegan: false, ecological: true },
  { id: 11, name: 'Bell Peppers', price: 2.99, image: '5.png', vegan: true, ecological: false },
  { id: 12, name: 'Cucumber', price: 1.99, image: '6.png', vegan: false, ecological: true },
  { id: 13, name: 'Broccoli', price: 3.29, image: '7.png', vegan: true, ecological: true },
  { id: 14, name: 'Eggplant', price: 2.79, image: '8.png', vegan: false, ecological: false },
  { id: 15, name: 'Zucchini', price: 2.59, image: '9.png', vegan: true, ecological: true }
];

const ProductComparison = () => {
  const [comparedProducts, setComparedProducts] = useState([]);

  const toggleProductComparison = (product) => {
    setComparedProducts(current => {
      if (current.some(p => p.id === product.id)) {
        return current.filter(p => p.id !== product.id);
      }
      return current.length < 2 ? [...current, product] : current;
    });
  };

  const compareAttributes = [
    { label: 'Name', key: 'name' },
    { label: 'Price', key: 'price', format: (val) => `$${val.toFixed(2)}` },
    { label: 'Vegan', key: 'vegan', format: (val) => val ? '✅' : '❌' },
    { label: 'Ecological', key: 'ecological', format: (val) => val ? '✅' : '❌' }
  ];

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
      <h1 className="text-2xl font-bold mb-4">📊 Product Comparison</h1>
      
      <div className="grid grid-cols-3 gap-4">
        {/* Product Selection Grid */}
        <div className="col-span-1 space-y-2">
          {products.map(product => (
            <div 
              key={product.id} 
              onClick={() => toggleProductComparison(product)}
              className={`
                flex items-center p-2 border rounded cursor-pointer 
                ${comparedProducts.some(p => p.id === product.id) ? 'bg-blue-100 border-blue-500' : ''}
              `}
            >
            <img src={`/images/${product.image}`}
             alt={product.name}
                className="w-12 h-12 mr-2"
            />
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="col-span-2">
          {comparedProducts.length === 2 ? (
            <div className="border rounded">
              <div className="bg-gray-100 p-2 font-bold">Comparison Details</div>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2 text-left">Attribute</th>
                    {comparedProducts.map(product => (
                      <th key={product.id} className="p-2">{product.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareAttributes.map(attr => (
                    <tr key={attr.key} className="border-b">
                      <td className="p-2 font-medium">{attr.label}</td>
                      {comparedProducts.map(product => (
                        <td key={product.id} className="p-2 text-center">
                          {attr.format 
                            ? attr.format(product[attr.key]) 
                            : product[attr.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 p-4">
              Select two products to compare
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;