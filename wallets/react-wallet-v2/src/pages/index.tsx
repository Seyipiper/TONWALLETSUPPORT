import AccountCard from '@/components/AccountCard'
import AccountPicker from '@/components/AccountPicker'
import PageHeader from '@/components/PageHeader'
import { COSMOS_MAINNET_CHAINS } from '@/data/COSMOSData'
import { EIP155_MAINNET_CHAINS, EIP155_TEST_CHAINS } from '@/data/EIP155Data'
import { SOLANA_MAINNET_CHAINS, SOLANA_TEST_CHAINS } from '@/data/SolanaData'
import { POLKADOT_MAINNET_CHAINS, POLKADOT_TEST_CHAINS } from '@/data/PolkadotData'
import { ELROND_MAINNET_CHAINS, ELROND_TEST_CHAINS } from '@/data/ElrondData'
import { TRON_MAINNET_CHAINS, TRON_TEST_CHAINS } from '@/data/TronData'
import SettingsStore from '@/store/SettingsStore'
import { Text } from '@nextui-org/react'
import { Fragment } from 'react'
import { useSnapshot } from 'valtio'
import { NEAR_TEST_CHAINS } from '@/data/NEARData'
import { TEZOS_MAINNET_CHAINS, TEZOS_TEST_CHAINS } from '@/data/TezosData'

export default function HomePage() {
  const {
    testNets,
    eip155Address,
    cosmosAddress,
    solanaAddress,
    polkadotAddress,
    nearAddress,
    elrondAddress,
    tronAddress,
    tezosAddress
  } = useSnapshot(SettingsStore.state)

  return (
    <Fragment>
      <PageHeader title="Accounts">
        <AccountPicker />
      </PageHeader>
      <Text h4 css={{ marginBottom: '$5' }}>
        Mainnets
      </Text>
      {Object.values(EIP155_MAINNET_CHAINS).map(({ name, logo, rgb, chainId }) => (
        <AccountCard key={name} name={name} logo={logo} rgb={rgb} address={eip155Address} chainId={chainId.toString()}/>
      ))}
      {Object.values(COSMOS_MAINNET_CHAINS).map(({ name, logo, rgb, chainId }) => (
        <AccountCard key={name} name={name} logo={logo} rgb={rgb} address={cosmosAddress} chainId={chainId}/>
      ))}
      {Object.values(SOLANA_MAINNET_CHAINS).map(({ name, logo, rgb, chainId }) => (
        <AccountCard key={name} name={name} logo={logo} rgb={rgb} address={solanaAddress} chainId={chainId}/>
      ))}
      {Object.values(POLKADOT_MAINNET_CHAINS).map(({ name, logo, rgb, chainId }) => (
        <AccountCard key={name} name={name} logo={logo} rgb={rgb} address={polkadotAddress} chainId={chainId}/>
      ))}
      {Object.values(ELROND_MAINNET_CHAINS).map(({ name, logo, rgb, chainId }) => (
        <AccountCard key={name} name={name} logo={logo} rgb={rgb} address={elrondAddress} chainId={chainId}/>
      ))}
      {Object.values(TRON_MAINNET_CHAINS).map(({ name, logo, rgb, chainId }) => (
        <AccountCard key={name} name={name} logo={logo} rgb={rgb} address={tronAddress} chainId={chainId}/>
      ))}
      {Object.values(TEZOS_MAINNET_CHAINS).map(({ name, logo, rgb, chainId }) => (
        <AccountCard key={name} name={name} logo={logo} rgb={rgb} address={tezosAddress} chainId={chainId}/>
      ))}

      {testNets ? (
        <Fragment>
          <Text h4 css={{ marginBottom: '$5' }}>
            Testnets
          </Text>
          {Object.values(EIP155_TEST_CHAINS).map(({ name, logo, rgb, chainId }) => (
            <AccountCard key={name} name={name} logo={logo} rgb={rgb} address={eip155Address} chainId={chainId.toString()}/>
          ))}
          {Object.values(SOLANA_TEST_CHAINS).map(({ name, logo, rgb, chainId }) => (
            <AccountCard key={name} name={name} logo={logo} rgb={rgb} address={solanaAddress} chainId={chainId}/>
          ))}
          {Object.values(POLKADOT_TEST_CHAINS).map(({ name, logo, rgb, chainId }) => (
            <AccountCard key={name} name={name} logo={logo} rgb={rgb} address={polkadotAddress} chainId={chainId}/>
          ))}
          {Object.values(NEAR_TEST_CHAINS).map(({ name, logo, rgb, chainId }) => (
            <AccountCard key={name} name={name} logo={logo} rgb={rgb} address={nearAddress} chainId={chainId}/>
          ))}
          {Object.values(ELROND_TEST_CHAINS).map(({ name, logo, rgb, chainId }) => (
            <AccountCard key={name} name={name} logo={logo} rgb={rgb} address={elrondAddress} chainId={chainId}/>
          ))}
          {Object.values(TRON_TEST_CHAINS).map(({ name, logo, rgb, chainId }) => (
            <AccountCard key={name} name={name} logo={logo} rgb={rgb} address={tronAddress} chainId={chainId}/>
          ))}
          {Object.values(TEZOS_TEST_CHAINS).map(({ name, logo, rgb, chainId }) => (
            <AccountCard key={name} name={name} logo={logo} rgb={rgb} address={tezosAddress} chainId={chainId}/>
          ))}
        </Fragment>
      ) : null}
    </Fragment>
  )
}
