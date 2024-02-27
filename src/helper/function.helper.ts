import crypto from "crypto";
const hashData = (data: string): string => {
  return crypto.createHash("sha256").update(data).digest("hex");
};

function encrypt(data: string): string {
  const numberAsString: string = data.toString();
  const cipher: crypto.Cipher = crypto.createCipher("aes-256-cbc", process.env.SECRET_CODE!);
  let encrypted: string = cipher.update(numberAsString, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decrypt(data: string): number {
  const decipher: crypto.Decipher = crypto.createDecipher("aes-256-cbc", process.env.SECRET_CODE!);
  let decrypted: string = decipher.update(data, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return parseInt(decrypted, 10);
}


const checkRequiredFields = (list: any, requiredFields: string[], res): string[] => {
  let listOferrors: string[] = [];
  requiredFields.filter(field => {
    if (!list[field]) {
      listOferrors.push(field);
    }
  });
  return listOferrors;
};

const emailChecker = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
const accountCodeGenerator = (email: string): string => {
  return email.match(/^([^@]*)@/)[1]
}

const formatData = (data: any[]) => {
  return data.map((item) => ({
    ...item,
    id: encrypt(item.id)
  }));
};


export {
  hashData,
  encrypt,
  decrypt,
  checkRequiredFields,
  emailChecker,
  accountCodeGenerator,
  formatData
};
