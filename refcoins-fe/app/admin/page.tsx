 import AddNewProperty from '../components/addNewProperty'
import AdminPropertyTable from '../components/admin-property-table'
import AdminStats from '../components/admin-stats'

function AddProperty() {
  return (
    <div className='px-6'>
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
    </div>
  )
}

export default AddProperty