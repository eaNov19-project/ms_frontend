
export interface SignupResult {
  success: string;
  message: string;
  data: {
    auth: {
      userId: number;
      email: string;
    }
  }
}

export interface UserInfo {
  userId: number;
  name: string;
  email: string;
  phone: string;
  noOfQuestions: number;
  lastUpdated: string;
}