import Link from 'next/link';
import styles from '../blog.module.css';

export default function PostNotFound() {
  return <div className={`${styles.container} ${styles.empty}`}><h1>This article isn’t available.</h1><p>It may have moved or is still being prepared.</p><Link href="/blog" className={styles.primary}>Explore our articles</Link></div>;
}
