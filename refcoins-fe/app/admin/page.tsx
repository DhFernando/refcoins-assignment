 import AddNewProperty from '../components/add-new-property'
import AdminPropertyTable from '../components/admin-property-table'
import AdminStats from '../components/admin-stats'
import FileUpload from '../components/FileUpload'
import Paginator from '../components/Home/paginator'

function AddProperty() {
  return (
    <div className='px-6'>
       <FileUpload />
      <div className='flex bg-gray-100 py-5 rounded-md pl-5 mb-2'>
          <h1>Some Filters are here</h1>
         <AddNewProperty />
      </div>
      <div className='flex  '>
        <div className='mx-10'>
          <AdminStats />
        </div>
        <AdminPropertyTable />
        
      </div>
      <div className=' flex justify-center'>
        <Paginator />
      </div>
    </div>
  )
}

export default AddProperty