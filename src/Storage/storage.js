import { StorageProvider } from '@arcana/storage';

const dAppStorageProvider = await StorageProvider.init({
    appAddress: a693Ae21E46902C991A95ac6E3AE88F3B387B278, // Get App Address via Dashboard after registering and configuring dApp
    provider: window.ethereum //optional
    // use 'window.arcana.provider', if using the Auth SDK
    // or use 'window.ethereum' if using a third-party wallet
  });

  await dAppStorageProvider.upload(file, {
    onProgress: (bytesUploaded, bytesTotal) => {
       console.log('Progress:', ((bytesUploaded / bytesTotal) * 100).toFixed(2), '%')
    }
  }).then((did) => console.log('File successfully uploaded. DID:', did)).catch(e => console.error(e));

  