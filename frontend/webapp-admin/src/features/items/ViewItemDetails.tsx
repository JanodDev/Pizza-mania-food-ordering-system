import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Copy } from 'lucide-react';
import { useParams } from 'react-router-dom';
import useGetItem from './useGetItem';

const ViewItemDetails = () => {
  const { isLoading, data, error } = useGetItem();

  if (isLoading) return <p>Loading...</p>;

  const {
    _id,
    name,
    description,
    price,
    category,
    isPopular,
    discount,
    createdAt,
    updatedAt,
    imageUrl = '',
    __v,
  } = data;

  // Calculate discounted price
  const discountedPrice =
    discount > 0 ? price - (price * discount) / 100 : price;

  // Format prices
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
    }).format(amount);
  };

  const formattedOriginalPrice = formatPrice(price);
  const formattedDiscountedPrice = formatPrice(discountedPrice);

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-50/50 p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="space-y-0">
          <div className="mb-4 flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">{name}</CardTitle>
            {discount > 0 && (
              <Badge variant="destructive" className="text-sm">
                {discount}% OFF
              </Badge>
            )}
          </div>
          <div className="flex flex-col gap-6 md:flex-row">
            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={imageUrl}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="w-full space-y-4 md:w-1/2">
              <p className="text-gray-600">{description}</p>

              <div className="space-y-2">
                {discount > 0 ? (
                  <>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-green-600">
                        {formattedDiscountedPrice}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        {formattedOriginalPrice}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      You save: {formatPrice(price - discountedPrice)}
                    </p>
                  </>
                ) : (
                  <span className="text-3xl font-bold">
                    {formattedOriginalPrice}
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Category</span>
                  <span className="font-medium capitalize">{category}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">ID</span>
                  <div className="flex items-center gap-2">
                    <span className="max-w-[200px] truncate font-mono text-sm">
                      {_id}
                    </span>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => navigator.clipboard.writeText(_id)}
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Created</span>
                  <span className="font-medium">
                    {new Date(createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Last Updated</span>
                  <span className="font-medium">
                    {new Date(updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ViewItemDetails;
