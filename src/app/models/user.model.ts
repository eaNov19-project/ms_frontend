
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
  name: string;
  email: string;
  questionNumber: number;
  lastModified: Date;
}
