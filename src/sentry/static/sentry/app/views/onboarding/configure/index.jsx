import React from 'react';
import {onboardingSteps} from '../utils';
import Waiting from './waiting';

import ProjectInstallPlatform from '../../projectInstall/platform';
import {platforms} from '../../../../../../integration-docs/_platforms.json';

const Configure = React.createClass({
  propTypes: {
    next: React.PropTypes.func,
    platform: React.PropTypes.string
  },

  getInitialState() {
    return {};
  },

  steps: Object.keys(onboardingSteps),
  render() {
    return (
      <div className="onboarding-Configure">
        <Waiting />
        <ProjectInstallPlatform
          platformData={{
            dsn: 'https://faf12479a76f479999efe89f2c5378d5:5e9a998edd3441bd8a1d24c63fddbfa2@sentry.io/180233',
            dsnPublic: 'https://faf12479a76f479999efe89f2c5378d5@sentry.io/180233',
            platforms: platforms
          }}
          params={{platform: this.props.platform, orgId: 'default', projectId: 'earth'}}
        />
        <div className="btn btn-primary" onClick={this.props.next}>
          next step
        </div>
      </div>
    );
  }
});

export default Configure;
