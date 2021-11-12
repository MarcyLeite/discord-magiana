class Argument {
	constructor(requiredArgs = [], OptionalArgs = []) {

		this.totalArgs = requiredArgs.length + OptionalArgs.length
		this.requiredArgs = requiredArgs
		this.OptionalArgs = OptionalArgs

	}

	set missArgumentResponse(f) {

	}

	set excessArgumentResponse(f) {
        
	}

	set exceptionArgumentReponse(f) {

	}

	//excecute some of the error functions based on status
	errorReply(status) {
		if(status == STATUS.MISS)
			this.missArgumentFunction()
		else if(status == status.EXCESS)
			this.excessArgumentFunction()
		else if(status == status.EXCEPTION)
			this.exceptionArgumentFunction()
	}

    
	checkArguments(args) {

		let status = STATUS.OK

		if(args.length > this.totalArgs) {
			status = STATUS.EXCESS
		}
		else if(args.length < this.requiredArgs) {
			status = STATUS.MISS
		}
		// eslint-disable-next-line no-constant-condition
		else if(false) {
			status = STATUS.EXCEPTION
		}

		return status

	}

	static get STATUS() {
		return STATUS
	}

}

let STATUS = {
	OK: 0,
	MISS: 1,
	EXCESS: 2,
	EXCEPTION: 3
}

export default Argument