"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-20 bg-black" />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(0,255,200,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(0,255,200,0.08),transparent_30%)]" />

      <div
        className="
          absolute inset-0 -z-10
          bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]
          bg-[size:70px_70px]
          [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]
        "
      />

      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-20 px-6 py-24 lg:grid-cols-2">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Badge className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-sm text-emerald-400 hover:bg-emerald-500/10">
            <Sparkles className="mr-2 h-4 w-4" />
            AI Powered Document Intelligence
          </Badge>

          <h1 className="mt-8 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl">
            Chat with your
            <br />
            documents{" "}
            <span className="bg-linears-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              using AI
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
            Upload PDFs, ask questions naturally, and get accurate, contextual
            answers in seconds using advanced AI retrieval.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="
                h-14 rounded-2xl bg-gradient-to-r
                from-emerald-400 to-teal-500
                px-8 text-base font-medium text-black
                hover:opacity-90
              "
            >
              Start Querying
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="
                h-14 rounded-2xl border-white/10
                bg-white/[0.03] px-8 text-base
                text-white hover:bg-white/10 hover:text-muted
              "
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              View Demo
            </Button>
          </div>

          {/* Features */}
          <div className="mt-10 flex flex-wrap gap-8 text-sm text-zinc-300">
            {["AI-Powered", "Secure", "Lightning Fast", "Accurate"].map(
              (item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  {item}
                </div>
              ),
            )}
          </div>

          {/* Security Box */}
          <div
            className="
              mt-10 flex max-w-xl items-start gap-4
              rounded-3xl border border-white/10
              bg-white/[0.03] p-6 backdrop-blur-xl
            "
          >
            <div
              className="
                flex h-14 w-14 items-center justify-center
                rounded-2xl bg-emerald-500/10
              "
            >
              <ShieldCheck className="h-7 w-7 text-emerald-400" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">
                Your data is private and secure
              </h3>

              <p className="mt-1 text-sm leading-6 text-zinc-400">
                End-to-end encryption • No data used for training
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Glow */}
          <div className="absolute inset-0 rounded-[40px] bg-emerald-500/20 blur-[120px]" />

          <div
            className="
              relative overflow-hidden rounded-[40px]
              border border-emerald-500/30
              bg-black/40 shadow-2xl
              backdrop-blur-2xl
            "
          >
            <Image
              src="/hero-mockup.svg"
              alt="DocQuery Dashboard"
              width={1600}
              height={1000}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
