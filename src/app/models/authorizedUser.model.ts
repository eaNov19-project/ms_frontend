export interface AuthorizedUserModel {
  _id: string;
  email: string;
  // username: string;
}

export function newAuthorizedUserModel() {
  const user: AuthorizedUserModel = {
      _id: '',
      email: '',
      // username: ''
    }
  ;
  return user;
}
