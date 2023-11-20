import { createContext, useContext } from 'react';
import { UserData } from '../types/common';
import { Nullable } from '../types/utils';

/** TODO в дальнейших спринтах перевести на стейт менеджер */
interface UserStore {
  userData?: UserData | null;
  setUserData?: (data?: Nullable<UserData>) => void;
}

const UserStoreContext = createContext<UserStore>({});
export const UserStoreProvider = UserStoreContext.Provider;
export const useUserStore = () => useContext(UserStoreContext);
