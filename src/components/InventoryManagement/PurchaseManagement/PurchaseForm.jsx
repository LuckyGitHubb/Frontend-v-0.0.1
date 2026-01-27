import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Section from "../../ui/Section";
import FormSection from "../../ui/FormSection";
import MainDiv from "../../ui/MainDiv";
import { globalApi } from "../../../services/apiClient";
import { Branch_API, Product_API, Purchase_API, Stock_API } from "../../../services/apiRoutes";

function PurchaseForm() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [branches, setBranches] = useState([])
    const [branch, setBranch] = useState([])
    const [rows, setRows] = useState([{
        productId: "",
        batchNo: "",
        qty: "",
        expiryDate: "",
        purchasePrice: "",
        sellingPrice: "",
    }])

    const addRows = () => {
        setRows((prevRows) => [
            ...prevRows,
            {
                productId: "",
                branchId: "",
                batchNo: "",
                qty: "",
                expiryDate: "",
                purchasePrice: "",
                sellingPrice: "",
            }
        ])
    }

    const removeRows = (index) => {
        setRows(prevRows =>
            prevRows.filter((_, i) => i !== index)
        )
    }

    const handleRowChange = (e, index) => {
        const { name, value } = e.target;

        setRows(prevRows =>
            prevRows.map((row, i) =>
                i === index
                    ? { ...row, [name]: value }
                    : row
            )
        )
    }

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
    // ================================================================================

    useEffect(() => {
        fetchProducts()
        fetchBranches()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let payload = { 
                branchId:branch,
                items:rows
            };        

            const response = await globalApi(
                "POST",
                payload,
                Purchase_API.ADD
            );
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

                    {/* ===== Branch Section ===== */}
                    <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
                        <label className="text-lg font-medium block mb-2">Branch</label>
                        <select
                            name="branchId"
                            value={branch}
                            onChange={(e)=>setBranch(e.target.value)}
                            disabled={state?.mode === "view"}
                            className="bg-white border border-gray-200 px-3 py-3 rounded-md w-1/2"
                        >
                            <option value="">Select Branch</option>

                            {branches.length > 0 ? (
                                branches.map((item) => (
                                    <option key={item?._id} value={item?._id}>
                                        {item?.code} {item?.name}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No Branches Found</option>
                            )}
                        </select>
                    </div>

                    {/* ===== Product & Stock Details Section ===== */}
                    {rows.map((item, index) => (
                        <div className="p-4 border border-gray-200 rounded-md">
                            <div className="grid grid-cols-3 gap-4">

                                <div>
                                    <div>
                                        <label className="text-lg font-medium">Product</label>
                                    </div>
                                    <select
                                        name="productId"
                                        value={item.productId}
                                        onChange={(e) => handleRowChange(e, index)}
                                        disabled={state?.mode === "view"}
                                        className="bg-gray border border-gray-200 px-2 py-3 rounded-md w-3/4"
                                    >
                                        <option value="">Select Product</option>

                                        {products.length > 0 ? (
                                            products.map((item) => (
                                                <option key={item?._id} value={item?._id}>
                                                    {item?.code} {item?.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No Products Found</option>
                                        )}
                                    </select>
                                </div>

                                <div>
                                    <div>
                                        <label className="text-lg font-medium">Batch No</label>
                                    </div>
                                    <input
                                        type="text"
                                        name="batchNo"
                                        value={item.batchNo}
                                        readOnly={state?.mode === "view"}
                                        onChange={(e) => handleRowChange(e, index)}
                                        className="bg-gray border border-gray-200 px-2 py-3 rounded-md w-3/4"
                                    />
                                </div>

                                <div>
                                    <div>
                                        <label className="text-lg font-medium">Quantity</label>
                                    </div>
                                    <input
                                        type="number"
                                        name="qty"
                                        value={item.qty}
                                        readOnly={state?.mode === "view"}
                                        onChange={(e) => handleRowChange(e, index)}
                                        className="bg-gray border border-gray-200 px-2 py-3 rounded-md w-3/4"
                                    />
                                </div>

                                <div>
                                    <div>
                                        <label className="text-lg font-medium">Expiry Date</label>
                                    </div>
                                    <input
                                        type="date"
                                        name="expiryDate"
                                        value={item.expiryDate}
                                        readOnly={state?.mode === "view"}
                                        onChange={(e) => handleRowChange(e, index)}
                                        className="bg-gray border border-gray-200 px-2 py-3 rounded-md w-3/4"
                                    />
                                </div>

                                <div>
                                    <div>
                                        <label className="text-lg font-medium">Purchase Price</label>
                                    </div>
                                    <input
                                        type="number"
                                        name="purchasePrice"
                                        value={item.purchasePrice}
                                        readOnly={state?.mode === "view"}
                                        onChange={(e) => handleRowChange(e, index)}
                                        className="bg-gray border border-gray-200 px-2 py-3 rounded-md w-3/4"
                                    />
                                </div>

                                <div>
                                    <div>
                                        <label className="text-lg font-medium">Selling Price</label>
                                    </div>
                                    <input
                                        type="number"
                                        name="sellingPrice"
                                        value={item.sellingPrice}
                                        readOnly={state?.mode === "view"}
                                        onChange={(e) => handleRowChange(e, index)}
                                        className="bg-gray border border-gray-200 px-2 py-3 rounded-md w-3/4"
                                    />
                                </div>

                            </div>
                            {state?.mode !== "view" && (
                                <div className='mt-4 flex gap-3'>
                                    <button type='button'
                                    className='px-4 py-2 rounded-xl text-lg bg-green-600 text-white cursor-pointer hover:bg-green-800'
                                     onClick={addRows}>+ Add Row</button>
                                    {rows.length > 1 && (
                                        <button type='button' 
                                        className='px-4 py-2 rounded-xl text-lg bg-red-600 text-white'
                                        onClick={() => removeRows(index)}>- Remove Row</button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* ===== Submit Button ===== */}
                    {state?.mode !== "view" && (
                        <div className="mt-6">
                            <Button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</Button>
                        </div>
                    )}

                </form>
            </FormSection>

        </MainDiv>
    );
}

export default PurchaseForm;
