// Core
import React from "react";
import ReactDOM from "react-dom";

// Theme
import "./theme/init";

const element1 = <h1 title = 'A title'> Hello Lectum!</h1>;

const list = [...Array(10).keys()].map((num, index) => (
    <li key = { index }>List item: {num}</li>
));

// const start = (
//     <div
//         style = { {
//             display:         'flex',
//             justifyContent:  'center',
//             alignItems:      'center',
//             minHeight:       '100vh',
//             backgroundColor: 'slateblue',
//             color:           'white',
//             fontSize:        24,
//             fontWeight:      '600',
//         } }>
//         Интенсив по React: стартовая точка
//     </div>
// );
// Components
import App from "./pages";

// ReactDOM.render(element1, document.getElementById('app'));
// ReactDOM.render(<ul>{ list }</ul>, document.getElementById('app'));
ReactDOM.render(<App />, document.getElementById("app"));
