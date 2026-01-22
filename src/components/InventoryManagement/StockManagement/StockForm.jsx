import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Section from "../../ui/Section";
import FormSection from "../../ui/FormSection";
import MainDiv from "../../ui/MainDiv";
import { globalApi } from "../../../services/apiClient";
import { Branch_API, Product_API, Stock_API } from "../../../services/apiRoutes";

function StockForm() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [loading,setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [branches, setBranches] = useState([])

    const [form, setForm] = useState({
        productId: "",
        branchId: "",
        batchNo: "",
        qty: "",
        expiryDate: "",
        purchasePrice: "",
        sellingPrice: "",
    });

    //   fetch product and fetch branch ==============================================
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await globalApi("GET", undefined, Product_API.GET_ALL);
            const { data } = response;
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchBranches = async () => {
        try {
            setLoading(true);
            const response = await globalApi("GET", undefined, Branch_API.GET_ALL);
            const { data } = response;
            setBranches(data);
        } catch (error) {
            console.error("Error fetching branches:", error);
        } finally {
            setLoading(false);
        }
    };
    // ====================================================================

    useEffect(() => {
        fetchProducts()
        fetchBranches()
        if (state?.mode === "edit" || state?.mode === "view") {
            setForm({
                productId: state?.data?.productId || "",
                branchId: state?.data?.branchId || "",
                batchNo: state?.data?.batchNo || "",
                qty: state?.data?.qty || "",
                expiryDate: state?.data?.expiryDate || "",
                purchasePrice: state?.data?.purchasePrice || "",
                sellingPrice: state?.data?.sellingPrice || "",
            });
        } else {
            setForm({
                productId: "",
                branchId: "",
                batchNo: "",
                qty: "",
                expiryDate: "",
                purchasePrice: "",
                sellingPrice: "",
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let payload = { ...form };

            if (state?.mode === "edit") {
                payload.id = state?.data?._id;
            }

            const response = await globalApi(
                "POST",
                payload,
                Stock_API.ADD
            );

            console.log("response:", response);
            navigate("/stock");
        } catch (error) {
            console.log("error:", error);
        }
    };

    return (
        <MainDiv>
            <Section>
                <h2 className="text-2xl font-bold text-[#4c4c4c]">
                    {state?.mode === "add" && "Add Stock"}
                    {state?.mode === "edit" && "Edit Stock"}
                    {state?.mode === "view" && "View Stock"}
                </h2>
                <Button onClick={() => navigate(-1)}>Back</Button>
            </Section>

            <FormSection>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-3 gap-4">

                        <div>
                            <label className="text-lg font-medium">Product:</label>
                            <select
                                name="productId"
                                value={form.productId}
                                onChange={handleChange}
                                disabled={state?.mode === "view"}
                                className="bg-gray border border-gray-200 px-2 py-3 rounded-md w-3/4"
                            >
                                <option value="">Select Product</option>

                                {products.length > 0 ? (
                                    products.map((item) => (
                                        <option key={item?._id} value={item?._id}>
                                            {item?.code + " "+ item?.name}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No Products Found</option>
                                )}
                            </select>
                        </div>

                        <div>
                            <label className="text-lg font-medium">Branch:</label>
                            <select
                                name="branchId"
                                value={form.branchId}
                                onChange={handleChange}
                                disabled={state?.mode === "view"}
                                className="bg-gray border border-gray-200 px-2 py-3 rounded-md w-3/4"
                            >
                                <option value="">Select Branch</option>

                                {branches.length > 0 ? (
                                    branches.map((item) => (
                                        <option key={item?._id} value={item?._id}>
                                            {item?.code + " "+ item?.name}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No Branches Found</option>
                                )}
                            </select>
                        </div>

                        <div>
                            <label className="text-lg font-medium">Batch No:</label>
                            <input
                                type="text"
                                name="batchNo"
                                value={form.batchNo}
                                readOnly={state?.mode === "view"}
                                onChange={handleChange}
                                className="bg-gray border border-gray-200 px-2 py-3 rounded-md w-3/4"
                            />
                        </div>

                        <div>
                            <label className="text-lg font-medium">Quantity:</label>
                            <input
                                type="number"
                                name="qty"
                                value={form.qty}
                                readOnly={state?.mode === "view"}
                                onChange={handleChange}
                                className="bg-gray border border-gray-200 px-2 py-3 rounded-md w-3/4"
                            />
                        </div>

                        <div>
                            <label className="text-lg font-medium">Expiry Date:</label>
                            <input
                                type="date"
                                name="expiryDate"
                                value={form.expiryDate}
                                readOnly={state?.mode === "view"}
                                onChange={handleChange}
                                className="bg-gray border border-gray-200 px-2 py-3 rounded-md w-3/4"
                            />
                        </div>

                        <div>
                            <label className="text-lg font-medium">Purchase Price:</label>
                            <input
                                type="number"
                                name="purchasePrice"
                                value={form.purchasePrice}
                                readOnly={state?.mode === "view"}
                                onChange={handleChange}
                                className="bg-gray border border-gray-200 px-2 py-3 rounded-md w-3/4"
                            />
                        </div>

                        <div>
                            <label className="text-lg font-medium">Selling Price:</label>
                            <input
                                type="number"
                                name="sellingPrice"
                                value={form.sellingPrice}
                                readOnly={state?.mode === "view"}
                                onChange={handleChange}
                                className="bg-gray border border-gray-200 px-2 py-3 rounded-md w-3/4"
                            />
                        </div>

                    </div>

                    {state?.mode !== "view" && (
                        <div className="mt-4">
                            <Button type="submit">Submit</Button>
                        </div>
                    )}
                </form>
            </FormSection>
        </MainDiv>
    );
}

export default StockForm;
