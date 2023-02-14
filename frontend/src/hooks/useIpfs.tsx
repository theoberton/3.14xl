import React, { useState, useEffect, createContext, useContext } from 'react';
import { create, IPFS } from 'ipfs-core';

const IPFSContext = createContext<IPFS | null>(null);

export function IPFSProvider({ children }: React.PropsWithChildren) {
	const [ipfs, setIpfs] = useState<IPFS | null>(null);
	console.log('ipfs', ipfs)

	useEffect(() => {
		(async () => {
			const ipfsInstance = await create();
			console.log('ipfsInstance', ipfsInstance);

			setIpfs(ipfsInstance);
		})();
		return function cleanup () {
      if (ipfs && ipfs.stop) {
        ipfs.stop().catch(err => console.error(err))
        setIpfs(null);
      }
    }
	}, []);

	return <IPFSContext.Provider value={ipfs}>{children}</IPFSContext.Provider>;
}

export function useIPFS() {
	return useContext(IPFSContext);
}
