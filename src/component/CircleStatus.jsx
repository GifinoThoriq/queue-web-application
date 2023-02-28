import styles from '@/styles/Circle.module.css'

export default function CircleStatus({status}) {
    if(status === "online"){
        return <div className={styles.circle} style={{backgroundColor: "green"}}></div>
    } else if(status === "offline") {
        return <div className={styles.circle} style={{backgroundColor: "grey"}}></div>
    } else if(status === "serving") {
        return <div className={styles.circle} style={{backgroundColor: "red"}}></div>
    }
}