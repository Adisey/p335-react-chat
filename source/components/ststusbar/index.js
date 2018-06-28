// Core
import React, { Component } from "react";
import cx from "classnames";
import { bool } from "prop-types";
// import { Consumer } from 'components/HOK/withprofile';
import { socket } from "../../socket/init";

// Instrument

import Styles from "./styles.m.css";
import { withProfile } from "../HOK/withprofile";

@withProfile
export default class StatusBar extends Component {
    static propTypes = {
        online: bool.isRequired,
    };
    render () {
        const {
            online,
            avatar,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;
        // console.log(online);
        const status = cx({
            [Styles.status]:  true,
            [Styles.offline]: !online,
            [Styles.online]:  online,
        });

        const statusString = online ? "Online" : "Offline";

        return (
            <section className = { Styles.statusBar }>
                <div className = { status }>
                    <div>{statusString}</div>
                    <span />
                </div>
                <button>
                    <img src = { avatar } />
                    <span>{currentUserFirstName}</span>
                    &nbsp;
                    <span>{currentUserLastName}</span>
                </button>
            </section>
        );
    }
}
