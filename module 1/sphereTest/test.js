/*
 * A simple object to facilitate printing test results to the page 
 */
function TestReporter() {
    var totalNumberOfTests = 0;
    var numberOfTestsPassed = 0;

    //---------------------------------------------------------------------------
    this.reportTestStart = function(message) {
        document.write("<p>" + "<span style='font-size:small'>Testing </span><span style='font-size:large'>" + message + "</span>... ");
    }

    //---------------------------------------------------------------------------
    this.reportTestEnd = function(result) {
        var resultHTML;

        if (result) {
            resultHTML = "<span style='color:green;font-weight:bold;font-style:italic'>Passed</span></p>";
            ++numberOfTestsPassed;
        } else {
            resultHTML = "<span style='color:red;font-weight:bold;font-style:italic'>Failed</span></p>";
        }

        ++totalNumberOfTests;

        document.write(resultHTML);
    }

    //---------------------------------------------------------------------------
    this.reportFinalResults = function() {
        document.write("<h1>Passed " + numberOfTestsPassed + " tests out of " + totalNumberOfTests + "</h1>");

        if (numberOfTestsPassed === totalNumberOfTests) {
            document.write("<img src='https://pa1.narvii.com/6260/660b0520475efbfdd51bd3c0168524837462ff1b_hq.gif'>");
        }
    }
}

// ######################  COMPARISON FUNCTIONS ##############################

//-----------------------------------------------------------------------------
function assert(shouldBeTrue, testName) {
    if (!shouldBeTrue) {
        throw 'test ' + testName + ' failed.';
    }
}

//-----------------------------------------------------------------------------
var FLOAT32_EPSILON = 1.1920928955078125e-7;
function floatEqual(f1, f2) {
    return (Math.abs(f1 - f2) < FLOAT32_EPSILON);
}

//-----------------------------------------------------------------------------
function vectorEqual(arg1, arg2, arg3, arg4, arg5) {
    if (arg2 instanceof Vector3) {
        return floatEqual(arg1.x, arg2.x, arg3) && floatEqual(arg1.y, arg2.y, arg3) && floatEqual(arg1.z, arg2.z, arg3);
    } else {
        return floatEqual(arg1.x, arg2, arg5) && floatEqual(arg1.y, arg3, arg5) && floatEqual(arg1.z, arg4, arg5);
    }
}

//-----------------------------------------------------------------------------
function matrix3Equal(m1, m2, testName) {
    for (var i = 0; i < 9; ++i) {
        if (!floatEqual(m1.elements[i], m2.elements[i])) {
            return false;
        }
    }

    return true;
}

//-----------------------------------------------------------------------------
function matrix4Equal(m1, m2, testName) {
    for (var i = 0; i < 16; ++i) {
        if (!floatEqual(m1.elements[i], m2.elements[i])) {
            return false;
        }
    }

    return true;
}

//-----------------------------------------------------------------------------
function sphereEqual(sphere, x, y, z, radius) {
    return floatEqual(sphere.center.x, x) &&
           floatEqual(sphere.center.y, y) &&
           floatEqual(sphere.center.z, z) &&
           floatEqual(sphere.radius, radius);
}

