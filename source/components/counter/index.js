//Core
import React from "react";

// Instruments
import Styles from "./styles.m.css";

const Counter = ({ messegeCount }) => (
    <section className = { Styles.counter }> Posts: {messegeCount} </section>
);

export default Counter;
