import { CurrencyValue } from './money.model'

export interface UserToLogin {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface UserResponseWithJWT {
  token: string;
  user: UserPublicInfo;
}

export interface UserPublicInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  money: Array<CurrencyValue>;
  avatarFileId: string | null;
}
