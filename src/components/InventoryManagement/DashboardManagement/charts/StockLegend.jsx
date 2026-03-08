function StockLegend() {
  return (
    <div className="bg-white p-5 mt-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Stock Status Guide
      </h3>

      <div className="grid grid-cols-2 gap-4 text-sm">

        <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50">
          <span className="w-4 h-4 rounded-full bg-green-500"></span>
          <div>
            <p className="font-medium text-gray-700">High Stock</p>
            <p className="text-gray-500 text-xs">&gt; 50 units</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50">
          <span className="w-4 h-4 rounded-full bg-blue-500"></span>
          <div>
            <p className="font-medium text-gray-700">Medium Stock</p>
            <p className="text-gray-500 text-xs">≤ 50 units</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-yellow-50">
          <span className="w-4 h-4 rounded-full bg-yellow-500"></span>
          <div>
            <p className="font-medium text-gray-700">Low Stock</p>
            <p className="text-gray-500 text-xs">≤ 5 units</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50">
          <span className="w-4 h-4 rounded-full bg-red-500"></span>
          <div>
            <p className="font-medium text-gray-700">Out of Stock</p>
            <p className="text-gray-500 text-xs">0 units</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default StockLegend;