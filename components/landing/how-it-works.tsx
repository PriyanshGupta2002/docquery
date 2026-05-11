const steps = [
  {
    title: "Upload Documents",
    description: "Upload PDFs securely to the platform.",
  },
  {
    title: "AI Processes Data",
    description:
      "Documents are chunked, embedded, and indexed for semantic search.",
  },
  {
    title: "Ask Questions",
    description:
      "Chat naturally with your documents and receive contextual answers.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-32">
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-bold">How it works</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-8"
          >
            <div className="mb-6 text-5xl font-bold text-zinc-700">
              0{index + 1}
            </div>

            <h3 className="mb-3 text-2xl font-semibold">{step.title}</h3>

            <p className="text-zinc-400 leading-7">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
