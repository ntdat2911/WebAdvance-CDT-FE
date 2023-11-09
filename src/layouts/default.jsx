import { Nav } from "@/components/landing-page/Nav";
import { Head } from "./head";
import Footer from "./foot";

export default function DefaultLayout({ children }) {
  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      <Nav />
      <main className="container mx-auto max-w-7xl px-6 flex-grow">
        {children}
      </main>
      {/* <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
          title="nextui.org homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">NextUI</p>
        </Link>
      </footer> */}
      <Footer />
    </div>
  );
}
