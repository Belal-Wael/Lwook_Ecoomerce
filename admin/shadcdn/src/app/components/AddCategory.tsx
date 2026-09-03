'use client'
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useForm } from 'react-hook-form'

import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from './ui/input';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from './ui/button';
import { toast } from 'sonner';


const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Category name is required" })
    .max(50),
});

const AddCategory = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleAddCategory = async (value: z.infer<typeof formSchema>) => {
    try {
      const payload = {
        ...value,
        name: value.name.trim().toUpperCase(),
      };
      const response = await fetch(`http://localhost:3000/api/category`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });

      if (response.status > 201) {
        const data = await response.json()
        toast.success(data.message)
      }
      else {
        toast.success('Category Added Successfully')
        form.reset();
        console.log(await response.json())

      }
    } catch (error) {
      console.log(error)
      toast.error('Something Went Wrong')
    }
  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-4">Add Category</SheetTitle>
        <SheetDescription asChild>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(handleAddCategory)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter Category name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default AddCategory;