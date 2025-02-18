import { create } from 'zustand';

interface restaurantObject {
  restaurantseq: number;
  restaurantname:string;
  likeCounts : number
  commentCounts : number
  coordinate : object
  address : string
  img : string,
  thumbImg : string
  introduction : string
  hashtags : Array<string>
};

interface restaurantListState {
  restaurantList: restaurantObject[] ;
  restaurantListSet: (restaurant:any) => void;
  restaurantListAdd: (restaurant:any) => void;
}


const restaurantListState = create<restaurantListState>((set) => ({
  restaurantList : [],
  restaurantListSet: (restaurant: restaurantObject[]) => set({restaurantList: restaurant}),
  restaurantListAdd: (prevState: restaurantObject[]) => set((state)=>({
    ...state,
    restaurantList : [...state.restaurantList, ...prevState]
  }))
}));

export default restaurantListState;