//Core
import React, { Component } from "react";
import { string, func } from "prop-types";
// import { Consumer } from 'components/HOK/withprofile';
// Instruments
// import avatar from 'theme/assets/homer.png';
import moment from "moment";
import Styles from "./styles.m.css";
import { withProfile } from "../HOK/withprofile";
import Like from "../like";

// import { Composer } from "../composer";

export class Post extends Component {
    static propTypes = {
        _likePostAsync:       func.isRequired,
        _removePostAsync:     func.isRequired,
        avatar:               string.isRequired,
        comment:              string.isRequired,
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired,
    };
    _getCross = () => {
        const {
            currentUserFirstName,
            currentUserLastName,
            firstName,
            lastName,
            // _removePostAsync,
        } = this.props;
        // console.log(`${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}`);

        return `${firstName} ${lastName}` ===
            `${currentUserFirstName} ${currentUserLastName}` ? (
                <span className = { Styles.cross } onClick = { this._removePost } />
            ) : null;
    };
    _removePost = () => {
        const { _removePostAsync, id } = this.props;

        _removePostAsync(id);
    };

    render () {
        const {
            _likePostAsync,
            likes,
            avatar,
            firstName,
            lastName,
            comment,
            created,
            id,
        } = this.props;
        // console.log(this.props, created);
        const cross = this._getCross();

        return (
            <section className = { Styles.post }>
                {cross}
                <img src = { avatar } />
                <a>{`${lastName} ${firstName}  !!!`}</a>
                <time> {moment(created*1000).format("MMMM D h:mm:ss a")}</time>
                <pre>{comment}</pre>
                <Like _likePostAsync = { _likePostAsync } id = { id } likes = { likes } />
            </section>
        );
    }
}

export default withProfile(Post);
