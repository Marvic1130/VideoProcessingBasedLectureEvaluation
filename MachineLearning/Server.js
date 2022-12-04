const spawn = require("child_process").spawn;

const result = spawn("python", ["./BlinkingRecognition.py"]);

<<<<<<< HEAD
result.stdout.on('data', function(data) {
    console.log(data.toString())
})

=======
result.stdout.on("data", function (data) {
  console.log(data.toString());
});

result.stderr.on("data", function (data) {
  console.log(data.toString());
});
>>>>>>> f8b938e3db34fdf6f3cc45949952d48b6fe03273
