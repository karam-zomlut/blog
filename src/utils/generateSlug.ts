import slugify from 'slugify';

// gnerate a unique slug

const generateSlug = (title: string): string => {
  const slug = slugify(title, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    replacement: '-',
  });
  return slug;
};

export default generateSlug;