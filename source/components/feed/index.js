//Core
import React, { Component } from "react";
import { string } from "prop-types";
import gsap from "gsap";
import {
    Transition,
    CSSTransition,
    TransitionGroup
} from "react-transition-group";

// Instruments
import { getUniqueID } from "instruments";
// import avatar from 'theme/assets/homer.png';
import Composer from "components/composer";
import Post from "components/post";
import StatusBar from "components/ststusbar";
import Styles from "./styles.m.css";
import Catcher from "components/catcher";
import Spinner from "components/spinner";
import { api } from "../../REST/api";
import { GROUP_ID } from "../../REST/config";
import { socket } from "../../socket/init";

import Counter from "components/counter";
import Postman from "components/postman";

export default class Feed extends Component {
    static propTypes = {
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired,
    };
    static defaultProps = {
        currentUserFirstName: "Ivan",
        currentUserLastName:  "Ivanov",
    };

    // constructor () {
    //     super();
    //     this.createPost = this._createPost.bind(this);
    // }

    state = {
        posts:      [],
        isSpinning: false,
        online:     false,
        hiWindows:  true,
    };

    componentWillMount () {
        // console.log('componentWillMount');
    }

    componentDidMount () {
        // console.log('componentDidMount');
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._fetchPostAsync();

        socket.on("connect", () => {
            this.setState({
                online: true,
            });
        });
        socket.on("disconnect", () => {
            this.setState({
                online: false,
            });
        });
        socket.emit("join", GROUP_ID);
        socket.on("create", (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);

            // console.log(`${currentUserFirstName} ${currentUserLastName} !== ${meta.authorFirstName} ${meta.authorLastName}`);
            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: [createdPost, ...posts],
                }));
            }

            // console.log(postJSON);
            // console.log(meta);
        });
        socket.on("like", (postJSON) => {
            const { data: likedPost, meta } = JSON.parse(postJSON);

            // console.log(`${currentUserFirstName} ${currentUserLastName} !== ${meta.authorFirstName} ${meta.authorLastName}`);
            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.map(
                        (post) => post.id === likedPost.id ? likedPost : post
                    ),
                }));
            }

            // console.log(postJSON);
            // console.log(meta);
        });
        socket.on("remove", (postJSON) => {
            const { data: removePost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.filter((post) => post.id !== removePost.id),
                }));
            }

            // console.log(postJSON);
            // console.log(meta);
        });
    }

    _createPostAsync = async (comment) => {
        try {
            this._setPostsFetchingState(true);
            const post = await api.createPost(comment);

            this.setState((prevState) => ({
                posts: [post, ...prevState.posts],
            }));
        } catch ({ message }) {
            console.error(message);
        } finally {
            this._setPostsFetchingState(false);
        }
    };
    _removePostAsync = async (id) => {
        try {
            this._setPostsFetchingState(true);
            await api.removePost(id);

            this.setState(({ posts }) => ({
                posts: posts.filter((post) => post.id !== id),
            }));
        } catch ({ message }) {
            console.error(message);
        } finally {
            this._setPostsFetchingState(false);
        }
    };

    _createPost (comment) {
        const id = getUniqueID();

        this.setState(({ posts }) => ({
            posts: [{ comment, id }, ...posts],
        }));
    }

    _setPostsFetchingState = (isSpinning) => {
        this.setState({
            isSpinning,
        });
    };

    _fetchPostAsync = async () => {
        try {
            this._setPostsFetchingState(true);
            const posts = await api.fetchPosts();
            // console.log(posts);
            this.setState({
                posts,
            });

        } catch ({ message }) {
            console.error(message);
        } finally {
            this._setPostsFetchingState(false);
        }
    };
    _likePostAsync = async (id) => {
        try {
            this._setPostsFetchingState(true);

            const likedPost = await api.likePost(id);

            this.setState(({ posts }) => ({
                posts: posts.map((post) => post.id === id ? likedPost : post),
            }));
        } catch ({ message }) {
            console.error(message);
        } finally {
            this._setPostsFetchingState(false);
        }
    };

    _animatiomComposerApper = (composer) => {
        gsap.fromTo(composer, 2, { opacity: 0, y: -50 }, { opacity: 1, y: 0 });
    };

    _animatiomPostManApper = (postman) => {
        gsap.fromTo(
            postman,
            2,
            { opacity: 0, x: 250 },
            {
                opacity:    1,
                x:          0,
                onComplete: () => {
                    setTimeout(() => {
                        this.setState({ hiWindows: false });
                    }, 6000);
                },
            }
        );
    };
    _animatiomPostManExit = (postman) => {
        gsap.fromTo(postman, 2, { opacity: 1, x: 0 }, { opacity: 0, x: 250 });
    };

    render () {
        const { posts: userPosts, isSpinning, online, hiWindows } = this.state;

        // console.log('hiWindows', hiWindows);
        const posts = userPosts.map((post) => (
            <CSSTransition
                classNames = { {
                    enter:       Styles.postInStart,
                    enterActive: Styles.postInEnd,
                    exit:        Styles.postOutStart,
                    exitActive:  Styles.postOutEnd,
                } }
                key = { post.id }
                timeout = { {
                    ender: 555,
                    exit:  444,
                } }>
                <Catcher>
                    <Post
                        key = { post.id }
                        { ...post }
                        _likePostAsync = { this._likePostAsync }
                        _removePostAsync = { this._removePostAsync }
                    />
                </Catcher>
            </CSSTransition>
        ));

        const messegeCount = userPosts.length;

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isSpinning } />
                <Transition
                    appear
                    in = { hiWindows }
                    timeout = { 2000 }
                    onEnter = { this._animatiomPostManApper }
                    onExit = { this._animatiomPostManExit }>
                    <Postman />
                </Transition>
                <StatusBar online = { online } />
                <Transition
                    appear
                    in
                    timeout = { 2000 }
                    onEnter = { this._animatiomComposerApper }>
                    <Composer _createPostAsync = { this._createPostAsync } />
                </Transition>
                <Counter messegeCount = { messegeCount } />
                <TransitionGroup>{posts}</TransitionGroup>
            </section>
        );
    }
}
