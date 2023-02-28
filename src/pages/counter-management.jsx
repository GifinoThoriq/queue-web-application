import { useRouter } from 'next/router'
import styles from '@/styles/Manage.module.css'
import fsPromises from 'fs/promises';
import path from 'path'
import CardCounter from '@/component/CardCounter';

export default function CounterManagement(props){

    const router = useRouter();

    const changeStatusHandler = async(id) => {
        const response = await fetch('/api/change-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                counterId: id
            })
        });

        const {status} = response;
        const responseJson = await response.json();
        if(status === 200)
        {
            console.log(responseJson)
        }

        router.replace(router.asPath)
    }

    const callNextHandler = async(id) => {
        const response = await fetch('/api/call-next', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                counterId: id
            })
        });

        const {status} = response;
        const responseJson = await response.json();
        if(status === 200)
        {
            alert(responseJson.message)
            router.replace(router.asPath)

        }if(status !== 200){
            alert(responseJson.message)
            router.replace(router.asPath)

        }
    }

    const completeCurrentHandler = async(id) => {
        const response = await fetch('/api/comp-curr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                counterId: id
            })
        });

        const {status} = response;
        const responseJson = await response.json();

        if(status === 200)
        {
            alert(responseJson.message)
            router.replace(router.asPath)

        }if(status !== 200){
            alert(responseJson.message)
            router.replace(router.asPath)

        }

    }
    


    return(
        <div className={styles.container}>
            <h1>Counter Management</h1>
            <div className={styles.containerCounter}>
                {props.counters.map(item=>(
                    <CardCounter
                        key={item.id}
                        id={item.id}
                        status={item.status}
                        onCallNext={callNextHandler}
                        onChangeStatus={changeStatusHandler}
                        onCompleteCurrent={completeCurrentHandler}
                    />
                ))}
            </div>
        </div>
    )
}


export async function getStaticProps() {

  const filePath = path.join(process.cwd(), 'tickets.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return {
    props: objectData
  }
}