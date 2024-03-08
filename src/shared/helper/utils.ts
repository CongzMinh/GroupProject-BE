// eslint-disable-next-line
const { Web3 } = require('web3');
const ganacheUrl = 'http://localhost:7545';
const httpProvider = new Web3.providers.HttpProvider(ganacheUrl);
export const defaultWeb3 = new Web3(httpProvider);

export const sleep = (time: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, time));

export const checkRecoverSameAddress = async ({
  address,
  signature,
  message,
}: {
  address: string;
  signature: string;
  message: string;
}): Promise<boolean> => {
  const recover = await defaultWeb3.eth.accounts.recover(message, signature);
  const recoverConvert = Web3.utils.toChecksumAddress(recover);
  const addressConvert = Web3.utils.toChecksumAddress(address);
  return addressConvert === recoverConvert;
};
