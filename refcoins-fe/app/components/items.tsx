function Items() {
  return (
    <div className="w-96 bg-base-100">
      <div className="relative">
        <figure className="px-8 pt-10">
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
            className="rounded-xl"
          />
          <div className=" badge badge-neutral absolute top-[50px] left-[40px] bg-white border-none   px-2 py-1">
            <strong>For Sale</strong>
          </div>
        </figure>
      </div>
      <div className="card-body ">
        <h2 className="card-title text-base">Villa in Coral Gables</h2>
        <p className="text-sm">If a dog chews shoes whose shoes does he choose?</p> 
        <p className="text-blue-600">Villa</p>
        <p className="text-lg font-bold">$834,000</p>
        <div className="card-actions">
           
        </div>
      </div>
    </div>
  );
}

export default Items;
