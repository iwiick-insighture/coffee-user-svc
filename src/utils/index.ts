import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

export const getPrefixedUUID = () => {
  return `user_${uuidv4()}`;
};
