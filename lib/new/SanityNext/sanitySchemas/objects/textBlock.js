export default {
  type: 'object',
  name: 'textBlock',
  title: 'Text Block',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Heading',
    },
    {
      name: 'content',
      type: 'portableText'
    },
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: 'Text Block'
      }
    }
  }
};