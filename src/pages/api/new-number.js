import fs from 'fs'
import path from 'path'
    
export default async function newNumber(req, res) {

    if(req.method === "POST") {

        const filePath = path.join(process.cwd(),'tmp','tickets.json');

        const data = JSON.parse(fs.readFileSync(filePath))

        let num = parseInt(Math.random() * 100);

        while(data.waiting_queue.includes(num)){
            num = parseInt(Math.random() * 100);
        }

        data.waiting_queue.push(num)
        
        fs.writeFile(filePath, JSON.stringify(data), function(err){
            if(err) {
                console.log(err)
            } else {
                console.log("success")
            }
        })
        
        res.status(200).json(data)
    }
}