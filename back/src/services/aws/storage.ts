import fs from "fs";

import AWS from "aws-sdk";

const ACCESS_KEY_ID = "b774dc05c64323db82a022900c8e4da7";
const SECRET_ACCESS_KEY =
  "acbf112ad31ba1d95f37f2043025ad84b1e1539320ce5309e01217b39dd91735";
const ACCOUNT_ID = "8f9a5687c7367e3512ad8dc3e2d38dd3";

AWS.config.update({
  region: "<your-region>",
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

const Bucket = "formule";

export const upload_file = async (file_path: fs.PathLike, key: string) => {
  const stream = fs.createReadStream(file_path);
  try {
    await s3
      .upload({
        Bucket,
        Key: key,
        Body: stream,
      })
      .promise();

    return { ok: true };
  } catch (error) {
    return null;
  }
};
