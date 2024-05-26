 
import AddNewProperty from '../components/admin/add-new-property'
import AdminPropertyTable from '../components/admin/admin-property-table'
import AdminStats from '../components/admin/admin-stats' 
import Filter from '../components/filter'
import Paginator from '../components/paginator'

function AddProperty() {
  return (
    <div className='px-6'> 
      <div className='flex bg-gray-100 py-5 rounded-md pl-5 mb-2 items-center justify-between'>
          <Filter />
          <AddNewProperty />
      </div>
      <div className='flex  '>
        <div className='mr-10'>
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