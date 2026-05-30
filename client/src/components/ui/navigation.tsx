import { Link, useLocation } from "wouter";
import { Button } from "./button";
import { useAuth } from "@/hooks/use-auth";
import {
  Home,
  BookHeart,
  Wind,
  LogOut,
  BarChart2,
  Menu,
  MessageSquare,
  Brain,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { useState } from "react";

const regularRoutes = [
  { path: "/home", label: "Home", icon: Home },
  { path: "/journal", label: "Journal", icon: BookHeart },
  { path: "/breathing", label: "Breathing", icon: Wind },
  { path: "/chat", label: "Blossom 1.0", icon: MessageSquare },
  { path: "https://small-dust-0169.animaapp.io/#blossomai", label: "Blossom AI", icon: Brain, external: true },
];

const adminRoutes = [
  { path: "/admin", label: "Chat Admin", icon: MessageSquare },
];

export function Navigation({ isAdmin = false }: { isAdmin?: boolean }) {
  const [location] = useLocation();
  const { logoutMutation } = useAuth();
  const [open, setOpen] = useState(false);

  const routes = isAdmin ? adminRoutes : regularRoutes;

  const NavLinks = () => (
    <>
      {routes.map((route) => 
        route.external ? (
          <a key={route.path} href={route.path} target="_blank" rel="noopener noreferrer">
            <Button
              variant="ghost"
              className="w-full justify-start"
            >
              <route.icon className="mr-2 h-4 w-4" />
              {route.label}
            </Button>
          </a>
        ) : (
          <Link key={route.path} href={route.path}>
            <Button
              variant={location === route.path ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <route.icon className="mr-2 h-4 w-4" />
              {route.label}
            </Button>
          </Link>
        )
      )}
      <Button
        variant="ghost"
        className="w-full justify-start text-destructive hover:text-destructive"
        onClick={() => logoutMutation.mutate()}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </>
  );

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <SheetHeader>
              <SheetTitle>
                {isAdmin ? "Admin Panel" : "MindfulMe"}
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2 mt-4">
              <NavLinks />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-64 bg-muted/50 p-4 gap-2">
        <div className="flex items-center gap-2 mb-8">
          <BarChart2 className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">
            {isAdmin ? "Admin Panel" : "MindfulMe"}
          </h1>
        </div>
        <NavLinks />
      </div>
    </>
  );
}