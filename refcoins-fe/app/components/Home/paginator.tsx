'use client'
import { usePropertyStore } from "@/store/property";

function Paginator() {
  const totalPages = usePropertyStore(state => state.totalPages);
  const fetchProperties = usePropertyStore(state => state.fetchProperties);
  const page = usePropertyStore(state => state.page);
  

  return (
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
        onClick={()=>fetchProperties(index+1)}
      />
      ))}
    </div>
  );
}

export default Paginator;
