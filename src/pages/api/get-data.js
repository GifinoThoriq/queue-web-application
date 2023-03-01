import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if(req.method === "GET"){
        const filePath = path.join(process.cwd(),'tmp','tickets.json');

        const data = JSON.parse(fs.readFileSync(filePath))

        res.status(200).json(data)
    }

}