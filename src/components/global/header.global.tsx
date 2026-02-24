"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DynamicIcon from "@/components/shortcodes/dynamicIcon.shortcode";
import { cn } from "@/lib/utils";

type NavLink = {
  label?: string | null;
  icon?: string | null;
  link?: string | null;
};

type CtaButton = {
  label?: string | null;
  icon?: string | null;
  link?: string | null;
};

type HeaderProps = {
  header?: {
    navLinks?: (NavLink | null)[] | null;
    ctaButton?: CtaButton | null;
  } | null;
};

const Header = ({ header }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const navLinks = header?.navLinks?.filter(Boolean) as NavLink[];
  const ctaButton = header?.ctaButton;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        ref={menuRef}
        className="container relative w-full flex items-center justify-between gap-1 rounded-full border border-gray-900 bg-secondary/80 px-2 py-2 backdrop-blur-md"
      >
        {/* 1. Hamburger Button (Visible only on Mobile) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center hover:cursor-pointer justify-center rounded-full p-2 text-gray-500 hover:bg-gray-800 hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <DynamicIcon icon="FaXmark" className="text-accent size-3.5" />
          ) : (
            <DynamicIcon icon="FaBars" className="text-accent size-3.5" />
          )}
        </button>

        {/* 2. Desktop Nav Links (Hidden on Mobile) */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks?.map((item, i) => {
            const isActive =
              item.link === "/"
                ? pathname === "/"
                : pathname.startsWith(item.link || "");
            return (
              <Link
                key={i}
                href={item.link || "/"}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:text-gray-300",
                )}
              >
                {item.icon && (
                  <DynamicIcon icon={item.icon} className="size-3.5" />
                )}
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* 3. CTA Button (Always Visible) */}
        <div>
          {ctaButton?.label && (
            <Link
              href={ctaButton.link || "/"}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-300"
            >
              {ctaButton.icon && (
                <DynamicIcon icon={ctaButton.icon} className="size-3.5" />
              )}
              {ctaButton.label}
            </Link>
          )}
        </div>

        {/* 4. Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 top-full mt-2 w-full flex-col gap-1 rounded-2xl border border-gray-900 bg-secondary/95 p-2 backdrop-blur-xl md:hidden">
            {navLinks?.map((item, i) => {
              const isActive =
                item.link === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.link || "");

              return (
                <Link
                  key={i}
                  href={item.link || "/"}
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-500 hover:bg-gray-900/10 hover:text-gray-300",
                  )}
                >
                  {item.icon && (
                    <DynamicIcon icon={item.icon} className="size-4" />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
