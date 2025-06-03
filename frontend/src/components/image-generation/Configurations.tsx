// app/page.tsx or any component
"use client";

import Image from "next/image";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { useLoaderStore, useImageStore } from "@/lib/store/useLoaderStore";
import Loader from "../loader";
import imaage from "../../../public/hero-images/Charismatic Young Man with a Warm Smile and Stylish Tousled Hair.jpeg";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Slider } from "../ui/slider";

const formSchema = z.object({
  model: z.string({
    required_error: "Model is required!",
  }),
  prompt: z.string({
    required_error: "Prompt is required!",
  }),

  guidance: z.number({
    required_error: "Guidance scale is required!",
  }),
  num_outputs: z
    .number()
    .min(1, { message: "Number of output should be atleast 1" })
    .max(4, { message: "Number of output should be less than 4" }),
  aspect_ratio: z.string({
    required_error: "Aspect ratio scale is required!",
  }),
  output_format: z.string({
    required_error: "Output Format scale is required!",
  }),
  output_quality: z
    .number()
    .min(1, { message: "Output quality should be atleast 1" })
    .max(100, {
      message: "Output quality should be less than or equal to 100",
    }),
  num_inference_steps: z
    .number()
    .min(1, { message: "Num inference steps should be atleast 1" })
    .max(50, {
      message: "Num inference steps should be less than or equal to 50",
    }),
});

export default function Configuration() {
  const { isLoading, setIsLoading } = useLoaderStore();
  const { image, setImage } = useImageStore();
  console.log("generated image in configure: ", image);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "",
      prompt: "",
      guidance: 3.5,
      num_outputs: 1,
      aspect_ratio: "",
      output_format: "jpg",
      output_quality: 80,
      num_inference_steps: 28,
    },
  });
  const generate = async () => {
    const {prompt} = form.getValues();
    console.log(prompt, "prompt")
    setIsLoading(true);
    const res = await fetch("http://127.0.0.1:8000/generate_image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    if (!res.ok) {
      setImage("Failed to generate image");
    }
    const data = await res.json();
    console.log(data, "data");
    setImage(data.image);
    setIsLoading(false);
  };

  return (
    <div className="h-screen px-10 flex flex-col justify-center items-center gap-5">
      <div className="font-bold">Model Inputs</div>
      <Form {...form}>
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel />
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="Enter a prompt"
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="guidance"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                <div className="flex">
                  <div>Guidance </div>
                  <div className="ml-auto">{field.value}</div>
                </div>
              </FormLabel>
              <FormControl>
                <Slider
                  {...field}
                  defaultValue={[3.5]}
                  max={4}
                  step={0.5}
                  className="w-full"
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full gap-5">
          <FormField
            control={form.control}
            name="num_outputs"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  <div>Number of inputs </div>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Number of Outputs"
                    className="w-full"
                    min={1}
                    max={4}
                    type="number"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="aspect_ratio"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  <div className="flex">
                    <div>Aspect ratio</div>
                    {/* <div className="ml-auto">{field.value}</div> */}
                  </div>
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Aspect ratio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1:1">1:1</SelectItem>
                      <SelectItem value="16:9">16:9</SelectItem>
                      <SelectItem value="4:5">4:5</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="output_format"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                <div>Output format</div>
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="jpg etc" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jpg">jpg</SelectItem>
                    <SelectItem value="png">png</SelectItem>
                    <SelectItem value="jpeg">jpeg</SelectItem>
                    <SelectItem value="pdf">pdf</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="output_quality"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                <div className="flex">
                  <div>Output quality </div>
                  <div className="ml-auto">{field.value}</div>
                </div>
              </FormLabel>
              <FormControl>
                <Slider
                  {...field}
                  defaultValue={[1]}
                  min={1}
                  max={100}
                  step={1}
                  className="w-full ml-auto"
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="num_inference_steps"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                <div className="flex">
                  <div> Number inference steps </div>
                  <div className="ml-auto">{field.value}</div>
                </div>
              </FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[1]}
                  min={1}
                  max={50}
                  step={1}
                  className="w-full ml-auto"
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button onClick={generate} type="submit" className="w-full">
          Generate
        </Button>
      </Form>
    </div>
  );
}
