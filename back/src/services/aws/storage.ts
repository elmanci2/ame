import { S3Client, PutObjectAclCommand } from "@aws-sdk/client-s3";

import fs from "fs";

const ACCESS_KEY_ID = "b774dc05c64323db82a022900c8e4da7";
const SECRET_ACCESS_KEY =
  "acbf112ad31ba1d95f37f2043025ad84b1e1539320ce5309e01217b39dd91735";
const ACCOUNT_ID = "8f9a5687c7367e3512ad8dc3e2d38dd3";

const client = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

const file_path = "";

export const upload_file = async () => {
  const stream = fs.createReadStream(file_path);
  const uploadParams = {
    Bucket: "STRING_VALUE",
    Key: "STRING_VALUE",
    Body: stream,
  };
  const command = new PutObjectAclCommand(uploadParams);
  return await client.send(command);
};
