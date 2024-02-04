import { fetchFilesForLibrary } from '@/server/actions/file.action';
import FileLibrary from './file-library';
import { Metadata } from 'next';
export const metadata: Metadata = {
	title: 'File Library - Document Management Center',
	description: `Efficiently manage and organize your documents using Gold & Pepper's sophisticated admin dashboard. Simplify file access, enhance organization, and ensure data security seamlessly.`,
};
type SearchParams = {
	searchParams: {
		page: string;
		type: string | null;
		q: string | null;
	};
};
const Files = async ({ searchParams }: SearchParams) => {
	const result = await fetchFilesForLibrary({
		pageSize: 9,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
		type: searchParams.type ? searchParams.type : null,
		query: searchParams.q ? searchParams.q : null,
	});
	return (
		<div className="dashboard-col-space">
			{result && (
				<FileLibrary
					files={result.files}
					pages={result?.pages ? result?.pages : 0}
				/>
			)}
		</div>
	);
};

export default Files;
