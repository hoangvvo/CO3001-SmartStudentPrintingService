"use client";

import imageLogoBk from "@/assets/logoBK.png";
import { ThemeProvider } from "@/components/theme-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/user.store";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Blocks,
  CreditCard,
  ExternalLink,
  Files,
  History,
  Home,
  LucideIcon,
  Plus,
  Printer,
  Settings,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Inter as FontSans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const NavbarLink: React.FC<{ href: string; children: string }> = ({
  href,
  children,
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`text-sm font-medium ${
        pathname === href
          ? "text-secondary-foreground"
          : "text-muted-foreground"
      } transition-colors hover:text-primary`}
    >
      {children}
    </Link>
  );
};

const NavbarUser: React.FC = () => {
  const { user } = useUserStore();

  const onLogout = () => {
    useUserStore.getState().logout();

    toast({
      title: "Logged out",
      description: "You have been logged out.",
    });
  };

  const { setTheme } = useTheme();

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login" className={buttonVariants({ variant: "outline" })}>
          Login
        </Link>
        <Link href="/register" className={buttonVariants()}>
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const NavbarSearch: React.FC = () => {
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/search?q=${e.currentTarget.search.value}`);
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="search"
        type="search"
        placeholder="Search..."
        className="w-64"
      />
    </form>
  );
};

const Navbar: React.FC = () => {
  return (
    <nav className="border-b border-border w-full">
      <div className="flex h-16 gap-10 items-center px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-1">
          <Image src={imageLogoBk} width={32} height={32} alt="Logo" />
          <div className="font-semibold flex flex-col items-start text-sm leading-none">
            <span style={{ color: "#042b92" }}>Smart Student</span>
            <span style={{ color: "#1488db" }}>Printing Service</span>
          </div>
        </Link>
        <div className="flex items-center justify-start gap-4 flex-1"></div>
        <NavbarSearch />
        <NavbarUser />
      </div>
    </nav>
  );
};

const SidebarItem: React.FC<{
  href: string;
  children: string;
  Icon: LucideIcon;
}> = ({ href, children, Icon }) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({
          variant: pathname === href ? "secondary" : "ghost",
        }),
        "w-full justify-start",
      )}
    >
      <Icon width={16} height={16} className="mr-2" />
      {children}
    </Link>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-full absolute inset-y-0 left-0 pb-12 pt-4 lg:border-r">
      <div className="px-3 py-2">
        <Link
          href="/print"
          className={cn(buttonVariants(), "w-full gap-2 justify-start")}
        >
          <Plus />
          <span>New Print</span>
        </Link>
      </div>
      <div className="px-3 py-2">
        <div className="space-y-1 flex flex-col">
          <SidebarItem href="/" Icon={Home}>
            Home
          </SidebarItem>
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Printing
        </h2>
        <div className="space-y-1 flex flex-col">
          <SidebarItem href="/printers" Icon={Printer}>
            Printer List
          </SidebarItem>
          <SidebarItem href="/history" Icon={History}>
            Print History
          </SidebarItem>
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Storage
        </h2>
        <div className="space-y-1 flex flex-col">
          <SidebarItem href="/files" Icon={Files}>
            My Files
          </SidebarItem>
          <SidebarItem href="/integrations" Icon={Blocks}>
            Integrations
          </SidebarItem>
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Accounts
        </h2>
        <div className="space-y-1 flex flex-col">
          <SidebarItem href="http://mybk.hcmut.edu.vn" Icon={ExternalLink}>
            MyBK
          </SidebarItem>
          <SidebarItem href="/payments" Icon={CreditCard}>
            Payments
          </SidebarItem>
          <SidebarItem href="/settings" Icon={Settings}>
            Settings
          </SidebarItem>
        </div>
      </div>
    </div>
  );
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    useUserStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased opacity-0 transition-opacity",
          hydrated && `opacity-100`,
          fontSans.variable,
        )}
      >
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
