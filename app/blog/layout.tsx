import { DM_Sans, Plus_Jakarta_Sans } from 'next/font/google';
import styles from './blog.module.css';

const display = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--blog-display' });
const body = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600'] });

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${styles.page} ${body.className} ${display.variable}`}>{children}</div>;
}
