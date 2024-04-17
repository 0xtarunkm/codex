type decodedUser = {
  id: string;
  email: string;
};

declare namespace Express {
  interface Request {
    decodedUser: decodedUser;
  }
}
