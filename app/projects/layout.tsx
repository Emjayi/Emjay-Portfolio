import { ThemeProvider } from "../theme-provider"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system">
            <section>
                {children}
            </section >
        </ThemeProvider>
    );
}