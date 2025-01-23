import React from 'react';
import { ShoppingCart } from 'lucide-react';
import Modal from '../Modal';
import { useGetProducts } from '../../hooks/useGetProducts';
import { useCart } from '../../context/CartContext';

export default function MenuItems() {
  const { addItem, getItemQuantity } = useCart();

  const transformServerData = (productData) => {
    if (!productData) return [];
    return productData.map((product) => ({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      isNew: false,
      description: product.description,
      discount: product.discount,
    }));
  };

  const { isLoading, productData, error } = useGetProducts();
  const transformedPizzas = transformServerData(productData);
  const pizzas = transformedPizzas;

  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return price;
    return price - price * (discount / 100);
  };

  const handleAddToCart = (e, pizza) => {
    e.stopPropagation(); // Prevent modal from opening
    const finalPrice = calculateDiscountedPrice(pizza.price, pizza.discount);
    addItem({ ...pizza, price: finalPrice });
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {pizzas.map((pizza) => (
          <Modal key={pizza.name}>
            <Modal.Open open="details">
              <div className="relative rounded-lg bg-white p-4 shadow-md">
                {pizza.isNew && (
                  <span className="absolute left-2 top-2 z-10 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                    NEW
                  </span>
                )}

                {pizza.discount > 0 && (
                  <span className="absolute right-2 top-2 z-10 rounded-full bg-green-500 px-2 py-1 text-xs text-white">
                    {pizza.discount}% OFF
                  </span>
                )}

                <div className="relative mb-4">
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="h-48 w-full rounded-lg object-cover"
                  />
                </div>

                <div className="mb-2 flex items-start justify-between">
                  <h3 className="text-lg font-semibold">{pizza.name}</h3>
                  <button
                    onClick={(e) => handleAddToCart(e, pizza)}
                    className="relative rounded-full p-2 transition-colors hover:bg-gray-100"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {getItemQuantity(pizza.id) > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {getItemQuantity(pizza.id)}
                      </span>
                    )}
                  </button>
                </div>

                <div className="space-y-1">
                  {pizza.discount > 0 ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 line-through">
                          Rs {pizza.price.toLocaleString()}
                        </span>
                        <span className="rounded-md bg-green-100 px-2 py-1 text-xs text-green-800">
                          Save {pizza.discount}%
                        </span>
                      </div>
                      <div className="font-semibold text-green-600">
                        Rs{' '}
                        {calculateDiscountedPrice(
                          pizza.price,
                          pizza.discount,
                        ).toLocaleString()}
                      </div>
                    </>
                  ) : (
                    <div className="font-semibold text-green-600">
                      Rs {pizza.price.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            </Modal.Open>

            <Modal.Window name="details">
              <div className="w-full rounded-lg bg-white p-8 shadow-md">
                <div className="mb-4 flex justify-center">
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="h-48 w-48 rounded-lg object-cover"
                  />
                </div>
                <div className="mb-2">
                  <h3 className="text-lg font-semibold">{pizza.name}</h3>
                  {pizza.discount > 0 ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 line-through">
                          Rs {pizza.price.toLocaleString()}
                        </span>
                        <span className="rounded-md bg-green-100 px-2 py-1 text-sm text-green-800">
                          {pizza.discount}% OFF
                        </span>
                      </div>
                      <div className="font-semibold text-green-600">
                        Rs{' '}
                        {calculateDiscountedPrice(
                          pizza.price,
                          pizza.discount,
                        ).toLocaleString()}
                      </div>
                    </div>
                  ) : (
                    <div className="font-semibold text-green-600">
                      Rs {pizza.price.toLocaleString()}
                    </div>
                  )}
                  <p className="mt-2">{pizza.description}</p>
                </div>
                <div className="flex justify-center">
                  <button
                    className="rounded-md bg-secondaryRed px-4 py-2 text-white hover:bg-red-700"
                    onClick={(e) => handleAddToCart(e, pizza)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </Modal.Window>
          </Modal>
        ))}
      </div>
    </div>
  );
}
