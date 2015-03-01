
casper.test.begin('Fist Test', 2, function(test) {
    casper.start('http://localhost:3000/#', function () {
    	test.assertTitle('Workflow| Boilerplate', 'Has a correct title');
    	test.assertExists('.logo', 'Logo is exist');
    });

    casper.run(function () {
    	test.done();
    });
});