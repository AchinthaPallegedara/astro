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
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";
import { Palette } from "lucide-react";
import Link from "next/link";

const colours = [
  { name: "blue", value: "#2e3bde" },
  { name: "green", value: "#2ede3e" },
  { name: "yellow", value: "#deb22e" },
  { name: "purple", value: "#ae2ede" },
];

const formSchema = z.object({
  title: z.string().min(2).max(50),
  discription: z.string().min(2).max(50),
  backgroundImage: z.string().url(),
  colour: z.string().min(2).max(50),
});

const Type2Page = () => {
  const [selectType, setSelectType] = useState<string>("Do You Know");
  const [selectedColour, setSelectedColour] = useState<string>("#deb22e");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      discription: "",
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

  const [_, convert, ref] = useToPng<HTMLDivElement>({
    quality: 1.0,
    onSuccess: (data) => {
      const link = document.createElement("a");
      link.download = "test.jpeg";
      link.href = data;
      link.click();
    },
  });

  return (
    <div className="flex w-full min-h-screen my-10 mx-5 justify-between max-sm:flex-col">
      <div className=" px-10">
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
            <p>Choose post type</p>
            <div className=" flex justify-between items-center my-8 space-x-8">
              <div
                className={` ring-slate-200 ring-1 p-2 w-full rounded-lg shadow flex items-center justify-center cursor-pointer hover:ring-slate-600 hover:shadow-md hover:ring-2 ${
                  selectType === "Astro News"
                    ? "ring-slate-600 ring-2 shadow-md"
                    : ""
                }`}
                onClick={() => setSelectType("Astro News")}
              >
                <p className="text-sm">Astro News</p>
              </div>
              <div
                className={` ring-slate-200 ring-1 p-2 w-full rounded-lg shadow flex items-center justify-center cursor-pointer hover:ring-slate-600 hover:shadow-md hover:ring-2 ${
                  selectType === "Do You Know" ? "ring-slate-600 ring-2 " : ""
                }`}
                onClick={() => setSelectType("Do You Know")}
              >
                <p className="text-sm">Do You Know</p>
              </div>
            </div>

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
                  name="discription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="" className="h-32" {...field} />
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
                <FormField
                  control={form.control}
                  name="colour"
                  render={() => (
                    <FormItem>
                      <FormLabel>Choose colour</FormLabel>
                      <FormControl>
                        <div className="flex space-x-5">
                          {colours.map((colour) => (
                            <div
                              key={colour.name}
                              style={{ backgroundColor: colour.value }}
                              className={`size-10 hover:ring-2 ring-black rounded-full ${
                                selectedColour === colour.value ? "ring-2" : ""
                              }`}
                              onClick={() => setSelectedColour(colour.value)}
                            />
                          ))}
                          <Popover>
                            <PopoverTrigger>
                              <div
                                style={{ backgroundColor: selectedColour }}
                                className={`w-10 h-10 rounded-full  text-white items-center justify-center flex`}
                              >
                                <Palette />
                              </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-grow   resposive">
                              <HexColorPicker
                                color={selectedColour}
                                onChange={setSelectedColour}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
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
      <div className="mr-20 max-sm:mr-0">
        <div className="p-5 border border-slate-200 rounded-lg shadow ">
          <div
            className="relative w-[800px] h-[800px] bg-blue-100 overflow-hidden "
            ref={ref}
          >
            <div className="flex flex-col  space-y-5 absolute top-10 left-10 text-white z-10">
              <div
                className={`text-7xl font-semibold text-white w-[500px] border-l-8 pl-5`}
                style={{ borderColor: selectedColour }}
              >
                {selectType === "Do You Know" ? (
                  <h3>DO YOU KNOW</h3>
                ) : (
                  <h3>
                    Astro <br /> News
                  </h3>
                )}
              </div>
              <div className=" font-medium w-[600px]">
                <h1 className="text-left text-5xl font-semibold">
                  {form.watch("title") || "Lorem Ipsum simply "}
                </h1>
                <div className="w-40 h-1 bg-white mt-2" />
              </div>
              <div className=" font-light w-[500px] h-grow z-10">
                <h1 className="text-left text-2xl">
                  {form.watch("discription") ||
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently "}
                </h1>
              </div>
            </div>

            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex justify-center w-full h-64 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
            <div
              className="absolute -top-[120px] -right-[120px] size-56 rotate-45 "
              style={{ backgroundColor: selectedColour }}
            />
            <PostFooter />
            <Image
              src="/type2bg.svg"
              alt="image"
              width={800}
              height={800}
              className="absolute top-0 left-0 w-full h-full opacity-75 "
            />
            <Image
              src={imageUrl || "/astoroimg.jpg"}
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

export default Type2Page;
