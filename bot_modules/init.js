import fs from 'fs'
import Command from './commands/classes/Command.js'

//getting config data from file
let rawConfigData = fs.readFileSync('config.json')
const config = JSON.parse(rawConfigData)



export default {

	login: function(client) {
		let token = process.env['MAGIANA_TOKEN']
		client.login(token)
			.then(() => {
				console.log('Running!')
			})
			.catch(() => {
				console.error('Wrong Token!')
				process.exit(1)
			})
	},


	// ---- MAYBE WILL CHAGNGE ----
	initCommands: function() {
        
		Command.setConfig(config['command-settings'])

		function testF(msg) {
			console.log(msg)
		}
        
		let test = new Command('Test', 'test', testF)
		test.toggleTestPhase()
	},

	commandListener: function(client){
		client.on('message', msg => {

			Command.validateCommand(msg)

		})
	}

}