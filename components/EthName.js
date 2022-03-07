import ENS, { getEnsAddress } from '@ensdomains/ensjs'
import { useState, useEffect, useContext } from 'react'

const EthName = function ({ address, intro="" }) {
  const [name, setName] = useState(null)
  const [ens, setEns] = useState(null)

  // TODO
  // connect to ENS with web3


  useEffect(() => {
    if (ens) {
      const lookupName = async () => {
        setName(null)
        try {
          let n = await ens.getName(address)
      
          if (n.name) {
            let c = await ens.name(n.name).getAddress()
            if (address.toLowerCase() === c.toLowerCase()) {
              setName(n.name)       
            }
          }
        } catch (e) {
          setName(null)
        }    
      }

      lookupName()
    }
  }, [address, ens])

  const copyAddress = async () => {
    await navigator.clipboard.writeText(address)
  }

  if (address) {
    const formattedAddress = (address.substr(0, 6) + "..." + address.substr(-4)).toLowerCase()

    return (
      <abbr title={address} className="eth-name" onClick={copyAddress}>
        {intro}<span>{name ? name : formattedAddress}</span>
      </abbr>
    )
  } else {
    return (<></>)
  }
}

export default EthName