import test from 'tape';
import nodeUtils from '../dist';

const json = nodeUtils.json;

test('Should have a .getProperty() function', assert => {
    assert.true(json.hasOwnProperty('getProperty'));

    assert.end();
});

test(`Given package.json as an argument, getProperty should provide a JS \
object.`, assert => {
    json.getProperty('package.json').then(json => {
        assert.equal(typeof json, 'object');

        assert.end();
    });
});

test(`Given package.json and "scripts" as arguments, getProperty should \
provide a JS object.`, assert => {
    json.getProperty('package.json', 'scripts').then(scripts => {
        assert.equal(typeof scripts, 'object');

        assert.end();
    });
});

test(`Given package.json and "scripts" as arguments, getProperty should \
provide a JS object with properties 'build' and 'test'.`, assert => {
    json.getProperty('./package.json', 'scripts').then(scripts => {
        assert.true(scripts.hasOwnProperty('build'));
        assert.true(scripts.hasOwnProperty('test'));

        assert.end();
    });
});
