import { FEATURES } from "@/lib/constants";
import { FeatureCard } from "./feature-card";

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-32">
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-bold tracking-tight">
          Everything you need for intelligent document analysis
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
          Enterprise-grade AI document querying designed for modern workflows.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}
