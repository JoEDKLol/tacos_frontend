import { create } from 'zustand';




interface userState {
  id: string;
  email:string;
  userseq : number
  likesArr : [
    {
      userseq : number
      restaurantseq : number
      likeyn : string
    }
  ]
  userSet: (obj:any) => void;
}

// 초기 상태 정의
const userState = create<userState>((set) => ({
  id : "",
  email : "",
  userseq : 0, 
  likesArr : [{userseq:0, restaurantseq:0, likeyn:""}], 
  userSet: (obj:any) => {set({ id:obj.id, email:obj.email, userseq:obj.userseq, likesArr:obj.likesArr})},
}));

export default userState;