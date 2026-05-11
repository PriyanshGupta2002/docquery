import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Product Manager",
    content: "DocQuery reduced our document analysis time drastically.",
  },
  {
    name: "Priya Mehta",
    role: "Research Analyst",
    content: "The contextual accuracy is genuinely impressive.",
  },
  {
    name: "Rahul Verma",
    role: "Founder",
    content: "One of the cleanest AI document experiences I've used.",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-6 py-32">
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-bold">Loved by modern teams</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.name}
            className="border-white/10 bg-white/5 p-8"
          >
            <p className="leading-8">“{testimonial.content}”</p>

            <div className="mt-8">
              <div className="font-semibold">{testimonial.name}</div>
              <div className="text-sm text-zinc-500">{testimonial.role}</div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
