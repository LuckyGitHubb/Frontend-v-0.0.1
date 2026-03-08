import { useEffect, useState } from "react";
import { globalApi } from "../../services/apiClient";
import { Dashboard_API } from "../../services/apiRoutes";

const useDashboardStats = ({ year }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [counts, setCounts] = useState([]);
    const [invoicePaymentStats, setInvoicePaymentStats] = useState([]);
    const [monthlySalesStats, setMonthlySalesStats] = useState([]);
    const [stockStatusStats, setStockStatusStats] = useState([]);

    const fetchCounts = async () => {
        try {
            setLoading(true);
            const response = await globalApi("GET", undefined, Dashboard_API.COUNTS);
            const { data } = response;
            setCounts(data);
        } catch (error) {
            setError(error)
            console.error("Error fetching counts:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchInvoiceStats = async () => {
        try {
            setLoading(true);
            const response = await globalApi("GET", undefined, Dashboard_API.INVOICE_PAYMENT_STATS);
            const { data } = response;
            setInvoicePaymentStats(data);
        } catch (error) {
            setError(error)
            console.error("Error fetching counts:", error);
        } finally {
            setLoading(false);
        }
    };
    const fetchMonthlySalesStats = async () => {
        try {
            setLoading(true);
            const response = await globalApi("GET", undefined, Dashboard_API.SALE_MONTHLY_STATS(year));
            const { data } = response;
            setMonthlySalesStats(data);
        } catch (error) {
            setError(error)
            console.error("Error fetching counts:", error);
        } finally {
            setLoading(false);
        }
    };
    const fetchStockStatusStats = async () => {
        try {
            setLoading(true);
            const response = await globalApi("GET", undefined, Dashboard_API.STOCK_STATUS_STATS);
            const { data } = response;
            setStockStatusStats(data);
        } catch (error) {
            setError(error)
            console.error("Error fetching counts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCounts();
        fetchInvoiceStats();
        fetchStockStatusStats()
    }, []);

    useEffect(() => {
        if (year) {
            fetchMonthlySalesStats();
        }
    }, [year]);

    return { counts, invoicePaymentStats, monthlySalesStats, stockStatusStats, error, loading }
}

export default useDashboardStats