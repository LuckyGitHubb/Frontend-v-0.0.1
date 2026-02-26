import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import MainDiv from "../../ui/MainDiv";
import Section from "../../ui/Section";
import Button from "../../ui/Button";
import DeleteModal from "../../ui/DeleteModal";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaEye, FaFileInvoice } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { CSVLink } from "react-csv";
import { globalApi } from "../../../services/apiClient";
import { Sale_API } from "../../../services/apiRoutes";

function SaleList() {
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState("");

    const [selectedEntries, setSelectedEntries] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);

    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAllPage, setSelectAllPage] = useState(false);

    const navigate = useNavigate();

    /** ============================
     *   CSV Export Headers
     ==============================*/
    const headers = [
        { label: "Product Name", key: "productId.name" },
        { label: "Code", key: "code" },
        { label: "Quantity", key: "qty" },
        { label: "Selling Price", key: "sellingPrice" },
    ];

    /** ============================
     *   Fetch Sales
     ==============================*/
    const fetchSales = async () => {
        try {
            setLoading(true);
            const response = await globalApi("GET", undefined, Sale_API.GET_ALL);
            const { data } = response;

            setOriginalData(data);
            setData(data.slice(0, selectedEntries));
        } catch (error) {
            console.error("Error fetching sales:", error);
        } finally {
            setLoading(false);
        }
    };

    /** ============================
     *   Delete Sale
     ==============================*/
    const deleteSale = async (id) => {
        try {
            await globalApi("POST", { id }, Sale_API.DELETE);
            fetchSales();
        } catch (error) {
            console.log("Delete Error:", error);
        }
    };

    /** ============================
     *   Search
     ==============================*/
    const filterSale = (value) => {
        if (!value) return fetchSales();

        const searchValue = value.toLowerCase();
        const filtered = originalData.filter(sale =>
            Object.values(sale).some(field =>
                String(field).toLowerCase().includes(searchValue)
            )
        );

        setData(filtered);
    };

    /** ============================
     *   Pagination
     ==============================*/
    useEffect(() => {
        fetchSales();
    }, []);

    useEffect(() => {
        setPages(Math.ceil(originalData.length / selectedEntries));
    }, [originalData, selectedEntries]);

    useEffect(() => {
        const start = (currentPage - 1) * selectedEntries;
        const end = start + selectedEntries;
        setData(originalData.slice(start, end));
    }, [currentPage, selectedEntries]);

    const handleEntries = (e) => {
        const val = Number(e.target.value);
        setSelectedEntries(val);
        setData(originalData.slice(0, val));
    };

    const handlePrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNext = () => currentPage < pages && setCurrentPage(currentPage + 1);

    /** ============================
     *   Row Selection
     ==============================*/
    const handleRowSelect = (item) => {
        setSelectedRows((prev) =>
            prev.find((row) => row._id === item._id)
                ? prev.filter((row) => row._id !== item._id)
                : [...prev, item]
        );
    };

    const handleSelectAllPage = (e) => {
        const checked = e.target.checked;
        setSelectAllPage(checked);
        setSelectedRows(checked ? data : []);
    };

    const exportData = () =>
        selectedRows.length > 0 ? selectedRows : originalData;

    if (loading) return <p>Loading...</p>;

    return (
        <MainDiv>
            <Section>
                <h2 className="text-2xl font-bold text-[#4c4c4c]">Sale List</h2>
                <Button
                    onClick={() =>
                        navigate("/sale/add", { state: { mode: "add" } })
                    }
                >
                    Add Sale
                </Button>
            </Section>

            {/* Search + Export */}
            <div className="flex justify-between items-center">
                <div className="p-2 w-1/3 mt-10 mb-4 flex border-b border-[#cdcdcd]">
                    <input
                        placeholder="Search"
                        className="flex-1 text-lg pb-1 focus:outline-none"
                        onChange={(e) => filterSale(e.target.value)}
                    />
                    <CiSearch className="text-gray-500 w-5 h-5 ml-2" />
                </div>

                <CSVLink data={exportData()} headers={headers}>
                    <button className="bg-gray-500 text-white p-4 border-r-4">
                        Export Data
                    </button>
                </CSVLink>
            </div>

            {/* Table */}
            <table className="w-full">
                <thead>
                    <tr className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">
                        <th className="p-4">
                            <input
                                type="checkbox"
                                checked={selectAllPage}
                                onChange={handleSelectAllPage}
                            />
                        </th>
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">Code</th>
                        <th className="p-4 text-left">Quantity</th>
                        <th className="p-4 text-left">Selling Price</th>
                        <th className="p-4 text-left">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr
                                key={item._id}
                                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    } hover:bg-gray-200 border-b text-gray-600`}
                            >
                                <td className="p-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.some(
                                            (row) => row._id === item._id
                                        )}
                                        onChange={() => handleRowSelect(item)}
                                    />
                                </td>
                                <td className="p-4">{item?.productId?.name}</td>
                                <td className="p-4">{item?.code}</td>
                                <td className="p-4">{item?.qty}</td>
                                <td className="p-4">₹ {item?.sellingPrice}</td>

                                <td className="p-4">
                                    <div className="flex items-center gap-3">

                                        {/* View Sale */}
                                        <button
                                            onClick={() =>
                                                navigate("/sale/add", {
                                                    state: { mode:"view", data: item }
                                                })
                                            }
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg 
                                                     bg-blue-50 text-blue-600 
                                                     hover:bg-blue-100 hover:shadow-md 
                                                     transition-all duration-200 text-sm font-medium"
                                        >
                                            <FaEye className="text-base" />
                                            View
                                        </button>

                                        {/* Create Invoice */}
                                        <button
                                            onClick={() =>
                                                navigate(`/invoice/add/${item?.saleId}`, {
                                                    state: { saleData: item, mode:'add' }
                                                })
                                            }
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg 
                                                     bg-green-50 text-green-600 
                                                     hover:bg-green-100 hover:shadow-md 
                                                     transition-all duration-200 text-sm font-medium"
                                        >
                                            <FaFileInvoice className="text-base" />
                                            Invoice
                                        </button>

                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="text-center py-4 text-gray-500" colSpan={8}>
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Delete Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)]">
                    <DeleteModal
                        id={selectedId}
                        onDelete={deleteSale}
                        onCancel={() => setIsModalOpen(false)}
                    />
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-between items-center p-4">
                <div>
                    <label>Entries:</label>
                    <select value={selectedEntries} onChange={handleEntries}>
                        {[5, 10, 20, 50, 100].map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center">
                    <IoIosArrowBack
                        onClick={handlePrevious}
                        className="cursor-pointer"
                    />
                    {Array.from({ length: pages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-2 py-1 mx-1 rounded-lg text-white transition-all ${currentPage === i + 1
                                    ? "bg-blue-700 scale-105"
                                    : "bg-blue-500 hover:bg-blue-600"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <IoIosArrowForward
                        onClick={handleNext}
                        className="cursor-pointer"
                    />
                </div>
            </div>
        </MainDiv>
    );
}

export default SaleList;
