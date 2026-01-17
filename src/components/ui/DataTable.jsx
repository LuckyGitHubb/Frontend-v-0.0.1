import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";

function DataTable({ columns, data }) {
    const [isModalOpen,setIsModelOpen] = useState(false)
  return (
    <div>
      <table className="w-full">
        <thead>
          <tr 
          className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
            {columns.map((col, i) => (
              <th
                key={i}
                className="p-4 text-left font-semibold text-white first:rounded-tl-lg last:rounded-tr-lg"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className={ rowIndex%2===0? "bg-white hover:bg-gray-200" :  "bg-gray-50 hover:bg-gray-200"}>
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="p-4 border-b border-b-[rgba(0,0,0,0.12)] text-gray-600"
                  >
                    {col.accessor === 'action' ? 
                    (
                      <div className="flex gap-2">
                        <Link className="text-blue-500 hover:text-blue-700">
                          <FaEye/>
                        </Link>
                        <Link className="text-yellow-500 hover:text-yellow-700">
                          <MdEdit/>
                        </Link>
                        <Link onClick={() => setIsModelOpen(true)} 
                        className="text-red-500 hover:text-red-700">
                          <MdDelete/>
                        </Link>
                      </div>
                    )
                  : (row[col.accessor])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
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
          onCancel={()=>setIsModelOpen(false)}
          />
        </div>
      )}
      </div>
  );
}

export default DataTable;
