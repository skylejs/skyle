import MediaQueryList from './MediaQueryList';

export const matchMedia = (query: string) => new MediaQueryList(query);
