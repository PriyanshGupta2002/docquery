/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card";

interface Props {
  title: string;
  description: string;
  icon: any;
}

export function FeatureCard({ title, description, icon: Icon }: Props) {
  return (
    <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="mb-2 text-xl font-semibold">{title}</h3>

      <p className="text-sm leading-7 text-zinc-400">{description}</p>
    </Card>
  );
}
