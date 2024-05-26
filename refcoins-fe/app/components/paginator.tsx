'use client'
import { usePropertyStore } from "@/store/property";

function Paginator() {
  const totalPages = usePropertyStore(state => state.totalPages);
  const fetchProperties = usePropertyStore(state => state.fetchProperties);
  const propertyCount = usePropertyStore(state => state.propertyCount);
  const page = usePropertyStore(state => state.page);
  

  return (
    <div className="flex items-center">
      <p className="mr-5 font-bold text-lg">Total {propertyCount} items</p>
      <div className="join"> 
      {/* Render pagination controls based on totalPages */}
        {Array.from({ length: totalPages }, (_, index) => (
          <input
          key={index}
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label={(index+1).toString()}
          checked={page === index+1}
          onChange={()=>fetchProperties(index+1)}
        />
        ))}
      </div>
    </div>
    
  );
}

export default Paginator;
