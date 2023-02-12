import { useState, useEffect } from 'react';
import { create, IPFS, Options } from 'ipfs-core';

function useIpfs(options: Options = {}) {
	const [ipfs, setIpfs] = useState<IPFS>();

	useEffect(() => {
		(async () => {
			setIpfs(await create(options));
		})();
	}, []);

	return ipfs;
}

export default useIpfs;
