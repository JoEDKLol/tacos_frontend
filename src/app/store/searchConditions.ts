import { create } from 'zustand';

interface searchObject {
  currentPage:number
  hashTagList: Array<string>[] ;
  keyword:string ;
};

interface searchConditionsState {
  searchCondition : searchObject;
  searchConditionSet: (restaurant:any) => void;
}

const searchConditionsState = create<searchConditionsState>((set) => ({
  searchCondition : {currentPage:0, hashTagList:[], keyword:""}, 
  searchConditionSet: (obj: searchObject) => set({searchCondition: obj}),
}));

export default searchConditionsState;