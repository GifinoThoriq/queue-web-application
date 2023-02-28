import CircleStatus from "./CircleStatus"
import styles from "@/styles/CounterCust.module.css"

export default function CardCounterCustomer({id, status, current_number}){
    return(
        <div key={id} className={styles.cardCounter}>
            <CircleStatus status={status} />
            <span>counter {id}</span>
            <span>{current_number}</span>
        </div>
    )
}