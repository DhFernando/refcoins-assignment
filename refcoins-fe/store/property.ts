import { create } from 'zustand';
import axios from 'axios';
import { CreateProperty, Property } from '@/types/property';
import { FilterFormData } from '@/app/components/Home/filter'; 


export enum PropertyCreatingState {
  NOTSTARTED='NOTSTARTED',
  STARTED='STARTED',
  COMPLETED='COMPLETED',
  FAILED='FAILED'
}
export enum PropertyDeletingState {
  NOTSTARTED='NOTSTARTED',
  STARTED='STARTED',
  COMPLETED='COMPLETED',
  FAILED='FAILED'
}

type PropertyStore = {
    properties: Property[];
    propertyCount: number;
    page: number;
    pageSize: number;
    loading: boolean;
    propertyCreatingState:PropertyCreatingState,
    propertyDeletingState:PropertyDeletingState,
    totalPages: number;
    error: string | null; // Specify the type of `error` explicitly
    fetchProperties: (page?: number, filters?: FilterFormData, pageSize?: number) => Promise<void>; // Updated function signature
    fetchPropertyCount: () => Promise<void>; // No arguments needed for this function
    setPageSize:(num?: number)=> void;
    createNewProperty:(propertyData: CreateProperty)=> Promise<void>;
    deleteProperty:(id: string)=> Promise<void>;
    setPropertyCreatingState: (state: PropertyCreatingState)=> void;
    setPropertyDeletingState: (state: PropertyDeletingState)=> void;
};


  export const usePropertyStore = create<PropertyStore>((set, get) => ({
    properties: [],
    propertyCount: 0,
    pageSize: 3,
    page: 1,
    totalPages: 0,
    loading: false,
    error: null,
    propertyCreatingState: PropertyCreatingState.NOTSTARTED,
    propertyDeletingState: PropertyDeletingState.NOTSTARTED,
    fetchProperties: async (page?: number, filters?: FilterFormData, pageSize?: number) => {
        set({ loading: true, error: null });
        try {
          const currentPage = page !== undefined ? page : get().page;
          const currentPageSize = pageSize !== undefined ? pageSize :  get().pageSize;
          let url = `http://localhost:3000/property?page=${currentPage}&pageSize=${currentPageSize}`;
      
          // If filters are provided, add them to the URL
          if (filters) {
            // Assuming the filter criteria match the property attributes
            if (filters.mainLocation) url += `&mainLocation=${encodeURIComponent(filters.mainLocation)}`;
            if (filters.status) url += `&status=${encodeURIComponent(filters.status)}`;
            if (filters.type) url += `&type=${encodeURIComponent(filters.type)}`;
          }
      
          const response = await axios.get(url);
          set({ properties: response.data, loading: false });
          if (page !== undefined) {
            set({ page: currentPage });
          }
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },

    setPageSize:(size?: number)=>{
      set(() => ({pageSize: size })); 
    },
      
    fetchPropertyCount: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get('http://localhost:3000/property/totalPropertyCount');
          set((state) => ({propertyCount: response.data, loading: false, totalPages: Math.ceil(response.data / state.pageSize) })); 
        } catch (error: any) { // Explicitly specify the type of error as 'any'
          set({ error: error.message, loading: false });
        }

      },
      createNewProperty: async (propertyData: CreateProperty) => {
        try {
          set(()=> ({propertyCreatingState: PropertyCreatingState.STARTED}))
          await axios.post('http://localhost:3000/property', propertyData);
          set(( )=>({  propertyCreatingState: PropertyCreatingState.COMPLETED })) 
        } catch (error) {  
          set(()=>({ propertyCreatingState: PropertyCreatingState.FAILED })) 
        } 
      },
      deleteProperty: async (id: string) => {
        try {
          set(()=> ({propertyDeletingState: PropertyDeletingState.STARTED}))
          await axios.delete(`http://localhost:3000/property/${id}`); 
          set(()=> ({propertyDeletingState: PropertyDeletingState.COMPLETED}))
        } catch (error) {
          console.log(error)
          set(()=> ({propertyDeletingState: PropertyDeletingState.FAILED}))
        }
      },
      setPropertyCreatingState: (state: PropertyCreatingState)=>{
        set(()=> ({propertyCreatingState: state}))
      },
      setPropertyDeletingState: (state: PropertyDeletingState)=> {
        set(()=> ({propertyDeletingState: state}))
      }
  }));
  