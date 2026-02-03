export { type Work, type WorkCategory, categories } from '@/lib/types';
export { getWorks } from '@/lib/data';

// Keep a static import for backward compatibility with client components
import worksData from '../../data/works.json';
export const works = worksData;
