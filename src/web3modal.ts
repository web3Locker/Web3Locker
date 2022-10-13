import * as UAuthWeb3Modal from '@uauth/web3modal'
import UAuthSPA from '@uauth/js'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'
import { IUAuthOptions } from '@uauth/web3modal'

// These options are used to construct the UAuthSPA instance.
export const uauthOptions: IUAuthOptions = {
  clientID: "671f4386-a936-4c08-bd01-fe74f4203f9e",
    redirectUri: "http://localhost:3000",
    scope: "openid wallet"
}

const providerOptions = {
  // Currently the package isn't inside the web3modal library. For now,
  // users must use this libary to create a custom web3modal provider.

  // All custom `web3modal` providers must be registered using the "custom-"
  // prefix.
  'custom-uauth': {
    // The UI Assets
    display: UAuthWeb3Modal.display,

    // The Connector
    connector: UAuthWeb3Modal.connector,

    // The SPA libary
    package: UAuthSPA,

    // The SPA libary options
    options: uauthOptions,
  },



  // Include any other web3modal providers here
}

const web3modal = new Web3Modal({providerOptions})

// Register the web3modal so the connector has access to it.
UAuthWeb3Modal.registerWeb3Modal(web3modal)

export default web3modal