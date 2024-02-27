import crypto from "crypto";
const hashData = (data) => {
    return crypto.createHash("sha256").update(data).digest("hex");
};
function encrypt(data) {
    const numberAsString = data.toString();
    const cipher = crypto.createCipher("aes-256-cbc", process.env.SECRET_CODE);
    let encrypted = cipher.update(numberAsString, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}
function decrypt(data) {
    const decipher = crypto.createDecipher("aes-256-cbc", process.env.SECRET_CODE);
    let decrypted = decipher.update(data, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return parseInt(decrypted, 10);
}
const checkRequiredFields = (list, requiredFields, res) => {
    let listOferrors = [];
    requiredFields.filter(field => {
        if (!list[field]) {
            listOferrors.push(field);
        }
    });
    return listOferrors;
};
const emailChecker = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
const accountCodeGenerator = (email) => {
    return email.match(/^([^@]*)@/)[1];
};
const formatData = (data) => {
    return data.map((item) => ({
        ...item,
        id: encrypt(item.id)
    }));
};
export { hashData, encrypt, decrypt, checkRequiredFields, emailChecker, accountCodeGenerator, formatData };
//# sourceMappingURL=function.js.map