import { StorageProvider } from '@arcana/storage';

function createStorageService() {
  let dAppStorageProvider;
    async function init() {
      
    if (!dAppStorageProvider) {
    dAppStorageProvider = await StorageProvider.init({
    appAddress: "a693Ae21E46902C991A95ac6E3AE88F3B387B278", // Get App Address via Dashboard after registering and configuring dApp
    provider: window.ethereum, //optional
    debug: true //optional
    // use 'window.arcana.provider', if using the Auth SDK
    // or use 'window.ethereum' if using a third-party wallet
    });
    }}


  async function upload(fileBlob) {
    await dAppStorageProvider.upload(fileBlob)
    .then((did) => console.log('File successfully uploaded. DID:', did)).catch(e => console.error(e));
  }

  return{
    init,
    upload,
  };
}

const StorageService = Object.freeze(createStorageService());

export default StorageService;