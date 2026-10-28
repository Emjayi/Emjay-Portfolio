"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { useEffect } from "react";
import Lenis from "lenis";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const lenis = new Lenis();
		let frame: number;
		function raf(time: any) {
			lenis.raf(time);
			frame = requestAnimationFrame(raf);
		}
		frame = requestAnimationFrame(raf);
		return () => {
			cancelAnimationFrame(frame);
			lenis.destroy();
		};
	}, []);
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
