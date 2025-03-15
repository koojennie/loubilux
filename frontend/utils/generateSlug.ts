export const generateSlug = (name?: string): string => {
    if (!name) return ''; // Jika name undefined, return string kosong
    return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  };
  