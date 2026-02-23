"use client";

import { FC, lazy, Suspense, ComponentType } from "react";

type DynamicIconProps = {
  icon: string;
  className?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconModule = Record<string, any>;

const iconLibraries: Record<string, () => Promise<IconModule>> = {
  Fa: async () => {
    // Load both libraries
    const [fa5, fa6] = await Promise.all([
      import("react-icons/fa"),
      import("react-icons/fa6"),
    ]);

    // Merge them: Put fa5 LAST so it overrides fa6.
    // Result: You get your v5 icons by default, but if an icon
    // is missing in v5 (like FaXmark), it falls back to the v6 version.
    return { ...fa6, ...fa5 };
  },
  Fi: () => import("react-icons/fi"),
  Hi: () => import("react-icons/hi"),
  Hi2: () => import("react-icons/hi2"),
  Io: () => import("react-icons/io5"),
  Lu: () => import("react-icons/lu"),
  Md: () => import("react-icons/md"),
  Ri: () => import("react-icons/ri"),
};

function getLibraryKey(iconName: string): string {
  // Match longer prefixes first (e.g. Fa6, Hi2 before Fa, Hi)
  const sorted = Object.keys(iconLibraries).sort((a, b) => b.length - a.length);
  for (const prefix of sorted) {
    if (iconName.startsWith(prefix)) return prefix;
  }
  return "Fa";
}

const iconCache = new Map<string, ComponentType<{ className?: string }>>();

const DynamicIcon: FC<DynamicIconProps> = ({ icon, className }) => {
  if (!icon) return null;

  if (!iconCache.has(icon)) {
    const libKey = getLibraryKey(icon);
    const LazyIcon = lazy(async () => {
      const lib = await iconLibraries[libKey]();
      const IconComponent = lib[icon];
      if (!IconComponent) {
        console.warn(`Icon "${icon}" not found in react-icons/${libKey}`);
        return { default: (() => null) as FC };
      }
      return { default: IconComponent as FC<{ className?: string }> };
    });

    iconCache.set(icon, LazyIcon);
  }

  const CachedIcon = iconCache.get(icon)!;
  return (
    <Suspense fallback={<span className={className} />}>
      <CachedIcon className={className} />
    </Suspense>
  );
};

export default DynamicIcon;
