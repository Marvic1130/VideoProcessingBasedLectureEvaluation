const spawn = require("child_process").spawn;

const result = spawn('python', ['./BlinkingRecognition.py'])

result.stdout.on('data', function(data) {
    console.log(data.toString())
})

