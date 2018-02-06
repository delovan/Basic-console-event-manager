const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Welcome to the interactive event manager ! type help to get a list of commands.")

var prefix = 'EVManage >'               // Prefix of the shell
rl.setPrompt(prefix, prefix.length)     // Setting the prefix to the prompt
rl.prompt()                             // Showing the prompt

/* Handling new input in the command line */
rl.on('line', (input) => {
    dealWithInput(input)
    rl.setPrompt(prefix, prefix.length)
    rl.prompt()
})

/* Handling close of the prompt */
rl.on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});


var events = {}


/* Main function that deals with input */
function dealWithInput(input) {
    let functionName = input.split(" ")[0]      // Getting function name from input
    let args = input.split(" ").slice(1)        // Getting the list of args

    // If the function is registered in the global scope
    if(typeof global[functionName] === 'function') {
        // Checking that the parameters match the number of arguments passed
        if(args.length === global[functionName].length) {
            args.length > 0 ? global[functionName](...args) : global[functionName]() // If they are args, pass them
        }else {
            console.log('Misuse of the function ' + functionName + ', see help for the manual')
        }
    }else {
        // If the input is an unknown command
        console.log('Unknown command')
        console.log('Type help for a list of available commands')
    } 
}

// The function that adds an event
global.add = (hour, eventName) => {
    console.log(eventName)
    let hourInt = parseInt(hour)    // Parsing the hour string to integer

    // Check if the hour is a valid hour
    if(typeof hourInt != 'number' || hourInt < 0 || hourInt > 23){
        console.log('Invalid hour, please enter an hour between 00 and 23')
    }else {
        // Do the normal stuff for adding an event
        if(events.hasOwnProperty(hourInt)) {
            events[hourInt].push(eventName)
        }else {
            events[hourInt] = [eventName]
        }
        console.log("Event added successfully")
    } 
}


global.list = () => {
    console.log("List of your today events :")
    console.log("---------------------------")

    for (hour in events) {
        console.log(hour + ':00')
        events[hour].forEach((event) => {
         console.log('    - ' + event)   
        });
    }
}

// The function that exits the program
global.exit = () => {
    rl.close()
}

// The list of available commands
global.help = () => {
    console.info('**************************************************')
    console.info('*               EVENT MANAGER HELP               *')
    console.info('**************************************************')
    console.info('')
    console.info('List of commands :')
    console.info('------------------')
    console.info('help:    Shows the help of the system')
    console.info('exit:    Exits the program')
    console.info('show:    Show the list of events')
}
