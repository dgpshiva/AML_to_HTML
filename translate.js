var AMLTranslator = (function () {
    var translate = function(input) {

        // Handling null/empty case
        if (!input) {
            return "";
        }

        // Output variable to store the final result
        var output = "";


        // Mapping dictionaries

        // NOTE: Add mapping of a new AML tag to its HTML element
        // in these dictionaries to extend the code to handle new AML tags

        // NOTE: Keep mapping of opening and closing AML tags to
        // their corresponding HTML elements in separate dictionaries.
        // Since we need to know if a token is opening or a closing tag
        // while parsing

        // Dictionary to map opening AML tags to
        // their corresponding HTML elements
        var openingTagsToHTMLDict = {"^~": "<EM>", "^%": "<STRONG>"};

        // Dictionary to map closing AML tags to
        // their corresponding HTML elements
        var closingTagsToHTMLDict = {"^!~": "</EM>", "^!%": "</STRONG>"};

        // Dictionary to map opening AML tags to
        // their corresponding closing AML tags
        var openingToClosingTagsDict = {"^~": "^!~", "^%": "^!%"};

        // Stack to store opening AML tags encountered while parsing
        var mainStack = [];

        // Stack to hold opening AML tags that have not yet been closed
        var auxStack = [];

        // Iterating the input string character by character
        for (var i = 0; i < input.length; i++) {

            // If character is a '^' indictaes start of a AML tag
            if (input.charAt(i) === '^') {
                var token = input.charAt(i);

                // If second character after '^' is a '!'
                // grab the closing AML tag
                if (input.charAt(i+1) === '!') {
                    token += input.charAt(i+1);
                    token += input.charAt(i+2);
                    i += 2;
                }
                // If second character is not a '!'
                // grab the opening AML tag
                else {
                    token += input.charAt(i+1);
                    i += 1;
                }

                // If the grabbed AML tag is a opening tag
                // - write corresponding HTML to output
                // - push the tag to main stack
                if (token in openingTagsToHTMLDict) {
                    output += openingTagsToHTMLDict[token];
                    mainStack.push(token);
                }

                // If the grabbed AML tag is a closing tag
                // - pop opening AML tags from the main stack till
                //   encounter a opening AML tag that corresponds
                //   to the current grabbed closing AML tag
                // - write HTML corresponding to popped opening AML tag to the output
                // - push the popped tag to the auxiallary stack
                else if (token in closingTagsToHTMLDict) {
                    var lastOpeningTag = mainStack.pop();
                    while (openingToClosingTagsDict[lastOpeningTag] != token) {
                        output += closingTagsToHTMLDict[openingToClosingTagsDict[lastOpeningTag]];
                        auxStack.push(lastOpeningTag);
                        lastOpeningTag = mainStack.pop();
                    }
                    // Write HTML of currently grabbed AML closing tag to the output
                    output += closingTagsToHTMLDict[openingToClosingTagsDict[lastOpeningTag]];

                    // Pop opening AML tags from the auxiallary stack till it is empty.
                    // Write their corresponding HTML elements to the output.
                    // Push them to the main stack
                    while (auxStack.length > 0) {
                        var stillOpenTag = auxStack.pop();
                        output += openingTagsToHTMLDict[stillOpenTag];
                        mainStack.push(stillOpenTag);
                    }
                }
            }

            // If current character is not a '^', it indicates
            // this is not stat of a tag
            // but a normal character. Simply, write it to the output
            else {
                output += input.charAt(i);
            }
        }

        // Return the output
        return output;
    };

    return {
        translate: translate
      }

})();
if (module.exports) {
    module.exports = AMLTranslator;
}

