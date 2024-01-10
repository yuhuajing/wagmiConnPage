import { FormEvent } from 'react';
import { type BaseError, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { fromHex, parseAbi } from 'viem'

export function MintNft() {
  const { data: hash, error, isPending, writeContract } = useWriteContract()

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const tokenId = formData.get('tokenId') as string
    const receiver = formData.get('receiver') as `0x${string}` 
    writeContract({
      address: '0x7B65E7a5EB91612e8B8AC1b28B57732e720e56a2',
      abi: parseAbi(['function mint(address receiver,uint256 tokenId)']),
      functionName: 'mint',
      args: [receiver,BigInt(tokenId)], 
    })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  return (
    <div className="container">
      <div className="stack">
        <form className="set" onSubmit={submit}>
        <input name="receiver"  required />
          <input name="tokenId" placeholder="Token ID" required />
          <button disabled={isPending} type="submit">
            {isPending ? 'Confirming...' : 'Mint'}
          </button>
        </form>
        {hash && <div>Transaction Hash: {hash}</div>}
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
        {error && (
          <div>Error: {(error as BaseError).shortMessage || error.message}</div>
        )}
      </div>
    </div>
  )
}

