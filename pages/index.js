import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Mir4 CP</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <a href="/api/power?ranktype=1&worldgroupid=2&worldid=101&classtype=&searchname=">
                    Click here to read more
                </a>
            </main>
        </div>
    )
}
