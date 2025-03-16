import { useEffect, useState } from "react";
import { getProductsRequest } from "../api/auth";

const ProductsList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsRequest();
        setProducts(data.products || data); // Asumiendo que los productos están en 'data.products'
      } catch (error) {
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Cargando productos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Lista de Productos
      </h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <header>
                <h3 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>
                <p className="text-gray-600 line-clamp-2">{product.description}</p>
              </header>
              <div className="flex-grow mt-4">
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">Precio:</span> ${product.price}
                </div>
              </div>
              <footer className="mt-4 flex justify-between">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">
                  Editar
                </button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all">
                  Ver Detalles
                </button>
              </footer>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No se encontraron productos.</p>
      )}
    </div>
  );
};

export default ProductsList;
