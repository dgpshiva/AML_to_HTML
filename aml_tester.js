var translateModule = process.argv[2],
    AMLTranslator = require(translateModule);

var testStrings = [
   ["Hello, World!",
    "Hello, World!"],
   ["Hello, ^%World!^!%",
    "Hello, <STRONG>World!</STRONG>"],
   ["Greetings ^%from ^~Glornix^!% Beta-Nine^!~.",
    "Greetings <STRONG>from <EM>Glornix</EM></STRONG><EM> Beta-Nine</EM>."],
   ["^~Hello, ^%Earth!^!~ You are ^~welcome^!% here.^!~",
    "<EM>Hello, <STRONG>Earth!</STRONG></EM><STRONG> You are <EM>welcome</EM></STRONG><EM> here.</EM>"],
    ["Greetings ^%from ^~Glornix^!~ Beta-Nine^!%.",
    "Greetings <STRONG>from <EM>Glornix</EM> Beta-Nine</STRONG>."],
    ["",
     ""],
    [null,
     ""]
];

testStrings.forEach(function (testString, idx) {
  translated = AMLTranslator.translate(testString[0]);
  if (translated.toLowerCase() === testString[1].toLowerCase()) {
    console.log("Example " + (idx + 1) + " is correct.");
  } else {
    console.log("Example " + (idx + 1) + " is incorrect!");
    console.log('  Input:    ' + testString[0]);
    console.log('  Expected: ' + testString[1]);
    console.log('  Received: ' + translated);
  }
});
