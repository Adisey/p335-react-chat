//Core
import React from "react";
import Counter from "./";
import dom from "react-test-renderer";

const renderTree = dom.create(<Counter count = { 3 } />).toJSON();


test('Counter Snapshot', () => {
    expect(renderTree).toMatchSnapshot();
});
