import Link from "next/link";

const footerLinks = {
  Product: [
    {
      label: "Features",
      href: "#features",
    },
    {
      label: "Pricing",
      href: "#pricing",
    },
    {
      label: "FAQ",
      href: "#faq",
    },
  ],

  Company: [
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Careers",
      href: "/careers",
    },
  ],

  Resources: [
    {
      label: "Documentation",
      href: "/docs",
    },
    {
      label: "API",
      href: "/api",
    },
    {
      label: "Privacy",
      href: "/privacy",
    },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-muted">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-14 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-semibold tracking-tight">
              DocQuery
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7">
              AI-powered document intelligence platform built for semantic
              search, contextual retrieval, and intelligent document workflows.
            </p>

            <div className="mt-8 text-sm text-zinc-600">
              © 2026 DocQuery. All rights reserved.
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-sm font-semibold">{section}</h3>

              <div className="mt-5 flex flex-col gap-4">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="
                      text-sm text-zinc-500 transition-colors
                      hover:text-black
                    "
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-zinc-600 md:flex-row">
          <div>Built with Next.js, FastAPI, LangChain & OpenAI</div>

          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>

            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>

            <Link href="/cookies" className="hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
