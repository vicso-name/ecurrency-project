import type { Schema, Struct } from '@strapi/strapi';

export interface SharedHeaderCta extends Struct.ComponentSchema {
  collectionName: 'components_shared_header_ctas';
  info: {
    displayName: 'Header Cta';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface SharedNavLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_links';
  info: {
    displayName: 'Nav Link';
  };
  attributes: {
    children: Schema.Attribute.Component<'shared.nav-link-child', true>;
    hasChildren: Schema.Attribute.Boolean;
    href: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedNavLinkChild extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_link_children';
  info: {
    displayName: 'Nav Link Child';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.header-cta': SharedHeaderCta;
      'shared.nav-link': SharedNavLink;
      'shared.nav-link-child': SharedNavLinkChild;
    }
  }
}
