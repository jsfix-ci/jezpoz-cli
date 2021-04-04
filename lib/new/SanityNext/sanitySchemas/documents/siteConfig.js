export default {
  name: 'siteConfig',
  type: 'document',
  title: 'Site configuration',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'lang',
      type: 'string',
      description: 'Should be a valid bcp47 language code like en, en-US, no or nb-NO',
      title: 'Language'
    },
    {
      name: 'navigation',
      title: 'Navigation items',
      description: 'Shown in the header',
      type: 'array',
      of : [
        {
          type: 'reference',
          to: [{ type: 'route' }],
        }
      ]
    },
    {
      name: 'indexPageReference',
      type: 'reference',
      title: 'Index page',
      to: [{
        type: 'page'
      }]
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'lang',
    },
  },
};