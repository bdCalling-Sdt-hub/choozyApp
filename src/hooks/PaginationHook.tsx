import debounce from 'lodash.debounce';
import React from 'react';
import { useContextApi } from '../../context/ContextApi';

// Debounce Hook for pagination
// pagination hoop need all type 
// fetchItems,setAllTask,allTask,setTaskPage,taskPage,currentData,taskFetching




const PaginationHook: (
  fetchItems: (args: { token: string; page: number }) => Promise<any>,
  setAllItem: React.Dispatch<React.SetStateAction<any[]>>,
  allItem: any[],
  setPage: React.Dispatch<React.SetStateAction<number>>,
  page: number,
  currentData: any,
  isFetching: boolean
) => [() => void, () => Promise<void>] = (
  fetchItems,
  setAllItem,
  allItem,
  setPage,
  page,
  currentData,
  isFetching
) => {
    const {user} = useContextApi()
    // console.log("Fetching");
    const loadItems = async () => {
        try {
          const response = await fetchItems({ token : user?.token , page   }).unwrap();
           setAllItem(allItem?.concat(response?.data));
          setPage((prevPage) => prevPage + 1);
        } catch (error) {
          console.error(error);
        }
      };
    
    
      const handleLoadMore = debounce(() => {
          if ( currentData?.pagination?.totalPage >= page && !isFetching) {  
            loadItems();
          }
        },500)

      return[handleLoadMore,loadItems]
}

export default PaginationHook

