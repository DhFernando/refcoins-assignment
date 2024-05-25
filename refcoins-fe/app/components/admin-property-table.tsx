'use client'
import { PropertyCreatingState, PropertyDeletingState, usePropertyStore } from "@/store/property";
import { useEffect } from "react";
import Swal from "sweetalert2";

function AdminPropertyTable() {

  const fetchProperties = usePropertyStore(state => state.fetchProperties) 
  const deleteProperty = usePropertyStore(state => state.deleteProperty) 
  const propertyDeletingState = usePropertyStore(state => state.propertyDeletingState) 
  const propertyCreatingState = usePropertyStore(state => state.propertyCreatingState) 
  const filterWith = usePropertyStore(state => state.filterWith) 
  const properties = usePropertyStore(state => state.properties)
  const loading = usePropertyStore(state => state.loading)

  useEffect(()=>{
    if( propertyDeletingState === PropertyDeletingState.COMPLETED || propertyCreatingState === PropertyCreatingState.COMPLETED   ){ 
      fetchProperties(undefined, 8) 
    }
    
  },[propertyDeletingState, propertyCreatingState])

  useEffect(()=>{ fetchProperties(undefined, 8) },[filterWith])

  const handleDeleteProperty = (id: string) => { 
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      deleteProperty(id) 
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
    
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Property Title</th>
            <th>Property Location</th> 
            <th>Description</th>
            <th>Price</th>
            <th>Type</th>
            <th>area in sq ft</th> 
            <th>Actions</th> 
            <th></th>
          </tr>
        </thead>
        <tbody> 
          {(properties && !loading)  ? (<>
            {properties.map((property, index) => (
              <tr key={index}> 
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{property.title}</div>
                    <span className="badge badge-ghost badge-sm">
                      {property.slug}
                    </span> 
                  </div>
                </div>
              </td>
              <td>  
                   {property.location} 
              </td> 
              <td className="max-w-60">
                 {property.description} 
              </td>
              <td>$ {property.price}</td>
              <td> {property.type}</td>
              <td> {property.area}</td>
              <td> 
                <button className="btn btn-xs btn-square ">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M21.821 12.43c-.083-.119-2.062-2.944-4.793-4.875-1.416-1.003-3.202-1.555-5.028-1.555-1.825 0-3.611.552-5.03 1.555-2.731 1.931-4.708 4.756-4.791 4.875-.238.343-.238.798 0 1.141.083.119 2.06 2.944 4.791 4.875 1.419 1.002 3.205 1.554 5.03 1.554 1.826 0 3.612-.552 5.028-1.555 2.731-1.931 4.71-4.756 4.793-4.875.239-.342.239-.798 0-1.14zm-9.821 4.07c-1.934 0-3.5-1.57-3.5-3.5 0-1.934 1.566-3.5 3.5-3.5 1.93 0 3.5 1.566 3.5 3.5 0 1.93-1.57 3.5-3.5 3.5zM14 13c0 1.102-.898 2-2 2-1.105 0-2-.898-2-2 0-1.105.895-2 2-2 1.102 0 2 .895 2 2z"/>
                  </svg>
                </button>
                <button className="btn btn-xs btn-square" onClick={()=> handleDeleteProperty(property.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path fill-rule="evenodd" d="M17,8 C17.5522847,8 18,8.44771525 18,9 L18,19 C18,20.6568542 16.6568542,22 15,22 L9,22 C7.34314575,22 6,20.6568542 6,19 L6,9 C6,8.44771525 6.44771525,8 7,8 L17,8 Z M16,10 L8,10 L8,19 C8,19.5522847 8.44771525,20 9,20 L15,20 C15.5522847,20 16,19.5522847 16,19 L16,10 Z M9,3 C9,2.44771525 9.44771525,2 10,2 L14,2 C14.5522847,2 15,2.44771525 15,3 L15,4 L19,4 C19.5522847,4 20,4.44771525 20,5 C20,5.55228475 19.5522847,6 19,6 L5,6 C4.44771525,6 4,5.55228475 4,5 C4,4.44771525 4.44771525,4 5,4 L9,4 L9,3 Z"/>
                  </svg>
                </button> 
              </td>
            </tr>
            ))}
          </>) : (<span className="loading loading-dots loading-lg"></span>)}
          
           
        </tbody> 
      </table>
    </div>
  );
}

export default AdminPropertyTable;
