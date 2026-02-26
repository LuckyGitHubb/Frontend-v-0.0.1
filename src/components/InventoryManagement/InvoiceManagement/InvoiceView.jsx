import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InvoicePDF from "../../../pdf/InvoicePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Button from "../../ui/Button";

function InvoiceView() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const invoice = state?.data;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-700">
                        {state?.mode === "add" && "Add Invoice"}
                        {state?.mode === "edit" && "Edit Invoice"}
                        {state?.mode === "view" && "View Invoice"}
                    </h2>
                    <div>
                        <PDFDownloadLink
                            document={<InvoicePDF invoice={invoice} />}
                            fileName="Invoice_Details.pdf"
                        >
                            <Button>Download PDF</Button>
                        </PDFDownloadLink>
                    </div>

                </div>

                {invoice && (
                    <>
                        {/* Branch & Invoice Info */}
                        <div className="grid grid-cols-2 gap-6 mb-8 border-b pb-6">
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800">
                                    {invoice?.branchId?.name}
                                </h3>
                                <p className="text-gray-600">
                                    {invoice?.branchId?.location}
                                </p>
                                <p className="text-gray-600">
                                    Contact: {invoice?.branchId?.contact}
                                </p>
                                <p className="text-gray-600">
                                    Code: {invoice?.branchId?.code}
                                </p>
                            </div>

                            <div className="text-right">
                                <p><span className="font-semibold">Invoice No:</span> {invoice?.invoiceNo}</p>
                                <p><span className="font-semibold">Date:</span> {new Date(invoice?.createdAt).toLocaleDateString()}</p>
                                <p><span className="font-semibold">Payment Mode:</span> {invoice?.paymentMode}</p>
                            </div>
                        </div>

                        {/* Customer Info */}
                        <div className="mb-8">
                            <h3 className="font-semibold text-lg text-gray-800 mb-2">
                                Bill To:
                            </h3>
                            <p>{invoice?.customerName}</p>
                            <p>{invoice?.customerMobile}</p>
                        </div>

                        {/* Items Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full border border-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-3 border">Product</th>
                                        <th className="p-3 border">HSN</th>
                                        <th className="p-3 border">Qty</th>
                                        <th className="p-3 border">Rate</th>
                                        <th className="p-3 border">GST %</th>
                                        <th className="p-3 border">GST Amt</th>
                                        <th className="p-3 border">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoice?.items?.map((item, index) => (
                                        <tr key={index} className="text-center">
                                            <td className="p-3 border">{item.productName}</td>
                                            <td className="p-3 border">{item.hsn}</td>
                                            <td className="p-3 border">{item.qty}</td>
                                            <td className="p-3 border">₹ {item.rate}</td>
                                            <td className="p-3 border">{item.gst}%</td>
                                            <td className="p-3 border">₹ {item.gstAmount}</td>
                                            <td className="p-3 border font-semibold">
                                                ₹ {item.total}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Totals Section */}
                        <div className="flex justify-end mt-8">
                            <div className="w-72 space-y-2">
                                <div className="flex justify-between">
                                    <span>Sub Total:</span>
                                    <span>₹ {invoice?.subTotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>GST Total:</span>
                                    <span>₹ {invoice?.gstTotal}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg border-t pt-2">
                                    <span>Grand Total:</span>
                                    <span>₹ {invoice?.grandTotal}</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default InvoiceView;