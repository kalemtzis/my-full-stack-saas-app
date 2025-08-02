import AppSidebar from "@/components/sidebar/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

const dashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <div className='bg-gradient-to-br from-sky-900 via-slate-950 to-emerald-900'>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />

        {/* // TODO: Add modile sidebar with sheet and hide AppSidebar on small devices */}

        <main className="h-full w-full min-h-screen overflow-y-auto">
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default dashboardLayout;
