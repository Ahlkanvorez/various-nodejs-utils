import test from 'tape';
import nodeUtils from '../dist';

test('Should export the json module', assert => {
    assert.notEqual(nodeUtils.json, undefined);

    assert.end();
});

test('Should export the password module', assert => {
    assert.notEqual(nodeUtils.password, undefined);

    assert.end();
});
