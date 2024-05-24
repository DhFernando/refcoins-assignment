import { create } from 'zustand';
import axios from 'axios';
import { Property } from '@/types/property';


type PropertyStore = {
    properties: Property[] | null;
    propertyCount: number;
    page: number;
    pageSize: number;
    loading: boolean;
    totalPages: number;
    error: string | null; // Specify the type of `error` explicitly
    fetchProperties: (page?: number) => Promise<void>; // Updated function signature
    fetchPropertyCount: () => Promise<void>; // No arguments needed for this function
};


  export const usePropertyStore = create<PropertyStore>((set, get) => ({
    properties: null,
    propertyCount: 0,
    pageSize: 3,
    page: 1,
    totalPages: 0,
    loading: false,
    error: null,
    fetchProperties: async (page?: number) => {
        set({ loading: true, error: null });
        try {
          const currentPage = page !== undefined ? page : get().page;
          const currentPageSize = get().pageSize;
          const response = await axios.get(`http://localhost:3000/property?page=${currentPage}&pageSize=${currentPageSize}`);
          set({ properties: response.data, loading: false });
          if (page !== undefined) {
            set({ page: currentPage });
          }
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
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
  }));
  