"use client";

import { useEffect, useState } from "react";

/** Année en cours, mise à jour côté navigateur (reste juste même si la page est en cache). */
export default function CurrentYear() {
  const [year, setYear] = useState(() => new Date().getFullYear());
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <span suppressHydrationWarning>{year}</span>;
}
