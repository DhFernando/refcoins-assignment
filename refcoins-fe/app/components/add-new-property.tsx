'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import FileUpload from './admin/file-upload';
import { CreateProperty, PropertyType } from '@/types/property';
import { PropertyCreatingState, usePropertyStore } from '@/store/property';
import { PropertyStatus } from '../../types/property';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

function AddNewProperty() {
  const createNewProperty = usePropertyStore(state => state.createNewProperty)
  const propertyCreatingState = usePropertyStore(state => state.propertyCreatingState)
  const setPropertyCreatingState = usePropertyStore(state => state.setPropertyCreatingState)
  const {
    register,
    handleSubmit,
    setValue,
    getValues, 
    reset,
    formState: { errors,  },
  } = useForm<CreateProperty>();
 

  const openModal = () => {
    const modal = document.getElementById( 'my_modal_1' ) as HTMLDialogElement | null;
    if (modal)  modal.showModal(); 
  };

  const closeModal = () => {
    const modal = document.getElementById( 'my_modal_1') as HTMLDialogElement | null;
    if (modal) modal.close(); 
  };

  const onSubmit: SubmitHandler<CreateProperty> = (data) => {  
    if(!getValues('image')) data = {...data, image: process.env.NEXT_PUBLIC_DEFAULT_PROPERTY_IMAGE as string }

    createNewProperty(data);
  }; 
  useEffect(()=>{
    if(propertyCreatingState === PropertyCreatingState.COMPLETED){
      Swal.fire({  position: "top-end", icon: "success", title: "Property has been saved", showConfirmButton: false, timer: 1500 }); 
      reset() 
      closeModal()
      setPropertyCreatingState(PropertyCreatingState.NOTSTARTED)
    }
    if(propertyCreatingState === PropertyCreatingState.FAILED){
      Swal.fire({ position: "top-end", icon: "error", title: "Something Went Wrong", showConfirmButton: false, timer: 1500 }); 
      setPropertyCreatingState(PropertyCreatingState.NOTSTARTED)
    }
  },[propertyCreatingState, reset])

  const getImageUrl = (url: string) =>{ setValue("image", url) }

  return (
    <div>
      <button className="btn btn-sm bg-blue-600 text-white" onClick={openModal}>
        Add Property +
      </button>
      <dialog id="my_modal_1" className="modal ">
        <div className="modal-box max-w-none w-[900px]">
          <h3 className="font-bold text-lg">Add New Property</h3>

          <div className='flex w-full'> 
            <div className='w-[400px] mr-5 mt-10'>
              <FileUpload getImageUrl={getImageUrl}/> 
            </div>
            <div className='w-full'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Title</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Title"
                    className="input input-bordered w-full"
                    {...register('title', { required: true })}
                  />
                  <span className="label-text-alt">
                    {errors.title && (
                      <p className="text-red-500">Title is required</p>
                    )}
                  </span>
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Slug</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Slug"
                    className="input input-bordered w-full"
                    {...register('slug', { required: true })}
                  />
                  <span className="label-text-alt">
                    {errors.slug && (
                      <p className="text-red-500">Slug is required</p>
                    )}
                  </span>
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Location</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Location"
                    className="input input-bordered w-full"
                    {...register('location', { required: true })}
                  />
                  <span className="label-text-alt">
                    {errors.location && (
                      <p className="text-red-500">Location is required</p>
                    )}
                  </span>
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Description</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Description"
                    className="input input-bordered w-full"
                    {...register('description', { required: true })}
                  />
                  <span className="label-text-alt">
                    {errors.description && (
                      <p className="text-red-500">Description is required</p>
                    )}
                  </span>
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Price</span>
                  </div>
                  <input
                    type="number"
                    placeholder="Price"
                    className="input input-bordered w-full"
                    {...register('price', { required: true, valueAsNumber: true })}
                  />
                  <span className="label-text-alt">
                    {errors.price && (
                      <p className="text-red-500">Price is required</p>
                    )}
                  </span>
                </label>

                <div className="flex mt-5">
                  <label className="form-control w-full max-w-xs">
                    <select
                      className="select select-bordered"
                      {...register('type', { required: true })}
                      defaultValue=""
                    >
                      <option value="" disabled selected>
                        Type
                      </option>
                      <option value={PropertyType.SingleFamily}>Single Family</option>
                      <option value={PropertyType.Villa}>Villa</option>
                    </select>
                    <div className="label">
                      <span className="label-text-alt">
                        {errors.type && (
                          <p className="text-red-500">Type is required</p>
                        )}
                      </span>
                    </div>
                  </label>

                  <label className="form-control w-full max-w-xs">
                    <select
                      className="select select-bordered"
                      {...register('status', { required: true })}
                      defaultValue=""
                    >
                      <option value="" disabled selected>
                        Status
                      </option>
                      <option value={PropertyStatus.ForSale}>Sale</option>
                      <option value={PropertyStatus.ForRent}>For Rent</option>
                    </select>
                    <div className="label">
                      <span className="label-text-alt">
                        {errors.status && (
                          <p className="text-red-500">Status is required</p>
                        )}
                      </span>
                    </div>
                  </label>
                </div>

                <label className="form-control w-full  ">
                  <div className="label">
                    <span className="label-text">Property Area in sq ft</span>
                  </div>
                  <input
                    type="number"
                    placeholder="sq ft"
                    className="input input-bordered w-full "
                    {...register('area', { required: true, valueAsNumber: true })}
                  />
                  <span className="label-text-alt">
                    {errors.area && (
                      <p className="text-red-500">Area is required</p>
                    )}
                  </span>
                </label>

                    {propertyCreatingState !== PropertyCreatingState.STARTED ? (
                      <div className="flex justify-end mt-10">
                        <button
                            type="submit"
                            className="btn btn-md bg-blue-600 text-white px-10"
                          >
                            Save Property
                          </button>
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
                    ): (
                      <div className="flex justify-end mt-10">
                        <button className="btn" disabled><span className="loading loading-dots loading-lg"></span> Creating</button>
                      </div>
                      
                    )}
                
              </form>
            </div>
            
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default AddNewProperty;
