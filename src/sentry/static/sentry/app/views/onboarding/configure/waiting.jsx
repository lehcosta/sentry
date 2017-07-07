import React from 'react';
import ApiMixin from '../../../mixins/apiMixin';

const Waiting = React.createClass({
  mixins: [ApiMixin],

  getInitialState() {
    return {
      error: false,
      options: {},
      platform: ''
    };
  },

  componentWillMount() {
    this.fetchData();
  },

  componentDidMount() {
    setInterval(() => { this.fetchEventData(); }, 5000);
  },

  fetchData(callback) {
    this.api.request('/internal/options/?query=is:required', {
      method: 'GET',
      success: data => {
        this.setState({
          options: data,
          loading: false,
          error: false
        });
      },
      error: () => {
        this.setState({
          loading: false,
          error: true
        });
      }
    });
  },

  next() {
    this.setState({step: this.state.step + 1});
  },

  fetchEventData() {

    console.log("Slug is here:" );
    console.log( this.props.orgId + this.props.projectId);
    let orgId= this.props.orgId;
    let projectId= this.props.projectId;
    //grab the org slug and project slug that have just been created. Passed through props?
    this.api.request(`/projects/${orgId}/${projectId}/events/`, {
      method: 'GET',
      success: data => {
        // console.log("WHAAAT");

        this.checkFirstEvent(data);
      },
      error: () => {
        this.setState({hasError: true});
      }
    });

  },

  checkFirstEvent(data) {
    console.log('DONEEEE!!!');
    // Check if there's data
    if (data){
      console.log("Data is here")
    }else{
      console.log('Not yet')
    }

    // If there isnt pass
  },

  render() {
    return (
      <div className="waiting-indicator">
        <h1>Waiting for your event</h1>

      </div>
    );
  }
});

export default Waiting;
