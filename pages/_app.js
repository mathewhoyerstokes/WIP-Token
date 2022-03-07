import '../styles/base.css'
import '../styles/globals.css'

import Wallet from '../lib/wallet'

function MyApp({ Component, pageProps }) {
  return (
    <Wallet>
      <Component {...pageProps} />
    </Wallet>
  )
}

export default MyApp
