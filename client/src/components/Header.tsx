import { motion } from "framer-motion";
import { Languages as LanguagesIcon, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage, type Locale } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { getCvDownload } from "@/lib/cv";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { locale, setLocale, t, languageOptions } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.education"), href: "#education" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  const themeLabel = theme === "dark" ? t("theme.switchToLight") : t("theme.switchToDark");
  const cv = getCvDownload(locale);

  const controls = (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5">
        <LanguagesIcon className="h-4 w-4 text-primary" aria-hidden="true" />
        <label htmlFor="language-select" className="sr-only">
          {t("language.select")}
        </label>
        <select
          id="language-select"
          aria-label={t("language.select")}
          value={locale}
          onChange={(event) => setLocale(event.target.value as Locale)}
          className="max-w-[6.5rem] appearance-none bg-transparent pr-1 text-xs font-semibold text-foreground outline-none"
        >
          {languageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        aria-label={themeLabel}
        title={themeLabel}
        className="border-border text-foreground hover:border-primary hover:text-primary"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    </div>
  );

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm"
    >
      <div className="container flex h-20 items-center justify-between gap-4">
        <motion.a
          href="#hero"
          className="flex items-center gap-2 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="/logo.webp" alt="Yassine WALID" className="h-10 w-10" />
          <span className="hidden font-bold text-lg text-foreground transition-colors group-hover:text-primary sm:inline">
            Yassine WALID
          </span>
        </motion.a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label={t("nav.primary")}>
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group"
              whileHover={{ y: -2 }}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {controls}
          <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
            <a href={cv.href} download={cv.filename}>
              {t("header.download")}
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {controls}
          <motion.button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t("header.closeMenu") : t("header.openMenu")}
            aria-expanded={isMenuOpen}
            className="rounded-lg p-2 text-foreground transition-colors hover:bg-secondary"
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-border bg-secondary lg:hidden"
        >
          <div className="container flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button variant="default" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <a href={cv.href} download={cv.filename}>
                {t("header.download")}
              </a>
            </Button>
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}
