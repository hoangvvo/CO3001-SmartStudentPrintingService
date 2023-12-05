"use client";

import { parseResponseError } from "@/apis/error";
import { userApi } from "@/apis/user";
import imageLogoBK from "@/assets/logoBK.png";
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
import { toast } from "@/components/ui/use-toast";
import { useUserStore } from "@/stores/user.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function LoginPage() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: userApi.login,
    onSuccess(data) {
      toast({
        title: "Login successful",
        description: `Welcome back, ${data.user.name}!`,
      });
      useUserStore.getState().login(data.user);
      router.replace("/");
    },
    onError(error) {
      parseResponseError(error).then((error) => {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <div className="bg-gray-100 w-full h-screen space-y-4">
      <div className="flex flex-col gap-4 container bg-white py-4">
        <div className="flex flex-col w-full gap-6">
          <div className="flex flex-row items-center bg-blue-900 w-full">
            <Image src={imageLogoBK} alt="Logo" width={64} height={64} />
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Central Authentication Service
            </h1>
          </div>
          <div className="flex">
            <div className="w-96 p-4 bg-gray-200">
              <h2 className="text-sm text-muted-foreground text-red-700 font-bold text-left">
                Enter your Username and Password
              </h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full flex gap-2 flex-col"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-yellow-100"
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-yellow-100"
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="mt-4 flex items-center justify-start gap-1">
                    <Button type="submit" disabled={mutation.isPending}>
                      Login
                    </Button>
                    <Button type="reset">Clear</Button>
                  </div>
                </form>
              </Form>
            </div>
            <div className="flex-1 p-4 flex flex-col gap-2">
              <p className="text-red-700 font-bold">Demo note</p>
              <p className="text-sm">
                Student Demo account: test@hcmut.edu.vn / 12345678
                <br />
                Student Printing Service Officer Demo account: spso@hcmut.edu.vn
                / 12345678
                <br />
                Admin Demo account: admin@hcmut.edu.vn / 12345678
              </p>
              <p className="text-red-700 font-bold">Please note</p>
              <p className="text-sm">
                The Login page enables single sign-on to multiple websites at
                HCMUT. This means that you only have to enter your user name and
                password once for websites that subscribe to the Login page.
              </p>
              <p className="text-sm">
                You will need to use your HCMUT Username and password to login
                to this site. The HCMUT account provides access to many
                resources including the HCMUT Information System, e-mail, ...
              </p>
              <p className="text-sm">
                For security reasons, please Exit your web browser when you are
                done accessing services that require authentication!
              </p>
              <p className="text-red-700 font-bold mt-4">Technical support</p>
              <p className="text-sm">
                E-mail:{" "}
                <a href="#" className="text-blue-900 underline">
                  support@hcmut.edu.vn
                </a>{" "}
                Tel: (84-8) 38647256 - 5200
              </p>
            </div>
          </div>
        </div>
        <div className="text-muted-foreground text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </div>
      <p className="text-gray-700 container text-xs">
        Copyright © 2011 - 2012 Ho Chi Minh University of Technology. All
        rights reserved.
        <br />
        Powered by <a href="#">Jasig CAS 3.5.1</a>
      </p>
    </div>
  );
}
