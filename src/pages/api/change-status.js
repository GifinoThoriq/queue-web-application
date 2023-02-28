import fs from 'fs'
import path from 'path'
    
export default async function changeStatus(req, res) {

    if(req.method === "POST") {
        const filePath = path.join(process.cwd(),'tickets.json')

        const data = JSON.parse(fs.readFileSync(filePath))

        let index = data.counters.findIndex(counter => counter.id === req.body.counterId);
        if(data.counters[index].status === "offline"){
            data.counters[index].status ="online"
            data.counters[index].current_number = "available"
        } else if(data.counters[index].status === "online"){
            data.counters[index].status ="offline"
            data.counters[index].current_number = "offline"
        }
        
        fs.writeFileSync(filePath, JSON.stringify(data))

        res.status(200).json({message: "status has been changed"})
        
    }

}