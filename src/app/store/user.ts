import { create } from 'zustand';

interface userState {
  id: string;
  email:string;
  userSet: (obj:any) => void;
}

// 초기 상태 정의
const userState = create<userState>((set) => ({
  id : "",
  email : "",
  userSet: (obj:any) => {set({ id:obj.id, email:obj.email})},
}));

export default userState;