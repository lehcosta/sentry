import {platforms} from '../../../../../integration-docs/_platforms.json';
// let platforms = [];
const popular = [
  'javascript',
  'python-django',
  'ruby-rails',
  'node-express',
  'php-laravel',
  'php-symfony2',
  'java-log4j'
];

const additional = platforms.concat({
  integrations: [
    {
      link: 'https://docs.getsentry.com/hosted/clients/',
      type: 'language',
      id: 'other',
      name: 'Other'
    }
  ],
  id: 'other',
  name: 'Other'
});

const onboardingSteps = {organization: 0, project: 1, configure: 2};

const stepDescriptions = {
  organization: 'Create an Organization in Sentry',
  project: 'Tell us about your project',
  configure: 'Configure your application and send an event'
};

const flattenedPlatforms = [].concat(
  [],
  ...additional.map(language => {
    return language.integrations.map(i => {
      return {...i, language: language.id};
    });
  })
);

export {onboardingSteps, stepDescriptions, flattenedPlatforms, popular};
