"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-muted">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          DocQuery
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm t">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it Works</a>
          <a href="#testimonials">Testimonials</a>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="cursor-pointer">
            <Link href={"/sign-in"}>Login</Link>
          </Button>
          <Button className="cursor-pointer">
            <Link href={"/product/docquery"}>Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
