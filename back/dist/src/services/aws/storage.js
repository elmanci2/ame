"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload_file = void 0;
const fs_1 = __importDefault(require("fs"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const ACCESS_KEY_ID = "b774dc05c64323db82a022900c8e4da7";
const SECRET_ACCESS_KEY = "acbf112ad31ba1d95f37f2043025ad84b1e1539320ce5309e01217b39dd91735";
const ACCOUNT_ID = "8f9a5687c7367e3512ad8dc3e2d38dd3";
aws_sdk_1.default.config.update({
    region: "<your-region>",
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
});
const s3 = new aws_sdk_1.default.S3({
    region: "auto",
    endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
    },
});
const Bucket = "formule";
const upload_file = (file_path, key) => __awaiter(void 0, void 0, void 0, function* () {
    const stream = fs_1.default.createReadStream(file_path);
    try {
        yield s3
            .upload({
            Bucket,
            Key: key,
            Body: stream,
        })
            .promise();
        return { ok: true };
    }
    catch (error) {
        return null;
    }
});
exports.upload_file = upload_file;
