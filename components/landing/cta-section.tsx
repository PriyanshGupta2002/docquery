"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-32">
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-[40px]">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="
          relative overflow-hidden rounded-[40px]
          border border-white/10
          bg-white/[0.04]
          px-8 py-20
          text-center
          backdrop-blur-xl
          md:px-16
        "
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Start querying your documents with AI
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Upload PDFs, search semantically, and receive contextual answers
            instantly using Retrieval-Augmented Generation.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="h-12 rounded-xl px-8 text-base">
              Upload Your First PDF
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-white/10 bg-transparent px-8 text-base hover:bg-white/10"
            >
              Book a Demo
            </Button>
          </div>

          <div className="mt-10 text-sm text-zinc-500">
            No credit card required • Setup in minutes
          </div>
        </div>
      </motion.div>
    </section>
  );
}
