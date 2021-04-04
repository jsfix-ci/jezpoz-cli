import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Fields
import PortableText from './fields/portableText';

// Objects
import HeroBlock from './objects/heroBlock';
import TextBlock from './objects/textBlock';

// Documents
import Page from './documents/page';
import Route from './documents/route';
import SiteConfig from './documents/siteConfig';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    // Fields
    PortableText,

    // Objects
    HeroBlock,
    TextBlock,

    // Documents
    Page,
    Route,
    SiteConfig,
  ]),
})
