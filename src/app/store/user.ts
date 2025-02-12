import { create } from 'zustand';

interface userState {
  id: string;
  email:string;
  userseq : number
  userSet: (obj:any) => void;
}

// 초기 상태 정의
const userState = create<userState>((set) => ({
  id : "",
  email : "",
  userseq : 0, 
  userSet: (obj:any) => {set({ id:obj.id, email:obj.email, userseq:obj.userseq})},
}));

export default userState;