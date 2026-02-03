export { type Work, type WorkCategory } from '@/lib/types';
export { WORK_CATEGORIES as categories } from '@/lib/constants';
export { getWorks } from '@/lib/data';

// Keep a static import for backward compatibility with client components
import worksData from '../../data/works.json';
export const works = worksData;
