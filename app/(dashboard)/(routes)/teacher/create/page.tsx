"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

const CreatePage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const router = useRouter();

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);

      router.push(`/teacher/courses/${response.data.id}`);
      toast.success("Course created");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex h-full max-w-5xl p-6 mx-auto md:justify-center md:items-center ">
      <div>
        <h1 className="text-2xl">Name your course</h1>
        <p>Give your course a name, so you can easily find it later.</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Course title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g Introduction to React"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will students learn in this course?
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button variant="ghost" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
