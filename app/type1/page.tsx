"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { useToPng } from "@hugocxl/react-to-image";
import Image from "next/image";
import PostFooter from "@/components/postFooter";
import Link from "next/link";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  backgroundImage: z.string().url(),
});

const Page = () => {
  const [imageUrl, setImageUrl] = useState<string>("/astoroimg.jpg");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      backgroundImage: "",
    },
  });

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setImageUrl(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const [{ isSuccess }, convert, ref] = useToPng<HTMLDivElement>({
    quality: 1.0,
    onSuccess: (data) => {
      const link = document.createElement("a");
      link.download = "test.jpeg";
      link.href = data;
      link.click();
    },
  });

  return (
    <div className="flex w-full min-h-screen my-10 mx-10 max-sm:flex-col">
      <div className="w-[40%] px-20 max-sm:px-1 max-sm:w-full">
        <Link href={"/"}>
          <Button className="m-2" variant="outline">
            Back
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Template Properties</CardTitle>
            <CardDescription>
              Customize your image by changing the properties.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Astrophysical Jets" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="backgroundImage"
                  render={() => (
                    <FormItem>
                      <FormLabel>Background Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex items-center justify-end">
            <Button onClick={convert}>Download</Button>
          </CardFooter>
        </Card>
      </div>
      <div>
        <div className="p-5 border border-slate-200 rounded-lg shadow">
          <div className="relative w-[800px] h-[800px] bg-blue-100" ref={ref}>
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex justify-center w-full h-64 bg-gradient-to-t from-black via-black/80 to-transparent">
              <div className="flex flex-col items-center mt-28">
                <h1 className="text-[4.35rem] font-bold text-white">
                  {form.watch("title") || "Astrophysical Jets"}
                </h1>
                <div className="w-40 h-1 bg-white" />
              </div>
            </div>
            <PostFooter />
            <Image
              src={imageUrl}
              alt="image"
              width={800}
              height={800}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
