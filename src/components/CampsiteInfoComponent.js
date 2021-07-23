import React, { Component } from 'react';

class CampsiteInfo extends Component {
    constructor(props) {
        super(props);
        this.state.selectedCampsite = {
            campsite: null
        };
    }
    render() {
        if (campsite) {
            return (
                <div className='row'></div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default CampsiteInfo;