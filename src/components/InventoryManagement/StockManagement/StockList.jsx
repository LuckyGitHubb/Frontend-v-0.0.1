import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import MainDiv from "../../ui/MainDiv";
import Section from "../../ui/Section";
import Button from "../../ui/Button";
import DeleteModal from "../../ui/DeleteModal";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { CSVLink } from "react-csv";
import { globalApi } from "../../../services/apiClient";
import { Stock_API } from "../../../services/apiRoutes";

function StockList() {
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
   *   CSV Headers
   ==============================*/
  const headers = [
    { label: "Product ID", key: "productId" },
    { label: "Branch ID", key: "branchId" },
    { label: "Batch No", key: "batchNo" },
    { label: "Quantity", key: "qty" },
    { label: "Expiry Date", key: "expiryDate" },
    { label: "Purchase Price", key: "purchasePrice" },
    { label: "Selling Price", key: "sellingPrice" },
  ];

  /** ============================
   *   Fetch Stock
   ==============================*/
  const fetchStock = async () => {
    try {
      setLoading(true);
      const response = await globalApi("GET", undefined, Stock_API.GET_ALL);
      const { data } = response;

      setOriginalData(data);
      setData(data.slice(0, selectedEntries));
    } catch (error) {
      console.error("Error fetching stock:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log('originalData',originalData)
  console.log('data',data)

  /** ============================
   *   Delete Stock
   ==============================*/
  const deleteStock = async (id) => {
    try {
      await globalApi("POST", { id }, Stock_API.DELETE);
      fetchStock();
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  /** ============================
   *   Search
   ==============================*/
  const filterStock = (value) => {
    if (!value) return fetchStock();

    const searchValue = value.toLowerCase();
    const filtered = originalData.filter((stock) =>
      Object.values(stock).some((field) =>
        String(field).toLowerCase().includes(searchValue)
      )
    );
    setData(filtered);
  };

  /** ============================
   *   Pagination
   ==============================*/
  useEffect(() => {
    fetchStock();
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

  const handlePrevious = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < pages && setCurrentPage(currentPage + 1);

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
        <h2 className="text-2xl font-bold text-[#4c4c4c]">Stock List</h2>
        <Button
          onClick={() =>
            navigate("/stock/add", { state: { mode: "add" } })
          }
        >
          Add Stock
        </Button>
      </Section>

      {/* Search + Export */}
      <div className="flex justify-between items-center">
        <div className="p-2 w-1/3 mt-10 mb-4 flex border-b border-[#cdcdcd]">
          <input
            placeholder="Search"
            className="flex-1 text-lg pb-1 focus:outline-none"
            onChange={(e) => filterStock(e.target.value)}
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
            <th className="p-4 text-left">Product</th>
            <th className="p-4 text-left">Branch</th>
            <th className="p-4 text-left">Batch</th>
            <th className="p-4 text-left">Qty</th>
            <th className="p-4 text-left">Expiry</th>
            <th className="p-4 text-left">Purchase</th>
            <th className="p-4 text-left">Selling</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
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

                <td className="p-4">{item?.productId?.code + " " + item?.productId?.name || "NA"}</td>
                <td className="p-4">{item?.branchId?.code + " " + item?.branchId?.name || "NA"}</td>
                <td className="p-4">{item?.batchNo || "NA"}</td>
                <td className="p-4">{item?.qty || "NA"}</td>
                <td className="p-4">{item?.expiryDate || "NA"}</td>
                <td className="p-4">{item?.purchasePrice || "NA"}</td>
                <td className="p-4">{item?.sellingPrice || "NA"}</td>

                <td className="p-4 grid grid-cols-3">
                  <FaEye
                    className="text-blue-500 cursor-pointer"
                    onClick={() =>
                      navigate("/stock/add", {
                        state: { mode: "view", data: item },
                      })
                    }
                  />

                  <MdEdit
                    className="text-yellow-500 cursor-pointer"
                    onClick={() =>
                      navigate("/stock/add", {
                        state: { mode: "edit", data: item },
                      })
                    }
                  />

                  <MdDelete
                    className="text-red-500 cursor-pointer"
                    onClick={() => {
                      setSelectedId(item._id);
                      setIsModalOpen(true);
                    }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="text-center py-4 text-gray-500"
                colSpan={9}
              >
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
            onDelete={deleteStock}
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
              className={`px-2 py-1 mx-1 rounded-lg text-white transition-all ${
                currentPage === i + 1
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

export default StockList;
