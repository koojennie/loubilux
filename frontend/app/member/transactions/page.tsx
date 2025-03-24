import Sidebar from "@/components/organisms/Sidebar/Sidebar";
import TransactionContent from "@/components/organisms/TransactionContent/TransactionContent";

export default function Transactions() {
  return (
    <section className="transactions overflow-auto">
        <Sidebar activeMenu="transactions"/>
        <TransactionContent />
    </section>
  )
}
