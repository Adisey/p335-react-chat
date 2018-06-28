import { sum, delay, getUniqueID, getFullApiUrl } from './';

describe('Summer test', () => {

    test('sum funct', () => {
        expect(typeof sum).toBe('function');
    });
    test('sum funct2', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('sum 2+2', () => {
        const a=1;
        const b=3;
        const result = a+b;

        // console.log(a);
        // console.log(b);
        console.log(result);

        expect(sum(2, 2)).toBe(4);
    });

    test('first argumen is str', () => {
        const result = () => sum('str1', 2);

        expect(result).toThrow();
        // const a=1;
        // const b=3;
        // const result = a+b;
        // console.log(a);
        // console.log(b);
        // console.log(result);
        // debugger;
        // expect(sum(2, 2)).toBe(4);
    });

    const result = () => sum(2, 'str2');

    expect(result).toThrow();

});


describe('delay function', () => {
    test('Promis', () => {
        return expect(delay(2000)).resolves.toBeUndefined();
    });
    // test('Promis2', async () => {
    //     await expect(delay()).resolves.toBe('success');
    // });

});

describe('getUniqueID function', () => {
    test('length 0->15', () => {
        expect(getUniqueID().length).toBe(15);
    });
    test('length 5', () => {
        expect(getUniqueID(5).length).toBe(5);
    });
    test('string', () => {
        expect(typeof getUniqueID()).toBe('string');
    });

});

describe('getFullApiUrl function', () => {
    // test('return String', () => {
    //     const a = 111;
    //     const b = 222;
    //
    //     expect(typeof getFullApiUrl(a, b)).toBe('string');
    // });
    // test('a+b', () => {
    //     const a = 333;
    //     const b = 555;
    //     const rusult = getFullApiUrl(a, b);
    //     const ddd = `${a}/${b}`;
    //
    //     expect(() => {
    //         rusult === ddd;
    //     }).toBe(true);
    // });
});
