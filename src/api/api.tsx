import axios from "axios";

export interface User {
    id: number;
    name: string;
    email: string;
   
  }
  



export const fetchUsers = async (): Promise<User[]> => {
    const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
    return response.data;
  };
  
