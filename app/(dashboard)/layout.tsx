import ProModalProvider from "@/components/pro-modal/pro-modal-provider";
import MobileSidebar from "@/components/sidebar/mobile-sidebar";
import AppSidebar from "@/components/sidebar/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getCurrentUser } from "@/lib/userActions";
import { ClerkUser } from "@/types";
import { redirect } from "next/navigation";

const dashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/');
  }

  const userInfo: ClerkUser = {
    email: user.email ?? "",
    username: user.username ?? "",
    lastName: user.lastName ?? "",
    photoUrl: user.photo ?? "",
    isPro: user.isPro ?? false,
    apiCount: user.count ?? 0,
    credits: user.credits ?? 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 via-slate-950 to-emerald-900">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar user={userInfo} className="max-sm:hidden" />

        <main className="h-full w-full flex flex-col min-h-screen overflow-y-auto">
          <MobileSidebar user={userInfo} />

          <ProModalProvider />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default dashboardLayout;
