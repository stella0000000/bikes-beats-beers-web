import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'


const Bike = () => {
    return (
        <main className={styles.main}>
            <Image src="/bike.png" alt="bike" width={175} height={100} />

            <div>hi</div>
        </main>
    )
}

export default Bike