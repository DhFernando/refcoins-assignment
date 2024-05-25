'use client'

import { PropertyCreatingState, PropertyDeletingState, usePropertyStore } from "@/store/property";
import { useEffect } from "react";

function AdminStats() {

  const fetchPropertyCount = usePropertyStore(state => state.fetchPropertyCount)
  const setPageSize = usePropertyStore(state => state.setPageSize)
  const propertyCount = usePropertyStore(state => state.propertyCount)
  const propertyDeletingState = usePropertyStore(state => state.propertyDeletingState)
  const propertyCreatingState = usePropertyStore(state => state.propertyCreatingState)
  setPageSize
  useEffect(()=>{
    if(
      propertyDeletingState === PropertyDeletingState.COMPLETED || 
      propertyDeletingState === PropertyDeletingState.NOTSTARTED ||
      propertyCreatingState === PropertyCreatingState.COMPLETED ||
      propertyCreatingState === PropertyCreatingState.NOTSTARTED
    ){
      console.log('hey hey hey')
      setPageSize(8)
      fetchPropertyCount()
    }
     
  }, [propertyDeletingState, propertyCreatingState])

  return (
    <div className="stats shadow stats-vertical px-10">
      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Total Properties</div>
        <div className="stat-value">{propertyCount}</div>
        <div className="stat-desc">Jan 1st - Feb 1st</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            ></path>
          </svg>
        </div>
        <div className="stat-title">New Users</div>
        <div className="stat-value">4,200</div>
        <div className="stat-desc">↗︎ 400 (22%)</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            ></path>
          </svg>
        </div>
        <div className="stat-title">New Registers</div>
        <div className="stat-value">1,200</div>
        <div className="stat-desc">↘︎ 90 (14%)</div>
      </div>
    </div>
  );
}

export default AdminStats;
