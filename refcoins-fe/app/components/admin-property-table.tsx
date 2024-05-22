import React from 'react';

function AdminPropertyTable() {
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
          {/* row 1 */}
          <tr>
             
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
                  <div className="font-bold">Hart Hagerty</div>
                  <div className="text-sm opacity-50">United States</div>
                </div>
              </div>
            </td>
            <td>
              Zemlak, Daniel and Leannon
              <br />
              <span className="badge badge-ghost badge-sm">
                Desktop Support Technician
              </span>
            </td>
            <td>Purple</td>
            <th>
              <button className="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
           
        </tbody> 
      </table>
    </div>
  );
}

export default AdminPropertyTable;
