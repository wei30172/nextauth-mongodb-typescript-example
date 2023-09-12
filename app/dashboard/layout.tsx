interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children
}: DashboardLayoutProps) {
  return (
    <section>
      {children}
    </section>
  )
}