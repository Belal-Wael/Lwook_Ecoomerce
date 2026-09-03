'use client'
import { useEffect, useState } from 'react'
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useForm } from 'react-hook-form'

import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from './ui/input';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from './ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';
import { Spinner } from "@/components/ui/spinner"
import { Check, X } from 'lucide-react'

const colors = [
  "Red",
  "Blue",
  "Green",
  "Black",
  "White",
  "Yellow",
  "Purple",
  "Orange",
  "Pink",
] as const;
const sizes = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
] as const;


const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Product name is required" })
  ,
  shortDescription: z.string().min(1, { message: "Short description is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.string()
    .min(1, { message: "Price is required" })
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Price must be a valid positive number"
    }),
  categoryId: z.string().min(1, "Category is required"),
  colors: z
    .array(z.enum(colors))
    .min(1, "At least one color is required"),
  sizes: z.array(z.enum(sizes)).min(1, { message: "At least one size is required" }),
  images: z.record(z.string(), z.string()).optional()
});

const AddProduct = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [uploadStatus, setUploadStatus] = useState<
    Record<string, 'idle' | 'loading' | 'success' | 'error'>
  >({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      description: "",
      price: "",
      sizes: [],
      colors: [],
      images: {},
    }
  });

  const handleGetCategory = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/category`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

      if (response.status == 200) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something Went Wrong')
    }
  }
  const uploadImage = async (file: File, color: typeof colors[number]) => {
    try {
      setUploadStatus(prev => ({
        ...prev,
        [color]: 'loading'
      }));
      const formData = new FormData();
      formData.append("image", file)
      console.log(file)
      const res = await fetch(`http://localhost:3000/api/uploadClodinary`, {
        method: 'POST',
        body: formData
      })
      if (res.status == 201) {
        const data = await res.json();
        form.setValue(`images.${color}`, data.url);
        setUploadStatus(prev => ({
          ...prev,
          [color]: 'success'
        }));
      } else {
        setUploadStatus(prev => ({
          ...prev,
          [color]: 'error'
        }));
      }
    } catch {
      setUploadStatus(prev => ({
        ...prev,
        [color]: 'error'
      }));
    }

  }

  const handleAddProduct = async (data: z.infer<typeof formSchema>) => {
    if (isSubmitting) return;
    console.log(data)
    setIsSubmitting(true);
    try {
      // Validate price is a valid number
      const priceNum = parseFloat(data.price);
      if (isNaN(priceNum) || priceNum <= 0) {
        toast.error("Please enter a valid price");
        setIsSubmitting(false);
        return;
      }

      // Convert price to number and map field names
      const productData = {
        ...data,
        price: priceNum,
        colors: Object.keys(data.images || {}).map((color: string) => {
          return {
            name: color as typeof colors[number],
            imgURL: data.images?.[color as typeof colors[number]]
          }
        })
      };
      console.log(productData)

      const res = await fetch(`http://localhost:3000/api/productManagment`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData)
      });
      console.log(await res.json())
      if (res.status === 201) {
        toast.success("Product added successfully");
        form.reset();
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.message || "Something went wrong");
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    handleGetCategory();
  }, [])

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="mb-4">Add Product</SheetTitle>
        <SheetDescription asChild>
          <Form {...form} >
            <form className="space-y-4" onSubmit={form.handleSubmit(handleAddProduct)} noValidate>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter Product name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter short description of the product.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter detailed description of the product.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the product price.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select value={field.value}
                        onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {
                              categories.map((cat) =>
                                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                              )
                            }

                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Select the order status.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sizes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sizes</FormLabel>
                    <FormControl>
                      <div className='grid grid-cols-3 gap-4 my-2'>
                        {
                          sizes.map((size) =>
                            <div key={size} className='flex items-center gap-2'>
                              <Checkbox id='size' checked={field.value?.includes(size)} onCheckedChange={(checked) => {
                                const currentValues = field.value || [];
                                if (checked) {
                                  field.onChange([...currentValues, size])
                                } else {
                                  field.onChange(
                                    currentValues.filter((v) => v !== size)
                                  )
                                }
                              }} />
                              <label htmlFor={"size"} className='text-sm'>{size}</label>
                            </div>
                          )
                        }
                      </div>
                    </FormControl>
                    <FormDescription>
                      Select the order Size.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Colors</FormLabel>
                    <FormControl>
                      <div className='space-y-4'>
                        <div className='grid grid-cols-3 gap-4 my-2'>
                          {
                            colors.map((color) =>
                              <div key={color} className='flex items-center gap-2'>
                                <Checkbox id={`color-${color}`} checked={field.value?.includes(color)} onCheckedChange={(checked) => {
                                  const currentValues = field.value || [];
                                  if (checked) {
                                    field.onChange([...currentValues, color])
                                  } else {
                                    field.onChange(
                                      currentValues.filter((v) => v !== color)
                                    )
                                  }
                                }} />
                                <label htmlFor={`color-${color}`} className='text-sm flex items-center gap-2'>
                                  <div className='w-2 h-2 rounded-full' style={{ background: color }} />
                                  {color}
                                </label>
                              </div>
                            )
                          }
                        </div>
                        {
                          field.value && field.value.length > 0 && (
                            <div className=' gap-4 mt-8 space-y-4'>
                              <p className='text-sm font-medium'>upload Images For Selected Colors</p>
                              {
                                field.value.map(color =>
                                  <div key={color} className='flex items-center gap-2'>
                                    <div className='w-2 h-2 rounded-full' style={{ background: color }} />
                                    <span className='text-sm min-w-[60px]'>{color}</span>
                                    {uploadStatus[color] === 'loading' && <Spinner />}

                                    {uploadStatus[color] === 'error' && (
                                      <X color="red" size={20} />
                                    )}

                                    {uploadStatus[color] === 'success' && (
                                      <Check color="green" size={20} />
                                    )}
                                    <Input type='file' accept='image/*' onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (!file) return;
                                      uploadImage(file, color);
                                    }} />
                                  </div>
                                )
                              }
                            </div>
                          )
                        }
                      </div>
                    </FormControl>
                    <FormDescription>
                      Select the order Size.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default AddProduct;