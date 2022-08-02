import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import styles from './layout.module.css'

export default function Layout({ children }) {
  return (
    <div className={`${styles.content} container`}>
      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  )
}