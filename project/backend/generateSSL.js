import fs from "fs";
import selfsigned from "selfsigned";

const attrs = [{ name: "commonName", value: "localhost" }];

const pems = selfsigned.generate(attrs, {
  keySize: 2048,
  algorithm: "sha256",
  days: 365
});

fs.mkdirSync("./ssl", { recursive: true });

fs.writeFileSync("./ssl/private.key", pems.private);
fs.writeFileSync("./ssl/certificate.crt", pems.cert);

console.log("✅ Valid SSL certificate generated");