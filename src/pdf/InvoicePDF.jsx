import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet
} from "@react-pdf/renderer";
import { styles as baseStyles } from "./InvoicePDFStyles";

const styles = StyleSheet.create(baseStyles);

function InvoicePDF({ invoice }) {
  if (!invoice) return null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* ================= HEADER ================= */}
        <View style={styles.section}>
          <Text style={styles.title}>INVOICE</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Invoice No:</Text>
            <Text style={styles.value}>{invoice.invoiceNo}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>
              {new Date(invoice.createdAt).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Payment Mode:</Text>
            <Text style={styles.value}>{invoice.paymentMode}</Text>
          </View>
        </View>

        {/* ================= BRANCH DETAILS ================= */}
        <View style={styles.section}>
          <Text style={styles.title}>Branch Details</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Branch Name:</Text>
            <Text style={styles.value}>{invoice.branchId?.name}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{invoice.branchId?.location}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Contact:</Text>
            <Text style={styles.value}>{invoice.branchId?.contact}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Branch Code:</Text>
            <Text style={styles.value}>{invoice.branchId?.code}</Text>
          </View>
        </View>

        {/* ================= CUSTOMER DETAILS ================= */}
        <View style={styles.section}>
          <Text style={styles.title}>Bill To</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Customer Name:</Text>
            <Text style={styles.value}>{invoice.customerName}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Mobile:</Text>
            <Text style={styles.value}>{invoice.customerMobile}</Text>
          </View>
        </View>

        {/* ================= ITEMS TABLE ================= */}
        <View style={styles.section}>
          <Text style={styles.title}>Items</Text>

          <View style={[styles.table, styles.tableHeader]}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: "22%" }]}>Product</Text>
              <Text style={[styles.tableCell, { width: "12%" }]}>HSN</Text>
              <Text style={[styles.tableCell, { width: "10%" }]}>Qty</Text>
              <Text style={[styles.tableCell, { width: "12%" }]}>Rate</Text>
              <Text style={[styles.tableCell, { width: "10%" }]}>GST %</Text>
              <Text style={[styles.tableCell, { width: "14%" }]}>GST Amt</Text>
              <Text style={[styles.tableCell, { width: "20%", borderRightWidth: 0 }]}>
                Total
              </Text>
            </View>
          </View>

          {invoice.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: "22%" }]}>
                {item.productName}
              </Text>
              <Text style={[styles.tableCell, { width: "12%" }]}>
                {item.hsn}
              </Text>
              <Text style={[styles.tableCell, { width: "10%" }]}>
                {item.qty}
              </Text>
              <Text style={[styles.tableCell, { width: "12%" }]}>
                ₹ {item.rate}
              </Text>
              <Text style={[styles.tableCell, { width: "10%" }]}>
                {item.gst}%
              </Text>
              <Text style={[styles.tableCell, { width: "14%" }]}>
                ₹ {item.gstAmount}
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  { width: "20%", borderRightWidth: 0 }
                ]}
              >
                ₹ {item.total}
              </Text>
            </View>
          ))}
        </View>

        {/* ================= TOTALS ================= */}
        <View style={styles.section}>
          <Text style={styles.title}>Summary</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Sub Total:</Text>
            <Text style={styles.value}>₹ {invoice.subTotal}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>GST Total:</Text>
            <Text style={styles.value}>₹ {invoice.gstTotal}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Grand Total:</Text>
            <Text style={styles.value}>₹ {invoice.grandTotal}</Text>
          </View>
        </View>

      </Page>
    </Document>
  );
}

export default InvoicePDF;