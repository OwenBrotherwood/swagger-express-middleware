var util = require('../lib/helpers/util');

/**
 * NOTE: The Util.js file isn't technically exported, but it IS used by other Swagger packages, so it needs to be tested
 */
describe('Util methods', function() {
    'use strict';

    describe('util.warn', function() {
        beforeEach(function() {
            delete process.env.WARN;
            sinon.stub(console, 'warn');
        });

        afterEach(function() {
            process.env.WARN = 'off';
            console.warn.restore();
        });

        it('should call console.warn if the WARN environment variable is not set',
            function() {
                util.warn('test');
                sinon.assert.calledOnce(console.warn);
                sinon.assert.calledWithExactly(console.warn, 'test');
            }
        );

        it('should call console.warn if the WARN environment variable is not set to "off"',
            function() {
                process.env.WARN = 'false';
                util.warn('test');
                sinon.assert.calledOnce(console.warn);
                sinon.assert.calledWithExactly(console.warn, 'test');
            }
        );

        it('should not call console.warn if the WARN environment variable is set to "off"',
            function() {
                process.env.WARN = 'off';
                util.warn('test');
                sinon.assert.notCalled(console.warn);
            }
        );

        it('can be called with just a message',
            function() {
                util.warn('testing 1, 2, 3');
                sinon.assert.calledOnce(console.warn);
                sinon.assert.calledWithExactly(console.warn, 'testing 1, 2, 3');
            }
        );

        it('can be called with a message and params',
            function() {
                util.warn('testing %s, %d, %j', 1, 2, '3');
                sinon.assert.calledOnce(console.warn);
                sinon.assert.calledWithExactly(console.warn, 'testing 1, 2, "3"');
            }
        );

        it('can be called with just an error',
            function() {
                function WarnWithStackTrace() {
                    util.warn(new RangeError('Test Error'));
                }

                WarnWithStackTrace();
                sinon.assert.calledOnce(console.warn);
                expect(console.warn.firstCall.args[0]).to.match(/^RangeError\: Test Error/);
                expect(console.warn.firstCall.args[0]).to.contain('at WarnWithStackTrace');
            }
        );

        it('can be called with an error and a message',
            function() {
                function WarnWithStackTrace() {
                    util.warn(new SyntaxError('Test Error'), 'Testing 1, 2, 3');
                }

                WarnWithStackTrace();
                sinon.assert.calledOnce(console.warn);
                expect(console.warn.firstCall.args[0]).to.match(/^Testing 1, 2, 3 \nSyntaxError\: Test Error/);
                expect(console.warn.firstCall.args[0]).to.contain('at WarnWithStackTrace');
            }
        );

        it('can be called with an error, a message, and params',
            function() {
                function WarnWithStackTrace() {
                    util.warn(new Error('Test Error'), 'Testing %s, %d, %j', 1, 2, '3');
                }

                WarnWithStackTrace();
                sinon.assert.calledOnce(console.warn);
                expect(console.warn.firstCall.args[0]).to.match(/^Testing 1, 2, "3" \nError\: Test Error/);
                expect(console.warn.firstCall.args[0]).to.contain('at WarnWithStackTrace');
            }
        );
    });
    
    describe('util.newError', function() {
         it('can be called with just a message',
            function() {
                var err = util.newError('testing 1, 2, 3');
                expect(err).to.be.an.instanceOf(Error);
                expect(err.status).to.equal(500);
                expect(err.message).to.equal('500 Error: testing 1, 2, 3');
            }
        );

        it('can be called with a message and params',
            function() {
                var err = util.newError('testing %s, %d, %j', 1, 2, '3');
                expect(err).to.be.an.instanceOf(Error);
                expect(err.status).to.equal(500);
                expect(err.message).to.equal('500 Error: testing 1, 2, "3"');
            }
        );

        it('can be called with a status and message',
            function() {
                var err = util.newError(404, 'testing 1, 2, 3');
                expect(err).to.be.an.instanceOf(Error);
                expect(err.status).to.equal(404);
                expect(err.message).to.equal('404 Error: testing 1, 2, 3');
            }
        );

        it('can be called with a status, message, and params',
            function() {
                var err = util.newError(501, 'testing %s, %d, %j', 1, 2, '3');
                expect(err).to.be.an.instanceOf(Error);
                expect(err.status).to.equal(501);
                expect(err.message).to.equal('501 Error: testing 1, 2, "3"');
            }
        );

        it('can be called with an error and message',
            function() {
                var err = null;
                function NewErrorWithStackTrace() {
                    err = util.newError(new SyntaxError('Test Error'), 'testing 1, 2, 3');
                }

                NewErrorWithStackTrace();
                expect(err).to.be.an.instanceOf(Error);
                expect(err.status).to.equal(500);
                expect(err.message).to.equal('500 Error: testing 1, 2, 3 \nTest Error');
                expect(err.stack).to.match(/^500 Error: testing 1, 2, 3 \nTest Error \nSyntaxError: Test Error/);
                expect(err.stack).to.contain('at NewErrorWithStackTrace');
            }
        );

        it('can be called with an error, message, and params',
            function() {
                var err = null;
                function NewErrorWithStackTrace() {
                    err = util.newError(new TypeError('Test Error'), 'testing %s, %d, %j', 1, 2, '3');
                }

                NewErrorWithStackTrace();
                expect(err).to.be.an.instanceOf(Error);
                expect(err.status).to.equal(500);
                expect(err.message).to.equal('500 Error: testing 1, 2, "3" \nTest Error');
                expect(err.stack).to.match(/^500 Error: testing 1, 2, "3" \nTest Error \nTypeError: Test Error/);
                expect(err.stack).to.contain('at NewErrorWithStackTrace');
            }
        );

        it('can be called with a status, error, message, and params',
            function() {
                var err = null;
                function NewErrorWithStackTrace() {
                    err = util.newError(404, new TypeError('Test Error'), 'testing %s, %d, %j', 1, 2, '3');
                }

                NewErrorWithStackTrace();
                expect(err).to.be.an.instanceOf(Error);
                expect(err.status).to.equal(404);
                expect(err.message).to.equal('404 Error: testing 1, 2, "3" \nTest Error');
                expect(err.stack).to.match(/^404 Error: testing 1, 2, "3" \nTest Error \nTypeError: Test Error/);
                expect(err.stack).to.contain('at NewErrorWithStackTrace');
            }
        );
    });
});
