export type TUser = {
  id: string;
  password: string;
  needPasswordChange?: boolean;
  role: "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
};

// export type TNewUser = {
//   id: string;
//   password: string;
//   role: "admin" | "student" | "faculty";
// };
