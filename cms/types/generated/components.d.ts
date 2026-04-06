import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_hero_sections';
  info: {
    displayName: 'Hero Section';
  };
  attributes: {
    primaryButtonHref: Schema.Attribute.String;
    primaryButtonLabel: Schema.Attribute.String;
    secondaryButtonHref: Schema.Attribute.String;
    secondaryButtonLabel: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFooterBottomLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_bottom_links';
  info: {
    displayName: 'Footer Bottom Link';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    targetBlank: Schema.Attribute.Boolean;
  };
}

export interface SharedFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_columns';
  info: {
    displayName: 'Footer Column';
  };
  attributes: {
    links: Schema.Attribute.Component<'shared.footer-column-link', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFooterColumnLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_column_links';
  info: {
    displayName: 'Footer Column Link';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    targetBlank: Schema.Attribute.Boolean;
  };
}

export interface SharedFooterContact extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_contacts';
  info: {
    displayName: 'Footer Contact';
  };
  attributes: {
    href: Schema.Attribute.String;
    iconType: Schema.Attribute.Enumeration<
      ['email', 'location', 'officeTime']
    > &
      Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

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
      'sections.hero-section': SectionsHeroSection;
      'shared.footer-bottom-link': SharedFooterBottomLink;
      'shared.footer-column': SharedFooterColumn;
      'shared.footer-column-link': SharedFooterColumnLink;
      'shared.footer-contact': SharedFooterContact;
      'shared.header-cta': SharedHeaderCta;
      'shared.nav-link': SharedNavLink;
      'shared.nav-link-child': SharedNavLinkChild;
    }
  }
}
