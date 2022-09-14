import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Firestore, QuerySnapshot, QueryDocumentSnapshot } from 'firebase-admin/firestore';
import fs from 'fs';

let account: any = undefined;
let database: Firestore | undefined = undefined;
let error: string = "";

try {
    account = JSON.parse(fs.readFileSync("cert.json").toString());
} catch (e: any) {
    error = e.message;
}

if (account) {
    initializeApp({ credential: cert(account) });
    database = getFirestore();
}

export class Database {
    school: Array<any>;
    jobs: Array<any>;
    exp: Array<any>;

    constructor() {
        this.school = [];
        this.jobs = [];
        this.exp = [];
    }

    async init(callback: Function | undefined = undefined): Promise<Database> {
        this.school = [];
        this.jobs = [];
        this.exp = [];

        if (database) {
            let buffer: QuerySnapshot = await database.collection("Resume").get();
            buffer.forEach((result: QueryDocumentSnapshot) => {
                switch (result.get("type")) {
                    case "school":
                        this.school.push(result.data());
                        break;
                    case "job":
                        this.jobs.push(result.data());
                        break;
                    case "exp":
                    default:
                        this.exp.push(result.data());
                        break;
                }
            });

            if (callback)
                callback(this);

            return this;
        } else {
            throw new Error(error);
        }
    }
};