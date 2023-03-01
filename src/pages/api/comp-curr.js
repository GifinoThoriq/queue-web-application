import fs from 'fs'
import path from 'path'

export default function compCurr(req, res) {
    if(req.method === "POST") {
        const filePath = path.join(process.cwd(),'tmp','tickets.json')

        const data = JSON.parse(fs.readFileSync(filePath))

        let index = data.counters.findIndex(counter => counter.id === req.body.counterId)

        if(data.counters[index].status === "online" || data.counters[index].status === "offline") {
            res.status(201).json({message: "No number need to be completed"})
            return;
        }

        data.last_ticket_number = data.counters[index].current_number
        data.counters[index].current_number = "available"
        data.counters[index].status = "online"
        
        fs.writeFileSync(filePath, JSON.stringify(data))

        res.status(200).json({message: "Number succesfully complete"})
        
    }
}