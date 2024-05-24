import Filter from './components/Home/filter';  
import Paginator from './components/Home/paginator';
import PropertyItems from './components/property-items';

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
            <h1>Find Your Dream Home</h1> 
          </div>
          <div className="w-full flex justify-center my-5">
              <div className=" w-[100px] border-white border"> </div>
          </div>
          <Filter />
        </div>
      </div>
      <div className="flex  flex-col">
        <div className="flex flex-wrap">
          <PropertyItems /> 
        </div>
        <div className="flex justify-center ">
          <Paginator />
        </div>
      </div>
    </main>
  );
}
