// components/InvoiceOrderPdf.tsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Order } from "@/types/type";

// Optional: Custom font (use Google Fonts via Font.register if needed)
// Font.register({ family: 'Open Sans', src: '...' })
// const logobase64

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    padding: 40,
    backgroundColor: "#fff",
    color: "#333",
  },
  header: {
    borderBottom: "2 solid #eee",
    paddingBottom: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: { width: 60, height: 60, marginBottom: 5 },

  company: {
    fontSize: 14,
    fontWeight: "bold",
  },
  invoiceTitle: {
    fontSize: 26,
    color: "#493628", 
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#4B5563", // Gray-700
  },
  section: {
    marginBottom: 16,
  },
  infoText: {
    fontSize: 11,
    marginBottom: 2,
    color: "#6B7280", // Gray-500
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1 solid #e5e7eb",
    paddingBottom: 6,
    marginTop: 10,
    fontWeight: "bold",
    color: "#374151", // Gray-700
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1 solid #f3f4f6",
    paddingVertical: 6,
  },
  col1: { width: "40%" },
  col2: { width: "20%" },
  col3: { width: "20%" },
  col4: { width: "20%", textAlign: "right" },
  totalContainer: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  totalText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827", // Gray-900
  },
  footer: {
    marginTop: 30,
    borderTop: "1 solid #e5e7eb",
    paddingTop: 12,
    fontSize: 10,
    color: "#9CA3AF", // Gray-400
  },
});


const InvoiceOrderPdf: React.FC<{ order: Order }> = ({ order }) => {

  const formatDateTime = (rawDateStr: string) => {
    try {
      // Replace "." with ":" to fix time format
      const cleaned = rawDateStr.replace(/\./g, ":");
      const dateObj = new Date(cleaned);

      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "long",
        year: "numeric",
        // hour: "2-digit",
        // minute: "2-digit",
      };

      return dateObj.toLocaleDateString("id-ID", options);
    } catch {
      return rawDateStr;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Image src={`/icon/loubilux-logo.png`} style={styles.logo} />
            <Text style={styles.company}>LouBiShop</Text>
            <Text style={styles.infoText}>Cimanggis, Depok, Jawa Barat</Text>
            <Text style={styles.infoText}>@loubi.shop24</Text>
            <Text style={styles.infoText}>+6281212768921</Text>
          </View>
          <Text style={styles.invoiceTitle}>INVOICE</Text>
        </View>

        {/* Customer Info */}
        <View style={[styles.section, { flexDirection: "row", justifyContent: "space-between" }]}>
          {/* Invoice Details (Kiri) */}
          <View style={{ width: "48%" }}>
            <Text style={styles.sectionTitle}>Detail Invoice</Text>
            <Text style={styles.infoText}>Invoice #: {order.orderId}</Text>
            <Text style={styles.infoText}>
              {/* Tanggal: {new Date(order.orderDate).toLocaleDateString("id-ID")} */}
              Tanggal: {formatDateTime(order.orderDate)}
            </Text>
            <Text style={styles.infoText}>Metode: {order.paymentMethod}</Text>
            {/* <Text style={styles.infoText}>Status: {order.paymentStatus}</Text> */}
          </View>

          {/* Ditagihkan Kepada (Kanan) */}
          <View style={{ width: "48%", textAlign: "right" }}>
            <Text style={styles.sectionTitle}>Customer</Text>
            <Text style={styles.infoText}>{order.user.name}</Text>
            <Text style={styles.infoText}>{order.user.email}</Text>
          </View>
        </View>

        {/* Item Table */}
        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.col1}>Produk</Text>
            <Text style={styles.col2}>Jumlah</Text>
            <Text style={styles.col3}>Harga</Text>
            <Text style={styles.col4}>Subtotal</Text>
          </View>

          {order.items.map((item, idx) => (
            <View style={styles.tableRow} key={idx}>
              <Text style={styles.col1}>{item.name}</Text>
              <Text style={styles.col2}>{item.quantity}</Text>
              <Text style={styles.col3}>
                Rp {item.price.toLocaleString("id-ID")}
              </Text>
              <Text style={styles.col4}>
                Rp {item.subPrice.toLocaleString("id-ID")}
              </Text>
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>
            Total: Rp {order.totalPrice.toLocaleString("id-ID")}
          </Text>
        </View>

        {/* Footer */}
        {/* <View style={styles.footer}>
          <Text>Harap lakukan pembayaran dalam 7 hari sejak invoice ini.</Text>
          <Text>Bank: BCA 123456789 a.n PT Tokomu</Text>
          <Text>Terima kasih telah berbelanja di Tokomu.</Text>
        </View> */}
      </Page>
    </Document>
  );
};

export default InvoiceOrderPdf;
