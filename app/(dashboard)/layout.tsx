import AppSidebar from "@/components/sidebar/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { cookies } from "next/headers"

const dashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />

      <main className="h-full w-full relative flex flex-col min-h-screen overflow-y-auto">
          {children}
      </main>
    </SidebarProvider>
  )
}

export default dashboardLayout