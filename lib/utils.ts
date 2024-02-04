import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import slugify from 'slugify';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export const createSlug = async (name: string) => {
	const slug = await slugify(name, {
		replacement: '-',
		lower: true,
		trim: true,
	});
	return slug;
};
