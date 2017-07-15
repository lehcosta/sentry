import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import {Client} from 'app/api';
import Configure from 'app/views/onboarding/Configure';

describe('Configure should render good', function() {
  beforeEach(function() {
    this.sandbox = sinon.sandbox.create();
    this.stubbedApiRequest = this.sandbox.stub(Client.prototype, 'request');
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('render()', function() {
    const baseProps = {
      next: () => {},
      params: {
        projectId: 'testProject',
        orgId: 'testOrg'
      }
    };

    it('should render platform docs', function() {
      let props = {
        ...baseProps
      };
      props.params.platform = 'node';

      let wrapper = shallow(<Configure {...props} />, {
        context: {organization: {id: '1337', slug: 'testOrg', teams: [['testProject']]}}
      });

      const component = wrapper.instance();

      let handleSubmitStub = this.sandbox.stub(
        component,
        'redirectToNeutralDocs',
        () => {}
      );

      component.forceUpdate();
      wrapper.update();
      expect(toJson(wrapper)).toMatchSnapshot();
      expect(handleSubmitStub.callCount).toEqual(0);

      // expect(Configure.prototype.redirectToNeutralDocs.calledOnce).toBeFalsy();
    });

    it('should redirect to if no matching platform', function() {
      let props = {
        ...baseProps
      };
      props.params.platform = 'other';

      console.log(Configure.prototype.__reactAutoBindPairs);
      let handleSubmitStub = this.sandbox.stub(
        Configure.prototype.__reactAutoBindMap,
        'redirectToNeutralDocs',
        () => {}
      );

      let wrapper = shallow(<Configure {...props} />, {
        context: {
          organization: {
            id: '1337',
            slug: 'testOrg',
            teams: [['testProject']]
          }
        }
      });

      // const component = wrapper.instance();

      // let handleSubmitStub = this.sandbox.stub(
      //   component.prototype,
      //   'redirectToNeutralDocs',
      //   () => {}
      // );

      // component.forceUpdate();

      // wrapper.update();
      expect(toJson(wrapper)).toMatchSnapshot();

      expect(handleSubmitStub.callCount).toEqual(1);
    });
  });
});
