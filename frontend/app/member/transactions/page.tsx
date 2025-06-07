import Sidebar from "@/components/organisms/Sidebar/Sidebar";
import TransactionContent from "@/components/organisms/TransactionContent/TransactionContent";
import { SidebarProvider } from "@/context/SidebarContext";

export default function Transactions() {
  return (
    <SidebarProvider>
      <section className="transactions overflow-auto">
        <Sidebar activeMenu="transactions" />
        <TransactionContent />
      </section>
    </SidebarProvider>
  )
}
