/*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */
export default (function() {
  "use strict";

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function peg$SyntaxError(message, expected, found, location) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.location = location;
    this.name     = "SyntaxError";

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }

  peg$subclass(peg$SyntaxError, Error);

  peg$SyntaxError.buildMessage = function(expected, found) {
    var DESCRIBE_EXPECTATION_FNS = {
          literal: function(expectation) {
            return "\"" + literalEscape(expectation.text) + "\"";
          },

          "class": function(expectation) {
            var escapedParts = "",
                i;

            for (i = 0; i < expectation.parts.length; i++) {
              escapedParts += expectation.parts[i] instanceof Array
                ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
                : classEscape(expectation.parts[i]);
            }

            return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
          },

          any: function(expectation) {
            return "any character";
          },

          end: function(expectation) {
            return "end of input";
          },

          other: function(expectation) {
            return expectation.description;
          }
        };

    function hex(ch) {
      return ch.charCodeAt(0).toString(16).toUpperCase();
    }

    function literalEscape(s) {
      return s
        .replace(/\\/g, '\\\\')
        .replace(/"/g,  '\\"')
        .replace(/\0/g, '\\0')
        .replace(/\t/g, '\\t')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
        .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
    }

    function classEscape(s) {
      return s
        .replace(/\\/g, '\\\\')
        .replace(/\]/g, '\\]')
        .replace(/\^/g, '\\^')
        .replace(/-/g,  '\\-')
        .replace(/\0/g, '\\0')
        .replace(/\t/g, '\\t')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
        .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
    }

    function describeExpectation(expectation) {
      return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
    }

    function describeExpected(expected) {
      var descriptions = new Array(expected.length),
          i, j;

      for (i = 0; i < expected.length; i++) {
        descriptions[i] = describeExpectation(expected[i]);
      }

      descriptions.sort();

      if (descriptions.length > 0) {
        for (i = 1, j = 1; i < descriptions.length; i++) {
          if (descriptions[i - 1] !== descriptions[i]) {
            descriptions[j] = descriptions[i];
            j++;
          }
        }
        descriptions.length = j;
      }

      switch (descriptions.length) {
        case 1:
          return descriptions[0];

        case 2:
          return descriptions[0] + " or " + descriptions[1];

        default:
          return descriptions.slice(0, -1).join(", ")
            + ", or "
            + descriptions[descriptions.length - 1];
      }
    }

    function describeFound(found) {
      return found ? "\"" + literalEscape(found) + "\"" : "end of input";
    }

    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
  };

  function peg$parse(input, options) {
    options = options !== void 0 ? options : {};

    var peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = function(line) { return line.join(''); },
        peg$c1 = function() { return ''; },
        peg$c2 = function(whitespace, beginningInline, inline, end) { return `${whitespace}${beginningInline}${inline.join('')}${end ? end : ''}`; },
        peg$c3 = function(period, markdown, whitespace, expression) { return `${period}${markdown}${whitespace}${expression}`; },
        peg$c4 = function(open, expression, close) { return `${open}${expression}${close}`; },
        peg$c5 = "[NAME]",
        peg$c6 = peg$literalExpectation("[NAME]", false),
        peg$c7 = "[name]",
        peg$c8 = peg$literalExpectation("[name]", false),
        peg$c9 = function() { return capitalizeFirstLetter(options.creature.name); },
        peg$c10 = "[FULLNAME]",
        peg$c11 = peg$literalExpectation("[FULLNAME]", false),
        peg$c12 = "[fullname]",
        peg$c13 = peg$literalExpectation("[fullname]", false),
        peg$c14 = function() { return capitalizeFirstLetter(options.creature.fullName); },
        peg$c15 = function() { return options.creature.name; },
        peg$c16 = function() { return options.creature.fullName; },
        peg$c17 = peg$anyExpectation(),
        peg$c18 = "[",
        peg$c19 = peg$literalExpectation("[", false),
        peg$c20 = "(",
        peg$c21 = peg$literalExpectation("(", false),
        peg$c22 = ")",
        peg$c23 = peg$literalExpectation(")", false),
        peg$c24 = "*",
        peg$c25 = peg$literalExpectation("*", false),
        peg$c26 = "_",
        peg$c27 = peg$literalExpectation("_", false),
        peg$c28 = "\n",
        peg$c29 = peg$literalExpectation("\n", false),
        peg$c30 = "\r",
        peg$c31 = peg$literalExpectation("\r", false),
        peg$c32 = " ",
        peg$c33 = peg$literalExpectation(" ", false),
        peg$c34 = "\t",
        peg$c35 = peg$literalExpectation("\t", false),
        peg$c36 = ".",
        peg$c37 = peg$literalExpectation(".", false),

        peg$currPos          = 0,
        peg$savedPos         = 0,
        peg$posDetailsCache  = [{ line: 1, column: 1 }],
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }

    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }

    function expected(description, location) {
      location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

      throw peg$buildStructuredError(
        [peg$otherExpectation(description)],
        input.substring(peg$savedPos, peg$currPos),
        location
      );
    }

    function error(message, location) {
      location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

      throw peg$buildSimpleError(message, location);
    }

    function peg$literalExpectation(text, ignoreCase) {
      return { type: "literal", text: text, ignoreCase: ignoreCase };
    }

    function peg$classExpectation(parts, inverted, ignoreCase) {
      return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
    }

    function peg$anyExpectation() {
      return { type: "any" };
    }

    function peg$endExpectation() {
      return { type: "end" };
    }

    function peg$otherExpectation(description) {
      return { type: "other", description: description };
    }

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos], p;

      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line:   details.line,
          column: details.column
        };

        while (p < pos) {
          if (input.charCodeAt(p) === 10) {
            details.line++;
            details.column = 1;
          } else {
            details.column++;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos),
          endPosDetails   = peg$computePosDetails(endPos);

      return {
        start: {
          offset: startPos,
          line:   startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line:   endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildSimpleError(message, location) {
      return new peg$SyntaxError(message, null, null, location);
    }

    function peg$buildStructuredError(expected, found, location) {
      return new peg$SyntaxError(
        peg$SyntaxError.buildMessage(expected, found),
        expected,
        found,
        location
      );
    }

    function peg$parsestart() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseLine();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseLine();
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c0(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseEnd();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c1();
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parseLine() {
      var s0;

      s0 = peg$parseNewLineChar();
      if (s0 === peg$FAILED) {
        s0 = peg$parseNormalLine();
      }

      return s0;
    }

    function peg$parseNormalLine() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseWhitespaceOptional();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseBeginningInline();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseInline();
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parseInline();
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseEndOfLine();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c2(s1, s2, s3, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseBeginningInline() {
      var s0;

      s0 = peg$parseBeginningNameExpression();
      if (s0 === peg$FAILED) {
        s0 = peg$parseInlineCommon();
      }

      return s0;
    }

    function peg$parseInline() {
      var s0;

      s0 = peg$parseSentenceBeginningNameExpression();
      if (s0 === peg$FAILED) {
        s0 = peg$parseNameExpression();
        if (s0 === peg$FAILED) {
          s0 = peg$parseInlineCommon();
        }
      }

      return s0;
    }

    function peg$parseInlineCommon() {
      var s0;

      s0 = peg$parseText();
      if (s0 === peg$FAILED) {
        s0 = peg$parseWhitespace();
        if (s0 === peg$FAILED) {
          s0 = peg$parsePeriodChar();
          if (s0 === peg$FAILED) {
            s0 = peg$parseOpeningSquareBracketChar();
          }
        }
      }

      return s0;
    }

    function peg$parseSentenceBeginningNameExpression() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parsePeriodChar();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseMarkdownOptional();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseWhitespaceOptional();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseBeginningNameExpression();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c3(s1, s2, s3, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseBeginningNameExpression() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseOpeningRoundBracketOptional();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseBeginningName();
        if (s2 === peg$FAILED) {
          s2 = peg$parseBeginningFullName();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseClosingRoundBracketOptional();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c4(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseNameExpression() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseOpeningRoundBracketOptional();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseName();
        if (s2 === peg$FAILED) {
          s2 = peg$parseFullName();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseClosingRoundBracketOptional();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c4(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseBeginningName() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c5) {
        s1 = peg$c5;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c6); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 6) === peg$c7) {
          s1 = peg$c7;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c8); }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c9();
      }
      s0 = s1;

      return s0;
    }

    function peg$parseBeginningFullName() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 10) === peg$c10) {
        s1 = peg$c10;
        peg$currPos += 10;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c11); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 10) === peg$c12) {
          s1 = peg$c12;
          peg$currPos += 10;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c13); }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c14();
      }
      s0 = s1;

      return s0;
    }

    function peg$parseName() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c5) {
        s1 = peg$c5;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c6); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 6) === peg$c7) {
          s1 = peg$c7;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c8); }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c15();
      }
      s0 = s1;

      return s0;
    }

    function peg$parseFullName() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 10) === peg$c10) {
        s1 = peg$c10;
        peg$currPos += 10;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c11); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 10) === peg$c12) {
          s1 = peg$c12;
          peg$currPos += 10;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c13); }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c16();
      }
      s0 = s1;

      return s0;
    }

    function peg$parseText() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseNormalChar();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseNormalChar();
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parseWhitespace() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseSpaceChar();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseSpaceChar();
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parseWhitespaceOptional() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseSpaceChar();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parseSpaceChar();
      }
      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parseMarkdownOptional() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseMarkdownChar();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parseMarkdownChar();
      }
      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parseOpeningRoundBracketOptional() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parseOpeningRoundBracketChar();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parseClosingRoundBracketOptional() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parseClosingRoundBracketChar();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parseEndOfLine() {
      var s0;

      s0 = peg$parseNewLineChar();
      if (s0 === peg$FAILED) {
        s0 = peg$parseEnd();
      }

      return s0;
    }

    function peg$parseNormalChar() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$parsePeriodChar();
      if (s2 === peg$FAILED) {
        s2 = peg$parseSpaceChar();
        if (s2 === peg$FAILED) {
          s2 = peg$parseOpeningSquareBracketChar();
          if (s2 === peg$FAILED) {
            s2 = peg$parseNewLineChar();
          }
        }
      }
      peg$silentFails--;
      if (s2 === peg$FAILED) {
        s1 = void 0;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        if (input.length > peg$currPos) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c17); }
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseOpeningSquareBracketChar() {
      var s0;

      if (input.charCodeAt(peg$currPos) === 91) {
        s0 = peg$c18;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c19); }
      }

      return s0;
    }

    function peg$parseOpeningRoundBracketChar() {
      var s0;

      if (input.charCodeAt(peg$currPos) === 40) {
        s0 = peg$c20;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c21); }
      }

      return s0;
    }

    function peg$parseClosingRoundBracketChar() {
      var s0;

      if (input.charCodeAt(peg$currPos) === 41) {
        s0 = peg$c22;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c23); }
      }

      return s0;
    }

    function peg$parseMarkdownChar() {
      var s0;

      if (input.charCodeAt(peg$currPos) === 42) {
        s0 = peg$c24;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c25); }
      }
      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 95) {
          s0 = peg$c26;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c27); }
        }
      }

      return s0;
    }

    function peg$parseNewLineChar() {
      var s0, s1, s2, s3;

      if (input.charCodeAt(peg$currPos) === 10) {
        s0 = peg$c28;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c29); }
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 13) {
          s2 = peg$c30;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c31); }
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 10) {
            s3 = peg$c28;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c29); }
          }
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parseSpaceChar() {
      var s0;

      if (input.charCodeAt(peg$currPos) === 32) {
        s0 = peg$c32;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c33); }
      }
      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 9) {
          s0 = peg$c34;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c35); }
        }
      }

      return s0;
    }

    function peg$parsePeriodChar() {
      var s0;

      if (input.charCodeAt(peg$currPos) === 46) {
        s0 = peg$c36;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c37); }
      }

      return s0;
    }

    function peg$parseEnd() {
      var s0, s1;

      s0 = peg$currPos;
      peg$silentFails++;
      if (input.length > peg$currPos) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c17); }
      }
      peg$silentFails--;
      if (s1 === peg$FAILED) {
        s0 = void 0;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }


      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }


    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail(peg$endExpectation());
      }

      throw peg$buildStructuredError(
        peg$maxFailExpected,
        peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
        peg$maxFailPos < input.length
          ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
          : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
      );
    }
  }

  return {
    SyntaxError: peg$SyntaxError,
    parse:       peg$parse
  };
})()