'use client'

import { usePropertyStore } from "@/store/property";
import Image from "next/image";

interface ViewUpdateProps {
    id: string;
  }
  
  const ViewUpdate: React.FC<ViewUpdateProps> = ({ id }) => {

    const selectedProperty = usePropertyStore(state => state.selectedProperty)
    const clearSelectedProperty = usePropertyStore(state => state.clearSelectedProperty)
    const fetchPropertyById = usePropertyStore(state => state.fetchPropertyById)

    const openModal = async () => {
      await fetchPropertyById(id)
      const modal = document.getElementById(`ViewUpdate-${id}`) as HTMLDialogElement | null;
      if (modal) modal.showModal();
    };

    const closeModal = () => {
        clearSelectedProperty();
        const modal = document.getElementById( `ViewUpdate-${id}`) as HTMLDialogElement | null;
        if (modal) modal.close(); 
      };
  
    return (
      <div>
        <button className="btn btn-xs btn-square" onClick={openModal}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M21.821 12.43c-.083-.119-2.062-2.944-4.793-4.875-1.416-1.003-3.202-1.555-5.028-1.555-1.825 0-3.611.552-5.03 1.555-2.731 1.931-4.708 4.756-4.791 4.875-.238.343-.238.798 0 1.141.083.119 2.06 2.944 4.791 4.875 1.419 1.002 3.205 1.554 5.03 1.554 1.826 0 3.612-.552 5.028-1.555 2.731-1.931 4.71-4.756 4.793-4.875.239-.342.239-.798 0-1.14zm-9.821 4.07c-1.934 0-3.5-1.57-3.5-3.5 0-1.934 1.566-3.5 3.5-3.5 1.93 0 3.5 1.566 3.5 3.5 0 1.93-1.57 3.5-3.5 3.5zM14 13c0 1.102-.898 2-2 2-1.105 0-2-.898-2-2 0-1.105.895-2 2-2 1.102 0 2 .895 2 2z" />
          </svg>
        </button> 
        <dialog   id={`ViewUpdate-${id}`} className="modal">
            <div className="modal-box ">
                <h3 className="font-bold text-lg mb-5">{selectedProperty?.title}</h3>
                <div className="flex flex-col">
                    <div className="w-full flex justify-center">
                        {selectedProperty && (
                            <Image  src={selectedProperty.image } alt="alt" width={300} height={300} />
                        )}
                    </div>
                    <div className="py-4 flex">
                        <svg width="20px" height="20px" viewBox="-5.07 0 43.012 43.012" xmlns="http://www.w3.org/2000/svg">
                            <path id="location" d="M406.185,260.012c-18.028-13.493-16.233-28.572-16.233-28.572h11.184a4.7,4.7,0,0,0-.142,1.1,5.378,5.378,0,0,0,.466,2.1,7.353,7.353,0,0,0,2.622,2.615,5,5,0,0,0,4.218,0,7.316,7.316,0,0,0,2.619-2.615,5.4,5.4,0,0,0,.465-2.105,4.728,4.728,0,0,0-.141-1.1h11.5S424.217,246.277,406.185,260.012Zm4.731-29.576a7.353,7.353,0,0,0-2.619-2.618,4.977,4.977,0,0,0-4.211,0,7.389,7.389,0,0,0-2.622,2.618,6.468,6.468,0,0,0-.326,1H389.966c0-7.972,7.335-14.435,16.383-14.435s16.383,6.463,16.383,14.435H411.242A6.523,6.523,0,0,0,410.915,230.436Z" transform="translate(-389.902 -217)" fill="#2d5be2"/>
                        </svg>
                         <p className="ml-4">{selectedProperty?.location}</p>
                    </div>
                    <p className="py-4">{selectedProperty?.description}</p>
                    <div className="flex">
                        <div className="py-4 mr-4 flex">
                        <svg width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4 0a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V4a4 4 0 00-4-4H4zm1 4a1 1 0 00-1 1v6a1 1 0 001 1h4a1 1 0 001-1V5a1 1 0 00-1-1H5zm7.67 3.048a1 1 0 00-.386-1.234L11 5v6l1.67-3.952z" fill="#000000"/>
                        </svg>
                            <p className="ml-4">{selectedProperty?.type}</p>
                        </div>
                        <div className="py-4 ml-4 flex">
                        <svg width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#000000" fillRule="evenodd" d="M14.1026,4.43011 C14.6139,4.22135 15.1977,4.46661 15.4064,4.97792 C17.0765,9.06841 15.1143,13.7383 11.0239,15.4083 C8.66289,16.3723 6.10818,16.1252 4.05194,14.9602 C3.57143,14.6879 3.40261,14.0776 3.67487,13.5971 C3.94713,13.1166 4.55737,12.9478 5.03789,13.2201 C6.58414,14.0962 8.49796,14.2793 10.2679,13.5567 C13.3357,12.3042 14.8073,8.80177 13.5548,5.73391 C13.346,5.2226 13.5913,4.63886 14.1026,4.43011 Z M2.19544,9.52389 C2.26141,9.77396 2.3444,10.023 2.44513,10.2698 C2.54587,10.5165 2.66092,10.7525 2.78882,10.9773 C3.06197,11.4573 2.89426,12.0678 2.41425,12.341 C1.93424,12.6141 1.32368,12.4464 1.05054,11.9664 C0.879967,11.6666 0.727034,11.3528 0.593515,11.0257 C0.459996,10.6987 0.349566,10.3675 0.261594,10.034 C0.120724,9.50001 0.439434,8.9529 0.973451,8.81203 C1.50747,8.67116 2.05457,8.98987 2.19544,9.52389 Z M2.45915,3.60703 C2.93624,3.88526 3.09744,4.49756 2.81922,4.97464 C2.55491,5.42786 2.35056,5.91419 2.21184,6.42018 C2.06582,6.95281 1.51566,7.26622 0.983026,7.12019 C0.450396,6.97416 0.136992,6.424 0.283019,5.89137 C0.467702,5.21774 0.739666,4.57047 1.09154,3.96709 C1.36977,3.49001 1.98207,3.3288 2.45915,3.60703 Z M10.1104,0.28485 C10.7841,0.469533 11.4313,0.741497 12.0347,1.09338 C12.5118,1.3716 12.673,1.9839 12.3948,2.46098 C12.1166,2.93807 11.5043,3.09927 11.0272,2.82105 C10.574,2.55674 10.0876,2.3524 9.58163,2.21367 C9.049,2.06765 8.7356,1.51749 8.88162,0.984857 C9.02765,0.452227 9.57781,0.138823 10.1104,0.28485 Z M7.18978,0.975282 C7.33065,1.5093 7.01194,2.0564 6.47792,2.19727 C6.22785,2.26324 5.97878,2.34623 5.73205,2.44696 C5.48531,2.5477 5.24933,2.66275 5.02455,2.79066 C4.54454,3.0638 3.93398,2.89609 3.66084,2.41608 C3.3877,1.93607 3.55541,1.32551 4.03542,1.05237 C4.33519,0.881798 4.64904,0.728865 4.97607,0.595346 C5.30309,0.461827 5.6343,0.351397 5.96779,0.263425 C6.50181,0.122556 7.04891,0.441265 7.18978,0.975282 Z"/>
                        </svg>
                            <p className="ml-4">{selectedProperty?.status}</p>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="py-4 text-lg"><strong>$ </strong>{selectedProperty?.price}</div> 
                        <div className="py-4 flex">
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.9707 5.5V9.5C21.9707 11.2615 20.6712 12.7232 18.9692 12.9649C18.6958 13.0038 18.4707 12.7761 18.4707 12.5V12.25C18.4707 8.53 15.4507 5.5 11.7207 5.5H11.4707C11.1946 5.5 10.9669 5.27486 11.0061 5.0015C11.2488 3.30678 12.7099 2 14.4707 2H18.4707C20.4107 2 21.9707 3.57 21.9707 5.5Z" fill="#292D32"/>
                            <path d="M11.7207 7H10.9707H6.9707C4.2107 7 1.9707 9.24 1.9707 12V17C1.9707 19.76 4.2107 22 6.9707 22H11.9707C14.7307 22 16.9707 19.76 16.9707 17V13V12.25C16.9707 9.35 14.6207 7 11.7207 7Z" fill="#292D32"/>
                            </svg>
                            <p className="ml-4 ">{selectedProperty?.area}</p>
                        </div> 
                    </div>
                </div>
                <div className="modal-action">
                <button
                    className="btn btn-md bg-red-400 text-white px-10"
                    onClick={(e) => {
                      e.preventDefault();
                      closeModal();
                    }}
                  >
                    Close
                  </button>
                </div>
            </div>
        </dialog>
    </div>
    );
  };
  
  export default ViewUpdate;
  