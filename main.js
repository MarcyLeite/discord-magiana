import discord from 'discord.js'
import init from './bot_modules/init.js'

let client = new discord.Client()




init.login(client)


init.initCommands()

//Starts to listen channels
init.commandListener(client)