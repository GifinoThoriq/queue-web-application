import fs from 'fs'
import path from 'path'
    
export default async function newNumber(req, res) {

    if(req.method === "POST") {
        const filePath = path.join(process.cwd(),'tickets.json')

        const data = JSON.parse(fs.readFileSync(filePath))

        let num = parseInt(Math.random() * 100);

        while(data.waiting_queue.includes(num)){
            num = parseInt(Math.random() * 100);
        }

        data.waiting_queue.push(num)
        
        fs.writeFileSync(filePath, JSON.stringify(data))

        res.status(200).json(data)
        
    }

}