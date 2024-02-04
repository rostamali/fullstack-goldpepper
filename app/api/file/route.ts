import { readFile } from 'fs/promises';
import { NextRequest } from 'next/server';
import path from 'path';

export async function GET(request: NextRequest) {
	const fileName = request.nextUrl.searchParams.get('fileName');
	const filePath = path.join(
		process.cwd(),
		'public',
		'uploads',
		'files',
		fileName as string,
	);
	const buffer = await readFile(filePath);

	return new Response(buffer, {
		status: 200,
		headers: {
			'Content-Disposition': `attachment; filename=${fileName}`,
			'Content-Type': 'application/octet-stream',
		},
	});
}
