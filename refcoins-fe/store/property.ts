import { create } from 'zustand';
import axios from 'axios';
import { CreateProperty, Property } from '@/types/property';
import { FilterFormData } from '@/app/components/filter';
import axiosInstance from '@/axiosInstance'; 


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
    filterWith: FilterFormData;
    selectedProperty: Property | null;
    fetchProperties: (page?: number, pageSize?: number) => Promise<void>; // Updated function signature
    fetchPropertyCount: () => Promise<void>; // No arguments needed for this function
    setPageSize:(num?: number)=> void;
    createNewProperty:(propertyData: CreateProperty, gRecaptchaToken: string)=> Promise<void>;
    deleteProperty:(id: string)=> Promise<void>;
    setPropertyCreatingState: (state: PropertyCreatingState)=> void;
    setPropertyDeletingState: (state: PropertyDeletingState)=> void;
    setFilterWith:(data: FilterFormData) => void;
    fetchPropertyById: (id: string) => Promise<void>;
    clearSelectedProperty: () => void;
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
    filterWith: {
      mainLocation: '',
      status: '',
      type: '',
    },
    selectedProperty: null,
    fetchProperties: async (page?: number, pageSize?: number) => {
        set({ loading: true, error: null });
        try {
          const currentPage = page !== undefined ? page : get().page;
          const currentPageSize = pageSize !== undefined ? pageSize :  get().pageSize;
          let url = `/property?page=${currentPage}&pageSize=${currentPageSize}`;
      
          
        // Assuming the filter criteria match the property attributes
        if (get().filterWith.mainLocation) url += `&location=${encodeURIComponent(get().filterWith.mainLocation)}`;
        if (get().filterWith.status) url += `&status=${encodeURIComponent(get().filterWith.status)}`;
        if (get().filterWith.type) url += `&type=${encodeURIComponent(get().filterWith.type)}`;
         
          const response = await axiosInstance.get(url);
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
          let url = '/property/totalPropertyCount?';
          if (get().filterWith.mainLocation) url += `&location=${encodeURIComponent(get().filterWith.mainLocation)}`;
          if (get().filterWith.status) url += `&status=${encodeURIComponent(get().filterWith.status)}`;
          if (get().filterWith.type) url += `&type=${encodeURIComponent(get().filterWith.type)}`;
          
          const response = await axiosInstance.get(url);
          set((state) => ({propertyCount: response.data, loading: false, totalPages: Math.ceil(response.data / state.pageSize) })); 
        } catch (error: any) { // Explicitly specify the type of error as 'any'
          set({ error: error.message, loading: false });
        }

      },
      createNewProperty: async (propertyData: CreateProperty, gRecaptchaToken: string) => { 
        try {
          const res = await axios.post('/api/recaptchaSubmit', { gRecaptchaToken }); 
          if (res && res.data?.success && res.data?.score > 0.5) {
            console.log('res.data?.score', res.data?.score);
            set(()=> ({propertyCreatingState: PropertyCreatingState.STARTED}))
            await axiosInstance.post('/property', propertyData);
            set(( )=>({  propertyCreatingState: PropertyCreatingState.COMPLETED })) 
          }
        } catch (error) {
          console.log(error);
          set(()=>({ propertyCreatingState: PropertyCreatingState.FAILED })) 
        } 
      },
      deleteProperty: async (id: string) => {
        try {
          set(()=> ({propertyDeletingState: PropertyDeletingState.STARTED}))
          await axiosInstance.delete(`/property/${id}`); 
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
      },
      setFilterWith:(data: FilterFormData) => {
        set(()=> ({filterWith: data}))
      },
      fetchPropertyById: async (id: string) => {
        try {
          const property = await axiosInstance.get(`/property/${id}`);
          set(()=> ({ selectedProperty: property.data })) 
        } catch (err) {
          console.log(err); 
        } 
      },
      clearSelectedProperty: () => {
        set(() => ({ selectedProperty: null}))
      }
  }));
  