import Argument from './Argument.js'
let config = null


let allCommands = []
let defaultArgument = new Argument()

//---- Internal functions  ----

//search in all commands the call that the user made
function commandFromCall(call) {
	for(let i = 0; i < allCommands.length; i++) {
		if(allCommands[i].call == call) {
			return allCommands[i]
		}
	}
}

function inTestCheck(command, msg) {

	if(command.inTest) {

		//check if message was send in the same guild setted for testing and all it rooms
		if(msg.guild.id == config['test-guild']) {
			for(let i = 0; i < config['test-rooms'].length; i++) {
            
				if(msg.channel.id == config['test-rooms'][i]) {
					return true
				}
			}
		}

		return false
	}

	return true
}

// ------------------

class Command {
	constructor(title, call, workoutFunction, args = defaultArgument) {
        
		this.title = title //name of the command
		this.call = call //what the user need to type after the prefix
		this.workoutFunction = workoutFunction //function that will be called
		this.arguments = args //instance of a argument object with the argument specs of the commamd
		this.inTest = false //commands in test will be only executable in the test channels (config)

		allCommands.push(this)

	}

	toggleTestPhase() {
		if(!this.inTest) 
			this.inTest = true
		else
			this.inTest = false
	}


	static get COMMANDS() {
		return allCommands 
	}

	//validate the prefix and the command call
	static validateCommand(msg) {
		let content = msg.content
		//get the prefix
		let msgPrefix = content[0]
    
		let prefixCheck = msgPrefix == config['default-prefix']

		//skip if isn't calling the bot
		if(!prefixCheck)
			return
    
		//remove prefix
		content = content.substring(1)
    
		//get the suppost command and it Args
		let argsStr = content.split(' ')
    
		//split the command from Args
		let commandCall = argsStr.shift()
        
		let command = commandFromCall(commandCall)

		console.log(command)

		//skip if isn't a valid command
		if(!command)
			return


		if(!inTestCheck(command, msg))
			return
        

		let argumentStatus = command.arguments.checkArguments(argsStr)

		//check if arguments are ok
		if(argumentStatus == Argument.STATUS.OK)
			command.workoutFunction(msg, ...argsStr) //execute the command
		else 
			command.arguments.errorReply(argumentStatus) //return a response if arguments are wrong
    
	}


	static setConfig(s) {
		config = s
	}


}


export default Command