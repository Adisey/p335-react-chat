//Core
import React, { Component } from "react";
import { string } from "prop-types";
// Instruments
// import avatar from 'theme/assets/homer.png';
import { withProfile } from "components/HOK/withprofile";
import Styles from "./styles.m.css";

export class Composer extends Component {
    static propTypes = {
        avatar:               string.isRequired,
        currentUserFirstName: string.isRequired,
    };

    state = {
        comment: "",
    };

    _handleFormSubmit = (e) => {
        e.preventDefault();
        this._submitComment();
    };

    _updateComment = (e) => {
        const { value } = e.target;
        // console.log(value);

        this.setState({ comment: value });
    };

    _submitComment = () => {
        const { comment } = this.state;

        if (!comment) {
            return null;
        }
        const { _createPostAsync } = this.props;

        _createPostAsync(comment);
        this.setState({ comment: "" });
    };

    _submitCommentOnEnter = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("Enter");
            this._submitComment();
        }
    };

    okCopy = (e) => {
        e.preventDefault();
        console.log("------");
    };
    render () {
        const { comment } = this.state;
        const { avatar, currentUserFirstName } = this.props;
        // console.log(this.props);

        return (
            <section className = { Styles.composer }>
                <img src = { avatar } />
                <form onSubmit = { this._handleFormSubmit }>
                    <textarea
                        placeholder = { `What is in your mind, ${currentUserFirstName}` }
                        value = { comment }
                        onChange = { this._updateComment }
                        onCopy = { this.okCopy }
                        onKeyPress = { this._submitCommentOnEnter }
                    />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}

export default withProfile(Composer);
