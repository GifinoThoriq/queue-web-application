import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import fsPromises from 'fs/promises';
import path from 'path'
import CardCounterCustomer from '@/component/CardCounterCustomer';

export default function Home({data}) {

  const [updatedData, setUpdatedData] = useState(data)

  const newNumberHandler = async () => {
    const response = await fetch('/api/new-number', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }
    });

    const {status} = response;
    const responseJson = await response.json();
    if(status === 200)
    {
        console.log(responseJson)
    }

    window.location.reload()
  }

  return (
    <>
      <Head>
        <title>Queue Application</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <h1>Customer View</h1>
        <div className={styles.containerQueue}>
          <h2>Waiting Queue: </h2>
          <ul>
            {updatedData.waiting_queue.map((e) => (
              <li key={e}><h2>{e}</h2></li>
            ))}
          </ul>
        </div>
        <div className={styles.cardQueue}>
          <span>Now Serving: {updatedData.current_ticket_number} </span>
          <span>Last Number: {updatedData.last_ticket_number}</span>
          <button onClick={newNumberHandler}> Take a Number</button>
        </div>
        <div className={styles.containerCounter}>
          {updatedData.counters.map(item =>(
            <CardCounterCustomer
              key={item.id}
              id={item.id}
              status={item.status}
              current_number={item.current_number}
            />
          ))}
        </div>
      </main>
    </>
  )
}


export async function getStaticProps() {

  const filePath = path.join(process.cwd(), 'tickets.json');
  const jsonData = await fsPromises.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      data
    },
    revalidate: 5
  }
}