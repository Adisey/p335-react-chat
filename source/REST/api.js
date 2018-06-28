import { MAIN_URL, TOKEN } from "./config.js";

export const api = {
    async fetchPosts () {
        const response = await fetch(MAIN_URL, {
            method: "GET",
        });

        if (response.status !== 200) {
            throw new Error("Post Where not loaded");
        }
        const { data: posts } = await response.json();

        return posts;
    },
    async createPost (comment) {
        const response = await fetch(MAIN_URL, {
            method:  "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:  TOKEN,
            },
            body: JSON.stringify({ comment }),
        });

        if (response.status !== 200) {
            throw new Error("Post Where not Create");
        }
        const { data: post } = await response.json();

        return post;
    },

    async removePost (id) {
        const response = await fetch(`${MAIN_URL}/${id}`, {
            method:  "DELETE",
            headers: {
                Authorization: TOKEN,
            },
        });

        if (response.status !== 204) {
            throw new Error("Post not delete");
        }
    },
    async likePost (id) {
        const response = await fetch(`${MAIN_URL}/${id}`, {
            method:  "PUT",
            headers: {
                Authorization: TOKEN,
            },
        });

        if (response.status !== 200) {
            throw new Error("Post not Liked");
        }
        const { data: post } = await response.json();

        return post;
    },
};
