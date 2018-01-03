const shell = require('shelljs');
const yargs = require('yargs');
require('shelljs/global');

if(!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
}
const argv = yargs.argv._;
cd('../deploy');
exec('git add .');
exec('git commit -m' +`feat:`+ `${argv[0]}`);
exec('git push');