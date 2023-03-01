import styles from '@/styles/Counter.module.css'
import Button from '@/component/Button';


export default function CardCounter({
    id,
    status,
    onChangeStatus,
    onCompleteCurrent,
    onCallNext

}){

    function changeStatus(id){
        onChangeStatus(id)
    }

    function completeCurrent(id){
        onCompleteCurrent(id)
    }

    function callNext(id){
        onCallNext(id)
    }


    return(
        <div key={id} className={styles.cardContainer}>
            <span>counter {id}</span>
            <Button onClick={()=>changeStatus(id)}>Go {status === "offline" ? "Offline" : "Online"}</Button>
            <Button onClick={()=>completeCurrent(id)}>comp curr</Button>
            <Button onClick={()=>callNext(id)}>call next</Button>
        </div>
    )
}