type NullableString = string | null | undefined;

/**
 * Текущий пользователь
 */
export interface CurrentUser {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  display_name?: NullableString;
  avatar: NullableString;
  email: NullableString;
  phone: NullableString;
}
