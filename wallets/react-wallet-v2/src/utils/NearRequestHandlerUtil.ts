import { NEAR_SIGNING_METHODS } from '@/data/NEARData'
import { formatJsonRpcError, formatJsonRpcResult } from '@json-rpc-tools/utils'
import { SignClientTypes } from '@walletconnect/types'
import { getSdkError } from '@walletconnect/utils'
import { nearWallet } from '@/utils/NearWalletUtil'
import { transactions } from "near-api-js";
import { createAction } from "@near-wallet-selector/wallet-utils";

export async function approveNearRequest(
  requestEvent: SignClientTypes.EventArguments['session_request']
) {
  const { params, id, topic } = requestEvent
  const { chainId, request } = params

  switch (request.method) {
    case NEAR_SIGNING_METHODS.NEAR_SIGN_IN: {
      console.log("approve", { id, params });

      if (!chainId) {
        throw new Error("Invalid chain id");
      }

      const accounts = await nearWallet.signIn({
        chainId,
        topic,
        permission: request.params.permission,
        accounts: request.params.accounts,
      });

      return formatJsonRpcResult(id, accounts);
    }
    case NEAR_SIGNING_METHODS.NEAR_SIGN_OUT: {
      console.log("approve", { id, params });

      if (!chainId) {
        throw new Error("Invalid chain id");
      }

      const accounts = await nearWallet.signOut({
        chainId,
        topic,
        accounts: request.params.accounts
      });

      return formatJsonRpcResult(id, accounts);
    }
    case NEAR_SIGNING_METHODS.NEAR_GET_ACCOUNTS: {
      console.log("approve", { id, params });

      if (!chainId) {
        throw new Error("Invalid chain id");
      }

      const accounts = await nearWallet.getAccounts({ topic });

      return formatJsonRpcResult(id, accounts);
    }
    case NEAR_SIGNING_METHODS.NEAR_SIGN_TRANSACTION: {
      console.log("approve", { id, params });

      if (!chainId) {
        throw new Error("Invalid chain id");
      }

      const [signedTx] = await nearWallet.signTransactions({
        chainId,
        topic,
        transactions: [transactions.Transaction.decode(
          Buffer.from(request.params.transaction),
        )]
      });

      return formatJsonRpcResult(id, signedTx.encode());
    }
    case NEAR_SIGNING_METHODS.NEAR_SIGN_AND_SEND_TRANSACTION: {
      console.log("approve", { id, params });

      if (!chainId) {
        throw new Error("Invalid chain id");
      }

      const [transaction] = await nearWallet.createTransactions({
        chainId,
        transactions: [{
          ...params.request.params.transaction,
          actions: params.request.params.transaction.actions.map(createAction),
        }]
      });

      const result = await nearWallet.signAndSendTransaction({
        chainId,
        topic,
        transaction,
      });

      return formatJsonRpcResult(id, result);
    }
    case NEAR_SIGNING_METHODS.NEAR_SIGN_TRANSACTIONS: {
      console.log("approve", { id, params });

      if (!chainId) {
        throw new Error("Invalid chain id");
      }

      const signedTxs = await nearWallet.signTransactions({
        chainId,
        topic,
        transactions: params.request.params.transactions.map((tx: Uint8Array) => {
          return transactions.Transaction.decode(Buffer.from(tx));
        }),
      });

      return formatJsonRpcResult(id, signedTxs.map((x) => x.encode()));
    }
    case NEAR_SIGNING_METHODS.NEAR_SIGN_AND_SEND_TRANSACTIONS: {
      console.log("approve", { id, params });

      if (!chainId) {
        throw new Error("Invalid chain id");
      }

      const transactions = await nearWallet.createTransactions({
        chainId,
        transactions: params.request.params.transactions.map((transaction) => ({
          ...transaction,
          actions: transaction.actions.map(createAction),
        }))
      });

      const result = await nearWallet.signAndSendTransactions({
        chainId,
        topic,
        transactions,
      });

      return formatJsonRpcResult(id, result);
    }
    default:
      throw new Error(getSdkError("INVALID_METHOD").message)
  }
}

export function rejectNearRequest(request: SignClientTypes.EventArguments['session_request']) {
  const { id } = request

  return formatJsonRpcError(id, getSdkError('USER_REJECTED_METHODS').message)
}
