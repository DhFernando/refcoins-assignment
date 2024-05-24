'use client'
import { usePropertyStore } from "@/store/property";
import { useEffect } from "react";

function PropertyItems() {

  const fetchProperties = usePropertyStore(state => state.fetchProperties)
  const fetchPropertyCount = usePropertyStore(state => state.fetchPropertyCount)
  const properties = usePropertyStore(state => state.properties)
  const loading = usePropertyStore(state => state.loading)
  const propertyCount = usePropertyStore(state => state.totalPages)
  useEffect(()=>{
    fetchProperties()
    fetchPropertyCount()
  }, [])
 
  if(loading || properties === null){
    return(
      <div className="flex  justify-center w-full min-h-64"> 
        <span className="loading loading-dots loading-lg  "></span>
      </div>
    ) 
  }
  
  return (
     
    <>
    {propertyCount}
      {properties.map(property => (
        <div key={property.id} className="w-96 bg-base-100"> 
          <div className="relative">
            <figure className="px-8 pt-10">
            <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
            className="rounded-xl"
          />
              <div className="badge badge-neutral absolute top-[50px] left-[40px] bg-white border-none px-2 py-1">
                <strong>{property.status}</strong>
              </div>
            </figure>
          </div>
          <div className="card-body">
            <h2 className="card-title text-base">{property.title}</h2>
            <p className="text-sm">{property.description}</p>
            <p className="text-blue-600">{property.type}</p>
            <p className="text-lg font-bold">LKR {property.price}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default PropertyItems;
