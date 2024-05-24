'use client'
import { usePropertyStore } from "@/store/property";
import { useEffect } from "react";

function AdminPropertyTable() {

  const fetchProperties = usePropertyStore(state => state.fetchProperties) 
  const properties = usePropertyStore(state => state.properties)

  useEffect(()=>{
    fetchProperties(undefined, undefined, 8) 
  },[])
  return (
    <div className="overflow-x-auto w-[70%]">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            
            <th>Property Title</th>
            <th>Property Slug</th>
            <th>Location</th>
            <th>Description</th>
            <th>Price</th>
            <th>Type</th>
            <th>area in sq ft</th> 
            <th></th>
          </tr>
        </thead>
        <tbody> 
          {properties ? (<>
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
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td> 
                <span className="badge badge-ghost badge-sm">
                   {property.slug}
                </span>
              </td>
              <td>{property.location}</td>
              <td className="max-w-60">
                 {property.description} 
              </td>
              <td>$ {property.price}</td>
              <td> {property.type}</td>
              <td> {property.area}</td>
            </tr>
            ))}
          </>) : null}
          
           
        </tbody> 
      </table>
    </div>
  );
}

export default AdminPropertyTable;
