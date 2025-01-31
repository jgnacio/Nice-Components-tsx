"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "next/form";
import { Input } from "@/components/ui/input";

import { Luxurious_Script } from "next/font/google";

const luxuriousScript = Luxurious_Script({
  subsets: ["latin"],
  weight: "400",
});

const menuItems = [
  { title: "Inicio", href: "/" },
  { title: "Sobre Nosotros", href: "/about" },
  { title: "Servicios", href: "/services" },
  { title: "Contacto", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(formData: FormData) {
    const searchQuery = formData.get("search") as string;
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set("q", searchQuery);
    } else {
      params.delete("q");
    }
    router.push(`/search?${params.toString()}`);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4  lg:px-[20vw]  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold relative">
          CSR{" "}
          <span
            className={`${luxuriousScript.className} text-primary absolute left-8 -bottom-2.5`}
          >
            Demo
          </span>
        </Link>
      </div>

      <div className="flex items-end">
        {/* Search */}
        <Form action={onSubmit} className="hidden md:flex mx-4 relative">
          <Input
            type="search"
            name="search"
            placeholder="Search..."
            className="w-64"
            defaultValue={searchParams.get("q") ?? ""}
          />
        </Form>
        {/* Desktop Navigation */}
        <div className="flex justify-center">
          <NavigationMenu>
            <NavigationMenuList className="hidden md:flex space-x-4">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-[300px] pt-16">
          <SheetTitle>Navigation Menu</SheetTitle>
          <Form action={onSubmit} className="mb-4">
            <Input
              type="search"
              name="search"
              placeholder="Search..."
              className="w-full"
              defaultValue={searchParams.get("q") ?? ""}
            />
          </Form>
          <nav className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
