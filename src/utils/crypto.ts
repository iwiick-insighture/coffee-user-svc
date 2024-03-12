import configData from "../configs/config";

const crypto = require("crypto");
const algorithm = "aes-256-ctr";
const ENCRYPTION_KEY = configData.encryptionKey;
const IV_LENGTH = 16;

export const encrypt = (text: string) => {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(ENCRYPTION_KEY, "hex"),
    iv
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

export const decrypt = (text: string) => {
  let textParts = text.split(":");
  if (textParts.length < 2) {
    throw new Error("Invalid input format");
  }

  let iv = Buffer.from(textParts.shift()!, "hex");
  let encryptedText = Buffer.from(textParts.join(":"), "hex");

  let decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(ENCRYPTION_KEY, "hex"),
    iv
  );

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};
