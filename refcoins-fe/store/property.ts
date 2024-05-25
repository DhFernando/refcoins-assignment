import { create } from 'zustand';
import axios from 'axios';
import { CreateProperty, Property } from '@/types/property';
import { FilterFormData } from '@/app/components/Home/filter';


type PropertyStore = {
    properties: Property[] | null;
    propertyCount: number;
    page: number;
    pageSize: number;
    loading: boolean;
    totalPages: number;
    error: string | null; // Specify the type of `error` explicitly
    fetchProperties: (page?: number, filters?: FilterFormData, pageSize?: number) => Promise<void>; // Updated function signature
    fetchPropertyCount: () => Promise<void>; // No arguments needed for this function
    setPageSize:(num?: number)=> void;
    createNewProperty:(propertyData: CreateProperty)=> Promise<void>;
};


  export const usePropertyStore = create<PropertyStore>((set, get) => ({
    properties: null,
    propertyCount: 0,
    pageSize: 3,
    page: 1,
    totalPages: 0,
    loading: false,
    error: null,
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
      set((state) => ({pageSize: size })); 
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
          const response = await axios.post('http://localhost:3000/property', propertyData);
          console.log('====================================');
          console.log(propertyData, 'ooo');
          console.log(response);
          console.log('====================================');
        } catch (error) {
          console.log('====================================');
          console.log(error);
          console.log('====================================');
        }
        console.log(propertyData)
      }
  }));
  