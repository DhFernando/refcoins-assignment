'use client';

import { useForm, SubmitHandler } from 'react-hook-form';

interface FormValues {
  title: string;
  slug: string;
  location: string;
  description: string;
  price: string;
  type: string;
  status: string;
  area: string;
}

function AddNewProperty() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const openModal = () => {
    const modal = document.getElementById(
      'my_modal_1'
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  const closeModal = () => {
    const modal = document.getElementById(
      'my_modal_1'
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };

  return (
    <div>
      <button className="btn btn-sm bg-blue-600 text-white" onClick={openModal}>
      Add   Property +
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Property</h3>

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
                type="text"
                placeholder="Price"
                className="input input-bordered w-full"
                {...register('price', { required: true })}
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
                >
                  <option value="" disabled selected>
                    Type
                  </option>
                  <option value="Single Family">Single Family</option>
                  <option value="Villa">Villa</option>
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
                >
                  <option value="" disabled selected>
                    Status
                  </option>
                  <option value="Sale">Sale</option>
                  <option value="For Rent">For Rent</option>
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
                type="text"
                placeholder="sq ft"
                className="input input-bordered w-full "
                {...register('area', { required: true })}
              />
              <span className="label-text-alt">
                {errors.area && (
                  <p className="text-red-500">Area is required</p>
                )}
              </span>
            </label>

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
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default AddNewProperty;
