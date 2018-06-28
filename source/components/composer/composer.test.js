//Core
import React from "react";
import { render, mount } from "enzyme";
import { Composer } from "./index";
// import dom from "react-test-renderer";

const mocks = {
    _cretePostAsyncMock: jest.fn(() => Promise.resolve()),
    preventDefaultMock:  jest.fn(),

};

const avatar = 'https://www.avatar.com';
const currentUserFirstName = 'Andrey';

const props = {
    _createPostAsync: mocks._cretePostAsyncMock,
    currentUserFirstName,
    avatar,
};

const testComment = 'Hello Lecrum';

const initialState = {
    comment: '',
};
const updateState = {
    comment: testComment,
};

const result = mount(<Composer { ...props } />);
const marup = render(<Composer { ...props } />);

// spies
const spies = {
    _updateCommentSpy:        jest.spyOn(result.instance(), '_updateComment'),
    _submitCommentSpy:        jest.spyOn(result.instance(), '_submitComment'),
    _handleFormSubmitSpy:     jest.spyOn(result.instance(), '_handleFormSubmit'),
    _submitCommentOnEnterSpy: jest.spyOn(result.instance(), '_submitCommentOnEnter'),
};

describe('Composer component:', () => {
    describe('Valid makup element:', () => {
        test('core JSX', () => {
            expect(result.find('section.composer')).toHaveLength(1);
            expect(result.find('form')).toHaveLength(1);
            expect(result.find('textarea')).toHaveLength(1);
            expect(result.find('input')).toHaveLength(1);
            expect(result.find('img')).toHaveLength(1);
        });
    });
    describe('Valid makup element:', () => {
        describe('Valid props:', () => {
            test('_createPostAsync by async', async () => {
                await expect(
                    result.prop('_createPostAsync')(),
                ).resolves.toBeUndefined;
            });
        });
        test('currentUserFirstName is string', () => {
            expect(typeof result.prop('currentUserFirstName')).toBe('string');
        });
        test('avatar is string', () => {
            expect(typeof result.prop('avatar')).toBe('string');
        });
    });
    describe('Valid state:', () => {
        test('comment by string', () => {
            expect(result.state('comment')).toBe('');
        });
    });
    describe('Definded -> class:', () => {
        // beforeEach(() =>{
        //
        // });
        describe('_handleFormSubmit:', () => {
            test('Prevent defoult', () => {
                result.instance()._handleFormSubmit({
                    preventDefault: mocks.preventDefaultMock,
                });
                expect(mocks.preventDefaultMock).toHaveBeenCalledTimes(1);
            });
            test('SubmitComment class method', () => {
                expect(spies._handleFormSubmitSpy).toHaveBeenCalledTimes(1);
                jest.clearAllMocks();
            });
        });
        describe('_SubmitComent:', () => {
            afterEach(() => {
                result.setState(initialState);
            });
            test('empty string comment', () => {
                result.instance()._submitComment();

                expect(spies._submitCommentSpy).toHaveReturnedWith(null);
                expect(mocks._cretePostAsyncMock).not.toHaveBeenCalled();
                expect(result.state()).toEqual(initialState);
            });
            test('Shold call thit._creatrPostAsync with a comment as an rest state.comment value', () => {
                result.setState({
                    comment: testComment,
                });
                result.instance()._submitComment();

                expect(mocks._cretePostAsyncMock).toHaveBeenNthCalledWith(
                    1,
                    testComment,
                );
            });

        });
        describe('_updateComment:', () => {
            test('State updete comment', () => {
                result.instance()._updateComment({
                    target: {
                        value: testComment,
                    },
                });
                expect(result.state()).toEqual(updateState);
                jest.clearAllMocks();
                result.setState(initialState);
            });

        });
        describe('_submitCommentOnEnter:', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });
            test('shold call e.preventDefauld() thit._submeatComment when invoked onkeypress handler', () => {
                result.instance()._submitCommentOnEnter({
                    preventDefault: mocks.preventDefaultMock,
                    key:            'Enter',
                });
                expect(mocks.preventDefaultMock).toHaveBeenCalledTimes(1);
                expect(spies._submitCommentSpy).toHaveBeenCalledTimes(1);
            });
        });
        test('shold not call e.preventDefauld() thit._submeatComment any other key is pressed', () => {
            result.instance()._submitCommentOnEnter({
                preventDefault: mocks.preventDefaultMock,
            });
            expect(mocks.preventDefaultMock).not.toHaveBeenCalled();
            expect(spies._submitCommentSpy).not.toHaveBeenCalled();
        });
        describe('_shold implement core buisnes logical of sending a text content to create post handler', () => {
            test('Test value empty  shold by initialisation', () => {
                expect(result.find('textarea').text()).toBe('');
            });
            test('textarea value should be controled by component state', () => {
                expect(result.state('comment')).toBe('');
                expect(result.find('textarea').text()).toBe('');
                result.setState({
                    comment: testComment,
                });
                expect(result.find('textarea').text()).toBe(testComment);
                result.setState(initialState);
            });

            test('text area on change event should trigger thit._updateComment hadler', () => {
                result.find('textarea').simulate('change', {
                    target: {
                        value: testComment,
                    },
                });
                expect(spies._updateCommentSpy).toHaveBeenCalledTimes(1);
                expect(result.find('textarea').text()).toBe(testComment);
                expect(result.state()).toEqual(updateState);
            });
        });
        describe('_shold render valid markup depending on passed props', () => {
            test('shold contain valid css class', () => {
                expect(marup.attr('class')).toBe('composer');
            });
            test('text area tah shold contan valid value for placeholder attribute', () => {
                expect(marup.find('textarea').attr('placeholder')).toBe(`What is in your mind, ${currentUserFirstName}`);
            });
            test('img tag shold conain value far scr attribute', () => {
                expect(marup.find('img').attr('src')).toBe(avatar);
            });
            test('snapshot should match', () => {
                expect(marup.html()).toMatchSnapshot();
            });
        });


    });
});
