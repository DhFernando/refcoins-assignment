'use client'
import { usePropertyStore } from "@/store/property";
import { useEffect } from "react";

function PropertyItems() {

  const fetchProperties = usePropertyStore(state => state.fetchProperties)
  const filterWith = usePropertyStore(state => state.filterWith)
  const fetchPropertyCount = usePropertyStore(state => state.fetchPropertyCount)
  const properties = usePropertyStore(state => state.properties)
  const loading = usePropertyStore(state => state.loading)
  const propertyCount = usePropertyStore(state => state.totalPages)
  const setPageSize = usePropertyStore(state => state.setPageSize)
   
 
  useEffect(()=>{
    setPageSize(4) 
    fetchProperties()  
    fetchPropertyCount()
  }, [filterWith])
  
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
            src={property.image}
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
            <p className="text-sm"></p>
            <div className="py-4 flex items-center">
                <svg width="15px" height="15px" viewBox="-5.07 0 43.012 43.012" xmlns="http://www.w3.org/2000/svg">
                    <path id="location" d="M406.185,260.012c-18.028-13.493-16.233-28.572-16.233-28.572h11.184a4.7,4.7,0,0,0-.142,1.1,5.378,5.378,0,0,0,.466,2.1,7.353,7.353,0,0,0,2.622,2.615,5,5,0,0,0,4.218,0,7.316,7.316,0,0,0,2.619-2.615,5.4,5.4,0,0,0,.465-2.105,4.728,4.728,0,0,0-.141-1.1h11.5S424.217,246.277,406.185,260.012Zm4.731-29.576a7.353,7.353,0,0,0-2.619-2.618,4.977,4.977,0,0,0-4.211,0,7.389,7.389,0,0,0-2.622,2.618,6.468,6.468,0,0,0-.326,1H389.966c0-7.972,7.335-14.435,16.383-14.435s16.383,6.463,16.383,14.435H411.242A6.523,6.523,0,0,0,410.915,230.436Z" transform="translate(-389.902 -217)" fill="#2d5be2"/>
                </svg>
                  <p className="ml-4">{property.location}</p>
            </div>
            <p className="text-sm">{property.description}</p>
            <p className="text-blue-600">{property.type}</p>
            <div className="flex items-center">
              <p className="text-lg font-bold">$ {property.price}</p>
              <div className="py-4 flex ">
                  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.9707 5.5V9.5C21.9707 11.2615 20.6712 12.7232 18.9692 12.9649C18.6958 13.0038 18.4707 12.7761 18.4707 12.5V12.25C18.4707 8.53 15.4507 5.5 11.7207 5.5H11.4707C11.1946 5.5 10.9669 5.27486 11.0061 5.0015C11.2488 3.30678 12.7099 2 14.4707 2H18.4707C20.4107 2 21.9707 3.57 21.9707 5.5Z" fill="#292D32"/>
                  <path d="M11.7207 7H10.9707H6.9707C4.2107 7 1.9707 9.24 1.9707 12V17C1.9707 19.76 4.2107 22 6.9707 22H11.9707C14.7307 22 16.9707 19.76 16.9707 17V13V12.25C16.9707 9.35 14.6207 7 11.7207 7Z" fill="#292D32"/>
                  </svg>
                  <p className="ml-4 ">{property.area}<span className="text-gray-400 font-bold"> sq ft </span></p>
              </div>  
            </div>

          </div>
        </div>
      ))}
    </>
  );
}

export default PropertyItems;
