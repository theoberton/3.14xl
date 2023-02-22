import { useEffect, useState } from 'react';

type AsyncCallback<T> = () => Promise<T>;
export function useAsync<T>(callback: AsyncCallback<T>) {
	const [state, setState] = useState<T>();

	useEffect(() => {
		callback().then(setState);
	}, [callback]);

	return state;
}
