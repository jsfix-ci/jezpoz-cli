export default {
  name: 'route',
  type: 'document',
  title: 'Route',
  fields: [
    {
      name: 'pageReference',
      type: 'reference',
      to: [{
        type: 'page'
      }]
    },
    {
      name: 'slug',
      type: 'slug',
    },
  ],
  preview: {
    select: {
      title: 'pageReference.title',
      slug: 'slug.current'
    },
    prepare(selection) {
      const {title, slug} = selection;
      return {
        title: title ? title : 'Page without title',
        subtitle: `/${slug}`
      }
    }
  },
};