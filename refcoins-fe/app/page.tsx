import Items from './components/items';

export default function Home() {
  return (
    <main>
      <div
        className="relative flex items-center justify-center h-[400px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative p-4 rounded-lg z-10">
          <div className="text-center text-white text-[30px]">
            <h1>Looking To Byt or Rent a Property? </h1>
            <h1>Find Your Dream Home </h1>
          </div>
          <div className="w-full flex justify-center my-5">
            <div className=" w-[100px] border-white border"> </div>
          </div>
          <div className="flex flex-row bg-white p-3 rounded-md ">
            <label className="form-control w-full max-w-xs mx-5">
              <select className="select select-bordered rounded-[5px] ">
                <option disabled selected>
                  Pick one
                </option>
                <option>Star Wars</option>
                <option>Harry Potter</option>
                <option>Lord of the Rings</option>
                <option>Planet of the Apes</option>
                <option>Star Trek</option>
              </select>
            </label>

            <label className="form-control w-full max-w-xs mx-5">
              <select className="select select-bordered">
                <option disabled selected>
                  Pick one
                </option>
                <option>Star Wars</option>
                <option>Harry Potter</option>
                <option>Lord of the Rings</option>
                <option>Planet of the Apes</option>
                <option>Star Trek</option>
              </select>
            </label>

            <label className="form-control w-full max-w-xs mx-5">
              <select className="select select-bordered">
                <option disabled selected>
                  Pick one
                </option>
                <option>Star Wars</option>
                <option>Harry Potter</option>
                <option>Lord of the Rings</option>
                <option>Planet of the Apes</option>
                <option>Star Trek</option>
              </select>
            </label>

            <button className="btn btn-square bg-blue-700 text-white mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M30.531 29.469l-10.453-10.453c1.604-1.861 2.58-4.301 2.58-6.97 0-5.912-4.793-10.704-10.704-10.704s-10.704 4.793-10.704 10.704c0 5.912 4.793 10.704 10.704 10.704 0.016 0 0.032-0 0.048-0h-0.002c2.697-0.011 5.156-1.022 7.027-2.681l-0.011 0.010 10.453 10.453c0.136 0.136 0.324 0.22 0.531 0.22 0.415 0 0.751-0.336 0.751-0.751 0-0.207-0.084-0.395-0.22-0.531v0zM2.75 12c0-5.109 4.141-9.25 9.25-9.25s9.25 4.141 9.25 9.25c0 5.109-4.141 9.25-9.25 9.25v0c-5.106-0.006-9.244-4.144-9.25-9.249v-0.001zM16 11.25h-3.25v-3.25c0-0.414-0.336-0.75-0.75-0.75s-0.75 0.336-0.75 0.75v0 3.25h-3.25c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h3.25v3.25c0 0.414 0.336 0.75 0.75 0.75s0.75-0.336 0.75-0.75v0-3.25h3.25c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0z"></path>
              </svg>
            </button>
            <button className="btn bg-blue-400 text-white px-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10z"
                  fill="#0D0D0D"
                />
              </svg>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="flex  flex-col">
        <div className="flex flex-wrap">
          <Items />
          <Items />
          <Items />
          <Items />
          <Items />
          <Items />
        </div>
        <div className="flex justify-center ">
          <div className=" ">
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label="1"
              checked
            />
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label="2"
            />
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label="3"
            />
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label="4"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
