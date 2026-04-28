import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsBlockQuote extends Struct.ComponentSchema {
  collectionName: 'components_sections_block_quotes';
  info: {
    displayName: 'Block Quote';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface SectionsBlockchainArchitectureCard
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_blockchain_architecture_cards';
  info: {
    displayName: 'Blockchain Architecture Card';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files'>;
    sizeVariant: Schema.Attribute.Enumeration<['large', 'small']> &
      Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsBlockchainArchitectureSection
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_blockchain_architecture_sections';
  info: {
    displayName: 'Blockchain Architecture Section';
  };
  attributes: {
    bottomCtaHref: Schema.Attribute.String;
    bottomCtaLabel: Schema.Attribute.String;
    cards: Schema.Attribute.Component<
      'sections.blockchain-architecture-card',
      true
    > &
      Schema.Attribute.Required;
    preTitle: Schema.Attribute.String;
    subTitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsBlockchainDesignedFeatureCard
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_blockchain_designed_feature_cards';
  info: {
    displayName: 'Blockchain Designed Feature Card';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.Text;
  };
}

export interface SectionsBlockchainDesignedLinks
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_blockchain_designed_links';
  info: {
    displayName: 'Blockchain Designed Links';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
    openInNewTab: Schema.Attribute.Boolean;
  };
}

export interface SectionsBlockchainDesignedSection
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_blockchain_designed_sections';
  info: {
    displayName: 'Blockchain Designed Section';
  };
  attributes: {
    links: Schema.Attribute.Component<
      'sections.blockchain-designed-links',
      true
    >;
    tabs: Schema.Attribute.Component<'sections.blockchain-designed-tab', true> &
      Schema.Attribute.Required;
  };
}

export interface SectionsBlockchainDesignedTab extends Struct.ComponentSchema {
  collectionName: 'components_sections_blockchain_designed_tabs';
  info: {
    displayName: 'Blockchain Designed Tab';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    featureCards: Schema.Attribute.Component<
      'sections.blockchain-designed-feature-card',
      true
    >;
    learnMoreHref: Schema.Attribute.String;
    learnMoreLabel: Schema.Attribute.String;
    previewImage: Schema.Attribute.Media<'images'>;
    tabNumber: Schema.Attribute.Integer & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface SectionsCommunityCard extends Struct.ComponentSchema {
  collectionName: 'components_sections_community_cards';
  info: {
    displayName: 'Community Card';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
  };
}

export interface SectionsCommunitySection extends Struct.ComponentSchema {
  collectionName: 'components_sections_community_sections';
  info: {
    displayName: 'Community Section';
  };
  attributes: {
    cards: Schema.Attribute.Component<'sections.community-card', true>;
    primaryButtonHref: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#'>;
    primaryButtonLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Open Web Wallet'>;
    secondaryButtonHref: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#'>;
    secondaryButtonLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Join the Community'>;
    title: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Community'>;
  };
}

export interface SectionsConsensusCard extends Struct.ComponentSchema {
  collectionName: 'components_sections_consensus_cards';
  info: {
    displayName: 'Consensus Card';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsConsensusSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_consensus_sections';
  info: {
    displayName: 'Consensus Section';
  };
  attributes: {
    cards: Schema.Attribute.Component<'sections.consensus-card', true>;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    rowTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'// Staking Without Lockups //'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Proof-of-Stake Consensus'>;
  };
}

export interface SectionsEconomicLayerSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_economic_layer_sections';
  info: {
    displayName: 'Economic Layer Section';
  };
  attributes: {
    buttonHref: Schema.Attribute.String;
    buttonLabel: Schema.Attribute.String;
    coinImage: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsEcrUseCases extends Struct.ComponentSchema {
  collectionName: 'components_sections_ecr_use_cases';
  info: {
    displayName: 'ECR Use Cases';
  };
  attributes: {
    cards: Schema.Attribute.Component<'sections.infrastructure-card', true>;
    primaryButtonHref: Schema.Attribute.String;
    primaryButtonLabel: Schema.Attribute.String;
    secondaryButtonHref: Schema.Attribute.String;
    secondaryButtonLabel: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

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

export interface SectionsInfrastructureCard extends Struct.ComponentSchema {
  collectionName: 'components_sections_infrastructure_cards';
  info: {
    displayName: 'Infrastructure Card';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsInfrastructureSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_infrastructure_sections';
  info: {
    displayName: 'Infrastructure Section';
  };
  attributes: {
    bottomText: Schema.Attribute.Text;
    cards: Schema.Attribute.Component<'sections.infrastructure-card', true>;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Programmable Payment Infrastructure'>;
  };
}

export interface SectionsInnerHeroCard extends Struct.ComponentSchema {
  collectionName: 'components_sections_inner_hero_cards';
  info: {
    displayName: 'Inner Hero Card';
  };
  attributes: {
    buttonHref: Schema.Attribute.String;
    buttonLabel: Schema.Attribute.String;
    description: Schema.Attribute.Text;
  };
}

export interface SectionsOpportunitiesSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_opportunities_sections';
  info: {
    displayName: 'Opportunities Section';
  };
  attributes: {
    cards: Schema.Attribute.Component<'sections.opportunity-card', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Developer Opportunities'>;
  };
}

export interface SectionsOpportunityCard extends Struct.ComponentSchema {
  collectionName: 'components_sections_opportunity_cards';
  info: {
    displayName: 'Opportunity Card';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    sizeVariant: Schema.Attribute.Enumeration<['tall', 'small', 'wide']> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsPageHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_page_heroes';
  info: {
    displayName: 'Page Hero';
  };
  attributes: {
    card: Schema.Attribute.Component<'sections.inner-hero-card', false>;
    showExtensionBadge: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    showWalletBadge: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsPaymentSystemsCard extends Struct.ComponentSchema {
  collectionName: 'components_sections_payment_systems_cards';
  info: {
    displayName: 'Payment Systems Card';
  };
  attributes: {
    orderNumber: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsPaymentSystemsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_payment_systems_sections';
  info: {
    displayName: 'Payment Systems Section';
  };
  attributes: {
    bottomCtaHref: Schema.Attribute.String;
    bottomCtaLabel: Schema.Attribute.String;
    cards: Schema.Attribute.Component<'sections.payment-systems-card', true> &
      Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsProjectOverviewSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_project_overview_sections';
  info: {
    displayName: 'Project Overview Section';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsSmartContractBenefit extends Struct.ComponentSchema {
  collectionName: 'components_sections_smart_contract_benefits';
  info: {
    displayName: 'Smart Contract Benefit';
  };
  attributes: {
    tags: Schema.Attribute.Component<'sections.smart-contract-tag', true>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsSmartContractStep extends Struct.ComponentSchema {
  collectionName: 'components_sections_smart_contract_steps';
  info: {
    displayName: 'Smart Contract Step';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsSmartContractTag extends Struct.ComponentSchema {
  collectionName: 'components_sections_smart_contract_tags';
  info: {
    displayName: 'Smart Contract Tag';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsSmartContractsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_smart_contracts_sections';
  info: {
    displayName: 'Smart Contracts Section';
  };
  attributes: {
    benefits: Schema.Attribute.Component<
      'sections.smart-contract-benefit',
      true
    >;
    benefitsTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Why It Matters'>;
    howItWorksTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'How It Works'>;
    links: Schema.Attribute.Component<'shared.start-exploring-link', true>;
    steps: Schema.Attribute.Component<'sections.smart-contract-step', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsStartExploringCard extends Struct.ComponentSchema {
  collectionName: 'components_sections_start_exploring_cards';
  info: {
    displayName: 'Start Exploring Card';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'files' | 'images'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsStartExploringSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_start_exploring_sections';
  info: {
    displayName: 'Start Exploring Section';
  };
  attributes: {
    bottomText: Schema.Attribute.Text;
    cards: Schema.Attribute.Component<'sections.start-exploring-card', true>;
    links: Schema.Attribute.Component<'shared.start-exploring-link', true>;
    linksTitle: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsSubscribeSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_subscribe_sections';
  info: {
    displayName: 'Subscribe Section';
  };
  attributes: {
    buttonLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Subscribe'>;
    placeholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Your Email'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Subscribe for Updates'>;
  };
}

export interface SectionsTechnologyFeatureCard extends Struct.ComponentSchema {
  collectionName: 'components_sections_technology_feature_cards';
  info: {
    displayName: 'Technology Feature Card';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsTechnologyFeaturesSection
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_technology_features_sections';
  info: {
    displayName: 'Technology Features Section';
  };
  attributes: {
    cards: Schema.Attribute.Component<'sections.technology-feature-card', true>;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'The network integrates multiple technologies that work together to provide'>;
  };
}

export interface SectionsToolCard extends Struct.ComponentSchema {
  collectionName: 'components_sections_tool_cards';
  info: {
    displayName: 'Tool Card';
  };
  attributes: {
    buttonHref: Schema.Attribute.String & Schema.Attribute.Required;
    buttonLabel: Schema.Attribute.String & Schema.Attribute.Required;
    showBottomDash: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    showTopDash: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsToolsInfrastructureButton
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_tools_infrastructure_buttons';
  info: {
    displayName: 'Tools Infrastructure Button';
  };
  attributes: {
    href: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String;
    subLabel: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<['primary', 'secondary']>;
  };
}

export interface SectionsToolsInfrastructureSection
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_tools_infrastructure_sections';
  info: {
    displayName: 'Tools Infrastructure Section';
  };
  attributes: {
    subtitle: Schema.Attribute.Text;
    tabs: Schema.Attribute.Component<'sections.tools-infrastructure-tab', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsToolsInfrastructureTab extends Struct.ComponentSchema {
  collectionName: 'components_sections_tools_infrastructure_tabs';
  info: {
    displayName: 'Tools Infrastructure Tab';
  };
  attributes: {
    buttons: Schema.Attribute.Component<
      'sections.tools-infrastructure-button',
      true
    >;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    previewImage: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface SectionsToolsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_tools_sections';
  info: {
    displayName: 'Tools Section';
  };
  attributes: {
    cards: Schema.Attribute.Component<'sections.tool-card', true>;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Tools and Resources'>;
  };
}

export interface SectionsUsedForCard extends Struct.ComponentSchema {
  collectionName: 'components_sections_used_for_cards';
  info: {
    displayName: 'Used For Card';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    orderNumber: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsUsedForSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_used_for_sections';
  info: {
    displayName: 'Used For Section';
  };
  attributes: {
    cards: Schema.Attribute.Component<'sections.used-for-card', true> &
      Schema.Attribute.Required;
    preTitle: Schema.Attribute.String;
    primaryButtonHref: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#'>;
    primaryButtonLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Buy ECR'>;
    secondaryButtonHref: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#'>;
    secondaryButtonLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Learn More About ECR'>;
    showButtons: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String;
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

export interface SharedHeaderSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_shared_header_social_links';
  info: {
    displayName: 'headerSocialLinks';
  };
  attributes: {
    href: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String;
    targetBlank: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
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

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'Seo';
  };
  attributes: {
    seoDescription: Schema.Attribute.Text;
    seoImage: Schema.Attribute.Media<'images'>;
    seoTitle: Schema.Attribute.String;
  };
}

export interface SharedStartExploringLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_start_exploring_links';
  info: {
    displayName: 'Start Exploring Link';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.block-quote': SectionsBlockQuote;
      'sections.blockchain-architecture-card': SectionsBlockchainArchitectureCard;
      'sections.blockchain-architecture-section': SectionsBlockchainArchitectureSection;
      'sections.blockchain-designed-feature-card': SectionsBlockchainDesignedFeatureCard;
      'sections.blockchain-designed-links': SectionsBlockchainDesignedLinks;
      'sections.blockchain-designed-section': SectionsBlockchainDesignedSection;
      'sections.blockchain-designed-tab': SectionsBlockchainDesignedTab;
      'sections.community-card': SectionsCommunityCard;
      'sections.community-section': SectionsCommunitySection;
      'sections.consensus-card': SectionsConsensusCard;
      'sections.consensus-section': SectionsConsensusSection;
      'sections.economic-layer-section': SectionsEconomicLayerSection;
      'sections.ecr-use-cases': SectionsEcrUseCases;
      'sections.hero-section': SectionsHeroSection;
      'sections.infrastructure-card': SectionsInfrastructureCard;
      'sections.infrastructure-section': SectionsInfrastructureSection;
      'sections.inner-hero-card': SectionsInnerHeroCard;
      'sections.opportunities-section': SectionsOpportunitiesSection;
      'sections.opportunity-card': SectionsOpportunityCard;
      'sections.page-hero': SectionsPageHero;
      'sections.payment-systems-card': SectionsPaymentSystemsCard;
      'sections.payment-systems-section': SectionsPaymentSystemsSection;
      'sections.project-overview-section': SectionsProjectOverviewSection;
      'sections.smart-contract-benefit': SectionsSmartContractBenefit;
      'sections.smart-contract-step': SectionsSmartContractStep;
      'sections.smart-contract-tag': SectionsSmartContractTag;
      'sections.smart-contracts-section': SectionsSmartContractsSection;
      'sections.start-exploring-card': SectionsStartExploringCard;
      'sections.start-exploring-section': SectionsStartExploringSection;
      'sections.subscribe-section': SectionsSubscribeSection;
      'sections.technology-feature-card': SectionsTechnologyFeatureCard;
      'sections.technology-features-section': SectionsTechnologyFeaturesSection;
      'sections.tool-card': SectionsToolCard;
      'sections.tools-infrastructure-button': SectionsToolsInfrastructureButton;
      'sections.tools-infrastructure-section': SectionsToolsInfrastructureSection;
      'sections.tools-infrastructure-tab': SectionsToolsInfrastructureTab;
      'sections.tools-section': SectionsToolsSection;
      'sections.used-for-card': SectionsUsedForCard;
      'sections.used-for-section': SectionsUsedForSection;
      'shared.footer-bottom-link': SharedFooterBottomLink;
      'shared.footer-column': SharedFooterColumn;
      'shared.footer-column-link': SharedFooterColumnLink;
      'shared.footer-contact': SharedFooterContact;
      'shared.header-cta': SharedHeaderCta;
      'shared.header-social-links': SharedHeaderSocialLinks;
      'shared.nav-link': SharedNavLink;
      'shared.nav-link-child': SharedNavLinkChild;
      'shared.seo': SharedSeo;
      'shared.start-exploring-link': SharedStartExploringLink;
    }
  }
}
