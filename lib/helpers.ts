// lib/helpers.ts
export const cn = (...classes: Array<string | boolean | undefined>) => {
    return classes.filter(Boolean).join(' ');
  };