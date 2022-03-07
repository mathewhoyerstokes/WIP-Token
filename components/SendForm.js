import { useState, useContext } from 'react'
import { WalletContext } from '../lib/wallet'

const SendForm = function ({}) {
  const [ethAddress, setEthAddress] = useState("")
  const [amount, setAmount] = useState("0")

  const { accounts, web3, contract, fetchBalance } = useContext(WalletContext)

  const sendWip = async (event) => {
    if (accounts.length > 0) {
      const cents = web3.utils.toWei(amount, "ether")

      await contract.methods.transfer(ethAddress, cents).send({
        from: accounts[0]
      })

      fetchBalance()
    }
  }

  return (
    <form onSubmit={sendWip}>
      <div>
        <label>Address</label>
        <input type="text" value={ethAddress} onChange={e => setEthAddress(e.target.value)} />
      </div>
      <div>
        <label>Amount of $WIP</label>
        <input type="text" value={amount} onChange={e => setAmount(e.target.value)} />
      </div>
      <button>Send</button>
    </form>
  )
}

export default SendForm;