casper.test.begin('Fist Test', function(test) {
    casper.start('http://localhost:3000/#', function () {
    	test.assertTitle('Workflow| Boilerplate', 'Has a correct title');
    	test.assertExists('.logo', 'Logo is exist');
    }).run(function () {
    	test.done();
    });
});

casper.test.begin('Test Dropdown', function (test){
	casper.start('http://localhost:3000/#', function() {
		test.assertExists('.trigger', 'Trigger is exist');
		this.click('.trigger');
		test.assertVisible('.nav', 'Trigger is active');
	}).run(function() {
		test.done();
	});
});