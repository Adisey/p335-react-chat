import React, { Component } from "react";
import { string } from "prop-types";
import { Provider } from "components/HOK/withprofile";
import { hot } from "react-hot-loader";
import Catcher from "components/catcher";

import avatar from "theme/assets/homer.png";

import Feed from "components/feed";

// import Post from 'components/post';

const options = {
    avatar,
    currentUserFirstName: "Андрей",
    currentUserLastName:  "Смирнов",
};

@hot(module)
export default class App extends Component {
    render () {
        return (
            <Catcher>
                <Provider value = { options }>
                    <Feed { ...options } />
                </Provider>
            </Catcher>
        );
    }
}
