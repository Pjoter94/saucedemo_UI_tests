export interface User {
  username: string;
  password: string;
}

export const StandardUser: User = {
  username: "standard_user",
  password: "secret_sauce",
};

export const LockedUser: User = {
  username: "locked_out_user",
  password: "secret_sauce",
};
