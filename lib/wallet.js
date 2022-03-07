import Web3 from "web3"
import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider";

import { useState, useEffect, createContext } from 'react'

import WIP from './WIP.json'

const contractAddress = "0xFeF8D54BA288866A7d7f554fCD7E5925b3f04A43"

export const WalletContext = createContext()

const Wallet = function ({ children }) {
  const [accounts, setAccounts] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [web3, setWeb3] = useState(
    new Web3(Web3.givenProvider)
  )

  const [contract, setContract] = useState(
    new web3.eth.Contract(WIP.abi, contractAddress)
  )

  const [balance, setBalance] = useState(0)
  const [canPost, setCanPost] = useState(false)
  const [canComment, setCanComment] = useState(false)

  useEffect(() => {
    if (accounts.length > 0) {
      setIsConnected(true)
    } else {
      setIsConnected(false)
    }

    fetchBalance()
  }, [accounts])

  useEffect(() => {
    web3.eth.getAccounts().then(setAccounts)

    web3.currentProvider.on("accountsChanged", setAccounts)

    web3.currentProvider.on("disconnected", function () {
      setAccounts([])
    })

    setContract(
      new web3.eth.Contract(WIP.abi, contractAddress)
    )
  }, [web3])

  const connect = async function () {
    if (window) {
      const web3Modal = new Web3Modal({
        network: "ropsten",
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              infuraId: "15c3538a5da540afb9168179bf92cd9a"
            }
          }
        }
      })

      const provider = await web3Modal.connect()

      setWeb3(new Web3(provider))
    }
  }

  const fetchBalance = async function () {
    if (accounts.length > 0) {
      const b = await contract.methods.balanceOf(accounts[0]).call()
      setBalance(b)

      const cp = await contract.methods.canPost(accounts[0]).call()
      setCanPost(cp)

      const cc = await contract.methods.canComment(accounts[0]).call()
      setCanComment(cc)
    } else {
      setBalance(0)
      setCanPost(false)
      setCanComment(false)
    }
  }
  
  const exp = {
    accounts,
    connect,
    isConnected,
    balance,
    canPost,
    canComment,
    contract,
    web3,
    fetchBalance
  }

  return (
    <WalletContext.Provider value={exp}>
      {children}
    </WalletContext.Provider>
  )
}

export default Wallet