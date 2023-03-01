import fs from 'fs'
import path from 'path'
    
export default async function callNext(req, res) {

    if(req.method === "POST") {
        const filePath = path.join(process.cwd(),'tmp','tickets.json');

        const data = JSON.parse(fs.readFileSync(filePath))

        let index = data.counters.findIndex(counter => counter.id === req.body.counterId);

        if(data.counters[index].status === "offline"){
            res.status(201).json({message: "counter was offline"})
            return;
        }

        if(data.waiting_queue.length < 1 ){
            res.status(201).json({message: "There is no number left in waiting queue"})
            return;
        }

        let curr_number = data.waiting_queue.shift()
        data.counters[index].current_number = curr_number
        data.counters[index].status = "serving"
        data.current_ticket_number = curr_number

        fs.writeFileSync(filePath, JSON.stringify(data))

        res.status(200).json({message: "number has been updated"})
        
    }

}