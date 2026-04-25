import { FOOTER_MENUS } from "../static/footerMenusStatic";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-zinc-100 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 pb-16">
          <div className="space-y-6">
            <div className="shrink-0 cursor-pointer">
              <span className="text-2xl font-black text-indigo-600 tracking-tighter uppercase">
                Ibentix<span className="text-zinc-900">.</span>
              </span>
            </div>
            <p className="text-zinc-500 text-xs sm:text-sm">
              The ultimate event management platform. Discover, create, and
              experience unforgettable moments across Indonesia.
            </p>

            <div className="flex gap-3">
              {FOOTER_MENUS.map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  className="w-10 h-10 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-200 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-400 text-[10px]">
            © {currentYear} IBENTIX. Built by Developers for Creators.
          </p>

          <div className="flex gap-8">
            <a
              href="#"
              className="text-zinc-400 hover:text-zinc-900 text-[10px] transition-colors">
              Privacy
            </a>
            <a
              href="#"
              className="text-zinc-400 hover:text-zinc-900 text-[10px] transition-colors">
              Terms
            </a>
            <a
              href="#"
              className="text-zinc-400 hover:text-zinc-900 text-[10px] transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
