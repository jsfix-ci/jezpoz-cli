export default {
  type: 'object',
  name: 'heroBlock',
  title: 'Hero Block',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Heading',
    },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Background image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'backgroundImage',
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: 'Hero Block'
      }
    }
  },
};