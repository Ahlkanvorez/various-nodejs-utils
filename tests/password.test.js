import test from 'tape';
import nodeUtils from '../dist';

const password = nodeUtils.password;


test('Should have a .hex property that is a function', assert => {
    assert.true(password.hasOwnProperty('hex'));
    assert.equal(typeof password.hex, 'function');

    assert.end();
});

test('.hex should return a function', assert => {
    assert.equal(typeof password.hex(), 'function');

    assert.end();
});

test('Should have a .words property that is a function', assert => {
    assert.true(password.hasOwnProperty('words'));
    assert.equal(typeof password.words, 'function');

    assert.end();
});

test('Should have a .password property that is a function', assert => {
    assert.true(password.hasOwnProperty('password'));
    assert.equal(typeof password.password, 'function');

    assert.end();
});

test('.hex()() should match /^[A-Za-z0-9]{3}-[A-Za-z0-9]{3}$/', assert => {
    let pw = password.hex()();

    assert.true(/^[A-Za-z0-9]{3}-[A-Za-z0-9]{3}$/.test(pw));

    assert.end();
});

test('.hex(12)() should match /^(?:[A-Za-z0-9]{4}-){3}[A-Za-z0-9]{4}$/',
    assert => {
        let pw = password.hex(12)();

        assert.true(/^(?:[A-Za-z0-9]{3}-){3}[A-Za-z0-9]{3}$/.test(pw));

        assert.end();
    }
);

test('.hex(12)(4) should match /^(?:[A-Za-z0-9]{4}-){2}[A-Za-z0-9]{4}$/',
    assert => {
        let pw = password.hex(12)(4);

        assert.true(/^(?:[A-Za-z0-9]{4}-){2}[A-Za-z0-9]{4}$/.test(pw));

        assert.end();
    }
);

test('.hex()(4) should match /^[A-Za-z0-9]{4}-[A-Za-z0-9]{2}$/', assert => {
    let pw = password.hex()(4);

    assert.true(/^[A-Za-z0-9]{4}-[A-Za-z0-9]{2}$/.test(pw));

    assert.end();
});

test('.words() should match /^[a-zA-Z]+$/', assert => {
    let pw = password.words();

    assert.true(/^[a-zA-Z]+$/.test(pw));

    assert.end();
});

test('.words(5) should match /^[a-zA-Z]+$/', assert => {
    let pw = password.words(5);

    assert.true(/^[a-zA-Z]+$/.test(pw));

    assert.end();
});

test('.password("hex") should match /^[A-Za-z0-9]{3}-[A-Za-z0-9]{3}$/',
    assert => {
        let pw = password.password('hex');

        assert.true(/^[A-Za-z0-9]{3}-[A-Za-z0-9]{3}$/.test(pw));

        assert.end();
    }
);

test('.password("words") should match /^[a-zA-Z]+$/', assert => {
    let pw = password.password('words');

    assert.true(/^[a-zA-Z]+$/.test(pw));

    assert.end();
});
