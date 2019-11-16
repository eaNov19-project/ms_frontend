
export function userInfoGetter() {
    return localStorage.getItem('user_info');
  }

export function userInfoSetter(user_info) {
    localStorage.setItem('user_info', user_info);
}

export function userInfoRemove() {
    localStorage.removeItem('user_info');
}
  