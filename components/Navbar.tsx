import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Navbar.module.css'
import { useRouter } from 'next/router'

function Navbar() {
    const router = useRouter()
    const link = {
        home: '/',
        about: '/about',
        exhibitions: '/exhibitions',
        sfp: '/studyfreeprogram',
    }
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo} onClick={() => router.push('/')}>Enter The Gateway</div>

            <div className={styles.links}>
            <Link href={link.about}><a className={router.pathname === link.about ? styles.linksActive : ''}>About</a></Link>
            <Link href={link.exhibitions}><a className={router.pathname === link.exhibitions ? styles.linksActive : ''}>Exhibitions</a></Link>
            </div>

            <div>
            <Link href={link.sfp}><a className={router.pathname === link.sfp ? styles.linksActive : ''}>Study Free Program</a></Link>
            </div>
        </nav>
    );
}

export default Navbar;



