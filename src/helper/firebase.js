import admin from "firebase-admin";
import { initializeApp, cert } from 'firebase-admin/app';
import config from "config";

let serviceAccount = config.get("firebase");
const storageBucketUrl = config.get('storageBucketUrl');

initializeApp({
    credential: cert(serviceAccount),
    storageBucket: storageBucketUrl
});

let bucket = admin.storage().bucket();

export const uploadFile = async (body) => {
    try {
        let res = await bucket.upload(body.file.path, { destination: body.folder + '/' + body.file.filename });
        if (res) {
            let data = res[0];
            if (data) {
                let url = await data.getSignedUrl({
                    action: 'read',
                    expires: '01-01-3000'
                });

                return url;
            }
        }
    }
    catch (e) { console.log(e); return null }
};