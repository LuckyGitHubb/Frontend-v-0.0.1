import React, { useEffect, useRef, useState } from "react";
import DataTable from "./ui/DataTable";
import MainDiv from "./ui/MainDiv";
import Section from "./ui/Section";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Button from "./ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import DeleteModal from "./ui/DeleteModal";
import axios from "axios";
import { globalApi } from "../services/apiClient";
import { Transaction_API } from "../services/apiRoutes";
import { CSVLink } from "react-csv";


function TransactionList() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("")
  const [isModalOpen, setIsModelOpen] = useState(false)
  const [selectedEntries, setSelectedEntries] = useState(5)
  const [originalData, setOriginalData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pages, setPages] = useState()
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAllPage, setSelectAllPage] = useState(false);

  const navigate = useNavigate()

  const headers = [
    { label: 'Purpose', key: 'purpose' },
    { label: 'Type', key: 'type' },
    { label: 'Payment Method', key: 'paymentMethod' },
    { label: 'Amount', key: 'amount' },
    { label: 'Total Amount', key: 'totalAmount' },
    { label: 'Purpose', key: 'purpose' },
  ]

  const filterTransaction = (value) => {
    if (value === "") return fetchTransaction()
    const searchValue = value.toLowerCase();

    const filterTr = data.filter((item) =>
      Object.values(item).some((field) =>
        String(field).toLowerCase().includes(searchValue)
      )
    );
    setData(filterTr);
  };


  const fetchTransaction = async () => {
    try {
      setLoading(true)
      const response = await globalApi("GET", undefined, Transaction_API.GET_ALL)
      const { data, message, status } = await response
      setOriginalData(data)
      setData(data.slice(0, 5))
    }
    catch (error) {
      console.log('error: ', error)
    }
    finally {
      setLoading(false)
    }
  }

  const deleteTransaction = async (itemId) => {
    try {
      const data = { id: itemId }
      const response = await globalApi("POST", data, Transaction_API.DELETE)
      fetchTransaction()
    }
    catch (error) {
      console.log('error: ', error)
    }
  }

  const handleEntries = (e) => {
    let val = Number(e?.target?.value);
    setSelectedEntries(val)
    setData(originalData.slice(0, val))
  }

  useEffect(() => {
    fetchTransaction();
  }, []);

  useEffect(() => {
    setPages(Math.ceil(originalData.length / selectedEntries))
  }, [originalData, selectedEntries])

  useEffect(() => {
    const start = (currentPage - 1) * selectedEntries;
    const end = start + selectedEntries;
    setData(originalData.slice(start, end));
  }, [currentPage, selectedEntries, originalData]);

  const handleRowSelect = (item) => {
  setSelectedRows((prev) => {
    const exists = prev.find((row) => row._id === item._id);
    if (exists) {
      return prev.filter((row) => row._id !== item._id);
    }
    return [...prev, item];
  });
};

const handleSelectAllPage = (e)=>{
  const checked = e.target.checked;
  setSelectAllPage(checked);
  if(checked){
    setSelectedRows(data)
  }
  else{
    setSelectedRows([])
  }
}

const exportData = ()=>{
  if(selectedRows.length > 0){
    return selectedRows
  }
    return originalData
}

const handlePreviousPage = ()=>{
  if(currentPage===1) return
  setCurrentPage(currentPage-1)
}
const handleNextPage = ()=>{
  if(currentPage===pages) return
  setCurrentPage(currentPage+1)
}


  if (loading) return <p>Loading...</p>;

  return (
    <MainDiv>
      <Section>
        <h2 className='text-2xl font-bold text-[#4c4c4c]'>Expense List</h2>
        <Button onClick={() => navigate('/expense/add', { state: { mode: 'add' } })}>Add Expense</Button>
      </Section>
      <div className='flex justify-between items-center'>
        <div className="p-2 w-1/3  mt-10 mb-4 flex items-center border-b border-[#cdcdcd]">
          <input
            placeholder="Search"
            className="flex-1 text-lg text-[#4c4c4c] pb-1 focus:outline-none"
            onChange={(e) => filterTransaction(e.target.value)}
          />
          <CiSearch className="text-gray-500 w-5 h-5 ml-2" />
        </div>
        <div>
          <CSVLink data={exportData()} headers={headers}>
            <button className='bg-gray-500 text-white p-4 border-r-4'>Export Data</button>
          </CSVLink>
        </div>
      </div>
      {/* Table Start */}
      <div>
        <table className="w-full">
          <thead>
            <tr
              className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
              <th
                className="p-4 text-left font-semibold text-white first:rounded-tl-lg last:rounded-tr-lg"
              >
                <input checked={selectAllPage}
                onChange={handleSelectAllPage} 
                type="checkbox" 
                name="" id="" />
              </th>
              <th
                className="p-4 text-left font-semibold text-white first:rounded-tl-lg last:rounded-tr-lg"
              >
                Purpose
              </th>
              <th
                className="p-4 text-left font-semibold text-white first:rounded-tl-lg last:rounded-tr-lg"
              >
                Type
              </th>
              <th
                className="p-4 text-left font-semibold text-white first:rounded-tl-lg last:rounded-tr-lg"
              >
                Payment Method
              </th>
              <th
                className="p-4 text-left font-semibold text-white first:rounded-tl-lg last:rounded-tr-lg"
              >
                Amount
              </th>
              <th
                className="p-4 text-left font-semibold text-white first:rounded-tl-lg last:rounded-tr-lg"
              >
                Total Amount
              </th>
              <th
                className="p-4 text-left font-semibold text-white first:rounded-tl-lg last:rounded-tr-lg"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white hover:bg-gray-200 p-4 border-b border-b-[rgba(0,0,0,0.12)] text-gray-600 p-4 border-b border-b-[rgba(0,0,0,0.12)] text-gray-600" : "bg-gray-50 hover:bg-gray-200 border-b border-b-[rgba(0,0,0,0.12)] text-gray-600 border-b border-b-[rgba(0,0,0,0.12)] text-gray-600"}>

                  <td className="p-4">
                    <input checked={selectedRows.some(row=>row?._id===item?._id)}
                    onChange={()=>handleRowSelect(item)} 
                    type="checkbox" 
                    name="" id="" /> 
                  </td>
                  <td className="p-4">{item?.purpose || "NA"}</td>
                  <td className="p-4">{item?.type || "NA"}</td>
                  <td className="p-4">{item?.paymentMethod || "NA"}</td>
                  <td className="p-4">{item?.amount || "NA"}</td>
                  <td className="p-4">{item?.totalAmount || "NA"}</td>
                  <td className="p-4 grid grid-cols-3 ">
                    <FaEye className="text-blue-500 hover:text-blue-700 cursor-pointer"
                      onClick={() => navigate('/expense/add', { state: { mode: 'view', data: item } })}
                    />
                    <MdEdit className="text-yellow-500 hover:text-yellow-700 cursor-pointer"
                      onClick={() => navigate('/expense/add', { state: { mode: 'edit', data: item } })} />

                    <MdDelete className="text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => {
                        setSelectedId(item?._id)
                        setIsModelOpen(true)
                      }
                      } />

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="text-center py-4 text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {isModalOpen && (
          <div className="fixed inset-0 bg-[rgba(189,189,189,0.7)]">
            <DeleteModal
              id={selectedId}
              onDelete={deleteTransaction}
              onCancel={() => setIsModelOpen(false)}
            />
          </div>
        )}
      </div>
      {/* Table End */}

      <div className="flex justify-between items-center p-4">
        <div>
          <label htmlFor="">Entries:</label>
          <select
            value={selectedEntries}
            onChange={handleEntries}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div className="flex items-center">
          <IoIosArrowBack onClick={handlePreviousPage} className="cursor-pointer" />
          {Array.from({ length: pages }).map((_, i) => (
            <>
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-2 py-0.5 mx-1 rounded-lg
    shadow-[0_2px_6px_rgba(0,0,0,0.2)]
    text-white cursor-pointer transition-all duration-200
    ${currentPage === i + 1
                    ? "bg-gradient-to-r from-blue-600 to-blue-800 scale-105"
                    : "bg-gradient-to-r from-blue-400 to-blue-600"
                  }
  `}
              >
                {i + 1}
              </button>

            </>
          ))}
          <IoIosArrowForward onClick={handleNextPage} className="cursor-pointer" />
        </div>
      </div>
    </MainDiv>
  );
}

export default TransactionList;
