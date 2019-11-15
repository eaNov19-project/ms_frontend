
export function tokenGetter() {
    return localStorage.getItem('access_token');
  }

export function tokenSetter(token) {
    localStorage.setItem('access_token', token);
}

export function tokenRemove() {
    localStorage.removeItem('access_token');
}
  