import styles from '@/styles/Counter.module.css'

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
            <button onClick={()=>changeStatus(id)}>Go {status === "offline" ? "Offline" : "Online"}</button>
            <button onClick={()=>completeCurrent(id)}>comp curr</button>
            <button onClick={()=>callNext(id)}>call next</button>
        </div>
    )
}