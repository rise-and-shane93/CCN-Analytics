import React, { Component } from 'react';

import { connect } from "react-redux";
import { authActions } from '../redux/actions/authActions';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.authActions();
    }

    render() {
        return(
            <h1>Hello World</h1>
        )
    }
}

const mapStateToProps = state => ({
    message: state.message
  })

export default connect(
    mapStateToProps,
    {
        authActions
    }
)(Home);