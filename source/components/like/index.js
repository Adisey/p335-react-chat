//Core
import React, { Component } from "react";
import { string, func, arrayOf, shape } from "prop-types";
import cx from "classnames";


// inst
import Styles from "./styles.m.css";
import { withProfile } from "../HOK/withprofile";

class Like extends Component {
    static propType = {
        _likePostAsync: func.isRequired,
        id:             string.isRequired,
        like:           arrayOf(
            shape({
                firstName: string.isRequired,
                lasttName: string.isRequired,
            })
        ).isRequired,
    };

    static defaultProps = {
        likes: [],
    };
    stste = {
        showLikers: true,
    };
    _showLikers = () => {
        this.setState({
            showLikers: false,
        });
    };
    _hideLikers = () => {
        this.setState({
            showLikers: false,
        });
    };

    _likePost = () => {
        const { _likePostAsync, id } = this.props;

        _likePostAsync(id);
    };

    _getLikeByMe = () => {
        const { currentUserFirstName, currentUserLastName, likes } = this.props;

        return likes.some(
            ({ firstName, lastName }) =>
                `${firstName} ${lastName}` ===
                `${currentUserFirstName} ${currentUserLastName}`
        );
    };

    _getListStyles = () => {
        const likeByMe = this._getLikeByMe();

        return cx(Styles.icon, {
            [Styles.liked]: likeByMe,
        });
    };

    _getLikersList = () => {
        const { showLikers } = this.props;
        const { likes } = this.props;
        const linkJSX = likes.map(({ firstName, lastName, id }) => (
            <li key = { id }> {`${firstName} ${lastName}`} </li>
        ));


        return likes.length && showLikers ? <ul>{linkJSX}</ul> : null;
    };

    _getLikeDescription = () => {
        let result = `Not Likes`;
        const { currentUserFirstName, currentUserLastName, likes } = this.props;
        const likedByMe = this._getLikeByMe();

        console.log('likes - ', likes);
        const viewLiked =  likes
            .filter(({ firstName, lastName }) => `${firstName} ${lastName}`
                !== `${currentUserFirstName} ${currentUserLastName}`)
            .map(({ firstName, lastName }) => `${firstName} ${lastName}`)
            .join(', ');

        console.log(`viewLiked`, viewLiked);

        if (likes.length === 0) {
            result = `0 Like`;
        } else if (likes.length === 1 && likedByMe) {
            result = `1 Like (Only You ${currentUserFirstName} ${currentUserLastName})`;
            // result = `${currentUserFirstName} ${currentUserLastName}`;
        } else if (likes.length === 1) {
            result = `1 Like (${viewLiked})`;
        } else if (likes.length === 2 && likedByMe) {
            result = `2 Liks (You and ${viewLiked})`;
        } else if (likes.length > 2 && likedByMe) {
            result = `${likes.length} Liks (You and ${viewLiked})`;
        } else {
            result = `${likes.length} Likes (${viewLiked})`;
        }

        return result;
    };

    render () {
        const likes = this._getLikersList();
        const likeStyles = this._getListStyles();
        const likeDiscription = this._getLikeDescription();

        return (
            <section className = { Styles.like }>
                <span className = { likeStyles } onClick = { this._likePost }>
                    Like
                </span>
                <div>
                    {likes}
                    <span
                        onMouseEnter = { this._showLikers }
                        onMouseLeave = { this._hideLikers }>
                        {likeDiscription}
                    </span>
                </div>
            </section>
        );
    }
}
export default withProfile(Like);
