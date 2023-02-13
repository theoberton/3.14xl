import { useState } from 'react';
import { AddResult } from 'ipfs-core-types/src/root';
import all from 'it-all';
import { useIPFS } from '@/hooks/useIpfs';

type Modify<T, R> = Omit<T, keyof R> & R;
type Preview = Modify<
	AddResult,
	{
		cid: String;
	}
>;

function Ipfs() {
	const ipfs = useIPFS();
	const [files, setFiles] = useState<FileList | null>(null);
	const [previews, setPreviews] = useState<Preview[]>();

	async function onFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
		setFiles(e.target.files);

		if (!e.target.files) {
			console.error('no files');
			return;
		}

		if (!ipfs) {
			console.error('ipfs not inited');
			return;
		}

		const fileObjectsArray = [...e.target.files].map(file => ({
			name: file.name,
			content: file,
		}));
		const result = await all(ipfs.addAll(fileObjectsArray));
		const newPreviews = result.map(r => ({ ...r, cid: r.cid.toString() }));

		setPreviews(newPreviews);
	}

	return (
		<div className="App">
			<input type="file" multiple onChange={onFileUpload} />
			<br />
			<pre>
				{files &&
					JSON.stringify(
						[...files].map(file => ({
							lastModified: file.lastModified,
							lastModifiedDate: new Date(file.lastModified),
							name: file.name,
							size: file.size,
							type: file.type,
						})),
						null,
						2
					)}
			</pre>
			<br />
			<div
				style={{
					display: 'flex',
					gridGap: '1rem',
					height: '16rem',
					margin: '1rem',
					flexWrap: 'wrap',
				}}
			>
				{previews?.map(p => (
					<img
						style={{ objectFit: 'cover', height: '100%' }}
						key={p.cid as React.Key}
						src={`https://cloudflare-ipfs.com/ipfs/${p.cid}`}
					/>
				))}
			</div>
		</div>
	);
}

export default Ipfs;
