export function slugify (pageName) {
  return pageName.trim().replace(/\W+/g, '-').toLowerCase();
}
