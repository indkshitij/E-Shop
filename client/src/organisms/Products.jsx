import React, { useContext, useEffect } from "react";
import Card from "../atoms/Card";
import { AppContext } from "../Context/AppContext";

const Products = () => {
  const { products, getProducts, loadingProducts } = useContext(AppContext);

  useEffect(() => {
    getProducts();
        document.title = "Products | E-Shop";

  }, []);

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
        All Products
      </h1>

      {loadingProducts && (
        <p className="text-center text-gray-500 mt-10 text-lg">
          Loading products...
        </p>
      )}

      {!loadingProducts && products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      ) : (
        !loadingProducts && (
          <p className="text-center text-gray-500 mt-10 text-lg">
            No products available.
          </p>
        )
      )}
    </div>
  );
};

export default Products;
