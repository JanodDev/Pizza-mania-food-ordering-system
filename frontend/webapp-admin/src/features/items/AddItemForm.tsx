'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Image } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import useCreateItems from './useCreateItems';

import useUpdateItems from './useUpdateItems';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const formSchema = z
  .object({
    itemName: z.string().min(2, {
      message: 'Food name must be at least 2 characters.',
    }),
    itemPrice: z.coerce
      .number()
      .positive()
      .transform((val) => Number(val)), // Transform string to number
    itemDiscount: z.coerce
      .number()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), {
        message: 'Must be a valid number',
      }),
    itemDescription: z.string().min(10, {
      message: 'Food description should have a nice message.',
    }),
    itemImage: z
      .custom<FileList>()
      .refine((files) => files?.length === 1, 'Image is required.')
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        `Max file size is 5MB.`,
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.',
      ),
  })
  .refine((data) => Number(data.itemDiscount) < Number(data.itemPrice), {
    message: 'Discount must be less than item price',
    path: ['itemDiscount'], // Show error on itemDiscount field
  });

export default function AddItemForm({
  onClose = () => {},
  isEditing = false,
  initialData = null,
}) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { createNewPizza, isCreating } = useCreateItems();

  const { updateExistingPizza, isUpdating } = useUpdateItems(); // You'll need to create this hook

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: initialData?.name || 'Food Item Name',
      itemPrice: initialData?.price || 5,
      itemDiscount: initialData?.discount || 0,
      itemDescription: initialData?.description || 'This is about meal',
    },
  });

  // Update form values when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset({
        itemName: initialData.name,
        itemPrice: initialData.price,
        itemDiscount: initialData.discount,
        itemDescription: initialData.description || '',
      });
      setImagePreview(initialData.image || null);
    }
  }, [initialData, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    // You can destructure and rename the properties like this:
    const {
      itemName: name,
      itemPrice: price,
      itemDiscount: discount,
      itemDescription: description,
    } = values;

    // Then create a new object with the renamed properties
    const newPizza = {
      name,
      price,
      discount,
      description,
      category: 'pizza',
    };

    console.log(newPizza);
    // createNewPizza(newPizza);

    if (isEditing) {
      console.log(newPizza);
      updateExistingPizza({ id: initialData._id, updatedPizza: newPizza });
    } else {
      createNewPizza(newPizza);
    }
    onClose?.(); // Close the dialog after successful submission
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="itemName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Food / Item Name</FormLabel>
              <FormControl>
                <Input placeholder="Your item name" {...field} />
              </FormControl>
              <FormDescription>
                Please enter your item or food name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itemPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Price</FormLabel>
              <FormControl>
                <Input placeholder="Your item price" {...field} />
              </FormControl>
              <FormDescription>Please enter your item price.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itemDiscount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Discount</FormLabel>
              <FormControl>
                <Input placeholder="Your item discount" {...field} />
              </FormControl>
              <FormDescription>
                Please enter your item discount.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itemDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about this meal"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please enter discription for this item
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="itemImage"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Item Image</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      onChange(e.target.files);
                      handleImageChange(e);
                    }}
                    {...field}
                  />
                  {imagePreview ? (
                    <div className="mt-4 rounded-md border p-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-auto max-w-[200px]"
                      />
                    </div>
                  ) : (
                    <div className="flex h-32 w-full items-center justify-center rounded-md border-2 border-dashed">
                      <div className="text-center">
                        <Image className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          Upload your food image
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Upload an image of your food item (max 5MB, JPG/PNG/WebP)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
