import SettingsStore from '@/store/SettingsStore'
import {
  kernelAllowedChains,
  safeAllowedChains,
  supportedAddressPriority
} from '@/utils/SmartAccountUtil'
import { SessionTypes } from '@walletconnect/types'
import { useSnapshot } from 'valtio'

interface IProps {
  namespaces?: SessionTypes.Namespaces
}

export default function usePriorityAccounts({ namespaces }: IProps) {
  const {
    smartAccountEnabled,
    kernelSmartAccountAddress,
    kernelSmartAccountEnabled,
    safeSmartAccountAddress,
    safeSmartAccountEnabled,
    biconomyV3SmartAccountEnabled,
    biconomyV3SmartAccountAddress
  } = useSnapshot(SettingsStore.state)
  if (!namespaces) return []

  if (smartAccountEnabled) {
    if (safeSmartAccountEnabled) {
      return supportedAddressPriority(namespaces, safeSmartAccountAddress, safeAllowedChains)
    }
    if (kernelSmartAccountEnabled) {
      return supportedAddressPriority(namespaces, kernelSmartAccountAddress, kernelAllowedChains)
    }
    if (biconomyV3SmartAccountEnabled) {
      return supportedAddressPriority(namespaces, biconomyV3SmartAccountAddress, kernelAllowedChains)
    }
  }
  return []
}
