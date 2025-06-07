import Sidebar from "@/components/organisms/Sidebar/Sidebar";
import TransactionDetailContent from "@/components/organisms/TransactionDetailContent/TransactionDetailContent";
import { SidebarProvider } from "@/context/SidebarContext";

export default function TransactionDetail() {
  return (
    <SidebarProvider>
      <section className="transactions-detail overflow-auto">
          <Sidebar activeMenu="transactions"/>
          <TransactionDetailContent />
      </section>
    </SidebarProvider>
  )
}
