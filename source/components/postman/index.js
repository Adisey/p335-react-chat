//Core
import React, { Component } from "react";
// import { Transition } from 'react-transition-group';

// Instruments

import Styles from "./styles.m.css";
import avatar from "theme/assets/i_adisey_t.jpg";
import { withProfile } from "../HOK/withprofile";
import { string } from "prop-types";
// import gsap from "gsap";

class Postman extends Component {
    static propTypes = {
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired,
    };
    static defaultProps = {
        currentUserFirstName: "Ivan",
        currentUserLastName:  "Ivanov",
    };
    render () {
        const { currentUserFirstName, currentUserLastName } = this.props;

        // console.log(this.props);

        return (
            <section className = { Styles.postman }>
                <img src = { avatar } />
                <b> Hi ! </b>
                <span>{currentUserFirstName}</span>
                &nbsp;
                <span>{currentUserLastName}</span>
            </section>
        );
    }
}

export default withProfile(Postman);
