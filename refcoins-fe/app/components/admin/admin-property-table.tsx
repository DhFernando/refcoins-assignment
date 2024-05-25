'use client'
import { PropertyCreatingState, PropertyDeletingState, usePropertyStore } from "@/store/property";
import { useEffect } from "react";
import Swal from "sweetalert2";
import ViewUpdate from "./view-update-property";

function AdminPropertyTable() {
  const fetchProperties = usePropertyStore(state => state.fetchProperties);
  const deleteProperty = usePropertyStore(state => state.deleteProperty);
  const propertyDeletingState = usePropertyStore(state => state.propertyDeletingState);
  const propertyCreatingState = usePropertyStore(state => state.propertyCreatingState);
  const filterWith = usePropertyStore(state => state.filterWith);
  const properties = usePropertyStore(state => state.properties);
  const loading = usePropertyStore(state => state.loading);

  useEffect(() => {
    if (propertyDeletingState === PropertyDeletingState.COMPLETED || propertyCreatingState === PropertyCreatingState.COMPLETED) {
      fetchProperties(undefined, 8);
    }
  }, [propertyDeletingState, propertyCreatingState]);

  useEffect(() => { fetchProperties(undefined, 8); }, [filterWith]);

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
      deleteProperty(id);
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };

  const TableBodyImageTitleAndSlugDisplay = (title: string, slug: string, image: string) => {
    return (
      <span className="flex items-center gap-3">
                      <span className="avatar">
                        <span className="mask mask-squircle w-12 h-12">
                          <img src={image} alt="Property" />
                        </span>
                      </span>
                      <div>
                        <span className="font-bold">{title}</span>
                        <span className="badge badge-ghost badge-sm">
                          {slug}
                        </span>
                      </div>
                    </span>
    )
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
            <th>Area in sq ft</th>
            <th>Actions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {(properties && !loading) && (
            <>
              {properties.map((property) => (
                <tr key={property.id}>
                  <td>
                    {TableBodyImageTitleAndSlugDisplay(property.title, property.slug, property.image)}
                  </td>
                  <td>{property.location}</td>
                  <td className="max-w-60">{property.description}</td>
                  <td>$ {property.price}</td>
                  <td>{property.type}</td>
                  <td>{property.area}</td>
                  <td className="flex">
                    <ViewUpdate id={property.id} />
                    <button className="btn btn-xs btn-square ml-2" onClick={() => handleDeleteProperty(property.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path fillRule="evenodd" d="M17,8 C17.5522847,8 18,8.44771525 18,9 L18,19 C18,20.6568542 16.6568542,22 15,22 L9,22 C7.34314575,22 6,20.6568542 6,19 L6,9 C6,8.44771525 6.44771525,8 7,8 L17,8 Z M16,10 L8,10 L8,19 C8,19.5522847 8.44771525,20 9,20 L15,20 C15.5522847,20 16,19.5522847 16,19 L16,10 Z M9,3 C9,2.44771525 9.44771525,2 10,2 L14,2 C14.5522847,2 15,2.44771525 15,3 L15,4 L19,4 C19.5522847,4 20,4.44771525 20,5 C20,5.55228475 19.5522847,6 19,6 L5,6 C4.44771525,6 4,5.55228475 4,5 C4,4.44771525 4.44771525,4 5,4 L9,4 L9,3 Z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </>
          ) }
        </tbody>
      </table>
      {(loading) && (<span className="loading loading-dots loading-lg"></span>)}
    </div>
  );
}

export default AdminPropertyTable;
