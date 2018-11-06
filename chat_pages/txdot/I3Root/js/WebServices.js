/************************************************************************************************
* This file contains Javascript code authored by Interactive Intelligence, Inc.                 *
*                                                                                               *
* The contents of this file are warranted to function as intended, provided they are not        *
* modified in any way by customers, end users, or other parties.                                *
*                                                                                               *
* During the course of this product's support lifecycle, Interactive Intelligence, Inc. may     *
* publish updates to this file at any time, via an SU or similar process.  If other             *
* modifications are made to this file, these modifications may therefore be overwritten.        *
*                                                                                               *
* Customers are encouraged to extend the functionality provided in this file, by creating       *
* additional file(s) which use this file as an API.                                             *
************************************************************************************************/


/* Interaction Center 4.0 SU4 */ 
var ININ_Web_Chat_WebServices_Fileversion = "4.0004.0017.316"; 

/*global ININ: true, Prototype: true, Error: true, window: true */

// Type class
(function()
{
    // private methods
    var _checkForPrototype = function()
    {
        if(!Prototype)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Prototype does not exist");
        }
    };

    var _buildNamespaceName = function(namespaceParts, index)
    {
        return namespaceParts.slice(0, index + 1).join('.');
    };

    var _addNewMembers = function(namespaceObject, name)
    {
        namespaceObject.__isNamespace = true;
        namespaceObject.__typeName = name;
        namespaceObject.getName = function ns$getName() {return this.__typeName;};
    };

    var _verifyNamespaceObjectWithName = function(namespaceObject)
    {
        var parsedName;
        try
        {
            parsedName = eval(namespaceObject.__typeName);
        }
        catch(e)
        {
            parsedName = null;
        }

        if(parsedName !== namespaceObject)
        {
            var msg = "Object in namespace doesn't match the object with name: " + namespaceObject.__typeName;
            delete namespaceObject;
            throw ININ.Web.Common.ExceptionFactory.createException(msg);
        }
    };

    // public methods
    var typeClass =
    {
        registerNamespace : function(namespacePath)
        {
            var rootObject = window;
            var namespaceParts = namespacePath.split('.');

            for (var i = 0; i < namespaceParts.length; ++i)
            {
                var currentPart = namespaceParts[i];
                var namespaceObject = rootObject[currentPart];

                // if the namespace object exists, make sure it's tagged as a namespace
                if (namespaceObject && !namespaceObject.__isNamespace)
                {
                    throw ININ.Web.Common.ExceptionFactory.createException("Part of the namespace " + namespacePath + " is already an object: " + namespaceParts[i]);
                }
                
                if (!namespaceObject)
                {
                    // create the object, add new members on to the existing object and verify the object
                    var name = _buildNamespaceName(namespaceParts, i);
                    namespaceObject = rootObject[currentPart] = {};
                    _addNewMembers(namespaceObject, name);
                    _verifyNamespaceObjectWithName(namespaceObject);
                }
                
                // save this namespace object as the root for the next iteration
                rootObject = namespaceObject;
            }
        }

    };

    // register the namespace for this object and then assign the namespace object itself
    typeClass.registerNamespace("ININ.Web.Common.Type");
    ININ.Web.Common.Type = typeClass;
})();

/*global ININ: true, Error: true, Prototype: true, alert: true, console: true, firebug: true */

ININ.Web.Common.Type.registerNamespace("ININ.Web.Common");

ININ.Web.Common.Type.registerNamespace("ININ.Web.Common.TraceLevels");

// TraceLevel constants
ININ.Web.Common.TraceLevels.ALL = 100;
ININ.Web.Common.TraceLevels.VERBOSE_NOTE = 99;
ININ.Web.Common.TraceLevels.NOTE = 80;
ININ.Web.Common.TraceLevels.STATUS = 60;
ININ.Web.Common.TraceLevels.WARNING = 40;
ININ.Web.Common.TraceLevels.ERROR = 20;
ININ.Web.Common.TraceLevels.CRITICAL_ERROR = 10;
ININ.Web.Common.TraceLevels.ALWAYS = 0;

// Debug class
ININ.Web.Common.Debug = function()
{
    // private members
    var _enabled = false;
    var _currentTraceLevel = ININ.Web.Common.TraceLevels.STATUS;
    var _scopeTraceLevel = ININ.Web.Common.TraceLevels.NOTE;

    var _isFirebugLite = function()
    {
        return typeof(firebug) != "undefined";
    };

    var _shouldLevelBeTraced = function(level)
    {
        if(ININ.Web.Common.Utilities.isType(level, Number))
        {
            return level <= _currentTraceLevel;
        }

        return true;
    };

    var _beginManualScope = function(text)
    {
        ININ.Web.Common.Debug.traceNote(text);
    };

    var _endManualScope = function(text)
    {
        ININ.Web.Common.Debug.traceNote(text);
    };

    var _beginScope = function(prefix, scopeText)
    {
        if(_shouldLevelBeTraced(_scopeTraceLevel))
        {
            if(_isFirebugLite())
            {
                // for firebug lite
                _beginManualScope(prefix + scopeText);
            }
            else
            {
                try
                {
                    console.group(scopeText);
                }
                catch(ex)
                {
                    // for IE developer tools
                    _beginManualScope(prefix + scopeText);
                }
            }
        }
    };

    var _endScope = function(prefix, scopeText)
    {
        if(_shouldLevelBeTraced(_scopeTraceLevel))
        {
            if(_isFirebugLite())
            {
                // for firebug lite
                _endManualScope(prefix + scopeText);
            }
            else
            {
                try
                {
                    console.groupEnd(scopeText);
                }
                catch(ex)
                {
                    // for IE developer tools
                    _endManualScope(prefix + scopeText);
                }
            }
        }
    };
    
    var _logMessage = function(msg, level)
    {
        if(_shouldLevelBeTraced(level))
        {
            try
            {
                console.log(msg);            
            }
            catch(ex)
            {
                // silently fail
            }
        }
    };

    var _logWarning = function(msg)
    {
        if(_shouldLevelBeTraced(ININ.Web.Common.TraceLevels.WARNING))
        {
            try
            {
                console.warn(msg);            
            }
            catch(ex)
            {
                // silently fail
            }
        }
    };

    var _logError = function(msg)
    {
        if(_shouldLevelBeTraced(ININ.Web.Common.TraceLevels.ERROR))
        {
            try
            {
                console.error(msg);            
            }
            catch(ex)
            {
                // silently fail
            }
        }
    };

    // public methods
    return {
        enable : function()
        {
            _enabled = true;
        },

        disable : function()
        {
            _enabled = false;
        },

        isEnabled : function()
        {
            return _enabled;
        },

        setTraceLevel : function(level)
        {
            if((level != ININ.Web.Common.TraceLevels.ALL) &&
               (level != ININ.Web.Common.TraceLevels.VERBOSE_NOTE) &&
               (level != ININ.Web.Common.TraceLevels.NOTE) &&
               (level != ININ.Web.Common.TraceLevels.STATUS) &&
               (level != ININ.Web.Common.TraceLevels.WARNING) &&
               (level != ININ.Web.Common.TraceLevels.ERROR) &&
               (level != ININ.Web.Common.TraceLevels.CRITICAL_ERROR))
            {
                throw new Error("Level specified is not a value in ININ.Web.Common.TraceLevels");
            }

            _currentTraceLevel = level;
        },

        setScopeTraceLevel : function(level)
        {
            if((level != ININ.Web.Common.TraceLevels.ALL) &&
               (level != ININ.Web.Common.TraceLevels.VERBOSE_NOTE) &&
               (level != ININ.Web.Common.TraceLevels.NOTE) &&
               (level != ININ.Web.Common.TraceLevels.STATUS) &&
               (level != ININ.Web.Common.TraceLevels.WARNING) &&
               (level != ININ.Web.Common.TraceLevels.ERROR) &&
               (level != ININ.Web.Common.TraceLevels.CRITICAL_ERROR))
            {
                throw new Error("Level specified is not a value in ININ.Web.Common.TraceLevels");
            }

            _scopeTraceLevel = level;
        },

        traceMethodEntered : function(methodName)
        {
            _beginScope("Entering method: ", methodName);
        },

        traceMethodExited : function(methodName)
        {
            _endScope("Exiting method: ", methodName);
        },

        traceScopeEntered : function(scopeName)
        {
            _beginScope("Entering scope: ", scopeName);
        },

        traceScopeExited : function(scopeName)
        {
            _endScope("Exiting scope: ", scopeName);
        },

        traceAlways : function(msg)
        {
            _logMessage(msg, ININ.Web.Common.TraceLevels.ALWAYS);
        },

        traceVerboseNote : function(msg)
        {
            _logMessage(msg, ININ.Web.Common.TraceLevels.VERBOSE_NOTE);
        },

        traceNote : function(msg)
        {
            _logMessage(msg, ININ.Web.Common.TraceLevels.NOTE);
        },

        traceStatus : function(msg)
        {
            _logMessage(msg, ININ.Web.Common.TraceLevels.STATUS);
        },

        traceWarning : function(msg)
        {
            _logWarning(msg);
        },

        traceError : function(msg, level)
        {
            _logError(msg);
        },

        traceCriticalError : function(msg, level)
        {
            _logError(msg, ININ.Web.Common.TraceLevels.CRITICAL_ERROR);
        },

        alert : function(msg)
        {
            if(_enabled)
            {
                alert(msg);
            }
        },

        breakpoint : function(msg)
        {
            if(_enabled)
            {
                eval('debugger');
            }
        }
    };
}();

/*global ININ: true */

// register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Common.Utilities");

// Utilities class
ININ.Web.Common.Utilities = (function()
{
    // public methods
    return {
        isNullOrUndefined : function(object)
        {
            return (typeof(object) === "undefined") || (object === null);
        },

        isNullOrEmptyString : function(str)
        {
            return ((null == str) || (str.length == 0));
        },

        isType : function(value, type)
        {
            if(typeof type != "function")
            {
                throw ININ.Web.Common.ExceptionFactory.createException("Invalid type sent into isType()");            
            }
            
            if(this.isNullOrUndefined(value))
            {
                return false;
            }

            if(value instanceof type)
            {
                return true;
            }

            return (value.constructor === type);
        },

        getQueryStringValue : function(field)
        {
            var queryString = window.location.search.substring(1);
            var fieldValuePairs = queryString.split("&");
            for (var i = 0; i < fieldValuePairs.length; ++i)
            {
                var parts = fieldValuePairs[i].split("=");
                if (parts[0] == field)
                {
                    return parts[1];
                }
            }
            
            return null;
        }
    };
})();

ININ.Web.Common.QueryStringDebug = ININ.Web.Common.Utilities.getQueryStringValue('debug');
if(ININ.Web.Common.QueryStringDebug)
{
    ININ.Web.Common.Debug.enable();
}

ININ.Web.Common.QueryStringTraceLevel = ININ.Web.Common.Utilities.getQueryStringValue('traceLevel');
if(ININ.Web.Common.QueryStringTraceLevel)
{
    ININ.Web.Common.Debug.setTraceLevel(ININ.Web.Common.QueryStringTraceLevel);
}

/*global ININ: true, Prototype: true, navigator: true */

// register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Common");

// Browser class
ININ.Web.Common.Browser = (function()
{
    // private methods
    var _detectChromeUserAgent = function()
    {
        return (navigator.userAgent.indexOf('Chrome/') > -1);
    };

    // public methods
    return {
        isIE : function()
        {
            return Prototype.Browser.IE;
        },

        isOpera: function()
        {
            return Prototype.Browser.Opera;
        },

        isFireFox : function()
        {
            return Prototype.Browser.Gecko;
        },

        isWebKit : function()
        {
            return Prototype.Browser.WebKit;
        },

        isSafari : function()
        {
            return Prototype.Browser.WebKit && !_detectChromeUserAgent();
        },

        isMobileSafari : function()
        {
            return Prototype.Browser.MobileSafari;
        },

        isChrome : function()
        {
            return Prototype.Browser.WebKit && _detectChromeUserAgent();
        },

        getFireFoxVersion : function()
        {
            // example: Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.1.2) Gecko/20090729 Firefox/3.5.2 (.NET CLR 3.5.30729)

            var userAgent;
            if(arguments.length == 0)
            {
                userAgent = navigator.userAgent;
            }
            else if(arguments.length == 1)
            {
                userAgent = arguments[0];
            }
            
            var tokens = userAgent.split(' ');
            if (tokens && tokens.length > 0)
            {
                for(var i = 0; i < tokens.length; ++i)
                {
                    if(tokens[i].startsWith('Firefox'))
                    {
                        var version;
                        
                        var browserTokens = tokens[i].split('/');
                        if (browserTokens && browserTokens.length > 1)
                        {
                            version = new ININ.Web.Common.Version(browserTokens[1]);
                        }
                        
                        return version;
                    }
                }
            }

            return undefined;
        },

        getIEVersion : function()
        {
            // example: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; InfoPath.2; .NET CLR 1.1.4322; .NET CLR 3.5.21022;

            var userAgent;
            if(arguments.length == 0)
            {
                userAgent = navigator.userAgent;
            }
            else if(arguments.length == 1)
            {
                userAgent = arguments[0];
            }
            
            var tokens = userAgent.split('; ');
            if (tokens && tokens.length > 0)
            {
                for(var i = 0; i < tokens.length; ++i)
                {
                    if(tokens[i].startsWith('MSIE'))
                    {
                        var version;
                        
                        var browserTokens = tokens[i].split(' ');
                        if (browserTokens && browserTokens.length > 1)
                        {
                            version = new ININ.Web.Common.Version(browserTokens[1]);
                        }
                        
                        return version;
                    }
                }
            }

            return undefined;
        }

    };
})();

/*global ININ: true, Class: true */

// register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Common");

// Version class
// Supports versions of type X.X.X with an arbitrary long number of X's, where X is a number
ININ.Web.Common.Version = Class.create(
{
    // public methods
    initialize:function()
    {
        this._versionParts = [];
        
        // check number of arguments sent in constructor
        if(arguments.length === 0)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Version constructor called with 0 arguments, but expected at least 1.");
        }
        
        // check for multiple arguments
        if(arguments.length > 1)
        {
            this._assignVersionNumbers(arguments);
            return;
        }

        // check to see if the single argument is a string (and might need to processed)
        var arg = arguments[0];
        if(Object.isString(arg))
        {
            if(arg.blank())
            {
                throw ININ.Web.Common.ExceptionFactory.createException("Version constructor called with a zero length argument.");
            }
            
            if(arg.indexOf(".") != -1)
            {
                this._parseVersionString(arg);
                return;
            }
        }

        this._versionParts[0] = this._getValidArgument(arg);
    },
    
    get_majorVersion : function()
    {
        return this.get_versionPart(0);
    },

    get_minorVersion : function()
    {
        return this.get_versionPart(1);
    },

    get_buildVersion : function()
    {
        return this.get_versionPart(2);
    },

    get_revisionVersion : function()
    {
        return this.get_versionPart(3);
    },

    get_versionPart : function(index)
    {
        if(index >= this._versionParts.length)
        {
            return 0;
        }
        
        return this._versionParts[index];
    },

    equals : function(version)
    {
        var maxNumParts = Math.max(this._versionParts.length, version._versionParts.length);
        for(var i = 0; i < maxNumParts; ++i)
        {
            if(this.get_versionPart(i) != version.get_versionPart(i))
            {
                return false;
            }
        }

        // this means that every single piece of both versions were equal, so return true
        return true;
    },

    isGreaterThan : function(version)
    {
        var maxNumParts = Math.max(this._versionParts.length, version._versionParts.length);
        for(var i = 0; i < maxNumParts; ++i)
        {
            if(this.get_versionPart(i) > version.get_versionPart(i))
            {
                return true;
            }
            if(this.get_versionPart(i) < version.get_versionPart(i))
            {
                return false;
            }
        }

        // this means they're equal, so return false
        return false;
    },

    isLessThan : function(version)
    {
        var maxNumParts = Math.max(this._versionParts.length, version._versionParts.length);
        for(var i = 0; i < maxNumParts; ++i)
        {
            if(this.get_versionPart(i) < version.get_versionPart(i))
            {
                return true;
            }
            if(this.get_versionPart(i) > version.get_versionPart(i))
            {
                return false;
            }
        }

        // this means they're equal, so return false
        return false;
    },

    isGreaterThanOrEqualTo : function(version)
    {
        return (this.isGreaterThan(version) || this.equals(version));
    },

    isLessThanOrEqualTo : function(version)
    {
        return (this.isLessThan(version) || this.equals(version));
    },

    // private methods
    _parseVersionString : function(versionString)
    {
        var versionParts = versionString.split('.');
        this._assignVersionNumbers(versionParts);
    },

    _assignVersionNumbers : function(versionParts)
    {
        // make sure every part is a number
        for(var i = 0; i < versionParts.length; ++i)
        {
            var part = this._getValidArgument(versionParts[i]);
            this._versionParts[i] = part;
        }
    },
    
    _getValidArgument : function(arg)
    {
        var validArg;
        
        if(ININ.Web.Common.Utilities.isNullOrUndefined(arg))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Version constructor called with null/undefined argument.");
        }

        if(Object.isString(arg))
        {
            if(arg.blank())
            {
                throw ININ.Web.Common.ExceptionFactory.createException("Version constructor called with a zero length argument.");
            }
            
            // convert it to a number and let the number branch handle it
            arg = parseInt(arg, 10);
        }
        
        if(Object.isNumber(arg))
        {
            if(isNaN(arg))
            {
                throw ININ.Web.Common.ExceptionFactory.createException("Version constructor called with Nan argument.");
            }
            
            if(arg == Infinity)
            {
                throw ININ.Web.Common.ExceptionFactory.createException("Version constructor called with Infinity argument.");
            }

            if(arg < 0)
            {
                throw ININ.Web.Common.ExceptionFactory.createException("Version constructor called with a negative number argument.");
            }

            return arg;
        }
        
        throw ININ.Web.Common.ExceptionFactory.createException("Version constructor called with an argument that is not of type String or Number.");
    },
    
    toString : function()
    {
        var output = '';

        for (var i = 0; i < this._versionParts.length; ++i)
        {
            if (output)
            {
                output += '.';
            }

            output += this._versionParts[i];
        }
        
        return output;
    }

});

/*global ININ: true, Error: true, Prototype: true, alert: true */

ININ.Web.Common.Type.registerNamespace("ININ.Web.Common");

// Debugging class
ININ.Web.Common.ParameterValidation = function()
{
    // private methods
    var _validateType = function(type, argument)
    {
        return ININ.Web.Common.Utilities.isType(argument, type);
    };

    var _validateAllowEmpty = function(allowEmpty, argument)
    {
        // if we're checking whether it's empty, then it really needs to be a string
        if(!ININ.Web.Common.Utilities.isType(argument, String))
        {
            return false;
        }

        if(allowEmpty)
        {
            // any value is ok
            return true;
        }
        
        return !argument.blank();
    };

    var _validateRequired = function(isRequired, argument)
    {
        if(!isRequired)
        {
            // not required, so this validator will pass no matter what
            return true;
        }

        return (!ININ.Web.Common.Utilities.isNullOrUndefined(argument));
    };

    // public methods
    return {
        validate : function(args, validators)
        {
            if(ININ.Web.Common.Debug.isEnabled())
            {
                if(ININ.Web.Common.Utilities.isNullOrUndefined(validators))
                {
                    throw ININ.Web.Common.ExceptionFactory.createException("Validators are null/undefined.");
                }

                if(!ININ.Web.Common.Utilities.isNullOrUndefined(args))
                {
                    if(args.length > validators.length)
                    {
                        throw ININ.Web.Common.ExceptionFactory.createException("More args than validators.");
                    }

                    for(var i = 0; i < validators.length; ++i)
                    {
                        var validator = validators[i];
                        var argument = args[i];

                        if(ININ.Web.Common.Utilities.isNullOrUndefined(validator))
                        {
                            throw ININ.Web.Common.ExceptionFactory.createException("Validator at index " + i + " is null/undefined.");
                        }

                        // validate required, if provided
                        if(validator.required)
                        {
                            if(!_validateRequired(validator.required, argument))
                            {
                                throw ININ.Web.Common.ExceptionFactory.createException("Argument at index " + i + " is required, but is not provided");
                            }
                        }

                        // got past the required check, so continue checking if it's actually defined
                        if(!ININ.Web.Common.Utilities.isNullOrUndefined(argument))
                        {
                            // validate the type, if provided
                            if(validator.type)
                            {
                                if(!_validateType(validator.type, argument))
                                {
                                    throw ININ.Web.Common.ExceptionFactory.createException("Argument at index " + i + " is not of type " + validator.type);
                                }
                            }

                            // validate allowEmpty, if provided
                            if(validator.allowEmpty && (typeof validator.allowEmpty != "boolean"))
                            {
                                throw ININ.Web.Common.ExceptionFactory.createException("AllowEmpty value is not a boolean but '" + validator.allowEmpty + "'");
                            }

                            if(ININ.Web.Common.Utilities.isType(argument, String) && (typeof validator.allowEmpty == "boolean") && !validator.allowEmpty)
                            {
                                if(!_validateAllowEmpty(validator.allowEmpty, argument))
                                {
                                    throw ININ.Web.Common.ExceptionFactory.createException("Argument at index " + i + " is not allowed to be empty");
                                }
                            }

                            if(ININ.Web.Common.Utilities.isType(argument, Array) && (validator.elementType))
                            {
                                for(var j = 0; j < argument.length; ++j)
                                {
                                    if(!_validateType(validator.elementType, argument[j]))
                                    {
                                        throw ININ.Web.Common.ExceptionFactory.createException("Element " + j + " in argument at index " + i + " is not of type " + validator.elementType);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
}();

// register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Common.DependencyValidators");

// DependencyValidators class
ININ.Web.Common.DependencyValidators = (function()
{
    // private methods
    var _checkForPrototype = function()
    {
        if(!Prototype)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Prototype does not exist");
        }
    };

    var _checkForPrototypeVersion = function(requiredVersionString)
    {
        var requiredVersion = new ININ.Web.Common.Version(requiredVersionString);
        var providedVersion = new ININ.Web.Common.Version(Prototype.Version);
        if(!providedVersion.isGreaterThanOrEqualTo(requiredVersion))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Prototype is of an unsupported version");
        }
    };
    
    var _checkForJQuery = function()
    {
        if(!jQuery)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("jQuery does not exist");
        }
    };

    var _checkForJQueryVersion = function(requiredVersionString)
    {
        var requiredVersion = new ININ.Web.Common.Version(requiredVersionString);
        var providedVersion = new ININ.Web.Common.Version(jQuery.prototype.jquery);
        if(!providedVersion.isGreaterThanOrEqualTo(requiredVersion))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("JQuery is of an unsupported version");
        }
    };
    
    // public methods
    return {
        requirePrototypeVersion : function(requiredVersion)
        {
            _checkForPrototype();
            _checkForPrototypeVersion(requiredVersion);
        },

        requireJQueryVersion : function(requiredVersion)
        {
            _checkForJQuery();
            _checkForJQueryVersion(requiredVersion);
        }
    };

})();

/*global ININ: true, Error: true, Prototype: true, alert: true */

ININ.Web.Common.Type.registerNamespace("ININ.Web.Common");

// ExceptionFactory class
ININ.Web.Common.ExceptionFactory = function()
{
    // private methods
    var _popStackFrame = function(error)
    {
        if (ININ.Web.Common.Utilities.isNullOrUndefined(error) ||
            ININ.Web.Common.Utilities.isNullOrUndefined(error.stack) ||
            ININ.Web.Common.Utilities.isNullOrUndefined(error.fileName) ||
            ININ.Web.Common.Utilities.isNullOrUndefined(error.lineNumber))
        {
            return;
        }

        var stackFrames = error.stack.split("\n");
        var currentFrame = stackFrames[0];
        var pattern = error.fileName + ":" + error.lineNumber;
        while(!ININ.Web.Common.Utilities.isNullOrUndefined(currentFrame) && (currentFrame.indexOf(pattern) === -1))
        {
            stackFrames.shift();
            currentFrame = stackFrames[0];
        }

        var nextFrame = stackFrames[1];
        if (ININ.Web.Common.Utilities.isNullOrUndefined(nextFrame))
        {
            return;
        }

        var nextFrameParts = nextFrame.match(/@(.*):(\d+)$/);
        if (ININ.Web.Common.Utilities.isNullOrUndefined(nextFrameParts))
        {
            return;
        }

        error.fileName = nextFrameParts[1];
        error.lineNumber = parseInt(nextFrameParts[2], 10);
        stackFrames.shift();
        error.stack = stackFrames.join("\n");
    };
    
    var _getGeneratedFileNameFromError = function(error)
    {
        // check the firefox variant, then safari variant
        return error.fileName || error.sourceURL || null;
    };

    var _getGeneratedLineNumberFromError = function(error)
    {
        // check the firefox variant, then safari variant
        return error.lineNumber || error.line || null;
    };

    var _setBrowserSpecificMembers = function(error, fileName, lineNumber)
    {
        if(ININ.Web.Common.Browser.isFireFox())
        {
            error.fileName = fileName;
            error.lineNumber = lineNumber;
        }
        else if(ININ.Web.Common.Browser.isSafari())
        {
            // Safari gets mad if you assign it an undefined value
            // it won't assign the real source URL when the error actually gets thrown
            // maybe uses a dirty flag or something to mark that it's been changed (even change to another undefined)
            if(fileName)
            {
                error.sourceURL = fileName;
            }
            if(lineNumber)
            {
                error.line = lineNumber;
            }
        }
    };

    // public methods
    return {
        createException : function(message, fileName, lineNumber)
        {
            ININ.Web.Common.ParameterValidation.validate(arguments, [ {"required": true, "type": String, "allowEmpty": false}, {"type": String, "allowEmpty": false}, {"type": Number} ]);

            // create the error
            var error = new Error(message);

            // pop the stack frame so that the error shows the correct place if file name and line number aren't specified
            _popStackFrame(error);

            // get the line number from error (since browsers like firefox and webkit will set that for you)
            if(!lineNumber)
            {
                lineNumber = _getGeneratedLineNumberFromError(error);
            }

            // get the file name from error (since browsers like firefox and webkit will set that for you)
            if(!fileName)
            {
                fileName = _getGeneratedFileNameFromError(error);
            }

            // attach custom members
            error._message = message;
            error._fileName = fileName;
            error._lineNumber = lineNumber;
            
            // set browser specific members
            _setBrowserSpecificMembers(error, fileName, lineNumber);

            // add methods
            error.alert = function() { alert(this._message); };
            error.get_message = function() { return this._message; };
            error.get_lineNumber = function()
            {
                // webkit browsers set this members when the error gets thrown
                // so we can't set it on creation
                if(this.line)
                {
                    return this.line;
                }

                return this._lineNumber;
            };
            error.get_fileName = function()
            {
                // webkit browsers set this members when the error gets thrown
                // so we can't set it on creation
                if(this.sourceURL)
                {
                    return this.sourceURL;
                }

                return this._fileName;
            };
            error.get_displayMessage = function()
            {
                var msg;
                
                if(this._message)
                {
                    msg = "Message: '" + this._message + "'";
                }
                if(error._fileName)
                {
                    msg = msg + " File: '" + this._fileName + "'";
                }
                if(error._lineNumber)
                {
                    msg = msg + " Line:" + this._lineNumber;
                }
            
                return msg;
            };

            // log the error if enabled
            ININ.Web.Common.Debug.traceError("Exception created: " + error.get_displayMessage());

            return error;
        }
    };
}();

/*global ININ: true, Prototype: true, Error: true, Class: true, window: true */

// register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Common");

// check for prototype and version
ININ.Web.Common.DependencyValidators.requirePrototypeVersion("1.6.1");

// Interface class
ININ.Web.Common.Interface = Class.create(
{
    // public methods
    initialize:function(name, methods, bases)
    {
        // check number of arguments sent in constructor
        if((arguments.length != 2) && (arguments.length != 3))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Interface constructor called with " + arguments.length +
                "arguments, but expected exactly 2 or 3.");
        }
        
        // initialize the object
        this.methods = [];
        this._baseInterfaceNames = [];
        
        // set the name
        this.name = name;
        
        // keep all base interface names
        this._pushBaseInterfaceNames(bases);
        
        // keep all base interface methods
        this._pushBaseInterfaceMethods(bases);

        // keep all parameter methods
        this._pushMethods(methods);
    },
    
    get_name : function()
    {
        return this.name;
    },

    get_methods : function()
    {
        return this.methods;
    },

    get_baseInterfaceNames : function()
    {
        return this._baseInterfaceNames;
    },

    // private methods
    _pushBaseInterfaceNames : function(baseInterfaceNames)
    {
        if(baseInterfaceNames)
        {
            for(var i = 0, len = baseInterfaceNames.length; i < len; ++i)
            {
                var baseName = baseInterfaceNames[i];
                if(typeof baseName !== 'string')
                {
                    throw ININ.Web.Common.ExceptionFactory.createException("Interface constructor expects base interface names to be passed in as a string.");
                }

                // make sure we don't already have it, then add it
                if(this._baseInterfaceNames.indexOf(baseName) == -1)
                {
                    this._baseInterfaceNames.push(baseName);        
                }
            }
        }
    },
    
    _pushBaseInterfaceMethods : function(baseInterfaceNames)
    {
        if(baseInterfaceNames)
        {
            for(var i = 0, len = baseInterfaceNames.length; i < len; ++i)
            {
                var baseName = baseInterfaceNames[i];
                if(typeof baseName !== 'string')
                {
                    throw ININ.Web.Common.ExceptionFactory.createException("Interface constructor expects base interface names to be passed in as a string.");
                }
                if(!baseName)
                {
                    throw ININ.Web.Common.ExceptionFactory.createException("Empty base interface name passed into Interface constructor.");
                }

                // save the base interface's methods
                var baseInterface = ININ.Web.Common.Interface.getInterface(baseName);
                if(!baseInterface)
                {
                    throw ININ.Web.Common.ExceptionFactory.createException("Unknown base interface passed into Interface constructor: " + baseName);
                }
                this._pushMethods(baseInterface.methods);
            }
        }
    },

    _pushMethods : function(methods)
    {
        for(var i = 0, len = methods.length; i < len; ++i)
        {
            var method = methods[i];
            
            // make sure the method is the right type
            if(typeof method !== 'string')
            {
                throw ININ.Web.Common.ExceptionFactory.createException("Interface constructor expects method names to be passed in as a string.");
            }

            // make sure the method has a name
            if(method.length === 0)
            {
                throw ININ.Web.Common.ExceptionFactory.createException("Interface constructor expects method names to be non-empty.");
            }

            // make sure we don't already have it, then add it
            if(this.methods.indexOf(method) == -1)
            {
                this.methods.push(method);        
            }
        }
    }
});

// public static methods
ININ.Web.Common.Interface.isInterface = function(object)
{
    return (object.get_methods() && object.get_baseInterfaceNames() && object.get_name());
};

// This method is meant for ensuring an object implements a class. It will throw an exception if it does not.
// It is meant only for debugging and will only be run when debugging is enabled.
ININ.Web.Common.Interface.ensureImplements = function(object, interfaces, onlyCheckMethods)
{
    if(ININ.Web.Common.Debug.isEnabled())
    {
        // check the number of arguments
        if((arguments.length != 2) && (arguments.length != 3))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Function Interface.ensureImplements called with " + 
              arguments.length  + " arguments, but expected exactly 2 or 3.");
        }

        var errorMsg = ININ.Web.Common.Interface._ensureImplementsReturnErrorMessage(object, interfaces, onlyCheckMethods);
        if(errorMsg)
        {
            throw ININ.Web.Common.ExceptionFactory.createException(errorMsg);
        }
    }
};

// This method check to see if an object implements a class. It will return false if it does not.
// It will be run no matter if debugging is enabled or not.
ININ.Web.Common.Interface.doesImplement = function(object, interfaces, onlyCheckMethods)
{
    // check the number of arguments
    if((arguments.length != 2) && (arguments.length != 3))
    {
        throw ININ.Web.Common.ExceptionFactory.createException("Function Interface.doesImplement called with " + 
          arguments.length  + " arguments, but expected exactly 2 or 3.");
    }

    if(ININ.Web.Common.Interface._ensureImplementsReturnErrorMessage(object, interfaces, onlyCheckMethods))
    {
        return false;
    }

    return true;
};

ININ.Web.Common.Interface.getInterface = function(namespacePath)
{
    var namespace = window;
    
    var namespaceParts = namespacePath.split('.');
    for (var i = 0; i < namespaceParts.length; ++i)
    {
        var currentPart = namespaceParts[i];
        namespace = namespace[currentPart];
    }
    
    return namespace;    
};

// private static methods
ININ.Web.Common.Interface._checkInterfaceParameterForNullUndefinedAndObject = function(param)
{
    var validArg;
    
    if(param === null)
    {
        throw ININ.Web.Common.ExceptionFactory.createException("Interface parameter is null.");
    }

    if(param === undefined)
    {
        throw ININ.Web.Common.ExceptionFactory.createException("Interface parameter is undefined.");
    }

    if(typeof param != "object")
    {
        throw ININ.Web.Common.ExceptionFactory.createException("Interface parameter is not of type object.");
    }
}

ININ.Web.Common.Interface._ensureImplementsReturnErrorMessage = function(object, interfaces, onlyCheckMethods)
{
    ININ.Web.Common.Interface._checkInterfaceParameterForNullUndefinedAndObject(interfaces);

    // convert interfaces parameter to array if not already, so we can support both arrays and non-arrays
    if(typeof interfaces.length == "undefined")
    {
        var singleInterface = interfaces;
        ININ.Web.Common.Interface._checkInterfaceParameterForNullUndefinedAndObject(singleInterface);
        
        interfaces = [];
        interfaces.push(singleInterface);
    }
    
    // make sure the array has something in it
    if(interfaces.length == 0)
    {
        throw ININ.Web.Common.ExceptionFactory.createException("No interfaces passed in to check.");
    }

    // iterate over the interface argument
    for(var i = 0, len = interfaces.length; i < len; ++i)
    {
        var curInterface = interfaces[i];
        ININ.Web.Common.Interface._checkInterfaceParameterForNullUndefinedAndObject(curInterface);

        // make sure the interface we have is an interface
        if(curInterface.constructor !== ININ.Web.Common.Interface)
        {
            return "Function Interface.ensureImplements expects interfaces to be instances of Interface.";
        }
        
        if(!onlyCheckMethods)
        {
            // make sure the class implements interfaces
            if(!object.implementsInterface)
            {
                return "Function Interface.ensureImplements: object does not implement any interfaces.";
            }
            
            // make sure the class implements the interface's name
            if(!object.implementsInterface(curInterface))
            {
                return "Function Interface.ensureImplements: object does not implement the " +
                    curInterface.get_name() + " interface.";
            }
        }
        
        // iterate over the interface's methods and make sure the class implements it
        for(var j = 0, methodsLen = curInterface.methods.length; j < methodsLen; j++)
        {
            var method = curInterface.methods[j];
            if((!object[method]) || (typeof object[method] !== 'function'))
            {
                return "Function Interface.ensureImplements: object does not implement the " +
                  curInterface.get_name() + " interface. Method " + method + " was not found.";
            }
        }
    }
    
    return null;
};

/*global ININ: true, Prototype: true, Error: true, Class: true */

// register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Common");

// check for prototype and version
ININ.Web.Common.DependencyValidators.requirePrototypeVersion("1.6.1");

// InterfaceImplementation class
ININ.Web.Common.InterfaceImplementation = Class.create(
{
    // constructor
    initialize : function()
    {
        this._interfaceNames = [];
    },

    // destructor
    destroy : function()
    {
        delete this._interfaceNames;
        this._interfaceNames = null;
    },

    // public methods
    addImplementedInterface : function(interfaceObject)
    {
        if(!interfaceObject)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("interface is null/undefined");
        }
        
        // add the interface
        this._addImplementedInterfaceName(interfaceObject.name);

        // add the interface's base interfaces
        var baseInterfaceNames = interfaceObject.get_baseInterfaceNames();
        if(baseInterfaceNames)
        {
            for(var i = 0; i < baseInterfaceNames.length; ++i)
            {
                this.addImplementedInterface(ININ.Web.Common.Interface.getInterface(baseInterfaceNames[i]));
            }
        }
    },

    implementsInterface : function(interfaceObject)
    {
        return (this._interfaceNames.indexOf(interfaceObject.name) != -1);
    },

    // private methods
    _addImplementedInterfaceName : function(interfaceName)
    {
        // make sure interface is actually implemented first
        ININ.Web.Common.Interface.ensureImplements(this, ININ.Web.Common.Interface.getInterface(interfaceName), true);
    
        // add interface
        if(this._interfaceNames.indexOf(interfaceName) == -1)
        {
            this._interfaceNames.push(interfaceName);
        }
    }

});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Common");


// Map class
ININ.Web.Common.Map = Class.create(
{
    // constructor
    initialize : function()
    {
        this._map = {};
    },

    // destructor
    destroy : function()
    {
        this.removeAll();
        delete this._map;
        this._map = null;
    },

    // methods
    put : function(key, value)
    {
        this._map[key] = value;
    },

    get : function(key)
    {
         return this._map[key];
    },

    remove : function(key)
    {
         delete this._map[key];
    },

    containsKey : function(soughtKey)
    {
         var foundKey = this.get(soughtKey);
         if (foundKey)
         {
             return true;
         }
         else
         {
             return false;
         }
    },

    containsValue : function(soughtValue)
    {
         var key = this.nextKey();
         while (key)
         {
             if (soughtValue == this.get(key))
             {
                 return true;
             }
             key = this.nextKey(key);
         }
         return false;
    },

    removeAll : function()
    {
        for (var key in this._map)
        {
            if(this._map.hasOwnProperty(key))
            {
                this.remove(key);
            }
        }
    },

    size : function()
    {
         var count = 0;
         for (var key in this._map)
         {
            if(this._map.hasOwnProperty(key))
            {
                 count++;
            }
         }
         return count;
    },

    isEmpty : function()
    {
         return this.size() === 0;
    },

    firstKey : function()
    {
         return this.nextKey();
    },

    firstObject : function()
    {
         return this.get(this.firstKey());
    },

    nextKey : function(returnTheKeyAfterThisOne)
    {
        var readyToReturn = false;
        if (!returnTheKeyAfterThisOne)
        {
            // If no arg supplied, just return the key found in the first iteration of the loop!
            readyToReturn = true;
        }

        for (var key in this._map)
        {
            if(this._map.hasOwnProperty(key))
            {
                if (readyToReturn)
                {
                    return key;
                }
                else if (returnTheKeyAfterThisOne == key)
                {
                    readyToReturn = true;
                }
            }
        }
        return null;
    },

    nextObject : function(key)
    {
        return this.get(this.nextKey(key));
    }
});

/*global ININ: true */

ININ.Web.Common.Type.registerNamespace("ININ.Web.Common");

// Ioc class
ININ.Web.Common.IoC = function()
{
    // private member
    var _typeMap = new ININ.Web.Common.Map();
    var _singletonMap = new ININ.Web.Common.Map();

    // public methods
    return {
        register : function(type, implementationType)
        {
            if(!type)
            {
                throw ININ.Web.Common.ExceptionFactory.createException("Type sent in to IoC.register is null or undefined: " + type);
            }

            if(!ININ.Web.Common.Interface.isInterface(type))
            {
                throw ININ.Web.Common.ExceptionFactory.createException("Type sent in to IoC.register is not an interface");
            }

            if(_typeMap.get(type.get_name()))
            {
                throw ININ.Web.Common.ExceptionFactory.createException("Type " + type + " already exists in IoC");
            }

            _typeMap.put(type.get_name(), implementationType);
        },

        registerSingleton : function(type, implementationType)
        {
            if(!type)
            {
                throw ININ.Web.Common.ExceptionFactory.createException("Type sent in to IoC.registerSingleton is null or undefined: " + type);
            }

            if(!ININ.Web.Common.Interface.isInterface(type))
            {
                throw ININ.Web.Common.ExceptionFactory.createException("Type sent in to IoC.registerSingleton is not an interface");
            }

            if(_singletonMap.get(type.get_name()))
            {
                throw ININ.Web.Common.ExceptionFactory.createException("Type " + type + " already exists in IoC");
            }

            _singletonMap.put(type.get_name(), new implementationType());
        },

        registerSingletonInstance : function(type, instance)
        {
            if(!type)
            {
                throw ININ.Web.Common.ExceptionFactory.createException("Type sent in to IoC.registerSingleton is null or undefined: " + type);
            }

            if(!ININ.Web.Common.Interface.isInterface(type))
            {
                throw ININ.Web.Common.ExceptionFactory.createException("Type sent in to IoC.registerSingleton is not an interface");
            }

            if(_singletonMap.get(type.get_name()))
            {
                throw ININ.Web.Common.ExceptionFactory.createException("Type " + type + " already exists in IoC");
            }

            ININ.Web.Common.Interface.ensureImplements(instance, [type]);

            _singletonMap.put(type.get_name(), instance);
        },

        get : function(type)
        {
            var implementationType = _typeMap.get(type.get_name());
            if(ININ.Web.Common.Utilities.isNullOrUndefined(implementationType))
            {
                throw ININ.Web.Common.ExceptionFactory.createException("Could not find implementationType for " + type.get_name());
            }

            return new implementationType();
        },

        getSingleton : function(type)
        {
            var singleton = _singletonMap.get(type.get_name());
            if(ININ.Web.Common.Utilities.isNullOrUndefined(singleton))
            {
                throw ININ.Web.Common.ExceptionFactory.createException("Could not find singleton for " + type.get_name());
            }

            return singleton;
        },

        remove : function(type)
        {
            var typeName = type.get_name();
            if(_typeMap.containsKey(typeName))
            {
                _typeMap.remove(typeName);
            }
        },

        removeSingleton : function(type)
        {
            var typeName = type.get_name();
            if(_singletonMap.containsKey(typeName))
            {
                _singletonMap.remove(typeName);
            }
        }
    };
}();

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Common.Resources");

// Resources class
ININ.Web.Common.Resources.LocalizedStrings = (function()
{
    // private members
    var _resourceMap = {};
    
    var _setSinglePair = function(resourceId, localizedText)
    {
        ININ.Web.Common.ParameterValidation.validate(arguments, [ {"required": true, "type": String, "allowEmpty": false}, {"required": true, "type": String, "allowEmpty": false} ]);

        var key = _formatResourceMapKey(resourceId);
        if (_resourceMap[key])
        {
            throw ININ.Web.Common.ExceptionFactory.createException("'" + resourceId + "' is already registered.");
        }

        _resourceMap[key] = localizedText;
    };

    var _overrideSinglePair = function(resourceId, localizedText)
    {
        ININ.Web.Common.ParameterValidation.validate(arguments, [ {"required": true, "type": String, "allowEmpty": false}, {"required": true, "type": String, "allowEmpty": false} ]);

        var key = _formatResourceMapKey(resourceId);
        if (!_resourceMap[key])
        {
            throw ININ.Web.Common.ExceptionFactory.createException("'" + resourceId + "' not previously registered, so cannot be overridden.");
        }

        _resourceMap[key] = localizedText;
    };

    var _setMap = function(map)
    {
        ININ.Web.Common.ParameterValidation.validate(arguments, [ {"required": true, "type": Object} ]);

        for (var key in map)
        {
            if (map.hasOwnProperty(key))
            {
                _setSinglePair(key, map[key]);
            }
        }
    };

    var _formatResourceMapKey = function(text)
    {
        return text.toLowerCase();
    };
    
    return {
        // public methods
        set : function()
        {
            if(arguments.length == 1)
            {
                _setMap(arguments[0]);
            }
            else if(arguments.length == 2)
            {
                _setSinglePair(arguments[0], arguments[1]);
            }
            else
            {
                throw ININ.Web.Common.ExceptionFactory.createException("set method expects 1 or 2 arguments");
            }
        },

        // Useful if an application provides default strings, but wants to allow the customer to be
        // able to customize them.  The customer can be directed to create their own resource file,
        // using override(), rather than modifying the default resource file and risking having
        // their customizations overwritten during an SU installation.
        override : function()
        {
            if(arguments.length == 2)
            {
                _overrideSinglePair(arguments[0], arguments[1]);
            }
            else
            {
                throw ININ.Web.Common.ExceptionFactory.createException("override method expects 2 arguments");
            }
        },

        get : function(resourceId)
        {
            ININ.Web.Common.ParameterValidation.validate(arguments, [ {"required": true, "type": String, "allowEmpty": false} ]);

            var key = _formatResourceMapKey(resourceId);
            var localizedText = _resourceMap[key];
            if (localizedText)
            {
                return localizedText;
            }

            throw ININ.Web.Common.ExceptionFactory.createException('Need to localize "' + resourceId + '"');
        }
    };

})();

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Interfaces");

/**
 * ICapability interface 
 * Provides methods: get_relativeUrl(), get_method() 
 */
ININ.Web.Chat.WebServices.Interfaces.ICapability = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICapability', ['get_relativeUrl', 'get_method']);

// ICapability derived interfaces

/**
 * IStartCapability interface, derived from ICapability 
 * Provides additional methods: none
 */
ININ.Web.Chat.WebServices.Interfaces.IStartCapability = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IStartCapability', [], ['ININ.Web.Chat.WebServices.Interfaces.ICapability']);

/**
 * IPollCapability interface, derived from ICapability 
 * Provides additional methods: none
 */
ININ.Web.Chat.WebServices.Interfaces.IPollCapability = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IPollCapability', [], ['ININ.Web.Chat.WebServices.Interfaces.ICapability']);

/**
 * ISendMessageCapability interface, derived from ICapability 
 * Provides additional methods: none
 */
ININ.Web.Chat.WebServices.Interfaces.ISendMessageCapability = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ISendMessageCapability', [], ['ININ.Web.Chat.WebServices.Interfaces.ICapability']);

/**
 * ISetTypingStateCapability interface, derived from ICapability 
 * Provides additional methods: none
 */
ININ.Web.Chat.WebServices.Interfaces.ISetTypingStateCapability = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ISetTypingStateCapability', [], ['ININ.Web.Chat.WebServices.Interfaces.ICapability']);

/**
 * IExitCapability interface, derived from ICapability 
 * Provides additional methods: none
 */
ININ.Web.Chat.WebServices.Interfaces.IExitCapability = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IExitCapability', [], ['ININ.Web.Chat.WebServices.Interfaces.ICapability']);

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Interfaces");

// may need an interface is a CapabilitiesObserver so if any are changed...
/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Interfaces");

/**
 * ICustomizationSingletonFactory interface 
 * Provides methods: get_instance() 
 */
ININ.Web.Chat.WebServices.Interfaces.ICustomizationSingletonFactory = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICustomizationFactory', ['get_instance']);

/**
 * ICustomizationFactory interface 
 * Provides methods: create_instance() 
 */
ININ.Web.Chat.WebServices.Interfaces.ICustomizationFactory = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICustomizationFactory', ['create_instance']);

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Interfaces");

/**
 * IError interface 
 * Provides methods: get_token(), get_errorType(), get_subErrorType(), get_errorCode()
 */
ININ.Web.Chat.WebServices.Interfaces.IError = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IError', ['get_token', 'get_errorType', 'get_subErrorType', 'get_errorCode']);

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Interfaces");

/**
 * INotification interface 
 * Provides methods: none 
 */
ININ.Web.Chat.WebServices.Interfaces.INotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.INotification', []);


/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Interfaces");

/**
 * INotificationProcessor interface 
 * Provides method: process()
 */
ININ.Web.Chat.WebServices.Interfaces.INotificationProcessor = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.INotificationProcessor', ['process']);

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Interfaces");

// INotification derived interfaces

/**
 * IQueueStatusNotification interface, derived from INotification 
 * Provides additional methods: get_agentsAvailable, get_estimatedWaitTime
 */
ININ.Web.Chat.WebServices.Interfaces.IQueueStatusNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IQueueStatusNotification', [ 'get_agentsAvailable, get_estimatedWaitTime' ], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);

/**
 * IQueueStatusFailureNotification interface, derived from INotification 
 * Provides additional methods: get_error
 */
ININ.Web.Chat.WebServices.Interfaces.IQueueStatusFailureNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IQueueStatusFailureNotification', [ 'get_error' ], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Interfaces");

/**
 * IQueueNotificationFactory interface 
 * Provides methods: createQueueStatusNotification(), createQueueStatusFailureNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IQueueNotificationFactory = new ININ.Web.Common.Interface(
                                                                  'ININ.Web.Chat.WebServices.Interfaces.IQueueNotificationFactory',
                                                                  [
                                                                    'createQueueStatusNotification',
                                                                    'createQueueStatusFailureNotification'
                                                                  ]);

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Interfaces");

// Notification Observer interfaces

/**
 * IQueueStatusNotificationObserver interface 
 * Provides methods: processQueueStatusNotification(), processQueueStatusFailureNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IQueueStatusNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IQueueStatusNotificationObserver', ['processQueueStatusNotification', 'processQueueStatusFailureNotification']);

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Interfaces");

/**
 * IResponse interface 
 * Provides methods: get_statusType(), set_statusReason(), isSuccessful() 
 */
ININ.Web.Chat.WebServices.Interfaces.IResponse = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IResponse', ['get_statusType', 'set_statusReason', 'isSuccessful']);

// IResponse derived interfaces

/**
 * IChatResponse interface, derived from IResponse 
 * Provides additional methods: get_pollWaitSuggestion(), set_pollWaitSuggestion(), get_events(), addEvent()
 */
ININ.Web.Chat.WebServices.Interfaces.IChatResponse = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IChatResponse', ['get_pollWaitSuggestion', 'set_pollWaitSuggestion', 'get_events', 'addEvent'], ['ININ.Web.Chat.WebServices.Interfaces.IResponse']);

/**
 * ICallbackResponse interface, derived from IResponse 
 * Provides additional methods: none 
 */
ININ.Web.Chat.WebServices.Interfaces.ICallbackResponse = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICallbackResponse', [], ['ININ.Web.Chat.WebServices.Interfaces.IResponse']);

/**
 * ICallbackCreateResponse interface, derived from ICallbackResponse 
 * Provides additional methods: get_participantId(), set_participantId()
 */
ININ.Web.Chat.WebServices.Interfaces.ICallbackCreateResponse = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICallbackCreateResponse', ['get_participantId', 'set_participantId'], ['ININ.Web.Chat.WebServices.Interfaces.ICallbackResponse']);

/**
 * ICallbackStatusResponse interface, derived from ICallbackResponse 
 * Provides additional methods: get_queueWaitTime(), set_queueWaitTime(), 
 * get_assignedAgentName(), get_assignedAgentParticipantId(), set_assignedAgentName(), set_assignedAgentParticipantId(), 
 * get_interactionState(), set_interactionState(), get_estimatedCallbackTime(), set_estimatedCallbackTime(), 
 * get_queuePosition(), set_queuePosition(), get_queueName(), set_queueName(), 
 * get_longestWaitTime(), set_longestWaitTime(), get_interactionsWaitingCount(), set_interactionsWaitingCount(), 
 * get_loggedInAgentsCount(), set_loggedInAgentsCount(), get_availableAgentsCount(), set_availableAgentsCount() 
 */
ININ.Web.Chat.WebServices.Interfaces.ICallbackStatusResponse = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICallbackStatusResponse', [ 'get_queueWaitTime', 'set_queueWaitTime', 'get_assignedAgentName', 'get_assignedAgentParticipantId', 'set_assignedAgentName', 'set_assignedAgentParticipantId', 'get_interactionState', 'set_interactionState', 'get_estimatedCallbackTime', 'set_estimatedCallbackTime', 'get_queuePosition', 'set_queuePosition', 'get_queueName', 'set_queueName', 'get_longestWaitTime', 'set_longestWaitTime', 'get_interactionsWaitingCount', 'set_interactionsWaitingCount', 'get_loggedInAgentsCount', 'set_loggedInAgentsCount', 'get_availableAgentsCount', 'set_availableAgentsCount' ], ['ININ.Web.Chat.WebServices.Interfaces.ICallbackResponse']);

/**
 * ICallbackReconnectResponse interface, derived from ICallbackResponse 
 * Provides additional method: get_participantId(), set_participantId()
 */
ININ.Web.Chat.WebServices.Interfaces.ICallbackReconnectResponse = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICallbackReconnectResponse', ['get_participantId', 'set_participantId'], ['ININ.Web.Chat.WebServices.Interfaces.ICallbackResponse']);

/**
 * IQueueQueryResponse interface, derived from IResponse 
 * Provides additional methods: get_agentsAvailable(), set_agentsAvailable(), get_estimatedWaitTime(), set_estimatedWaitTime()
 */
ININ.Web.Chat.WebServices.Interfaces.IQueueQueryResponse = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IQueueQueryResponse', ['get_agentsAvailable', 'set_agentsAvailable', 'get_estimatedWaitTime', 'set_estimatedWaitTime'], ['ININ.Web.Chat.WebServices.Interfaces.IResponse']);

/**
 * IRegistrationResponse interface, derived from IResponse 
 * Provides additional methods: none
 */
ININ.Web.Chat.WebServices.Interfaces.IRegistrationResponse = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IRegistrationResponse', [], ['ININ.Web.Chat.WebServices.Interfaces.IResponse']);

/**
 * IServerConfigurationResponse interface, derived from IResponse 
 * Provides additional methods: get_commonCapabilities(), addCommonCapability(), set_commonCapabilities(), get_chatCapabilities(), addChatCapability(), set_chatCapabilities(), get_callbackCapabilities(), addCallbackCapability(), set_callbackCapabilities()
 */
ININ.Web.Chat.WebServices.Interfaces.IServerConfigurationResponse = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IServerConfigurationResponse', ['get_commonCapabilities', 'addCommonCapability', 'set_commonCapabilities', 'get_chatCapabilities', 'addChatCapability', 'set_chatCapabilities', 'get_callbackCapabilities', 'addCallbackCapability', 'set_callbackCapabilities'], ['ININ.Web.Chat.WebServices.Interfaces.IResponse']);

/**
 * IPartyInfoResponse interface, derived from IResponse 
 * Provides additional methods: get_name(), set_name(), get_photo(), set_photo() 
 */
ININ.Web.Chat.WebServices.Interfaces.IPartyInfoResponse = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IPartyInfoResponse', ['get_name', 'set_name', 'get_photo', 'set_photo'], ['ININ.Web.Chat.WebServices.Interfaces.IResponse']);

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * NotificationBase class 
 *  
 * Base class of objects which other objects may listen for. 
 * Created by NotificationFactory, upon receipt of Events. 
 */
ININ.Web.Chat.WebServices._Internal.NotificationBase = Class.create(ININ.Web.Common.InterfaceImplementation,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        if(arguments.length != 1)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("NotificationBase constructor called with " + arguments.length + " arguments, but expected 1.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.INotification);
    },
    
	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Common.InterfaceImplementation.prototype.destroy.call(this);
    }
});


/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * A Notification that the status of a queue has been retrieved.
 */
ININ.Web.Chat.WebServices.QueueStatusNotification = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
	/**
     * Constructor 
     *  
     * @param agentsAvailable How many agents are currently available on this queue 
     * @param estimatedWaitTime How long in seconds it is estimated that it will take for an agent to answer an interaction, if it were placed onto the queue now. 
	 */
    initialize : function($super, agentsAvailable, estimatedWaitTime)
    {
        if(arguments.length != 3)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("QueueStatusNotification constructor called with " + arguments.length + " arguments, but expected 3.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IQueueStatusNotification);

        this._agentsAvailable = agentsAvailable;
        this._estimatedWaitTime = estimatedWaitTime;
    },

    /**
     * Returns the number of agents available on this queue
     *  
     * @return The number of agents available on this queue 
     */
    get_agentsAvailable : function()
    {
        return this._agentsAvailable;
    },

    /**
     * Returns the queue's estimated wait time, in seconds.
     *  
     * @param estimatedWaitTime How long in seconds it is estimated that it will take for an agent to answer an interaction, if it were placed onto the queue now. 
     */
    get_estimatedWaitTime : function()
    {
        return this._estimatedWaitTime;
    }
});

/**
 * A Notification that an attempt to retrieve the status of a queue has failed.
 */
ININ.Web.Chat.WebServices.QueueStatusFailureNotification = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
	/**
     * Constructor 
     *  
     * @param error The error that caused the failure 
	 */
    initialize : function($super, error)
    {
        if(arguments.length != 2)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("QueueStatusFailureNotification constructor called with " + arguments.length + " arguments, but expected 2.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IQueueStatusFailureNotification);

        this._error = error;
    },

    /**
     * Returns the error that caused this failure. 
     *  
     * @return The error that caused this failure. 
     */
    get_error : function()
    {
        return this._error;
    }
});

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/**
 * QueueNotificationFactory class 
 *  
 * Creates Notification objects pertaining to queues which other objects may listen for. 
 */
ININ.Web.Chat.WebServices._Internal.QueueNotificationFactory = Class.create(ININ.Web.Common.InterfaceImplementation,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        if(arguments.length != 1)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("QueueNotificationFactory constructor called with " + arguments.length + " arguments, but expected 1.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IQueueNotificationFactory);
    },

    // public methods

    /**
     * Creates a QueueStatusNotification, which contains the number of available agents and estimated wait time. 
     *  
     * @param agentsAvailable How many agents are currently available on this queue 
     * @param estimatedWaitTime How long in seconds it is estimated that it will take for an agent to answer an interaction, if it were placed onto the queue now. 
     * @return QueueStatusNotification 
     */
    createQueueStatusNotification : function(agentsAvailable, estimatedWaitTime)
    {
        return new ININ.Web.Chat.WebServices.QueueStatusNotification(agentsAvailable, estimatedWaitTime);
    },

    /**
     * Creates a QueueStatusFailureNotification, which indicates that an attempt to get a queue's status has failed.
     *  
     * @param error The error that caused the failure 
     * @return QueueStatusFailureNotification 
     */
    createQueueStatusFailureNotification : function(error)
    {
        return new ININ.Web.Chat.WebServices.QueueStatusFailureNotification(error);
    }
});
ININ.Web.Chat.WebServices.QueueNotificationFactory = new ININ.Web.Chat.WebServices._Internal.QueueNotificationFactory();

/*global ININ: true, Error: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * QueueNotificationRegistry class 
 *  
 * Allows interested objects to register as observers to receive the various types of notifications. 
 * Receives notifications and forwards them to the interested observers. 
 */
ININ.Web.Chat.WebServices._Internal._QueueNotificationRegistry = Class.create(ININ.Web.Common.InterfaceImplementation,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        // validate arguments
        var numArgs = 1;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("QueueNotificationRegistry constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.INotificationProcessor);

        // initialize private members
        this._queueStatusNotificationObservers = [];
        this._queueStatusFailureNotificationObservers = [];
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        delete this._queueStatusNotificationObservers;
        delete this._queueStatusFailureNotificationObservers;

        this._queueStatusNotificationObservers = null;
        this._queueStatusFailureNotificationObservers = null;

        ININ.Web.Common.InterfaceImplementation.prototype.destroy.call(this);
    },

    /**
	 * Receives notifications and dispatches them to methods specific to each notification type. 
	 *  
	 * @param notification A notification. 
     */
    process : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("processNotification");
    
        if (ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IQueueStatusNotification))
        {
            this.processQueueStatusNotification(notification);
        }
        else if (ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IQueueStatusFailureNotification))
        {
            this.processQueueStatusFailureNotification(notification);
        }
        else
        {
            throw ININ.Web.Common.ExceptionFactory.createException("notification does not implement any known notification interfaces");
        }
        
        ININ.Web.Common.Debug.traceMethodExited("processNotification");
    },

	/**
	 * The object passed to this method will receive notifications of type: QueueStatusNotification. 
	 * 
	 * @param queueStatusNotificationObserver An object that implements IQueueStatusNotificationObserver.
	 */
    registerQueueStatusNotificationObserver : function(queueStatusNotificationObserver)
    {
        if(!queueStatusNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("queueStatusNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(queueStatusNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IQueueStatusNotificationObserver);

        this._queueStatusNotificationObservers.push(queueStatusNotificationObserver);
    },
    
	/**
	 * Dispatches a QueueStatusNotification to registered observers.
	 * 
	 * @param queueStatusNotification An object that implements IQueueStatusNotification.
	 */
    processQueueStatusNotification : function(queueStatusNotification)
    {
        if(!queueStatusNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("queueStatusNotification is null");
        }

        for(var i = 0; i < this._queueStatusNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._queueStatusNotificationObservers[i];
                observer.processQueueStatusNotification(queueStatusNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in QueueNotificationRegistry:\n" + e);
                throw e;
            }
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: QueueStatusFailureNotification. 
	 * 
	 * @param queueStatusFailureNotificationObserver An object that implements IQueueStatusFailureNotificationObserver.
	 */
    registerQueueStatusFailureNotificationObserver : function(queueStatusFailureNotificationObserver)
    {
        if(!queueStatusFailureNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("queueStatusFailureNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(queueStatusFailureNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IQueueStatusFailureNotificationObserver);

        this._queueStatusFailureNotificationObservers.push(queueStatusFailureNotificationObserver);
    },
    
	/**
	 * Dispatches a QueueStatusFailureNotification to registered observers.
	 * 
	 * @param queueStatusFailureNotification An object that implements IQueueStatusFailureNotification.
	 */
    processQueueStatusFailureNotification : function(queueStatusFailureNotification)
    {
        if(!queueStatusFailureNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("queueStatusFailureNotification is null");
        }

        for(var i = 0; i < this._queueStatusFailureNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._queueStatusFailureNotificationObservers[i];
                observer.processQueueStatusFailureNotification(queueStatusFailureNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in QueueFailureNotificationRegistry:\n" + e);
                throw e;
            }
        }
    }
});

/*global ININ: true, Class: true, debug: true, navigator: true, window: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Utilities");

/**
 * Utilities class 
 * Provides miscellaneous functionality. 
 */

/**
 * Creates a GUID
 *  
 * @return A GUID 
 */
ININ.Web.Chat.WebServices.Utilities.generateGuid = function()
{
    return (ININ.Web.Chat.WebServices.Utilities._generateGuidToken() + 
            ININ.Web.Chat.WebServices.Utilities._generateGuidToken() +
            "-" +
            ININ.Web.Chat.WebServices.Utilities._generateGuidToken() +
            "-" +
            ININ.Web.Chat.WebServices.Utilities._generateGuidToken() +
            "-" +
            ININ.Web.Chat.WebServices.Utilities._generateGuidToken() +
            ININ.Web.Chat.WebServices.Utilities._generateGuidToken() +
            ININ.Web.Chat.WebServices.Utilities._generateGuidToken());
};

// private method
ININ.Web.Chat.WebServices.Utilities._generateGuidToken = function()
{
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

// Helper for parseOutBaseUrl(), which is currently not used.
// Given "http://www.somewhere.com/someDir/someSubDir/someFile.ext" and "http", will return "http://www.somewhere.com"
ININ.Web.Chat.WebServices.Utilities.parseOutBaseUrlByProtocol = function(url, protocol)
{
    var prefix;
    if(protocol == "file")
    {
        prefix = protocol + ":///";
    }
    else
    {
        prefix = protocol + "://";
    }

    if(url.length > prefix.length)
    {
        if(url.substr(0, prefix.length) == prefix)
        {
            var tokens = url.split("/");
            for(var i = 1; i < tokens.length; ++i)
            {
                if(tokens[i])
                {
                    return prefix + tokens[i];
                }
            }
        }
    }
    
    return null;
};

// Currently not used.
// Given "http://www.somewhere.com/someDir/someSubDir/someFile.ext", will return "http://www.somewhere.com"
// Likewise for https and file URLs.  Case-sensitive, though.
ININ.Web.Chat.WebServices.Utilities.parseOutBaseUrl = function(url)
{
    var baseUrl = ININ.Web.Chat.WebServices.Utilities.parseOutBaseUrlByProtocol(url, "http");
    if(baseUrl)
    {
        return baseUrl;
    }

    var baseUrl = ININ.Web.Chat.WebServices.Utilities.parseOutBaseUrlByProtocol(url, "https");
    if(baseUrl)
    {
        return baseUrl;
    }

    var baseUrl = ININ.Web.Chat.WebServices.Utilities.parseOutBaseUrlByProtocol(url, "file");
    if(baseUrl)
    {
        return baseUrl;
    }

    return url;
};

/**
 * Builds a full URL from the various parts. 
 *  
 * @param protocol "http", "https", "file", etc.
 * @param domain The hostname, such as "www.mycompany.com". 
 * @param port The port on which the server process is running.  Usually 80 for http and 443 for https. 
 * @param uriFragment See lengthy definition in the documentation for the Servers class.
 * @param relativeUrl The part of the URL that comes after the URI fragment.  In this application, it is likely to be one of the constants defined in the CapabilityUrls class. 
 * @return The full URL formed by these parts. 
 */
ININ.Web.Chat.WebServices.Utilities.buildUrlWithProtocolDomainPortUrlFragmentAndRelativeUrl = function(protocol, domain, port, uriFragment, relativeUrl)
{
    return ININ.Web.Chat.WebServices.Utilities.buildUrlWithProtocolDomainPortAndRelativeUrl(protocol, domain, port, ININ.Web.Chat.WebServices.Utilities.combineUriTokens(uriFragment, relativeUrl));
};

/**
 * Builds a full URL from the various parts. 
 *  
 * @param protocol "http", "https", "file", etc.
 * @param domain The hostname, such as "www.mycompany.com".
 * @param port The port on which the server process is running.  Usually 80 for http and 443 for https. 
 * @param relativeUrl The part of the URL that comes after the hostname, such as "someDir/someSubDir/someFile.ext".
 * @return The full URL formed by these parts. 
 */
ININ.Web.Chat.WebServices.Utilities.buildUrlWithProtocolDomainPortAndRelativeUrl = function(protocol, domain, port, relativeUrl)
{
    return ININ.Web.Chat.WebServices.Utilities.combineUriTokens(protocol + "://" + domain + ":" + port, relativeUrl);
};

/**
 * Combines two parts of a URI.  For instance, when passed "http://www.mycompany.com" and "/someDir/someSubDir/someFile.ext", it will 
 * return "http://www.mycompany.com/someDir/someSubDir/someFile.ext".  Or when passed "someDir" and "someSubDir", it 
 * will return "someDir/someSubDir". 
 * 
 * @param uri1 Part of a URI
 * @param uri2 Part of a URI 
 * @return A concatenation of the two parameters, with a "/" inserted between them if necessary. 
 */
ININ.Web.Chat.WebServices.Utilities.combineUriTokens = function(uri1, uri2)
{
	// Either string could be empty.  If so, just return the other one.
	if (!uri1 || 0 === uri1.length)
	{
		return uri2;
	}
	if (!uri2 || 0 === uri2.length)
	{
		return uri1;
	}

    var url = uri1;

	// Insert a slash if neither uri1 nor uri2 contains one
    if((uri2.substring(0, 1) != "/") && (url[url.length - 1] != "/"))
    {
        url += "/";
    }

	// uri1 could end with a slash and/or uri2 could begin with a slash.  Browser probably
	// won't care about a doubled slash, but avoid the possibility anyway.
	if((uri2.substring(0, 1) == "/") && (url[url.length - 1] == "/"))
	{
        url = url.substring(0, url.length - 1);
	}
    url += uri2;
    return url;
};

/**
 * Given a URL, returns the name of the file specified. 
 * For instance, when passed "http://www.mycompany.com/someDir/someSubDir/someFile.ext", it will return "someFile.ext". 
 * When passed "http://www.mycompany.com/someDir/someSubDir/", it will return null. 
 * 
 * @param url A URL 
 * @return The file specified by the URL, with the protocol, domain, and path removed. 
 */
ININ.Web.Chat.WebServices.Utilities.getFileNameFromUrl = function(url)
{
    var tokens = url.split("/");
    if(tokens && (tokens.length > 0))
    {
        return tokens[tokens.length - 1];
    }
    
    return null;
};

/**
 * Indicates whether elevated browser privileges are needed to send an AJAX request. 
 *  
 * @return boolean indicating whether elevated privileges are needed to send an AJAX request. 
 */
ININ.Web.Chat.WebServices.Utilities.needsElevatedPrivileges = function()
{
    return ININ.Web.Chat.WebServices.Utilities.isFireFoxVersionOrHigher(3.5) &&
           (location.protocol == "file:");
};

/**
 * Returns true if the web browser is FireFox, and the version number is higher than the value passed. 
 * Note that only the major and minor version numbers are used here.  Passing a value with two decimal points, such as "3.6.13" 
 * is not supported.
 * 
 * @param requiredVersion An integer or floating point number, such as 3 or 3.6
 * @return false if the web browser is not FireFox.  If the web browser is FireFox, false if the version is less than the value passed, and true if the version is equal to or greater than the version passed. 
 */
ININ.Web.Chat.WebServices.Utilities.isFireFoxVersionOrHigher = function (requiredVersion)
{
    // test for Firefox/x.x or Firefox x.x (ignoring remaining digits)
    if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
    {
        // capture x.x portion and store as a number
        var version = RegExp.$1;
        version = parseFloat(version);
        return (version >= requiredVersion);
    }

    return false;
};

/**
 * Makes a copy of an array
 * 
 * @param array An array 
 * @return A different array, containing the same elements. 
 */
ININ.Web.Chat.WebServices.Utilities.copyArray = function(array)
{
    var newArray = [];
    for(var i = 0; i < array.length; ++i)
    {
        newArray.push(array[i]);
    }
    return newArray;
};

/**
 * Takes an array, and returns an array containing the same items but in a random order.
 * 
 * @param array An array 
 * @return The same array, but with its items reordered randomly. 
 */
ININ.Web.Chat.WebServices.Utilities.randomizeArray = function(array)
{
    var i = array.length;
    if(i > 0)
    {
        while (--i)
        {
            var j = Math.floor(Math.random() * (i + 1));
            var tempi = array[i];
            var tempj = array[j];
            array[i] = tempj;
            array[j] = tempi;
        }
    }
    return array;
};

/**
 * Takes an array, and returns an ININ.Web.Chat.WebServices.Queue containing the same items. 
 * The first item in the array will be the first one pushed into the Queue.  So, 
 * buildQueueFromArray([1, 2, 3]).pop() will return 3. 
 * 
 * @param array An array 
 * @return A Queue containing the same items as the array. 
 */
ININ.Web.Chat.WebServices.Utilities.buildQueueFromArray = function(array)
{
    var queue = new ININ.Web.Chat.WebServices.Queue();
    for(var i = 0; i < array.length; ++i)
    {
        queue.push(array[i]);
    }
    return queue;
};

/**
 * Returns true if the passed array contains the passed item.
 * 
 * @param array An array
 * @param element Something that may or may not be in the array 
 * @return True if array contains element.  False if array does not contain element.  False if array is null. 
 */
ININ.Web.Chat.WebServices.Utilities.doesArrayHaveElement = function(array, element)
{
    if(!array)
    {
        return false;
    }

    for(var i = 0; i < array.length; ++i)
    {
        if(array[i] == element)
        {
            return true;
        }
    }

    return false;
};

/**
 * Takes a URL and a name/value pair.  Returns the same URL, but with the name/value pair added to the end as a 
 * query string.  Works whether or not other name/value pairs are already at the end of the URL. 
 * Example: appendQueryStringParameterToUrl("http://www.mycompany.com/someDir/someFile", "firstThree", "abc") 
 * will return "http://www.mycompany.com/someDir/someFile?firstThree=abc". 
 * Example: appendQueryStringParameterToUrl("http://www.mycompany.com/someDir/someFile?firstThree=abc", "lastThree", "xyz") 
 * will return "http://www.mycompany.com/someDir/someFile?firstThree=abc&lastThree=xyz". 
 *  
 * @param url A URL
 * @param name The name portion of a name/value pair
 * @param value The value portion of a name/value pair
 */
ININ.Web.Chat.WebServices.Utilities.appendQueryStringParameterToUrl = function(url, name, value)
{
    // copy the whole url except for the ending # char if it's there
    var newUrl = ININ.Web.Chat.WebServices.Utilities.removeEndingPoundCharacter(url);

    // if this is the first query string parameter, need to add the ? char
    // else this is just another query string parameter, need to add the & char
    if(url.indexOf("?") == -1)
    {
        newUrl += "?";
    }
    else
    {
        newUrl += "&";
    }

    // finally add the query string name and value
    newUrl += name + "=" + value;

    return newUrl;
};

/**
 * Takes a URL (or any string).  If it does not end with a '#' character, returns the same string.  If it 
 * does end with a pound character, the return value will be the string with the '#' character removed. 
 * 
 * @param url A URL (or any string) 
 * @return The URL, but with the ending '#' character removed.  If the passed URL did not end with '#', then the passed URL will be returned as-is. 
 */
ININ.Web.Chat.WebServices.Utilities.removeEndingPoundCharacter = function(url)
{
    if(url[url.length - 1] == "#")
    {
        return url.substr(0, url.length - 1);
    }

    return url;
};

/**
 * Escapes HTML, by doing the following: 
 * Converts ampersands to &amp; 
 * Converts less-than signs to &lt; 
 * Converts greater-than signs to &gt; 
 * 
 * @param str The string which may contain HTML.
 * @return The same string, but with the HTML escaped. 
 */
ININ.Web.Chat.WebServices.Utilities.escapeHTML = function(str)
{
    str = str.replace(/&/g, "&amp;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/>/g, "&gt;");
    return str;
};

/**
 * Returns a random integer in the supplied range.
 * 
 * @param min The minimum number to return
 * @param max The maximum number to return
 */
ININ.Web.Chat.WebServices.Utilities.randomInRange = function(min, max)
{
    // Check to see if caller specified the params in the wrong order
    if (max < min)
    {
        return ININ.Web.Chat.WebServices.Utilities.randomInRange(max, min);
    }

    return min + Math.round(Math.random() * (max-min));
};

/**
 * Returns true if the browser is Microsoft Internet Explorer.  Returns false otherwise. 
 *  
 * @return Boolean 
 */
ININ.Web.Chat.WebServices.Utilities.isBrowserIE = function()
{
    return (navigator.appName == 'Microsoft Internet Explorer');
};


// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");


/**
 * Class to implement a basic Queue.
 */
ININ.Web.Chat.WebServices.Queue = Class.create({
    
	/**
	 * Constructor
	 */
    initialize : function()
    {
        this._nextIndex = 0;
        this._map = new ININ.Web.Common.Map();
    },
   
	/**
	 * Destructor
	 */
    destroy : function()
    {
        this._map.destroy();
    },

	/**
	 * Push something onto the queue
	 * 
	 * @param value This will be pushed onto the queue
	 */
    push : function(value)
    {
        this._map.put(this._nextIndex++, value);
    },

	/**
	 * Pop something off of the queue
	 * 
	 * @param key Ignored
	 */
    pop : function(key)
    {
        if(this._map.isEmpty())
        {
            return null;
        }

        var key = this._map.firstKey();
        var value = this._map.firstObject();
        this._map.remove(key);
        return value;
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");


/**
 * Class to implement a basic Collection.
 */
ININ.Web.Chat.WebServices.Collection = Class.create({
	/**
	 * Constructor
	 * 
	 * @param array Optional.  If supplied, the items in the array will be added to the newly-constructed Collection.
	 */
    initialize : function(array)
    {
        ININ.Web.Common.ParameterValidation.validate([array], [ {"type": Array, "required": false, "allowEmpty": true} ]);

        this._nextIndex = 0;
        this._map = new ININ.Web.Common.Map();

        if(array)
        {
            for(var i = 0; i < array.length; ++i)
            {
                this.add(array[i]);
            }
        }
    },
   
	/**
	 * Destructor
	 */
    destroy : function()
    {
        this._map.destroy();
    },

	/**
	 * Adds an item to the Collection
	 * 
	 * @param item The item to add to the Collection
	 */
    add : function(item)
    {
        this._map.put(item, 1);
    },

	/**
	 * Removes an item from the Collection
	 * 
	 * @param item The item to remove from the Collection
	 */
    remove : function(item)
    {
        if(this._map.isEmpty())
        {
            return null;
        }

        if(this._map.containsKey(item))
        {
            this._map.remove(item);
        }
        else
        {
            throw ININ.Web.Common.ExceptionFactory.createException(item);
        }
    },

	/**
	 * Returns the size of the Collection
	 *  
	 * @return The number of items in the collection 
	 */
    size : function()
    {
        return this._map.size();
    }
});

/*global ININ: true, Class: true, window: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * A class to implement mutual exclusion.
 * Based on <a href="http://en.wikipedia.org/wiki/Lamport%27s_bakery_algorithm">Lamport's bakery algorithm</a>
 */
ININ.Web.Chat.WebServices.Mutex = Class.create({
    s_waitInterval: 50,

    m_map: new ININ.Web.Common.Map(),

	/**
	 * Constructor
	 * 
	 * @param whatToDo A callback to a function that acts as the critical section, i.e. will be executed with mutual exclusion
	 */
    initialize: function(whatToDo/*, callbackToCallWhenItsDone*/) {
        ININ.Web.Common.Debug.traceNote("In ININ.Web.Chat.WebServices.Mutex.initialize()");
        this.execute = whatToDo;
        /*this.onCompleted = callbackToCallWhenItsDone;*/
        this.id = ++(ININ.Web.Chat.WebServices.Mutex.s_maxIDSoFar);
        ININ.Web.Common.Debug.traceNote("Created new Mutex, assigned id: " + this.id);

        // Get <code>number</code>. Instead of global arrays for <code>entering</code> and <code>number</code> as
        // described in the algorithm, use member variables.  The various "threads"' values for <code>number</code>
        // don't need to be consecutive integers...they just need to be pretty close to unique, and able to be ordered.
        this.entering = 1;
        this.number = new Date().getTime();
        ININ.Web.Common.Debug.traceNote("Thread #" + this.id + " picked a number: " + this.number);
        this.entering = 0;

        this.m_map.put(this.id, this);
        this._waitOnLowerThreadsThenDoCriticalSection(this.m_map.firstKey());
    },

	// private methods

    /** 
     * In the algorithm, there are places where we wait for other "threads" to do something.
     * Busy-waiting is a bad idea in Javascript, and the language has no sleep() or yield().
     * So, this is implemented in the form of a continuation.
     */
    _waitOnLowerThreadsThenDoCriticalSection: function(nextID) {
        ININ.Web.Common.Debug.traceNote("Thread #" + this.id + " entering waitOnLowerThreadsThenDoCriticalSection(" + nextID + ")");
        for (var j = nextID; j !== null; j = this.m_map.nextKey(j)) {
            ININ.Web.Common.Debug.traceNote("Thread #" + this.id + " in for loop, j=" + j);
            var jthThread = this.m_map.get(j);
            if ((jthThread.entering) || ((jthThread.number !== 0) &&
                                         ((jthThread.number < this.number) ||
                                          ((jthThread.number == this.number) && (jthThread.id < this.id))))) {
                ININ.Web.Common.Debug.traceNote("Thread #" + this.id + " going to wait for " + j + "'th thread to do its thing");
                // jthThread is doing its critical section.  Wait until it's done.
                // Since this is Javascript, that means using setTimeout to call a
                // continuation of the current state.

                // Can't do <code>setTimeout("waitOnLowerThreadsThenDoCriticalSection(" + j + ")", this.s_waitInterval)</code>.
                // This is because setTimeout() doesn't work well with object methods. But, we can create a
                // locally-scoped variable, which the passed function will still be able to see.
                var _self = this;
                window.setTimeout(function() { return _self.waitOnLowerThreadsThenDoCriticalSection(j); }, this.s_waitInterval);
                return; // Don't allow the critical section code below to run right now.
            }
        }

        ININ.Web.Common.Debug.traceNote("Thread #" + this.id + " gained exclusivity");
        // do critical section
        var returnValue = this.execute();

        // clean up, and release the lock
        this.m_map.remove(this.id);
        this.number = 0;

        ININ.Web.Common.Debug.traceNote("Thread #" + this.id + " finished critical section, return value was: " + returnValue);

        /*
        // if caller wants to be informed of the return value, do that
        if (this.onCompleted) {
            this.onCompleted(returnValue);
        }
        */
    }
});

/**
 * The highest ID given out so far to any ININ.Web.Chat.WebServices.MutexCriticalSection.
 */
ININ.Web.Chat.WebServices.Mutex.s_maxIDSoFar = -1;

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Servers.Current");

/**
 * Servers class 
 *  
 * Keeps track of webservers and URLs used.
 *  
 * The term "URI Fragment" is used frequently here.  Most customers do not want their IC servers to be visible to the public.  They will 
 * keep them behind a firewall.  So in order for the Javascript client to send requests to an IC server (specifically the 
 * WebProcessorBridge.exe process), the Javascript is served from a webserver outside the firewall, and firewall rules are configured 
 * to allow that webserver to act as a reverse proxy by sending requests from clients to WebProcessorBridge. 
 * "URI fragment" refers to the portion of a URL which the webserver has been configured to recognize to indicate that the request 
 * should be reverse proxied. 
 * Example: 
 * The IC server is running on ic.mycompany.com.  WebProcessorBridge is listening on port 8114 of this machine. 
 * The webserver is www.mycompany.com.  The reverse proxy is configured such that requests of the form 
 * http://www.mycompany.com/I3Root/Server1/* will be reverse proxied to http://ic.mycompany.com:8114/* 
 * For instance, if the client requests http://www.mycompany.com/I3Root/Server1/websvcs/serverConfiguration, the webserver will 
 * then request http://ic.mycompany.com:8114/websvcs/serverConfiguration from the IC server, wait for the IC server's response, and 
 * then send the IC server's response to the client. 
 * In this example, "I3Root/Server1" is termed the "URI fragment". 
 */

/** Whether the communcation between the browser and the webserver should use HTTPS.  If false, HTTP will be used. */
ININ.Web.Chat.WebServices.Servers.UseHttps = false;

/** The domain (i.e. hostname) of the webserver that served this Javascript. */
ININ.Web.Chat.WebServices.Servers.Domain = document.domain;

/** The port of the webserver that served this Javascript. If a nonstandard one like 8888 is used, use that. Otherwise use 80 for HTTP or 443 for HTTPS. */
ININ.Web.Chat.WebServices.Servers.Port = document.location.port ? document.location.port : ( document.location.protocol == "http:" ? 80 : 443 );

/** The string that was the URI fragment (see above for definition) at the start of this session. */
ININ.Web.Chat.WebServices.Servers.OriginalUriFragment = "";

/** The URI fragment that is currently in use.  May change if a switchover occurs. */
ININ.Web.Chat.WebServices.Servers.CurrentUriFragment = "";

/** 
 * The set of possible URI fragments that may be used. Should match the URI fragments that are configured on the webserver 
 * to trigger reverse proxying to IC servers.
 */
ININ.Web.Chat.WebServices.Servers.UriFragments = [];

/**
 * Builds the full URL at which to access some Capability 
 *  
 * @param uriFragment A URI fragment.  See above for definition of the term.
 * @param relativeUrl The portion of the URI that identifies the Capability being accessed.  Comes after the URI fragment described above.  See definition in the Capability class.
 */
ININ.Web.Chat.WebServices.Servers.buildUrl = function(uriFragment, relativeUrl)
{
    var protocol;
    if(ININ.Web.Chat.WebServices.Servers.UseHttps)
    {
        protocol = "https";
    }
    else
    {
        protocol = "http";
    }

    return ININ.Web.Chat.WebServices.Utilities.buildUrlWithProtocolDomainPortUrlFragmentAndRelativeUrl(protocol, ININ.Web.Chat.WebServices.Servers.Domain, ININ.Web.Chat.WebServices.Servers.Port, uriFragment, relativeUrl);
};

/**
 * Returns how many IC servers the client knows about.
 * For now, this will always either return 1 or 2.
 */
ININ.Web.Chat.WebServices.Servers.get_numberOfServers = function()
{
    return ININ.Web.Chat.WebServices.Servers.UriFragments.length;
}

/**
 * Returns a boolean indicating whether or not a switchover pair has been configured. 
 *  
 * @return true if this server knows about 2 different URI fragments.  False otherwise. 
 */
ININ.Web.Chat.WebServices.Servers.isConfiguredForSwitchover = function()
{
    return (2 == ININ.Web.Chat.WebServices.Servers.get_numberOfServers());
};

/**
 * Switches which URI fragment will be used for requests to the IC server
 */
ININ.Web.Chat.WebServices.Servers.switchCurrentServer = function()
{
    if(ININ.Web.Chat.WebServices.Servers.isConfiguredForSwitchover())
    {
        if(ININ.Web.Chat.WebServices.Servers.CurrentUriFragment == ININ.Web.Chat.WebServices.Servers.UriFragments[0])
        {
            ININ.Web.Chat.WebServices.Servers.CurrentUriFragment = ININ.Web.Chat.WebServices.Servers.UriFragments[1];
        }
        else
        {
            ININ.Web.Chat.WebServices.Servers.CurrentUriFragment = ININ.Web.Chat.WebServices.Servers.UriFragments[0];
        }
    }    
};

/**
 * Indicates whether a switchover has occurred.
 *  
 * @return true if switchover has occurred (i.e. URI fragment currently in use is not the one that was in use at the start of the session), false otherwise. 
 */
ININ.Web.Chat.WebServices.Servers.isCurrentServerTheOriginalServer = function()
{
    return (ININ.Web.Chat.WebServices.Servers.CurrentUriFragment == ININ.Web.Chat.WebServices.Servers.OriginalUriFragment);
};


/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.HttpMethods");

/**
 * Constant to represent the HTTP "GET" method
 */
ININ.Web.Chat.WebServices.HttpMethods.GET = "GET";

/**
 * Constant to represent the HTTP "POST" method
 */
ININ.Web.Chat.WebServices.HttpMethods.POST = "POST";

/**
 * Constant to represent the HTTP "HEAD" method
 */
ININ.Web.Chat.WebServices.HttpMethods.HEAD = "HEAD";

/**
 * Constant to represent the HTTP "DELETE" method
 */
ININ.Web.Chat.WebServices.HttpMethods.DELETE = "DELETE";

/*global ININ: true, Class: true */

// Register namespace
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.CapabilityUrls.Common");

// Constants for the Common Capability URLs

/** 
 * Constant for the server configuration URL. 
 * The complete URL is: http://(server)/(uriFragment)/(this_constant)
 */ 
ININ.Web.Chat.WebServices.CapabilityUrls.Common.SERVERCONFIGURATION = "websvcs/serverConfiguration";

/** 
 * Constant for the tracker registration URL. 
 * The complete URL is: http://(server)/(uriFragment)/(this_constant)
 */ 
ININ.Web.Chat.WebServices.CapabilityUrls.Common.TRACKERREGISTRATION = "websvcs/register";

/** 
 * Constant for the URL to get info (name and picture) about an agent
 * The complete URL is: http://(server)/(uriFragment)/(this_constant)
 */ 
ININ.Web.Chat.WebServices.CapabilityUrls.Common.PARTYINFO = "websvcs/partyInfo";

// Register namespace
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.CapabilityUrls.QueueQuery");

// Constant for the Queue Query Capability URL

/** 
 * Constant for the queue query URL. 
 * The complete URL is: http://(server)/(uriFragment)/(this_constant)
 */ 
ININ.Web.Chat.WebServices.CapabilityUrls.QueueQuery.QUERY = "websvcs/queue/query";

// Register namespace
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.CapabilityUrls.Chat");

// Constants for the Chat Capability URLs

/** 
 * Constant for the URL to start a chat. 
 * The complete URL is: http://(server)/(uriFragment)/(this_constant)
 */ 
ININ.Web.Chat.WebServices.CapabilityUrls.Chat.START = "websvcs/chat/start";

/** 
 * Constant for the URL to reconnect to a chat. 
 * The complete URL is: http://(server)/(uriFragment)/(this_constant)
 */ 
ININ.Web.Chat.WebServices.CapabilityUrls.Chat.RECONNECT = "websvcs/chat/reconnect";

/** 
 * Constant for the URL to poll a chat for new messages. 
 * The complete URL is: http://(server)/(uriFragment)/(this_constant)
 */ 
ININ.Web.Chat.WebServices.CapabilityUrls.Chat.POLL = "websvcs/chat/poll";

/** 
 * Constant for the URL to send a message within a chat. 
 * The complete URL is: http://(server)/(uriFragment)/(this_constant)
 */ 
ININ.Web.Chat.WebServices.CapabilityUrls.Chat.SENDMESSAGE = "websvcs/chat/sendMessage";

/** 
 * Constant for the URL to send a typing indicator within a chat. 
 * The complete URL is: http://(server)/(uriFragment)/(this_constant)
 */ 
ININ.Web.Chat.WebServices.CapabilityUrls.Chat.SETTYPINGSTATE = "websvcs/chat/setTypingState";

/** 
 * Constant for the URL to exit a chat. 
 * The complete URL is: http://(server)/(uriFragment)/(this_constant)
 */ 
ININ.Web.Chat.WebServices.CapabilityUrls.Chat.EXIT = "websvcs/chat/exit";

/** 
 * Constant for the URL to retrieve a file within a chat. 
 * The complete URL is: http://(server)/(uriFragment)/(this_constant)
 */ 
ININ.Web.Chat.WebServices.CapabilityUrls.Chat.GETFILE = "websvcs/chat/getFile";

/** 
 * Constant for the URL to send a report of the chat's problem to WebProcessorBridge
 * The complete URL is: http://(server)/(uriFragment)/(this_constant)
 */ 
ININ.Web.Chat.WebServices.CapabilityUrls.Common.PROBLEMREPORT = "websvcs/problemReport";

// Register namespace
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.CapabilityUrls.Callback");

// Constants for the Callback Capability URLs

/** 
 * Constant for the URL to create a callback.
 * The complete URL is: http://(server)/(uriFragment)/(this_constant)
 */ 
ININ.Web.Chat.WebServices.CapabilityUrls.Callback.CREATE = "websvcs/callback/create";

/** 
 * Constant for the URL to query the status of a callback.
 * The complete URL is: http://(server)/(uriFragment)/(this_constant)
 */ 
ININ.Web.Chat.WebServices.CapabilityUrls.Callback.STATUS = "websvcs/callback/status";

/** 
 * Constant for the URL to reconnect to a callback.  In other words, bring a 
 * previously-created callback into the current web session so it can be modified, 
 * queried, or disconnected. 
 * The complete URL is: http://(server)/(uriFragment)/(this_constant)
 */ 
ININ.Web.Chat.WebServices.CapabilityUrls.Callback.RECONNECT = "websvcs/callback/reconnect";

/** 
 * Constant for the URL to disconnect a callback (in other words, remove the interaction from the queue, 
 * so the visitor will not get called back).
 * The complete URL is: http://(server)/(uriFragment)/(this_constant)
 */ 
ININ.Web.Chat.WebServices.CapabilityUrls.Callback.DISCONNECT = "websvcs/callback/disconnect";

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/**
 * Capability class 
 *  
 * A Capability represents a piece of functionality that the client and server both know how to do. 
 * For instance, sending a message within a chat, or creating a callback. 
 * The client queries the server for its capabilities, and then knows to only utilize the capabilities which both client and server share. 
 * Each capability can be reached by sending an HTTP GET, POST, HEAD, or DELETE request to a certain URL of the format
 * http://(server)/(uriFragment)/(relative URL indicating the type of capability) 
 * For instance, http://www.company.com/I3Root/Server1/websvcs/callback/create 
 * This class maintains a pairing of the relative URL (defined in CapabilityUrls) and the HTTP method. 
 */
ININ.Web.Chat.WebServices.Capability = Class.create(ININ.Web.Common.InterfaceImplementation,
{
	/**
	 * Constructor
	 * 
	 * @param relativeUrl The relative URL that is used to invoke this capability
	 * @param method Whether the URL should be requested via an HTTP GET, POST, HEAD, or DELETE request
	 */
    initialize : function($super, relativeUrl, method)
    {
        var numArgs = 3;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Capability constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICapability);

        this._validateUrl(relativeUrl);
        this._relativeUrl = relativeUrl;
        this._validateMethod(method);
        this._method = method;
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        this._relativeUrl = null;
        this._method = null;
        
        ININ.Web.Common.InterfaceImplementation.prototype.destroy.call(this);
    },

    // public methods

	/**
	 * Getter for the relative URL property 
	 * @return A string.  In the default implementation, this will always be one of the constants defined in CapabilityUrls. 
	 */
    get_relativeUrl : function()
    {
        return this._relativeUrl;
    },

	/**
	 * Getter for the method property
	 * 
	 * @return A constant (from ININ.Web.Chat.WebServices.HttpMethods) indicating whether an HTTP GET, POST, HEAD, or DELETE shall be used to request the relative URL. 
	 */
    get_method : function()
    {
        return this._method;
    },
    
    toString : function()
    {
        return "&lt;Capability: " + this._method + ", " + this._relativeUrl + "&gt;";
    },

    // private methods

    _validateUrl : function(url)
    {
        if((url != ININ.Web.Chat.WebServices.CapabilityUrls.Common.SERVERCONFIGURATION) &&
           (url != ININ.Web.Chat.WebServices.CapabilityUrls.Common.TRACKERREGISTRATION) &&
           (url != ININ.Web.Chat.WebServices.CapabilityUrls.Common.PROBLEMREPORT) &&
           (url != ININ.Web.Chat.WebServices.CapabilityUrls.Common.PARTYINFO) &&
           (url != ININ.Web.Chat.WebServices.CapabilityUrls.QueueQuery.QUERY) &&
           (url != ININ.Web.Chat.WebServices.CapabilityUrls.Chat.START) &&
           (url != ININ.Web.Chat.WebServices.CapabilityUrls.Chat.RECONNECT) &&
           (url != ININ.Web.Chat.WebServices.CapabilityUrls.Chat.POLL) &&
           (url != ININ.Web.Chat.WebServices.CapabilityUrls.Chat.SENDMESSAGE) &&
           (url != ININ.Web.Chat.WebServices.CapabilityUrls.Chat.SETTYPINGSTATE) &&
           (url != ININ.Web.Chat.WebServices.CapabilityUrls.Chat.EXIT) &&
           (url != ININ.Web.Chat.WebServices.CapabilityUrls.Chat.GETFILE) &&
           (url != ININ.Web.Chat.WebServices.CapabilityUrls.Callback.CREATE) &&
           (url != ININ.Web.Chat.WebServices.CapabilityUrls.Callback.STATUS) &&
           (url != ININ.Web.Chat.WebServices.CapabilityUrls.Callback.RECONNECT) &&
           (url != ININ.Web.Chat.WebServices.CapabilityUrls.Callback.DISCONNECT))
        {
            throw ININ.Web.Common.ExceptionFactory.createException(url + " is not a capability url");
        }
    },

    _validateMethod : function(method)
    {
        if((method != ININ.Web.Chat.WebServices.HttpMethods.GET) &&
           (method != ININ.Web.Chat.WebServices.HttpMethods.POST) &&
           (method != ININ.Web.Chat.WebServices.HttpMethods.HEAD) &&
           (method != ININ.Web.Chat.WebServices.HttpMethods.DELETE))
        {
            throw ININ.Web.Common.ExceptionFactory.createException(method + " is not a valid method");
        }
    }
});

/*global ININ: true, Class: true, debug: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal._CapabilityRepository");

ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.CapabilityRepository");

/** 
 * CapabilityRepository class 
 *  
 * Keeps track of which Capabilities are enabled or disabled, and provides getter methods for the various Capabilities. 
 */
ININ.Web.Chat.WebServices._Internal._CapabilityRepository = Class.create(ININ.Web.Common.InterfaceImplementation,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        var numArgs = 1;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("CapabilityRepository constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

        $super();

        // initialization
        this._chatTrackerAuthenticationCapability = false;
        this._chatStsAuthenticationCapability = false;
        this._chatAnonymousAuthenticationCapability = false;
        this._callbackTrackerAuthenticationCapability = false;
        this._callbackStsAuthenticationCapability = false;
        this._callbackAnonymousAuthenticationCapability = false;
        this._queueQueryTrackerAuthenticationCapability = null;
        this._queueQueryStsAuthenticationCapability = null;
        this._queueQueryAnonymousAuthenticationCapability = null;
        
        this._serverConfigurationCapability = null;
        this._trackerRegistrationCapability = null;
        this._partyInfoCapability = null;
        this._startChatCapability = null;
        this._reconnectChatCapability = null;
        this._pollCapability = null;
        this._sendMessageCapability = null;
        this._setTypingStateCapability = null;
        this._exitCapability = null;
        this._problemReportCapability = null;
        this._createCallbackCapability = null;
        this._callbackStatusCapability = null;
        this._reconnectCallbackCapability = null;
        this._disconnectCallbackCapability = null;
        
        // hardcode the Server Configuration Capability
        this._serverConfigurationCapability = new ININ.Web.Chat.WebServices.Capability(ININ.Web.Chat.WebServices.CapabilityUrls.Common.SERVERCONFIGURATION,
                                                                             ININ.Web.Chat.WebServices.HttpMethods.GET);
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        if(this._serverConfigurationCapability)
        {
            this._serverConfigurationCapability.destroy();
            delete this._serverConfigurationCapability;
            this._serverConfigurationCapability = null;
        }

        if(this._startChatCapability)
        {
            this._startChatCapability.destroy();
            delete this._startChatCapability;
            this._startChatCapability = null;
        }

        if(this._reconnectChatCapability)
        {
            this._reconnectChatCapability.destroy();
            delete this._reconnectChatCapability;
            this._reconnectChatCapability = null;
        }

        if(this._pollCapability)
        {
            this._pollCapability.destroy();
            delete this._pollCapability;
            this._pollCapability = null;
        }

        if(this._sendMessageCapability)
        {
            this._sendMessageCapability.destroy();
            delete this._sendMessageCapability;
            this._sendMessageCapability = null;
        }

        if(this._setTypingStateCapability)
        {
            this._setTypingStateCapability.destroy();
            delete this._setTypingStateCapability;
            this._setTypingStateCapability = null;
        }

        if(this._exitCapability)
        {
            this._exitCapability.destroy();
            delete this._exitCapability;
            this._exitCapability = null;
        }

        if(this._problemReportCapability)
        {
            this._problemReportCapability.destroy();
            delete this._problemReportCapability;
            this._problemReportCapability = null;
        }

        if(this._createCallbackCapability)
        {
            this._createCallbackCapability.destroy();
            delete this._createCallbackCapability;
            this._createCallbackCapability = null;
        }

        if(this._callbackStatusCapability)
        {
            this._callbackStatusCapability.destroy();
            delete this._callbackStatusCapability;
            this._callbackStatusCapability = null;
        }

        if(this._reconnectCallbackCapability)
        {
            this._reconnectCallbackCapability.destroy();
            delete this._reconnectCallbackCapability;
            this._reconnectCallbackCapability = null;
        }

        if(this._disconnectCallbackCapability)
        {
            this._disconnectCallbackCapability.destroy();
            delete this._disconnectCallbackCapability;
            this._disconnectCallbackCapability = null;
        }

        if(this._queueQueryTrackerAuthenticationCapability)
        {
            this._queueQueryTrackerAuthenticationCapability.destroy();
            delete this._queueQueryTrackerAuthenticationCapability;
            this._queueQueryTrackerAuthenticationCapability = null;
        }

        if(this._queueQueryStsAuthenticationCapability)
        {
            this._queueQueryStsAuthenticationCapability.destroy();
            delete this._queueQueryStsAuthenticationCapability;
            this._queueQueryStsAuthenticationCapability = null;
        }

        if(this._queueQueryAnonymousAuthenticationCapability)
        {
            this._queueQueryAnonymousAuthenticationCapability.destroy();
            delete this._queueQueryAnonymousAuthenticationCapability;
            this._queueQueryAnonymousAuthenticationCapability = null;
        }

        if(this._trackerRegistrationCapability)
        {
            this._trackerRegistrationCapability.destroy();
            delete this._trackerRegistrationCapability;
            this._trackerRegistrationCapability = null;
        }

        if(this._partyInfoCapability)
        {
            this._partyInfoCapability.destroy();
            delete this._partyInfoCapability;
            this._partyInfoCapability = null;
        }

        this._chatTrackerAuthenticationCapability = null;
        this._chatStsAuthenticationCapability = null;
        this._chatAnonymousAuthenticationCapability = null;
        this._callbackTrackerAuthenticationCapability = null;
        this._callbackStsAuthenticationCapability = null;
        this._callbackAnonymousAuthenticationCapability = null;

        ININ.Web.Common.InterfaceImplementation.prototype.destroy.call(this);
    },

    // public methods
	
	/**
	 * Getter for the Capability for querying the server's capabilities. 
	 * Always available, so there are no enableServerConfigurationCapability() or disableServerConfigurationCapability() methods.
	 *  
	 * @return Capability, or null
	 */
    get_serverConfigurationCapability : function()
    {
        return this._serverConfigurationCapability;
    },

	/**
	 * Returns true or false, depending on whether the Capability to start a Chat is enabled. 
	 *  
	 * @return True if Chats can be started, false otherwise. 
	 */
    isStartChatCapabilityEnabled : function()
    {
       return (this._startChatCapability !== null);
    },

	/**
	 * Getter for the Capability for starting a chat
	 *  
	 * @return Capability, or null
	 */
    get_startChatCapability : function()
    {
        return this._startChatCapability;
    },

	/**
	 * Enables the Capability to start a chat
	 */
    enableStartChatCapability : function()
    {
        if(!this._startChatCapability)
        {
            this._startChatCapability = new ININ.Web.Chat.WebServices.Capability(ININ.Web.Chat.WebServices.CapabilityUrls.Chat.START,
                                                                             ININ.Web.Chat.WebServices.HttpMethods.POST);
        }
    },

	/**
	 * Disables the Capability to start a chat
	 */
    disableStartChatCapability : function()
    {
        this._startChatCapability = null;
    },

	/**
	 * Getter for the Capability for reconnecting to a chat
	 *  
	 * @return Capability, or null
	 */
    get_reconnectChatCapability : function()
    {
        return this._reconnectChatCapability;
    },

	/**
	 * Enables the Capability to reconnect to a chat
	 */
    enableReconnectChatCapability : function()
    {
        if(!this._reconnectChatCapability)
        {
            this._reconnectChatCapability = new ININ.Web.Chat.WebServices.Capability(ININ.Web.Chat.WebServices.CapabilityUrls.Chat.RECONNECT,
                                                                                 ININ.Web.Chat.WebServices.HttpMethods.POST);
        }
    },

	/**
	 * Disables the Capability to reconnect to a chat
	 */
    disableReconnectChatCapability : function()
    {
        this._reconnectChatCapability = null;
    },

	/**
	 * Getter for the Capability for polling a chat (i.e. checking for new messages or events)
	 *  
	 * @return Capability, or null
	 */
    get_pollCapability : function()
    {
        return this._pollCapability;
    },

	/**
	 * Enables the Capability to poll a chat
	 */
    enablePollCapability : function()
    {
        if(!this._pollCapability)
        {
            this._pollCapability = new ININ.Web.Chat.WebServices.Capability(ININ.Web.Chat.WebServices.CapabilityUrls.Chat.POLL,
                                                                            ININ.Web.Chat.WebServices.HttpMethods.GET);
        }
    },

	/**
	 * Disables the Capability to poll a chat
	 */
    disablePollCapability : function()
    {
        this._pollCapability = null;
    },

	/**
	 * Getter for the Capability for sending a message within a chat
	 *  
	 * @return Capability, or null
	 */
    get_sendMessageCapability : function()
    {
        return this._sendMessageCapability;
    },

	/**
	 * Enables the Capability to send a message within a chat
	 */
    enableSendMessageCapability : function()
    {
        if(!this._sendMessageCapability)
        {
            this._sendMessageCapability = new ININ.Web.Chat.WebServices.Capability(ININ.Web.Chat.WebServices.CapabilityUrls.Chat.SENDMESSAGE,
                                                                                   ININ.Web.Chat.WebServices.HttpMethods.POST);
        }
    },

	/**
	 * Disables the Capability to send a message within a chat
	 */
    disableSendMessageCapability : function()
    {
        this._sendMessageCapability = null;
    },

	/**
	 * Getter for the Capability for setting a typing indicator within a chat
	 *  
	 * @return Capability, or null
	 */
    get_setTypingStateCapability : function()
    {
        return this._setTypingStateCapability;
    },

	/**
	 * Enables the Capability to set a typing indicator within a chat
	 */
    enableSetTypingStateCapability : function()
    {
        if(!this._setTypingStateCapability)
        {
            this._setTypingStateCapability = new ININ.Web.Chat.WebServices.Capability(ININ.Web.Chat.WebServices.CapabilityUrls.Chat.SETTYPINGSTATE,
                                                                                      ININ.Web.Chat.WebServices.HttpMethods.POST);
        }
    },

	/**
	 * Disables the Capability to set a typing indicator within a chat
	 */
    disableSetTypingStateCapability : function()
    {
        this._setTypingStateCapability = null;
    },

	/**
	 * Getter for the Capability for exiting a chat
	 *  
	 * @return Capability, or null
	 */
    get_exitCapability : function()
    {
        return this._exitCapability;
    },

	/**
	 * Enables the Capability to exit a chat
	 */
    enableExitCapability : function()
    {
        if(!this._exitCapability)
        {
            this._exitCapability = new ININ.Web.Chat.WebServices.Capability(ININ.Web.Chat.WebServices.CapabilityUrls.Chat.EXIT,
                                                                            ININ.Web.Chat.WebServices.HttpMethods.POST);
        }
    },

	/**
	 * Disables the Capability to exit a chat
	 */
    disableExitCapability : function()
    {
        this._exitCapability = null;
    },

	/**
	 * Returns true or false, depending on whether the Capability to send a problem report is enabled. 
	 *  
	 * @return True if problem reports can be sent, false otherwise. 
	 */
    isProblemReportCapabilityEnabled : function()
    {
       return (this._problemReportCapability !== null);
    },

    /** 
     * Gets the capability for sending a problem report to the IC server 
     */ 
    get_problemReportCapability : function()
    {
        return this._problemReportCapability;
    },

    /** 
     * Enables the capability of sending a problem report to the IC server
     */ 
    enableProblemReportCapability : function()
    {
        if(!this._problemReportCapability)
        {
            this._problemReportCapability = new ININ.Web.Chat.WebServices.Capability(ININ.Web.Chat.WebServices.CapabilityUrls.Common.PROBLEMREPORT,
                                                                                    ININ.Web.Chat.WebServices.HttpMethods.POST);
        }
    },

	/**
	 * Disables the Capability of sending a problem report to the IC server
	 */
    disableProblemReportCapability : function()
    {
        this._problemReportCapability = null;
    },
    
	/**
	 * Returns true or false, depending on whether the Capability to create a Callback is enabled. 
	 *  
	 * @return True if Callbacks can be created, false otherwise. 
	 */
    isCreateCallbackCapabilityEnabled : function()
    {
       return (this._createCallbackCapability !== null);
    },

	/**
	 * Getter for the Capability for creating a Callback
	 *  
	 * @return Capability, or null
	 */
    get_createCallbackCapability : function()
    {
        return this._createCallbackCapability;
    },

	/**
	 * Enables the Capability to create a Callback
	 */
    enableCreateCallbackCapability : function()
    {
        if(!this._createCallbackCapability)
        {
            this._createCallbackCapability = new ININ.Web.Chat.WebServices.Capability(ININ.Web.Chat.WebServices.CapabilityUrls.Callback.CREATE,
                                                                            ININ.Web.Chat.WebServices.HttpMethods.POST);
        }
    },

	/**
	 * Disables the Capability to create a Callback
	 */
    disableCreateCallbackCapability : function()
    {
        this._createCallbackCapability = null;
    },

	/**
	 * Returns true or false, depending on whether the Capability to query the status of a Callback is enabled. 
	 *  
	 * @return True if Callbacks' status can be queried, false otherwise. 
	 */
    isCallbackStatusCapabilityEnabled : function()
    {
       return (this._callbackStatusCapability !== null);
    },

	/**
	 * Getter for the Capability for querying the status of a Callback
	 *  
	 * @return Capability, or null
	 */
    get_callbackStatusCapability : function()
    {
        return this._callbackStatusCapability;
    },

	/**
	 * Enables the Capability to query the status of a Callback
	 */
    enableCallbackStatusCapability : function()
    {
        if(!this._callbackStatusCapability)
        {
            this._callbackStatusCapability = new ININ.Web.Chat.WebServices.Capability(ININ.Web.Chat.WebServices.CapabilityUrls.Callback.STATUS,
                                                                            ININ.Web.Chat.WebServices.HttpMethods.GET);
        }
    },

	/**
	 * Disables the Capability to query the status of a Callback
	 */
    disableCallbackStatusCapability : function()
    {
        this._callbackStatusCapability = null;
    },

	/**
     * Returns true or false, depending on whether the Capability to reconnect a Callback is enabled. 
     * Reconnecting means to bring a previously-created Callback into the current web session, 
     * so that operations may be performed upon it. 
	 *  
	 * @return True if Callbacks can be reconnected, false otherwise. 
	 */
    isReconnectCallbackCapabilityEnabled : function()
    {
       return (this._reconnectCallbackCapability !== null);
    },

	/**
	 * Getter for the Capability for reconnecting a Callback
	 *  
	 * @return Capability, or null
	 */
    get_reconnectCallbackCapability : function()
    {
        return this._reconnectCallbackCapability;
    },

	/**
	 * Enables the Capability to reconnect a Callback
	 */
    enableReconnectCallbackCapability : function()
    {
        if(!this._reconnectCallbackCapability)
        {
            this._reconnectCallbackCapability = new ININ.Web.Chat.WebServices.Capability(ININ.Web.Chat.WebServices.CapabilityUrls.Callback.RECONNECT,
                                                                            ININ.Web.Chat.WebServices.HttpMethods.POST);
        }
    },

	/**
	 * Disables the Capability to reconnect a Callback
	 */
    disableReconnectCallbackCapability : function()
    {
        this._reconnectCallbackCapability = null;
    },

	/**
	 * Returns true or false, depending on whether the Capability to disconnect a Callback is enabled. 
	 *  
	 * @return True if Callbacks can be disconnected, false otherwise. 
	 */
    isDisconnectCallbackCapabilityEnabled : function()
    {
       return (this._disconnectCallbackCapability !== null);
    },

	/**
	 * Getter for the Capability for disconnecting a Callback
	 *  
	 * @return Capability, or null
	 */
    get_disconnectCallbackCapability : function()
    {
        return this._disconnectCallbackCapability;
    },

	/**
	 * Enables the Capability to disconnect a Callback
	 */
    enableDisconnectCallbackCapability : function()
    {
        if(!this._disconnectCallbackCapability)
        {
            this._disconnectCallbackCapability = new ININ.Web.Chat.WebServices.Capability(ININ.Web.Chat.WebServices.CapabilityUrls.Callback.DISCONNECT,
                                                                            ININ.Web.Chat.WebServices.HttpMethods.POST);
        }
    },

	/**
	 * Disables the Capability to disconnect a Callback
	 */
    disableDisconnectCallbackCapability : function()
    {
        this._disconnectCallbackCapability = null;
    },

	/**
	 * Returns true or false, depending on whether the Capability to query a queue anonymously is enabled. 
	 *  
	 * @return True if querying a queue anonymously is possible, false otherwise. 
	 */
    isQueueQueryAnonymousAuthenticationCapabilityEnabled : function()
    {
       return (this._queueQueryAnonymousAuthenticationCapability !== null);
    },

	/**
	 * Getter for the Capability for querying a queue anonymously
	 *
	 * @return Capability, or null
	 */
    get_queueQueryAnonymousAuthenticationCapability : function()
    {
        return this._queueQueryAnonymousAuthenticationCapability;
    },

	/**
	 * Enables the Capability to query a queue anonymously
	 */
    enableQueueQueryAnonymousAuthenticationCapability : function()
    {
        if(!this._queueQueryAnonymousAuthenticationCapability)
        {
            this._queueQueryAnonymousAuthenticationCapability = new ININ.Web.Chat.WebServices.Capability(ININ.Web.Chat.WebServices.CapabilityUrls.QueueQuery.QUERY,
                                                                                                         ININ.Web.Chat.WebServices.HttpMethods.POST);
        }
    },

	/**
	 * Disables the Capability to query a queue anonymously
	 */
    disableQueueQueryAnonymousAuthenticationCapability : function()
    {
        this._queueQueryAnonymousAuthenticationCapability = null;
    },

	/**
	 * Returns true or false, depending on whether the Capability to query a queue with Tracker is enabled. 
	 *  
	 * @return True if querying a queue with Tracker is possible, false otherwise. 
	 */
    isQueueQueryTrackerAuthenticationCapabilityEnabled : function()
    {
       return (this._queueQueryTrackerAuthenticationCapability !== null);
    },

	/**
	 * Getter for the Capability for querying a queue via Tracker
	 *
	 * @return Capability, or null
	 */
    get_queueQueryTrackerAuthenticationCapability : function()
    {
        return this._queueQueryTrackerAuthenticationCapability;
    },

	/**
	 * Enables the Capability to query a queue via Tracker
	 */
    enableQueueQueryTrackerAuthenticationCapability : function()
    {
        if(!this._queueQueryTrackerAuthenticationCapability)
        {
            this._queueQueryTrackerAuthenticationCapability = new ININ.Web.Chat.WebServices.Capability(ININ.Web.Chat.WebServices.CapabilityUrls.QueueQuery.QUERY,
                                                                                                       ININ.Web.Chat.WebServices.HttpMethods.POST);
        }
    },

	/**
	 * Disables the Capability to query a queue via Tracker
	 */
    disableQueueQueryTrackerAuthenticationCapability : function()
    {
        this._queueQueryTrackerAuthenticationCapability = null;
    },

	/**
	 * Returns true or false, depending on whether the Capability to query a queue with STS is enabled. 
	 *  
	 * @return True if querying a queue with STS is possible, false otherwise. 
	 */
    isQueueQueryStsAuthenticationCapabilityEnabled : function()
    {
       return (this._queueQueryStsAuthenticationCapability !== null);
    },

	/**
	 * Getter for the Capability for querying a queue via STS
	 *
	 * @return Capability, or null
	 */
    get_queueQueryStsAuthenticationCapability : function()
    {
        return this._queueQueryStsAuthenticationCapability;
    },

	/**
	 * Enables the Capability to query a queue via STS
	 */
    enableQueueQueryStsAuthenticationCapability : function()
    {
        if(!this._queueQueryStsAuthenticationCapability)
        {
            this._queueQueryStsAuthenticationCapability = new ININ.Web.Chat.WebServices.Capability(ININ.Web.Chat.WebServices.CapabilityUrls.QueueQuery.QUERY,
                                                                                                   ININ.Web.Chat.WebServices.HttpMethods.POST);
        }
    },

	/**
	 * Disables the Capability to query a queue via STS
	 */
    disableQueueQueryStsAuthenticationCapability : function()
    {
        this._queueQueryStsAuthenticationCapability = null;
    },

	/**
     * Returns true or false, depending on whether the Capability to query party info (name, photo) is enabled.
	 *  
	 * @return True if querying party info is possible, false otherwise. 
	 */
    isPartyInfoCapabilityEnabled : function()
    {
       return (this._partyInfoCapability !== null);
    },

	/**
     * Getter for the Capability for querying party info
	 *
	 * @return Capability, or null
	 */
    get_partyInfoCapability : function()
    {
        return this._partyInfoCapability;
    },

	/**
     * Enables the Capability to query party info
	 */
    enablePartyInfoCapability : function()
    {
        if(!this._partyInfoCapability)
        {
            this._partyInfoCapability = new ININ.Web.Chat.WebServices.Capability(ININ.Web.Chat.WebServices.CapabilityUrls.Common.PARTYINFO,
                                                                                 ININ.Web.Chat.WebServices.HttpMethods.POST);
        }
    },

	/**
     * Disables the Capability to query party info
	 */
    disablePartyInfoCapability : function()
    {
        this._partyInfoCapability = null;
    },

	/**
	 * Returns true or false, depending on whether the Capability to register with Tracker is enabled. 
	 *  
	 * @return True if Tracker registration is possible, false otherwise. 
	 */
    isTrackerRegistrationCapabilityEnabled : function()
    {
       return (this._trackerRegistrationCapability !== null);
    },

	/**
	 * Getter for the Capability for registering with Tracker
	 *
	 * @return Capability, or null
	 */
    get_trackerRegistrationCapability : function()
    {
        return this._trackerRegistrationCapability;
    },

	/**
	 * Enables the Capability to register with Tracker
	 */
    enableTrackerRegistrationCapability : function()
    {
        if(!this._trackerRegistrationCapability)
        {
            this._trackerRegistrationCapability = new ININ.Web.Chat.WebServices.Capability(ININ.Web.Chat.WebServices.CapabilityUrls.Common.TRACKERREGISTRATION,
                                                                            ININ.Web.Chat.WebServices.HttpMethods.POST);
        }
    },

	/**
	 * Disables the Capability to register with Tracker
	 */
    disableTrackerRegistrationCapability : function()
    {
        this._trackerRegistrationCapability = null;
    },

	/**
	 * Returns true or false, depending on whether the Capability to authenticate a Chat with Tracker is enabled. 
	 *  
	 * @return True if Tracker authentication of Chats is possible, false otherwise. 
	 */
    isChatTrackerAuthenticationCapabilityEnabled : function()
    {
        return this._chatTrackerAuthenticationCapability;
    },

	/**
	 * Enables the Capability to authenticate a Chat with Tracker
	 */
    enableChatTrackerAuthenticationCapability : function()
    {
        this._chatTrackerAuthenticationCapability = true;
    },

	/**
	 * Disables the Capability to authenticate a Chat with Tracker
	 */
    disableChatTrackerAuthenticationCapability : function()
    {
        this._chatTrackerAuthenticationCapability = false;
    },

	/**
	 * Returns true or false, depending on whether the Capability to authenticate a Chat with STS is enabled. 
	 *  
	 * @return True if STS Chat authentication is possible, false otherwise. 
	 */
    isChatStsAuthenticationCapabilityEnabled : function()
    {
        return this._chatStsAuthenticationCapability;
    },

	/**
	 * Enables the Capability to authenticate a Chat with STS
	 */
    enableChatStsAuthenticationCapability : function()
    {
        this._chatStsAuthenticationCapability = true;
    },

	/**
	 * Disables the Capability to authenticate a Chat with STS
	 */
    disableChatStsAuthenticationCapability : function()
    {
        this._chatStsAuthenticationCapability = false;
    },

	/**
	 * Returns true or false, depending on whether the Capability to authenticate a Chat anonymously is enabled. 
	 *  
	 * @return True if anonymous Chat authentication is possible, false otherwise. 
	 */
    isChatAnonymousAuthenticationCapabilityEnabled : function()
    {
        return this._chatAnonymousAuthenticationCapability;
    },

	/**
	 * Enables the Capability to authenticate a Chat anonymously
	 */
    enableChatAnonymousAuthenticationCapability : function()
    {
        this._chatAnonymousAuthenticationCapability = true;
    },

	/**
	 * Disables the Capability to authenticate a Chat anonymously
	 */
    disableChatAnonymousAuthenticationCapability : function()
    {
        this._chatAnonymousAuthenticationCapability = false;
    },

	/**
	 * Returns true or false, depending on whether the Capability to authenticate a Callback with Tracker is enabled. 
	 *  
	 * @return True if Tracker authentication of Callbacks is possible, false otherwise. 
	 */
    isCallbackTrackerAuthenticationCapabilityEnabled : function()
    {
        return this._callbackTrackerAuthenticationCapability;
    },

	/**
	 * Enables the Capability to authenticate a Callback with Tracker
	 */
    enableCallbackTrackerAuthenticationCapability : function()
    {
        this._callbackTrackerAuthenticationCapability = true;
    },

	/**
	 * Disables the Capability to authenticate a Callback with Tracker
	 */
    disableCallbackTrackerAuthenticationCapability : function()
    {
        this._callbackTrackerAuthenticationCapability = false;
    },

	/**
	 * Returns true or false, depending on whether the Capability to authenticate a Callback with STS is enabled. 
	 *  
	 * @return True if STS authentication of Callbacks is possible, false otherwise. 
	 */
    isCallbackStsAuthenticationCapabilityEnabled : function()
    {
        return this._callbackStsAuthenticationCapability;
    },

	/**
	 * Enables the Capability to authenticate a Callback with STS
	 */
    enableCallbackStsAuthenticationCapability : function()
    {
        this._callbackStsAuthenticationCapability = true;
    },

	/**
	 * Disables the Capability to authenticate a Callback with STS
	 */
    disableCallbackStsAuthenticationCapability : function()
    {
        this._callbackStsAuthenticationCapability = false;
    },

	/**
	 * Returns true or false, depending on whether the Capability to authenticate Callbacks anonymously is enabled. 
	 *  
	 * @return True if anonymous authentication of Callbacks is possible, false otherwise. 
	 */
    isCallbackAnonymousAuthenticationCapabilityEnabled : function()
    {
        return this._callbackAnonymousAuthenticationCapability;
    },

	/**
	 * Enables the Capability to authenticate a Callback anonymously
	 */
    enableCallbackAnonymousAuthenticationCapability : function()
    {
        this._callbackAnonymousAuthenticationCapability = true;
    },

	/**
	 * Disables the Capability to authenticate a Callback anonymously
	 */
    disableCallbackAnonymousAuthenticationCapability : function()
    {
        this._callbackAnonymousAuthenticationCapability = false;
    },

	/**
	 * Disables all Capabilities
	 */
    reset : function()
    {
        this.disableStartChatCapability();
        this.disableReconnectChatCapability();
        this.disablePollCapability();
        this.disableSendMessageCapability();
        this.disableSetTypingStateCapability();
        this.disableExitCapability();
        this.disableProblemReportCapability();
        this.disableCreateCallbackCapability();
        this.disableCallbackStatusCapability();
        this.disableReconnectCallbackCapability();
        this.disableDisconnectCallbackCapability();
        this.disableQueueQueryAnonymousAuthenticationCapability();
        this.disableQueueQueryTrackerAuthenticationCapability();
        this.disableQueueQueryStsAuthenticationCapability();
        this.disablePartyInfoCapability();
        this.disableTrackerRegistrationCapability();
        this.disableChatTrackerAuthenticationCapability();
        this.disableChatStsAuthenticationCapability();
        this.disableChatAnonymousAuthenticationCapability();
        this.disableCallbackTrackerAuthenticationCapability();
        this.disableCallbackStsAuthenticationCapability();
        this.disableCallbackAnonymousAuthenticationCapability();
    }
});

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * ServerConfigurationProcessorBase class
 *  
 * When the application is loaded, the client queries the IC server for a list of the server's capabilities.  This class processes 
 * the response to that request.  Capabilities common to both client and server will be stored in the CapabilityRepository.
 */
ININ.Web.Chat.WebServices._Internal._ServerConfigurationProcessorBase = Class.create(ININ.Web.Common.InterfaceImplementation,
{
	/**
	 * Constructor
	 * 
	 * @param capabilityRepository Where to store the capabilities common to client and server.
	 */
    initialize: function($super, capabilityRepository)
    {
        ININ.Web.Common.ParameterValidation.validate([capabilityRepository], [ {"required": true}, {"required": true} ]);

        $super();

        this._capabilityRepository = capabilityRepository;
        this._lastServerConfigurationVersion = null;
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Chat.WebServices.ResponseBase.prototype.destroy.call(this);
    },

    // public methods

	/**
	 * Process the response to a request for the IC server's capabilities. 
	 * 
	 * @param response An instance of ININ.Web.Chat.WebServices.ServerConfigurationResponse 
	 */
    process : function(response)
    {
        ININ.Web.Common.Interface.ensureImplements(response, ININ.Web.Chat.WebServices.Interfaces.IServerConfigurationResponse);

        // reset the capability repository since we're processing a whole new server configuration
        this._capabilityRepository.reset();

        if(response)
        {
            this._lastServerConfigurationVersion = response.get_serverConfigVersion();
            this._enableCommonCapabilities(response.get_commonCapabilities());
            this._enableChatCapabilities(response.get_chatCapabilities());
            this._enableCallbackCapabilities(response.get_callbackCapabilities());
            this._enableQueueQueryCapabilities(response.get_queueQueryCapabilities());

            if (ININ.Web.Chat.WebServices.ProblemReporter)
            {
                ININ.Web.Chat.WebServices.ProblemReporter.set_regEx(response.get_problemReportRegEx());
            }
        }
    },
    
    /**
     * The server configuration response JSON contains a field "cfgVer".  This is 
     * incremented each time certain properties are changed in IA.  This method 
     * returns the most recent value for this field that has been received from 
     * the server. 
     *  
     * @return An integer indicating the most recent configuration version received from the server. 
     */
    get_lastServerConfigurationVersion : function()
    {
        return this._lastServerConfigurationVersion;
    },

	/**
     * Resets the most recently obtained server configuration version number, so that the next 
     * poll will definitely trigger a server configuration request. 
	 */
    resetServerConfigurationVersion : function()
    {
        this._lastServerConfigurationVersion = null;
    },

    // private methods

    _enableCommonCapabilities : function(capabilities)
    {
        if(capabilities.indexOf(ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Common.SUPPORT_REGISTRATION_TRACKER) != -1)
        {
            this._capabilityRepository.enableTrackerRegistrationCapability();
        }
        if(capabilities.indexOf(ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Common.PROBLEM_REPORT) != -1)
        {
            this._capabilityRepository.enableProblemReportCapability();
        }

        if(capabilities.indexOf(ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Common.PARTY_INFO) != -1)
        {
            this._capabilityRepository.enablePartyInfoCapability();
        }
    },
    
    _enableChatCapabilities : function(capabilities)
    {
        if(capabilities.indexOf(ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Chat.SUPPORT_AUTHENTICATION_TRACKER) != -1)
        {
            this._capabilityRepository.enableChatTrackerAuthenticationCapability();
        }

        if(capabilities.indexOf(ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Chat.SUPPORT_AUTHENTICATION_STS) != -1)
        {
            this._capabilityRepository.enableChatStsAuthenticationCapability();
        }

        if(capabilities.indexOf(ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Chat.SUPPORT_AUTHENTICATION_ANONYMOUS) != -1)
        {
            this._capabilityRepository.enableChatAnonymousAuthenticationCapability();
        }

        if(capabilities.indexOf(ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Chat.START) != -1)
        {
            this._capabilityRepository.enableStartChatCapability();
        }

        if(capabilities.indexOf(ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Chat.RECONNECT) != -1)
        {
            this._capabilityRepository.enableReconnectChatCapability();
        }

        if(capabilities.indexOf(ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Chat.POLL) != -1)
        {
            this._capabilityRepository.enablePollCapability();
        }

        if(capabilities.indexOf(ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Chat.SENDMESSAGE) != -1)
        {
            this._capabilityRepository.enableSendMessageCapability();
        }

        if(capabilities.indexOf(ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Chat.SETTYPINGSTATE) != -1)
        {
            this._capabilityRepository.enableSetTypingStateCapability();
        }

        if(capabilities.indexOf(ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Chat.EXIT) != -1)
        {
            this._capabilityRepository.enableExitCapability();
        }
    },
    
    _enableCallbackCapabilities : function(capabilities)
    {
        if(capabilities.indexOf(ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Callback.SUPPORT_AUTHENTICATION_TRACKER) != -1)
        {
            this._capabilityRepository.enableCallbackTrackerAuthenticationCapability();
        }

        if(capabilities.indexOf(ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Callback.SUPPORT_AUTHENTICATION_STS) != -1)
        {
            this._capabilityRepository.enableCallbackStsAuthenticationCapability();
        }

        if(capabilities.indexOf(ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Callback.SUPPORT_AUTHENTICATION_ANONYMOUS) != -1)
        {
            this._capabilityRepository.enableCallbackAnonymousAuthenticationCapability();
        }

        if(capabilities.indexOf(ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Callback.CREATE) != -1)
        {
            this._capabilityRepository.enableCreateCallbackCapability();
        }

        if(capabilities.indexOf(ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Callback.STATUS) != -1)
        {
            this._capabilityRepository.enableCallbackStatusCapability();
        }

        if(capabilities.indexOf(ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Callback.RECONNECT) != -1)
        {
            this._capabilityRepository.enableReconnectCallbackCapability();
        }

        if(capabilities.indexOf(ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Callback.DISCONNECT) != -1)
        {
            this._capabilityRepository.enableDisconnectCallbackCapability();
        }
    },

    _enableQueueQueryCapabilities : function(capabilities)
    {
        if(capabilities.indexOf(ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.QueueQuery.SUPPORT_AUTHENTICATION_TRACKER) != -1)
        {
            this._capabilityRepository.enableQueueQueryTrackerAuthenticationCapability();
        }
        if(capabilities.indexOf(ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.QueueQuery.SUPPORT_AUTHENTICATION_STS) != -1)
        {
            this._capabilityRepository.enableQueueQueryStsAuthenticationCapability();
        }
        if(capabilities.indexOf(ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.QueueQuery.SUPPORT_AUTHENTICATION_ANONYMOUS) != -1)
        {
            this._capabilityRepository.enableQueueQueryAnonymousAuthenticationCapability();
        }
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * An abstract class representing anything that can have listeners listening for success/failure events.
 */
ININ.Web.Chat.WebServices.ListenableBase = Class.create(ININ.Web.Common.InterfaceImplementation,
{
	/** 
	 * Constructor
	 */
    initialize : function($super)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ListenableBase.initialize()");

        $super();

        this._successListeners = [];
        this._failureListeners = [];

        ININ.Web.Common.Debug.traceMethodExited("ListenableBase.initialize()");
    },

	/** 
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Common.InterfaceImplementation.prototype.destroy.call(this);
    },

	/**
	 * Erases the lists of listeners for success and failure events.
	 */
    reset : function()
    {
        this._successListeners = [];
        this._failureListeners = [];
    },

    /** 
     * Register a listener to be called when an operation succeeds.
     */
    registerSuccessListener : function(listener)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ListenableBase.registerSuccessListener()");
        this._successListeners.push(listener);
        ININ.Web.Common.Debug.traceMethodExited("ListenableBase.registerSuccessListener()");
    },

    /** 
     * Register a listener to be called when an operation fails.
     */
    registerFailureListener: function(listener)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ListenableBase.registerFailureListener()");
        this._failureListeners.push(listener);
        ININ.Web.Common.Debug.traceMethodExited("ListenableBase.registerFailureListener()");
    },

	/**
	 * Loop through the listeners that are listening for notification of success, and notify them 
	 * that the operation has succeeded. 
	 * 
	 * @param obj This object will be passed to each listener's callback method.
	 */
    notifyListenersOfSuccess: function(obj)
    {
        this._notifyListeners(this._successListeners, obj);
    },

	/**
	 * Loop through the listeners that are listening for notification of failure, and notify them 
	 * that the operation has failed. 
	 * 
	 * @param obj This object will be passed to each listener's callback method.
	 */
    notifyListenersOfFailure : function(obj)
    {
        this._notifyListeners(this._failureListeners, obj);
    },

    // private methods

    _notifyListeners : function(listenerList, obj)
    {
        var exceptions = new Array();
        for (var i = 0; i < listenerList.length; ++i)
        {
            var listener = listenerList[i];
            try
            {
                listener(obj);
            } catch (e)
            {
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    }
});

/*global ININ: true, Class: true, window: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");


/**
 *  Timer class
 *  Constructor takes integer specifying how many milliseconds to wait before firing.
 *  After construction, caller can register as a listener to the timer.
 */
ININ.Web.Chat.WebServices.Timer = Class.create(ININ.Web.Chat.WebServices.ListenableBase,
{
    /**
	 * Constructor 
	 *  
	 * @param duration How long before the timer should go off, in milliseconds. 
	 */
    initialize : function($super, duration)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Timer.initialize()");

        $super();
        this._duration = duration;
        this._windowTimeoutId = null;

        ININ.Web.Common.Debug.traceMethodExited("Timer.initialize()");
    },

    /**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Chat.WebServices.ListenableBase.prototype.destroy.call(this);

        this._windowTimeoutId = null;
    },

    /**
     *  Function to start the timer, i.e. calling this will cause <code>notifyListenersOfSuccess()</code> to be
     *  called after <code>duration</code> milliseconds
     */
    start : function()
    {
        ININ.Web.Common.Debug.traceVerboseNote("Starting a " + this._duration + "ms timer...");
        var _self = this;
        this._windowTimeoutId = window.setTimeout(function() { _self.onTimer(); }, this._duration);
        ININ.Web.Common.Debug.traceVerboseNote("...timer started.  _windowTimeoutId=" + this._windowTimeoutId);
    },

    /**
     *  Returns true if this timer is running, false otherwise (i.e. if it hasn't been started yet, or was
     *  started and already fired and hasn't been started again since firing).
     */
    isRunning : function()
    {
        return (this._windowTimeoutId !== null);
    },

    /**
     *  "Public" function to cancel the timer.
     *  Just creates a ININ.Web.Chat.WebServices.Mutex to execute <code>_cancelImpl()</code> as an atomic operation relative to any other
     *  methods called in this way.
     *  
     *  It is possible that the timer could go off in the short
     *  amount of time between the caller calling this method, and
     *  the implementation of this method actually canceling the
     *  timer.  If the timer is successfully canceled, it will call
     *  <code>notifyListenersOfFailure()</code>.  If not, the timer
     *  will go off, and call <code>notifyListenersOfSuccess</code>
     *  as normal.
     */
    cancel : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("Timer.cancel()");
        if (null === this._windowTimeoutId)
        {
            ININ.Web.Common.Debug.traceNote("Nothing to do!");
        }
        else
        {
            ININ.Web.Common.Debug.traceNote("Now creating mutex to cancel timer: " + this._windowTimeoutId);

            // Can't do <code>new ININ.Web.Chat.WebServices.Mutex(this._cancelImpl)</code>.
            // Also can't do <code>new ININ.Web.Chat.WebServices.Mutex("this._cancelImpl()")</code>.
            // This is because setTimeout() doesn't work well with object methods. But, we can create a locally-scoped
            // variable, which the passed function will still be able to see.
            var _self = this;
            new ININ.Web.Chat.WebServices.Mutex(function() { return _self._cancelImpl(); });
        }
        ININ.Web.Common.Debug.traceMethodExited("Timer.cancel()");
    },

    /**
     *  "Private" function to cancel the timer.
     */
    _cancelImpl : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("Timer._cancelImpl()");
        ININ.Web.Common.Debug.traceNote("This._windowTimeoutId=" + this._windowTimeoutId);
        if (this.isRunning())
        {
            window.clearTimeout(this._windowTimeoutId);
            ININ.Web.Common.Debug.traceNote("_cancelImpl() canceled timer #" + this._windowTimeoutId + "...notifying listeners of timer's failure to go off");
            this.notifyListenersOfFailure();
            ININ.Web.Common.Debug.traceNote("_cancelImpl() finished notifying listeners of timer #" + this._windowTimeoutId + "'s failure to go off.");
            this._windowTimeoutId = null;
        }
        else
        {
            ININ.Web.Common.Debug.traceNote("_cancelImpl() failed to cancel timer");
        }
        ININ.Web.Common.Debug.traceMethodExited("Timer._cancelImpl()");
    },

    /**
     *  "Public" function to restart a timer.
     * 
     *  If a timer is running, but hasn't fired yet, this method will cause the timer to "start over" with the
     *  originally-specified <code>duration</code>.
     *  
     *  Example:  At 1:00:00, a timer is set with <code>duration</code> = 0:30.  <code>notifyListenersOfSuccess()</code>
     *  will be fired at 1:00:30.
     *  But, if <code>restart()</code> is called at 1:00:20, then <code>notifyListenersOfSuccess()<code> will not get
     *  called until 1:00:50.
     *
     *  Note that if a timer was set and has already fired, and it is desired that the timer start again, this
     *  method is not the appropriate one to call.  In this scenario, simply call <code>start()</code>.
     *  <code>restart</code> is only meant to be called on a currently-running timer, and will have no effect if
     *  called on a timer that is not currently running.
     * 
     *  Implementation-wise, this function just creates a ININ.Web.Chat.WebServices.Mutex to execute <code>_restartImpl()</code> as an atomic
	 *  operation relative to any other methods called in this way.
	 *  
	 * @param duration Optional.  If specified, this will be the new duration of the timer, in milliseconds 
     */
    restart : function(duration)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Timer.restart()");

		if (null != duration)
        {
            this._duration = duration;
		}

        ININ.Web.Common.Debug.traceNote("Now creating mutex to restart timer: " + this._windowTimeoutId);
        // Can't do <code>new ININ.Web.Chat.WebServices.Mutex(this._restartImpl)</code>.
        // Also can't do <code>new ININ.Web.Chat.WebServices.Mutex("this._restartImpl()")</code>.
        // This is because setTimeout() doesn't work well with object methods. But, we can create a locally-scoped
        // variable, which the passed function will still be able to see.
        var _self = this;
        new ININ.Web.Chat.WebServices.Mutex(function() { return _self._restartImpl(); });
        ININ.Web.Common.Debug.traceMethodExited("Timer.restart()");
    },

    /**
     *  "Private" function to restart the timer.
     */
    _restartImpl : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("Timer._restartImpl()");
        var retVal = false;
        if (this.isRunning())
        {
            ININ.Web.Common.Debug.traceNote("_restartImpl indicates that timer is already running, so canceling");
            this._cancelImpl();
            this.start();
            retVal = true;
        }
        ININ.Web.Common.Debug.traceMethodExited("Timer._restartImpl()");
        return retVal;
    },

    /**
     *  Erases the <code>_windowTimeoutId</code>, and calls <code>notifyListenersOfSuccess()</code>.
     */
    onTimer : function()
    {
        ININ.Web.Common.Debug.traceVerboseNote("Timer firing.  ID was: " + this._windowTimeoutId);
        this.notifyListenersOfSuccess();
        this._windowTimeoutId = null;
    },

	/**
	 * Returns the duration of the timer, in milliseconds 
	 *  
	 * @return The duration of the timer, in milliseconds 
	 */
	get_duration : function()
	{
		return this._duration;
	}
});

/*global ININ: true, Class: true, window: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * RecurringTimer class
 *  
 * This class represents a timer which goes off after a certain time period, and every time it 
 * goes off, it re-sets it self to go off again once that time period elapses again.
 */
ININ.Web.Chat.WebServices.RecurringTimer = Class.create(ININ.Web.Chat.WebServices.Timer,
{
	/**
	 * Constructor
	 * 
	 * @param duration How often the timer should go off, in milliseconds.
	 */
    initialize: function($super, duration)
    {
        ININ.Web.Common.Debug.traceMethodEntered("RecurringTimer.initialize()");
        $super(duration);
        
        this._isRunning = false;
        
        ININ.Web.Common.Debug.traceMethodExited("RecurringTimer.initialize()");
    },

    /**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Chat.WebServices.Timer.prototype.destroy.call(this);
    },

    // methods

	/**
	 * Start the timer
	 */
    start : function()
    {
        this._isRunning = true;
        ININ.Web.Chat.WebServices.Timer.prototype.start.call(this);
    },

	/**
	 * Stop the timer
	 */
    stop : function()
    {   
        this.cancel();
        this._isRunning = false;
    },

	/**
	 * This method is called when the timer goes off.  Do not call it directly. 
	 * This method will notify this timer's listeners, and then re-start the timer. 
	 *  
	 * @see ListenableBase.notifyListenersOfSuccess() This method provides the mechanism by which the timer's listeners are notified. 
	 */
    onTimer : function()
    {
        ININ.Web.Chat.WebServices.Timer.prototype.onTimer.call(this);
        
        if(this._isRunning)
        {
            ININ.Web.Common.Debug.traceVerboseNote("Restarting the timer");
            this.start();
        }
    }
});

/*global ININ: true, Class: true, Ajax: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/**
 * AJAX request functionality class 
 * Wrapper for Prototype's Ajax.Request functionality. 
 */
ININ.Web.Chat.WebServices.AjaxRequest = Class.create(
{
	/**
	 * Constructor
	 * 
	 * @param url  The URL that is being requested
	 * @param options Defined at http://www.prototypejs.org/api/ajax/options
	 */
    initialize : function(url, options)
    {
        this._url = url;
        this._options = options;
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        this._url = null;
        this._options = null;
    },

    // methods

	/**
	 * Sends the AjaxRequest
	 */
    send : function()
    {
        ININ.Web.Common.Debug.traceAlways("REQUEST: " + this._url);
        ININ.Web.Common.Debug.traceNote("Asynchronous: " + this._options.asynchronous);

        this._options.onCreate = this.onCreateAjaxRequest.bind(this);
        this._options.onComplete = this.onCompleteAjaxRequest.bind(this);

        new Ajax.Request(this._url, this._options);
    },

    /** 
     * This method is called any time an AJAX request is created. 
     * It sets a timer, which is cleared by onCompleteAjaxRequest().  Thus, if the timer 
     * ever goes off, that means that the AJAX request timed out. 
     *  
     * @param ajaxRequest An AJAX request
	 */
    onCreateAjaxRequest : function(ajaxRequest)
    {
        ININ.Web.Common.Debug.traceMethodEntered("AjaxRequest.onCreateAjaxRequest()");
        this._ajaxRequest = ajaxRequest;
        var retryCounts = ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.RetryCounts);
        var duration = retryCounts.get_ajaxTimeoutMilliseconds();
        var d = new Date();
        this._ajaxRequest.request.options.ININ_Timeout_ID = window.setTimeout(this.onAjaxRequestTimeout.bind(this), duration);
        ININ.Web.Common.Debug.traceNote("Set timeout #" + this._ajaxRequest.request.options.ININ_Timeout_ID + " for " + duration + "ms at: " + d.toTimeString());
        ININ.Web.Common.Debug.traceMethodExited("AjaxRequest.onCreateAjaxRequest()");
    },

    /**
     * AJAX does not have a built-in mechanism for limiting the time to wait on a request.
     * So, this method implements that. 
     *  
     * @param ajaxRequest An AJAX request.  Passed automatically by AJAX, but is ignored because it isn't always passed in IE.  this._ajaxRequest is used instead.
     */
    onAjaxRequestTimeout : function(ajaxRequest)
    {
        ININ.Web.Common.Debug.traceMethodEntered("AjaxRequest anonymous timeout function");
        var d = new Date();
        ININ.Web.Common.Debug.traceWarning("AJAX request with timeout #" + this._ajaxRequest.request.options.ININ_Timeout_ID + " timed out at " + d.toTimeString() + "!");
        if (1 == this._ajaxRequest.transport.readyState || 2 == this._ajaxRequest.transport.readyState || 3 == this._ajaxRequest.transport.readyState)
        {
            this._ajaxRequest.transport.onreadystatechange = Prototype.emptyFunction;
            this._ajaxRequest.transport.abort();
            Ajax.activeRequestCount--;
            this._ajaxRequest.request.options.onFailure(this._ajaxRequest);
            ININ.Web.Chat.WebServices.ProblemReporter.recordTimedOutRequest(this._ajaxRequest);
        }
        ININ.Web.Common.Debug.traceMethodExited("AjaxRequest anonymous timeout function");
    },

    /** 
     * This method is called when an AJAX request completes. 
     * It clears the timer that was set by onCreateAjaxRequest(). 
     *  
     * @param ajaxRequest An AJAX request.  Passed automatically by AJAX, but is ignored.
	 */
    onCompleteAjaxRequest : function(ajaxRequest)
    {
        ININ.Web.Common.Debug.traceMethodEntered("AjaxRequest.onCompleteAjaxRequest()");
        window.clearTimeout(this._ajaxRequest.request.options.ININ_Timeout_ID);
        ININ.Web.Common.Debug.traceNote("Cleared timeout: " + this._ajaxRequest.request.options.ININ_Timeout_ID);
        ININ.Web.Common.Debug.traceMethodExited("AjaxRequest.onCompleteAjaxRequest()");
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * Base class which handles AJAX connection.
 * Don't use this directly, use a derived class instead.
 */
ININ.Web.Chat.WebServices.AjaxManagerBase = Class.create(ININ.Web.Chat.WebServices.ListenableBase,
{
    // constants
    CONTENT_TYPE_HEADER: 'content-type',

	/**
	 * Constructor
	 * 
	 * @param capability  A Capability object representing what this AjaxManager is intended to do (i.e. poll, send message, etc.)
	 * @param serverUriFragment The URI fragment that reverse proxies to the IC server.
	 */
    initialize: function($super, capability, serverUriFragment)
    {
        ININ.Web.Common.Debug.traceMethodEntered("AjaxManagerBase.initialize()");
        if(!capability)
        {
            ININ.Web.Common.Debug.traceError("null capability");
            ININ.Web.Common.Debug.breakpoint();
        } else
        {
            ININ.Web.Common.Debug.traceNote("Capability=" + capability.toString());
        }

        $super();
        
        ININ.Web.Common.Interface.ensureImplements(capability, ININ.Web.Chat.WebServices.Interfaces.ICapability);
        this._capability = capability;
        
        if(serverUriFragment)
        {
            this._serverUriFragment = serverUriFragment;
        }
        else
        {
            this._serverUriFragment = ININ.Web.Chat.WebServices.Servers.CurrentUriFragment;
        }

        /** How many times the current AJAX request has been retried */
        this.retriesSoFar = 0;
        ININ.Web.Common.Debug.traceMethodExited("AjaxManagerBase.initialize()");
    },

    // public methods

    /** 
     * Send the AJAX request (to the url specified in the capability passed to the initialize(), using the HTTP method
     * also specified in the capability).  If HTTP method is POST, the arg to this is used to supply what data
	 * should be POSTed.  Otherwise, the arg is ignored. 
	 *  
	 * @param dataToPost If it is a POST request, this is the data that shall be POSTed.  Otherwise, ignored.
     * @param participantIdToAppend If non-null, (a slash and) the participantID will be appended onto the end of the URL.  A participantID identifies a participant within the context of a particular interaction.  If the web user (the person whose browser is running this code) has several interactions, he/she will have the same number of participantIds.  This should be one of the participantIds representing the web user - it should NOT be a participantId representing an agent.
	 * @param useAsynchronous If true, the request will be sent asynchronously.  If false OR NULL, it will be sent synchronously.
     */
    sendRequest: function(dataToPost, participantIdToAppend, useAsynchronous)
    {
        ININ.Web.Common.Debug.traceMethodEntered("AjaxManagerBase.sendRequest()");
        ININ.Web.Common.Interface.ensureImplements(this._capability, ININ.Web.Chat.WebServices.Interfaces.ICapability);

        if(ININ.Web.Common.Browser.isFireFox() && ININ.Web.Chat.WebServices.Utilities.needsElevatedPrivileges())
        {
            ININ.Web.Common.Debug.traceScopeEntered("enablePrivilegeFunction");

            try
            {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }
            catch (ex)
            {
                ININ.Web.Common.Debug.traceError(ex.message);
                window.alert(ININ.Web.Common.Resources.LocalizedStrings.get("BrowserSecuritySettingsError")); 
                ININ.Web.Chat.WebServices.ProblemReporter.sendProblemReport("Browser security settings error: " + ex, "AjaxManagerBase.sendRequest()");
                
                ININ.Web.Common.Debug.traceScopeExited("enablePrivilegeFunction");

                return;
            }
            
            ININ.Web.Common.Debug.traceScopeExited("enablePrivilegeFunction");
        }
        
        ININ.Web.Common.Debug.traceNote("AjaxManagerBase.sendRequest...dataToPost (which is allowed to be undefined) is: " + dataToPost);
        var _self = this;
        var dataToPostCached = dataToPost;
        var participantIdToAppendCached = participantIdToAppend;
        var sendTimestamp = new Date();
        var options =
        {
            method: this._capability.get_method(),
            contentType: this.buildContentTypeValue(),
            onSuccess: function(xmlHttpRequest)
            {
                ININ.Web.Common.Debug.traceNote("AjaxManagerBase.sendRequest() succeeded");

                try
                {
                    ININ.Web.Common.Debug.traceAlways("RESPONSE STATUS: " + xmlHttpRequest.status);
                    ININ.Web.Common.Debug.traceAlways("RESPONSE: " + xmlHttpRequest.responseText);

                    if(xmlHttpRequest && xmlHttpRequest.status == 200)
                    {
                        _self.onTransportSuccess(xmlHttpRequest);
                    }
                    else
                    {
                        _self.onTransportFailure(xmlHttpRequest, dataToPostCached, participantIdToAppendCached);
                    }
                }
                catch(ex)
                {
                    ININ.Web.Common.Debug.traceError(ex.message);
                    ININ.Web.Common.Debug.alert(ex.message);
                    ININ.Web.Common.Debug.breakpoint();
                    ININ.Web.Chat.WebServices.ProblemReporter.sendProblemReport(ex, "AjaxManagerBase.sendRequest().onSuccess()");
                }
            },
            onFailure: function(xmlHttpRequest)
            {
                ININ.Web.Common.Debug.traceError("AjaxManagerBase.sendRequest() failed: " + xmlHttpRequest.request.url);

                try
                {
                    xmlHttpRequest.sendTimestamp = sendTimestamp;
                    _self.onTransportFailure(xmlHttpRequest, dataToPostCached, participantIdToAppendCached);
                }
                catch(ex)
                {
                    ININ.Web.Common.Debug.traceError(ex.message);
                    ININ.Web.Common.Debug.alert(ex.message);
                    ININ.Web.Common.Debug.breakpoint();
                    ININ.Web.Chat.WebServices.ProblemReporter.sendProblemReport(ex, "AjaxManagerBase.sendRequest().onFailure()");
                }
            },
            onException : function(xmlHttpRequest, ex)
            {
                ININ.Web.Common.Debug.traceError("AjaxManagerBase.sendRequest() threw an exception: " + ex + ". URL: " + xmlHttpRequest.request.url);

                try
                {
                    xmlHttpRequest.sendTimestamp = sendTimestamp;
                    _self.onTransportFailure(xmlHttpRequest, dataToPostCached, participantIdToAppendCached);
                }
                catch(ex)
                {
                    ININ.Web.Common.Debug.traceError(ex.message);
                    ININ.Web.Common.Debug.alert(ex.message);
                    ININ.Web.Common.Debug.breakpoint();
                    ININ.Web.Chat.WebServices.ProblemReporter.sendProblemReport(ex, "AjaxManagerBase.sendRequest().onException()");
                }
            },
            requestHeaders:
            {
                Accept: this.buildContentTypeValue()
            },
            postBody: dataToPost,
            asynchronous: !!useAsynchronous
        };
        
        var url = this._buildUrl(this._capability.get_relativeUrl(), participantIdToAppend);
        ININ.Web.Common.Debug.traceStatus("URL = " + url);

        var request = new ININ.Web.Chat.WebServices.AjaxRequest(url, options);
        request.send();
        ININ.Web.Common.Debug.traceNote("AjaxManagerBase.sendRequest() has sent the AJAX request.");

        request.destroy();
        delete request;
        request = null;

        ININ.Web.Common.Debug.traceMethodExited("AjaxManagerBase.sendRequest()");
    },
    
    /**
     * Called when the AJAX request returns successfully (i.e. the <i>transport</i> was successful - we may have
     * been successfully delivered a response from the server indicating that the server failed somehow in
     * processing the request).
     * It does the following:
     * 1) Sets the retry counter to 0
     * 2) Parses AJAX response (using subclass' <code>buildResponse()</code> method).
     * 3a) If AJAX response indicates failure, notifies listeners
     * 3b) If AJAX response indicates success, notifies listeners
     * Note: <code>xmlHttpRequest</code> contains properties <code>responseText</code> and <code>responseXML</code>.
	 * This method should not be called directly by clients of the API. 
	 *  
	 * @param xmlHttpRequest Standard xmlHttpRequest object representing the response from the webserver
     */
    onTransportSuccess: function(xmlHttpRequest)
    {
        ININ.Web.Common.Debug.traceMethodEntered("AjaxManagerBase.onTransportSuccess()");

        this.retriesSoFar = 0; // Clear it out for next time
        this.validateContentType(xmlHttpRequest.getHeader(this.CONTENT_TYPE_HEADER));
        
        var responseObject = this.buildResponse(xmlHttpRequest);
        if (responseObject.isSuccessful())
        {
            ININ.Web.Common.Debug.traceNote("onTransportSuccess() notifying listeners of successful building of response object");
            this.notifyListenersOfSuccess(responseObject);
            ININ.Web.Common.Debug.traceNote("onTransportSuccess() done notifying listeners of successful building of response object");
        }
        else
        {
            ININ.Web.Common.Debug.traceNote("Notifying listeners of failureful building of response object");
            this.notifyListenersOfFailure(responseObject);
            ININ.Web.Common.Debug.traceNote("Done notifying listeners of failureful building of response object");
        }
        
        responseObject.destroy();
        delete responseObject;
        responseObject = null;
        
        ININ.Web.Common.Debug.traceMethodExited("AjaxManagerBase.onTransportSuccess()");
    },

    /**
     * 
     * Called when the AJAX request returns unsuccessfully (i.e. the <i>transport</i> was unsuccessful).
     * It calls the listeners.
	 * This method should not be called directly by clients of the API. 
	 *  
	 * @param xmlHttpRequest Standard xmlHttpRequest object representing the response from the webserver
	 * @param dataThatWasPosted If it was a POST request, this is the data that was POSTed.  Otherwise, ignore.
	 * @param participantIdToAppend If non-null, (a slash and) the ID will be appended onto the end of the URL.
     */
    onTransportFailure: function(xmlHttpRequest, dataThatWasPosted, participantIdToAppend)
    {
        ININ.Web.Common.Debug.traceMethodEntered("AjaxManagerBase.onTransportFailure()");
        ININ.Web.Common.Debug.traceNote("dataThatWasPosted: " + dataThatWasPosted + "  Upon entry, have retried " + this.retriesSoFar + " times.");
        // HTTP status code is in xmlHttpRequest.status

        var responseObject = this.buildResponse(xmlHttpRequest);
        responseObject.xmlHttpRequest = xmlHttpRequest; // Give the ProblemReporter and any failure listeners access to the HTTP status code, etc.
        ININ.Web.Chat.WebServices.ProblemReporter.recordFailedRequest(responseObject);
        if (this._shouldRequestBeRetried(responseObject))
        {
            ++this.retriesSoFar;
            this.sendRequest(dataThatWasPosted, participantIdToAppend, xmlHttpRequest.request.options.asynchronous);
        }
        else
        {
            this.retriesSoFar = 0; // Clear it out for next time
                
            ININ.Web.Common.Debug.traceNote("Processing response...");

            ININ.Web.Common.Debug.traceNote("onTransportFailure notifying listeners of failure.");
            this.notifyListenersOfFailure(responseObject);
            ININ.Web.Common.Debug.traceNote("onTransportFailure done notifying listeners of failure.");
        }
        ININ.Web.Common.Debug.traceMethodExited("AjaxManagerBase.onTransportFailure()");
    },
        
    // private methods

    _buildUrl : function(relativeUrl, participantIdToAppend)
    {
        var url = ININ.Web.Chat.WebServices.Servers.buildUrl(this._serverUriFragment, relativeUrl);
        
        if(participantIdToAppend)
        {
            url = url + "/" + participantIdToAppend;
        }
        
        return url;
    },

    _shouldRequestBeRetried : function(response)
    {
        return this._shouldRequestBeRetriedBasedOnMessageTypeAndRetryCount(this._capability.get_relativeUrl(), this.retriesSoFar) &&
               this._shouldRequestBeRetriedBasedOnError(response.get_statusReason());
    },

    _shouldRequestBeRetriedBasedOnMessageTypeAndRetryCount : function(capabilityUrl, retriesSoFar)
    {
        ININ.Web.Common.Debug.traceMethodEntered("AjaxManagerBase._shouldRequestBeRetriedBasedOnMessageTypeAndRetryCount()");
        var returnVal;
        var retryCounts = ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.RetryCounts);

        if(capabilityUrl == ININ.Web.Chat.WebServices.CapabilityUrls.Chat.POLL)
        {
            returnVal = (retriesSoFar < retryCounts.get_pollRetries());
        }
        else if(capabilityUrl == ININ.Web.Chat.WebServices.CapabilityUrls.Chat.EXIT)
        {
            returnVal = (retriesSoFar < retryCounts.get_exitRetries());
        }
        else if(capabilityUrl == ININ.Web.Chat.WebServices.CapabilityUrls.Common.SERVERCONFIGURATION)
        {
            if (ININ.Web.Chat.WebServices.Servers.isConfiguredForSwitchover())
            {
                returnVal = false;
                // To clarify:
                // With two servers, A and B, rather than trying A, A, A, A, B, B, B, B,
                // we want to retry in a different order which is determined by the caller,
                // such as A, B, A, B, A, B, A, B.  So false is returned here, simply to give
                // the caller the opportunity to switch to the other server.
            }
            else
            {
                returnVal = (retriesSoFar < retryCounts.get_serverConfigurationRetries());
            }
        }
        else if(capabilityUrl == ININ.Web.Chat.WebServices.CapabilityUrls.Chat.START)
        {
            returnVal = (retriesSoFar < retryCounts.get_startChatRetries());
        }
        else if(capabilityUrl == ININ.Web.Chat.WebServices.CapabilityUrls.Chat.RECONNECT)
        {
            returnVal = (retriesSoFar < retryCounts.get_reconnectRetries());
        }
        else if(capabilityUrl == ININ.Web.Chat.WebServices.CapabilityUrls.Common.TRACKERREGISTRATION)
        {
            returnVal = (retriesSoFar < retryCounts.get_trackerRegistrationRetries());
        }
        else if(capabilityUrl == ININ.Web.Chat.WebServices.CapabilityUrls.Chat.GETFILE)
        {
            returnVal = (retriesSoFar < retryCounts.get_getFileRetries());
        }
        else if(capabilityUrl == ININ.Web.Chat.WebServices.CapabilityUrls.Callback.CREATE)
        {
            returnVal = (retriesSoFar < retryCounts.get_createCallbackRetries());
        }
        else if(capabilityUrl == ININ.Web.Chat.WebServices.CapabilityUrls.Chat.SENDMESSAGE)
        {
            returnVal = (retriesSoFar < retryCounts.get_sendMessageRetries());
        }
        else if(capabilityUrl == ININ.Web.Chat.WebServices.CapabilityUrls.Chat.SETTYPINGSTATE)
        {
            returnVal = (retriesSoFar < retryCounts.get_setTypingStateRetries());
        }
        else if(capabilityUrl == ININ.Web.Chat.WebServices.CapabilityUrls.Common.PROBLEMREPORT)
        {
            returnVal = (retriesSoFar < retryCounts.get_problemReportRetries());
        }
        else
        {
            // Unrecognized capability!
            ININ.Web.Common.Debug.traceWarning("Unrecognized capability: " + capabilityUrl);
            returnVal = true;
        }
        ININ.Web.Common.Debug.traceMethodExited("AjaxManagerBase._shouldRequestBeRetriedBasedOnMessageTypeAndRetryCount()");
        return returnVal;
    },

    _shouldRequestBeRetriedBasedOnError : function(error)
    {
        ININ.Web.Common.Debug.traceMethodEntered("AjaxManagerBase._shouldRequestBeRetriedBasedOnError()");
        var returnVal;
        if(error.get_token(1) == ININ.Web.Chat.WebServices.ErrorCodes.WEBSVC)
        {
            var webSvcError = error.get_token(2);
            if((!webSvcError) || (webSvcError == ININ.Web.Chat.WebServices.ErrorCodes.GENERAL))
            {
                // generic error gets retried
                returnVal = true;
            }
            else
            {
                // any web service error other than general means that something is wrong with
                // the content of the message or the entities it references, so a retry won�t help
                returnVal = false;
            }
        }
        else if(error.get_token(1) == ININ.Web.Chat.WebServices.ErrorCodes.HTTP)
        {
            var httpError = error.get_token(2);

            if(!httpError)
            {
                // generic error gets retried
                returnVal = true;
            }
            else if (httpError.length == 0)
            {
                // Unrecognized error!
                ININ.Web.Common.Debug.traceWarning("Unrecognized HTTP error");
                returnVal = false;
            }
            else if (httpError == ININ.Web.Chat.WebServices.ErrorCodes.BADGATEWAY)
            {
                ININ.Web.Common.Debug.traceWarning("Received error 502 - perhaps the reverse proxy is not configured correctly on the webserver, or the IC server is not responding.");
                returnVal = false;
            }
            else if (httpError == ININ.Web.Chat.WebServices.ErrorCodes.SERVICEUNAVAILABLE)
            {
                ININ.Web.Common.Debug.traceWarning("Received error 503 - perhaps this server is currently the backup in a switchover pair.");
                returnVal = false;
            }
            else if(httpError[0] == '5')
            {
                // these 500 level errors may be temporary, so a retry is warranted
                ININ.Web.Common.Debug.traceWarning("Received error " + httpError + ".  Retrying.");
                returnVal = true;
            }
            else
            {
                // a 100, 200, 300 or 400 level error would do no good to retry
                // (exception: status code 200 indicates success and therefore wouldn't get here)
                // (exception: status code 404 MAY indicate the server is attempting to beat a DoS attack.  Don't retry, though, else
                //  that will be contributing to the attack).
                ININ.Web.Common.Debug.traceWarning("Received error " + httpError + ".  Not retrying.");
                returnVal = false;
            }
        }
        else
        {
            // default to true giving a retry attempt the benefit of the doubt
            returnVal = true;
        }
        ININ.Web.Common.Debug.traceNote("Returning: " + returnVal);
        ININ.Web.Common.Debug.traceMethodExited("AjaxManagerBase._shouldRequestBeRetriedBasedOnError()");
        return returnVal;
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * This class is the main brains of managing the server configuration, but is abstract - use derived class instead
 */
ININ.Web.Chat.WebServices.ServerConfigurationManagerBase = Class.create(ININ.Web.Chat.WebServices.ListenableBase,
{
	/**
	 * Constructor
	 * 
	 * @param genericResponseBuilder An object to build Response objects (i.e. objects which implement ResponseBase or its subclasses) from the IC server's replies to AJAX requests.
	 * @param capabilityRepository An object to keep track of which Capabilities are enabled or disabled, and provide getter methods for the various Capabilities. 
	 * @param serverConfigurationProcessor An object to parse the IC server's capabilities
	 */
    initialize : function($super, genericResponseBuilder, capabilityRepository, serverConfigurationProcessor)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ServerConfigurationManagerBase.initialize()");

        var numArgs = 4;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ServerConfigurationManagerBase constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

//        ININ.Web.Common.ParameterValidation.validate(arguments, [ {}, {"required": true} ]);

        $super();
        
        this._genericResponseBuilder = genericResponseBuilder;
        this._capabilityRepository = capabilityRepository;
        this._serverConfigurationProcessor = serverConfigurationProcessor;

        ININ.Web.Common.Debug.traceMethodExited("ServerConfigurationManagerBase.initialize()");
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("ServerConfigurationManagerBase.destroy()");

        this._genericResponseBuilder = null;
        this._serverConfigurationProcessor = null;
        this._capabilityRepository = null;

        ININ.Web.Common.Debug.traceMethodExited("ServerConfigurationManagerBase.destroy()");
    },

    // public methods

	/**
	 * Queries the IC server for its configuration/capabilities.
	 * 
	 * @param callback This function will be called when a response is received from the IC server.  This function should take 1 argument.  It will be passed true if the query succeeded, and false if it failed.
	 */
    getServerConfiguration : function(callback)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ServerConfigurationManagerBase.getServerConfiguration()");

        // create the get server configuration capability and then get the server configuration
        var capability = this._capabilityRepository.get_serverConfigurationCapability();
        var ajax = this.createAjaxManager(capability);
        var _self = this;
        ajax.registerSuccessListener(function(response)
        {
            ININ.Web.Common.Debug.traceNote("ServerConfigurationManagerBase.getServerConfiguration() succeeded: " + response);
            _self._processServerConfiguration(response);
            if (callback)
            {
                callback(true);
            }
        });
        ajax.registerFailureListener(function(response)
        {
            ININ.Web.Common.Debug.traceError("ServerConfigurationManagerBase.getServerConfiguration() failed: " + response);
            if (callback)
            {
                callback(false, response.get_statusReason());
            }
        });
        ajax.sendRequest(null, false, true);

        ININ.Web.Common.Debug.traceMethodExited("ServerConfigurationManagerBase.getServerConfiguration()");
    },

	// private methods

    _processServerConfiguration : function(response)
    {
        this._serverConfigurationProcessor.process(response);
    }
});

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.ErrorCodes");

/**
 * ININ.Web.Chat.WebServices.ErrorCodes enums
 */

// (from systest\eic\main\products\eic\src\WebProcessor\ExternalBridge\error_codes.h)
// TODO: Make the codes be hierarchical, such as ININ.Web.Chat.WebServices.ERROR.CONTENTTYPE.INVALIDCHARSET, as in the .h file

// Codes/namespaces within the root namespace:

/** Namespace to contain all other error codes */
ININ.Web.Chat.WebServices.ErrorCodes.ERROR = "error";

// Codes/namespaces within the error namespace

/** Namespace to contain errors not pertaining to HTTP transport */
ININ.Web.Chat.WebServices.ErrorCodes.WEBSVC = "websvc";

/** Namespace to contain errors pertaining to HTTP transport */
ININ.Web.Chat.WebServices.ErrorCodes.HTTP = "http";

// Codes/namespaces within the error.websvc namespace

/** Generic error */
ININ.Web.Chat.WebServices.ErrorCodes.GENERAL = "general";

/** Namespace for errors indicating that the type of something is wrong */
ININ.Web.Chat.WebServices.ErrorCodes.CONTENTTYPE = "contentType";

/** Namespace for errors indicating that the content of something is wrong */
ININ.Web.Chat.WebServices.ErrorCodes.CONTENT = "content";

/** Namespace for errors indicating that the specified object was not found */
ININ.Web.Chat.WebServices.ErrorCodes.UNKNOWNENTITY = "unknownEntity";

/** Namespace for errors associated with registration, authentication, authorization */
ININ.Web.Chat.WebServices.ErrorCodes.USERDB = "userdb";

// Codes within the error.websvc.contentType namespace

/** Error indicating that the wrong character set was used */
ININ.Web.Chat.WebServices.ErrorCodes.INVALIDCHARSET = "invalidCharset";

/** Error indicating that contentType is not what was desired */
ININ.Web.Chat.WebServices.ErrorCodes.INVALIDCONTENTTYPE = "invalidContentType";

// Codes/namespaces within the error.websvc.content namespace

/** Illegal JSON sequence, XML document, etc */
ININ.Web.Chat.WebServices.ErrorCodes.INVALID = "invalid";

// Codes within the error.websvc.content.invalid namespace

/** Mising a required data element */ 
ININ.Web.Chat.WebServices.ErrorCodes.MISSINGDATA = "missingData";

// Codes within the error.websvc.unknownEntity namespace

/** Error indicating an attempt to access a session that does not exist */
ININ.Web.Chat.WebServices.ErrorCodes.SESSION = "session";

/** Error indicating a participant does not exist */
ININ.Web.Chat.WebServices.ErrorCodes.PARTICIPANT = "participant";

/** Error indicating a target (i.e. queue) does not exist */
ININ.Web.Chat.WebServices.ErrorCodes.BADTARGET = "badTarget";

// Codes within the error.websvc.userdb namespace

/** Error indicating that a user is not online */
ININ.Web.Chat.WebServices.ErrorCodes.NOTONLINE = "notOnline";

/** Error indicating that the authentication credentials given were unacceptable */
ININ.Web.Chat.WebServices.ErrorCodes.BADCREDENTIALS = "badCredentials";

/** Error indicating that an account name (that someone is trying to register) already exists */
ININ.Web.Chat.WebServices.ErrorCodes.ACCOUNTEXISTS = "accountExists";

// Codes within the error.http namespace

/** Error indicating that an attempt was made to send an HTTP request to a hostname that is not valid, such as www.nonexistantcompany.com */
ININ.Web.Chat.WebServices.ErrorCodes.INVALIDHOST = "0";

/** Error representing a standard HTTP 301 error, given when a document has moved permanently */
ININ.Web.Chat.WebServices.ErrorCodes.MOVEDPERMANENTLY = "301";

/** Error representing a standard HTTP 403 error, given when the requestor is not authorized to see the requested document */
ININ.Web.Chat.WebServices.ErrorCodes.FORBIDDEN = "403";

/** Error representing a standard HTTP 404 error, given when a request was made for a document that does not exist */
ININ.Web.Chat.WebServices.ErrorCodes.NOTFOUND = "404";

/** Error representing a standard HTTP 500 error, given when an error occurs internal to the webserver */
ININ.Web.Chat.WebServices.ErrorCodes.INTERNALSERVERERROR = "500";

/** Error representing a standard HTTP 502 error, given when a proxy error occurs.  This may happen when, for instance, a page at http://somewhere makes an AJAX request for a page at https://somewhere (note the protocol change) or http://somewhere_else */
ININ.Web.Chat.WebServices.ErrorCodes.BADGATEWAY = "502";

/** Error representing a standard HTTP 503 error, given when a webserver is temporarily unable to fulfill a request (due to maintenance, overloading, etc.) */
ININ.Web.Chat.WebServices.ErrorCodes.SERVICEUNAVAILABLE = "503";

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/**
 * Error class
 *  
 * Represents an error, which contains a source, type, and subtype.
 */
ININ.Web.Chat.WebServices.Error = Class.create(ININ.Web.Common.InterfaceImplementation,
{
	/** 
	 * Constructor
	 */
    initialize : function($super, errorCode)
    {
        ININ.Web.Common.ParameterValidation.validate([errorCode], [ {"type": String, "required": true, "allowEmpty": false} ]);

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IError);

        this._errorCode = errorCode;
        this._tokens = this._buildParsedTokenArray(errorCode);
    },

    // public methods

	/**
	 * Returns part of the Error. 
	 * If index is 1, the error source is returned.  If index is 2, the error type is returned.  If index is 3, the 
	 * error's subtype is returned.  But it would likely be better to access these via get_errorSource(), get_errorType(), 
	 * and get_subErrorType() respectively. 
	 * 
	 * @param index Specifies which piece of data about the Error to return 
	 * @return A string containing the Error's source, type, or subtype, depending on the value of index. 
	 */
    get_token : function(index)
    {
        return this._tokens[index];
    },

	/**
	 * Gets this error's source
	 *  
	 * @return A string indicating the source of the error 
	 */
    get_errorSource : function()
    {
        return this.get_token(1);
    },

	/**
	 * Gets this error's type
	 *  
	 * @return A string indicating the type of the error 
	 */
    get_errorType : function()
    {
        return this.get_token(2);
    },

	/**
	 * Gets this error's subtype
	 *  
	 * @return A string indicating the subtype of the error 
	 */
    get_subErrorType : function()
    {
        return this.get_token(3);
    },

	/**
	 * Gets this error's textual representation.
	 *  
	 * @return A string representing the error.
	 */
    get_errorCode : function()
    {
        return this._errorCode;
    },

	// private methods

    _buildParsedTokenArray : function(str)
    {
        return str.split('.');
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * ResponseBase 
 *  
 * Base class to represent responses received from the IC server 
 */
ININ.Web.Chat.WebServices.ResponseBase = Class.create(ININ.Web.Common.InterfaceImplementation,
{
    EXCEPTION_INVALID_INTERACTION_STATE: "Invalid interaction state",

	/**
	 * Constructor
	 */
    initialize: function($super)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ResponseBase.initalize()");

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IResponse)

        this._statusType = null;
        this._statusReason = null;

        ININ.Web.Common.Debug.traceMethodExited("ResponseBase.initalize()");
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        this._statusType = null;
        this._statusReason = null;
    },

    // methods

	/**
	 * Returns whether the status of this response indicates success or failure
	 *  
	 * @return ININ.Web.Chat.WebServices.ResponseBase.STATUS_TYPE_SUCCESS or ININ.Web.Chat.WebServices.ResponseBase.STATUS_TYPE_FAILURE
	 */
    get_statusType : function()
    {
        return this._statusType;
    },

	/**
	 * Sets whether the status of this response indicates success or failure
	 *  
	 * @param statusType ININ.Web.Chat.WebServices.ResponseBase.STATUS_TYPE_SUCCESS or ININ.Web.Chat.WebServices.ResponseBase.STATUS_TYPE_FAILURE
	 */
    set_statusType : function(statusType)
    {
        if (statusType != ININ.Web.Chat.WebServices.ResponseBase.STATUS_TYPE_SUCCESS &&
            statusType != ININ.Web.Chat.WebServices.ResponseBase.STATUS_TYPE_FAILURE)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Invalid status type: " + statusType);
        }

        this._statusType = statusType;
    },

	/**
	 * Returns whether the response indicates success
	 *  
	 * @return true if the response indicates success, false if it indicates a failure
	 */
    isSuccessful : function()
    {
         return ININ.Web.Chat.WebServices.ResponseBase.STATUS_TYPE_SUCCESS == this._statusType;
    },

	/**
	 * Gets the reason for the failure.  There is no reason to call this on a successful response.
	 * 
	 * @return An instance of Error indicating why the operation failed.  Null if the operation succeeded.
	 */
    get_statusReason : function()
    {
        return this._statusReason;
    },

	/**
	 * Sets the reason for the failure.  There is no reason to call this on a successful response.
	 * 
	 * @param statusReason An instance of Error indicating why the operation failed. 
	 */
    set_statusReason : function(statusReason)
    {
        ININ.Web.Common.Interface.ensureImplements(statusReason, ININ.Web.Chat.WebServices.Interfaces.IError);
    
        this._statusReason = statusReason;
    },

	/**
	 * Returns a representation of this object as a string.  Useful for debugging purposes.
	 * 
	 * @return string 
	 */
    toString : function()
    {
        var msg = "";
        
        if(this._statusType)
        {
            msg += "TYPE: ";
            msg += this._statusType;
            msg += ", ";
        }

        if(this._statusReason)
        {
            msg += "ERROR CODE: ";
            msg += this._statusReason.get_errorCode();
        }

        return msg;
    }
});

/** Status type indicating success */
ININ.Web.Chat.WebServices.ResponseBase.STATUS_TYPE_SUCCESS = "success";

/** Status type indicating failure */
ININ.Web.Chat.WebServices.ResponseBase.STATUS_TYPE_FAILURE = "failure";

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.ServerConfigurationCapabilities");
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Common");
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Chat");
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Callback");
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.QueueQuery");

// List of all capabilities that this client knows about.  The JSON/XML received from the IC server will be parsed to look for these.
// This list may change as future SUs are released.

/** Capability to send a problem report */
ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Common.PROBLEM_REPORT = "problemReport";

/** Capability to get party info */
ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Common.PARTY_INFO = "partyInfo";

/** Capability to register via tracker */
ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Common.SUPPORT_REGISTRATION_TRACKER = "supportRegistrationTracker";

/** Capability to authenticate to a chat using tracker */
ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Chat.SUPPORT_AUTHENTICATION_TRACKER = "supportAuthenticationTracker";

/** Capability to authenticate to a chat using STS */
ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Chat.SUPPORT_AUTHENTICATION_STS = "supportAuthenticationSTS";

/** Capability to authenticate to a chat anonymously */
ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Chat.SUPPORT_AUTHENTICATION_ANONYMOUS = "supportAuthenticationAnonymous";

/** Capability to start a chat */
ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Chat.START = "start";

/** Capability to reconnect to a chat */
ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Chat.RECONNECT = "reconnect";

/** Capability to poll a chat for new messages/events */
ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Chat.POLL = "poll";

/** Capability to send a message in a chat */
ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Chat.SENDMESSAGE = "sendMessage";

/** Capability to send typing indicators */
ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Chat.SETTYPINGSTATE = "setTypingState";

/** Capability to exit a chat */
ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Chat.EXIT = "exit";

/** Capability to create a callback interaction */
ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Callback.CREATE = "create";

/** Capability to query the status of a callback interaction */
ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Callback.STATUS = "status";

/** Capability to reconnect a callback interaction */
ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Callback.RECONNECT = "reconnect";

/** Capability to disconnect a callback interaction */
ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Callback.DISCONNECT = "disconnect";

/** Capability to authenticate to a callback using tracker */
ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Callback.SUPPORT_AUTHENTICATION_TRACKER = "supportAuthenticationTracker";

/** Capability to authenticate to a callback using STS */
ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Callback.SUPPORT_AUTHENTICATION_STS = "supportAuthenticationSTS";

/** Capability to authenticate to a callback anonymously */
ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Callback.SUPPORT_AUTHENTICATION_ANONYMOUS = "supportAuthenticationAnonymous";

/** Capability to authenticate to a queue query using tracker */
ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.QueueQuery.SUPPORT_AUTHENTICATION_TRACKER = "supportAuthenticationTracker";

/** Capability to authenticate to a queue query using STS */
ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.QueueQuery.SUPPORT_AUTHENTICATION_STS = "supportAuthenticationSTS";

/** Capability to authenticate to a queue query anonymously */
ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.QueueQuery.SUPPORT_AUTHENTICATION_ANONYMOUS = "supportAuthenticationAnonymous";


// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/**
 * ServerConfigurationResponse class 
 *  
 * When an AJAX request is made to the IC server to get the server configuration, ServerConfigurationResponseBuilder 
 * translates the IC server's JSON/XML reply into a ServerConfigurationResponse. 
 *  
 * It contains information about the IC server's Capabilities - callbacks, typing indicators, etc.  This allows 
 * interoperability between clients and servers that are running different SUs. 
 */
ININ.Web.Chat.WebServices.ServerConfigurationResponse = Class.create(ININ.Web.Chat.WebServices.ResponseBase,
{
	/**
	 * Constructor
	 */
    initialize: function($super)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ServerConfigurationResponse.initalize()");

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IServerConfigurationResponse)

        this._commonCapabilities = [];
        this._chatCapabilities = [];
        this._callbackCapabilities = [];
        this._queueQueryCapabilities = [];
        this._problemReportRegEx = null;

        ININ.Web.Common.Debug.traceMethodExited("ServerConfigurationResponse.initalize()");
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        if(this._commonCapabilities)
        {
            delete this._commonCapabilities;
            this._commonCapabilities = null;
        }
        if(this._chatCapabilities)
        {
            delete this._chatCapabilities;
            this._chatCapabilities = null;
        }
        if(this._callbackCapabilities)
        {
            delete this._callbackCapabilities;
            this._callbackCapabilities = null;
        }
        if(this._queueQueryCapabilities)
        {
            delete this._queueQueryCapabilities;
            this._queueQueryCapabilities = null;
        }

        ININ.Web.Chat.WebServices.ResponseBase.prototype.destroy.call(this);
    },

    // public methods

	/**
     * Gets the version number of this server configuration response. 
	 *  
     * @return Version number of server configuration
	 */
    get_serverConfigVersion : function()
    {
        return this._cfgVer;
    },

	/**
     * Sets the version number of this server configuration response
	 *  
	 * @param cfgVer Version number of server configuration
	 */
    set_serverConfigVersion : function(cfgVer)
    {
        this._cfgVer = cfgVer;
    },

	/**
	 * Returns a list of "common" capabilities.  This does not mean capabilities that are shared between the client and 
	 * the IC server.  It refers to capabilities that are common to the various interaction types (chat, callback, etc.). 
	 * See the constants beginning with ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Common above.
	 *  
	 * @return JSON/XML string 
	 */
    get_commonCapabilities : function()
    {
        return this._commonCapabilities;
    },

	/**
	 * Adds a common (to all interaction types) capability to the list of common capabilities.
	 * 
	 * @param capability One of the ServerConfigurationCapability constants defined above.
	 */
    addCommonCapability : function(capability)
    {
        this._validateCapability(capability);

        // NOTE: Can't check for non-common capabilities, since this needs to support
        // future common capabilities and they could be anything

        this._commonCapabilities.push(capability);
    },

	/**
	 * Sets the entire list of common (to all interaction types) capabilities, overwriting the previous list.
	 * 
	 * @param capabilities Array of zero or more of the ServerConfigurationCapability constants defined above.
	 */
    set_commonCapabilities : function(capabilities)
    {
        this._commonCapabilities = capabilities;
    },

	/**
	 * Returns a list of chat capabilities. 
	 * See the constants beginning with ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Chat above.
	 *  
	 * @return JSON/XML string 
	 */
    get_chatCapabilities : function()
    {
        return this._chatCapabilities;
    },

	/**
	 * Adds a chat capability to the list of chat capabilities.
	 * 
	 * @param capability One of the ServerConfigurationCapability constants defined above.
	 */
    addChatCapability : function(capability)
    {
        this._validateCapability(capability);

        // NOTE: Can't check for non-chat capabilities, since this needs to support
        // future chat capabilities and they could be anything

        this._chatCapabilities.push(capability);
    },

	/**
	 * Sets the entire list of chat capabilities, overwriting the previous list.
	 * 
	 * @param capabilities Array of zero or more of the ServerConfigurationCapability constants defined above.
	 */
    set_chatCapabilities : function(capabilities)
    {
        this._chatCapabilities = capabilities;
    },

	/**
	 * Returns a list of callback capabilities. 
	 * See the constants beginning with ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.Callback above.
	 *  
	 * @return JSON/XML string 
	 */
    get_callbackCapabilities : function()
    {
        return this._callbackCapabilities;
    },

	/**
	 * Adds a callback capability to the list of callback capabilities.
	 * 
	 * @param capability One of the ServerConfigurationCapability constants defined above.
	 */
    addCallbackCapability : function(capability)
    {
        this._validateCapability(capability);

        // NOTE: Can't check for non-callback capabilities, since this needs to support
        // future callback capabilities and they could be anything

        this._callbackCapabilities.push(capability);
    },

	/**
	 * Sets the entire list of callback capabilities, overwriting the previous list.
	 * 
	 * @param capabilities Array of zero or more of the ServerConfigurationCapability constants defined above.
	 */
    set_callbackCapabilities : function(capabilities)
    {
        this._callbackCapabilities = capabilities;
    },

    /**
     * Gets the regular expression which problem reports must match if they are to be sent. 
     * If this is null, AND if the "sendProblemReport" capability is enabled, problem reports will be sent if problems occur. 
     * If this is non-null, AND if the "sendProblemReport" capability is enabled, problem reports will be sent if problems occur provided 
     * that the problem report that is generated matches this regular expression. 
     * If the "sendProblemReport" capability is disabled, then there is no point in calling get_problemReportRegEx() as its return 
     * value should be ignored. 
     */
    get_problemReportRegEx : function()
    {
        return this._problemReportRegEx;
    },

    /**
     * Specifies a regular expression which problem reports must match if they are to be sent. 
     * If this is not set, or set to null, AND if the "sendProblemReport" capability is enabled, problem reports will be sent if problems occur. 
     * If this is set, AND if the "sendProblemReport" capability is enabled, problem reports will be sent if problems occur provided 
     * that the problem report that is generated matches this regular expression. 
     * If the "sendProblemReport" capability is disabled, then there is likely not much point in calling this method.  The value passed will 
     * be stored, but problem reports will not be sent. 
     */
    set_problemReportRegEx : function(regEx)
    {
        this._problemReportRegEx = regEx;
    },

	/**
	 * Returns a list of queue query capabilities. 
	 * See the constants beginning with ININ.Web.Chat.WebServices.ServerConfigurationCapabilities.QueueQuery above.
	 *  
	 * @return JSON/XML string 
	 */
    get_queueQueryCapabilities : function()
    {
        return this._queueQueryCapabilities;
    },

	/**
	 * Adds a queue query capability to the list of queue query capabilities.
	 * 
	 * @param capability One of the ServerConfigurationCapability constants defined above.
	 */
    addQueueQueryCapability : function(capability)
    {
        this._validateCapability(capability);

        // NOTE: Can't check for non-queue query capabilities, since this needs to support
        // future queue query capabilities and they could be anything

        this._queueQueryCapabilities.push(capability);
    },

	/**
	 * Sets the entire list of queue query capabilities, overwriting the previous list.
	 * 
	 * @param capabilities Array of zero or more of the ServerConfigurationCapability constants defined above.
	 */
    set_queueQueryCapabilities : function(capabilities)
    {
        this._queueQueryCapabilities = capabilities;
    },

	// private methods

    _validateCapability : function(capability)
    {
        ININ.Web.Common.ParameterValidation.validate([capability], [ {"type": String, "required": true, "allowEmpty": false} ]);
    }

});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Json");

/**
 * Class which handles AJAX connection.
 * To use this:
 * 1) Pass a <code>ININ.Web.Chat.WebServices.Interfaces.ICapability</code> to the constructor, to represent 
 *    what this AJAX manager is supposed to do (e.g. chat, send a message, etc.) 
 * 2) Register one or more callbacks for success and failure using <code>registerSuccessListener()</code> and 
 *    <code>registerFailureListener()</code>.  (These methods are inherited from ListenableBase) 
 * 3) Call <code>sendRequest()</code> at some point.  If doing a POST, the data to post shall be the
 *    arg to that function.
 * 4) The callback that you passed in step #2 will be called.  It will have one parameter, which will be a 
 *    <code>ININ.Web.Chat.WebServices.ResponseBase</code> (or a subclass thereof).
 */
ININ.Web.Chat.WebServices.Json.AjaxManager = Class.create(ININ.Web.Chat.WebServices.AjaxManagerBase,
{
    // constants
    JSON_CONTENT_TYPE_VALUE: 'application/json',
    UTF8_CONTENT_TYPE_VALUE: 'charset=utf-8',

	/**
	 * Constructor
	 * 
	 * @param genericResponseBuilder The object that shall be used to translate the IC server's HTTP reply into a ResponseBase (or subclass thereof)
	 * @param capability  A Capability object representing what this AjaxManager is intended to do (i.e. poll, send message, etc.)
	 * @param serverUriFragment The URI fragment that reverse proxies to the IC server. (optional - if not specified, the current one will be used.)
	 */
    initialize : function($super, genericResponseBuilder, capability, serverUriFragment)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.AjaxManager.initialize()");
        $super(capability, serverUriFragment);

        this._genericResponseBuilder = genericResponseBuilder;

        ININ.Web.Common.Debug.traceMethodExited("Json.AjaxManager.initialize()");
    },

    // public methods

	/**
	 * Returns the content type of the HTTP requests that this AjaxManager will make. 
	 *  
	 * @return String containing the content type of HTTP requests that this AjaxManager will make. 
	 */
    buildContentTypeValue : function()
    {
        return this.JSON_CONTENT_TYPE_VALUE + "; " + this.UTF8_CONTENT_TYPE_VALUE;
    },

	/**
	 * When an AJAX request is sent and the HTTP server replies, this method is used to ensure 
	 * that the content type of the response is one that this AjaxManager knows how to handle. 
	 *  
	 * @param contentType The value of the Content-Type field of an HTTP response that was received
	 */
    validateContentType : function(contentType)
    {
        ININ.Web.Common.Debug.traceNote('Content-type to validate: ' + contentType);
        if(!contentType)
        {
            ININ.Web.Common.Debug.traceError('content-type received is null/empty');
        }
        else if(!contentType.include(this.JSON_CONTENT_TYPE_VALUE) && !contentType.include(this.UTF8_CONTENT_TYPE_VALUE))
        {
            ININ.Web.Common.Debug.traceError('Bad content-type received: ' + contentType);
        }
    },

	/**
	 * Takes an AJAX reply from the IC server, and returns a ResponseBase or subclass thereof.
	 * 
	 * @param xmlHttpRequest What was received from the IC server when an AJAX request was made 
	 * @return A ResponseBase, or subclass thereof. 
	 */
    buildResponse : function(xmlHttpRequest)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.AjaxManager.buildResponse()");
        var retVal = null;
        try
        {
            retVal = this._genericResponseBuilder.buildResponseFromRequest(xmlHttpRequest);
        }
        catch (ex)
        {
            ININ.Web.Common.Debug.traceError("Caught unhandled exception:\n" + ex);
        }
        ININ.Web.Common.Debug.traceMethodExited("Json.AjaxManager.buildResponse()");
        return retVal;
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Json");

/**
 * ResponseBuilderBase class 
 * ChatResponseBuilder, CallbackResponseBuilder, etc. are derived from this. 
 */
ININ.Web.Chat.WebServices.Json.ResponseBuilderBase = Class.create(
{
	/**
	 * Constructor
	 */
    initialize : function()
    { },

	/**
	 * Destructor
	 */
    destroy : function()
    { },

	/**
	 * Parses the "status" portion of the JSON protocol, and sets the appropriate properties on the 
	 * response.
	 *  
	 * Effectively a protected method. 
	 *  
	 * @param status The "status" portion of the JSON object that was received from the IC server in the HTTP reply.
	 * @param response A ResponseBase, or subclass thereof.  Its statusType and statusReason properties may be set, depending on 
	 * the value of the status param. 
	 */
    _parseStatus : function(status, response)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ResponseBaseBuilder.parseStatus()");

        if(status)
        {
            ININ.Web.Common.Debug.traceNote("status type: " + status.type);
            if(status.type)
            {
                response.set_statusType(status.type);
            }

            ININ.Web.Common.Debug.traceNote("status reason: " + status.reason);
            if(status.reason)
            {
                var error = null;
                try
                {
                    error = new ININ.Web.Chat.WebServices.Error(status.reason);
                }
                catch(ex)
                {
                    ININ.Web.Common.Debug.traceError(ex.message);
                    ININ.Web.Common.Debug.traceWarning("Invalid status reason: " + status.reason);
                }

                if(error)
                {
                    response.set_statusReason(error);
                }
            }
        }

        ININ.Web.Common.Debug.traceMethodExited("ResponseBaseBuilder.parseStatus()");
    },

	// TODO:  This method seems to be dead code.  Confirm and remove.
    parseStatus1 : function(status, response)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.RegistrationResponseBuilder.buildRegistrationResponse()");
        ININ.Web.Common.Debug.traceStatus("jsonStr is: " + jsonStr);

        var response = null;

        if (jsonStr)
        {
            response = new ININ.Web.Chat.WebServices.RegistrationResponse();

            var json = null;
            try
            {
                json = jsonStr.evalJSON();
            }
            catch (e)
            {
                ININ.Web.Common.Debug.traceError("Caught exception calling JSON.parse or string.evalJSON:\n" + e);
                ININ.Web.Common.Debug.alert("Caught exception calling JSON.parse or string.evalJSON:\n" + e);
            }

            if(json.registration)
            {
                if(json.registration.status)
                {
                    if(json.registration.status.type)
                    {
                        response.set_statusType(json.registration.status.type);
                    }

                    response._statusReason = json.registration.status.reason;
                }
            }
        }

        ININ.Web.Common.Debug.traceMethodExited("Json.RegistrationResponseBuilder.buildRegistrationResponse()");

        return response;
    }
});

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Json._Internal");

/**
 * ServerConfigurationProcessor class 
 *  
 * Placeholder for any future JSON-specific functionality relating to processing an IServerConfigurationResponse, etc. 
 */
ININ.Web.Chat.WebServices.Json._Internal.ServerConfigurationProcessor = Class.create(ININ.Web.Chat.WebServices._Internal._ServerConfigurationProcessorBase,
{
	/**
	 * Constructor
	 * 
	 * @param capabilityRepository An instance of CapabilityRepository, in which the capabilities will be stored.
	 */
    initialize: function($super, capabilityRepository)
    {
        $super(capabilityRepository);
    },

	/** 
	 * Destructor 
	 */
    destroy : function()
    {
        ININ.Web.Chat.WebServices._Internal._ServerConfigurationProcessorBase.prototype.destroy.call(this);
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Json._Internal");

/**
 * ServerConfigurationResponseBuilder class
 * When an AJAX request is made to the IC server to get the server configuration, this class translates the IC server's 
 * JSON reply into a response object that implements IServerConfigurationResponse.
 */
ININ.Web.Chat.WebServices.Json._Internal.ServerConfigurationResponseBuilder = Class.create(ININ.Web.Chat.WebServices.Json.ResponseBuilderBase,
{
    /**
     * Constructor
     */
    initialize : function($super)
    {
        $super();
    },

    /**
     * Destructor
     */
    destroy : function()
    {
        ININ.Web.Chat.WebServices.Json.ResponseBuilderBase.prototype.destroy.call(this);
    },

    // methods

    /**
     * Translates jsonStr into an implementation of IServerConfigurationResponse, for use by  
     *  
     * @param jsonStr The IC server's reply to the AJAX request for server configuration 
     * @returns An implementation of IServerConfigurationResponse 
     */
    buildServerConfigurationResponse : function(jsonStr)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.ServerConfigurationResponseBuilder.buildServerConfigurationResponse()");
        ININ.Web.Common.Debug.traceStatus("jsonStr is: " + jsonStr);

        var response = null;

        if (jsonStr)
        {
            response = new ININ.Web.Chat.WebServices.ServerConfigurationResponse();

            // default to failure until at least some point in the JSON is reached
            response.set_statusType(ININ.Web.Chat.WebServices.ResponseBase.STATUS_TYPE_FAILURE);
                
            var json = null;
            try
            {
                json = jsonStr.evalJSON();
            }
            catch (e)
            {
                ININ.Web.Common.Debug.traceError("Caught exception calling JSON.parse or string.evalJSON:\n" + e);
            }

            if(json)
            {
                if (ININ.Web.Common.Utilities.isType(json, Array) && json.length >= 1)
                {
                    if(json[0].serverConfiguration)
                    {
                        response.set_statusType(ININ.Web.Chat.WebServices.ResponseBase.STATUS_TYPE_SUCCESS);
                        response.set_serverConfigVersion(json[0].serverConfiguration.cfgVer);
                
                        // we'll say that every node under serverConfiguration is optional
                        var jsonCapabilities = json[0].serverConfiguration.capabilities;
                        if(jsonCapabilities)
                        {
                            if(jsonCapabilities.common)
                            {
                                response.set_commonCapabilities(jsonCapabilities.common);
                            }

                            if(jsonCapabilities.chat)
                            {
                                response.set_chatCapabilities(jsonCapabilities.chat);
                            }

                            if(jsonCapabilities.callback)
                            {
                                response.set_callbackCapabilities(jsonCapabilities.callback);
                            }

                            if(jsonCapabilities.queueQuery)
                            {
                                response.set_queueQueryCapabilities(jsonCapabilities.queueQuery);
                            }
                        }

                        if (json[0].serverConfiguration.problemReportRegEx)
                        {
                            response.set_problemReportRegEx(json[0].serverConfiguration.problemReportRegEx);
                        }
                    }
                    if (json.length >= 2)
                    {
                        ININ.Web.Common.Debug.traceStatus("Accept-language parameter exists");
                        if (json[1].browserAcceptLanguage)
                        {
                            ININ.Web.Chat.WebServices.LanguagePreferenceRepository.setBrowserLanguages(json[1].browserAcceptLanguage);
                        }
                    }
                    else
                    {
                        ININ.Web.Common.Debug.traceStatus("Accept-language parameter does not exist");
                    }
                }
            }
        }

        ININ.Web.Common.Debug.traceMethodExited("Json.ServerConfigurationResponseBuilder.buildServerConfigurationResponse()");

        return response;
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Json._Internal");

/**
 * GenericResponseBuilder class 
 * This class is in charge of building responses (i.e. objects which implement ResponseBase or its subclasses) from the IC server's 
 * replies to AJAX requests. 
 * In the case of an HTTP error (i.e. a 404, etc.) or an HTTP reply that is successful but empty, this class builds the 
 * response object itself.  Otherwise, it will delgate to one of the other *ResponseBuilder classes.
 */
ININ.Web.Chat.WebServices.Json._Internal.GenericResponseBuilder = Class.create(
{
	/**
	 * Constructor
	 * 
	 * @param chatResponseBuilder Object to which the task of building chat responses should be delgated.
	 * @param callbackResponseBuilder Object to which the task of building callback responses should be delegated.
	 * @param registrationResponseBuilder Object to which the task of building registration responses should be delegated.
	 * @param serverConfigurationResponseBuilder Object to which the task of building server configuration responses should be delegated.
	 * @param partyInfoResponseBuilder Object to which the task of building party info responses should be delegated.
	 * @param queueQueryResponseBuilder Object to which the task of building queue query responses should be delegated.
	 */
    initialize: function(chatResponseBuilder, callbackResponseBuilder, registrationResponseBuilder, serverConfigurationResponseBuilder,
                         partyInfoResponseBuilder, queueQueryResponseBuilder)
    {
        this._chatResponseBuilder = chatResponseBuilder;
        this._callbackResponseBuilder = callbackResponseBuilder;
        this._registrationResponseBuilder = registrationResponseBuilder;
        this._serverConfigurationResponseBuilder = serverConfigurationResponseBuilder;
        this._partyInfoResponseBuilder = partyInfoResponseBuilder;
        this._queueQueryResponseBuilder = queueQueryResponseBuilder;
    },

	/**
	 * Destructor
	 */
    destroy : function()
    { },

    // methods

	/**
	 * Takes an AJAX reply from the IC server, and returns a ResponseBase or subclass thereof.
	 * 
	 * @param xmlHttpRequest What was received from the IC server when an AJAX request was made 
	 * @return A ResponseBase, or subclass thereof. 
	 */
    buildResponseFromRequest : function(xmlHttpRequest)
    {
        var response = null;

        // need to always return some kind of response for consumers to process
        if(xmlHttpRequest)
        {
            if(xmlHttpRequest.status == 200)
            {
                response = this._buildResponseFromResponseText(xmlHttpRequest.responseText, xmlHttpRequest.request.url);
            }
            else
            {
                var errorCode = ININ.Web.Chat.WebServices.ErrorCodes.ERROR + '.' + ININ.Web.Chat.WebServices.ErrorCodes.HTTP;
                if(xmlHttpRequest.status == 0)
                {
                    errorCode += '.' + ININ.Web.Chat.WebServices.ErrorCodes.INVALIDHOST;
                }
                else if(xmlHttpRequest.status == 403)
                {
                    errorCode += '.' + ININ.Web.Chat.WebServices.ErrorCodes.FORBIDDEN;
                }
                else if(xmlHttpRequest.status == 404)
                {
                    errorCode += '.' + ININ.Web.Chat.WebServices.ErrorCodes.NOTFOUND;
                }
                else if(xmlHttpRequest.status == 500)
                {
                    errorCode += '.' + ININ.Web.Chat.WebServices.ErrorCodes.INTERNALSERVERERROR;
                }
                else if(xmlHttpRequest.status == 503)
                {
                    errorCode += '.' + ININ.Web.Chat.WebServices.ErrorCodes.SERVICEUNAVAILABLE;
                }
                else
                {
                    errorCode += '.' + xmlHttpRequest.status;
                }

                response = new ININ.Web.Chat.WebServices.ResponseBase();
                response.set_statusType(ININ.Web.Chat.WebServices.ResponseBase.STATUS_TYPE_FAILURE);
                response.set_statusReason(new ININ.Web.Chat.WebServices.Error(errorCode));
            }
        }
        else
        {
            response = new ININ.Web.Chat.WebServices.ResponseBase();
            response.set_statusType(ININ.Web.Chat.WebServices.ResponseBase.STATUS_TYPE_FAILURE);
            response.set_statusReason(new ININ.Web.Chat.WebServices.Error(ININ.Web.Chat.WebServices.ErrorCodes.ERROR + '.' + ININ.Web.Chat.WebServices.ErrorCodes.HTTP));
        }


        return response;
    },

	// private methods

    _buildResponseFromResponseText : function(jsonStr, url)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.GenericResponseBuilder.buildResponse()");
        ININ.Web.Common.Debug.traceStatus("jsonStr is: " + jsonStr);
        ININ.Web.Common.Debug.traceStatus("url is: " + url);

        var response = null;

        if (jsonStr)
        {
            var json = null;
            try
            {
                json = jsonStr.evalJSON();
            }
            catch (e)
            {
                ININ.Web.Common.Debug.traceError("Caught exception calling JSON.parse or string.evalJSON:\n" + e);
            }

            if(json)
            {
                if(json.chat)
                {
                    response = this._chatResponseBuilder.buildChatResponse(jsonStr);
                }
                else if(json.callback)
                {
                    response = this._callbackResponseBuilder.buildCallbackResponse(jsonStr, url);
                }
                else if(json.registration)
                {
                    response = this._registrationResponseBuilder.buildRegistrationResponse(jsonStr);
                }
                else if(json.partyInfo)
                {
                    response = this._partyInfoResponseBuilder.buildPartyInfoResponse(jsonStr);
                }
                else if(json.queue)
                {
                    response = this._queueQueryResponseBuilder.buildQueueQueryResponse(jsonStr);
                }
                else if(ININ.Web.Common.Utilities.isType(json, Array) && json.length >= 1 && json[0].serverConfiguration)
                {
                    response = this._serverConfigurationResponseBuilder.buildServerConfigurationResponse(jsonStr);
                }
            }
        }

        // if it got to this point, then the http part was ok, but the web processor bridge is hosed        
        if(!response)
        {
            response = new ININ.Web.Chat.WebServices.ResponseBase();
            response.set_statusType(ININ.Web.Chat.WebServices.ResponseBase.STATUS_TYPE_FAILURE);
            response.set_statusReason(new ININ.Web.Chat.WebServices.Error(ININ.Web.Chat.WebServices.ErrorCodes.ERROR + '.' + ININ.Web.Chat.WebServices.ErrorCodes.WEBSVC));
        }

        ININ.Web.Common.Debug.traceMethodExited("Json.GenericResponseBuilder.buildResponse()");

        return response;
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Json._Internal");

/**
 * ServerConfigurationManager class 
 * Extends ServerConfigurationManagerBase with JSON-specific functionality
 */
ININ.Web.Chat.WebServices.Json._Internal._ServerConfigurationManager = Class.create(ININ.Web.Chat.WebServices.ServerConfigurationManagerBase,
{
	/**
	 * Constructor
	 * 
	 * @param genericResponseBuilder An instance of GenericResponseBuilder, to turn the JSON received from the IC server into a ResponseBase or subclass thereof
	 * @param capabilityRepository An instance of CapabilityRepository, in which the capabilities are stored.
	 * @param serverConfigurationProcessor An instance of (a subclass of) ServerConfigurationProcessorBase, such as ServerConfigurationProcessor
	 */
    initialize: function($super, genericResponseBuilder, capabilityRepository, serverConfigurationProcessor)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.ServerConfigurationManager.initialize()");

        $super(genericResponseBuilder, capabilityRepository, serverConfigurationProcessor);

        ININ.Web.Common.Debug.traceMethodExited("Json.ServerConfigurationManager.initialize()");
    },

    // public methods

    /** 
     * Gets an JSON-specific instance of ININ.Web.Chat.WebServices.AjaxManagerBase
	 * This method should not be called directly by clients of the API. 
	 *  
	 * @param capability A Capability object representing what this AjaxManager object is intended to do (i.e. poll, send a message, etc.) 
	 * @return AjaxManager 
     */
    createAjaxManager : function(capability)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.ServerConfigurationManager.createAjaxManager()");
        var mgr = new ININ.Web.Chat.WebServices.Json.AjaxManager(this._genericResponseBuilder, capability);
        ININ.Web.Common.Debug.traceMethodExited("Json.ServerConfigurationManager.createAjaxManager()");
        return mgr;
    }
});

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * (WebServices) LanguageCodeConverter class 
 *  
 * Provides methods pertaining to the use of language codes (aka IETF Tags).  Examples of these tags are: 
 * en-US = English as spoken in the US 
 * en-GB = English as spoken in Great Britain 
 * de-CH = German as spoken in Switzerland 
 * ...etc. 
 *  
 * Note that generally the region portion of a language code is capitalized, but this is merely a convention, and 
 * this web application does not follow that convention. 
 *  
 * There is no need to instantiate this class - a singleton instance called ININ.Web.Chat.WebServices.LanguageCodeConverter is available. 
 */
ININ.Web.Chat.WebServices._Internal.LanguageCodeConverter = Class.create({
    /**
     * Constructor does nothing because all the functionality is essentially static
     */
    initialize : function() {
    },

    /**
     * Attempts to convert a language code into one for which ININ has created a resource file. 
     * It will not convert from one language to another, it just affects regional dialects of langauges. 
     *  
     * Note that LanguageList has functionality where if "xx-YY" is added, it will automatically add the base "XX" to 
     * the list as well.  LanguageCodeConverter is intended for trickier situations than that.
     *  
     * For instance, if passed "en-AU", it will return "en-US" since we publish a resource file for US English 
     * but not one for Australian English nor one for general English ("en").
     *  
     * Note, however, this means that if someone's language preference order is { "en-AU" (which we don't have), 
     * "fr" (which we do have), "en-US" (which we do have) }, this will result in them getting "en-US" since it's 
     * our designated substitute for their first choice.  But such situations will be rare.
     *  
     * @param languageCode A language code (presumably, one in which the user would like to chat, or would like to see the user interface, etc.)
     * @param A language code to use instead of the one that was passed in 
     */
    convert : function(languageCode)
    {
        if (null == languageCode || "" == languageCode) {
            ININ.Web.Common.Debug.traceError("Received empty languageCode");
            ININ.Web.Common.Debug.breakpoint();
            return languageCode;
        }

        // We don't distribute a general "pt" file, just "pt-BR".  If someone requests "pt",
        // it's better to give them "pt-BR" rather than something non-Portuguese.
        if (languageCode.match(/^pt/i) && !languageCode.match(/^pt-BR/i)) {
			ININ.Web.Common.Debug.traceStatus('Substituting "pt-br" for "' + languageCode + '"');
            return "pt-br";
        }

        if (languageCode.match(/^en/i) && !languageCode.match(/^en-US/i)) {
			ININ.Web.Common.Debug.traceStatus('Substituting "en-us" for "' + languageCode + '"');
            return "en-us";
        }

        // Norwegian Bokmal and Norwegian Nynorsk map to Norwegian.
        if (languageCode.match(/^nb/i) || languageCode.match(/^nn/i)) {
			ININ.Web.Common.Debug.traceStatus('Substituting "no" for "' + languageCode + '"');
            return "no";
        }

        // We distribute zh-Hans (simplified Chinese) and zh-Hant (traditional Chinese).
        // But, browsers may send any of: zh-Hans, zh-SG (Singapore), zh-Hant,
        // zh-HK (Hong Kong), zh-MO (Macau), zh-TW (Taiwan), zh
        if (languageCode.match(/^zh$/i) || languageCode.match(/^zh-CN/i) || languageCode.match(/^zh-SG/i))
        {
			ININ.Web.Common.Debug.traceStatus('Substituting "zh-Hans" for "' + languageCode + '"');
            return "zh-Hans";
        }

        if (languageCode.match(/^zh-HK/i) || languageCode.match(/^zh-TW$/i) || languageCode.match(/^zh-MO/i))
        {
			ININ.Web.Common.Debug.traceStatus('Substituting "zh-Hant" for "' + languageCode + '"');
            return "zh-Hant";
        }

        return languageCode;
    },

    /**
     * Returns the first token of a language code.  For instance, if the parmameter is "en-US", then "en" will be returned. 
     *  
     * @param languageCode The language code whose first token is to be returned. 
     */
    getFirstToken : function(languageCode)
    {
        if(!languageCode)
        {
            return "";
        }

        var tokens = languageCode.split("-");
        return tokens[0];
    }
});
ININ.Web.Chat.WebServices.LanguageCodeConverter = new ININ.Web.Chat.WebServices._Internal.LanguageCodeConverter();

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/** 
 * An ordered list of unique language codes.  Adding a language multiple times will have the same effect as adding it only once. 
 */
ININ.Web.Chat.WebServices.LanguageList = Class.create(
{
	/**
	 * Constructor
	 */
    initialize: function()
    {
		this._array = new Array();
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
		delete this._array;
	},

	/**
	 * Determines whether the list already contains a certain language code.  Case-insensitive.
	 * 
     * @param languageCode A string whose value is a language code, i.e. "en-US".
     * @return true if the language code is contained in the list.  False if it is empty or not contained in the list. 
	 */
	contains: function(languageCode)
	{
        if (null == languageCode || languageCode.length == 0)
		{
			return false;
		}

		return (-1 != this._array.indexOf(languageCode));
	},

	/**
	 * Adds a language code to the list.  Case-insensitive.  Attempts to add null or the empty string will have no effect.
	 * 
	 * @param languageCode A string whose value is a language code, i.e. "en-US". 
	 */
    push: function(languageCode)
	{
        ININ.Web.Common.Debug.traceMethodEntered("LanguageList.push()");
        if (null == languageCode || languageCode.length <= 0)
        {
            return;
        }

        languageCode = languageCode.toLowerCase();
        var convertedLanguageCode = ININ.Web.Chat.WebServices.LanguageCodeConverter.convert(languageCode);
        var extraLogInfo = "";
        if (languageCode != convertedLanguageCode)
        {
            extraLogInfo = ' (in lieu of "' + languageCode + '")';
        }

        if (this.contains(convertedLanguageCode))
        {
            ININ.Web.Common.Debug.traceStatus('Already added language "' + convertedLanguageCode + '"' + extraLogInfo);
        } else
		{
			this._array.push(convertedLanguageCode);
            ININ.Web.Common.Debug.traceStatus('Added language "' + convertedLanguageCode + '"' + extraLogInfo);

            var hyphenIdx = languageCode.lastIndexOf('-');
            if (hyphenIdx > 0)
            {
                var baseLanguageCode = languageCode.substr(0, hyphenIdx)
                ININ.Web.Common.Debug.traceStatus('Recursing to add base language, "' + baseLanguageCode + '"');
                this.push(baseLanguageCode);
            }
		}
        ININ.Web.Common.Debug.traceMethodExited("LanguageList.push()");
	},

	/**
	 * Returns an Array containing the language codes in this list.  The Array is a copy, so the caller may 
	 * alter the array without affecting this LanguageList.
	 *  
	 * @return Array of strings, each of which holds a language code. 
	 */
	toArray: function()
	{
        return this._array.clone();
	}
});

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * LanguagePreferenceRepository class
 *
 * Many factors influence which language is used for chat.  This class manages those. 
 *  
 * In priority order, the factors are: 
 * 1. Whether the language to use for this chat has been explicitly specified.  To do this, a customer may create a customization 
 *    in which the user can click a French flag, or a link that says "Chat in English", etc. which results in a call to
 *    Bootloader.setLanguage().
 * 2. The language(s) specified by the user's web browser settings.  Javascript can't directly "see" this, only server-side code.  So 
 *    it is included in the server configuration response so that the client side can use it.  Multiple may be specified, with
 *    priorities included.
 * 3. The language specified by the user's OS settings. 
 * 4. The language specified in config.js
 */
ININ.Web.Chat.WebServices._Internal._LanguagePreferenceRepository = Class.create(
{
	/**
	 * Constructor
	 */
    initialize: function()
    {
		this._specifiedLanguage = null;
		this._browserLanguages = null;
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
	},

	/**
	 * Returns an array of languages, in the order in which the application should attempt to use them. 
	 *  
	 * @return Array of language codes 
	 */
	getLanguagePreferenceOrder : function()
	{
		ININ.Web.Common.Debug.traceMethodEntered("LanguagePreferenceRepository.getLanguagePreferenceOrder()");

		var languagePreferenceOrder = new ININ.Web.Chat.WebServices.LanguageList();

		// 1. Explicitly-specified language
		if (this._getSpecifiedLanguage())
		{
			ININ.Web.Common.Debug.traceStatus("Specified language is: " + this._getSpecifiedLanguage());
            languagePreferenceOrder.push(this._getSpecifiedLanguage());
		}

		// 2. The language(s) specified by the user's web browser settings.
        if (this._getBrowserLanguages())
		{
			var browserLanguages = this._getBrowserLanguages();
			ININ.Web.Common.Debug.traceStatus("Browser language(s) are: " + browserLanguages.join());
			for (var i=0; i<browserLanguages.length; i++)
			{
				languagePreferenceOrder.push(browserLanguages[i]);
			}
		}

		// 3. The language specified by the user's OS settings.
        if (this._getOSLanguage())
		{
			ININ.Web.Common.Debug.traceStatus("OS language is: " + this._getOSLanguage());
            languagePreferenceOrder.push(this._getOSLanguage());
		}

		// 4. The langauge specified in config.js
        if (this._getDefaultLanguage())
		{
			ININ.Web.Common.Debug.traceStatus("Default language is: " + this._getDefaultLanguage());
            languagePreferenceOrder.push(this._getDefaultLanguage());
		}

		ININ.Web.Common.Debug.traceStatus("Language preference order: " + languagePreferenceOrder.toArray().join());
		ININ.Web.Common.Debug.traceMethodExited("LanguagePreferenceRepository.getLanguagePreferenceOrder()");
        return languagePreferenceOrder.toArray();
	},

	/**
	 * Setter method so this class can know which language(s) are specified in the web user's browser's settings.
	 * 
	 * @param browserLanguages String value, as specified in the definition of the Accept-Language HTTP parameter:
	 * May contain one or more language codes, separated by commas (and optional whitespace).  Each language code may
	 * have a preference between 1.0 (highest) and 0.0 (lowest) specified.  Example: 
	 * en-us,en;q=0.8;de;q=0.5 
	 * Meaning of previous example:  "I prefer US English.  Other regional forms of English are fine.  If English is 
	 * unavailable, German is acceptable." 
	 */
	setBrowserLanguages : function(browserLanguages)
	{
		ININ.Web.Common.Debug.traceMethodEntered("LanguagePreferenceRepository.setBrowserLanguages()");
		ININ.Web.Common.Debug.traceStatus("Browser language(s) are: " + browserLanguages);

		this._reset();

		if (-1 == browserLanguages.indexOf(","))
		{
			this._addBrowserLanguage(browserLanguages);
		}
		else
		{
			// Loop through the specified languages, and add them in the order of their specified preference (from high to low)
			browserLanguages = browserLanguages.replace(/\s*/, "");
			var languages = browserLanguages.split(/,/);
			while (languages.length > 0)
			{
				ININ.Web.Common.Debug.traceStatus("Searching for highest-preference language of: " + languages.length);
				var maxPreference = -1;
				var maxPreferenceLanguage = null;
				var maxPreferenceLanguageIndex = -1;
				for (var i=0; i<languages.length; i++)
				{
					var token = languages[i];
					ININ.Web.Common.Debug.traceStatus("Token: " + token);
					if (-1 == token.indexOf(";q="))
					{
						// maxPreference is irrelevant - this one is 1.0
						maxPreferenceLanguage = token;
						maxPreferenceLanguageIndex = i;
						break;
					}
					else
					{
						var languageAndPreference = token.split(/;q=/);
						if (languageAndPreference[1] > maxPreference)
						{
							maxPreference = languageAndPreference[1];
							maxPreferenceLanguage = languageAndPreference[0];
							maxPreferenceLanguageIndex = i;
						}
					}
				}
				ININ.Web.Common.Debug.traceStatus("Next highest-preference language: " + maxPreferenceLanguage);
				this._addBrowserLanguage(maxPreferenceLanguage);
				languages.splice(maxPreferenceLanguageIndex, 1);
			}
		}
		ININ.Web.Common.Debug.traceStatus("Method finished.  Browser language(s) are: " + this._getBrowserLanguages().join(", "));
		ININ.Web.Common.Debug.traceMethodExited("LanguagePreferenceRepository.setBrowserLanguages()");
	},

    // private methods

    _getSpecifiedLanguage : function()
	{
		// It would be nice if the value could be a member variable of this class, but this class may not be loaded yet at
		// the time when setLanguage() needs to be called.  So it lives in Bootloader.
		return Bootloader.getLanguage();
	},

	/*
	 * Resets this application's copy of the preferred languages specified in the user's browser settings.
	 * 
	 * @author Jonathan.Keller (1/7/2011)
	 */
	_reset : function()
	{
		this._browserLanguages = new Array();
	},

	/*
	 * Adds one language to this application's copy of the preferred languages specified in the user's browser settings.
	 */
	_addBrowserLanguage : function(browserLanguage)
	{
		this._browserLanguages.push(browserLanguage);
	},

	/*
	 * Gets the web user's preferred languages, as specified in their web browser's settings.
	 * 
	 * @return Array of language codes, in order of the web user's preference.  Ties may be in either order, i.e. if HTTP Accept-Language parameter was "en;q=0.8,es;q=0.8", this may return either [ "en", "es" ] or [ "es", "en" ].
	 */
	_getBrowserLanguages : function()
	{
		return this._browserLanguages;
	},

	_getOSLanguage : function()
	{
		return navigator.language /* Firefox */ || navigator.userLanguage /* IE */;
	},

	_getDefaultLanguage : function()
	{
	    return ININ.Web.Chat.Config.DefaultLanguageCode;
	}
});

/**
 * Singleton instance of the _LanguagePreferenceRepository class.
 */
ININ.Web.Chat.WebServices.LanguagePreferenceRepository = new ININ.Web.Chat.WebServices._Internal._LanguagePreferenceRepository();

/*global ININ: true, Class: true, Element: true, alert: true, Event: true, window: true, CKEDITOR: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * _DefaultRetryCounts class 
 *  
 * Do not instantiate this class directly.  Use 
 * ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.RetryCounts) 
 *  
 * If it is desired to change the number of times that failed AJAX requests 
 * of various types will be retried, do the following:
 * 1. Create a subclass of ININ.Web.Chat.WebServices._Internal._DefaultRetryCounts.  Override one 
 *    or methods to return a different number. 
 * 2. Change the line in ININ.Web.Chat.Customizations.RetryCountsFactory that 
 *    instantiates a new ININ.Web.Chat.WebServices._Internal._DefaultRetryCounts. 
 *    Make that line instead create an instance of the subclass from step 1.
 *  
 * Important:  Note that if certain HTTP response codes are received as a 
 * result of a request, the client will not retry the request, regardless 
 * of the value returned by the applicable method below. 
 */
ININ.Web.Chat.WebServices._Internal._DefaultRetryCounts = Class.create(
{
    /**
     * Constructor.  Does nothing.
     */
    initialize : function()
    {
    },

    /**
     * This method returns the number of times a failed poll operation 
     * should be retried. 
     *  
     * Since a chat polls over and over again periodically, this defaults 
     * to 0, because if one poll operation fails, another will happen in 
     * a few seconds anyway. 
     */
    get_pollRetries : function()
    {
        return 0;
    },

    /**
     * This method returns the number of times a failed request to exit 
     * a chat should be retried. 
     */
    get_exitRetries : function()
    {
        return 0;
    },

    /**
     * This method returns the number of times a failed request to start 
     * a chat should be retried. 
     */
    get_startChatRetries : function()
    {
        return 1;
    },

    /**
     * This method returns the number of times a failed request to reconnect 
     * a chat should be retried.  (Applicable only if the WebProcessorBridge 
     * lists reconnection as a capability, which is not the case at the 
     * present time.) 
     */
    get_reconnectRetries : function()
    {
        return 1;
    },

    /**
     * This method returns the number of times a failed request to register 
     * a new account with Tracker should be retried. 
     */
    get_trackerRegistrationRetries : function()
    {
        return 1;
    },

    /**
     * This method returns the number of times a failed request to get a file
     * sent by an agent should be retried. 
     *  
     * Not currently used, since clicking a link to get a file is not handled 
     * via AJAX. 
     */
    get_getFileRetries : function()
    {
        return 1;
    },

    /**
     * This method returns the number of times a failed request to create a
     * Callback should be retried. 
     */
    get_createCallbackRetries : function()
    {
        return 1;
    },

    /**
     * This method returns the number of times a failed request to send a
     * message should be retried. 
     */
    get_sendMessageRetries : function()
    {
        return 1;
    },

    /**
     * This method returns the number of times a failed request to set the
     * web user's typing state (to either true or false) should be retried. 
     */
    get_setTypingStateRetries : function()
    {
        return 1;
    },

    /**
     * This method returns the number of times a failed request to obtain 
     * server configuration should be retried, per server. 
     *  
     * Example: A switchover pair is configured.  For some reason, neither is responding. 
     * A web user loads the chat client.  If this method returns 3 (the default), 
     * the chat client will attempt to contact server #1, #2, #1, #2, #1, #2, #1, 
     * #2, and then give up.  That reflects one try and three retries per server. 
     *  
     * Example 2: Switchover is not configured.  For some reason, the IC server is 
     * not responding.  A web user loads the chat client.  If this method returns 
     * 3 (the default), the chat cilent will attempt to contact the IC server 
     * four times: one try and three retries. 
     *  
     * Note that this applies only to the attempt to obtain server configuration 
     * before beginning a chat. 
     *  
     * This method does not apply to cases in which a chat is in-progress and one 
     * of the other operations (poll, send message, etc.) fails for the specified 
     * number of retries.  In that case, the chat client will attempt to get the 
     * server configuration an indefinite number of times.  These attempts will
     * have a pause between them, the length of which is specified by the return
     * value of get_reconnectTimeoutMilliseconds().  In the case of a switchover pair, 
     * it will try to connect to server #1, then server #2, then pause, and repeat this process 
     * indefinitely. 
     */
    get_serverConfigurationRetries : function()
    {
        return 3;
    },

    /**
     * This method returns the number of times a failed request to send a
     * problem report should be retried. 
     */
    get_problemReportRetries : function()
    {
        return 0;
    },

    /** 
     * If a chat that is in progress fails to connect to the 
     * server (or, in the case of a switchover pair, fails to 
     * connect to both of the servers), the chat will idle for 
     * a period of time before attempting to contact the server(s) 
     * again.  That period of time is determined by choosing a 
     * random integer between the return value of this method and 
     * its companion, get_reconnectTimeoutMillisecondsMaximum. 
     *  
     * If a non-random value is desired, modify RetryCountsFactory 
     * to return a custom subclass of this class, and override both 
     * methods to return the same value. 
     *  
     * Note: if a subclass overrides this method to return a different 
     * value, it is recommended that the string associated with resource ID 
     * "CouldNotConnectServerRetry" also be changed to reflect the new
     * timeout value. 
     */
    get_reconnectTimeoutMillisecondsMinimum : function()
    {
        return 3000;
    },

    /** 
     * If a chat that is in progress fails to connect to the 
     * server (or, in the case of a switchover pair, fails to 
     * connect to both of the servers), the chat will idle for 
     * a period of time before attempting to contact the server(s) 
     * choosing a random integer between the return value of this 
     * method and its companion, * get_reconnectTimeoutMillisecondsMinimum. 
     *  
     * If a non-random value is desired, modify RetryCountsFactory 
     * to return a custom subclass of this class, and override both 
     * methods to return the same value. 
     *  
     * Note: if a subclass overrides this method to return a different 
     * value, it is recommended that the string associated with resource ID 
     * "CouldNotConnectServerRetry" also be changed to reflect the new
     * timeout value. 
     */
    get_reconnectTimeoutMillisecondsMaximum : function()
    {
        return 5000;
    },

    /**
     * Sets how many milliseconds (thousandths of a second) to wait for a response 
     * from an AJAX request before aborting the request. 
     *  
     * The default value is 12 seconds. 
     */
    get_ajaxTimeoutMilliseconds : function()
    {
        return 12000;
    }
});

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes");

/**
 * ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes enum 
 * Identifies the factories for various types that may be customized. 
 */
ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MIN = 1;

ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.LoginInfoSource = 1;
ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths = 2;
ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.RetryCounts = 3;
ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.TabVisibility = 4;
ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.StatusFieldsDisplay = 5;
ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.Linkifier = 6;

ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MAX = 6;

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.CustomizableFactoryTypes");

/**
 * ININ.Web.Chat.WebServices.CustomizableFactoryTypes enum 
 * Identifies the factories for various types that may be customized. 
 */
ININ.Web.Chat.WebServices.CustomizableFactoryTypes.MIN = 1001;
ININ.Web.Chat.WebServices.CustomizableFactoryTypes.RegistrationFormPanel = 1001;
ININ.Web.Chat.WebServices.CustomizableFactoryTypes.MAX = 1001;


/*global ININ: true, Class: true, Element: true, alert: true, Event: true, window: true, CKEDITOR: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/** 
 * CustomizationFactoryRegistry class 
 *  
 * This class is used in implementing the "customization points" which 
 * allow customization of certain behaviours.  It maintains an association between 
 * the classes that can be customized, represented by the CustomizableFactoryTypes 
 * enum, and the factories which are used to obtain instances of those classes. 
 *  
 * Do not instantiate this directly. 
 * Instead, use the singleton ININ.Web.Chat.WebServices.CustomizationFactoryRegistry. 
 */
ININ.Web.Chat.WebServices._Internal._CustomizationFactoryRegistry = Class.create(
{
	/**
	 * Constructor
	 */
    initialize : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("CustomizationFactoryRegistry.initialize()");
        this._factories = new Hash();
        this._singletonFactories = new Hash();
        ININ.Web.Common.Debug.traceMethodExited("CustomizationFactoryRegistry.initialize()");
    },

    /**
     * Destructor 
     */
    destroy : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("CustomizationFactoryRegistry.destroy()");
        var keys = this._factories.keys();
        for (var i=0; i<keys.length; i++)
        {
            ININ.Web.Common.Debug.traceNote("Deleting factory for key: " + keys[i]);
            var factory = this._factories.unset(keys[i]);
            delete factory;
        }
        
        keys = this._singletonFactories.keys();
        for (var i=0; i<keys.length; i++)
        {
            ININ.Web.Common.Debug.traceNote("Deleting singleton factory for key: " + keys[i]);
            var factory = this._singletonFactories.unset(keys[i]);
            delete factory;
        }
        ININ.Web.Common.Debug.traceMethodExited("CustomizationFactoryRegistry.destroy()");
    },

    /** 
     * Associates a non-singleton type with the factory that may be used to get instance(s) 
     * of that type. 
     *  
     * @param type A member of the ININ.Web.Chat.WebServices.CustomizableFactoryTypes enum 
     * @param factory Something that implements the ININ.Web.Chat.WebServices.Interfaces.ICustomizationFactory interface 
     */
    registerFactory: function(type, factory)
    {
        ININ.Web.Common.Debug.traceMethodEntered("CustomizationFactoryRegistry.registerFactory()");
        ININ.Web.Common.Interface.ensureImplements(factory, ININ.Web.Chat.WebServices.Interfaces.ICustomizationFactory);
        this._validateType(type);
        this._factories.set(type, factory);
        ININ.Web.Common.Debug.traceMethodExited("CustomizationFactoryRegistry.registerFactory()");
    },

    /** 
     * Associates a singleton type with the factory that may be used to get instance(s) 
     * of that type. 
     *  
     * @param type A member of the ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes enum 
     * @param factory Something that implements the ININ.Web.Chat.WebServices.Interfaces.ICustomizationSingletonFactory interface 
     */
    registerSingletonFactory: function(type, factory)
    {
        ININ.Web.Common.Debug.traceMethodEntered("CustomizationFactoryRegistry.registerSingletonFactory()");
        ININ.Web.Common.Interface.ensureImplements(factory, ININ.Web.Chat.WebServices.Interfaces.ICustomizationSingletonFactory);
        this._validateSingletonType(type);
        this._singletonFactories.set(type, factory);
        ININ.Web.Common.Debug.traceMethodExited("CustomizationFactoryRegistry.registerSingletonFactory()");
    },

    /**
     * Gets the factory that may be used to create an instance of a particular non-singleton customizable type. 
     *  
     * @param type A member of the ININ.Web.Chat.WebServices.CustomizableFactoryTypes enum 
     * @return A factory that implements the ININ.Web.Chat.WebServices.Interfaces.ICustomizationFactory interface 
     */
    get_factory : function(type)
    {
        ININ.Web.Common.Debug.traceMethodEntered("CustomizationFactoryRegistry.get_factory()");
        this._validateType(type);
        var returnValue = this._factories.get(type);
        ININ.Web.Common.Debug.traceMethodExited("CustomizationFactoryRegistry.get_factory()");
        return returnValue;
    },

    /**
     * Gets the singleton factory that may be used to access the instance of a particular customizable type. 
     *  
     * @param type A member of the ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes enum 
     * @return A factory that implements the ININ.Web.Chat.WebServices.Interfaces.ICustomizationSingletonFactory interface 
     * @see get_instance() 
     */
    get_singletonFactory : function(type)
    {
        ININ.Web.Common.Debug.traceMethodEntered("CustomizationFactoryRegistry.get_singletonFactory()");
        this._validateSingletonType(type);
        var returnValue = this._singletonFactories.get(type);
        ININ.Web.Common.Debug.traceMethodExited("CustomizationFactoryRegistry.get_singletonFactory()");
        return returnValue;
    },

    /**
     * Convenience method that implements get_factory(type).create_instance(args) with null-safety.
     * 
     * @param type A member of the ININ.Web.Chat.WebServices.CustomizableFactoryTypes enum 
     * @param args The JSON arguments to pass to the factory's create_instance() method.
     * @return An instance (possibly one of many) of whatever type of object this factory creates 
     */
    create_instance : function(type, args)
    {
        ININ.Web.Common.Debug.traceMethodEntered("CustomizationFactoryRegistry.create_instance()");
        var returnValue = null;
        var factory = this.get_factory(type);
        if (null != factory)
        {
            returnValue = factory.create_instance(args);
        }
        else
        {
            ININ.Web.Common.Debug.traceWarning("Can't find factory for type: " + type);
        }
        ININ.Web.Common.Debug.traceMethodExited("CustomizationFactoryRegistry.create_instance()");
        return returnValue;
    },

    /**
     * Convenience method that implements get_singletonFactory(type).get_instance() with null-safety.
     * 
     * @param type A member of the ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes enum 
     * @return The (only!) instance of whatever type of object this factory creates 
     */
    get_instance : function(type)
    {
        ININ.Web.Common.Debug.traceMethodEntered("CustomizationFactoryRegistry.get_instance()");
        var returnValue = null;
        var factory = this.get_singletonFactory(type);
        if (null != factory)
        {
            returnValue = factory.get_instance();
        }
        else
        {
            ININ.Web.Common.Debug.traceWarning("Can't find singleton factory for type: " + type);
        }
        ININ.Web.Common.Debug.traceMethodExited("CustomizationFactoryRegistry.get_instance()");
        return returnValue;
    },

    _validateType : function(type)
    {
        if (type < ININ.Web.Chat.WebServices.CustomizableFactoryTypes.MIN ||
            type > ININ.Web.Chat.WebServices.CustomizableFactoryTypes.MAX)
        {
            throw ININ.Web.Common.ExceptionFactory.createException('"' + type + '" is not a valid CustomizableFactoryType.');
        }
    },

    _validateSingletonType : function(type)
    {
        if (type < ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MIN ||
            type > ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MAX)
        {
            throw ININ.Web.Common.ExceptionFactory.createException('"' + type + '" is not a valid CustomizableFactoryType.');
        }
    }
});

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/** 
 * A class representing a duration of time.  Granularity is currently 1 second. 
 * Provides methods whose names fall into three categories: get___(), getTotal___(), and getRounded___().
 *  
 * Example 1: 
 * 270150 seconds = 3 days, 3 hours, 2 minutes, and 30 seconds.  For a TimeDuration object representing 
 * this duration: 
 * getSeconds() will return 30, whereas getTotalSeconds() will return 270150. There is no getRoundedSeconds() method.
 * getMinutes() will return 2, whereas getTotalMinutes() will return 4502. 
 * getRoundedMinutes() will return 3, since 2:30 is closer to 3:00 than to 2:00.
 * getHours() will return 3, whereas getTotalHours() will return 75. 
 * getRoundedHours() will return 3. 
 * getDays() and getRoundedDays() will both return 3. 
 *  
 * Example 2: 
 * For an object representing 5 days, 14 hours, 45 minutes, and 18 seconds: 
 * getRoundedDays() will return 6.
 * getRoundedHours() will return 15.
 * getRoundedMinutes() will return 45.
 *  
 * Example 3: 
 * For an object representing 1 hour, 29 minutes, and 30 seconds: 
 * getRoundedMinutes() will return 30. 
 * getRoundedHours() will return 1, because this is based on the unrounded number of minutes, not the rounded number of minutes.
 *  
 * Example 4:
 * For an object representing 1 day, 23 hours, 59 minutes, and 59 seconds: 
 * getRoundedDays() will return 2. 
 * getRoundedHours() will return 0, not 24! 
 * getRoundedMinutes() will return 0, not 60!
 *  
 * Note that all methods return integers! 
 * For 179 seconds (which is 2:59), getMinutes() will return 2.  Not 2.98333, and not 3. 
 * There is no getTotalDays() method.  Since this class does not handle longer durations (weeks, 
 * months, years, etc.) getTotalDays() would always return the same as getDays(), so there is no need for it. 
 */
ININ.Web.Chat.WebServices.TimeDuration = Class.create(
{
	/**
     * Constructor 
     *  
     * @params How many seconds this TimeDuration represents 
	 */
    initialize: function(seconds)
    {
        this.set(seconds);
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
	},

    /**
     * Makes this TimeDuration object represent a duration of 0.
     */
    reset : function()
    {
        this._seconds = this._minutes = this._hours = this._days = 0;
        this._totalSeconds = this._totalMinutes = this._totalHours = 0;
    },

	/**
     * Changes the amount of time that this object represents.
     *  
     * @params How many seconds this TimeDuration now represents 
	 */
    set : function(seconds)
    {
        this.reset();

        this._totalSeconds = seconds;
        this._seconds = this._totalSeconds % 60;

        if (this._totalSeconds > 60)
        {
            this._totalMinutes = Math.floor(this._totalSeconds / 60);
            this._minutes = this._totalMinutes % 60;

            if (this._totalMinutes > 60)
            {
                this._totalHours = Math.floor(this._totalMinutes / 60);
                this._hours = this._totalHours % 24;

                if (this._totalHours > 24)
                {
                    this._days = Math.floor(this._totalHours / 24);
                }
            }
        }
    },

    /**
     * Returns how many seconds this TimeDuration object represents, excluding the minutes, hours, and days portion. 
     * For instance, after calling set(275), which is 4 minutes and 35 seconds, this method will return 35. 
     *  
     * @return integer, 0 through 59 
     */
    getSeconds : function()
    {
        return this._seconds;
    },

    /**
     * Returns how many seconds this TimeDuration object represents, including the minutes, hours, and days portion. 
     * For instance, after calling set(275), which is 4 minutes and 35 seconds, this method will return 275.
     *  
     * @return integer 
     */
    getTotalSeconds : function()
    {
        return this._totalSeconds;
    },

    /**
     * Returns how many minutes this TimeDuration object represents, excluding the seconds, hours, and days portion. 
     * For instance, after calling set(7475), which is 2 hours, 4 minutes and 35 seconds, this method will return 4.
     *  
     * @return integer, 0 through 59 
     */
    getMinutes : function()
    {
        return this._minutes;
    },

    /**
     * Returns how many minutes this TimeDuration object represents, if the seconds are rounded to the nearest minute. 
     * For instance, after calling set(275), which is 4 minutes and 35 seconds, this method will return 5. 
     * Another example: after calling set(7399), which is 1 hour, 59 minutes, and 59 seconds, this method will 
     * return 0 since that rounds to 2 hours 0 minutes. 
     *  
     * @return integer, 0 through 59 
     */
    getRoundedMinutes : function()
    {
        if (this.getSeconds() < 30)
        {
            return this.getMinutes();
        }
        else
        {
            return 1 + this.getMinutes();
        }
    },

    /**
     * Returns how many minutes this TimeDuration object represents, including the hours and days portion. 
     * For instance, after calling set(7475), which is 2 hours, 4 minutes and 35 seconds, which 
     * equals 124 minutes and 35 seconds, this method will return 124.
     *  
     * @return integer 
     */
    getTotalMinutes : function()
    {
        return this._totalMinutes;
    },

    /**
     * Returns how many hours this TimeDuration object represents, excluding the seconds, minutes, and days portion. 
     * For instance, after calling set(356521), which is 4 days, 3 hours, 2 minutes, and 1 second, this method will return 3. 
     *  
     * @return integer, 0 through 23 
     */
    getHours : function()
    {
        return this._hours;
    },

    /**
     * Returns how many hours this TimeDuration object represents, if the minutes are rounded to the nearest hour. 
     * For instance, after calling set(7399), which is 1 hour, 59 minutes, and 59 seconds, this method will 
     * return 2 since that rounds to 2 hours 0 minutes.  Days are ignored: if this TimeDuration object represented 
     * 8 days, 1 hour, 59 minutes, and 59 seconds, this method would still return 2. 
     *  
     * @return integer, 0 through 59 
     */
    getRoundedHours : function()
    {
        if (this.getMinutes() < 30)
        {
            return this.getHours();
        }
        else
        {
            return 1 + this.getHours();
        }
    },

    /**
     * Returns how many hours this TimeDuration object represents, including the days portion. 
     * For instance, after calling set(356521), which is 4 days, 3 hours, 2 minutes, and 1 second, which 
     * equals 99 hours, 2 minutes, and 1 second, this method will return 99. 
     *  
     * @return integer
     */
    getTotalHours : function()
    {
        return this._totalHours;
    },

    /**
     * Returns how many days this TimeDuration object represents, excluding the hours, minutes, and seconds portion. 
     * For instance, after calling set(356521), which is 4 days, 3 hours, 2 minutes, and 1 second, this method will 
     * return 4. 
     *  
     * @return integer
     */
    getDays : function()
    {
        return this._days;
    },

    /**
     * Returns how many days this TimeDuration object represents, if the hours are rounded to the nearest day. 
     * For instance, if this object represents 5 days and 12 hours, this method will return 6. 
     *  
     * Note that if this object represents 5 days, 11 hours, 58 minutes, and 30 seconds, this method will return 5. 
     * In other words, this method does NOT round the seconds (5d, 11h, 59m), then round the minutes (5d, 12h), then round 
     * the days. 
     *  
     * @return integer
     */
    getRoundedDays : function()
    {
        if (this.getHours() < 12)
        {
            return this.getDays();
        }
        else
        {
            return 1 + this.getDays();
        }
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * Superclass of CallbackManagerBase, ChatManagerBase, RegistrationManagerBase. 
 * All of those are abstract - use their derived classes instead
 */
ININ.Web.Chat.WebServices.InteractionManagerBase = Class.create(ININ.Web.Chat.WebServices.ListenableBase,
{
	/**
	 * Constructor
	 * 
	 * @param genericResponseBuilder An object to build Response objects (i.e. objects which implement ResponseBase or its subclasses) from the IC server's replies to AJAX requests.
	 * @param capabilityRepository An object to keep track of which Capabilities are enabled or disabled, and provide getter methods for the various Capabilities. 
	 * @param failoverHandler In charge of connecting to the other server if the current one goes down for some reason. 
	 */
    initialize : function($super, genericResponseBuilder, capabilityRepository, failoverHandler)
    {
        ININ.Web.Common.Debug.traceMethodEntered("InteractionManagerBase.initialize()");

        var numArgs = 4;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("InteractionManagerBase constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

//        ININ.Web.Common.ParameterValidation.validate(arguments, [ {}, {"required": true} ]);

        $super();
        
        this._genericResponseBuilder = genericResponseBuilder;
        this._capabilityRepository = capabilityRepository;
        this._failoverHandler = failoverHandler;

        ININ.Web.Common.Debug.traceMethodExited("InteractionManagerBase.initialize()");
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("InteractionManagerBase.destroy()");

        this._genericResponseBuilder = null;
        this._capabilityRepository = null;
        this._failoverHandler = null;

        ININ.Web.Common.Debug.traceMethodExited("InteractionManagerBase.destroy()");
    },

    // public methods

    /** 
     * Handle a successful response to any AJAX request:
     * 1) Process the response 
     * 2) Alert listeners
	 * This method should not be called directly by clients of the API. 
	 *  
	 * @param response An instance of a subclass of ResponseBase, which represents the response to an AJAX request received from the IC server
     */
    onAJAXSuccess: function(response) {
        ININ.Web.Common.Debug.traceMethodEntered("InteractionManagerBase.onAJAXSuccess()");
        
        ININ.Web.Common.Debug.traceNote("InteractionManagerBase.onAJAXSuccess calling notifyListenersOfSuccess()");
        this.notifyListenersOfSuccess();
        ININ.Web.Common.Debug.traceNote("InteractionManagerBase.onAJAXSuccess back from notifyListenersOfSuccess()");
        ININ.Web.Common.Debug.traceMethodExited("InteractionManagerBase.onAJAXSuccess()");
    },

    /** 
     * Handle an unsuccessful response to any AJAX request.
     * If response is supplied, that indicates that the <i>transport</i> succeeded, but the content
     * of the response indicated a failure.
     * If response is not supplied, that indicates that the transport of the request failed.
	 * This method should not be called directly by clients of the API. 
	 *  
	 * @param response An instance of a subclass of ResponseBase, which represents the response to an AJAX request received from the IC server
     */
    onAJAXFailure: function(response) {
        ININ.Web.Common.Debug.traceMethodEntered("InteractionManagerBase.onAJAXFailure()");

        ININ.Web.Common.Debug.traceNote("InteractionManagerBase.onAJAXFailure calling handleFailedRequest()");
        this._handleFailedRequest(response);

        ININ.Web.Common.Debug.traceNote("InteractionManagerBase.onAJAXFailure calling notifyListenersOfFailure()");
        this.notifyListenersOfFailure(response.get_statusReason());
        ININ.Web.Common.Debug.traceNote("InteractionManagerBase.onAJAXFailure back from notifyListenersOfFailure()");
        ININ.Web.Common.Debug.traceMethodExited("InteractionManagerBase.onAJAXFailure()");
    },

    // private methods

    _handleFailedRequest : function(response)
    {
        ININ.Web.Common.Debug.traceMethodEntered("InteractionManagerBase._handleFailedRequest()");
        if(this._isFailoverCondition(response))
        {
            this._handleFailover();
        }
        else if(this._isInvalidSession(response))
        {
            this._handleInvalidSession(response);
        }
        ININ.Web.Common.Debug.traceMethodExited("InteractionManagerBase._handleFailedRequest()");
    },

    _isFailoverCondition : function(response)
    {
        return !response.isSuccessful() && (response.get_statusReason().get_errorSource() == ININ.Web.Chat.WebServices.ErrorCodes.HTTP);
    },

    _handleFailover : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("InteractionManagerBase._handleFailover()");
        ININ.Web.Common.Debug.traceAlways("InteractionManagerBase._handleFailover: Creating Failover notifications...");

        ININ.Web.Chat.WebServices.NotificationRegistry.processFailoverUINotification(ININ.Web.Chat.WebServices.NotificationFactory.createFailoverUINotification());
        ININ.Web.Chat.WebServices.NotificationRegistry.processFailoverNotification(ININ.Web.Chat.WebServices.NotificationFactory.createFailoverNotification());
        ININ.Web.Common.Debug.traceMethodExited("InteractionManagerBase._handleFailover()");
    },

    _isInvalidSession : function(response)
    {
        var unknownSessionCode = ININ.Web.Chat.WebServices.ErrorCodes.ERROR + "." +
                                 ININ.Web.Chat.WebServices.ErrorCodes.WEBSVC + "." +
                                 ININ.Web.Chat.WebServices.ErrorCodes.UNKNOWNENTITY + "." +
                                 ININ.Web.Chat.WebServices.ErrorCodes.SESSION;
        return !response.isSuccessful() && (response.get_statusReason().get_errorCode() == unknownSessionCode);
    },

    _handleInvalidSession : function(response)
    {
        // Override in subclasses if it is desired for anything to be done.
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * This class is the main brains of working with a queue, but is abstract - use derived class instead
 */
ININ.Web.Chat.WebServices.QueueManagerBase = Class.create(ININ.Web.Chat.WebServices.InteractionManagerBase,
{
	/**
	 * Constructor
	 * 
	 * @param genericResponseBuilder An object to build Response objects (i.e. objects which implement ResponseBase or its subclasses) from the IC server's replies to AJAX requests.
	 * @param capabilityRepository An object to keep track of which Capabilities are enabled or disabled, and provide getter methods for the various Capabilities. 
     * @param failoverHandler An instance of ININ.Web.Chat.WebServices.Json.FailoverHandler 
	 */
    initialize : function($super, genericResponseBuilder, capabilityRepository, failoverHandler)
    {
        ININ.Web.Common.Debug.traceMethodEntered("QueueManagerBase.initialize()");

        var numArgs = 4;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("QueueManagerBase constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

        $super(genericResponseBuilder, capabilityRepository, failoverHandler);
        
        ININ.Web.Common.Debug.traceMethodExited("QueueManagerBase.initialize()");
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
    },

    // public methods

	/**
     * Query the status of a queue.
     * 
     * @param username The username of the person attempting to query a queue 
     * @param userCredentials The password of the person attempting to query a queue (may be empty)
     * @param queueName The name of the queue being queried
     * @param queueType The type of the queue being queried (currently only "Workgroup" is supported)
     */
    queueQuery : function(username, userCredentials, queueName, queueType)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ChatManagerBase.queueQuery()");

        if (userCredentials == null)
        {
            userCredentials = "";
        }

        var anonymousOk = (userCredentials == "") && ININ.Web.Chat.WebServices.CapabilityRepository.isQueueQueryAnonymousAuthenticationCapabilityEnabled();
        var trackerOk = (userCredentials != "") && ININ.Web.Chat.WebServices.CapabilityRepository.isQueueQueryTrackerAuthenticationCapabilityEnabled();

        if (!(anonymousOk || trackerOk))
        {
            ININ.Web.Chat.WebServices.QueueNotificationRegistry.processQueueStatusFailureNotification(ININ.Web.Chat.WebServices.QueueNotificationFactory.createQueueStatusFailureNotification("error.websvc.unsupportedOperation"));
            return;
        }

        // create the queueQuery capability and then query the queue.  The URL is the same regardless of the authentication method.
        var ajax = this.createAjaxManager(this._capabilityRepository.get_queueQueryAnonymousAuthenticationCapability());
        var _self = this;
        ajax.registerSuccessListener(function(response)
        {
            ININ.Web.Common.Debug.traceNote("ChatManagerBase.queueQuery() succeeded: " + response);
            ININ.Web.Chat.WebServices.QueueNotificationRegistry.processQueueStatusNotification(ININ.Web.Chat.WebServices.QueueNotificationFactory.createQueueStatusNotification(response.get_agentsAvailable(), response.get_estimatedWaitTime()));
            _self.onAJAXSuccess(response);
        });
        ajax.registerFailureListener(function(response)
        {
            ININ.Web.Common.Debug.traceError("ChatManagerBase.queueQuery() failed: " + response);
            ININ.Web.Chat.WebServices.QueueNotificationRegistry.processQueueStatusFailureNotification(ININ.Web.Chat.WebServices.QueueNotificationFactory.createQueueStatusFailureNotification(response.get_statusReason()));
            _self.onAJAXFailure(response);
        });

        ajax.sendRequest(this.serializeQueueQueryPostData(username, userCredentials, queueName, queueType));

        ININ.Web.Common.Debug.traceMethodExited("ChatManagerBase.queueQuery()");
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/**
 * QueueQueryResponse class 
 *  
 * When an AJAX request is made to the IC server to query a queue, QueueQueryResponseBuilder 
 * translates the IC server's JSON/XML reply into a QueueQueryResponse. 
 */
ININ.Web.Chat.WebServices.QueueQueryResponse = Class.create(ININ.Web.Chat.WebServices.ResponseBase,
{
	/**
	 * Constructor
	 */
    initialize: function($super)
    {
        ININ.Web.Common.Debug.traceMethodEntered("QueueQueryResponse.initalize()");

        $super();

        this._estimatedWaitTime = null;
        this._agentsAvailable = null;

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IQueueQueryResponse)

        ININ.Web.Common.Debug.traceMethodExited("QueueQueryResponse.initalize()");
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Chat.WebServices.ResponseBase.prototype.destroy.call(this);
    },

    // public methods

    get_agentsAvailable: function()
    {
        return this._agentsAvailable;
    },

    set_agentsAvailable: function(agentsAvailable)
    {
        this._agentsAvailable = agentsAvailable;
    },

    get_estimatedWaitTime: function()
    {
        return this._estimatedWaitTime;
    },

    set_estimatedWaitTime: function(estimatedWaitTime)
    {
        this._estimatedWaitTime = estimatedWaitTime;
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Json._Internal");

/**
 * QueueQueryResponseBuilder class 
 * Handles translating the JSON received as the IC server's reply to an AJAX request for querying a queue
 * into an ININ.Web.Chat.WebServices.QueueQueryResponse object.
 */
ININ.Web.Chat.WebServices.Json._Internal.QueueQueryResponseBuilder = Class.create(ININ.Web.Chat.WebServices.Json.ResponseBuilderBase,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        $super();
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Chat.WebServices.Json.ResponseBuilderBase.prototype.destroy.call(this);
    },

	/**
     * Handles translating the JSON received as the IC servers reply to an AJAX request 
     * into an ININ.Web.Chat.WebServices.QueueQueryResponse object.
	 * 
	 * @param jsonStr JSON received from the IC server.  This should have already been vetted to ensure that is not empty, its status indicates success, etc.  In the default implementation, that is done in GenericResponseBuilder.
	 * @return ININ.Web.Chat.WebServices.QueueQueryResponse
	 */
    buildQueueQueryResponse : function(jsonStr)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.QueueQueryResponseBuilder.buildQueueQueryResponse()");
        ININ.Web.Common.Debug.traceStatus("jsonStr is: " + jsonStr);

        var response = null;

        if (jsonStr)
        {
            response = new ININ.Web.Chat.WebServices.QueueQueryResponse();

            var json = null;
            try
            {
                json = jsonStr.evalJSON();
            }
            catch (e)
            {
                ININ.Web.Common.Debug.traceError("Caught exception calling JSON.parse or string.evalJSON:\n" + e);
                ININ.Web.Common.Debug.alert("Caught exception calling JSON.parse or string.evalJSON:\n" + e);
            }

            if(json.queue)
            {
                response.set_agentsAvailable(json.queue.agentsAvailable);
                response.set_estimatedWaitTime(json.queue.estimatedWaitTime); // seconds

                if(json.queue.status)
                {
                    if(json.queue.status.type)
                    {
                        response.set_statusType(json.queue.status.type);
                    }

                    if(json.queue.status.reason)
                    {
                        var error = null;
                        try
                        {
                            error = new ININ.Web.Chat.WebServices.Error(json.queue.status.reason);
                        }
                        catch(ex)
                        {
                            ININ.Web.Common.Debug.traceError(ex.message);
                            ININ.Web.Common.Debug.traceWarning("Invalid status reason: " + json.chat.status.reason);
                        }

                        if(error)
                        {
                            response.set_statusReason(error);
                        }
                    }
                }
            }
        }

        ININ.Web.Common.Debug.traceMethodExited("Json.QueueQueryResponseBuilder.buildQueueQueryResponse()");

        return response;
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Json");

/**
 * QueueManager class 
 * Extends QueueManagerBase with JSON-specific functionality
 */
ININ.Web.Chat.WebServices.Json.QueueManager = Class.create(ININ.Web.Chat.WebServices.QueueManagerBase,
{
	/**
	 * Constructor
	 * 
	 * @param genericResponseBuilder An instance of GenericResponseBuilder, to turn the JSON received from the IC server into a ResponseBase or subclass thereof
	 * @param capabilityRepository An instance of CapabilityRepository, in which the capabilities are stored.
     * @param failoverHandler An instance of ININ.Web.Chat.WebServices.Json.FailoverHandler 
	 */
    initialize: function($super, genericResponseBuilder, capabilityRepository, failoverHandler)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.QueueManager.initialize()");

        $super(genericResponseBuilder, capabilityRepository, failoverHandler);

        ININ.Web.Common.Debug.traceMethodExited("Json.QueueManager.initialize()");
    },

    // public methods

    /** 
     * Gets an JSON-specific instance of ININ.Web.Chat.WebServices.AjaxManagerBase
	 * This method should not be called directly by clients of the API. 
	 *  
	 * @param capability A Capability object representing what this AjaxManager object is intended to do (i.e. poll, send a message, etc.) 
	 * @return AjaxManager 
     */
    createAjaxManager : function(capability)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.QueueManager.createAjaxManager()");
        var mgr = new ININ.Web.Chat.WebServices.Json.AjaxManager(this._genericResponseBuilder, capability);
        ININ.Web.Common.Debug.traceMethodExited("Json.QueueManager.createAjaxManager()");
        return mgr;
    },

	/**
     * Takes data necessary to query a queue, and puts it into the appropriate JSON format for sending to the IC server.
	 * @param username The username of the person attempting to query a queue
	 * @param password The password of the person attempting to query a queue
     * @param queueName The name of the queue being queried
     * @param queueType The type of the queue being queried (currently only "Workgroup" is supported)
     */
    serializeQueueQueryPostData : function(username, password, queueName, queueType)
    {
        var json = { };
        
        json.queueName = queueName;
        json.queueType = queueType;
        json.participant = { };
        json.participant.username = username;
        json.participant.password = password;

        return Object.toJSON(json);
    }
});

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.QueueServicesInitialization");

/**
 * Create objects necessary for querying the queue
 * 
 * @param currentUriFragment The URI fragment currently in use to reverse proxy to the IC server.  See Servers class.
 * @param uriFragments The set of URI fragments that are used to reverse proxy to the IC server(s).  See Servers class.
 * @param useHttps If true, AJAX requests will be made via HTTPS.  If false, they will be made via HTTP.
 */
ININ.Web.Chat.WebServices.QueueServicesInitialization.initialize = function(currentUriFragment, uriFragments, useHttps)
{
    // create singletons
    ININ.Web.Chat.WebServices.QueueNotificationRegistry = new ININ.Web.Chat.WebServices._Internal._QueueNotificationRegistry();
    ININ.Web.Chat.WebServices.CapabilityRepository = new ININ.Web.Chat.WebServices._Internal._CapabilityRepository();
    ININ.Web.Chat.WebServices.Json.GenericResponseBuilder = new ININ.Web.Chat.WebServices.Json._Internal.GenericResponseBuilder(
                                    null,
                                    null,
                                    null,
                                    new ININ.Web.Chat.WebServices.Json._Internal.ServerConfigurationResponseBuilder(),
                                    null,
                                    new ININ.Web.Chat.WebServices.Json._Internal.QueueQueryResponseBuilder());
    ININ.Web.Chat.WebServices.Json.ServerConfigurationProcessor = new ININ.Web.Chat.WebServices.Json._Internal.ServerConfigurationProcessor(ININ.Web.Chat.WebServices.CapabilityRepository, ININ.Web.Chat.WebServices.Json.FailoverHandler);
    ININ.Web.Chat.WebServices.Json.ServerConfigurationManager = new ININ.Web.Chat.WebServices.Json._Internal._ServerConfigurationManager(ININ.Web.Chat.WebServices.Json.GenericResponseBuilder, ININ.Web.Chat.WebServices.CapabilityRepository, ININ.Web.Chat.WebServices.Json.ServerConfigurationProcessor);

    // Set up protocol/servers
    ININ.Web.Chat.WebServices.Servers.UriFragments = uriFragments;
    ININ.Web.Chat.WebServices.Servers.UseHttps = (useHttps == true);

    // use the server as the current uri fragment if it's specified in the query string, else use the one loaded from the page
    var server = ININ.Web.Common.Utilities.getQueryStringValue("server");
    if(server)
    {
        ININ.Web.Chat.WebServices.Servers.CurrentUriFragment = server;
    }
    else
    {
        ININ.Web.Chat.WebServices.Servers.CurrentUriFragment = currentUriFragment;
    }

    // Factories which can be overridden for customization
    ININ.Web.Chat.WebServices.CustomizationFactoryRegistry = new ININ.Web.Chat.WebServices._Internal._CustomizationFactoryRegistry();
    ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.registerSingletonFactory(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.RetryCounts, new ININ.Web.Chat.Customizations.RetryCountsFactory());
};

ININ.Web.Chat.WebServices.QueueServicesInitialization.uninitialize = function()
{
};

/**
 * Clean up objects used by the queue.
 */
ININ.Web.Chat.WebServices.QueueServicesInitialization.destroy = function()
{
};

ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");
/**
 * This class provides the entry point for customers who wish to provide queue querying
 * on their pages without doing heavy customization. 
 * This can be used by: 
 * var uriFragments = [ "/i3root/Server1", "/i3root/Server2"]; // Or just the first if not using switchover 
 * var currentUriFragment = uriFragments[0]; 
 * var useHttps = true; // Or false, depending on whether the page is access via HTTPS or HTTP
 * var queueQueryer = new ININ.Web.Chat.WebServices.EasyQueueQueryer(currentUriFragment, uriFragments, useHttps);
 * queueQueryer.getQueueInfo(queueName, userId, userCredentials); 
 *  
 * The caller should also register for QueueStatusNotification and QueueStatusFailureNotification. 
 */
ININ.Web.Chat.WebServices.EasyQueueQueryer = Class.create(
{
    initialize: function(currentUriFragment, uriFragments, useHttps)
    {
        this._currentUriFragment = currentUriFragment;
        this._uriFragments = uriFragments;
        this._useHttps = useHttps;
        this._numServerConfigRequestFailovers = 0;
        ININ.Web.Chat.WebServices.QueueServicesInitialization.initialize(this._currentUriFragment, this._uriFragments, this._useHttps);
    },

    /**
     * This method allows you to query the status of an ACD queue. 
     *  
     * @param queueName The name of the ACD queue to query, i.e. "Marketing" 
     * @param userId The user id (in Tracker) of the user who is doing the querying.  For an anonymous user, any string may be passed, such as "Anonymous User".
     * @param userCredentials The credentials (i.e. password) of the user who is doing the querying.  For an anonymous user, pass "".
     */
    getQueueInfo: function(queueName, userId, userCredentials)
    {
        ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat");
        // ServerConfigurationManager expects a callback function that it can just pass (success, failureReason).
        // But the implementation below may need (queueName, userId, userCredentials) also, if it has
        // to fail over.  So, create a closure to give _serverConfigurationCallback() all 5 args that it needs without
        // bothering getServerConfiguration()
        ININ.Web.Chat.WebServices.Json.ServerConfigurationManager.getServerConfiguration(this._serverConfigurationCallback.bind(this, userId, userCredentials, queueName));
    },

    _serverConfigurationCallback : function(userId, userCredentials, queueName, success, failureReason)
    {
        if (success)
        {
            var queueMgr = new ININ.Web.Chat.WebServices.Json.QueueManager(
                                   ININ.Web.Chat.WebServices.Json.GenericResponseBuilder,
                                   ININ.Web.Chat.WebServices.CapabilityRepository,
                                   ININ.Web.Chat.WebServices.Json.FailoverHandler);
            queueMgr.queueQuery(userId, userCredentials, queueName, "Workgroup");
        } else
        {
            if (this._shouldSwitchoverAndTryToGetServerConfigurationAgain())
            {
                ININ.Web.Common.Debug.traceStatus("Going to switch over, and try again to obtain server configuration.");
                ININ.Web.Chat.WebServices.Servers.switchCurrentServer();
                this._numServerConfigRequestFailovers++;
                ININ.Web.Chat.WebServices.Json.ServerConfigurationManager.getServerConfiguration(this._serverConfigurationCallback.bind(this, userId, userCredentials, queueName));
            } else
            {
                ININ.Web.Chat.WebServices.QueueNotificationRegistry.processQueueStatusFailureNotification(ININ.Web.Chat.WebServices.QueueNotificationFactory.createQueueStatusFailureNotification(failureReason.get_errorCode()));
            }
        }
    },

    _shouldSwitchoverAndTryToGetServerConfigurationAgain : function()
    {
        if (!ININ.Web.Chat.WebServices.Servers.isConfiguredForSwitchover())
        {
            // In this case, the retry logic was already handled
            // in AjaxManagerBase._shouldRequestBeRetriedBasedOnMessageTypeAndRetryCount().
            return false;
        }

        // Adding 1 because retryCounts maintains the number of times to REtry.  So, for instance,
        // initial try + 3 retries = 4 total tries.
        var retryCounts = ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.RetryCounts);
        var numTimesToTry = ININ.Web.Chat.WebServices.Servers.get_numberOfServers() *
                            (1 + retryCounts.get_serverConfigurationRetries());

        return (this._numServerConfigRequestFailovers < numTimesToTry);
    }
});

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Interfaces");

/**
 * ISequenceable interface 
 * Provides methods: get_sequenceNumber(), get_dateTime() 
 */
ININ.Web.Chat.WebServices.Interfaces.ISequenceable = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ISequenceable', ['get_sequenceNumber', 'get_dateTime']);

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Interfaces");

/**
 * IEvent interface, derived from ISequenceable 
 * Provides method: get_participantId()
 */
ININ.Web.Chat.WebServices.Interfaces.IEvent = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IEvent', ['get_participantId'], ['ININ.Web.Chat.WebServices.Interfaces.ISequenceable']);

// IEvent derived interfaces

/**
 * IParticipantStateChangedEvent interface, derived from IEvent
 * Provides additional methods: get_participantName(), get_state()
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantStateChangedEvent = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantStateChangedEvent', ['get_participantName', 'get_state'], ['ININ.Web.Chat.WebServices.Interfaces.IEvent']);

/**
 * IParticipantSetTypingEvent interface, derived from IEvent
 * Provides additional methods: get_isTyping()
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantSetTypingEvent = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantSetTypingEvent', ['get_isTyping'], ['ININ.Web.Chat.WebServices.Interfaces.IEvent']);

/**
 * IReceivedTextEvent interface, derived from IEvent
 * Provides additional methods: get_messageText()
 */
ININ.Web.Chat.WebServices.Interfaces.IReceivedTextEvent = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IReceivedTextEvent', ['get_messageText'], ['ININ.Web.Chat.WebServices.Interfaces.IEvent']);

/**
 * IReceivedCommandEvent interface, derived from IEvent
 * Provides additional methods: get_command()
 */
ININ.Web.Chat.WebServices.Interfaces.IReceivedCommandEvent = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IReceivedCommandEvent', ['get_command'], ['ININ.Web.Chat.WebServices.Interfaces.IEvent']);

/**
 * IReceivedUrlEvent interface, derived from IEvent
 * Provides additional methods: get_messageUrl()
 */
ININ.Web.Chat.WebServices.Interfaces.IReceivedUrlEvent = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IReceivedUrlEvent', ['get_messageUrl'], ['ININ.Web.Chat.WebServices.Interfaces.IEvent']);

/**
 * IReceivedFileEvent interface, derived from IEvent
 * Provides additional methods: get_messageRelativeUrl()
 */
ININ.Web.Chat.WebServices.Interfaces.IReceivedFileEvent = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IReceivedFileEvent', ['get_messageRelativeUrl'], ['ININ.Web.Chat.WebServices.Interfaces.IEvent']);

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Interfaces");

// INotification derived interfaces

/**
 * IParticipantNotification interface, derived from INotification 
 * Provides additional methods: get_participantId(), get_dateTime(), get_isTimedOut(), set_isTimedOut()
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantNotification', ['get_participantId', 'get_dateTime', 'get_isTimedOut', 'set_isTimedOut'], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);

/**
 * IFailoverNotification interface, derived from INotification 
 * Provides additional methods: none
 */
ININ.Web.Chat.WebServices.Interfaces.IFailoverNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IFailoverNotification', [], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);

/**
 * IFailoverUINotification interface, derived from INotification 
 * Provides additional methods: none
 */
ININ.Web.Chat.WebServices.Interfaces.IFailoverUINotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IFailoverUINotification', [], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);

/**
 * IChatReconnectNotification interface, derived from INotification 
 * Provides additional methods: none
 */
ININ.Web.Chat.WebServices.Interfaces.IChatReconnectNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IChatReconnectNotification', [], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);


/**
 * IResumedPollingNotification interface, derived from INotification 
 * Provides additional methods: none 
 *  
 * There is no "IStoppedPollingNotification", because IFailoverNotification servers this purpose.  The sequence will be: 
 * IFailoverNotification indicates that connectivity to the server has been lost. 
 * IReconnectNotification indicates that a server configuration request has completed successfully. 
 * IResumedPollingNotification indicates that the in-progress chat (if any) is polling again. 
 * If network connectivity has been lost for long enough that the server has purged the chat, then IResumedPollingNotification will not be sent. 
 *  
 */
ININ.Web.Chat.WebServices.Interfaces.IResumedPollingNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IResumedPollingNotification', [], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);

/**
 * IChatReconnectFailureNotification interface, derived from INotification 
 * Provides additional methods: none
 */
ININ.Web.Chat.WebServices.Interfaces.IChatReconnectFailureNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IChatReconnectFailureNotification', [], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);

/**
 * IRefreshPageNotification interface, derived from INotification 
 * Provides additional methods: get_newUriFragment()
 */
ININ.Web.Chat.WebServices.Interfaces.IRefreshPageNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IRefreshPageNotification', ['get_newUriFragment'], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);

// IParticipantNotification derived interfaces

/**
 * INewParticipantNotification interface, derived from IParticipantNotification 
 * Provides additional methods: get_participantName(), get_interactionType()
 */
ININ.Web.Chat.WebServices.Interfaces.INewParticipantNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.INewParticipantNotification', ['get_participantName', 'get_interactionType'], ['ININ.Web.Chat.WebServices.Interfaces.IParticipantNotification']);

/**
 * IParticipantJoinedNotification interface, derived from IParticipantNotification 
 * Provides additional methods: get_participantName()
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantJoinedNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantJoinedNotification', ['get_participantName'], ['ININ.Web.Chat.WebServices.Interfaces.IParticipantNotification']);

/**
 * IParticipantLeftNotification interface, derived from IParticipantNotification 
 * Provides additional methods: none
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantLeftNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantLeftNotification', [], ['ININ.Web.Chat.WebServices.Interfaces.IParticipantNotification']);

/**
 * IParticipantNameChangedNotification interface, derived from IParticipantNotification 
 * Provides additional methods: get_newParticipantName()
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantNameChangedNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantNameChangedNotification', ['get_newParticipantName'], ['ININ.Web.Chat.WebServices.Interfaces.IParticipantNotification']);

/**
 * IParticipantInitializingNotification interface, derived from IParticipantNotification 
 * Provides additional methods: get_participantName()
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantInitializingNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantInitializingNotification', ['get_participantName'], ['ININ.Web.Chat.WebServices.Interfaces.IParticipantNotification']);

/**
 * IParticipantAlertingNotification interface, derived from IParticipantNotification 
 * Provides additional methods: get_participantName()
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantAlertingNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantAlertingNotification', ['get_participantName'], ['ININ.Web.Chat.WebServices.Interfaces.IParticipantNotification']);

/**
 * IParticipantActiveNotification interface, derived from IParticipantNotification 
 * Provides additional methods: none
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantActiveNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantActiveNotification', [], ['ININ.Web.Chat.WebServices.Interfaces.IParticipantNotification']);

/**
 * IParticipantHeldNotification interface, derived from IParticipantNotification 
 * Provides additional methods: none
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantHeldNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantHeldNotification', [], ['ININ.Web.Chat.WebServices.Interfaces.IParticipantNotification']);

/**
 * IParticipantVoicemailNotification interface, derived from IParticipantNotification 
 * Provides additional methods: none
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantVoicemailNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantVoicemailNotification', [], ['ININ.Web.Chat.WebServices.Interfaces.IParticipantNotification']);

/**
 * IParticipantDisconnectedNotification interface, derived from IParticipantNotification 
 * Provides additional methods: none
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantDisconnectedNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantDisconnectedNotification', [], ['ININ.Web.Chat.WebServices.Interfaces.IParticipantNotification']);

/**
 * IParticipantStartedTypingNotification interface, derived from IParticipantNotification 
 * Provides additional methods: none
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantStartedTypingNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantStartedTypingNotification', [], ['ININ.Web.Chat.WebServices.Interfaces.IParticipantNotification']);

/**
 * IParticipantStoppedTypingNotification interface, derived from IParticipantNotification 
 * Provides additional methods: none
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantStoppedTypingNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantStoppedTypingNotification', [], ['ININ.Web.Chat.WebServices.Interfaces.IParticipantNotification']);

/**
 * IReceivedTextNotification interface, derived from IParticipantNotification 
 * Provides additional methods: get_messageText()
 */
ININ.Web.Chat.WebServices.Interfaces.IReceivedTextNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IReceivedTextNotification', ['get_messageText'], ['ININ.Web.Chat.WebServices.Interfaces.IParticipantNotification']);

/**
 * IReceivedCommandNotification interface, derived from IParticipantNotification 
 * Provides additional methods: get_command()
 */
ININ.Web.Chat.WebServices.Interfaces.IReceivedCommandNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IReceivedCommandNotification', ['get_command'], ['ININ.Web.Chat.WebServices.Interfaces.IParticipantNotification']);

/**
 * IReceivedUrlNotification interface, derived from IParticipantNotification 
 * Provides additional methods: get_messageUrl()
 */
ININ.Web.Chat.WebServices.Interfaces.IReceivedUrlNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IReceivedUrlNotification', ['get_messageUrl'], ['ININ.Web.Chat.WebServices.Interfaces.IParticipantNotification']);

/**
 * IReceivedFileNotification interface, derived from IParticipantNotification 
 * Provides additional methods: get_messageRelativeUrl()
 */
ININ.Web.Chat.WebServices.Interfaces.IReceivedFileNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IReceivedFileNotification', ['get_messageRelativeUrl'], ['ININ.Web.Chat.WebServices.Interfaces.IParticipantNotification']);

/**
 * ICurrentParticipantIdChangedNotification interface, derived from IParticipantNotification 
 * Provides additional methods: none
 */
ININ.Web.Chat.WebServices.Interfaces.ICurrentParticipantIdChangedNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICurrentParticipantIdChangedNotification', [], ['ININ.Web.Chat.WebServices.Interfaces.IParticipantNotification']);

/**
 * IPageNotification interface, derived from INotification 
 * Provides additional methods: none
 */
ININ.Web.Chat.WebServices.Interfaces.IPageNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IPageNotification', [], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);

/**
 * IPageUnloadNotification interface, derived from IPageNotification 
 * Provides additional methods: none
 */
ININ.Web.Chat.WebServices.Interfaces.IPageUnloadNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IPageUnloadNotification', [], ['ININ.Web.Chat.WebServices.Interfaces.IPageNotification']);

/**
 * IPageBeforeUnloadNotification interface, derived from IPageNotification 
 * Provides additional methods: none
 */
ININ.Web.Chat.WebServices.Interfaces.IPageBeforeUnloadNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IPageBeforeUnloadNotification', [], ['ININ.Web.Chat.WebServices.Interfaces.IPageNotification']);

/**
 * IChatCreationNotification interface, derived from INotification 
 * Provides additional methods: get_currentParticipantId(), get_dateFormat(), get_timeFormat()
 */
ININ.Web.Chat.WebServices.Interfaces.IChatCreationNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IChatCreationNotification', [ 'get_currentChatId', 'get_currentParticipantId', 'get_dateFormat', 'get_timeFormat' ], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);

/**
 * IChatCreationFailureNotification interface, derived from INotification 
 * Provides additional methods: get_error()
 */
ININ.Web.Chat.WebServices.Interfaces.IChatCreationFailureNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IChatCreationFailureNotification', [ 'get_error' ], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);

/**
 * IChatCompletionNotification interface, derived from INotification 
 * Provides additional methods: none
 */
ININ.Web.Chat.WebServices.Interfaces.IChatCompletionNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IChatCompletionNotification', [], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);


/**
 * IChatCompletionFailureNotification interface, derived from INotification 
 * Provides additional methods: get_error()
 */
ININ.Web.Chat.WebServices.Interfaces.IChatCompletionFailureNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IChatCompletionFailureNotification', [ 'get_error' ], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);

/**
 * ICallbackCreationNotification interface, derived from INotification 
 * Provides additional methods: get_participantId(), get_callbackId(), get_userIdentityId(), get_participantName(), get_telephone(), get_subject(), get_creationDateTime()
 */
ININ.Web.Chat.WebServices.Interfaces.ICallbackCreationNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICallbackCreationNotification', [ 'get_participantId', 'get_callbackId', 'get_userIdentityId', 'get_participantName', 'get_telephone', 'get_subject', 'get_creationDateTime' ], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);

/**
 * ICallbackCreationFailureNotification interface, derived from INotification 
 * Provides additional methods: get_error()
 */
ININ.Web.Chat.WebServices.Interfaces.ICallbackCreationFailureNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICallbackCreationFailureNotification', [ 'get_error' ], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);

/**
 * IChatReconnectUINotification interface, derived from INotification 
 * Provides additional methods: none
 */
ININ.Web.Chat.WebServices.Interfaces.IChatReconnectUINotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IChatReconnectUINotification', [], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);


/**
 * ICallbackStatusNotification interface, derived from INotification 
 * Provides additional methods: get_participantId(), get_queueWaitTime(), get_assignedAgentName(), get_assignedAgentParticipantId(), get_interactionState(), get_estimatedCallbackTime(), get_queuePosition(), get_queueName(), get_longestWaitTime(), get_interactionsWaitingCount(), get_loggedInAgentsCount(), get_availableAgentsCount(), get_statusIndicator()
 */
ININ.Web.Chat.WebServices.Interfaces.ICallbackStatusNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICallbackStatusNotification', [ 'get_participantId', 'get_queueWaitTime', 'get_assignedAgentName', 'get_assignedAgentParticipantId', 'get_interactionState', 'get_estimatedCallbackTime', 'get_queuePosition', 'get_queueName', 'get_longestWaitTime', 'get_interactionsWaitingCount', 'get_loggedInAgentsCount', 'get_availableAgentsCount', 'get_statusIndicator' ], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);

/**
 * ICallbackStatusFailureNotification interface, derived from INotification 
 * Provides additional methods: get_error()
 */
ININ.Web.Chat.WebServices.Interfaces.ICallbackStatusFailureNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICallbackStatusFailureNotification', [ 'get_error' ], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);

/**
 * ICallbackReconnectNotification interface, derived from INotification 
 * Provides additional method: get_participantId()
 */
ININ.Web.Chat.WebServices.Interfaces.ICallbackReconnectNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICallbackReconnectNotification', ['get_participantId'], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);

/**
 * ICallbackReconnectFailureNotification interface, derived from INotification 
 * Provides additional method: get_error()
 */
ININ.Web.Chat.WebServices.Interfaces.ICallbackReconnectFailureNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICallbackReconnectFailureNotification', ['get_error'], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);

/**
 * ICallbackDisconnectNotification interface, derived from INotification 
 * Provides additional methods: get_participantId() 
 */
ININ.Web.Chat.WebServices.Interfaces.ICallbackDisconnectNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICallbackDisconnectNotification', [ 'get_participantId' ], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);

/**
 * ICallbackDisconnectFailureNotification interface, derived from INotification 
 * Provides additional methods: get_error()
 */
ININ.Web.Chat.WebServices.Interfaces.ICallbackDisconnectFailureNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICallbackDisconnectFailureNotification', [ 'get_error' ], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);

/**
 * IPartyInfoNotification interface, derived from INotification 
 * Provides additional methods: get_name(), get_photo(), get_localParticipantId(), get_remoteParticipantId()
 */
ININ.Web.Chat.WebServices.Interfaces.IPartyInfoNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IPartyInfoNotification', ['get_name', 'get_photo', 'get_localParticipantId', 'get_remoteParticipantId'], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);

/**
 * IPartyInfoFailureNotification interface, derived from INotification 
 * Provides additional methods: get_error()
 */
ININ.Web.Chat.WebServices.Interfaces.IPartyInfoFailureNotification = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IPartyInfoFailureNotification', ['get_error'], ['ININ.Web.Chat.WebServices.Interfaces.INotification']);


/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Interfaces");

/**
 * INotificationFactory interface 
 * Provides methods:  createCurrentParticipantIdChangedNotification(), createParticipantJoinedNotification(), 
 * createParticipantLeftNotification(), createNewParticipantNotification(), 
 * createNewParticipantNotificationForChat(), 
 * createParticipantNameChangedNotification(), createParticipantInitializingNotification(), 
 * createParticipantAlertingNotification(), createParticipantActiveNotification(), 
 * createParticipantHeldNotification(), createParticipantVoicemailNotification(), 
 * createParticipantDisconnectedNotification(), createParticipantStartedTypingNotification(), 
 * createParticipantStoppedTypingNotification(), createReceivedTextNotification(), 
 * createReceivedCommandNotification(), createReceivedUrlNotification(), 
 * createReceivedFileNotification(), createFailoverNotification(), 
 * createFailoverUINotification(), createChatReconnectNotification(), createChatReconnectUINotification(),
 * createResumedPollingNotification(),
 * createChatReconnectFailureNotification(), createRefreshPageNotification(), 
 * createPageBeforeUnloadNotification(), createPageUnloadNotification(), 
 * createChatCreationNotification(), createChatCreationFailureNotification(), 
 * createChatCompletionNotification(), createChatCompletionFailureNotification(), 
 * createCallbackCreationNotification(), createCallbackCreationFailureNotification(), 
 * createCallbackStatusNotification(), createCallbackStatusFailureNotification(), 
 * createCallbackDisconnectNotification(), createCallbackDisconnectFailureNotification(), 
 * createCallbackReconnectNotification(), createCallbackReconnectFailureNotification(), 
 * createPartyInfoNotification(), createPartyInfoFailureNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.INotificationFactory = new ININ.Web.Common.Interface(
    'ININ.Web.Chat.WebServices.Interfaces.INotificationFactory',
    ['createCurrentParticipantIdChangedNotification',
     'createParticipantJoinedNotification',
     'createParticipantLeftNotification',
     'createNewParticipantNotification',
     'createNewParticipantNotificationForChat',
     'createParticipantNameChangedNotification',
     'createParticipantInitializingNotification',
     'createParticipantAlertingNotification',
     'createParticipantActiveNotification',
     'createParticipantHeldNotification',
     'createParticipantVoicemailNotification',
     'createParticipantDisconnectedNotification',
     'createParticipantStartedTypingNotification',
     'createParticipantStoppedTypingNotification',
     'createReceivedTextNotification',
     'createReceivedCommandNotification',
     'createReceivedUrlNotification',
     'createReceivedFileNotification',
     'createFailoverNotification',
     'createFailoverUINotification',
     'createChatReconnectNotification',
     'createResumedPollingNotification',
     'createChatReconnectUINotification',
     'createChatReconnectFailureNotification',
     'createRefreshPageNotification',
     'createPageBeforeUnloadNotification',
     'createPageUnloadNotification',
     'createChatCreationNotification',
     'createChatCreationFailureNotification',
     'createChatCompletionNotification',
     'createChatCompletionFailureNotification',
     'createCallbackCreationNotification',
     'createCallbackCreationFailureNotification',
     'createCallbackStatusNotification',
     'createCallbackStatusFailureNotification',
     'createCallbackDisconnectNotification',
     'createCallbackDisconnectFailureNotification',
     'createCallbackReconnectNotification',
     'createCallbackReconnectFailureNotification',
     'createPartyInfoNotification',
     'createPartyInfoFailureNotification'
    ]);

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Interfaces");

// Notification Observer interfaces

/**
 * ICurrentParticipantIdChangedNotificationObserver interface 
 * Provides methods: processCurrentParticipantIdChangedNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.ICurrentParticipantIdChangedNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICurrentParticipantIdChangedNotificationObserver', ['processCurrentParticipantIdChangedNotification']);

/**
 * INewParticipantNotificationObserver interface 
 * Provides methods: processNewParticipantNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.INewParticipantNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.INewParticipantNotificationObserver', ['processNewParticipantNotification']);

/**
 * IParticipantJoinedNotificationObserver interface 
 * Provides methods: processParticipantJoinedNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantJoinedNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantJoinedNotificationObserver', ['processParticipantJoinedNotification']);

/**
 * IParticipantLeftNotificationObserver interface 
 * Provides methods: processParticipantLeftNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantLeftNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantLeftNotificationObserver', ['processParticipantLeftNotification']);

/**
 * IParticipantNameChangedNotificationObserver interface 
 * Provides methods: processParticipantNameChangedNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantNameChangedNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantNameChangedNotificationObserver', ['processParticipantNameChangedNotification']);

/**
 * IParticipantInitializingNotificationObserver interface 
 * Provides methods: processParticipantInitializingNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantInitializingNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantInitializingNotificationObserver', ['processParticipantInitializingNotification']);

/**
 * IParticipantAlertingNotificationObserver interface 
 * Provides methods: processParticipantAlertingNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantAlertingNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantAlertingNotificationObserver', ['processParticipantAlertingNotification']);

/**
 * IParticipantActiveNotificationObserver interface 
 * Provides methods: processParticipantActiveNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantActiveNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantActiveNotificationObserver', ['processParticipantActiveNotification']);

/**
 * IParticipantHeldNotificationObserver interface 
 * Provides methods: processParticipantHeldNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantHeldNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantHeldNotificationObserver', ['processParticipantHeldNotification']);

/**
 * IParticipantVoicemailNotificationObserver interface 
 * Provides methods: processParticipantVoicemailNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantVoicemailNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantVoicemailNotificationObserver', ['processParticipantVoicemailNotification']);

/**
 * IParticipantDisconnectedNotificationObserver interface 
 * Provides methods: processParticipantDisconnectedNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantDisconnectedNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantDisconnectedNotificationObserver', ['processParticipantDisconnectedNotification']);

/**
 * IParticipantStartedTypingNotificationObserver interface 
 * Provides methods: processParticipantStartedTypingNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantStartedTypingNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantStartedTypingNotificationObserver', ['processParticipantStartedTypingNotification']);

/**
 * IParticipantStoppedTypingNotificationObserver interface 
 * Provides methods: processParticipantStoppedTypingNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantStoppedTypingNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantStoppedTypingNotificationObserver', ['processParticipantStoppedTypingNotification']);

/**
 * IReceivedTextNotificationObserver interface 
 * Provides methods: processReceivedTextNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IReceivedTextNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IReceivedTextNotificationObserver', ['processReceivedTextNotification']);

/**
 * IReceivedCommandNotificationObserver interface 
 * Provides methods: processReceivedCommandNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IReceivedCommandNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IReceivedCommandNotificationObserver', ['processReceivedCommandNotification']);

/**
 * IReceivedUrlNotificationObserver interface 
 * Provides methods: processReceivedUrlNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IReceivedUrlNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IReceivedUrlNotificationObserver', ['processReceivedUrlNotification']);

/**
 * IReceivedFileNotificationObserver interface 
 * Provides methods: processReceivedFileNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IReceivedFileNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IReceivedFileNotificationObserver', ['processReceivedFileNotification']);

/**
 * IFailoverNotificationObserver interface 
 * Provides methods: processFailoverNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IFailoverNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IFailoverNotificationObserver', ['processFailoverNotification']);

/**
 * IFailoverUINotificationObserver interface 
 * Provides methods: processFailoverUINotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IFailoverUINotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IFailoverUINotificationObserver', ['processFailoverUINotification']);

/**
 * IChatReconnectUINotificationObserver interface 
 * Provides methods: processChatReconnectUINotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IChatReconnectUINotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IChatReconnectUINotificationObserver', ['processChatReconnectUINotification']);

/**
 * IResumedPollingNotificationObserver interface 
 * Provides methods: processResumedPollingNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IResumedPollingNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IResumedPollingNotificationObserver', ['processResumedPollingNotification']);

/**
 * IChatReconnectNotificationObserver interface 
 * Provides methods: processChatReconnectNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IChatReconnectNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IChatReconnectNotificationObserver', ['processChatReconnectNotification']);

/**
 * IChatReconnectFailureNotificationObserver interface 
 * Provides methods: processChatReconnectFailureNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IChatReconnectFailureNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IChatReconnectFailureNotificationObserver', ['processChatReconnectFailureNotification']);

/**
 * IRefreshPageNotificationObserver interface 
 * Provides methods: processRefreshPageNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IRefreshPageNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IRefreshPageNotificationObserver', ['processRefreshPageNotification']);

/**
 * IPageBeforeUnloadNotificationObserver interface 
 * Provides methods: processPageBeforeUnloadNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IPageBeforeUnloadNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IPageBeforeUnloadNotificationObserver', ['processPageBeforeUnloadNotification']);

/**
 * IPageUnloadNotificationObserver interface 
 * Provides methods: processPageUnloadNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IPageUnloadNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IPageUnloadNotificationObserver', ['processPageUnloadNotification']);

/**
 * IChatCreationNotificationObserver interface 
 * Provides methods: processChatCreationNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IChatCreationNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IChatCreationNotificationObserver', ['processChatCreationNotification']);

/**
 * IChatCreationFailureNotificationObserver interface 
 * Provides methods: processChatCreationFailureNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IChatCreationFailureNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IChatCreationFailureNotificationObserver', ['processChatCreationFailureNotification']);

/**
 * IChatCompletionNotificationObserver interface 
 * Provides methods: processChatCompletionNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IChatCompletionNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IChatCompletionNotificationObserver', ['processChatCompletionNotification']);

/**
 * IChatCompletionFailureNotificationObserver interface 
 * Provides methods: processChatCompletionFailureNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IChatCompletionFailureNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IChatCompletionFailureNotificationObserver', ['processChatCompletionFailureNotification']);

/**
 * ICallbackCreationNotificationObserver interface 
 * Provides methods: processCallbackCreationNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.ICallbackCreationNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICallbackCreationNotificationObserver', ['processCallbackCreationNotification']);

/**
 * ICallbackCreationFailureNotificationObserver interface 
 * Provides methods: processCallbackCreationFailureNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.ICallbackCreationFailureNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICallbackCreationFailureNotificationObserver', ['processCallbackCreationFailureNotification']);

/**
 * ICallbackStatusNotificationObserver interface 
 * Provides methods: processCallbackStatusNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.ICallbackStatusNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICallbackStatusNotificationObserver', ['processCallbackStatusNotification']);

/**
 * ICallbackStatusFailureNotificationObserver interface 
 * Provides methods: processCallbackStatusFailureNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.ICallbackStatusFailureNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICallbackStatusFailureNotificationObserver', ['processCallbackStatusFailureNotification']);

/**
 * ICallbackDisconnectNotificationObserver interface 
 * Provides methods: processCallbackDisconnectNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.ICallbackDisconnectNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICallbackDisconnectNotificationObserver', ['processCallbackDisconnectNotification']);

/**
 * ICallbackDisconnectFailureNotificationObserver interface 
 * Provides methods: processCallbackDisconnectFailureNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.ICallbackDisconnectFailureNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICallbackDisconnectFailureNotificationObserver', ['processCallbackDisconnectFailureNotification']);

/**
 * ICallbackReconnectNotificationObserver interface 
 * Provides methods: processCallbackReconnectNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.ICallbackReconnectNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICallbackReconnectNotificationObserver', ['processCallbackReconnectNotification']);

/**
 * ICallbackReconnectFailureNotificationObserver interface 
 * Provides methods: processCallbackReconnectFailureNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.ICallbackReconnectFailureNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ICallbackReconnectFailureNotificationObserver', ['processCallbackReconnectFailureNotification']);

/**
 * IPartyInfoNotificationObserver interface 
 * Provides methods: processPartyInfoNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IPartyInfoNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IPartyInfoNotificationObserver', ['processPartyInfoNotification']);

/**
 * IPartyInfoFailureNotificationObserver interface 
 * Provides methods: processPartyInfoFailureNotification()
 */
ININ.Web.Chat.WebServices.Interfaces.IPartyInfoFailureNotificationObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IPartyInfoFailureNotificationObserver', ['processPartyInfoFailureNotification']);


/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Interfaces");

// Chat Property Update Observer interfaces

/**
 * IPollWaitSuggestionUpdateObserver interface 
 * Provides method: processPollWaitSuggestionUpdate()
 */
ININ.Web.Chat.WebServices.Interfaces.IPollWaitSuggestionUpdateObserver = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IPollWaitSuggestionUpdateObserver', ['processPollWaitSuggestionUpdate']);

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Interfaces");

/**
 * IParticipant interface 
 * Provides methods: get_id(), get_name(), get_interactionType(), get_photo(), set_photo()
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipant = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipant', ['get_id', 'get_name', 'get_interactionType', 'get_photo', 'set_photo']);

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Interfaces");

/**
 * IParticipantRepository interface 
 * Provides methods: get_currentParticipantId(), addParticipant(), removeParticipant(), changeParticipantName(), markParticipantAsActive(), markParticipantAsInactive(), get_participants(), get_participant(), reset()
 */
ININ.Web.Chat.WebServices.Interfaces.IParticipantRepository = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IParticipantRepository', ['get_currentParticipantId', 'addParticipant', 'removeParticipant', 'changeParticipantName', 'markParticipantAsActive', 'markParticipantAsInactive', 'get_participants', 'get_participant', 'reset']);

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Interfaces");

/**
 * IMessageData interface 
 * Provides methods: get_date(), get_name(), get_text()
 */
ININ.Web.Chat.WebServices.Interfaces.IMessageData = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.IMessageData', ['get_date', 'get_name', 'get_text']);

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Interfaces");

/**
 * ISequenceableProcessor interface 
 * Provides method: process() 
 */
ININ.Web.Chat.WebServices.Interfaces.ISequenceableProcessor = new ININ.Web.Common.Interface('ININ.Web.Chat.WebServices.Interfaces.ISequenceableProcessor', ['process']);

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/**
 * StringPosition class 
 * Represents a slice (i.e. beginning and ending indices) of a string, but does not store the string itself. 
 */
ININ.Web.Chat.WebServices.StringPosition = Class.create(
{
	/**
	 * Constructor 
	 * This initializes to non-useful values, and should be considered to be a private constructor. 
	 * Please use either buildFromStartAndLength() or buildFromStartAndStop(). 
	 */
    initialize : function()
    {
        this._startPosition = -1;
        this._length = -1;
    },

    // public methods

	/**
	 * Gets the starting index of the string slice 
	 * @return integer 
	 */
    get_startPosition : function()
    {
        return this._startPosition;
    },

	/**
	 * Gets the ending index of the string slice 
	 * @return integer 
	 */
    get_stopPosition : function()
    {
        return this._startPosition + this._length;
    },

	/**
	 * Gets the length of the string slice 
	 * @return integer 
	 */
    get_length : function()
    {
        return this._length;
    }
});

/**
 * Creates a StringPosition, given the starting index and the number of characters to include in the slice. 
 * 
 * @param start Starting index of the string slice
 * @param length Length of the string slice
 */
ININ.Web.Chat.WebServices.StringPosition.buildFromStartAndLength = function(start, length)
{
    var sp = new ININ.Web.Chat.WebServices.StringPosition();
    sp._startPosition = start;
    sp._length = length;
    return sp;
};

/**
 * Creates a StringPosition, given the starting and ending indices. 
 * 
 * @param start Starting index of the string slice
 * @param stop Ending index of the string slice
 */
ININ.Web.Chat.WebServices.StringPosition.buildFromStartAndStop = function(start, stop)
{
    var sp = new ININ.Web.Chat.WebServices.StringPosition();
    sp._startPosition = start;
    sp._length = stop - start;
    return sp;
};

/*global ININ: true, Error: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * _DefaultLinkifier class 
 *  
 * Do not instantiate this class directly.  Use 
 * ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableFactoryTypes.Linkifier) 
 *  
 * Scans text for URIs (http, https, ftp, file, mailto) and inserts the appropriate HTML to make them become links 
 * Note that this will NOT linkify "www.somewhere.com" - the scheme part (for instance, "http://") is 
 * necessary for linkification.  This may be corrected in a future SU. 
 */
ININ.Web.Chat.WebServices._Internal._DefaultLinkifier = Class.create(
{
    _linkOpeningTagPrefix : '<a href="',
    _linkOpeningTagSuffix : '" target="_blank" class="iwc-message-link">',
    _linkClosingTag : '</a>',
    _hideSchemeFromUser : true,

    // The following regular expression will match URLs specified with a
    // scheme (e.g. http://www.inin.com or http://www.inin.com/directory/file?key=value
    // or ftp://www.inin.com or mailto:support@inin.com).
    // It will also match URLs with no scheme specified (e.g. www.inin.com), IF they
    // are of the form "www dot something"
    //                                    (               scheme              )(URL) |(    www...     )
    _urlMatchingRegularExpression: /(?:(?:((?:(?:https?|ftp):\/\/)|(?:mailto:))(\S+))|(www\.[^\.\s]\S+))/ig,

	/**
	 * Constructor
	 */
    initialize : function()
    {
    },

    // public methods

    /**
	 * Scans text for URIs (http, https, ftp, file, mailto) and inserts the appropriate HTML to make them become links 
	 *  
	 * @param text The text to "linkify" 
	 * @return The text with URLs converted to links 
	 */
    linkifyText : function(text)
    {
        return text.replace(this.getUrlMatchingRegularExpression(), this._onMatch.bind(this));
    },

    /**
     * Creates a hyperlink, using this class' defined tags.
     *  
     * Example:  Depending on the values of this._linkOpeningTagPrefix, etc., 
     * createLink("http://www.inin.com", "Interactive Intelligence") may return 
     * <a href="http://www.inin.com">Interactive Intelligence</a>
     *  
     * @param url The URL that the link points to
     * @param text The text for the user to click on.  If not specified, will default to the value of url. 
     * @return string containing an HTML "a" tag (opening tag, text for the user to click on, and closing tag) 
     */
    createLink : function(url, text)
    {
        return this.getLinkOpeningTagPrefix() + url + this.getLinkOpeningTagSuffix() + (text || url) + this.getLinkClosingTag();
    },

    /**
     * The Linkifier inserts HTML "a" tags into the text. 
     * This method returns the portion of the "a" tag that comes before the URL.
     *  
     * @return string 
     */
    getLinkOpeningTagPrefix : function()
    {
        return this._linkOpeningTagPrefix;
    },

    /**
     * The Linkifier inserts HTML "a" tags into the text. 
     * This method returns the portion of the "a" tag that comes after the URL.
     *  
     * @return string 
     */
    getLinkOpeningTagSuffix : function()
    {
        return this._linkOpeningTagSuffix;
    },

    /**
     * The Linkifier inserts HTML "a" tags into the text. 
     * This method returns the "/a" tag 
     *  
     * @return string, by default "</a>"
     */
    getLinkClosingTag : function()
    {
        return this._linkClosingTag;
    },

    /**
     * Returns the regular expression used to identify URLs in text.
     *  
     * @return regular expression 
     */
    getUrlMatchingRegularExpression : function()
    {
        return this._urlMatchingRegularExpression;
    },

    /**
     * Returns whether to hide "http://" and "mailto:" from 
     * the user when displaying clickable URLs
     *  
     * @return Boolean 
     */
    getHideSchemeFromUser : function()
    {
        return this._hideSchemeFromUser;
    },

    // Private methods

    /**
     * If we've found a URL that was specified with a scheme, e.g. "https://www.inin.com", then:
     * fullURL = URL including scheme, e.g. "https://www.inin.com"
     * scheme = scheme, e.g. "https://"
     * afterScheme = URL without scheme, e.g. "www.inin.com" 
     *  
     * But if we've found a URL that was specified without a scheme, e.g. "www.inin.com", then: 
     * fullURL = what was found, e.g. "www.inin.com"
     * scheme = null
     * afterScheme = ALSO NULL!
     */
    _onMatch : function(fullURL, scheme, afterScheme)
    {
        if (!scheme)
        {
            // Found a URL that was specified without a scheme, e.g. "www.inin.com"
            // Fix up the values so that they are what they'd be if scheme had been provided.
            scheme = "http://";
            afterScheme = fullURL;
            fullURL = scheme + afterScheme;
        }

        // Only allow hiding of scheme from user if it is http or mailto.  Still show it if it is https or ftp.
        if (this.getHideSchemeFromUser() && ("http://" == scheme.toLowerCase() || "mailto:" == scheme.toLowerCase()))
        {
            return this.createLink(fullURL, afterScheme);
        }
        else
        {
            return this.createLink(fullURL);
        }
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.InteractionState");

/**
 * State to represent interactions that are initializing
 */
ININ.Web.Chat.WebServices.InteractionState.INITIALIZING = "initializing";

/**
 * State to represent interactions that are alerting
 */
ININ.Web.Chat.WebServices.InteractionState.ALERTING = "alerting";

/**
 * State to represent interactions that are active
 */
ININ.Web.Chat.WebServices.InteractionState.ACTIVE = "active";

/**
 * State to represent interactions that are held
 */
ININ.Web.Chat.WebServices.InteractionState.HELD = "held";

/**
 * State to represent interactions that are in the voicemail state
 */
ININ.Web.Chat.WebServices.InteractionState.VOICEMAIL = "voicemail";

/**
 * State to represent interactions that are disconnected
 */
ININ.Web.Chat.WebServices.InteractionState.DISCONNECTED = "disconnected";

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * InteractionTypes class
 * Contains constants that represent the types of interactions that may be handled by this web application, 
 * and a method to verify whether something is one of those. 
 */
ININ.Web.Chat.WebServices._Internal._InteractionTypes = Class.create({
    /**
     * Interaction type representing a text chat
     */
    CHAT : 1,

    /**
     * Interaction type representing a callback request
     */
    CALLBACK : 2,

    /**
     * Validates whether something is a recognized interaction type.
     * 
     * @param type Something that may or may not be one of the interaction types enumerated above
     * @return True if type is one of the known interaction types, false otherwise. 
     */
    validate : function(type)
    {
        if (this.CHAT == type ||
            this.CALLBACK == type)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
});

ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");
ININ.Web.Chat.WebServices.InteractionTypes = new ININ.Web.Chat.WebServices._Internal._InteractionTypes();

/*global ININ: true, Error: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/** 
 * SequenceManagerBase class 
 *  
 * Abstract class - use a subclass. 
 *  
 * If network congestion or other issues occur, AJAX responses could be received from the IC server in the wrong order. 
 * This class handles putting them back into the correct order.  It does this by observing the sequence number of all 
 * received events.  If a sequence number is larger than expected, indicating that one or more events are missing, it 
 * queues the events that were received too early, until the preceding event(s) are received or time out. 
 */
ININ.Web.Chat.WebServices._Internal._SequenceManagerBase = Class.create(ININ.Web.Common.InterfaceImplementation,
{
	/**
	 * Constructor
	 * 
	 * @param sequenceObjectProcessor Once the events are in the proper order, they are handed off to this object for processing.
	 * @param timeOutMilliseconds How long before a message is considered to be lost.  Begins at the time when a message with a higher sequence number is received.
	 */
    initialize:function($super, sequenceObjectProcessor, timeOutMilliseconds)
    {
        var numArgs = 3;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("_SequenceManagerBase constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

        $super();

        this._sequenceObjectProcessor = sequenceObjectProcessor;
        this._timeOutMilliseconds = timeOutMilliseconds;
        this._nextExpectedSequenceNumber = 0;
        this._queue = new ININ.Web.Common.Map();
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        this._sequenceObjectProcessor = null;
        
        this._queue.destroy();
        delete this._queue;
        this._queue = null;

        ININ.Web.Common.InterfaceImplementation.prototype.destroy.call(this);
    },

    // public methods

	/**
	 * Called when an object is received.  If it was received in the correct order, it will be immediately processed. 
	 * If not, it will be queued until all objects that were supposed to be received before it have either been 
	 * received or timed out. 
	 * 
	 * @param seqObject The object to process or queue
	 */
    addSequenceableObject : function(seqObject)
    {
        ININ.Web.Common.Debug.traceMethodEntered("SequenceManagerBase.addSequenceableObject");
        ININ.Web.Common.Interface.ensureImplements(seqObject, ININ.Web.Chat.WebServices.Interfaces.ISequenceable);

        var success = false;
        
        ININ.Web.Common.Debug.traceStatus("Got sequenceable object #" + seqObject.get_sequenceNumber());
        ININ.Web.Common.Debug.traceStatus("Next expected sequence #" + this._nextExpectedSequenceNumber);
        if(this._nextExpectedSequenceNumber == seqObject.get_sequenceNumber())
        {
            // TODO: does this need to be locked?
            // 64-bit floating point value and as such the largest integral value it can represent precisely is 2^53,
			// BUT some operators fail for numbers > ((2^31)-1).  That's still a couple billion, though.
            ++this._nextExpectedSequenceNumber;
			ININ.Web.Common.Debug.traceStatus("Incremented next expected sequence number to: " + this._nextExpectedSequenceNumber);

            this._processSequenceableObject(seqObject, false); // Can result in a call to reset()

            this._processUnprocessedObjectsInQueue();
            success = true;
        }
        else if(seqObject.get_sequenceNumber() < this._nextExpectedSequenceNumber)
        {
            ININ.Web.Common.Debug.traceError("Sequence number '" + seqObject.get_sequenceNumber() + "' has already been processed.  Expected: " + this._nextExpectedSequenceNumber);
            ININ.Web.Common.Debug.breakpoint();
        }
        else
        {
            if(this._queue.containsKey(seqObject.get_sequenceNumber()))
            {
                ININ.Web.Common.Debug.traceError("Sequence number '" + seqObject.get_sequenceNumber() + "' is already in the queue.");
                ININ.Web.Common.Debug.breakpoint();
            }
            else
            {
                ININ.Web.Common.Debug.traceWarning("Queueing object #" + seqObject.get_sequenceNumber());
                ININ.Web.Common.Debug.breakpoint();

                this._queue.put(seqObject.get_sequenceNumber(), seqObject);
                success = true;
            }
        }
        
        this._processTimedOutObjectsInQueue();
        
        ININ.Web.Common.Debug.traceMethodExited("SequenceManagerBase.addSequenceableObject");
        
        return success;
    },

	/**
	 * Resets the object to its default state
	 */
    reset : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("SequenceManagerBase.reset");
        ININ.Web.Common.Debug.traceNote("SequenceManagerBase::reset");
        
        this._nextExpectedSequenceNumber = 0;
        this._queue.removeAll();
        ININ.Web.Common.Debug.traceMethodExited("SequenceManagerBase.reset");
    },

	/**
	 * Returns the number of queued objects.  An object is queued if it is received before another object which it 
	 * should have been received after.  For example, if objects with sequence numbers 1, 2, 3, 5, 6, and 8 are received, 
	 * then 3 of them (5, 6, 8) are queued.  Then, if the object with sequence number 4 is received, 4, 5, and 6 will be 
	 * processed and only 8 will remain in the queue.
	 *  
	 * @return The number of objects in the queue 
	 */
    get_queuedCount : function()
    {
        return this._queue.size();
    },

	/**
	 * Returns a boolean indicating whether or not the queue is empty.
	 *  
	 * @return True if the queue is empty, false otherwise. 
	 */
    isEmpty : function()
    {
        return (this.get_queuedCount() === 0);
    },

    // private methods

    _processSequenceableObject : function(seqObject, timedOut)
    {
        ININ.Web.Common.Debug.traceMethodEntered("SequenceManagerBase._processSequenceableObject");
        this._sequenceObjectProcessor.process(seqObject, timedOut);
        ININ.Web.Common.Debug.traceMethodExited("SequenceManagerBase._processSequenceableObject");
    },
    
    _processUnprocessedObjectsInQueue : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("SequenceManagerBase._processUnprocessedObjectsInQueue");
            
        // TODO: does this need to be locked?
        while(!this._queue.isEmpty() && this._queue.containsKey(this._nextExpectedSequenceNumber))
        {
            var seqObject = this._queue.get(this._nextExpectedSequenceNumber);
            this._processSequenceableObject(seqObject, false);
            this._queue.remove(this._nextExpectedSequenceNumber);

            // TODO: is integer overflow possible?
            ++this._nextExpectedSequenceNumber;
			ININ.Web.Common.Debug.traceStatus("Incremented next expected sequence number to: " + this._nextExpectedSequenceNumber);
        }

        ININ.Web.Common.Debug.traceMethodExited("SequenceManagerBase._processUnprocessedObjectsInQueue");
    },
    
    _processTimedOutObjectsInQueue : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("SequenceManagerBase._processTimedOutObjectsInQueue");
            
        // TODO: does this need to be locked?
        
        var timedOutSeqObjects = this._getTimedOutObjectsInQueue();
        if(timedOutSeqObjects && timedOutSeqObjects.length > 0)
        {
            this._orderList(timedOutSeqObjects);
            
            for(var i = 0; i < timedOutSeqObjects.length; ++i)
            {
                this._processSequenceableObject(timedOutSeqObjects[i], true);
            }
            
            // TODO: lock?
            this._nextExpectedSequenceNumber = timedOutSeqObjects[timedOutSeqObjects.length - 1].get_sequenceNumber() + 1;
			ININ.Web.Common.Debug.traceStatus("Set next expected sequence number to: " + this._nextExpectedSequenceNumber);
        }

        ININ.Web.Common.Debug.traceMethodExited("SequenceManagerBase._processTimedOutObjectsInQueue");
    },
    
    _getTimedOutObjectsInQueue : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("SequenceManagerBase._getTimedOutObjectsInQueue");
        var timedOutSeqObjects = [];
        
        // TODO: does this need to be locked?
        var seqObject = this._queue.firstObject();
        while(seqObject)
        {
            var nextSeqObject = this._queue.nextObject(seqObject.get_sequenceNumber());
            
            if(this._hasSequenceableObjectTimedOut(seqObject))
            {
                timedOutSeqObjects.push(seqObject);
                this._queue.remove(seqObject.get_sequenceNumber());
            }

            seqObject = nextSeqObject;
        }

        ININ.Web.Common.Debug.traceMethodExited("SequenceManagerBase._getTimedOutObjectsInQueue");
        return timedOutSeqObjects;
    },
    
    _orderList : function(list)
    {
        list.sort(this._orderSeqObjects)
    },

    _orderSeqObjects : function(a, b)
    {
        if(a.get_sequenceNumber() < b.get_sequenceNumber())
        {
            return -1;
        }
        else if(a.get_sequenceNumber() > b.get_sequenceNumber())
        {
            return 1;
        }

        return 0;
    },

    _hasSequenceableObjectTimedOut : function(seqObject)
    {
        return this._comesAfter(this._createTimeOutDate(), seqObject.get_dateTime());
    },

    _comesAfter : function(dateA, dateB)
    {
        return (dateA > dateB);
    },
    
    _createTimeOutDate : function()
    {
        var currentDate = new Date();
        return new Date(currentDate.getTime() - this._timeOutMilliseconds);
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Json");

/**
 * Event class 
 *  
 * Events, as opposed to Notifications, directly mirror the JSON/XML format of the responses received from the IC server. 
 */
ININ.Web.Chat.WebServices.Event = Class.create(ININ.Web.Common.InterfaceImplementation,
{
	/**
	 * Constructor
	 * 
	 * @param participantId ID of the person who took whatever action the event is telling us about
	 * @param sequenceNumber Sequence number of this event.  The first event in the chat is sequence number 0, and they increment thereafter.
	 * @param dateTime Timestamp for the event.  Javascript Date object.
	 */
    initialize:function($super, participantId, sequenceNumber, dateTime)
    {
        var numArgs = 4;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Event constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IEvent);

        this._participantId = participantId;
        this._sequenceNumber = sequenceNumber;
        this._dateTime = dateTime;
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        this._dateTime = null;

        ININ.Web.Common.InterfaceImplementation.prototype.destroy.call(this);
    },

    // public methods

	/**
	 * Returns the ID of the participant who took whatever action the event is telling us about.
	 *  
	 * @return ID of the participant 
	 */
    get_participantId : function()
    {
        return this._participantId;
    },
    
	/**
	 * Returns the sequence number of this event.
	 *  
	 * @return integer 
	 */
    get_sequenceNumber : function()
    {
        return this._sequenceNumber;
    },

	/**
	 * Returns the timestamp of this event
	 *  
	 * @return Javascript Date object 
	 */
    get_dateTime : function()
    {
        return this._dateTime;
    },
   
	/**
	 * Returns a string representation of this event, useful for debugging.
	 *  
	 * @return string 
	 */
    toString : function()
    {
        return "&lt;Event: " + this._participantId + ", " + this._sequenceNumber + ", " + this._dateTime + "&gt;";
    }
});

/** 
 * ParticipantStateChangedEvent class
 *  
 * Events indicating that a participant has changed state. 
 */
ININ.Web.Chat.WebServices.ParticipantStateChangedEvent = Class.create(ININ.Web.Chat.WebServices.Event,
{
	/**
	 * Constructor
	 * 
	 * @param participantId ID of the person who changed state.
	 * @param sequenceNumber Sequence number of this event.  The first event in the chat is sequence number 0, and they increment thereafter.
	 * @param dateTime Timestamp for the event.  Javascript Date object.
	 * @param state The state to which the participant changed
	 * @param participantName The name of the participant
	 */
    initialize:function($super, participantId, sequenceNumber, dateTime, state, participantName)
    {
        var numArgs = 6;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ParticipantStateChangedEvent constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

        $super(participantId, sequenceNumber, dateTime);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantStateChangedEvent);

        this._validateState(state);        
        this._state = state;
        this._participantName = participantName;
    },

    // public methods
    
	/**
	 * Returns the state to which the participant changed 
	 *  
	 * @return State string as specified in JSON/XML protocol
	 */
    get_state : function()
    {
        return this._state;
    },

	/**
	 * Returns the name of the participant
	 *  
	 * @return The name of the participant 
	 */
    get_participantName : function()
    {
        return this._participantName;
    },

	/**
	 * Returns a string representation of this event, useful for debugging.
	 *  
	 * @return string 
	 */
    toString : function()
    {
        return "&lt;ParticipantStateChangedEvent: " + this._participantId + ", " + this._participantName + ", " + this._sequenceNumber + ", " + this._dateTime + ", " + this._state + "&gt;";
    },

	// private methods

    _validateState : function(state)
    {
        if(!state)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("state is null/undefined");
        }
       
        if((state != ININ.Web.Chat.WebServices.InteractionState.INITIALIZING) &&
           (state != ININ.Web.Chat.WebServices.InteractionState.ALERTING) &&
           (state != ININ.Web.Chat.WebServices.InteractionState.ACTIVE) &&
           (state != ININ.Web.Chat.WebServices.InteractionState.HELD) &&
           (state != ININ.Web.Chat.WebServices.InteractionState.VOICEMAIL) &&
           (state != ININ.Web.Chat.WebServices.InteractionState.DISCONNECTED))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Not a valid state: " + state);
        }
    }
});

/**
 * ParticipantSetTypingEvent class 
 *  
 * Events indicating that a participant has started or stopped typing. 
 */
ININ.Web.Chat.WebServices.ParticipantSetTypingEvent = Class.create(ININ.Web.Chat.WebServices.Event,
{
	/**
	 * Constructor
	 * 
	 * @param participantId ID of the person who started or stopped typing.
	 * @param sequenceNumber Sequence number of this event.  The first event in the chat is sequence number 0, and they increment thereafter.
	 * @param dateTime Timestamp for the event.  Javascript Date object. 
	 * @param isTyping True if the event is to indicate that the participant has started typing, false if the event is to indicate that the participant has stopped typing. 
	 */
    initialize:function($super, participantId, sequenceNumber, dateTime, isTyping)
    {
        var numArgs = 5;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ParticipantSetTypingEvent constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

        $super(participantId, sequenceNumber, dateTime);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantSetTypingEvent);
        
        this._isTyping = isTyping;
    },
    
    // public methods

    /**
	 * Returns whether the participant started or stopped typing.
	 *  
	 * @return isTyping True if the event is to indicate that the participant has started typing, false if the event is to indicate that the participant has stopped typing.
	 */
    get_isTyping : function()
    {
        return this._isTyping;
    },

	/**
	 * Returns a string representation of this event, useful for debugging.
	 *  
	 * @return string 
	 */
    toString : function()
    {
        return "&lt;ParticipantSetTypingEvent: " + this._participantId + ", " + this._sequenceNumber + ", " + this._dateTime + ", " + this._isTyping + "&gt;";
    }
});

/**
 * ReceivedTextEvent class 
 *  
 * Events indicating that someone has typed something in the chat. 
 */
ININ.Web.Chat.WebServices.ReceivedTextEvent = Class.create(ININ.Web.Chat.WebServices.Event,
{
	/**
	 * Constructor
	 * 
	 * @param participantId ID of the person who sent the message.
	 * @param sequenceNumber Sequence number of this event.  The first event in the chat is sequence number 0, and they increment thereafter.
	 * @param dateTime Timestamp for the event.  Javascript Date object.
	 * @param messageText What the participant typed 
     * @param conversationSequenceNumber Separate sequence number tracking only received text, URLs, and files.  If 5 ParticipantStateChangedEvents are sent, followed by 8 ReceivedTextEvents and 2 ReceivedUrlEvents, the last event received will have sequenceNumber 14 and conversationSequenceNumber 9. 
     * @param contentType The mime type of messageText.  Likely either "text/plain" or "text/html". 
	 */
    initialize:function($super, participantId, sequenceNumber, dateTime, messageText, conversationSequenceNumber, contentType)
    {
        var numArgs = 7;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ReceivedTextEvent constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

        $super(participantId, sequenceNumber, dateTime);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IReceivedTextEvent);

        this._messageText = messageText;
        this._contentType = contentType;
        this._conversationSequenceNumber = conversationSequenceNumber;
    },

	// public methods

	/**
	 * Gets the message that the participant typed.
	 *  
	 * @return string
	 */
    get_messageText : function()
    {
        return this._messageText;
    },

	/**
	 * Gets the mime type of the message that the participant typed.
	 *  
	 * @return string
	 */
    get_contentType : function()
    {
        return this._contentType;
    },

	/**
	 * Gets the conversation sequence number.
	 * This is a separate sequence number tracking only received text, URLs, and files. 
	 * If 5 ParticipantStateChangedEvents are sent, followed by 8 ReceivedTextEvents and 2 ReceivedUrlEvents, the 
	 * last event received will have sequenceNumber 14 and conversationSequenceNumber 9.
	 *  
	 * @return integer 
	 */
    get_conversationSequenceNumber : function()
    {
        return this._conversationSequenceNumber;
    },

	/**
	 * Returns a string representation of this event, useful for debugging.
	 *  
	 * @return string 
	 */
    toString : function()
    {
        return "&lt;ReceivedTextEvent: " + this._participantId + ", " + this._sequenceNumber + ", " + this._dateTime + ", " + this._messageText + ", " + this._contentType + "&gt;";
    }
});

/**
 * ReceivedCommandEvent class 
 *  
 * Events indicating that someone has typed a special string that represents a command to make the application do something, for instance 
 * change the tracing level. 
 */
ININ.Web.Chat.WebServices.ReceivedCommandEvent = Class.create(ININ.Web.Chat.WebServices.Event,
{
	/**
	 * Constructor
	 * 
	 * @param participantId ID of the person who sent the command.
	 * @param sequenceNumber Sequence number of this event.  The first event in the chat is sequence number 0, and they increment thereafter.
	 * @param dateTime Timestamp for the event.  Javascript Date object.
	 * @param command The command the participant typed 
	 * @param conversationSequenceNumber Separate sequence number tracking only received text, URLs, and files.  If 5 ParticipantStateChangedEvents are sent, followed by 8 ReceivedTextEvents and 2 ReceivedUrlEvents, the last event received will have sequenceNumber 14 and conversationSequenceNumber 9.
	 */
    initialize:function($super, participantId, sequenceNumber, dateTime, command, conversationSequenceNumber)
    {
        var numArgs = 6;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ReceivedCommandEvent constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

        $super(participantId, sequenceNumber, dateTime);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IReceivedCommandEvent);

        this._command = command;
        this._conversationSequenceNumber = conversationSequenceNumber;
    },

	// public methods

	/**
	 * Gets the command that the participant typed.
	 *  
	 * @return string
	 */
    get_command : function()
    {
        return this._command;
    },

	/**
	 * Gets the conversation sequence number.
	 * This is a separate sequence number tracking only received text, URLs, and files. 
	 * If 5 ParticipantStateChangedEvents are sent, followed by 8 ReceivedTextEvents and 2 ReceivedUrlEvents, the 
	 * last event received will have sequenceNumber 14 and conversationSequenceNumber 9.
	 *  
	 * @return integer 
	 */
    get_conversationSequenceNumber : function()
    {
        return this._conversationSequenceNumber;
    },

	/**
	 * Returns a string representation of this event, useful for debugging.
	 *  
	 * @return string 
	 */
    toString : function()
    {
        return "&lt;ReceivedCommandEvent: " + this._participantId + ", " + this._sequenceNumber + ", " + this._dateTime + ", " + this._command + "&gt;";
    }
});

/**
 * ReceivedUrlEvent class
 *  
 * Events indicating that someone in the chat has sent a URL. 
 */
ININ.Web.Chat.WebServices.ReceivedUrlEvent = Class.create(ININ.Web.Chat.WebServices.Event,
{
	/**
	 * Constructor
	 * 
	 * @param participantId ID of the person who sent the message.
	 * @param sequenceNumber Sequence number of this event.  The first event in the chat is sequence number 0, and they increment thereafter.
	 * @param dateTime Timestamp for the event.  Javascript Date object.
	 * @param messageUrl The URL that the participant sent.
	 * @param conversationSequenceNumber Separate sequence number tracking only received text, URLs, and files.  If 5 ParticipantStateChangedEvents are sent, followed by 8 ReceivedTextEvents and 2 ReceivedUrlEvents, the last event received will have sequenceNumber 14 and conversationSequenceNumber 9.
	 */
    initialize:function($super, participantId, sequenceNumber, dateTime, messageUrl, conversationSequenceNumber)
    {
        var numArgs = 6;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ReceivedUrlEvent constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

        $super(participantId, sequenceNumber, dateTime);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IReceivedUrlEvent);

        this._messageUrl = messageUrl;
        this._conversationSequenceNumber = conversationSequenceNumber;
    },

    // public methods

	/**
	 * Gets the URL that the participant sent.
	 *  
	 * @return string
	 */
    get_messageUrl : function()
    {
        return this._messageUrl;
    },

	/**
	 * Gets the conversation sequence number.
	 * This is a separate sequence number tracking only received text, URLs, and files. 
	 * If 5 ParticipantStateChangedEvents are sent, followed by 8 ReceivedTextEvents and 2 ReceivedUrlEvents, the 
	 * last event received will have sequenceNumber 14 and conversationSequenceNumber 9.
	 *  
	 * @return integer 
	 */
    get_conversationSequenceNumber : function()
    {
        return this._conversationSequenceNumber;
    },

	/**
	 * Returns a string representation of this event, useful for debugging.
	 *  
	 * @return string 
	 */
    toString : function()
    {
        return "&lt;ReceivedUrlEvent: " + this._participantId + ", " + this._sequenceNumber + ", " + this._dateTime + ", " + this._messageUrl + "&gt;";
    }
});

/**
 * ReceivedFileEvent class
 *  
 * Events indicating that someone in the chat has sent a file. 
 */
ININ.Web.Chat.WebServices.ReceivedFileEvent = Class.create(ININ.Web.Chat.WebServices.Event,
{
	/**
	 * Constructor
	 * 
	 * @param participantId ID of the person who sent the message.
	 * @param sequenceNumber Sequence number of this event.  The first event in the chat is sequence number 0, and they increment thereafter.
	 * @param dateTime Timestamp for the event.  Javascript Date object.
	 * @param messageRelativeUrl The URL that the web user can use to retrieve the file.
	 * @param conversationSequenceNumber Separate sequence number tracking only received text, URLs, and files.  If 5 ParticipantStateChangedEvents are sent, followed by 8 ReceivedTextEvents and 2 ReceivedUrlEvents, the last event received will have sequenceNumber 14 and conversationSequenceNumber 9.
	 */
    initialize:function($super, participantId, sequenceNumber, dateTime, messageRelativeUrl, conversationSequenceNumber)
    {
        var numArgs = 6;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ReceivedFileEvent constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

        $super(participantId, sequenceNumber, dateTime);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IReceivedFileEvent);

        this._messageRelativeUrl = messageRelativeUrl;
        this._conversationSequenceNumber = conversationSequenceNumber;
    },

    // public methods

	/**
	 * Gets the URL that the web user can use to retrieve the file that the participant sent.
	 *  
	 * @return string
	 */
    get_messageRelativeUrl : function()
    {
        return this._messageRelativeUrl;
    },

	/**
	 * Gets the conversation sequence number.
	 * This is a separate sequence number tracking only received text, URLs, and files. 
	 * If 5 ParticipantStateChangedEvents are sent, followed by 8 ReceivedTextEvents and 2 ReceivedUrlEvents, the 
	 * last event received will have sequenceNumber 14 and conversationSequenceNumber 9.
	 *  
	 * @return integer 
	 */
    get_conversationSequenceNumber : function()
    {
        return this._conversationSequenceNumber;
    },

	/**
	 * Returns a string representation of this event, useful for debugging.
	 *  
	 * @return string 
	 */
    toString : function()
    {
        return "&lt;ReceivedFileEvent: " + this._participantId + ", " + this._sequenceNumber + ", " + this._dateTime + ", " + this._messageRelativeUrl + "&gt;";
    }
});

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Json.EventTypes");

// private constants for the event names
ININ.Web.Chat.WebServices.Json.EventTypes.PARTICIPANT_STATE_CHANGED = "participantStateChanged";
ININ.Web.Chat.WebServices.Json.EventTypes.TYPINGINDICATOR = "typingIndicator";
ININ.Web.Chat.WebServices.Json.EventTypes.TEXT = "text";
ININ.Web.Chat.WebServices.Json.EventTypes.URL = "url";
ININ.Web.Chat.WebServices.Json.EventTypes.FILE = "file";
    
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Json");

/**
 * EventFactory class
 * When an AJAX request is made to the IC server, the IC server sends a reply in JSON (or XML) format.
 * This class handles translation of the "event" part of a JSON reply into an ININ.Web.Chat.WebServices.*Event object.
 */
ININ.Web.Chat.WebServices.Json.EventFactory = Class.create(ININ.Web.Common.InterfaceImplementation,
{
    // public methods

	/**
	 * Translates part of a JSON reply from the IC server into an instance of one of the ININ.Web.Chat.WebServices.*Event classes
	 * @param jsonEvent The "event" portion of a JSON reply from the IC server 
	 * @return An instance of one of the ININ.Web.Chat.WebServices.*Event classes 
	 */
    createEvent : function(jsonEvent)
    {
        if(!jsonEvent)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("JSON event is null, undefined or empty");
        }
        
        ININ.Web.Common.ParameterValidation.validate([jsonEvent.type, jsonEvent.participantID, jsonEvent.sequenceNumber], [ {"type": String, "allowEmpty": false, "required": true}, {"type": String, "allowEmpty": false, "required": true}, {"type": Number, "required": true}]);
        
        if(jsonEvent.type == ININ.Web.Chat.WebServices.Json.EventTypes.PARTICIPANT_STATE_CHANGED)
        {
            ININ.Web.Common.ParameterValidation.validate([jsonEvent.participantName, jsonEvent.state], [ {"type": String, "allowEmpty": true, "required": false}, {"type": String, "allowEmpty": false, "required": true} ]);

            return new ININ.Web.Chat.WebServices.ParticipantStateChangedEvent(jsonEvent.participantID, jsonEvent.sequenceNumber, new Date(), jsonEvent.state, jsonEvent.participantName);
        }
        if(jsonEvent.type == ININ.Web.Chat.WebServices.Json.EventTypes.TYPINGINDICATOR)
        {
            ININ.Web.Common.ParameterValidation.validate([jsonEvent.value], [ {"type": Boolean, "required": true} ]);

            return new ININ.Web.Chat.WebServices.ParticipantSetTypingEvent(jsonEvent.participantID, jsonEvent.sequenceNumber, new Date(), jsonEvent.value);
        }
        if(jsonEvent.type == ININ.Web.Chat.WebServices.Json.EventTypes.TEXT)
        {
            ININ.Web.Common.ParameterValidation.validate([jsonEvent.value, jsonEvent.conversationSequenceNumber], [ {"type": String, "allowEmpty": false, "required": true}, {"type": Number, "required": true} ]);

            if (ININ.Web.Chat.WebServices.CommandRepository.isCommand(jsonEvent.value))
            {
                return new ININ.Web.Chat.WebServices.ReceivedCommandEvent(jsonEvent.participantID, jsonEvent.sequenceNumber, new Date(), jsonEvent.value, jsonEvent.conversationSequenceNumber);
            }
            else
            {
                // Necessary kludge for an SU3 ES. Will be resolved in a better way in the normal development timeline.
                if (jsonEvent.participantID == ININ.Web.Chat.WebServices.ParticipantRepository.SYSTEM_SENDER_ID && jsonEvent.displayName)
                {
                    ININ.Web.Chat.WebServices.ParticipantRepository.changeParticipantName(jsonEvent.participantID, jsonEvent.displayName);
                }

                return new ININ.Web.Chat.WebServices.ReceivedTextEvent(jsonEvent.participantID, jsonEvent.sequenceNumber, new Date(), jsonEvent.value, jsonEvent.conversationSequenceNumber, jsonEvent.contentType);
            }
        }
        if(jsonEvent.type == ININ.Web.Chat.WebServices.Json.EventTypes.URL)
        {
            ININ.Web.Common.ParameterValidation.validate([jsonEvent.value, jsonEvent.conversationSequenceNumber], [ {"type": String, "allowEmpty": false, "required": true}, {"type": Number, "required": true} ]);

            return new ININ.Web.Chat.WebServices.ReceivedUrlEvent(jsonEvent.participantID, jsonEvent.sequenceNumber, new Date(), jsonEvent.value, jsonEvent.conversationSequenceNumber);
        }
        if(jsonEvent.type == ININ.Web.Chat.WebServices.Json.EventTypes.FILE)
        {
            ININ.Web.Common.ParameterValidation.validate([jsonEvent.value, jsonEvent.conversationSequenceNumber], [ {"type": String, "allowEmpty": false, "required": true}, {"type": Number, "required": true} ]);

            return new ININ.Web.Chat.WebServices.ReceivedFileEvent(jsonEvent.participantID, jsonEvent.sequenceNumber, new Date(), jsonEvent.value, jsonEvent.conversationSequenceNumber);
        }

        throw ININ.Web.Common.ExceptionFactory.createException("Unknown JSON event object");
    }
});

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * EventProcessor class 
 * Consumes events (<code>ININ.Web.Chat.WebServices.Interfaces.I*Event</code>), uses NotificationFactory to create the appropriate 
 * notifications (<code>ININ.Web.Chat.WebServices.*Notification</code>) for those events, and then uses notification processor 
 * (<code>ININ.Web.Chat.WebServices.Interfaces.INotificationProcessor</code>) to dispatch those notifications to the 
 * appropriate observers (<code>ININ.Web.Chat.WebServices.Interfaces.I*Observer</code>). 
 */
ININ.Web.Chat.WebServices._Internal._EventProcessor = Class.create(ININ.Web.Common.InterfaceImplementation,
{
	/**
	 * Constructor
	 * 
	 * @param notificationProcessor Something that implements INotificationProcessor (such as NotificationRegistry)
	 * @param participantRepository Keeps track of which participants are in the chat, their names, etc.
	 */
    initialize : function($super, notificationProcessor, participantRepository)
    {
        // validate arguments
        var numArgs = 3;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("EventProcessor constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

        // validate argument interfaces
        ININ.Web.Common.Interface.ensureImplements(notificationProcessor, ININ.Web.Chat.WebServices.Interfaces.INotificationProcessor);
        ININ.Web.Common.Interface.ensureImplements(participantRepository, ININ.Web.Chat.WebServices.Interfaces.IParticipantRepository);

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ISequenceableProcessor);

        // initialize private members
        this._isStarted = false;
        this._notificationProcessor = notificationProcessor;
        this._participantRepository = participantRepository;
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Common.InterfaceImplementation.prototype.destroy.call(this);
    },

    // public methods

	/**
	 * Starts the EventProcessor
	 */
    start : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("EventProcessor.start()");
        this._isStarted = true;
        ININ.Web.Common.Debug.traceMethodExited("EventProcessor.start()");
    },

	/**
	 * Stops the EventProcessor
	 */
    stop : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("EventProcessor.stop()");
        this._isStarted = false;
        ININ.Web.Common.Debug.traceMethodExited("EventProcessor.stop()");
    },

	/**
	 * Processes an event, by sending the appropriate notification(s) to the interested observer(s).
	 * 
	 * @param evt An implementation of ININ.Web.Chat.WebServices.Interfaces.IEvent.
	 * @param isTimedOut Whether the event was received late.  If so, perhaps the observer will do something special to indicate this. 
	 */
    process : function(evt, timedOut)
    {
        ININ.Web.Common.Debug.traceMethodEntered("EventProcessor.process()");
        try
        {
            if(!this._isStarted)
            {
                ININ.Web.Common.Debug.traceWarning("EventProcessor hasn't been started. Ignoring event");
            }
            else
            {
                ININ.Web.Common.Interface.ensureImplements(evt, ININ.Web.Chat.WebServices.Interfaces.ISequenceable);
                ININ.Web.Common.Interface.ensureImplements(evt, ININ.Web.Chat.WebServices.Interfaces.IEvent);
                
                ININ.Web.Common.Debug.traceStatus("Processing event #" + evt.get_sequenceNumber());
            
                if(ININ.Web.Common.Interface.doesImplement(evt, ININ.Web.Chat.WebServices.Interfaces.IParticipantStateChangedEvent))
                {
                    // see if this is the first time we've seen this participant
                    if(!this._doesParticipantExist(evt.get_participantId()))
                    {
                        this._processNotification(ININ.Web.Chat.WebServices.NotificationFactory.createNewParticipantNotificationForChat(evt, timedOut));
                    }
                }
                
                if(ININ.Web.Common.Interface.doesImplement(evt, ININ.Web.Chat.WebServices.Interfaces.IParticipantStateChangedEvent))
                {
                    // see if this participant's name changed
                    if(this._didParticipantsNameChange(evt))
                    {
                        this._processNotification(ININ.Web.Chat.WebServices.NotificationFactory.createParticipantNameChangedNotification(evt, timedOut));
                    }

                    // see if this participant has joined or left the chat
                    if(!this._isParticipantAlreadyActive(evt.get_participantId()))
                    {
                        // Participant is not in the chat. See if they're in a new state that indicates that they have joined
                        if((evt.get_state() == ININ.Web.Chat.WebServices.InteractionState.ACTIVE) ||
                           (evt.get_state() == ININ.Web.Chat.WebServices.InteractionState.HELD) ||
                           (evt.get_state() == ININ.Web.Chat.WebServices.InteractionState.VOICEMAIL))
                        {
                            this._processNotification(ININ.Web.Chat.WebServices.NotificationFactory.createParticipantJoinedNotification(evt, timedOut));
                        }
                    }
                    else
                    {
                        // Participant is in the chat. See if they're in a new state that indicates that they have left
                        if(evt.get_state() == ININ.Web.Chat.WebServices.InteractionState.DISCONNECTED)
                        {
                            this._processNotification(ININ.Web.Chat.WebServices.NotificationFactory.createParticipantLeftNotification(evt, timedOut));
                        }
                    }

                    // process individual state changes
                    if(evt.get_state() == ININ.Web.Chat.WebServices.InteractionState.INITIALIZING)
                    {
                        this._processNotification(ININ.Web.Chat.WebServices.NotificationFactory.createParticipantInitializingNotification(evt, timedOut));
                    }
                    else if(evt.get_state() == ININ.Web.Chat.WebServices.InteractionState.ACTIVE)
                    {
                        this._processNotification(ININ.Web.Chat.WebServices.NotificationFactory.createParticipantActiveNotification(evt, timedOut));
                    }
                    else if(evt.get_state() == ININ.Web.Chat.WebServices.InteractionState.ALERTING)
                    {
                        this._processNotification(ININ.Web.Chat.WebServices.NotificationFactory.createParticipantAlertingNotification(evt, timedOut));
                    }
                    else if(evt.get_state() == ININ.Web.Chat.WebServices.InteractionState.HELD)
                    {
                        this._processNotification(ININ.Web.Chat.WebServices.NotificationFactory.createParticipantHeldNotification(evt, timedOut));
                    }
                    else if(evt.get_state() == ININ.Web.Chat.WebServices.InteractionState.VOICEMAIL)
                    {
                        this._processNotification(ININ.Web.Chat.WebServices.NotificationFactory.createParticipantVoicemailNotification(evt, timedOut));
                    }
                    else if(evt.get_state() == ININ.Web.Chat.WebServices.InteractionState.DISCONNECTED)
                    {
                        this._processNotification(ININ.Web.Chat.WebServices.NotificationFactory.createParticipantDisconnectedNotification(evt, timedOut));
                    }
                }
                if(ININ.Web.Common.Interface.doesImplement(evt, ININ.Web.Chat.WebServices.Interfaces.IParticipantSetTypingEvent))
                {
                    if(evt.get_isTyping())
                    {
                        this._processNotification(ININ.Web.Chat.WebServices.NotificationFactory.createParticipantStartedTypingNotification(evt, timedOut));
                    }
                    else
                    {
                        this._processNotification(ININ.Web.Chat.WebServices.NotificationFactory.createParticipantStoppedTypingNotification(evt, timedOut));
                    }
                }
                if(ININ.Web.Common.Interface.doesImplement(evt, ININ.Web.Chat.WebServices.Interfaces.IReceivedTextEvent))
                {
                    this._processNotification(ININ.Web.Chat.WebServices.NotificationFactory.createReceivedTextNotification(evt, timedOut));
                }
                if(ININ.Web.Common.Interface.doesImplement(evt, ININ.Web.Chat.WebServices.Interfaces.IReceivedCommandEvent))
                {
                    this._processNotification(ININ.Web.Chat.WebServices.NotificationFactory.createReceivedCommandNotification(evt, timedOut));
                }
                if(ININ.Web.Common.Interface.doesImplement(evt, ININ.Web.Chat.WebServices.Interfaces.IReceivedUrlEvent))
                {
                    this._processNotification(ININ.Web.Chat.WebServices.NotificationFactory.createReceivedUrlNotification(evt, timedOut));
                }
                if(ININ.Web.Common.Interface.doesImplement(evt, ININ.Web.Chat.WebServices.Interfaces.IReceivedFileEvent))
                {
                    this._processNotification(ININ.Web.Chat.WebServices.NotificationFactory.createReceivedFileNotification(evt, timedOut));
                }
            }
        }
        catch(ex)
        {
            ININ.Web.Common.Debug.traceError(ex.message);
            ININ.Web.Common.Debug.alert(ex.message);
            ININ.Web.Common.Debug.breakpoint();
            ININ.Web.Chat.WebServices.ProblemReporter.sendProblemReport(ex, "EventProcessor.process()");
        }
        ININ.Web.Common.Debug.traceMethodExited("EventProcessor.process()");
    },

    // private methods

    _doesParticipantExist : function(participantId)
    {
        var participant = this._participantRepository.get_participant(participantId);
        if(participant)
        {
            return true;
        }
        
        return false;
    },

    _isParticipantAlreadyActive : function(participantId)
    {
        var participant = this._participantRepository.get_participant(participantId);
        if(participant)
        {
            return participant.get_isActive();
        }
        
        return false;
    },

    _didParticipantsNameChange : function(evt)
    {
        var newName = evt.get_participantName();
        if(newName)
        {
            var participant = this._participantRepository.get_participant(evt.get_participantId());
            if(participant)
            {
                if(participant.get_name() != newName)
                {
                    return true;
                }
            }
        }

        return false;
    },

    _processNotification : function(notification)
    {
        this._notificationProcessor.process(notification);
    }
});

/*global ININ: true, Error: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Json._Internal");

/**
 * EventSequenceManager class 
 * Keeps the events received from the IC server in the correct chronological sequence. 
 */
ININ.Web.Chat.WebServices._Internal._EventSequenceManager = Class.create(ININ.Web.Chat.WebServices._Internal._SequenceManagerBase,
{
    // constants
    TIMEOUT_MILLISECONDS : (5000), // 5 seconds
    
	/**
	 * Constructor
	 * 
	 * @param eventProcessor An instance of ININ.Web.Chat.WebServices.EventProcessor
	 */
    initialize : function($super, eventProcessor)
    {
        var numArgs = 2;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("EventSequenceManager constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

        $super(eventProcessor, this.TIMEOUT_MILLISECONDS);
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * ParticipantNotificationBase class 
 *  
 * Base class of objects which other objects may listen for, which indicate that something has occurred pertaining 
 * to a participant in the chat.
 */
ININ.Web.Chat.WebServices._Internal.ParticipantNotificationBase = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
	/**
	 * Constructor
	 * 
	 * @param participantId ID of the person who took whatever action the notification is telling us about
	 * @param dateTime Timestamp for the notification.  Javascript Date object.
	 * @param isTimedOut Whether the notification is for an event that was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
	 */
    initialize : function($super, participantId, dateTime, isTimedOut)
    {
        if((arguments.length != 3) && (arguments.length != 4))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ParticipantNotificationBase constructor called with " + arguments.length + " arguments, but expected 3 or 4.");
        }

        ININ.Web.Common.ParameterValidation.validate([participantId, dateTime, isTimedOut], [ {"type": String, "allowEmpty": false, "required": true}, {"type": Date, "required": true}, {"type": Boolean, "required": false}]);
            
        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantNotification);

        this._participantId = participantId;
        this._dateTime = dateTime;
        this._hasTimedOut = (isTimedOut == true);
    },
   
	/**
	 * Destructor
	 */
    destroy : function()
    {
        this._dateTime = null;

        ININ.Web.Chat.WebServices._Internal.NotificationBase.prototype.destroy.call(this);
    },

    // public methods

	/**
	 * Returns the ID of the participant who took whatever action the notification indicates.
	 *  
	 * @return ID of the participant 
	 */
    get_participantId : function()
    {
        return this._participantId;
    },

	/**
	 * Returns the timestamp of the event that this notification indicates.
	 *  
	 * @return Javascript Date object 
	 */
    get_dateTime : function()
    {
        return this._dateTime;
    },

	/**
	 *  Indicates whether the event was received late.
	 *  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
	 *  
	 *  @return true if the event was received late, false if not.
	 */
    get_isTimedOut : function()
    {
        return this._hasTimedOut;
    },

	/**
	 *  Sets whether the event was received late.
	 *  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
	 *  
	 *  @param value true if the event was received late, false if not.
	 */
    set_isTimedOut : function(value)
    {
        ININ.Web.Common.ParameterValidation.validate([value], {"type": Boolean, "required": true});

        this._hasTimedOut = value;
    }
});

/**
 * NewParticipantNotification class
 *  
 * Notification indicating that there is a new participant in the chat (though they may not be active yet). 
 */
ININ.Web.Chat.WebServices.NewParticipantNotification = Class.create(ININ.Web.Chat.WebServices._Internal.ParticipantNotificationBase,
{
	/**
	 * Constructor 
	 *  
	 * @param participantId ID of the person who is now in the chat.
	 * @param participantName The name of the participant who is now in the chat.
     * @param interactionType The type of interaction in which the person is participating.  A constant defined in ININ.Web.Chat.WebServices.InteractionTypes. 
	 * @param dateTime Timestamp for the notification.  Javascript Date object.
	 * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
	 */
    initialize:function($super, participantId, participantName, interactionType, dateTime, isTimedOut)
    {
        if((arguments.length != 5) && (arguments.length != 6))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("NewParticipantNotification constructor called with " + arguments.length + " arguments, but expected 5 or 6.");
        }

        $super(participantId, dateTime, isTimedOut);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.INewParticipantNotification);

        this._participantName = participantName;
        this._interactionType = interactionType;
    },

    // public methods

	/**
	 * Returns the name of the participant to whom this notification pertains. 
	 *  
	 * @return The name of the participant 
	 */
    get_participantName : function()
    {
        return this._participantName;
    },

	/**
	 * Gets the type of interaction in which the participant is participating
	 *  
	 * @return A constant defined in ININ.Web.Chat.WebServices.InteractionTypes. 
	 */
    get_interactionType : function()
    {
        return this._interactionType;
    }
});

/**
 * ParticipantJoinedNotification class
 *  
 * Notification indicating that a participant has jonied the chat.
 */
ININ.Web.Chat.WebServices.ParticipantJoinedNotification = Class.create(ININ.Web.Chat.WebServices._Internal.ParticipantNotificationBase,
{
	/**
	 * Constructor 
	 *  
	 * @param participantId ID of the person who has joined.
	 * @param participantName The name of the participant who has joined.
	 * @param dateTime Timestamp for the notification.  Javascript Date object.
	 * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
	 */
    initialize:function($super, participantId, participantName, dateTime, isTimedOut)
    {
        if((arguments.length != 4) && (arguments.length != 5))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ParticipantJoinedNotification constructor called with " + arguments.length + " arguments, but expected 4 or 5.");
        }

        $super(participantId, dateTime, isTimedOut);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantJoinedNotification);

        this._participantName = participantName;
    },

    // public methods

	/**
	 * Returns the name of the participant to whom this notification pertains. 
	 *  
	 * @return The name of the participant 
	 */
    get_participantName : function()
    {
        return this._participantName;
    }
});

/**
 * ParticipantLeftNotification class
 *  
 * Notification indicating that a participant has left the chat.
 */
ININ.Web.Chat.WebServices.ParticipantLeftNotification = Class.create(ININ.Web.Chat.WebServices._Internal.ParticipantNotificationBase,
{
	/**
	 * Constructor 
	 *  
	 * @param participantId ID of the person who has left.
	 * @param dateTime Timestamp for the notification.  Javascript Date object.
	 * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
	 */
    initialize:function($super, participantId, dateTime, isTimedOut)
    {
        if((arguments.length != 3) && (arguments.length != 4))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ParticipantLeftNotification constructor called with " + arguments.length + " arguments, but expected 3 or 4.");
        }

        $super(participantId, dateTime, isTimedOut);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantLeftNotification);
    }
});

/**
 * ParticipantNameChangedNotification class
 *  
 * Notification indicating that the name of a participant in the chat has changed.
 */
ININ.Web.Chat.WebServices.ParticipantNameChangedNotification = Class.create(ININ.Web.Chat.WebServices._Internal.ParticipantNotificationBase,
{
	/**
	 * Constructor 
	 *  
	 * @param participantId ID of the person whose name has changed. 
	 * @param newParticipantName The new name of the participant. 
	 * @param dateTime Timestamp for the notification.  Javascript Date object.
	 * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
	 */
    initialize:function($super, participantId, newParticipantName, dateTime, isTimedOut)
    {
        if((arguments.length != 4) && (arguments.length != 5))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ParticipantNameChangedNotification constructor called with " + arguments.length + " arguments, but expected 4 or 5.");
        }

        $super(participantId, dateTime, isTimedOut);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantNameChangedNotification);

        this._newParticipantName = newParticipantName;
    },

    // public methods

	/**
	 * Returns the new name of the participant whose name has changed. 
	 *  
	 * @return The new name of the participant 
	 */
    get_newParticipantName : function()
    {
        return this._newParticipantName;
    }
});

/**
 * ParticipantInitializingNotification class
 *  
 * Notification indicating that a participant in the chat is initializing.
 */
ININ.Web.Chat.WebServices.ParticipantInitializingNotification = Class.create(ININ.Web.Chat.WebServices._Internal.ParticipantNotificationBase,
{
	/**
	 * Constructor 
	 *  
	 * @param participantId ID of the person who is initializing.
	 * @param participantName The name of the participant who is initializing.
	 * @param dateTime Timestamp for the notification.  Javascript Date object.
	 * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
	 */
    initialize:function($super, participantId, participantName, dateTime, isTimedOut)
    {
        if((arguments.length != 4) && (arguments.length != 5))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ParticipantInitializingNotification constructor called with " + arguments.length + " arguments, but expected 4 or 5.");
        }

        $super(participantId, dateTime, isTimedOut);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantInitializingNotification);
        
        this._participantName = participantName;
    },

    // public methods

	/**
	 * Returns the name of the participant who is initializing.
	 *  
	 * @return The name of the participant 
	 */
    get_participantName : function()
    {
        return this._participantName;
    }
});

/**
 * ParticipantAlertingNotification class
 *  
 * Notification indicating that a participant in the chat is alerting.
 */
ININ.Web.Chat.WebServices.ParticipantAlertingNotification = Class.create(ININ.Web.Chat.WebServices._Internal.ParticipantNotificationBase,
{
	/**
	 * Constructor 
	 *  
	 * @param participantId ID of the person who is alerting.
	 * @param participantName The name of the participant who is alerting.
	 * @param dateTime Timestamp for the notification.  Javascript Date object.
	 * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
	 */
    initialize:function($super, participantId, participantName, dateTime, isTimedOut)
    {
        if((arguments.length != 4) && (arguments.length != 5))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ParticipantAlertingNotification constructor called with " + arguments.length + " arguments, but expected 4 or 5.");
        }

        $super(participantId, dateTime, isTimedOut);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantAlertingNotification);
        
        this._participantName = participantName;
    },

    // public methods

	/**
	 * Returns the name of the participant who is alerting.
	 *  
	 * @return The name of the participant 
	 */
    get_participantName : function()
    {
        return this._participantName;
    }
});

/**
 * ParticipantActiveNotification class
 *  
 * Notification indicating that a participant in the chat has become active.
 */
ININ.Web.Chat.WebServices.ParticipantActiveNotification = Class.create(ININ.Web.Chat.WebServices._Internal.ParticipantNotificationBase,
{
	/**
	 * Constructor 
	 *  
	 * @param participantId ID of the person who has become active.
	 * @param dateTime Timestamp for the notification.  Javascript Date object.
	 * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
	 */
    initialize:function($super, participantId, dateTime, isTimedOut)
    {
        if((arguments.length != 3) && (arguments.length != 4))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ParticipantActiveNotification constructor called with " + arguments.length + " arguments, but expected 3 or 4.");
        }

        $super(participantId, dateTime, isTimedOut);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantActiveNotification);
    }
});

/**
 * ParticipantHeldNotification class
 *  
 * Notification indicating that a participant in the chat has put the chat on hold.
 */
ININ.Web.Chat.WebServices.ParticipantHeldNotification = Class.create(ININ.Web.Chat.WebServices._Internal.ParticipantNotificationBase,
{
	/**
	 * Constructor 
	 *  
	 * @param participantId ID of the person who has put the chat on hold. 
	 * @param dateTime Timestamp for the notification.  Javascript Date object.
	 * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
	 */
    initialize:function($super, participantId, dateTime, isTimedOut)
    {
        if((arguments.length != 3) && (arguments.length != 4))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ParticipantHeldNotification constructor called with " + arguments.length + " arguments, but expected 3 or 4.");
        }

        $super(participantId, dateTime, isTimedOut);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantHeldNotification);
    }
});

/**
 * ParticipantVoicemailNotification class
 *  
 * Notification indicating that a participant in the chat has gone to a participant's voicemail.
 */
ININ.Web.Chat.WebServices.ParticipantVoicemailNotification = Class.create(ININ.Web.Chat.WebServices._Internal.ParticipantNotificationBase,
{
	/**
	 * Constructor 
	 *  
	 * @param participantId The chat has gone to the voicemail of the participant with this ID.
	 * @param dateTime Timestamp for the notification.  Javascript Date object.
	 * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
	 */
    initialize:function($super, participantId, dateTime, isTimedOut)
    {
        if((arguments.length != 3) && (arguments.length != 4))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ParticipantVoicemailNotification constructor called with " + arguments.length + " arguments, but expected 3 or 4.");
        }

        $super(participantId, dateTime, isTimedOut);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantVoicemailNotification);
    }
});

/**
 * ParticipantDisconnectedNotification class
 *  
 * Notification indicating that a participant in the chat has disconnected.
 */
ININ.Web.Chat.WebServices.ParticipantDisconnectedNotification = Class.create(ININ.Web.Chat.WebServices._Internal.ParticipantNotificationBase,
{
	/**
	 * Constructor 
	 *  
	 * @param participantId ID of the person who has disconnected. 
	 * @param dateTime Timestamp for the notification.  Javascript Date object.
	 * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
	 */
    initialize:function($super, participantId, dateTime, isTimedOut)
    {
        if((arguments.length != 3) && (arguments.length != 4))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ParticipantDisconnectedNotification constructor called with " + arguments.length + " arguments, but expected 3 or 4.");
        }

        $super(participantId, dateTime, isTimedOut);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantDisconnectedNotification);
    }
});

/**
 * ParticipantStartedTypingNotification class
 *  
 * Notification indicating that a participant in the chat has started typing.
 */
ININ.Web.Chat.WebServices.ParticipantStartedTypingNotification = Class.create(ININ.Web.Chat.WebServices._Internal.ParticipantNotificationBase,
{
	/**
	 * Constructor 
	 *  
	 * @param participantId ID of the person who has started typing. 
	 * @param dateTime Timestamp for the notification.  Javascript Date object.
	 * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
	 */
    initialize:function($super, participantId, dateTime, isTimedOut)
    {
        if((arguments.length != 3) && (arguments.length != 4))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ParticipantStartedTypingNotification constructor called with " + arguments.length + " arguments, but expected 3 or 4.");
        }

        $super(participantId, dateTime, isTimedOut);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantStartedTypingNotification);
    }
});

/**
 * ParticipantStoppedTypingNotification class
 *  
 * Notification indicating that a participant in the chat has stopped typing.
 */
ININ.Web.Chat.WebServices.ParticipantStoppedTypingNotification = Class.create(ININ.Web.Chat.WebServices._Internal.ParticipantNotificationBase,
{
	/**
	 * Constructor 
	 *  
	 * @param participantId ID of the person who has stopped typing. 
	 * @param dateTime Timestamp for the notification.  Javascript Date object.
	 * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
	 */
    initialize:function($super, participantId, dateTime, isTimedOut)
    {
        if((arguments.length != 3) && (arguments.length != 4))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ParticipantStoppedTypingNotification constructor called with " + arguments.length + " arguments, but expected 3 or 4.");
        }

        $super(participantId, dateTime, isTimedOut);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantStoppedTypingNotification);
    }
});

/**
 * ReceivedTextNotification class
 *  
 * Notification indicating that a participant in the chat has typed something.
 */
ININ.Web.Chat.WebServices.ReceivedTextNotification = Class.create(ININ.Web.Chat.WebServices._Internal.ParticipantNotificationBase,
{
	/**
	 * Constructor 
	 *  
	 * @param participantId ID of the person who sent a message. 
	 * @param dateTime Timestamp for the notification.  Javascript Date object.
	 * @param conversationSequenceNumber Separate sequence number tracking only received text, URLs, and files.  If 5 ParticipantStateChangedEvents are sent, followed by 8 ReceivedTextEvents and 2 ReceivedUrlEvents, the last event received will have sequenceNumber 14 and conversationSequenceNumber 9.
     * @param messageText What the participant typed 
     * @param contentType The mime type of messageText.  Likely either "text/plain" or "text/html". 
	 * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
	 */
    initialize:function($super, participantId, dateTime, conversationSequenceNumber, messageText, contentType, isTimedOut)
    {
        if((arguments.length != 6) && (arguments.length != 7))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ReceivedTextNotification constructor called with " + arguments.length + " arguments, but expected 6 or 7.");
        }

        $super(participantId, dateTime, isTimedOut);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IReceivedTextNotification);
        
        this._conversationSequenceNumber = conversationSequenceNumber;
        this._messageText = messageText;
        this._contentType = contentType;
    },

    // public methods

	/**
	 * Gets the conversation sequence number.
	 * This is a separate sequence number tracking only received text, URLs, and files. 
	 * If 5 ParticipantStateChangedEvents are sent, followed by 8 ReceivedTextEvents and 2 ReceivedUrlEvents, the 
	 * last event received will have sequenceNumber 14 and conversationSequenceNumber 9.
	 *  
	 * @return integer 
	 */
    get_conversationSequenceNumber : function()
    {
        return this._conversationSequenceNumber;
    },

	/**
	 * Gets the message that the participant typed.
	 *  
	 * @return string
	 */
    get_messageText : function()
    {
        return this._messageText;
    },

	/**
	 * Gets the mime type of the message that the participant typed.
	 *  
	 * @return string
	 */
    get_contentType : function()
    {
        return this._contentType;
    }
});

/**
 * ReceivedCommandNotification class
 *  
 * Notification indicating that a participant in the chat has typed a special string that should cause the application to 
 * do something, rather than be displayed to the other participants.
 */
ININ.Web.Chat.WebServices.ReceivedCommandNotification = Class.create(ININ.Web.Chat.WebServices._Internal.ParticipantNotificationBase,
{
	/**
	 * Constructor 
	 *  
	 * @param participantId ID of the person who typed a command. 
	 * @param dateTime Timestamp for the notification.  Javascript Date object.
	 * @param conversationSequenceNumber Separate sequence number tracking only received text, URLs, and files.  If 5 ParticipantStateChangedEvents are sent, followed by 8 ReceivedTextEvents and 2 ReceivedUrlEvents, the last event received will have sequenceNumber 14 and conversationSequenceNumber 9.
	 * @param command What the participant typed 
	 * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
	 */
    initialize:function($super, participantId, dateTime, conversationSequenceNumber, command, isTimedOut)
    {
        if((arguments.length != 5) && (arguments.length != 6))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ReceivedCommandNotification constructor called with " + arguments.length + " arguments, but expected 5 or 6.");
        }

        $super(participantId, dateTime, isTimedOut);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IReceivedCommandNotification);
        
        this._conversationSequenceNumber = conversationSequenceNumber;
        this._command = command;
    },

    // public methods

	/**
	 * Gets the conversation sequence number.
	 * This is a separate sequence number tracking only received text, URLs, and files. 
	 * If 5 ParticipantStateChangedEvents are sent, followed by 8 ReceivedTextEvents and 2 ReceivedUrlEvents, the 
	 * last event received will have sequenceNumber 14 and conversationSequenceNumber 9.
	 *  
	 * @return integer 
	 */
    get_conversationSequenceNumber : function()
    {
        return this._conversationSequenceNumber;
    },

	/**
	 * Gets the message that the participant typed.
	 *  
	 * @return string
	 */
    get_command : function()
    {
        return this._command;
    }
});

/**
 * ReceivedUrlNotification class
 *  
 * Notification indicating that a participant in the chat has sent a URL.
 */
ININ.Web.Chat.WebServices.ReceivedUrlNotification = Class.create(ININ.Web.Chat.WebServices._Internal.ParticipantNotificationBase,
{
	/**
	 * Constructor 
	 *  
	 * @param participantId ID of the person who sent a message. 
	 * @param dateTime Timestamp for the notification.  Javascript Date object.
	 * @param conversationSequenceNumber Separate sequence number tracking only received text, URLs, and files.  If 5 ParticipantStateChangedEvents are sent, followed by 8 ReceivedTextEvents and 2 ReceivedUrlEvents, the last event received will have sequenceNumber 14 and conversationSequenceNumber 9.
	 * @param messageUrl The URL that the participant sent.
	 * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
	 */
    initialize:function($super, participantId, dateTime, conversationSequenceNumber, messageUrl, isTimedOut)
    {
        if((arguments.length != 5) && (arguments.length != 6))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ReceivedUrlNotification constructor called with " + arguments.length + " arguments, but expected 5 or 6.");
        }

        $super(participantId, dateTime, isTimedOut);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IReceivedUrlNotification);

        this._conversationSequenceNumber = conversationSequenceNumber;
        this._messageUrl = messageUrl;
    },

    // public methods

	/**
	 * Gets the conversation sequence number.
	 * This is a separate sequence number tracking only received text, URLs, and files. 
	 * If 5 ParticipantStateChangedEvents are sent, followed by 8 ReceivedTextEvents and 2 ReceivedUrlEvents, the 
	 * last event received will have sequenceNumber 14 and conversationSequenceNumber 9.
	 *  
	 * @return integer 
	 */
    get_conversationSequenceNumber : function()
    {
        return this._conversationSequenceNumber;
    },

	/**
	 * Gets the URL that the participant sent.
	 *  
	 * @return string
	 */
    get_messageUrl : function()
    {
        return this._messageUrl;
    }
});

/**
 * ReceivedFileNotification class
 *  
 * Notification indicating that a participant in the chat has sent a file.
 */
ININ.Web.Chat.WebServices.ReceivedFileNotification = Class.create(ININ.Web.Chat.WebServices._Internal.ParticipantNotificationBase,
{
	/**
	 * Constructor 
	 *  
	 * @param participantId ID of the person who sent a message. 
	 * @param dateTime Timestamp for the notification.  Javascript Date object.
	 * @param conversationSequenceNumber Separate sequence number tracking only received text, URLs, and files.  If 5 ParticipantStateChangedEvents are sent, followed by 8 ReceivedTextEvents and 2 ReceivedUrlEvents, the last event received will have sequenceNumber 14 and conversationSequenceNumber 9.
	 * @param messageRelativeUrl The URL that the web user can use to retrieve the file.
	 * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
	 */
    initialize:function($super, participantId, dateTime, conversationSequenceNumber, messageRelativeUrl, isTimedOut)
    {
        if((arguments.length != 5) && (arguments.length != 6))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ReceivedFileNotification constructor called with " + arguments.length + " arguments, but expected 5 or 6.");
        }

        $super(participantId, dateTime, isTimedOut);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IReceivedFileNotification);
        
        this._conversationSequenceNumber = conversationSequenceNumber;
        this._messageRelativeUrl = messageRelativeUrl;
    },

    // public methods

	/**
	 * Gets the conversation sequence number.
	 * This is a separate sequence number tracking only received text, URLs, and files. 
	 * If 5 ParticipantStateChangedEvents are sent, followed by 8 ReceivedTextEvents and 2 ReceivedUrlEvents, the 
	 * last event received will have sequenceNumber 14 and conversationSequenceNumber 9.
	 *  
	 * @return integer 
	 */
    get_conversationSequenceNumber : function()
    {
        return this._conversationSequenceNumber;
    },

	/**
	 * Gets the URL that the web user can use to retrieve the file that the participant sent.
	 *  
	 * @return string
	 */
    get_messageRelativeUrl : function()
    {
        return this._messageRelativeUrl;
    }
});


/**
 * FailoverNotification class
 *  
 * Notification indicating that a failover has occurred.
 */
ININ.Web.Chat.WebServices.FailoverNotification = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        if(arguments.length != 1)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("FailoverNotification constructor called with " + arguments.length + " arguments, but expected 1.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IFailoverNotification);
    }
});


/**
 * FailoverUINotification class
 *  
 * Notification indicating (to the UI) that a failover has occurred.
 */
ININ.Web.Chat.WebServices.FailoverUINotification = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        if(arguments.length != 1)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("FailoverUINotification constructor called with " + arguments.length + " arguments, but expected 1.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IFailoverUINotification);
    }
});


/**
 * ChatReconnectNotification class
 *  
 * Notification indicating that a chat has reconnected.
 */
ININ.Web.Chat.WebServices.ChatReconnectNotification = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        if(arguments.length != 1)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ChatReconnectNotification constructor called with " + arguments.length + " arguments, but expected 1.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IChatReconnectNotification);
    }
});


/**
 * ResumedPollingNotification class
 *  
 * Notification indicating that a reconnect has occurred.
 */
ININ.Web.Chat.WebServices.ResumedPollingNotification = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        if(arguments.length != 1)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ResumedPollingNotification constructor called with " + arguments.length + " arguments, but expected 1.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IResumedPollingNotification);
    }
});


/**
 * ChatReconnectFailureNotification class
 *  
 * Notification indicating that a chat has failed to reconnect. 
 */
ININ.Web.Chat.WebServices.ChatReconnectFailureNotification = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        if(arguments.length != 1)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ChatReconnectFailureNotification constructor called with " + arguments.length + " arguments, but expected 1.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IChatReconnectFailureNotification);
    }
});


/**
 * RefreshPageNotification class
 *  
 * Notification indicating that the user needs to refresh the page to start a new chat.
 */
ININ.Web.Chat.WebServices.RefreshPageNotification = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
	/**
	 * Constructor 
	 *  
	 * @param newUriFragment The URI fragment that should now be used to reverse proxy requests through the webserver to the IC server. 
	 */
    initialize : function($super, newUriFragment)
    {
        if((arguments.length != 1) && (arguments.length != 2))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("RefreshPageNotification constructor called with " + arguments.length + " arguments, but expected 1 or 2.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IRefreshPageNotification);

        this._newUriFragment = newUriFragment;
    },

    // public methods

	/**
	 * Returns the new URI fragment to use to reverse proxy requests through the webserver to the IC server. 
	 *
	 * @return The URI fragment that should now be used.
	 */
    get_newUriFragment : function()
    {
        return this._newUriFragment;
    }
});


/**
 * CurrentParticipantIdChangedNotification class
 *  
 * Notification indicating that the ID of the current participant (i.e. the person whose web browser is running this code) has changed. 
 */
ININ.Web.Chat.WebServices.CurrentParticipantIdChangedNotification = Class.create(ININ.Web.Chat.WebServices._Internal.ParticipantNotificationBase,
{
	/**
	 * Constructor 
	 *  
	 * @param participantId The new ID of the current participant 
	 * @param dateTime Timestamp for the notification.  Javascript Date object.
	 * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
	 */
    initialize:function($super, participantId, dateTime, isTimedOut)
    {
        if((arguments.length != 3) && (arguments.length != 4))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("CurrentParticipantIdChangedNotification constructor called with " + arguments.length + " arguments, but expected 3 or 4.");
        }

        $super(participantId, dateTime, isTimedOut);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICurrentParticipantIdChangedNotification);
    }
});

/**
 * PageNotificationBase class 
 *  
 * Base class of objects which other objects may listen for, which indicate that something has occurred pertaining 
 * to the browser loading or unloading the page.  These notifications are not received from the IC server.
 */
ININ.Web.Chat.WebServices._Internal.PageNotificationBase = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        if(arguments.length != 1)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("PageNotificationBase constructor called with " + arguments.length + " arguments, but expected 1.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IPageNotification);
    }
});

/**
 * PageBeforeUnloadNotification class 
 *  
 * Notification indicating that web browser is about to unload the web page.
 */
ININ.Web.Chat.WebServices.PageBeforeUnloadNotification = Class.create(ININ.Web.Chat.WebServices._Internal.PageNotificationBase,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        if(arguments.length != 1)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("PageBeforeUnloadNotification constructor called with " + arguments.length + " arguments, but expected 1.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IPageBeforeUnloadNotification);
    }
});

/**
 * PageUnloadNotification class 
 *  
 * Notification indicating that web browser has completed unloading the web page.
 */
ININ.Web.Chat.WebServices.PageUnloadNotification = Class.create(ININ.Web.Chat.WebServices._Internal.PageNotificationBase,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        if(arguments.length != 1)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("PageUnloadNotification constructor called with " + arguments.length + " arguments, but expected 1.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IPageUnloadNotification);
    }
});

/**
 * ChatCreationNotification class
 *  
 * Notification indicating that a chat has been created.
 */
ININ.Web.Chat.WebServices.ChatCreationNotification = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
	/**
     * Constructor 
     *
     * @param currentParticipantId An identifier which will be used to refer to the party that created the chat. 
     * @param dateFormat A string specifying how dates should be formatted, as described in http://msdn.microsoft.com/en-us/library/dd317787%28v=vs.85%29.aspx 
     * @param timeFormat A string specifying how times should be formatted, as described in http://msdn.microsoft.com/en-us/library/dd318148%28v=vs.85%29.aspx 
	 */
    initialize : function($super, currentChatId, currentParticipantId, dateFormat, timeFormat)
    {
        if(arguments.length != 5)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ChatCreationNotification constructor called with " + arguments.length + " arguments, but expected 5.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IChatCreationNotification);

		this._currentChatId = currentChatId;
        this._currentParticipantId = currentParticipantId;
        this._dateFormat = dateFormat;
        this._timeFormat = timeFormat;
    },

	 /** 
     * Returns the ID that will be used to refer to this chat. 
     *  
     * @returns GUID 
     */	
	get_currentChatId : function()
	{
		return this._currentChatId;
	},
	
    /** 
     * Returns the ID that will be used to refer to this participant for the remainder of the chat. 
     *  
     * @return GUID 
     */
    get_currentParticipantId : function()
    {
        return this._currentParticipantId;
    },

    /** 
     * Returns the format that will be used to display dates
     *  
     * @return String as described in http://msdn.microsoft.com/en-us/library/dd317787%28v=vs.85%29.aspx 
     */
    get_dateFormat : function()
    {
        return this._dateFormat;
    },

    /** 
     * Returns the format that will be used to display times
     *  
     * @return String as described in http://msdn.microsoft.com/en-us/library/dd318148%28v=vs.85%29.aspx
     */
    get_timeFormat : function()
    {
        return this._timeFormat;
    }
});

/**
 * ChatCreationFailureNotification class
 *  
 * Notification indicating that an attempt to create a chat has failed.
 */
ININ.Web.Chat.WebServices.ChatCreationFailureNotification = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
	/**
	 * Constructor
     *  
     * @param error The error that caused the failure 
	 */
    initialize : function($super, error)
    {
        if(arguments.length != 2)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ChatCreationFailureNotification constructor called with " + arguments.length + " arguments, but expected 2.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IChatCreationFailureNotification);

        this._error = error;
    },

    /**
     * Returns the error that caused this failure.
     */
    get_error : function()
    {
        return this._error;
    }
});

/**
 * ChatCompletionNotification class
 *  
 * Notification indicating that a chat has completed.
 */
ININ.Web.Chat.WebServices.ChatCompletionNotification = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        if(arguments.length != 1)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ChatCompletionNotification constructor called with " + arguments.length + " arguments, but expected 1.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IChatCompletionNotification);
    }
});

/**
 * ChatCompletionFailureNotification class
 *  
 * Notification indicating that an attempt to exit a chat has failed.
 */
ININ.Web.Chat.WebServices.ChatCompletionFailureNotification = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
	/**
	 * Constructor
     *  
     * @param error The error that caused the failure 
	 */
    initialize : function($super, error)
    {
        if(arguments.length != 2)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ChatCompletionFailureNotification constructor called with " + arguments.length + " arguments, but expected 2.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IChatCompletionFailureNotification);

        this._error = error;
    },

    /**
     * Returns the error that caused this failure.
     */
    get_error : function()
    {
        return this._error;
    }
});

/**
 * ChatReconnectUINotification class
 *  
 * Notification indicating (to the UI) that a chat has reconnected. 
 */
ININ.Web.Chat.WebServices.ChatReconnectUINotification = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        if(arguments.length != 1)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ChatReconnectUINotification constructor called with " + arguments.length + " arguments, but expected 1.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IChatReconnectUINotification);
    }
});

/**
 * CallbackCreationNotification class
 *  
 * Notification indicating that a callback has been created.
 */
ININ.Web.Chat.WebServices.CallbackCreationNotification = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
    /** 
     * Constructor 
     * @param participantId An identifier which will be used to refer to the party that created the callback for the duration of the current web session. 
     * @param callbackId ID of the callback.  It may be used for the duration of the callback to bring the callback into a then-current web session.  If the IVR permits, it may also be entered into the IVR to manage the callback via telephone.  Will be null if the IC server does not supply it.
     * @param userIdentityId ID of the user who created this callback.  It may be used for the duration of the callback to bring the callback into a then-current web session.  If the IVR permits, it may also be entered into the IVR to manage the callback via telephone.  Will be null if the IC server does not supply it. 
     * @param participantName The name or username of the web user who has created the callback request 
     * @param telephone The telephone number at which the participant indicated they would like to be called 
     * @param subject The topic which the participant wishes to discuss with the agent 
     * @param creationDateTime A Javascript Date object containing the timestamp of when the callback request was created 
	 */
    initialize : function($super, participantId, callbackId, userIdentityId, participantName, telephone, subject, creationDateTime)
    {
        var numArgs = 8;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("CallbackCreationNotification constructor called with " + arguments.length + " arguments, but expected " + numArgs);
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackCreationNotification);

        this._participantId = participantId;
        this._callbackId = callbackId;
        this._userIdentityId = userIdentityId;
        this._participantName = participantName;
        this._telephone = telephone;
        this._subject = subject;
        this._creationDateTime = creationDateTime;
    },

    /** 
     * Returns the ID that will be used to refer to this participant for the callback. 
     *  
     * @return GUID 
     */
    get_participantId : function()
    {
        return this._participantId;
    },

	/**
     * Gets the ID of the callback, so it may be reconnected 
     * (i.e. brought into a then-current web session) later. 
     * This ID's lifespan is that of the Callback. 
	 *  
     * @return ID of the callback
	 */
    get_callbackId : function()
    {
        return this._callbackId;
    },

	/**
     * Gets the ID of the user who created this callback
     * This ID's lifespan is that of the Callback. 
	 *  
	 * @return ID of the user 
	 */
    get_userIdentityId : function()
    {
        return this._userIdentityId;
    },

    /**
     * Gets the name or username of the user who created this callback request.
     *  
     * @return String containing the name or username 
     */
    get_participantName : function()
    {
        return this._participantName;
    },

    /**
     * Gets the telephone number at which the participant indicated they would like to be called 
     *  
     * @return String containing the telephone number 
     */
    get_telephone : function()
    {
        return this._telephone;
    },

    /**
     * Gets the subject/description of the callback. 
     * This was supplied by the user when the callback was created. 
     *  
     * @return String containing the subject
     */
    get_subject : function()
    {
        return this._subject;
    },

    /**
     * Gets the date and time when this callback request was sent.
     *  
     * @return Javascript Date object 
     */
    get_creationDateTime : function()
    {
        return this._creationDateTime;
    }
});

/**
 * CallbackCreationFailureNotification class
 *  
 * Notification indicating that an attempt to create a callback has failed.
 */
ININ.Web.Chat.WebServices.CallbackCreationFailureNotification = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
	/**
     * Constructor 
     *  
     * @param error The error that caused the failure 
	 */
    initialize : function($super, error)
    {
        if(arguments.length != 2)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("CallbackCreationFailureNotification constructor called with " + arguments.length + " arguments, but expected 2.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackCreationFailureNotification);

        this._error = error;
    },

    /**
     * Returns the error that caused this failure.
     */
    get_error : function()
    {
        return this._error;
    }
});

/**
 * CallbackStatusNotification class
 *  
 * Notification containing a callback's status
 */
ININ.Web.Chat.WebServices.CallbackStatusNotification = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
    /** 
     * Constructor 
     *  
     * @param participantId The identifier which associates the web visitor with the callback that has been queried. 
     * @param queueWaitTime number of seconds
     * @param assignedAgentName Agent's name
     * @param assignedAgentParticipantId ID identifying the agent
     * @param interactionState The state of the interaction 
     * @param estimatedCallbackTime number of seconds before it is estimated that the callback will be made
     * @param queuePosition integer indicating the callback's position in the queue
     * @param queueName the name of the queue 
     * @param longestWaitTime The longest amount of time (in seconds) an interaction waited before being connected on the queue to which the current callback is targetted.
     * @param interactionsWaitingCount The number of calls waiting
     * @param loggedInAgentsCount the number of logged in agents who meet this callback's routing critieria
     * @param availableAgentsCount the number of available agents who meet this callback's routing criteria
     * @param statusIndicator A key to quickly indicate the status of the callback 
	 */
    initialize : function($super, participantId, queueWaitTime, assignedAgentName, assignedAgentParticipantId,
                          interactionState, estimatedCallbackTime, queuePosition, queueName,
                          longestWaitTime, interactionsWaitingCount, loggedInAgentsCount, availableAgentsCount,
                          statusIndicator)
    {
        var numArgs = 14;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("CallbackStatusNotification constructor called with " + arguments.length + " arguments, but expected " + numArgs);
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackStatusNotification);

        this._participantId = participantId;
        this._queueWaitTime = queueWaitTime;
        this._assignedAgentName = assignedAgentName;
        this._assignedAgentParticipantId = assignedAgentParticipantId;
        this._interactionState = interactionState;
        this._estimatedCallbackTime = estimatedCallbackTime;
        this._queuePosition = queuePosition;
        this._queueName = queueName;
        this._longestWaitTime = longestWaitTime;
        this._interactionsWaitingCount = interactionsWaitingCount;
        this._loggedInAgentsCount = loggedInAgentsCount;
        this._availableAgentsCount = availableAgentsCount;
        this._statusIndicator = statusIndicator;
    },

    /** 
     * Returns the ID that is used to associate the web visitor with the callback that has been queried. 
     *  
     * @return GUID 
     */
    get_participantId : function()
    {
        return this._participantId;
    },

	/**
     * Gets the queue's wait time
	 *  
     * @return number of seconds
	 */
    get_queueWaitTime : function()
    {
        return this._queueWaitTime;
    },

	/**
     * Gets the assigned agent's name
	 *  
     * @return Agent's name
	 */
    get_assignedAgentName : function()
    {
        return this._assignedAgentName;
    },

	/**
     * Gets the assigned agent's participant ID
	 *  
     * @return ID identifying the agent
	 */
    get_assignedAgentParticipantId : function()
    {
        return this._assignedAgentParticipantId;
    },

	/**
     * Gets the interaction state
	 *  
     * @return interaction state
	 */
    get_interactionState : function()
    {
        return this._interactionState;
    },

	/**
     * Gets the estimated callback time, expressed in "seconds after now"
	 *  
     * @return number of seconds before it is estimated that the callback will be made
	 */
    get_estimatedCallbackTime : function()
    {
        return this._estimatedCallbackTime;
    },

	/**
     * Gets the callback's position in the queue
	 *  
     * @return integer indicating the callback's position in the queue
	 */
    get_queuePosition : function()
    {
        return this._queuePosition;
    },

	/**
     * Gets the name of the queue
	 *  
     * @return the name of the queue
	 */
    get_queueName : function()
    {
        return this._queueName;
    },

	/**
     * Gets the longest amount of time (in seconds) an interaction waited before being connected on the queue to which the current callback is targetted.
	 * 
     * @return longestWaitTime 
	 */
    get_longestWaitTime : function()
    {
        return this._longestWaitTime;
    },

	/**
     * Gets the number of calls waiting
	 *  
     * @return the number of calls waiting
	 */
    get_interactionsWaitingCount : function()
    {
        return this._interactionsWaitingCount;
    },

	/**
     * Gets the number of logged in agents who meet this callback's routing criteria
	 *  
     * @return the number of logged in agents who meet this callback's routing critieria
	 */
    get_loggedInAgentsCount : function()
    {
        return this._loggedInAgentsCount;
    },

	/**
     * Gets the number of available agents who meet this callback's routing criteria
	 *  
     * @return the number of available agents who meet this callback's routing criteria
	 */
    get_availableAgentsCount : function()
    {
        return this._availableAgentsCount;
    },

    /**
     * Returns a key to indicate the status of the callback
     *  
     * @return statusIndicator string 
     */
    get_statusIndicator : function()
    {
        return this._statusIndicator;
    }
});

/**
 * CallbackStatusFailureNotification class
 *  
 * Notification indicating that an attempt to query the status of a callback has failed.
 */
ININ.Web.Chat.WebServices.CallbackStatusFailureNotification = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
	/**
     * Constructor 
     *  
     * @param error The error that caused the failure 
	 */
    initialize : function($super, error)
    {
        if(arguments.length != 2)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("CallbackStatusFailureNotification constructor called with " + arguments.length + " arguments, but expected 2.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackStatusFailureNotification);

        this._error = error;
    },

    /**
     * Returns the error that caused this failure.
     *  
     * @return The error that caused this failure. 
     */
    get_error : function()
    {
        return this._error;
    }
});

/**
 * CallbackDisconnectNotification class
 *  
 * Notification indicating that a callback interaction has been disconnected (i.e. cancelled)
 */
ININ.Web.Chat.WebServices.CallbackDisconnectNotification = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
    /** 
     * Constructor 
     * @param participantId The identifier which associated the web visitor with the callback that has been disconnected.  This identifier is no longer valid, and is included so that consumers of this notification may remove it from their data structures, user interfaces, etc.
	 */
    initialize : function($super, participantId)
    {
        if(arguments.length != 2)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("CallbackDisconnectNotification constructor called with " + arguments.length + " arguments, but expected 2.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackDisconnectNotification);

        this._participantId = participantId;
    },

    /** 
     * Returns the ID that was used to associate the web visitor with the callback that has been disconnected.  This identifier is no longer valid, and is made available so that consumers of this notification may remove it from their data structures, user interfaces, etc.
     *  
     * @return GUID 
     */
    get_participantId : function()
    {
        return this._participantId;
    }
});

/**
 * CallbackDisconnectFailureNotification class
 *  
 * Notification indicating that an attempt to disconnect a callback has failed.
 */
ININ.Web.Chat.WebServices.CallbackDisconnectFailureNotification = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
	/**
     * Constructor 
     *  
     * @param error The error that caused the failure 
	 */
    initialize : function($super, error)
    {
        if(arguments.length != 2)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("CallbackDisconnectFailureNotification constructor called with " + arguments.length + " arguments, but expected 2.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackDisconnectFailureNotification);

        this._error = error;
    },

    /**
     * Returns the error that caused this failure. 
     *  
     * @return The error that caused this failure. 
     */
    get_error : function()
    {
        return this._error;
    }
});

/**
 * CallbackReconnectNotification class
 *  
 * Notification indicating that a callback interaction has been reconnected (i.e. brought into the 
 * current web session)
 */
ININ.Web.Chat.WebServices.CallbackReconnectNotification = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
    /** 
     * Constructor 
     *  
     * @param participantId An identifier which will be used to refer to the party that created the callback. 
	 */
    initialize : function($super, participantId)
    {
        var numExpectedArgs = 2;
        if(arguments.length != numExpectedArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("CallbackReconnectNotification constructor called with " + arguments.length + " arguments, but expected " + numExpectedArgs);
        }

        $super();

        this._participantId = participantId;

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackReconnectNotification);
    },

    /** 
     * Returns the ID that will be used to refer to this participant for the callback. 
     *  
     * @return GUID 
     */
    get_participantId : function()
    {
        return this._participantId;
    }
});

/**
 * CallbackReconnectFailureNotification class
 *  
 * Notification indicating that an attempt to reconnect a callback has failed.
 */
ININ.Web.Chat.WebServices.CallbackReconnectFailureNotification = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
	/**
     * Constructor 
     *  
     * @param error The error that caused the failure 
	 */
    initialize : function($super, error)
    {
        var numExpectedArgs = 2;
        if(arguments.length != numExpectedArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("CallbackReconnectFailureNotification constructor called with " + arguments.length + " arguments, but expected " + numExpectedArgs);
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackReconnectFailureNotification);

        this._error = error;
    },

    /**
     * Returns the error that caused this failure. 
     *  
     * @return The error that caused this failure. 
     */
    get_error : function()
    {
        return this._error;
    }
});

/**
 * PartyInfoNotification class
 *  
 * Notification containing information pertaining to a party in an interaction, such as their name and photograph.
 */
ININ.Web.Chat.WebServices.PartyInfoNotification = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
    /** 
     * Constructor 
     *  
     * @param localParticipantId The participantId of the agent whose info is being queried. 
     * @param remoteParticipantId The participantId of the agent whose info is being queried. 
	 * @param name The name of the participant
     * @param photo Location of the photo of the participant 
	 */
    initialize : function($super, localParticipantId, remoteParticipantId, name, photo)
    {
        var minExpectedArgs = 4;
        var maxExpectedArgs = 5;
        if(arguments.length < minExpectedArgs || arguments.length > maxExpectedArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("PartyInfoNotification constructor called with " + arguments.length + " arguments, but expected between " + minExpectedArgs + " and " + maxExpectedArgs);
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IPartyInfoNotification);

        this._name = name;
        this._photo = photo;
        this._localParticipantId = localParticipantId;
        this._remoteParticipantId = remoteParticipantId;
    },

	/**
	 * Gets the name of the participant to whom this response pertains 
	 *  
	 * @return name of the participant 
	 */
    get_name : function()
    {
        return this._name;
    },

	/**
	 * Gets the location of the photo of the participant to whom this response pertains 
	 *  
	 * @return Location of the photo of the participant 
	 */
    get_photo : function()
    {
        return this._photo;
    },

    /** 
     * Returns the ID of the local participant (i.e. the one whose web browser is running this code)
     *  
     * @return GUID 
     */
    get_localParticipantId : function()
    {
        return this._localParticipantId;
    },

    /** 
     * Returns the ID of the remote participant (i.e. the one whose name and photo are supplied by this Notification)
     *  
     * @return GUID 
     */
    get_remoteParticipantId : function()
    {
        return this._remoteParticipantId;
    }
});

/**
 * PartyInfoFailureNotification class
 *  
 * Notification indicating that an attempt to get information about a party in an interaction has failed.
 */
ININ.Web.Chat.WebServices.PartyInfoFailureNotification = Class.create(ININ.Web.Chat.WebServices._Internal.NotificationBase,
{
	/**
     * Constructor 
     *  
     * @param error The error that caused the failure 
	 */
    initialize : function($super, error)
    {
        var numExpectedArgs = 2;
        if(arguments.length != numExpectedArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("PartyInfoFailureNotification constructor called with " + arguments.length + " arguments, but expected " + numExpectedArgs);
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IPartyInfoFailureNotification);

        this._error = error;
    },

    /**
     * Returns the error that caused this failure. 
     *  
     * @return The error that caused this failure. 
     */
    get_error : function()
    {
        return this._error;
    }
});


/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/**
 * NotificationFactory class 
 *  
 * Creates Notification objects which other objects may listen for. 
 */
ININ.Web.Chat.WebServices._Internal.NotificationFactory = Class.create(ININ.Web.Common.InterfaceImplementation,
{
    /**
     * Constructor
     */
    initialize : function($super)
    {
        if(arguments.length != 1)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("NotificationFactory constructor called with " + arguments.length + " arguments, but expected 1.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.INotificationFactory);
    },

    // public methods

    /**
     * Creates a CurrentParticipantIdChangedNotification, to indicate that the ID of the current participant (i.e. the person whose 
     * web browser is running this code) has changed. 
     *  
     * @param participantId The new ID of the current participant 
     * @param dateTime When the change occurred
     * @return CurrentParticipantIdChangedNotification
     */
    createCurrentParticipantIdChangedNotification : function(participantId, dateTime)
    {
        return new ININ.Web.Chat.WebServices.CurrentParticipantIdChangedNotification(participantId, dateTime);
    },

    /**
     * Creates a ParticipantJoinedNotification, to indicate that someone has joined the chat. 
     *  
     * @param evt A ParticipantStateChangedEvent 
     * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
     * @return ParticipantJoinedNotification
     */
    createParticipantJoinedNotification : function(evt, isTimedOut)
    {
        return new ININ.Web.Chat.WebServices.ParticipantJoinedNotification(evt.get_participantId(), evt.get_participantName(), evt.get_dateTime(), isTimedOut);
    },

    /**
     * Creates a ParticipantLeftNotification, to indicate that someone has left the chat. 
     *  
     * @param evt A ParticipantStateChangedEvent
     * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
     * @return ParticipantLeftNotification
     */
    createParticipantLeftNotification : function(evt, isTimedOut)
    {
        return new ININ.Web.Chat.WebServices.ParticipantLeftNotification(evt.get_participantId(), evt.get_dateTime(), isTimedOut);
    },

    /**
     * Creates a NewParticipantNotification, to indicate that someone has joined an interaction. 
     *  
     * @param participantId ID of the person who is now in the interaction.
     * @param participantName The name of the participant who is now in the interaction.
     * @param interactionType The type of interaction in which the person is participating.  A constant defined in ININ.Web.Chat.WebServices.InteractionTypes. 
     * @param dateTime Timestamp for the notification.  Javascript Date object.
     * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc.
     * @return NewParticipantNotification
     */
    createNewParticipantNotification : function(participantId, participantName, interactionType, dateTime, isTimedOut)
    {
        return new ININ.Web.Chat.WebServices.NewParticipantNotification(participantId, participantName, interactionType, dateTime, isTimedOut);
    },

    /**
     * Creates a NewParticipantNotification, to indicate that someone has joined the chat. 
     *  
     * @param evt A ParticipantStateChangedEvent
     * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc.
     * @return NewParticipantNotification
     */
    createNewParticipantNotificationForChat : function(evt, isTimedOut)
    {
        return this.createNewParticipantNotification(evt.get_participantId(), evt.get_participantName(), ININ.Web.Chat.WebServices.InteractionTypes.CHAT, evt.get_dateTime(), isTimedOut);
    },

    /**
     * Creates a ParticipantNameChangedNotification, to indicate that the name of someone in the chat has changed.
     *  
     * @param evt A ParticipantStateChangedEvent
     * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
     * @return ParticipantNameChangedNotification
     */
    createParticipantNameChangedNotification : function(evt, isTimedOut)
    {
            return new ININ.Web.Chat.WebServices.ParticipantNameChangedNotification(evt.get_participantId(), evt.get_participantName(), evt.get_dateTime(), isTimedOut);
    },

    /**
     * Creates a ParticipantInitializingNotification, to indicate that someone in the chat is initializing.
     *  
     * @param evt A ParticipantStateChangedEvent
     * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
     * @return ParticipantInitializingNotification
     */
    createParticipantInitializingNotification : function(evt, isTimedOut)
    {
        return new ININ.Web.Chat.WebServices.ParticipantInitializingNotification(evt.get_participantId(), evt.get_participantName(), evt.get_dateTime(), isTimedOut);
    },

    /**
     * Creates a ParticipantAlertingNotification, to indicate that someone in the chat is alerting.
     *  
     * @param evt A ParticipantStateChangedEvent
     * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
     * @return ParticipantAlertingNotification
     */
    createParticipantAlertingNotification : function(evt, isTimedOut)
    {
        return new ININ.Web.Chat.WebServices.ParticipantAlertingNotification(evt.get_participantId(), evt.get_participantName(), evt.get_dateTime(), isTimedOut);
    },

    /**
     * Creates a ParticipantActiveNotification, to indicate that someone in the chat has become active.
     *  
     * @param evt A ParticipantStateChangedEvent
     * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
     * @return ParticipantActiveNotification
     */
    createParticipantActiveNotification : function(evt, isTimedOut)
    {
        return new ININ.Web.Chat.WebServices.ParticipantActiveNotification(evt.get_participantId(), evt.get_dateTime(), isTimedOut);
    },

    /**
     * Creates a ParticipantHeldNotification, to indicate that someone in the chat has put the chat on hold.
     *  
     * @param evt A ParticipantStateChangedEvent
     * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
     * @return ParticipantHeldNotification
     */
    createParticipantHeldNotification : function(evt, isTimedOut)
    {
        return new ININ.Web.Chat.WebServices.ParticipantHeldNotification(evt.get_participantId(), evt.get_dateTime(), isTimedOut);
    },

    /**
     * Creates a ParticipantVoicemailNotification, to indicate that someone in the chat has entered the voicemail state.
     *  
     * @param evt A ParticipantStateChangedEvent
     * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
     * @return ParticipantVoicemailNotification
     */
    createParticipantVoicemailNotification : function(evt, isTimedOut)
    {
        return new ININ.Web.Chat.WebServices.ParticipantVoicemailNotification(evt.get_participantId(), evt.get_dateTime(), isTimedOut);
    },

    /**
     * Creates a ParticipantDisconnectedNotification, to indicate that someone has disconnected from the chat
     *  
     * @param evt A ParticipantStateChangedEvent
     * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
     * @return ParticipantDisconnectedNotification
     */
    createParticipantDisconnectedNotification : function(evt, isTimedOut)
    {
        return new ININ.Web.Chat.WebServices.ParticipantDisconnectedNotification(evt.get_participantId(), evt.get_dateTime(), isTimedOut);
    },

    /**
     * Creates a ParticipantStartedTypingNotification, to indicate that someone in the chat has begun typing
     *  
     * @param evt A ParticipantSetTypingEvent
     * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
     * @return ParticipantStartedTypingNotification
     */
    createParticipantStartedTypingNotification : function(evt, isTimedOut)
    {
        return new ININ.Web.Chat.WebServices.ParticipantStartedTypingNotification(evt.get_participantId(), evt.get_dateTime(), isTimedOut);
    },

    /**
     * Creates a ParticipantStoppedTypingNotification, to indicate that someone in the chat has stopped typing
     *  
     * @param evt A ParticipantSetTypingEvent
     * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
     * @return ParticipantStoppedTypingNotification
     */
    createParticipantStoppedTypingNotification : function(evt, isTimedOut)
    {
        return new ININ.Web.Chat.WebServices.ParticipantStoppedTypingNotification(evt.get_participantId(), evt.get_dateTime(), isTimedOut);
    },

    /**
     * Creates a ReceivedTextNotification, to indicate that a message has been received
     *  
     * @param evt A ReceivedTextEvent
     * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
     * @return ReceivedTextNotification
     */
    createReceivedTextNotification : function(evt, isTimedOut)
    {
        return new ININ.Web.Chat.WebServices.ReceivedTextNotification(evt.get_participantId(), evt.get_dateTime(), evt.get_conversationSequenceNumber(), evt.get_messageText(), evt.get_contentType(), isTimedOut);
    },

    /**
     * Creates a ReceivedCommandNotification, to indicate that a command has been received
     *  
     * @param evt A ReceivedCommandEvent
     * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
     * @return ReceivedCommandNotification
     */
    createReceivedCommandNotification : function(evt, isTimedOut)
    {
        return new ININ.Web.Chat.WebServices.ReceivedCommandNotification(evt.get_participantId(), evt.get_dateTime(), evt.get_conversationSequenceNumber(), evt.get_command(), isTimedOut);
    },

    /**
     * Creates a ReceivedUrlNotification, to indicate that a URL has been received
     *  
     * @param evt A ReceivedUrlEvent
     * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
     * @return ReceivedUrlNotification
     */
    createReceivedUrlNotification : function(evt, isTimedOut)
    {
        return new ININ.Web.Chat.WebServices.ReceivedUrlNotification(evt.get_participantId(), evt.get_dateTime(), evt.get_conversationSequenceNumber(), evt.get_messageUrl(), isTimedOut);
    },

    /**
     * Creates a ReceivedFileNotification, to indicate that a file has been received
     *  
     * @param evt A ReceivedFileEvent
     * @param isTimedOut Whether the event was received late.  If so, perhaps the GUI will do something special to indicate that it is displayed out of sequence, etc..
     * @return ReceivedFileNotification
     */
    createReceivedFileNotification : function(evt, isTimedOut)
    {
        return new ININ.Web.Chat.WebServices.ReceivedFileNotification(evt.get_participantId(), evt.get_dateTime(), evt.get_conversationSequenceNumber(), evt.get_messageRelativeUrl(), isTimedOut);
    },

    /**
     * Creates a FailoverNotification, to indicate that a failover has occurred
     * @return FailoverNotification
     */
    createFailoverNotification : function()
    {
        return new ININ.Web.Chat.WebServices.FailoverNotification();
    },

    /**
     * Creates a FailoverUINotification, to indicate (to the UI) that a failover has occurred
     * @return FailoverUINotification
     */
    createFailoverUINotification : function()
    {
        return new ININ.Web.Chat.WebServices.FailoverUINotification();
    },

    /**
     * Creates a ChatReconnectUINotification, to indicate (to the UI) that a reconnect has occurred
     * @return ChatReconnectUINotification
     */
    createChatReconnectUINotification : function()
    {
        return new ININ.Web.Chat.WebServices.ChatReconnectUINotification();
    },

    /**
     * Creates a ResumedPollingNotification, to indicate that a reconnect has occurred
     * @return ResumedPollingNotification
     */
    createResumedPollingNotification : function()
    {
        return new ININ.Web.Chat.WebServices.ResumedPollingNotification();
    },

    /**
     * Creates a ChatReconnectNotification, to indicate that a reconnect has occurred
     * @return ChatReconnectNotification
     */
    createChatReconnectNotification : function()
    {
        return new ININ.Web.Chat.WebServices.ChatReconnectNotification();
    },

    /**
     * Creates a ChatReconnectFailureNotification, to indicate that a reconnect has failed to occur
     * @return ChatReconnectFailureNotification
     */
    createChatReconnectFailureNotification : function()
    {
        return new ININ.Web.Chat.WebServices.ChatReconnectFailureNotification();
    },

    /**
     * Creates a RefreshPageNotification, to indicate that the user needs to refresh the 
     * page to start a new chat.
     *  
     * @param newUriFragment The URI fragment that should now be used to reverse proxy requests through the webserver to the IC server. 
     * @return RefreshPageNotification
     */
    createRefreshPageNotification : function(newUriFragment)
    {
        return new ININ.Web.Chat.WebServices.RefreshPageNotification(newUriFragment);
    },

    /**
     * Creates a PageBeforeUnloadNotification, to indicate that the web browser is about to unload the web page
     *  
     * @return PageBeforeUnloadNotification
     */
    createPageBeforeUnloadNotification : function()
    {
        return new ININ.Web.Chat.WebServices.PageBeforeUnloadNotification();
    },

    /**
     * Creates a PageUnloadNotification, to indicate that the web browser has completed unloading the web page
     *  
     * @return PageUnloadNotification
     */
    createPageUnloadNotification : function()
    {
        return new ININ.Web.Chat.WebServices.PageUnloadNotification();
    },

    /**
     * Creates a ChatCreationNotification, to indicate that a chat has been created
     *
     * @param currentParticipantId An identifier which will be used to refer to the party that created the chat. 
     * @param dateFormat A string specifying how dates should be formatted, as described in http://msdn.microsoft.com/en-us/library/dd317787%28v=vs.85%29.aspx 
     * @param timeFormat A string specifying how times should be formatted, as described in http://msdn.microsoft.com/en-us/library/dd318148%28v=vs.85%29.aspx 
     * @return ChatCreationNotification
     */
    createChatCreationNotification : function(currentChatId, currentParticipantId, dateFormat, timeFormat)
    {
        return new ININ.Web.Chat.WebServices.ChatCreationNotification(currentChatId, currentParticipantId, dateFormat, timeFormat);
    },

    /**
     * Creates a ChatCreationFailureNotification, to indicate that an attempt to create a chat has failed
     *  
     * @param error The error that caused the failure 
     * @return ChatCreationFailureNotification
     */
    createChatCreationFailureNotification : function(error)
    {
        return new ININ.Web.Chat.WebServices.ChatCreationFailureNotification(error);
    },

    /**
     * Creates a ChatCompletionNotification, to indicate that a chat has completed
     * @return ChatCompletionNotification
     */
    createChatCompletionNotification : function()
    {
        return new ININ.Web.Chat.WebServices.ChatCompletionNotification();
    },

    /**
     * Creates a ChatCompletionFailureNotification, to indicate that an attempt to exit a chat has failed
     *  
     * @param error The error that caused the failure 
     * @return ChatCompletionNotification
     */
    createChatCompletionFailureNotification : function(error)
    {
        return new ININ.Web.Chat.WebServices.ChatCompletionFailureNotification(error);
    },

    /**
     * Creates a CallbackCreationNotification, to indicate that a callback has been created
     *
     * @param participantId An identifier which will be used to refer to the party that created the callback for the duration of the current web session. 
     * @param callbackId ID of the callback.  It may be used for the duration of the callback to bring the callback into a then-current web session.  If the IVR permits, it may also be entered into the IVR to manage the callback via telephone.  Will be null if the IC server does not supply it.
     * @param userIdentityId ID of the user who created this callback.  It may be used for the duration of the callback to bring the callback into a then-current web session.  If the IVR permits, it may also be entered into the IVR to manage the callback via telephone.  Will be null if the IC server does not supply it.
     * @param participantName The name or username of the web user who has created the callback request 
     * @param telephone The telephone number at which the participant indicated they would like to be called 
     * @param subject The topic which the participant wishes to discuss with the agent
     * @param creationDateTime A Javascript Date object containing the timestamp of when the callback request was created 
     * @return CallbackCreationNotification
     */
    createCallbackCreationNotification : function(participantId, callbackId, userIdentityId, participantName, telephone, subject, creationDateTime)
    {
        return new ININ.Web.Chat.WebServices.CallbackCreationNotification(participantId, callbackId, userIdentityId, participantName, telephone, subject, creationDateTime);
    },

    /**
     * Creates a CallbackCreationFailureNotification, to indicate that an attempt to create a callback has failed
     *  
     * @param error The error that caused the failure 
     * @return CallbackCreationFailureNotification
     */
    createCallbackCreationFailureNotification : function(error)
    {
        return new ININ.Web.Chat.WebServices.CallbackCreationFailureNotification(error);
    },

    /**
     * Creates a CallbackStatusNotification, which contains information about a callback. 
     *  
     * @param participantId The identifier which associates the web visitor with the callback that has been queried. 
     * @param queueWaitTime number of seconds
     * @param assignedAgentName Agent's name
     * @param assignedAgentParticipantId ID identifying the agent
     * @param interactionState The state of the interaction 
     * @param estimatedCallbackTime number of seconds before it is estimated that the callback will be made
     * @param queuePosition integer indicating the callback's position in the queue
     * @param queueName the name of the queue
     * @param longestWaitTime TODO write what this is!
     * @param interactionsWaitingCount The number of calls waiting
     * @param loggedInAgentsCount the number of logged in agents who meet this callback's routing critieria
     * @param availableAgentsCount the number of available agents who meet this callback's routing criteria
     * @param statusIndicator A key to quickly indicate the status of the callback 
     * @return CallbackStatusNotification 
     */
    createCallbackStatusNotification : function(participantId, queueWaitTime, assignedAgentName, assignedAgentParticipantId,
                                                interactionState, estimatedCallbackTime,
                                                queuePosition, queueName,
                                                longestWaitTime, interactionsWaitingCount, loggedInAgentsCount, availableAgentsCount,
                                                statusIndicator)
    {
        return new ININ.Web.Chat.WebServices.CallbackStatusNotification(participantId, queueWaitTime,
                                                                        assignedAgentName, assignedAgentParticipantId,
                                                                        interactionState, estimatedCallbackTime,
                                                                        queuePosition, queueName,
                                                                        longestWaitTime, interactionsWaitingCount,
                                                                        loggedInAgentsCount, availableAgentsCount,
                                                                        statusIndicator);
    },

    /**
     * Creates a CallbackStatusFailureNotification, to indicate that a request to get a Callback's status has failed. 
     *  
     * @param error The error that caused the failure 
     * @return CallbackStatusFailureNotification 
     */
    createCallbackStatusFailureNotification : function(error)
    {
        return new ININ.Web.Chat.WebServices.CallbackStatusFailureNotification(error);
    },

    /** 
     * Creates a CallbackDisconnectNotification, which indicates that a Callback has been disconnected 
     * 
     * @param participantId The identifier which associated the web visitor with the callback that has been disconnected.  This identifier is no longer valid, and is included so that consumers of this notification may remove it from their data structures, user interfaces, etc.
     * @return CallbackDisconnectNotification 
     */
    createCallbackDisconnectNotification : function(participantId)
    {
        return new ININ.Web.Chat.WebServices.CallbackDisconnectNotification(participantId);
    },

    /** 
     * Creates a CallbackDisconnectFailureNotification, which indicates that a request to disconnect a Callback has failed. 
     * 
     * @param error The error that caused the failure 
     * @return CallbackDisconnectFailureNotification 
     */
    createCallbackDisconnectFailureNotification : function(error)
    {
        return new ININ.Web.Chat.WebServices.CallbackDisconnectFailureNotification(error);
    },

    /** 
     * Creates a CallbackReconnectNotification, which indicates that a Callback has 
     * been reconnected (i.e. brought into the current web session)
     * 
     * @param participantId An identifier which will be used to refer to the party that created the callback. 
     * @return CallbackReconnectNotification 
     */
    createCallbackReconnectNotification : function(participantId)
    {
        return new ININ.Web.Chat.WebServices.CallbackReconnectNotification(participantId);
    },

    /** 
     * Creates a CallbackReconnectFailureNotification, which indicates that a request to reconnect a Callback has failed. 
     * 
     * @param error The error that caused the failure 
     * @return CallbackReconnectFailureNotification 
     */
    createCallbackReconnectFailureNotification : function(error)
    {
        return new ININ.Web.Chat.WebServices.CallbackReconnectFailureNotification(error);
    },

    /** 
     * Creates a PartyInfoNotification, which contains the name and photo location of a party involved in 
     * an interaction. 
     *  
     * @param localParticipantId The participantId of the agent whose info is being queried. 
     * @param remoteParticipantId The participantId of the agent whose info is being queried. 
     * @param name The name of the remote participant
     * @param photo Location of the photo of the remote participant 
     * @return PartyInfoNotification 
     */
    createPartyInfoNotification : function(localParticipantId, remoteParticipantId, name, photo)
    {
        return new ININ.Web.Chat.WebServices.PartyInfoNotification(localParticipantId, remoteParticipantId, name, photo);
    },

    /** 
     * Creates a PartyInfoFailureNotification, which indicates that a request to reconnect a Callback has failed. 
     * 
     * @param error The error that caused the failure 
     * @return PartyInfoFailureNotification 
     */
    createPartyInfoFailureNotification : function(error)
    {
        return new ININ.Web.Chat.WebServices.PartyInfoFailureNotification(error);
    }
});

ININ.Web.Chat.WebServices.NotificationFactory = new ININ.Web.Chat.WebServices._Internal.NotificationFactory();

/*global ININ: true, Error: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * NotificationRegistry class 
 *  
 * Allows interested objects to register as observers to receive the various types of notifications. 
 * Receives notifications and forwards them to the interested observers. 
 */
ININ.Web.Chat.WebServices._Internal._NotificationRegistry = Class.create(ININ.Web.Common.InterfaceImplementation,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        // validate arguments
        var numArgs = 1;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("NotificationRegistry constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.INotificationProcessor);

        // initialize private members
        this._currentParticipantIdChangedNotificationObservers = [];
        this._newParticipantNotificationObservers = [];
        this._participantJoinedNotificationObservers = [];
        this._participantLeftNotificationObservers = [];
        this._participantNameChangedNotificationObservers = [];
        this._participantInitializingNotificationObservers = [];
        this._participantAlertingNotificationObservers = [];
        this._participantActiveNotificationObservers = [];
        this._participantHeldNotificationObservers = [];
        this._participantVoicemailNotificationObservers = [];
        this._participantDisconnectedNotificationObservers = [];
        this._participantStartedTypingNotificationObservers = [];
        this._participantStoppedTypingNotificationObservers = [];
        this._receivedTextNotificationObservers = [];
        this._receivedCommandNotificationObservers = [];
        this._receivedUrlNotificationObservers = [];
        this._receivedFileNotificationObservers = [];
        this._failoverNotificationObservers = [];
        this._failoverUINotificationObservers = [];
        this._resumedPollingNotificationObservers = [];
		this._chatReconnectUINotificationObservers = [];
        this._chatReconnectNotificationObservers = [];
        this._chatReconnectFailureNotificationObservers = [];
        this._refreshPageNotificationObservers = [];
        this._pageUnloadNotificationObservers = [];
        this._pageBeforeUnloadNotificationObservers = [];
        this._chatCreationNotificationObservers = [];
        this._chatCreationFailureNotificationObservers = [];
        this._chatCompletionNotificationObservers = [];
        this._chatCompletionFailureNotificationObservers = [];
        this._callbackCreationNotificationObservers = [];
        this._callbackCreationFailureNotificationObservers = [];
        this._callbackStatusNotificationObservers = [];
        this._callbackStatusFailureNotificationObservers = [];
        this._callbackDisconnectNotificationObservers = [];
        this._callbackDisconnectFailureNotificationObservers = [];
        this._callbackReconnectNotificationObservers = [];
        this._callbackReconnectFailureNotificationObservers = [];
        this._partyInfoNotificationObservers = [];
        this._partyInfoFailureNotificationObservers = [];
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        delete this._currentParticipantIdChangedNotificationObservers;
        delete this._newParticipantNotificationObservers;
        delete this._participantJoinedNotificationObservers;
        delete this._participantLeftNotificationObservers;
        delete this._participantNameChangedNotificationObservers;
        delete this._participantInitializingNotificationObservers;
        delete this._participantAlertingNotificationObservers;
        delete this._participantActiveNotificationObservers;
        delete this._participantHeldNotificationObservers;
        delete this._participantVoicemailNotificationObservers;
        delete this._participantDisconnectedNotificationObservers;
        delete this._participantStartedTypingNotificationObservers;
        delete this._participantStoppedTypingNotificationObservers;
        delete this._receivedTextNotificationObservers;
        delete this._receivedCommandNotificationObservers;
        delete this._receivedUrlNotificationObservers;
        delete this._receivedFileNotificationObservers;
        delete this._failoverNotificationObservers;
        delete this._failoverUINotificationObservers;
        delete this._resumedPollingNotificationObservers;
		delete this._chatReconnectUINotificationObservers;
        delete this._chatReconnectNotificationObservers;
        delete this._chatReconnectFailureNotificationObservers;
        delete this._refreshPageNotificationObservers;
        delete this._pageUnloadNotificationObservers;
        delete this._pageBeforeUnloadNotificationObservers;
        delete this._chatCreationNotificationObservers;
        delete this._chatCreationFailureNotificationObservers;
        delete this._chatCompletionNotificationObservers;
        delete this._chatCompletionFailureNotificationObservers;
        delete this._callbackCreationNotificationObservers;
        delete this._callbackCreationFailureNotificationObservers;
        delete this._callbackStatusNotificationObservers;
        delete this._callbackStatusFailureNotificationObservers;
        delete this._callbackDisconnectNotificationObservers;
        delete this._callbackDisconnectFailureNotificationObservers;
        delete this._callbackReconnectNotificationObservers;
        delete this._callbackReconnectFailureNotificationObservers;
        delete this._partyInfoNotificationObservers;
        delete this._partyInfoFailureNotificationObservers;

        this._currentParticipantIdChangedNotificationObservers = null;
        this._newParticipantNotificationObservers = null;
        this._participantJoinedNotificationObservers = null;
        this._participantLeftNotificationObservers = null;
        this._participantNameChangedNotificationObservers = null;
        this._participantInitializingNotificationObservers = null;
        this._participantAlertingNotificationObservers = null;
        this._participantActiveNotificationObservers = null;
        this._participantHeldNotificationObservers = null;
        this._participantVoicemailNotificationObservers = null;
        this._participantDisconnectedNotificationObservers = null;
        this._participantStartedTypingNotificationObservers = null;
        this._participantStoppedTypingNotificationObservers = null;
        this._receivedTextNotificationObservers = null;
        this._receivedCommandNotificationObservers = null;
        this._receivedUrlNotificationObservers = null;
        this._receivedFileNotificationObservers = null;
        this._failoverNotificationObservers = null;
        this._failoverUINotificationObservers = null;
        this._resumedPollingNotificationObservers = null;
		this._chatReconnectUINotificationObservers = null;
        this._chatReconnectNotificationObservers = null;
        this._chatReconnectFailureNotificationObservers = null;
        this._refreshPageNotificationObservers = null;
        this._pageUnloadNotificationObservers = null;
        this._pageBeforeUnloadNotificationObservers = null;
        this._chatCreationNotificationObservers = null;
        this._chatCreationFailureNotificationObservers = null;
        this._chatCompletionNotificationObservers = null;
        this._chatCompletionFailureNotificationObservers = null;
        this._callbackCreationNotificationObservers = null;
        this._callbackCreationFailureNotificationObservers = null;
        this._callbackStatusNotificationObservers = null;
        this._callbackStatusFailureNotificationObservers = null;
        this._callbackDisconnectNotificationObservers = null;
        this._callbackDisconnectFailureNotificationObservers = null;
        this._callbackReconnectNotificationObservers = null;
        this._callbackReconnectFailureNotificationObservers = null;
        this._partyInfoNotificationObservers = null;
        this._partyInfoFailureNotificationObservers = null;

        ININ.Web.Common.InterfaceImplementation.prototype.destroy.call(this);
    },

    /**
	 * Receives notifications and dispatches them to methods specific to each notification type. 
	 *  
	 * @param notification A notification. 
     */
    process : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("processNotification");
    
        if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.ICurrentParticipantIdChangedNotification))
        {
            this.processCurrentParticipantIdChangedNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.INewParticipantNotification))
        {
            this.processNewParticipantNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantJoinedNotification))
        {
            this.processParticipantJoinedNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantLeftNotification))
        {
            this.processParticipantLeftNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantNameChangedNotification))
        {
            this.processParticipantNameChangedNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantInitializingNotification))
        {
            this.processParticipantInitializingNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantAlertingNotification))
        {
            this.processParticipantAlertingNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantActiveNotification))
        {
            this.processParticipantActiveNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantHeldNotification))
        {
            this.processParticipantHeldNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantVoicemailNotification))
        {
            this.processParticipantVoicemailNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantDisconnectedNotification))
        {
            this.processParticipantDisconnectedNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantStartedTypingNotification))
        {
            this.processParticipantStartedTypingNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantStoppedTypingNotification))
        {
            this.processParticipantStoppedTypingNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IReceivedTextNotification))
        {
            this.processReceivedTextNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IReceivedCommandNotification))
        {
            this.processReceivedCommandNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IReceivedUrlNotification))
        {
            this.processReceivedUrlNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IReceivedFileNotification))
        {
            this.processReceivedFileNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IFailoverNotification))
        {
            this.processFailoverNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IFailoverUINotification))
        {
            this.processFailoverUINotification(notification);
        }
		else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IChatReconnectUINotification))
		{
			this.processChatReconnectUINotification(notification);
		}
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IChatReconnectNotification))
        {
            this.processChatReconnectNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IResumedPollingNotification))
        {
            this.processResumedPollingNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IChatReconnectFailureNotification))
        {
            this.processChatReconnectFailureNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IPageBeforeUnloadNotification))
        {
            this.processPageBeforeUnloadNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IPageUnloadNotification))
        {
            this.processPageUnloadNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IChatCreationNotification))
        {
            this.processChatCreationNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IChatCreationFailureNotification))
        {
            this.processChatCreationFailureNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IChatCompletionNotification))
        {
            this.processChatCompletionNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IChatCompletionFailureNotification))
        {
            this.processChatCompletionFailureNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.ICallbackCreationNotification))
        {
            this.processCallbackCreationNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.ICallbackCreationFailureNotification))
        {
            this.processCallbackCreationFailureNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.ICallbackStatusNotification))
        {
            this.processCallbackStatusNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.ICallbackStatusFailureNotification))
        {
            this.processCallbackStatusFailureNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.ICallbackDisconnectNotification))
        {
            this.processCallbackDisconnectNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.ICallbackDisconnectFailureNotification))
        {
            this.processCallbackDisconnectFailureNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.ICallbackReconnectNotification))
        {
            this.processCallbackReconnectNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.ICallbackReconnectFailureNotification))
        {
            this.processCallbackReconnectFailureNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IPartyInfoNotification))
        {
            this.processPartyInfoNotification(notification);
        }
        else if(ININ.Web.Common.Interface.doesImplement(notification, ININ.Web.Chat.WebServices.Interfaces.IPartyInfoFailureNotification))
        {
            this.processPartyInfoFailureNotification(notification);
        }
        else
        {
            throw ININ.Web.Common.ExceptionFactory.createException("notification does not implement any known notification interfaces");
        }
        
        ININ.Web.Common.Debug.traceMethodExited("processNotification");
    },

	/**
	 * The object passed to this method will receive notifications of type: CurrentParticipantIdChangedNotification. 
	 * 
	 * @param currentParticipantIdChangedNotificationObserver An object that implements ICurrentParticipantIdChangedNotificationObserver.
	 */
    registerCurrentParticipantIdChangedNotificationObserver : function(currentParticipantIdChangedNotificationObserver)
    {
        if(!currentParticipantIdChangedNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("currentParticipantIdChangedNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(currentParticipantIdChangedNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.ICurrentParticipantIdChangedNotificationObserver);

        this._currentParticipantIdChangedNotificationObservers.push(currentParticipantIdChangedNotificationObserver);
    },
    
	/**
	 * Dispatches a CurrentParticipantIdChangedNotification to registered observers.
	 * 
	 * @param currentParticipantIdChangedNotification An object that implements ICurrentParticipantIdChangedNotification.
	 */
    processCurrentParticipantIdChangedNotification : function(currentParticipantIdChangedNotification)
    {
        if(!currentParticipantIdChangedNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("currentParticipantIdChangedNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._currentParticipantIdChangedNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._currentParticipantIdChangedNotificationObservers[i];
                observer.processCurrentParticipantIdChangedNotification(currentParticipantIdChangedNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: NewParticipantNotification. 
	 * 
	 * @param newParticipantNotificationObserver An object that implements INewParticipantNotificationObserver.
	 */
    registerNewParticipantNotificationObserver : function(newParticipantNotificationObserver)
    {
        if(!newParticipantNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("newParticipantNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(newParticipantNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.INewParticipantNotificationObserver);

        this._newParticipantNotificationObservers.push(newParticipantNotificationObserver);
    },
    
	/**
	 * Dispatches a NewParticipantNotification to registered observers.
	 * 
	 * @param newParticipantNotification An object that implements INewParticipantNotification.
	 */
    processNewParticipantNotification : function(newParticipantNotification)
    {
        if(!newParticipantNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("newParticipantNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._newParticipantNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._newParticipantNotificationObservers[i];
                observer.processNewParticipantNotification(newParticipantNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: ParticipantJoinedNotification. 
	 * 
	 * @param participantJoinedNotificationObserver An object that implements IParticipantJoinedNotificationObserver.
	 */
    registerParticipantJoinedNotificationObserver : function(participantJoinedNotificationObserver)
    {
        if(!participantJoinedNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantJoinedNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(participantJoinedNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IParticipantJoinedNotificationObserver);

        this._participantJoinedNotificationObservers.push(participantJoinedNotificationObserver);
    },
    
	/**
	 * Dispatches a ParticipantJoinedNotification to registered observers.
	 * 
	 * @param participantJoinedNotification An object that implements IParticipantJoinedNotification.
	 */
    processParticipantJoinedNotification : function(participantJoinedNotification)
    {
        if(!participantJoinedNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantJoinedNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._participantJoinedNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._participantJoinedNotificationObservers[i];
                observer.processParticipantJoinedNotification(participantJoinedNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: ParticipantLeftNotification. 
	 * 
	 * @param participantLeftNotificationObserver An object that implements IParticipantLeftNotificationObserver.
	 */
    registerParticipantLeftNotificationObserver : function(participantLeftNotificationObserver)
    {
        if(!participantLeftNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantLeftNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(participantLeftNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IParticipantLeftNotificationObserver);

        this._participantLeftNotificationObservers.push(participantLeftNotificationObserver);
    },
    
	/**
	 * Dispatches a ParticipantLeftNotification to registered observers.
	 * 
	 * @param participantLeftNotification An object that implements IParticipantLeftNotification.
	 */
    processParticipantLeftNotification : function(participantLeftNotification)
    {
        if(!participantLeftNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantLeftNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._participantLeftNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._participantLeftNotificationObservers[i];
                observer.processParticipantLeftNotification(participantLeftNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: ParticipantNameChangedNotification. 
	 * 
	 * @param participantNameChangedNotificationObserver An object that implements IParticipantNameChangedNotificationObserver.
	 */
    registerParticipantNameChangedNotificationObserver : function(participantNameChangedNotificationObserver)
    {
        if(!participantNameChangedNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantNameChangedNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(participantNameChangedNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IParticipantNameChangedNotificationObserver);

        this._participantNameChangedNotificationObservers.push(participantNameChangedNotificationObserver);
    },
    
	/**
	 * Dispatches a ParticipantNameChangedNotification to registered observers.
	 * 
	 * @param participantNameChangedNotification An object that implements IParticipantNameChangedNotification.
	 */
    processParticipantNameChangedNotification : function(participantNameChangedNotification)
    {
        if(!participantNameChangedNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantNameChangedNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._participantNameChangedNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._participantNameChangedNotificationObservers[i];
                observer.processParticipantNameChangedNotification(participantNameChangedNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: ParticipantInitializingNotification. 
	 * 
	 * @param participantInitializingNotificationObserver An object that implements IParticipantInitializingNotificationObserver.
	 */
    registerParticipantInitializingNotificationObserver : function(participantInitializingNotificationObserver)
    {
        if(!participantInitializingNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantInitializingNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(participantInitializingNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IParticipantInitializingNotificationObserver);

        this._participantInitializingNotificationObservers.push(participantInitializingNotificationObserver);
    },

	/**
	 * Dispatches a ParticipantInitializingNotification to registered observers.
	 * 
	 * @param participantInitializingNotification An object that implements IParticipantInitializingNotification.
	 */
    processParticipantInitializingNotification : function(participantInitializingNotification)
    {
        if(!participantInitializingNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantInitializingNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._participantInitializingNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._participantInitializingNotificationObservers[i];
                observer.processParticipantInitializingNotification(participantInitializingNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: ParticipantAlertingNotification. 
	 * 
	 * @param participantAlertingNotificationObserver An object that implements IParticipantAlertingNotificationObserver.
	 */
    registerParticipantAlertingNotificationObserver : function(participantAlertingNotificationObserver)
    {
        if(!participantAlertingNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantAlertingNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(participantAlertingNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IParticipantAlertingNotificationObserver);

        this._participantAlertingNotificationObservers.push(participantAlertingNotificationObserver);
    },

	/**
	 * Dispatches a ParticipantAlertingNotification to registered observers.
	 * 
	 * @param participantAlertingNotification An object that implements IParticipantAlertingNotification.
	 */
    processParticipantAlertingNotification : function(participantAlertingNotification)
    {
        if(!participantAlertingNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantAlertingNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._participantAlertingNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._participantAlertingNotificationObservers[i];
                observer.processParticipantAlertingNotification(participantAlertingNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: ParticipantActiveNotification. 
	 * 
	 * @param participantActiveNotificationObserver An object that implements IParticipantActiveNotificationObserver.
	 */
    registerParticipantActiveNotificationObserver : function(participantActiveNotificationObserver)
    {
        if(!participantActiveNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantActiveNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(participantActiveNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IParticipantActiveNotificationObserver);

        this._participantActiveNotificationObservers.push(participantActiveNotificationObserver);
    },
    
	/**
	 * Dispatches a ParticipantActiveNotification to registered observers.
	 * 
	 * @param participantActiveNotification An object that implements IParticipantActiveNotification.
	 */
    processParticipantActiveNotification : function(participantActiveNotification)
    {
        if(!participantActiveNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantActiveNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._participantActiveNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._participantActiveNotificationObservers[i];
                observer.processParticipantActiveNotification(participantActiveNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: ParticipantHeldNotification. 
	 * 
	 * @param participantHeldNotificationObserver An object that implements IParticipantHeldNotificationObserver.
	 */
    registerParticipantHeldNotificationObserver : function(participantHeldNotificationObserver)
    {
        if(!participantHeldNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantHeldNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(participantHeldNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IParticipantHeldNotificationObserver);

        this._participantHeldNotificationObservers.push(participantHeldNotificationObserver);
    },
    
	/**
	 * Dispatches a ParticipantHeldNotification to registered observers.
	 * 
	 * @param participantHeldNotification An object that implements IParticipantHeldNotification.
	 */
    processParticipantHeldNotification : function(participantHeldNotification)
    {
        if(!participantHeldNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantHeldNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._participantHeldNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._participantHeldNotificationObservers[i];
                observer.processParticipantHeldNotification(participantHeldNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: ParticipantVoicemailNotification. 
	 * 
	 * @param participantVoicemailNotificationObserver An object that implements IParticipantVoicemailNotificationObserver.
	 */
    registerParticipantVoicemailNotificationObserver : function(participantVoicemailNotificationObserver)
    {
        if(!participantVoicemailNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantVoicemailNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(participantVoicemailNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IParticipantVoicemailNotificationObserver);

        this._participantVoicemailNotificationObservers.push(participantVoicemailNotificationObserver);
    },
    
	/**
	 * Dispatches a ParticipantVoicemailNotification to registered observers.
	 * 
	 * @param participantVoicemailNotification An object that implements IParticipantVoicemailNotification.
	 */
    processParticipantVoicemailNotification : function(participantVoicemailNotification)
    {
        if(!participantVoicemailNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantVoicemailNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._participantVoicemailNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._participantVoicemailNotificationObservers[i];
                observer.processParticipantVoicemailNotification(participantVoicemailNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: ParticipantDisconnectedNotification. 
	 * 
	 * @param participantDisconnectedNotificationObserver An object that implements IParticipantDisconnectedNotificationObserver.
	 */
    registerParticipantDisconnectedNotificationObserver : function(participantDisconnectedNotificationObserver)
    {
        if(!participantDisconnectedNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantDisconnectedNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(participantDisconnectedNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IParticipantDisconnectedNotificationObserver);

        this._participantDisconnectedNotificationObservers.push(participantDisconnectedNotificationObserver);
    },
    
	/**
	 * Dispatches a ParticipantDisconnectedNotification to registered observers.
	 * 
	 * @param participantDisconnectedNotification An object that implements IParticipantDisconnectedNotification.
	 */
    processParticipantDisconnectedNotification : function(participantDisconnectedNotification)
    {
        if(!participantDisconnectedNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantDisconnectedNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._participantDisconnectedNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._participantDisconnectedNotificationObservers[i];
                observer.processParticipantDisconnectedNotification(participantDisconnectedNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: ParticipantStartedTypingNotification. 
	 * 
	 * @param participantStartedTypingNotificationObserver An object that implements IParticipantStartedTypingNotificationObserver.
	 */
    registerParticipantStartedTypingNotificationObserver : function(participantStartedTypingNotificationObserver)
    {
        if(!participantStartedTypingNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantStartedTypingNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(participantStartedTypingNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IParticipantStartedTypingNotificationObserver);

        this._participantStartedTypingNotificationObservers.push(participantStartedTypingNotificationObserver);
    },
    
	/**
	 * Dispatches a ParticipantStartedTypingNotification to registered observers.
	 * 
	 * @param participantStartedTypingNotification An object that implements IParticipantStartedTypingNotification.
	 */
    processParticipantStartedTypingNotification : function(participantStartedTypingNotification)
    {
        if(!participantStartedTypingNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantStartedTypingNotification is null");
        }
        
        var exceptions = new Array();
        for(var i = 0; i < this._participantStartedTypingNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._participantStartedTypingNotificationObservers[i];
                observer.processParticipantStartedTypingNotification(participantStartedTypingNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: ParticipantStoppedTypingNotification. 
	 * 
	 * @param participantStoppedTypingNotificationObserver An object that implements IParticipantStoppedTypingNotificationObserver.
	 */
    registerParticipantStoppedTypingNotificationObserver : function(participantStoppedTypingNotificationObserver)
    {
        if(!participantStoppedTypingNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantStoppedTypingNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(participantStoppedTypingNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IParticipantStoppedTypingNotificationObserver);

        this._participantStoppedTypingNotificationObservers.push(participantStoppedTypingNotificationObserver);
    },
    
	/**
	 * Dispatches a ParticipantStoppedTypingNotification to registered observers.
	 * 
	 * @param participantStoppedTypingNotification An object that implements IParticipantStoppedTypingNotification.
	 */
    processParticipantStoppedTypingNotification : function(participantStoppedTypingNotification)
    {
        if(!participantStoppedTypingNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantStoppedTypingNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._participantStoppedTypingNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._participantStoppedTypingNotificationObservers[i];
                observer.processParticipantStoppedTypingNotification(participantStoppedTypingNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: ReceivedTextNotification. 
	 * 
	 * @param receivedTextNotificationObserver An object that implements IReceivedTextNotificationObserver.
	 */
    registerReceivedTextNotificationObserver : function(receivedTextNotificationObserver)
    {
        if(!receivedTextNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("receivedTextNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(receivedTextNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IReceivedTextNotificationObserver);

        this._receivedTextNotificationObservers.push(receivedTextNotificationObserver);
    },
    
	/**
	 * Dispatches a ReceivedTextNotification to registered observers.
	 * 
	 * @param receivedTextNotification An object that implements IReceivedTextNotification.
	 */
    processReceivedTextNotification : function(receivedTextNotification)
    {
        if(!receivedTextNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("receivedTextNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._receivedTextNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._receivedTextNotificationObservers[i];
                observer.processReceivedTextNotification(receivedTextNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: ReceivedCommandNotification. 
	 * 
	 * @param receivedCommandNotificationObserver An object that implements IReceivedCommandNotificationObserver.
	 */
    registerReceivedCommandNotificationObserver : function(receivedCommandNotificationObserver)
    {
        if(!receivedCommandNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("receivedCommandNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(receivedCommandNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IReceivedCommandNotificationObserver);

        this._receivedCommandNotificationObservers.push(receivedCommandNotificationObserver);
    },
    
	/**
	 * Dispatches a ReceivedCommandNotification to registered observers.
	 * 
	 * @param receivedCommandNotification An object that implements IReceivedCommandNotification.
	 */
    processReceivedCommandNotification : function(receivedCommandNotification)
    {
        if(!receivedCommandNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("receivedCommandNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._receivedCommandNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._receivedCommandNotificationObservers[i];
                observer.processReceivedCommandNotification(receivedCommandNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: ReceivedUrlNotification. 
	 * 
	 * @param receivedUrlNotificationObserver An object that implements IReceivedUrlNotificationObserver.
	 */
    registerReceivedUrlNotificationObserver : function(receivedUrlNotificationObserver)
    {
        if(!receivedUrlNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("receivedUrlNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(receivedUrlNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IReceivedUrlNotificationObserver);

        this._receivedUrlNotificationObservers.push(receivedUrlNotificationObserver);
    },
    
	/**
	 * Dispatches a ReceivedUrlNotification to registered observers.
	 * 
	 * @param receivedUrlNotification An object that implements IReceivedUrlNotification.
	 */
    processReceivedUrlNotification : function(receivedUrlNotification)
    {
        if(!receivedUrlNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("receivedUrlNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._receivedUrlNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._receivedUrlNotificationObservers[i];
                observer.processReceivedUrlNotification(receivedUrlNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: ReceivedFileNotification. 
	 * 
	 * @param receivedFileNotificationObserver An object that implements IReceivedFileNotificationObserver.
	 */
    registerReceivedFileNotificationObserver : function(receivedFileNotificationObserver)
    {
        if(!receivedFileNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("receivedFileNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(receivedFileNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IReceivedFileNotificationObserver);

        this._receivedFileNotificationObservers.push(receivedFileNotificationObserver);
    },
    
	/**
	 * Dispatches a ReceivedFileNotification to registered observers.
	 * 
	 * @param receivedFileNotification An object that implements IReceivedFileNotification.
	 */
    processReceivedFileNotification : function(receivedFileNotification)
    {
        if(!receivedFileNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("receivedFileNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._receivedFileNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._receivedFileNotificationObservers[i];
                observer.processReceivedFileNotification(receivedFileNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: FailoverNotification. 
	 * 
	 * @param failoverNotificationObserver An object that implements IFailoverNotificationObserver.
	 */
    registerFailoverNotificationObserver : function(failoverNotificationObserver)
    {
        if(!failoverNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("failoverNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(failoverNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IFailoverNotificationObserver);

        this._failoverNotificationObservers.push(failoverNotificationObserver);
    },
    
	/**
	 * Dispatches a FailoverNotification to registered observers.
	 * 
	 * @param failoverNotification An object that implements IFailoverNotification.
	 */
    processFailoverNotification : function(failoverNotification)
    {
        if(!failoverNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("failoverNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._failoverNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._failoverNotificationObservers[i];
                observer.processFailoverNotification(failoverNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: FailoverUINotification. 
	 * 
	 * @param failoverUINotificationObserver An object that implements IFailoverUINotificationObserver.
	 */
    registerFailoverUINotificationObserver : function(failoverUINotificationObserver)
    {
        if(!failoverUINotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("failoverUINotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(failoverUINotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IFailoverUINotificationObserver);

        this._failoverUINotificationObservers.push(failoverUINotificationObserver);
    },
    
	/**
	 * Dispatches a FailoverUINotification to registered observers.
	 * 
	 * @param failoverUINotification An object that implements IFailoverUINotification.
	 */
    processFailoverUINotification : function(failoverUINotification)
    {
        if(!failoverUINotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("failoverUINotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._failoverUINotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._failoverUINotificationObservers[i];
                observer.processFailoverUINotification(failoverUINotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },
	
	/**
	 * The object passed to this method will receive notifications of type: ChatReconnectUINotification. 
	 * 
	 * @param chatReconnectUINotificationObserver An object that implements IChatReconnectUINotificationObserver.
	 */
    registerChatReconnectUINotificationObserver : function(chatReconnectUINotificationObserver)
    {
        if(!chatReconnectUINotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("chatReconnectUINotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(chatReconnectUINotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IChatReconnectUINotificationObserver);

        this._chatReconnectUINotificationObservers.push(chatReconnectUINotificationObserver);
    },
    
	/**
	 * Dispatches a ChatReconnectUINotification to registered observers.
	 * 
	 * @param chatReconnectUINotification An object that implements IChatReconnectUINotification.
	 */
    processChatReconnectUINotification : function(chatReconnectUINotification)
    {
        if(!chatReconnectUINotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("chatReconnectUINotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._chatReconnectUINotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._chatReconnectUINotificationObservers[i];
                observer.processChatReconnectUINotification(chatReconnectUINotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: ChatReconnectNotification. 
	 * 
	 * @param chatReconnectNotificationObserver An object that implements IChatReconnectNotificationObserver.
	 */
    registerChatReconnectNotificationObserver : function(chatReconnectNotificationObserver)
    {
        if(!chatReconnectNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("chatReconnectNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(chatReconnectNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IChatReconnectNotificationObserver);

        this._chatReconnectNotificationObservers.push(chatReconnectNotificationObserver);
    },
    
	/**
	 * Dispatches a ChatReconnectNotification to registered observers.
	 * 
	 * @param chatReconnectNotification An object that implements IChatReconnectNotification.
	 */
    processChatReconnectNotification : function(chatReconnectNotification)
    {
        if(!chatReconnectNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("chatReconnectNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._chatReconnectNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._chatReconnectNotificationObservers[i];
                observer.processChatReconnectNotification(chatReconnectNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: ResumedPollingNotification. 
	 * 
	 * @param resumedPollingNotificationObserver An object that implements IResumedPollingNotificationObserver.
	 */
    registerResumedPollingNotificationObserver : function(resumedPollingNotificationObserver)
    {
        if(!resumedPollingNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("resumedPollingNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(resumedPollingNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IResumedPollingNotificationObserver);

        this._resumedPollingNotificationObservers.push(resumedPollingNotificationObserver);
    },
    
	/**
	 * Dispatches a ResumedPollingNotification to registered observers.
	 * 
	 * @param resumedPollingNotification An object that implements IResumedPollingNotification.
	 */
    processResumedPollingNotification : function(resumedPollingNotification)
    {
        if(!resumedPollingNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("resumedPollingNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._resumedPollingNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._resumedPollingNotificationObservers[i];
                observer.processResumedPollingNotification(resumedPollingNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: ChatReconnectFailureNotification. 
	 * 
	 * @param chatReconnectFailureNotificationObserver An object that implements IChatReconnectFailureNotificationObserver.
	 */
    registerChatReconnectFailureNotificationObserver : function(chatReconnectFailureNotificationObserver)
    {
        if(!chatReconnectFailureNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("chatReconnectFailureNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(chatReconnectFailureNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IChatReconnectFailureNotificationObserver);

        this._chatReconnectFailureNotificationObservers.push(chatReconnectFailureNotificationObserver);
    },
    
	/**
	 * Dispatches a ChatReconnectFailureNotification to registered observers.
	 * 
	 * @param chatReconnectFailureNotification An object that implements IChatReconnectFailureNotification.
	 */
    processChatReconnectFailureNotification : function(chatReconnectFailureNotification)
    {
        if(!chatReconnectFailureNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("chatReconnectFailureNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._chatReconnectFailureNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._chatReconnectFailureNotificationObservers[i];
                observer.processChatReconnectFailureNotification(chatReconnectFailureNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: RefreshPageNotification. 
	 * 
	 * @param refreshPageNotificationObserver An object that implements IRefreshPageNotificationObserver.
	 */
    registerRefreshPageNotificationObserver : function(refreshPageNotificationObserver)
    {
        if(!refreshPageNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("refreshPageNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(refreshPageNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IRefreshPageNotificationObserver);

        this._refreshPageNotificationObservers.push(refreshPageNotificationObserver);
    },
    
	/**
	 * Dispatches a RefreshPageNotification to registered observers.
	 * 
	 * @param refreshPageNotification An object that implements IRefreshPageNotification.
	 */
    processRefreshPageNotification : function(refreshPageNotification)
    {
        if(!refreshPageNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("refreshPageNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._refreshPageNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._refreshPageNotificationObservers[i];
                observer.processRefreshPageNotification(refreshPageNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: PageBeforeUnloadNotification. 
	 * 
	 * @param pageBeforeUnloadNotificationObserver An object that implements IPageBeforeUnloadNotificationObserver.
	 */
    registerPageBeforeUnloadNotificationObserver : function(pageBeforeUnloadNotificationObserver)
    {
        if(!pageBeforeUnloadNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("pageBeforeUnloadNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(pageBeforeUnloadNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IPageBeforeUnloadNotificationObserver);

        this._pageBeforeUnloadNotificationObservers.push(pageBeforeUnloadNotificationObserver);
    },
    
	/**
	 * Dispatches a PageBeforeUnloadNotification to registered observers.
     *  
     * This method is slightly different than the other process*Notifications in this class: 
     * If one of the observers' processPageBeforeUnloadNotification() returns something other than 
     * null or the empty string, that value is returned and the other observers are not called. 
     * This is because of the nature of the window.onbeforeunload event.  If a string is returned by that 
     * event handler, the browser will display that string as a prompt to the user. 
     *  
	 * @param pageBeforeUnloadNotificationObserver An object that implements IPageBeforeUnloadNotificationObserver.
	 */
    processPageBeforeUnloadNotification : function(pageBeforeUnloadNotification)
    {
        if(!pageBeforeUnloadNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("pageBeforeUnloadNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._pageBeforeUnloadNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._pageBeforeUnloadNotificationObservers[i];
                var returnValue = observer.processPageBeforeUnloadNotification(pageBeforeUnloadNotification);
                if (null != returnValue && returnValue.length > 0)
                {
                    return returnValue;
                }
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }

        return null;
    },

	/**
	 * The object passed to this method will receive notifications of type: PageUnloadNotification. 
	 * 
	 * @param pageUnloadNotificationObserver An object that implements IPageUnloadNotificationObserver.
	 */
    registerPageUnloadNotificationObserver : function(pageUnloadNotificationObserver)
    {
        if(!pageUnloadNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("pageUnloadNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(pageUnloadNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IPageUnloadNotificationObserver);

        this._pageUnloadNotificationObservers.push(pageUnloadNotificationObserver);
    },
    
	/**
	 * Dispatches a PageUnloadNotification to registered observers.
	 * 
	 * @param pageUnloadNotificationObserver An object that implements IPageUnloadNotificationObserver.
	 */
    processPageUnloadNotification : function(pageUnloadNotification)
    {
        if(!pageUnloadNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("pageUnloadNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._pageUnloadNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._pageUnloadNotificationObservers[i];
                observer.processPageUnloadNotification(pageUnloadNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: ChatCreationNotification. 
	 * 
	 * @param chatCreationNotificationObserver An object that implements IChatCreationNotificationObserver.
	 */
    registerChatCreationNotificationObserver : function(chatCreationNotificationObserver)
    {
        if(!chatCreationNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("chatCreationNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(chatCreationNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IChatCreationNotificationObserver);

        this._chatCreationNotificationObservers.push(chatCreationNotificationObserver);
    },
    
	/**
	 * Dispatches a ChatCreationNotification to registered observers.
	 * 
	 * @param chatCreationNotification An object that implements IChatCreationNotification.
	 */
    processChatCreationNotification : function(chatCreationNotification)
    {
        if(!chatCreationNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("chatCreationNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._chatCreationNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._chatCreationNotificationObservers[i];
                observer.processChatCreationNotification(chatCreationNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: ChatCreationFailureNotification. 
	 * 
	 * @param chatCreationFailureNotificationObserver An object that implements IChatCreationFailureNotificationObserver.
	 */
    registerChatCreationFailureNotificationObserver : function(chatCreationFailureNotificationObserver)
    {
        if(!chatCreationFailureNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("chatCreationFailureNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(chatCreationFailureNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IChatCreationFailureNotificationObserver);

        this._chatCreationFailureNotificationObservers.push(chatCreationFailureNotificationObserver);
    },
    
	/**
	 * Dispatches a ChatCreationFailureNotification to registered observers.
	 * 
	 * @param chatCreationFailureNotification An object that implements IChatCreationFailureNotification.
	 */
    processChatCreationFailureNotification : function(chatCreationFailureNotification)
    {
        if(!chatCreationFailureNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("chatCreationFailureNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._chatCreationFailureNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._chatCreationFailureNotificationObservers[i];
                observer.processChatCreationFailureNotification(chatCreationFailureNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: ChatCompletionNotification. 
	 * 
	 * @param chatCompletionNotificationObserver An object that implements IChatCompletionNotificationObserver.
	 */
    registerChatCompletionNotificationObserver : function(chatCompletionNotificationObserver)
    {
        if(!chatCompletionNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("chatCompletionNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(chatCompletionNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IChatCompletionNotificationObserver);

        this._chatCompletionNotificationObservers.push(chatCompletionNotificationObserver);
    },
    
	/**
	 * Dispatches a ChatCompletionNotification to registered observers.
	 * 
	 * @param chatCompletionNotification An object that implements IChatCompletionNotification.
	 */
    processChatCompletionNotification : function(chatCompletionNotification)
    {
        if(!chatCompletionNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("chatCompletionNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._chatCompletionNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._chatCompletionNotificationObservers[i];
                observer.processChatCompletionNotification(chatCompletionNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: ChatCompletionFailureNotification. 
	 * 
	 * @param chatCompletionFailureNotificationObserver An object that implements IChatCompletionFailureNotificationObserver.
	 */
    registerChatCompletionFailureNotificationObserver : function(chatCompletionFailureNotificationObserver)
    {
        if(!chatCompletionFailureNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("chatCompletionFailureNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(chatCompletionFailureNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IChatCompletionFailureNotificationObserver);

        this._chatCompletionFailureNotificationObservers.push(chatCompletionFailureNotificationObserver);
    },
    
	/**
	 * Dispatches a ChatCompletionFailureNotification to registered observers.
	 * 
	 * @param chatCompletionFailureNotification An object that implements IChatCompletionFailureNotification.
	 */
    processChatCompletionFailureNotification : function(chatCompletionFailureNotification)
    {
        if(!chatCompletionFailureNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("chatCompletionFailureNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._chatCompletionFailureNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._chatCompletionFailureNotificationObservers[i];
                observer.processChatCompletionFailureNotification(chatCompletionFailureNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: CallbackCreationNotification. 
	 * 
	 * @param callbackCreationNotificationObserver An object that implements ICallbackCreationNotificationObserver.
	 */
    registerCallbackCreationNotificationObserver : function(callbackCreationNotificationObserver)
    {
        if(!callbackCreationNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("callbackCreationNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(callbackCreationNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.ICallbackCreationNotificationObserver);

        this._callbackCreationNotificationObservers.push(callbackCreationNotificationObserver);
    },
    
	/**
	 * Dispatches a CallbackCreationNotification to registered observers.
	 * 
	 * @param callbackCreationNotification An object that implements ICallbackCreationNotification.
	 */
    processCallbackCreationNotification : function(callbackCreationNotification)
    {
        if(!callbackCreationNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("callbackCreationNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._callbackCreationNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._callbackCreationNotificationObservers[i];
                observer.processCallbackCreationNotification(callbackCreationNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: CallbackCreationFailureNotification. 
	 * 
	 * @param callbackCreationFailureNotificationObserver An object that implements ICallbackCreationFailureNotificationObserver.
	 */
    registerCallbackCreationFailureNotificationObserver : function(callbackCreationFailureNotificationObserver)
    {
        if(!callbackCreationFailureNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("callbackCreationFailureNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(callbackCreationFailureNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.ICallbackCreationFailureNotificationObserver);

        this._callbackCreationFailureNotificationObservers.push(callbackCreationFailureNotificationObserver);
    },
    
	/**
	 * Dispatches a CallbackCreationFailureNotification to registered observers.
	 * 
	 * @param callbackCreationFailureNotification An object that implements ICallbackCreationFailureNotification.
	 */
    processCallbackCreationFailureNotification : function(callbackCreationFailureNotification)
    {
        if(!callbackCreationFailureNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("callbackCreationFailureNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._callbackCreationFailureNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._callbackCreationFailureNotificationObservers[i];
                observer.processCallbackCreationFailureNotification(callbackCreationFailureNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: CallbackStatusNotification. 
	 * 
	 * @param callbackStatusNotificationObserver An object that implements ICallbackStatusNotificationObserver.
	 */
    registerCallbackStatusNotificationObserver : function(callbackStatusNotificationObserver)
    {
        if(!callbackStatusNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("callbackStatusNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(callbackStatusNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.ICallbackStatusNotificationObserver);

        this._callbackStatusNotificationObservers.push(callbackStatusNotificationObserver);
    },
    
	/**
	 * Dispatches a CallbackStatusNotification to registered observers.
	 * 
	 * @param callbackStatusNotification An object that implements ICallbackStatusNotification.
	 */
    processCallbackStatusNotification : function(callbackStatusNotification)
    {
        if(!callbackStatusNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("callbackStatusNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._callbackStatusNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._callbackStatusNotificationObservers[i];
                observer.processCallbackStatusNotification(callbackStatusNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: CallbackStatusFailureNotification. 
	 * 
	 * @param callbackStatusFailureNotificationObserver An object that implements ICallbackStatusFailureNotificationObserver.
	 */
    registerCallbackStatusFailureNotificationObserver : function(callbackStatusFailureNotificationObserver)
    {
        if(!callbackStatusFailureNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("callbackStatusFailureNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(callbackStatusFailureNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.ICallbackStatusFailureNotificationObserver);

        this._callbackStatusFailureNotificationObservers.push(callbackStatusFailureNotificationObserver);
    },
    
	/**
	 * Dispatches a CallbackStatusFailureNotification to registered observers.
	 * 
	 * @param callbackStatusFailureNotification An object that implements ICallbackStatusFailureNotification.
	 */
    processCallbackStatusFailureNotification : function(callbackStatusFailureNotification)
    {
        if(!callbackStatusFailureNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("callbackStatusFailureNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._callbackStatusFailureNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._callbackStatusFailureNotificationObservers[i];
                observer.processCallbackStatusFailureNotification(callbackStatusFailureNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: CallbackDisconnectNotification. 
	 * 
	 * @param callbackDisconnectNotificationObserver An object that implements ICallbackDisconnectNotificationObserver.
	 */
    registerCallbackDisconnectNotificationObserver : function(callbackDisconnectNotificationObserver)
    {
        if(!callbackDisconnectNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("callbackDisconnectNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(callbackDisconnectNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.ICallbackDisconnectNotificationObserver);

        this._callbackDisconnectNotificationObservers.push(callbackDisconnectNotificationObserver);
    },
    
	/**
	 * Dispatches a CallbackDisconnectNotification to registered observers.
	 * 
	 * @param callbackDisconnectNotification An object that implements ICallbackDisconnectNotification.
	 */
    processCallbackDisconnectNotification : function(callbackDisconnectNotification)
    {
        if(!callbackDisconnectNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("callbackDisconnectNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._callbackDisconnectNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._callbackDisconnectNotificationObservers[i];
                observer.processCallbackDisconnectNotification(callbackDisconnectNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: CallbackDisconnectFailureNotification. 
	 * 
	 * @param callbackDisconnectFailureNotificationObserver An object that implements ICallbackDisconnectFailureNotificationObserver.
	 */
    registerCallbackDisconnectFailureNotificationObserver : function(callbackDisconnectFailureNotificationObserver)
    {
        if(!callbackDisconnectFailureNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("callbackDisconnectFailureNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(callbackDisconnectFailureNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.ICallbackDisconnectFailureNotificationObserver);

        this._callbackDisconnectFailureNotificationObservers.push(callbackDisconnectFailureNotificationObserver);
    },
    
	/**
	 * Dispatches a CallbackDisconnectFailureNotification to registered observers.
	 * 
	 * @param callbackDisconnectFailureNotification An object that implements ICallbackDisconnectFailureNotification.
	 */
    processCallbackDisconnectFailureNotification : function(callbackDisconnectFailureNotification)
    {
        if(!callbackDisconnectFailureNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("callbackDisconnectFailureNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._callbackDisconnectFailureNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._callbackDisconnectFailureNotificationObservers[i];
                observer.processCallbackDisconnectFailureNotification(callbackDisconnectFailureNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: CallbackReconnectNotification. 
	 * 
	 * @param callbackReconnectNotificationObserver An object that implements ICallbackReconnectNotificationObserver.
	 */
    registerCallbackReconnectNotificationObserver : function(callbackReconnectNotificationObserver)
    {
        if(!callbackReconnectNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("callbackReconnectNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(callbackReconnectNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.ICallbackReconnectNotificationObserver);

        this._callbackReconnectNotificationObservers.push(callbackReconnectNotificationObserver);
    },
    
	/**
	 * Dispatches a CallbackReconnectNotification to registered observers.
	 * 
	 * @param callbackReconnectNotification An object that implements ICallbackReconnectNotification.
	 */
    processCallbackReconnectNotification : function(callbackReconnectNotification)
    {
        if(!callbackReconnectNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("callbackReconnectNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._callbackReconnectNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._callbackReconnectNotificationObservers[i];
                observer.processCallbackReconnectNotification(callbackReconnectNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },


	/**
	 * The object passed to this method will receive notifications of type: CallbackReconnectFailureNotification. 
	 * 
	 * @param callbackReconnectFailureNotificationObserver An object that implements ICallbackReconnectFailureNotificationObserver.
	 */
    registerCallbackReconnectFailureNotificationObserver : function(callbackReconnectFailureNotificationObserver)
    {
        if(!callbackReconnectFailureNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("callbackReconnectFailureNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(callbackReconnectFailureNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.ICallbackReconnectFailureNotificationObserver);

        this._callbackReconnectFailureNotificationObservers.push(callbackReconnectFailureNotificationObserver);
    },
    
	/**
	 * Dispatches a CallbackReconnectFailureNotification to registered observers.
	 * 
	 * @param callbackReconnectFailureNotification An object that implements ICallbackReconnectFailureNotification.
	 */
    processCallbackReconnectFailureNotification : function(callbackReconnectFailureNotification)
    {
        if(!callbackReconnectFailureNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("callbackReconnectFailureNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._callbackReconnectFailureNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._callbackReconnectFailureNotificationObservers[i];
                observer.processCallbackReconnectFailureNotification(callbackReconnectFailureNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: PartyInfoNotification. 
	 * 
	 * @param partyInfoNotificationObserver An object that implements IPartyInfoNotificationObserver.
	 */
    registerPartyInfoNotificationObserver : function(partyInfoNotificationObserver)
    {
        if(!partyInfoNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("partyInfoNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(partyInfoNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IPartyInfoNotificationObserver);

        this._partyInfoNotificationObservers.push(partyInfoNotificationObserver);
    },
    
	/**
	 * Dispatches a PartyInfoNotification to registered observers.
	 * 
	 * @param partyInfoNotification An object that implements IPartyInfoNotification.
	 */
    processPartyInfoNotification : function(partyInfoNotification)
    {
        if(!partyInfoNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("partyInfoNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._partyInfoNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._partyInfoNotificationObservers[i];
                observer.processPartyInfoNotification(partyInfoNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    },

	/**
	 * The object passed to this method will receive notifications of type: PartyInfoFailureNotification. 
	 * 
	 * @param partyInfoFailureNotificationObserver An object that implements IPartyInfoFailureNotificationObserver.
	 */
    registerPartyInfoFailureNotificationObserver : function(partyInfoFailureNotificationObserver)
    {
        if(!partyInfoFailureNotificationObserver)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("partyInfoFailureNotificationObserver is null");
        }

        ININ.Web.Common.Interface.ensureImplements(partyInfoFailureNotificationObserver, ININ.Web.Chat.WebServices.Interfaces.IPartyInfoFailureNotificationObserver);

        this._partyInfoFailureNotificationObservers.push(partyInfoFailureNotificationObserver);
    },
    
	/**
	 * Dispatches a PartyInfoFailureNotification to registered observers.
	 * 
	 * @param partyInfoFailureNotification An object that implements IPartyInfoFailureNotification.
	 */
    processPartyInfoFailureNotification : function(partyInfoFailureNotification)
    {
        if(!partyInfoFailureNotification)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("partyInfoFailureNotification is null");
        }

        var exceptions = new Array();
        for(var i = 0; i < this._partyInfoFailureNotificationObservers.length; ++i)
        {
            try
            {
                var observer = this._partyInfoFailureNotificationObservers[i];
                observer.processPartyInfoFailureNotification(partyInfoFailureNotification);
            }
            catch(e)
            {
                ININ.Web.Common.Debug.traceError("Caught unhandled exception in NotificationRegistry:\n" + e);
                exceptions.push(e); // Save for later. Continue notifying listeners.
            }
        }
        if (exceptions.length == 1)
        {
            throw exceptions[0];
        } else if (exceptions.length > 1)
        {
            var masterException = new ININ.Web.Common.ExceptionFactory.createException("Multiple exceptions.");
            masterException.exceptionList = exceptions;
            throw masterException;
        }
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/** 
 * FailoverHandlerBase class 
 *  
 * In charge of connecting to the other server if the current one goes down for some reason. 
 */ 
ININ.Web.Chat.WebServices._Internal._FailoverHandlerBase = Class.create(ININ.Web.Common.InterfaceImplementation,
{
	/**
	 * Constructor
	 * 
	 * @param capabilityRepository Instance of CapabilityRepository, so we'll know how to get the new server's Capabilities
	 */
    initialize : function($super, capabilityRepository)
    {
        ININ.Web.Common.Debug.traceMethodEntered("FailoverHandlerBase.initialize()");
        var numArgs = 2;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("FailoverHandlerBase constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

        ININ.Web.Common.ParameterValidation.validate([capabilityRepository], [ {"required": true} ]);

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IFailoverNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IChatReconnectFailureNotificationObserver);
		
        // Observe additional events, so that we know which type(s) of interaction to attempt to reconnect		
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IChatCreationNotification);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IChatCompletionNotification);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackCreationNotification);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackDisconnectNotification);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerChatCreationNotificationObserver(this);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerChatCompletionNotificationObserver(this);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerCallbackCreationNotificationObserver(this);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerCallbackDisconnectNotificationObserver(this);

        this._capabilityRepository = capabilityRepository;
        this._chatManager = null;
        this._callbackManager = null;
        this._attemptingReconnectToFirstServer = true;
		this._attemptingReconnect = false;
        this._foundServerToUseForReconnect = false;
        this._shouldAttemptToReconnectChat = false;
        this._shouldAttemptToReconnectCallback = false;
        this._reconnectAttempts = 0;

        this.RECONNECT_MAX_ATTEMPTS = 12; // per server
        this.RECONNECT_INTERVAL_MILLISECONDS = 2000;

        ININ.Web.Common.Debug.traceMethodExited("FailoverHandlerBase.initialize()");
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("FailoverHandlerBase.destroy()");
        ININ.Web.Common.InterfaceImplementation.prototype.destroy.call(this);
        ININ.Web.Common.Debug.traceMethodExited("FailoverHandlerBase.destroy()");
    },

    // public methods

	/**
	 * Setter for the ChatManager property
	 * 
	 * @param chatManager An instance of a subclass of ChatManagerBase
	 */
    set_chatManager : function(chatManager)
    {
        this._chatManager = chatManager;
    },

	/**
	 * Setter for the CallbackManager property
	 * 
	 * @param callbackManager An instance of a subclass of CallbackManagerBase
	 */
    set_callbackManager : function(callbackManager)
    {
        this._callbackManager = callbackManager;
    },

	/**
     * Listener for FailoverNotifications.  If one is received, this method 
     * will attempt to reconnect the interaction(s) to other servers.
	 * 
	 * @param notification A FailoverNotification
	 */
    processFailoverNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("FailoverHandlerBase.processFailoverNotification()");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IFailoverNotification);
    
        this.attemptReconnectingToAllAvailableServers();

		ININ.Web.Common.Debug.traceMethodExited("FailoverHandlerBase.processFailoverNotification()");
    },	

	/**
	 * Listener for ChatReconnectFailureNotifications.  If one is received, this method will set a timer so that another attempt will 
	 * be made once the timer fires. 
	 * 
	 * @param notification A ChatReconnectFailureNotification
	 */
    processChatReconnectFailureNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("FailoverHandlerBase.processChatReconnectFailureNotification()");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IChatReconnectFailureNotification);

        // attempt a connection
        // for switchover, this means each server will be tried on every other timeout
        // for single IC systems, this means the server will be tried on every timeout
        var retryCounts = ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.RetryCounts);
        var minDelay = retryCounts.get_reconnectTimeoutMillisecondsMinimum();
        var maxDelay = retryCounts.get_reconnectTimeoutMillisecondsMaximum();
        var delay = ININ.Web.Chat.WebServices.Utilities.randomInRange(minDelay, maxDelay);
        ININ.Web.Common.Debug.traceNote("Delaying for " + delay + " milliseconds before attemptReconnectingToAllAvailableServers");
        window.setTimeout(this.onTimerExpired.bindAsEventListener(this), delay);
        ININ.Web.Common.Debug.traceMethodExited("FailoverHandlerBase.processChatReconnectFailureNotification()");
    },

	/**
	 * Callback that is called when the timer that was set in processChatReconnectFailureNotification() fires.
	 */
    onTimerExpired : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("FailoverHandlerBase.onTimerExpired()");
        this.attemptReconnectingToAllAvailableServers();
        ININ.Web.Common.Debug.traceMethodExited("FailoverHandlerBase.onTimerExpired()");
    },

	/**
	 * Begins the process of looping through the known servers and attempting to reconnect to each one, until one succeeds.
	 */
    attemptReconnectingToAllAvailableServers : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("FailoverHandlerBase.attemptReconnectingToAllAvailableServers()");
		// there is another server to try so try connecting to it
		if(!this._attemptingReconnect)
		{
            this._attemptingReconnect = true;
            this._attemptingReconnectToFirstServer = true;
            this._reconnectAttempts = 0;
            this._requestServerConfiguration();
		}
        ININ.Web.Common.Debug.traceMethodExited("FailoverHandlerBase.attemptReconnectingToAllAvailableServers()");
    },

	// private methods

    _requestServerConfiguration : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("FailoverHandlerBase._requestServerConfiguration()");
        ININ.Web.Common.Debug.traceAlways("Attempting reconnect to: " + ININ.Web.Chat.WebServices.Servers.CurrentUriFragment);
        this._requestServerConfigurationAsync();
        ININ.Web.Common.Debug.traceMethodExited("FailoverHandlerBase._requestServerConfiguration()");
    },

    _requestServerConfigurationAsync : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("FailoverHandlerBase._requestServerConfigurationAsync()");
        ININ.Web.Chat.WebServices.Json.ServerConfigurationManager.getServerConfiguration(this._serverConfigurationCallback.bind(this));
        ININ.Web.Common.Debug.traceMethodExited("FailoverHandlerBase._requestServerConfigurationAsync()");
    },
	
    /**
     * Called upon completion of an attempt to reconnect a Chat, 
     * whether the attempt was successful or not. 
     */
	_onChatReconnectAttemptComplete : function (success, response)
	{
		this._attemptingReconnect = false;
	
		if(success)
		{
            // let the application know that we've reconnected
            var notification = ININ.Web.Chat.WebServices.NotificationFactory.createChatReconnectNotification();
            setTimeout(function(){ININ.Web.Chat.WebServices.NotificationRegistry.processChatReconnectNotification(notification);}, 10);		 
		}
		else
		{
            //the reconnect attempt gave an error; give up.
            var notification = ININ.Web.Chat.WebServices.NotificationFactory.createChatReconnectFailureNotification(response.get_statusReason());
            ININ.Web.Chat.WebServices.NotificationRegistry.processChatReconnectFailureNotification(notification);

            ININ.Web.Common.Debug.traceError("Error reconnecting to the chat. Displaying refresh notification.");
            ININ.Web.Chat.WebServices.NotificationRegistry.processRefreshPageNotification(ININ.Web.Chat.WebServices.NotificationFactory.createRefreshPageNotification(ININ.Web.Chat.WebServices.Servers.CurrentUriFragment));
		}
	},

    /**
     * Called upon completion of an attempt to reconnect a Callback, 
     * whether the attempt was successful or not. 
     */
    _onCallbackReconnectAttemptComplete : function (success, response)
    {
		this._attemptingReconnect = false;
	
		if(success)
		{
            // let the application know that we've reconnected
            var notification = ININ.Web.Chat.WebServices.NotificationFactory.createCallbackReconnectNotification();
            setTimeout(function(){ININ.Web.Chat.WebServices.NotificationRegistry.processCallbackReconnectNotification(notification);}, 10);		 
		}
		else
		{
            //the reconnect attempt gave an error; give up.
            var notification = ININ.Web.Chat.WebServices.NotificationFactory.createCallbackReconnectFailureNotification(response.get_statusReason());
            ININ.Web.Chat.WebServices.NotificationRegistry.processCallbackReconnectFailureNotification(notification);

            ININ.Web.Common.Debug.traceError("Error reconnecting to the callback. Displaying refresh notification.");
            ININ.Web.Chat.WebServices.NotificationRegistry.processRefreshPageNotification(ININ.Web.Chat.WebServices.NotificationFactory.createRefreshPageNotification(ININ.Web.Chat.WebServices.Servers.CurrentUriFragment));
		}
    },

    _serverConfigurationCallback : function(success, failureReason)
    {
        ININ.Web.Common.Debug.traceMethodEntered("FailoverHandlerBase._serverConfigurationCallback()");
        if(this._shouldUseServerForReconnect(success, failureReason))
        {
            ININ.Web.Common.Debug.traceAlways("Using " + ININ.Web.Chat.WebServices.Servers.CurrentUriFragment + " for reconnect...");
	
	        _self = this;

            if (! this._attemptingReconnectToFirstServer)
            {
                // We have successfully switched to the new server.
                ININ.Web.Common.Debug.traceAlways("Failover completed successfully");

                // TODO: Implement the infrastructure for this:
                //ININ.Web.Chat.WebServices.NotificationRegistry.processFailoverCompletedNotification(ININ.Web.Chat.WebServices.NotificationFactory.createFailoverCompletedNotification());
            }

            this._reconnectAttempts = 0;

	        //call the reconnect(s)
            if (this._shouldAttemptToReconnectChat) {
                this._chatManager.reconnect(function(success, response){_self._onChatReconnectAttemptComplete(success, response);});   
            }
            if (this._shouldAttemptToReconnectCallback) {
                this._callbackManager.reconnect(function(success, response){_self._onCallbackReconnectAttemptComplete(success, response);});   
            }
        }
        else
        {
            ININ.Web.Common.Debug.traceAlways("Not using " + ININ.Web.Chat.WebServices.Servers.CurrentUriFragment + " for reconnect...");

            if(this._attemptingReconnectToFirstServer && ININ.Web.Chat.WebServices.Servers.isConfiguredForSwitchover())
            {
                ININ.Web.Common.Debug.traceAlways("Tried connecting to first server and failed.  It's switchover so try the other server after " + this.RECONNECT_INTERVAL_MILLISECONDS + "ms.");
                ININ.Web.Chat.WebServices.Servers.switchCurrentServer();
                this._attemptingReconnectToFirstServer = false;
                window.setTimeout(this._requestServerConfiguration.bind(this), this.RECONNECT_INTERVAL_MILLISECONDS);
            }
            else
            {
                if(ININ.Web.Chat.WebServices.Servers.isConfiguredForSwitchover())
                {
                    ININ.Web.Common.Debug.traceAlways("Failed to connect to both IC servers in the switchover pair");
                    // switch back to original server for next reconnect attempt if we're switchover
                    ININ.Web.Chat.WebServices.Servers.switchCurrentServer();
                }
                else
                {
                    ININ.Web.Common.Debug.traceAlways("Failed to connect to the IC server");
                }

                if (this._reconnectAttempts < this.RECONNECT_MAX_ATTEMPTS)
                {
                    this._attemptingReconnect = false;
                    this._reconnectAttempts++;
                    ININ.Web.Common.Debug.traceWarning("Reconnect attempt #" + this._reconnectAttempts + " failed.  Cycling after " + this.RECONNECT_INTERVAL_MILLISECONDS + "ms.");
                    window.setTimeout(this.attemptReconnectingToAllAvailableServers.bind(this), this.RECONNECT_INTERVAL_MILLISECONDS);
                }
/* 
                else
                {
                    // It's a total failure
                    ININ.Web.Common.Debug.traceNote("Sending out reconnect failure notification.");
                }
*/
            }
        }
        ININ.Web.Common.Debug.traceMethodExited("FailoverHandlerBase._serverConfigurationCallback()");
    },

    _shouldUseServerForReconnect : function(success, failureReason)
    {
        ININ.Web.Common.Debug.traceMethodEntered("FailoverHandlerBase._shouldUserServerForReconnect()");
        // for a server to be considered for the reconnect:
        // 1) the request had to have succeeded
        // 2) the server should have the minimum server config necessary
        var returnValue = success && this._doesServerHaveMinimumServerConfig();

        ININ.Web.Common.Debug.traceNote("Returning: " + returnValue);
        ININ.Web.Common.Debug.traceMethodExited("FailoverHandlerBase._shouldUserServerForReconnect()");
        return returnValue;
    },

    _doesServerHaveMinimumServerConfig : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("FailoverHandlerBase._doesServerHaveMinimumServerConfig()");

        var returnValue = ( ININ.Web.Chat.WebServices.CapabilityRepository.get_reconnectChatCapability() &&
                            ININ.Web.Chat.WebServices.CapabilityRepository.get_reconnectCallbackCapability());

        ININ.Web.Common.Debug.traceNote("Returning: " + returnValue);
        ININ.Web.Common.Debug.traceMethodExited("FailoverHandlerBase._doesServerHaveMinimumServerConfig()");
        return returnValue;
    },

    processChatCreationNotification : function(chatCreationNotification)
    {
        this._shouldAttemptToReconnectChat = true;
    },

    processChatCompletionNotification : function(chatCompletionNotification)
    {
        this._shouldAttemptToReconnectChat = false;
    },

    processCallbackCreationNotification : function(callbackCreationNotification)
    {
        this._shouldAttemptToReconnectCallback = true;
    },

    processCallbackDisconnectNotification : function(callbackDisconnectNotification)
    {
        this._shouldAttemptToReconnectCallback = false;
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Json._Internal");

/**
 * FailoverHandler class 
 * JSON-specific subclass of FailoverHandlerBase.  Ensures the use of ININ.Web.Chat.WebServices.Json.AjaxManager.
 */
ININ.Web.Chat.WebServices.Json._Internal._FailoverHandler = Class.create(ININ.Web.Chat.WebServices._Internal._FailoverHandlerBase,
{
	/**
	 * Constructor
	 * 
	 * @param genericResponseBuilder The object that shall be used to translate the IC server's HTTP reply into a ResponseBase (or subclass thereof)
	 * @param capabilityRepository An instance of CapabilityRepository, in which the capabilities are stored.
	 */
    initialize: function($super, genericResponseBuilder, capabilityRepository)
    {
        $super(capabilityRepository);

        this._genericResponseBuilder = genericResponseBuilder;
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Chat.WebServices._Internal._FailoverHandlerBase.prototype.destroy.call(this);
    },

    // methods

	/**
	 * Overload of FailoverHandlerBase.set_chatManager(). 
	 * 
	 * @param chatManager The ChatManager currently in use
	 */
    set_chatManager : function(chatManager)
    {
        ININ.Web.Chat.WebServices._Internal._FailoverHandlerBase.prototype.set_chatManager.call(this, chatManager);
    },

	/**
	 * FailoverHandlerBase will call this, to get an instance of (a subclass of) AjaxManagerBase. 
	 *  
	 * @param capability  A Capability object representing what this AjaxManager is intended to do (i.e. poll, send message, etc.)
	 * @param serverUriFragment The URI fragment that reverse proxies to the IC server. 
	 * @return AjaxManager 
	 */
    _createAjaxManager : function(capability, serverUriFragment)
    {
        return new ININ.Web.Chat.WebServices.Json.AjaxManager(this._genericResponseBuilder, capability, serverUriFragment);
    },

	/**
	 * Overload of FailoverHandlerBase.processFailoverNotification().
	 *  
	 * @param notification Something that implements IFailoverNotification
	 */
    processFailoverNotification : function(notification)
    {
        ININ.Web.Chat.WebServices._Internal._FailoverHandlerBase.prototype.processFailoverNotification.call(this, notification);
    }
});

/*global ININ: true, Class: true, Option: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/**
 * MessageData class 
 * Represents something that someone has typed in a chat.  Consists of the name of the person 
 * who typed something, what they typed, and when they typed it. 
 */
ININ.Web.Chat.WebServices.MessageData = Class.create(ININ.Web.Common.InterfaceImplementation,
{
    /**
	 * constructor 
	 * @param date - When the message was typed 
	 * @param name - Who typed the message 
	 * @param text - What was typed 
	 */
    initialize : function($super, date, name, text)
    {
        var numArgs = 4;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("MessageData constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }
        
        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IMessageData);

        this._date = date;
        this._name = name;
        this._text = text;
    },

    // public methods

	/**
	 * Returns the timestamp of when the message was typed
	 */
    get_date : function()
    {
        return this._date;
    },

	/**
	 * Returns the name of the person who typed the message
	 */
    get_name : function()
    {
        return this._name;
    },

	/**
	 * Returns the message that was typed
	 */
    get_text : function()
    {
        return this._text;
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * ReceivedMessageRepository class 
 *  
 * This class stores all the messages sent during the chat.  Only one instance is needed.
 */
ININ.Web.Chat.WebServices._Internal._ReceivedMessageRepository = Class.create(ININ.Web.Common.InterfaceImplementation,
{
	/**
	 * Constructor
	 */
    initialize:function($super)
    {
        var numArgs = 1;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ReceivedMessageRepository constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IReceivedTextNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IReceivedUrlNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IReceivedFileNotificationObserver);
        
        this._receivedMessages = [];
        this._lastConversationSequenceNumber = null;
        this._linkifier = ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.Linkifier);
    },
    
	/**
	 * Destructor
	 */
    destroy : function()
    {
        if(this._receivedMessages)
        {
            delete this._receivedMessages;
            this._receivedMessages = null;
        }

        ININ.Web.Common.InterfaceImplementation.prototype.destroy.call(this);
    },

    // public methods

	/**
	 * Called when the web user receives a message from an agent
	 * 
	 * @param notification An instance of ReceivedTextNotification
	 */
    processReceivedTextNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IReceivedTextNotification);
        this.addMessage(notification.get_dateTime(), notification.get_participantId(), this._linkifier.linkifyText(notification.get_messageText()));
        this._lastConversationSequenceNumber = notification.get_conversationSequenceNumber();
    },

	/**
	 * Called when the web user receives a URL from an agent
	 * 
	 * @param notification An instance of ReceivedUrlNotification
	 */
    processReceivedUrlNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IReceivedUrlNotification);
        this.addMessage(notification.get_dateTime(), notification.get_participantId(), this._linkifier.linkifyText(notification.get_messageUrl()));
        this._lastConversationSequenceNumber = notification.get_conversationSequenceNumber();
    },

	/**
	 * Called when the web user receives a file from an agent
	 * 
	 * @param notification An instance of ReceivedFileNotification
	 */
    processReceivedFileNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IReceivedFileNotification);
        var text = this._getFileName(notification.get_messageRelativeUrl());
        var url = this._createFullUrl(notification.get_messageRelativeUrl());
        var message = '<a href="' + url + '" target="blank">' + text + '</a>';
        this.addMessage(notification.get_dateTime(), notification.get_participantId(), message);
        this._lastConversationSequenceNumber = notification.get_conversationSequenceNumber();
    },

	/**
	 * Each message (text, file, or URL) in the chat has a sequence number, so that they may be kept in the proper order. 
	 * This method returns the highest sequence number that has been used so far. 
	 */
    get_lastConversationSequenceNumber : function()
    {
        return this._lastConversationSequenceNumber;
    },

	/**
	 * Adds a message to the repository.
	 * 
	 * @param dateTime When the message was added
	 * @param participantId Who sent the text, file, or URL
	 * @param text The text to store in the repository.  For instance, if a file was received, this could be HTML code to provide a link to the file.
	 */
    addMessage : function(dateTime, participantId, text)
    {
        // can't just check if(!text), since we want to let empty strings through
        if(text === undefined)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("text parameter to addMessage is undefined");
        }
        if(text === null)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("text parameter to addMessage is null");
        }
        if(typeof text != "string")
        {
            throw ININ.Web.Common.ExceptionFactory.createException("text parameter to addMessage is not a string");
        }

        var participantName = this._getParticipantName(participantId);
        this._receivedMessages.push(new ININ.Web.Chat.WebServices.MessageData(dateTime, participantName, text));
    },

	/**
	 * Get the list of messages that are in the repository
	 *  
	 * @return An array of MessageData objects. 
	 */
    get_messages : function()
    {
        return this._receivedMessages;
    },

	/**
	 * Resets the repository to its default state.
	 */
    reset : function()
    {
        this._receivedMessages = [];
    },

    // private methods

    _getFileName : function(relativeUrl)
    {
        return ININ.Web.Chat.WebServices.Utilities.getFileNameFromUrl(relativeUrl);
    },

    _createFullUrl : function(relativeUrl)
    {
        return ININ.Web.Chat.WebServices.Servers.buildUrl(ININ.Web.Chat.WebServices.Servers.CurrentUriFragment, relativeUrl);
    },

    _getParticipantName : function(participantId)
    {
        var participant = ININ.Web.Chat.WebServices.ParticipantRepository.get_participant(participantId);
        if(participant)
        {
            return participant.get_name();
        }

        return "IC";
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * ReceivedUrlRepository class 
 *  
 * A place to store the URLs which are sent to the web user by the agent(s) 
 */
ININ.Web.Chat.WebServices._Internal._ReceivedUrlRepository = Class.create(ININ.Web.Common.InterfaceImplementation,
{
	/**
	 * Constructor
	 */
    initialize:function($super)
    {
        var numArgs = 1;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ReceivedUrlRepository constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IReceivedUrlNotificationObserver);
        
        this._receivedUrls = [];
    },
    
	/**
	 * Destructor
	 */
    destroy : function()
    {
        if(this._receivedUrls)
        {
            delete this._receivedUrls;
            this._receivedUrls = null;
        }

        ININ.Web.Common.InterfaceImplementation.prototype.destroy.call(this);
    },

    // public methods

	/**
	 * Called when the web user receives a URL from an agent
	 * 
	 * @param notification An instance of ReceivedUrlNotification
	 */
    processReceivedUrlNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IReceivedUrlNotification);
        this.addUrl(notification.get_messageUrl());
    },

	/**
	 * Adds a URL to the repository.  Mostly exists as a helper to processReceivedUrlNotification().
	 * 
	 * @param url The URL to add to the repository.
	 */
    addUrl : function(url)
    {
        if(!url)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Url parameter to addUrl is null/undefined");
        }
        if(url.length === 0)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Url parameter to addUrl is empty");
        }
        if(typeof url != "string")
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Url parameter to addUrl is not a string");
        }
        
        this._receivedUrls.push(url);
    },

	/**
	 * Gets the set of URLs that are in the repository
	 *
	 * @return list of URLs
	 */
    get_urls : function()
    {
        return this._receivedUrls;
    },

	/**
	 * Resets the repository to its default state.  Removes all URLs.
	 */
    reset : function()
    {
        this._receivedUrls = [];
    }
});

/*global ININ: true, Error: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/**
 * ChatPropertyUpdateRegistry class 
 *  
 * Notifies interested parties about changes to properties of the chat.  Currently this only includes the poll wait time suggestion. 
 */
ININ.Web.Chat.WebServices.ChatPropertyUpdateRegistry = (function()
{
    // private
    var _pollWaitSuggestionUpdateObservers = [];
    
    // public methods
    return {

		/**
		 * Destructor
		 */
        destroy : function()
        {
            delete _pollWaitSuggestionUpdateObservers;
            _pollWaitSuggestionUpdateObservers = null;
        },

		/**
		 * Parties (i.e. other objects) interested in being notified about changes to poll wait time suggestion 
		 * may call this method.  If they do so, their processPollWaitSuggestionUpdate() method will be 
		 * called when this property changes. 
		 *  
		 * @param pollWaitSuggestionUpdateObserver An object with a processPollWaitSuggestionUpdate() method 
		 */
        registerPollWaitSuggestionUpdateObserver : function(pollWaitSuggestionUpdateObserver)
        {
            if(!pollWaitSuggestionUpdateObserver)
            {
                throw ININ.Web.Common.ExceptionFactory.createException("pollWaitSuggestionUpdateObserver is null");
            }

            ININ.Web.Common.Interface.ensureImplements(pollWaitSuggestionUpdateObserver, ININ.Web.Chat.WebServices.Interfaces.IPollWaitSuggestionUpdateObserver);

            _pollWaitSuggestionUpdateObservers.push(pollWaitSuggestionUpdateObserver);
        },
        
		/**
		 * This will be called when the poll wait time suggestion changes.  It will notify each interested party (i.e. object) 
		 * of this by calling its processPollWaitSuggestionUpdate() method. 
		 *  
		 * @param pollWaitSuggestion A number (or string containing a number) indicating the number of milliseconds to wait before the next poll.
		 */
        processPollWaitSuggestionUpdate : function(pollWaitSuggestion)
        {
            if(!pollWaitSuggestion)
            {
                throw ININ.Web.Common.ExceptionFactory.createException("pollWaitSuggestion is null");
            }

            if(typeof pollWaitSuggestion == "string")
            {
                if(pollWaitSuggestion.length === 0)
                {
                    throw ININ.Web.Common.ExceptionFactory.createException("pollWaitSuggestion is not an empty string");
                }
                
                // convert it to a number and let the number branch handle it
                pollWaitSuggestion = parseInt(pollWaitSuggestion, 10);
            }
            
            if(isNaN(pollWaitSuggestion))
            {
                throw ININ.Web.Common.ExceptionFactory.createException("pollWaitSuggestion is not a number");
            }

            if(typeof pollWaitSuggestion != "number")
            {
                throw ININ.Web.Common.ExceptionFactory.createException("pollWaitSuggestion is not a number");
            }

            for(var i = 0; i < _pollWaitSuggestionUpdateObservers.length; ++i)
            {
                var observer = _pollWaitSuggestionUpdateObservers[i];
                observer.processPollWaitSuggestionUpdate(pollWaitSuggestion);
            }
        }
    };

})();

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/**
 * Participant class 
 * This class represents a participant in an interaction. 
 *  
 * If a person is participating in two interactions, there will be two 
 * different Participant instances created to represent that situation. 
 */
ININ.Web.Chat.WebServices.Participant = Class.create(ININ.Web.Common.InterfaceImplementation,
{
    // public methods

	/**
	 * Constructor
	 * 
	 * @param id A unique ID representing this person participating in this interaction.
     * @param name The name of this participant. 
     * @param interactionType The type of interaction in which the person is participating.  A constant defined in ININ.Web.Chat.WebServices.InteractionTypes. 
	 * @param isActive Whether this participant is currently active in the chat.
	 */
    initialize: function($super, id, name, interactionType, isActive)
    {
        ININ.Web.Common.ParameterValidation.validate([id, name, isActive], [ {"type": String, "allowEmpty": false, "required": true}, {"type": String, "allowEmpty": true, "required": false}, {"type": Boolean, "required": false}]);
            
        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipant);

        this._id = id;
        this._name = name;
        this._interactionType = interactionType;
        this._photo = null;

        if(isActive === undefined)
        {
            this._isActive = true;
        }
        else
        {
            this._isActive = isActive;
        }
    },

	/**
	 * Gets the ID of the participant
	 *  
	 * @return The ID of the participant. 
	 */
    get_id : function()
    {
        return this._id;
    },

	/**
	 * Gets the name of the participant
	 *  
	 * @return The name of the participant. 
	 */
    get_name : function()
    {
        return this._name;
    },

	/**
	 * Sets the name of the participant
	 *  
	 * @param newName The name of the participant. 
	 */
    set_name : function(newName)
    {
        this._name = newName;
    },

	/**
	 * Gets the type of interaction in which the participant is participating
	 *  
	 * @return A constant defined in ININ.Web.Chat.WebServices.InteractionTypes. 
	 */
    get_interactionType : function()
    {
        return this._interactionType;
    },

	/**
	 * Gets the photo of the participant
	 *  
	 * @return The photo of the participant. 
	 */
    get_photo : function()
    {
        return this._photo;
    },

	/**
	 * Sets the photo of the participant
	 *  
	 * @param photo The photo of the participant. 
	 */
    set_photo : function(photo)
    {
        this._photo = photo;
    },

	/**
	 * Gets whether the participant is currently active in the chat.
	 *  
	 * @return True if the participant is active, false if the participant is inactive.
	 */
    get_isActive : function()
    {
        return this._isActive;
    },

	/**
	 * Sets whether the participant is currently active in the chat.
	 *  
	 * @param active True if the participant is active, false if the participant is inactive.
	 */
    set_isActive : function(active)
    {
        this._isActive = active;
    }
});


/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/**
 * ParticipantRepositoryBase class 
 *  
 * Abstract class.  Keeps track of which participants are participating in an 
 * interaction (i.e. a chat, callback, etc.), their status, and which one 
 * is the current chat participant (i.e. the one whose web browser is running this code). 
 */
ININ.Web.Chat.WebServices.ParticipantRepositoryBase = Class.create(ININ.Web.Common.InterfaceImplementation,
{
    // constants

    /**
     * The participant ID that is used for messages from the IC system itself.
     */
    SYSTEM_SENDER_ID : '00000000-0000-0000-0000-000000000000',

	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        var numArgs = 1;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ParticipantsRepositoryBase constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantRepository);

        // initialize private members
        this._currentParticipantId = null;
        this._participants = [];
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Common.InterfaceImplementation.prototype.destroy.call(this);

        delete this._participants;
        this._participants = null;
    },

    // public methods

	/**
	 * Gets the ID of the current participant (i.e. the one whose web browser is running this code)
	 *  
	 * @return ID of the current participant 
	 */
    get_currentParticipantId : function()
    {
        return this._currentParticipantId;
    },

    /**
     * Gets the participant ID that is used for messages from the IC system itself. 
     *  
     * @return ID of the "system" participant 
     */
    get_systemParticipantId : function()
    {
        return this.SYSTEM_SENDER_ID;
    },

	/**
	 * Add another participant to the repository
	 * 
	 * @param participant An instance of ININ.Web.Chat.WebServices.Participant
	 */
    addParticipant : function(participant)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ParticipantRepositoryBase.addParticipant()");

        if(!participant)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Participant parameter to addParticipant is null/undefined");
        }
        if(typeof participant != "object")
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Participant parameter to addParticipant is not an object");
        }
        
        ININ.Web.Common.Interface.ensureImplements(participant, ININ.Web.Chat.WebServices.Interfaces.IParticipant);
        
        // Don't want the web user's username to be an HTML form, a Javascript function call, etc.!
        participant.set_name(ININ.Web.Chat.WebServices.Utilities.escapeHTML(participant.get_name()));

        // TODO: this should probably be locked
        this._participants.push(participant);
        ININ.Web.Common.Debug.traceMethodExited("ParticipantRepositoryBase.addParticipant()");
    },

	/**
	 * Remove a participant from the repository
	 * 
     * @param participantId The ID of a participant already involved in an interaction 
     * @return true If the participant was found and removed, false if the ID did not match any participant involved in any interaction
	 */
    removeParticipant : function(participantId)
    {
        if(!participantId)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantId parameter to removeParticipant is null/undefined");
        }
        if(typeof participantId != "string")
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantId parameter to removeParticipant is not a string");
        }

        // TODO: this should be locked
        for(var i = 0; i < this._participants.length; ++i)
        {
            var participant = this._participants[i];

            ININ.Web.Common.Interface.ensureImplements(participant, ININ.Web.Chat.WebServices.Interfaces.IParticipant);
            if(participantId == participant.get_id())
            {
                this._participants.splice(i, 1);
                return true;
            }
        }
        
        return false;
    },

    /**
     * Removes all participants of a particular interaction type
     * 
     * @param interactionType A constant defined in ININ.Web.Chat.WebServices.InteractionTypes
     */
    removeAllParticipantsForInteractionType : function(interactionType)
    {
        if (!ININ.Web.Chat.WebServices.InteractionTypes.validate(interactionType))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("interactionType parameter to removeAllParticipantsForInteractionType is not valid");
        }

        var i=0;
        // TODO: this should be locked
        while (i < this._participants.length)
        {
            var participant = this._participants[i];

            ININ.Web.Common.Interface.ensureImplements(participant, ININ.Web.Chat.WebServices.Interfaces.IParticipant);
            if (interactionType == participant.get_interactionType())
            {
                this._participants.splice(i, 1);
            }
            else
            {
                ++i;
            }
        }
    },

	/**
     * Change the name of a participant in an interaction
	 * 
	 * @param participantId The ID of the participant whose name has changed.
	 * @param newParticipantName The new name of the participant identified by participantId
	 */
    changeParticipantName : function(participantId, newParticipantName)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ParticipantRepositoryBase.changeParticipantName()");
        if(!participantId)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantId parameter to changeParticipantName is null/undefined");
        }
        if(typeof participantId != "string")
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantId parameter to changeParticipantName is not a string");
        }

        // Don't want the web user's username to be an HTML form, a Javascript function call, etc.!
        newParticipantName = ININ.Web.Chat.WebServices.Utilities.escapeHTML(newParticipantName);

        // TODO: this should be locked
        for(var i = 0; i < this._participants.length; ++i)
        {
            var participant = this._participants[i];
            
            ININ.Web.Common.Interface.ensureImplements(participant, ININ.Web.Chat.WebServices.Interfaces.IParticipant);
            if(participantId == participant.get_id())
            {
                participant.set_name(newParticipantName);
                break;
            }
        }
        ININ.Web.Common.Debug.traceMethodExited("ParticipantRepositoryBase.changeParticipantName()");
    },

	/**
     * Participants in a chat can be active or inactive.  This method may be used to mark a participant as active.
     * Currently not used for any other interaction type.
	 *  
	 * @param participantId The ID of the participant who has just become active
	 */
    markParticipantAsActive : function(participantId)
    {
        var participant = this.get_participant(participantId);
        if(participant)
        {
            participant.set_isActive(true);
        }
    },

	/**
	 * Participants in a chat can be active or inactive.  This method may be used to mark a participant as inactive. 
     * Currently not used for any other interaction type.
	 *  
	 * @param participantId The ID of the participant who has just become inactive
	 */
    markParticipantAsInactive : function(participantId)
    {
        var participant = this.get_participant(participantId);
        if(participant)
        {
            participant.set_isActive(false);
        }
    },

	/**
	 * Returns an array of all the participants in the repository
	 *  
	 * @return array of ININ.Web.Chat.WebServices.Participant 
	 */
    get_participants : function()
    {
        return this._participants;
    },

	/**
	 * Gets a participant, given the participant's ID
	 * 
	 * @param participantId The ID of a participant in an interaction.
	 * @return An ININ.Web.Chat.WebServices.Participant, if the ID belongs to someone in an interaction.  Null otherwise. 
	 */
    get_participant : function(participantId)
    {
        if(!participantId)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantId parameter to get_participant is null/undefined");
        }
        if(typeof participantId != "string")
        {
            throw ININ.Web.Common.ExceptionFactory.createException("participantId parameter to get_participant is not a string");
        }

        // TODO: lock this with a mutex
        for(var i = 0; i < this._participants.length; ++i)
        {
            var participant = this._participants[i];
            if (participant.get_id() == participantId)
            {
                return participant;
            }
        }

        return null;
    },

	/**
	 * Resets the participant repository to its initial state.
	 */
    reset : function()
    {
        this._participants = [];
    },

    // private methods

    _debug : function()
    {
        ININ.Web.Common.Debug.traceNote("ParticipantRepositoryBase.debug(): Repository contains:");
        for(var i = 0; i < this._participants.length; ++i)
        {
            var participant = this._participants[i];
            ININ.Web.Common.Debug.traceNote("    ID:" + participant.get_id() + "  Name:" + participant.get_name() + "  Active:" + participant.get_isActive());
        }
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * ParticipantRepository class 
 *  
 * Extends ParticipantRepositoryBase, to use Observer/Notification interfaces. 
 */
ININ.Web.Chat.WebServices._Internal._ParticipantRepository = Class.create(ININ.Web.Chat.WebServices.ParticipantRepositoryBase,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        var numArgs = 1;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ParticipantsRepository constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICurrentParticipantIdChangedNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.INewParticipantNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantJoinedNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantLeftNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantNameChangedNotificationObserver);
    },

	/**
	 * Constructor
	 */
    destroy : function()
    {
        ININ.Web.Chat.WebServices.ParticipantRepositoryBase.prototype.destroy.call(this);
    },

    // public methods

	/**
	 * Changes the ID of the current participant (i.e. the participant whose web browser this code is running in)
	 * 
	 * @param notification An ICurrentParticipantIdChangedNotification
	 */
    processCurrentParticipantIdChangedNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ParticipantRepository.processCurrentParticipantIdChangedNotification");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.ICurrentParticipantIdChangedNotification);
        this._currentParticipantId = notification.get_participantId();
        ININ.Web.Common.Debug.traceMethodExited("ParticipantRepository.processCurrentParticipantIdChangedNotification");
    },

	/**
	 * Adds a participant to the repository
	 * 
	 * @param notification An INewParticipantNotification
	 */
    processNewParticipantNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ParticipantRepository.processNewParticipantNotification");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.INewParticipantNotification);
        this.addParticipant(this._convertNewParticipantNotificationToParticipant(notification));
        ININ.Web.Common.Debug.traceMethodExited("ParticipantRepository.processNewParticipantNotification");
    },

	/**
	 * Marks a participant as active in the chat
	 * 
	 * @param notification An IParticipantJoinedNotification
	 */
    processParticipantJoinedNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ParticipantRepository.processParticipantJoinedNotification");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantJoinedNotification);
        this.markParticipantAsActive(notification.get_participantId());
        ININ.Web.Common.Debug.traceMethodExited("ParticipantRepository.processParticipantJoinedNotification");
    },

	/**
	 * Marks a participant as inactive in the chat
	 * 
	 * @param notification An IParticipantLeftNotification
	 */
    processParticipantLeftNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ParticipantRepository.processParticipantLeftNotification");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantLeftNotification);
        this.markParticipantAsInactive(notification.get_participantId());
        ININ.Web.Common.Debug.traceMethodExited("ParticipantRepository.processParticipantLeftNotification");
    },

	/**
	 * Changes the name of a participant
	 * 
	 * @param notification An IParticipantNameChangedNotification
	 */
    processParticipantNameChangedNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ParticipantRepository.processParticipantNameChangedNotification");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantNameChangedNotification);
        this.changeParticipantName(notification.get_participantId(), notification.get_newParticipantName());
        ININ.Web.Common.Debug.traceMethodEntered("ParticipantRepository.processParticipantNameChangedNotification");
    },

    // private methods

    _convertNewParticipantNotificationToParticipant : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.INewParticipantNotification);
        return new ININ.Web.Chat.WebServices.Participant(notification.get_participantId(), notification.get_participantName(), notification.get_interactionType(), false);
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");


/**
 *  Polling manager class
 * 
 *  This class should be viewed as a singleton.
 */
ININ.Web.Chat.WebServices._Internal._PollManager = Class.create(ININ.Web.Chat.WebServices.ListenableBase,
{
    // constants

	/** By default, this is how long the client will wait between polling requests.  Units = milliseconds. */
    DEFAULT_POLL_INTERVAL : 500,

	/**
	 * Constructor
	 */
    initialize: function($super)
    {
        ININ.Web.Common.Debug.traceMethodEntered("PollManager.initialize()");
        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IPollWaitSuggestionUpdateObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IFailoverNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IChatReconnectNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IRefreshPageNotificationObserver);

        this.reset();
        ININ.Web.Common.Debug.traceMethodExited("PollManager.initialize()");
    },
 
	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("PollManager.destroy()");
        ININ.Web.Chat.WebServices.ListenableBase.prototype.destroy.call(this);

        this._chatManager = null;
        
        if(this._timer)
        {
            this._timer.destroy();
            delete this._timer;
            this._timer = null;
        }
        ININ.Web.Common.Debug.traceMethodExited("PollManager.destroy()");
    },

    // public methods

	/**
	 * Resets the PollManager to its default state
	 */
    reset : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("PollManager.reset()");

        ININ.Web.Chat.WebServices.ListenableBase.prototype.reset.call(this);

        // initialize data
        this._isActive = false;
        this._fireResumedPollingNotificationAfterNextPoll = false; // Fires upon first poll after recovery from network problems. Does not fire upon first poll of a new, healthy chat.

        if(this._timer)
        {
            this._timer.destroy();
            delete this._timer;
            this._timer = null;
        }

        // Create a timer to do the polling.
        ININ.Web.Common.Debug.traceNote("Creating poll manager's timer, but not going to start it yet.");
        this._timer = new ININ.Web.Chat.WebServices.RecurringTimer(this.DEFAULT_POLL_INTERVAL);

        var _self = this;
        this._timer.registerSuccessListener(function() { _self.onTimeToPoll(); });

        ININ.Web.Common.Debug.traceMethodExited("PollManager.reset()");
    },

	/**
	 * Setter for the chat manager property
	 * 
	 * @param chatManager The ChatManager singleton
	 */
    set_chatManager : function(chatManager)
    {
        ININ.Web.Common.Debug.traceMethodEntered("PollManager.set_chatManager()");
        this._chatManager = chatManager;
        ININ.Web.Common.Debug.traceMethodExited("PollManager.set_chatManager()");
    },

	/**
	 * Update the duration of the polling timer (in response to the IC server's suggestion to do so)
	 * 
	 * @param pollWaitSuggestion The new suggested polling interval, in milliseconds.
	 */
    processPollWaitSuggestionUpdate : function(pollWaitSuggestion)
    {
        ININ.Web.Common.Debug.traceMethodEntered("PollManager.processPollWaitSuggestionUpdate()");
        this.changeDuration(pollWaitSuggestion);
        ININ.Web.Common.Debug.traceMethodExited("PollManager.processPollWaitSuggestionUpdate()");
    },

	/**
	 * Listener for notification that a failover has occurred.  Stops polling, since the chat is dead.
	 * 
	 * @param notification IFailoverNotification
	 */
    processFailoverNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("PollManager.processFailoverNotification()");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IFailoverNotification);

        ININ.Web.Common.Debug.traceAlways("PollManager received failover notification. Stopping polling.");
        this.stop();
        ININ.Web.Common.Debug.traceMethodExited("PollManager.processFailoverNotification()");
    },

	/**
	 * Listener for notification that the chat has reconnected.  Resumes polling.
	 * 
	 * @param notification IChatReconnectNotification
	 */
    processChatReconnectNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("PollManager.processChatReconnectNotification()");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IChatReconnectNotification);

        ININ.Web.Common.Debug.traceAlways("PollManager received chat reconnect notification. Starting polling.");
        this._fireResumedPollingNotificationAfterNextPoll = true;
		this.start();

        ININ.Web.Common.Debug.traceMethodExited("PollManager.processChatReconnectNotification()");
    },

	/**
     * Listener for notification that the user needs to refresh the page to start a new chat. 
     * Stops polling, since the chat is dead.
	 * 
	 * @param notification IRefreshPageNotification
	 */
    processRefreshPageNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("PollManager.processRefreshPageNotification()");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IRefreshPageNotification);

        ININ.Web.Common.Debug.traceAlways("PollManager received refresh page notification. Stopping polling.");

        // if we need to refresh the page to start over, make sure we've stopped polling
        this.stop();
        ININ.Web.Common.Debug.traceMethodExited("PollManager.processRefreshPageNotification()");
    },

    /**
     *  Start polling.  Called when client app is done initializing.
     */
    start : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("PollManager.start()");

        this._isActive = true;

        if (this._timer)
        {
            ININ.Web.Common.Debug.traceNote("In PollManager.start(), timer exists, so stopping it");
            this._timer.stop(); // Just in case it's already running. Won't do any harm if not.
        }

        if(this._isActive)
        {
            ININ.Web.Common.Debug.traceStatus("Performing first poll");
            this.poll();
            
            ININ.Web.Common.Debug.traceNote("Starting PollManager's timer.");
            this._timer.start();
        }

        ININ.Web.Common.Debug.traceMethodExited("PollManager.start()");
    },

	/**
	 * Stop polling.  Called when the chat is finished.
	 */
    stop : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("PollManager.stop()");
        this._isActive = false;
        if (this._timer)
        {
            ININ.Web.Common.Debug.traceNote("In PollManager.stop(), timer exists, so stopping it");
            this._timer.stop();
        }
        ININ.Web.Common.Debug.traceMethodExited("PollManager.stop()");
    },

	/**
	 * Polling is triggered by a recurring timer.  This method changes the interval at which this timer fires.
	 * 
	 * @param duration The new interval between poll requests, in milliseconds.
	 */
    changeDuration : function(duration)
    {
        ININ.Web.Common.Debug.traceMethodEntered("PollManager.changeDuration()");
        ININ.Web.Common.Debug.traceStatus("PollManager setting timer duration to: " + duration + "ms");
        if (this._timer)
        {
            if(duration != this._timer.get_duration())
            {
                this._timer.restart(duration);
            }
        }
        ININ.Web.Common.Debug.traceMethodExited("PollManager.changeDuration()");
    },

	/**
     * Indicates whether the poll manager is active (i.e. a poll 
     * request is pending right now, or the poll manager is 
     * currently waiting for the timer to fire again). 
	 *  
	 * @return true if the poll manager is active, false if it is not 
	 */
    isActive : function()
    {
        return this._isActive;
    },

    /**
     * Called when the timer goes off, indicating it's time to poll now.
     * Create AJAX mgr, register this as a listener of the AJAX mgr, and send polling request.
     * This method should not be called directly by clients of the API.
     */
    onTimeToPoll : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("PollManager.onTimeToPoll()");

        if(!this._isActive)
        {
            ININ.Web.Common.Debug.traceNote("No longer active, so ignoring this poll timer firing");
        }
        else
        {
            this.poll();
        }
        
        ININ.Web.Common.Debug.traceMethodExited("PollManager.onTimeToPoll()");
    },
    
	/**
	 * Creates and sends a poll request
	 */
    poll : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("PollManager.poll()");

        var ajax = this._chatManager.createAjaxManager(ININ.Web.Chat.WebServices.CapabilityRepository.get_pollCapability());
        var _self = this;
        ajax.registerSuccessListener(function(response)
        {
            ININ.Web.Common.Debug.traceNote("PollManager.poll succeeded: " + response);
            if (_self._fireResumedPollingNotificationAfterNextPoll)
            {
                _self._fireResumedPollingNotificationAfterNextPoll = false;
                ININ.Web.Chat.WebServices.NotificationRegistry.processResumedPollingNotification(ININ.Web.Chat.WebServices.NotificationFactory.createResumedPollingNotification());
            }
            _self.notifyListenersOfSuccess(response);
        });
        ajax.registerFailureListener(function(response)
        {
            ININ.Web.Common.Debug.traceError("PollManager.poll failed: " + response);
            _self.notifyListenersOfFailure(response);
        });
        ININ.Web.Common.Debug.traceNote("Sending new poll request.");
        var participantId = ININ.Web.Chat.WebServices.ParticipantRepository.get_currentParticipantId();
        ajax.sendRequest(null, participantId, true);
        
        ININ.Web.Common.Debug.traceMethodExited("PollManager.poll()");
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/**
 * InteractionParameters class
 * This class contains parameters that will be necessary to create a Interaction.
 */
ININ.Web.Chat.WebServices.InteractionParameters = Class.create(
{
    /**
     * Constructor 
     *  
     * This constructor allows for all parameters to be specified at once.  But, it is 
     * also valid to populate this object gradually and then create the interaction once 
     * it is fully-populated. 
     *  
	 * @param target The name of the queue to which the interaction should be sent. 
	 * @param targetType "Workgroup" or "User", depending on the queue type of the previous param. 
	 * @param customInfo Customers wishing to customize interactions may set this to any data.  It will be set as 
	 *                   the value of the CUSTOM_INFO attribute on the interaction. 
     * @param routingContexts Optional. An instance of ININ.Web.Chat.WebServices.RoutingContexts that specifies how 
     *                               interactions should be routed. 
	 * @param participantName The name of the participant who wants to interact with an agent.
	 * @param participantCredentials The credentials (i.e. password, certificate, etc.) of the participant who wants to interact with an agent
     * @param Javascript Date object
	 */
    initialize:function(target, targetType, customInfo, routingContexts, participantName, participantCredentials, creationDateTime)
    {
        this.set_target(target);
        this.set_targetType(targetType);
        this.set_customInfo(customInfo);
        this.set_routingContexts(routingContexts);
        this.set_participantName(participantName);
        this.set_participantCredentials(participantCredentials);
        this.set_creationDateTime(creationDateTime);
    },

    // methods

    /**
     * Returns the interaction's target. 
     * @return  The name of the queue to which interactions should be sent. 
	 */
    get_target : function()
    {
        return this._target;
    },

    /**
     * Sets the interaction's target. 
	 * @param target The name of the queue to which interactions should be sent. 
	 */
    set_target : function(target)
    {
        this._target = target;
    },

	/**
     * Returns the interaction's target type. 
     * @return  "Workgroup" or "User", depending on the queue type of the target. 
	 */
    get_targetType : function()
    {
        return this._targetType;
    },

    /**
     * Sets the interaction's target type. 
	 * @param targetType "Workgroup" or "User", depending on the queue type of the target. 
	 */
    set_targetType : function(targetType)
    {
        this._targetType = targetType;
    },

	/**
     * Returns the custom info (if any). 
     * @return  Customers wishing to customize may set this to any data.  It will be set as 
	 *          the value of the CUSTOM_INFO attribute on the interaction. 
	 */
    get_customInfo : function()
    {
        return this._customInfo;
    },

	/**
     * Sets the custom info (if any). 
     * @param customInfo A string, or null.
	 */
    set_customInfo : function(customInfo)
    {
        this._customInfo = customInfo;
    },

	/**
     * Returns the routing contexts (if any). 
     * @return An instance of RoutingContexts, or null.
	 */
    get_routingContexts : function()
    {
        return this._routingContexts;
    },

	/**
     * Sets the custom info (if any). 
     * @param routingContexts Customers wishing to customize may set this to an instance of ININ.Web.Chat.WebServices.RoutingContexts.
	 */
    set_routingContexts : function(routingContexts)
    {
        this._routingContexts = routingContexts;
    },

    /**
     * Returns the participant's name. 
     * @return The name of the participant who wants to interact with an agent.
	 */
    get_participantName : function()
    {
        return this._participantName;
    },

    /**
     * Sets the participant's name. 
	 * @param participantName The name of the participant who wants to interact with an agent.
	 */
    set_participantName : function(participantName)
    {
        this._participantName = participantName;
    },

    /**
     * Returns the participant's credentials (if any). 
     * @return The credentials (i.e. password, certificate, etc.) of the participant 
	 */
    get_participantCredentials : function()
    {
        return this._participantCredentials;
    },

    /**
     * Sets the participant's credentials (if any). 
     * @param participantCredentials The credentials (i.e. password, certificate, etc.) of the participant 
	 */
    set_participantCredentials : function(participantCredentials)
    {
        if(!participantCredentials)
        {
            participantCredentials = "";
        }
        this._participantCredentials = participantCredentials;
    },

    /**
     * Gets the creation date/time of this interaction 
     *  
     * @return Javascript Date object 
     */
    get_creationDateTime : function()
    {
        return this._creationDateTime;
    },

    /**
     * Sets the creation date/time of this interaction 
     *  
     * @param creationDateTime Javascript Date object 
     */
    set_creationDateTime : function(creationDateTime)
    {
        this._creationDateTime = creationDateTime;
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/**
 * ChatParameters class
 * This class contains parameters that will be necessary to create a Chat.
 */
ININ.Web.Chat.WebServices.ChatParameters = Class.create(ININ.Web.Chat.WebServices.InteractionParameters,
{
    /**
     * Constructor 
     *  
     * This constructor allows for all parameters to be specified at once.  But, it is 
     * also valid to populate this object gradually and then create the chat once 
     * it is fully-populated. 
     *  
	 * @param target The name of the queue to which chats should be sent. 
	 * @param targetType "Workgroup" or "User", depending on the queue type of the previous param. 
	 * @param customInfo Customers wishing to customize chats may set this to any data.  It will be set as 
	 *                   the value of the CUSTOM_INFO attribute on the interaction. 
     * @param routingContexts Optional. An instance of ININ.Web.Chat.WebServices.RoutingContexts that specifies how 
     *                               chats should be routed. 
	 * @param participantName The name of the participant who wants to chat with an agent.
	 * @param participantCredentials The credentials (i.e. password, certificate, etc.) of the participant trying to log in
     * @param Javascript Date object 
	 */
    initialize:function($super, target, targetType, customInfo, routingContexts, participantName, participantCredentials, creationDateTime)
    {
        $super(target, targetType, customInfo, routingContexts, participantName, participantCredentials, creationDateTime);
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/**
 * Routing Contexts class 
 * This allows the specification of routing information for the interaction. 
 * A "routing context" is a tuple of a "category" and a "context".  This class 
 * represents one or more such tuples. 
 */
ININ.Web.Chat.WebServices.RoutingContexts = Class.create(
{
	/**
     * Constructor 
     * Creates a set of routing contexts, containing one routing context. 
     * Additional ones may be added with the add() method. 
     * @param category The category of what is being specified, i.e. "Product"
     * @param context The specification of something within that category, i.e. "NewAutoInsurancePolicy"
	 */
    initialize: function(category, context)
    {
        ININ.Web.Common.Debug.traceMethodEntered("RoutingContexts.initalize()");

        this._routingContexts = new Hash();
        this.add(category, context);

        ININ.Web.Common.Debug.traceMethodExited("RoutingContexts.initalize()");
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        delete this._routingContexts;
        this._routingContexts = null;
    },

	/**
     * Adds another routing context. 
     * @param category The category of what is being specified, i.e. "Product"
     * @param context The specification of something within that category, i.e. "NewAutoInsurancePolicy"
	 */
    add : function(category, context)
    {
        ININ.Web.Common.Debug.traceMethodEntered("RoutingContexts.add()");
        ININ.Web.Common.Debug.traceNote("category: " + category + ", context: " + context);

        if (typeof category != "string")
        {
            throw ININ.Web.Common.ExceptionFactory.createException("category must be a string.");
        }

        if (typeof context != "string")
        {
            throw ININ.Web.Common.ExceptionFactory.createException("context must be a string.");
        }

        this._routingContexts.set(category, context);

        ININ.Web.Common.Debug.traceMethodExited("RoutingContexts.add()");
    },

    /**
     * Returns true if this routing context is empty. 
     * @return Boolean 
     */
    isEmpty : function()
    {
        return (this._routingContexts == null || this._routingContexts.length <= 0);
    },

    /**
     * Returns the set of categories that have been added. 
     * @return Array of strings 
     */
    categories : function()
    {
        if (this._routingContexts == null)
        {
            return null;
        }
        return this._routingContexts.keys();
    },

    /**
     * Gets the context of a particular category. 
     * @param category string 
     * @return string 
     */
    getContext : function(category)
    {
        if (this._routingContexts == null)
        {
            return null;
        }
        return this._routingContexts.get(category);
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/**
 * CallbackParameters class
 * This class contains parameters that will be necessary to create a Callback.
 */
ININ.Web.Chat.WebServices.CallbackParameters = Class.create(ININ.Web.Chat.WebServices.InteractionParameters,
{
    /**
     * Constructor 
     *  
     * This constructor allows for all parameters to be specified at once.  But, it is 
     * also valid to populate this object gradually and then create the callback once 
     * it is fully-populated. 
     *  
	 * @param target The name of the queue to which callbacks should be sent. 
	 * @param targetType "Workgroup" or "User", depending on the queue type of the previous param. 
	 * @param customInfo Customers wishing to customize callbacks may set this to any data.  It will be set as 
	 *                   the value of the CUSTOM_INFO attribute on the interaction. 
     * @param attributes Optional parameter.  An object containing key/value pairs.  If supplied, all 
     *                   keys and values must be strings.  These fields will be passed to WebProcessorBridge
     *                   and set as attributes on the Callback (but each key will be prefixed with a constant
     *                   to form the actual attribute name). 
     * @param routingContexts Optional. An instance of ININ.Web.Chat.WebServices.RoutingContexts that specifies how 
     *                               Callbacks should be routed. 
	 * @param participantName The name of the participant who wants to callback with an agent.
	 * @param participantCredentials The credentials (i.e. password, certificate, etc.) of the participant trying to log in
     * @param Javascript Date object
	 * @param telephone The telephone number at which the participant wishes to be called
	 * @param subject The topic which the participant wishes to discuss with the agent
	 */
    initialize:function($super, target, targetType, customInfo, attributes, routingContexts,
                        participantName, participantCredentials, creationDateTime, telephone, subject)
    {
        $super(target, targetType, customInfo, routingContexts, participantName, participantCredentials, creationDateTime);
        this.set_telephone(telephone);
        this.set_subject(subject);
        this.set_attributes(attributes);
    },

    // methods

    /**
     * Returns the callback telephone number
	 * @return The telephone number at which the participant wishes to be called
	 */
    get_telephone : function()
    {
        return this._telephone;
    },

    /**
     * Sets the callback's telephone number
	 * @param telephone The telephone number at which the participant wishes to be called
	 */
    set_telephone : function(telephone)
    {
        this._telephone = telephone;
    },
    /**
     * Returns the callback's subject (what the participant wants to talk about). 
	 * @return The topic which the participant wishes to discuss with the agent
	 */
    get_subject : function()
    {
        return this._subject;
    },

    /**
     * Sets the callback's subject. 
	 * @param subject The topic which the participant wishes to discuss with the agent
	 */
    set_subject : function(subject)
    {
        this._subject = subject;
    },

    /**
     * Returns the callback's optional attributes. 
     * @return  The attributes to set on the callback interaction.
	 */
    get_attributes : function()
    {
        return this._attributes;
    },

    /**
     * Sets the callback's optional attributes. 
     * @param attributes An object containing key/value pairs.  If supplied, all 
     *                   keys and values must be strings.  These fields will be passed to WebProcessorBridge
     *                   and set as attributes on the Callback (but each key will be prefixed with a constant
     *                   to form the actual attribute name). 
	 */
    set_attributes : function(attributes)
    {
        this._attributes = attributes;
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.TypingIndicator");

/** Default duration of the typing indicator, in milliseconds */
ININ.Web.Chat.WebServices.TypingIndicator.DEFAULT_DURATION_MS = 3000;

ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 *  Implements the Typing Indicator functionality.
 *  This class should be viewed as abstract, and its subclasses each as a singleton.
 *  When a user starts typing (i.e. presses a key when their typing indicator status is false), will set the
 *  indicator to true. After that, if a certain amount of time passes and the user doen't hit another key,
 *  will set the indicator to false.
 */
ININ.Web.Chat.WebServices.TypingIndicatorBase = Class.create(ININ.Web.Chat.WebServices.ListenableBase,
{
	/**
	 * Constructor
	 */
    initialize: function($super)
    {
        ININ.Web.Common.Debug.traceMethodEntered("TypingIndicatorBase.initialize");
        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IFailoverNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IResumedPollingNotificationObserver);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerFailoverNotificationObserver(this);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerResumedPollingNotificationObserver(this);

        this.reset();
        ININ.Web.Common.Debug.traceMethodExited("TypingIndicatorBase.initialize");
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        if(this._timer)
        {
            this._timer.destroy();
            delete this._timer;
            this._timer = null;
        }

        ININ.Web.Chat.WebServices.ListenableBase.prototype.destroy.call(this);
    },

    // public methods

	/**
	 * Setter for the chat manager property.
	 * 
	 * @param chatManager An instance of (a subclass of abstract class) ChatManagerBase
	 */
    set_chatManager : function(chatManager)
    {
        ININ.Web.Common.Debug.traceMethodEntered("TypingIndicatorBase.set_chatManager()");
        this._chatManager = chatManager;
        ININ.Web.Common.Debug.traceMethodExited("TypingIndicatorBase.set_chatManager()");
    },

	/**
	 * Change the amount of time that must pass after a keystroke before a user is considered to no longer be typing.
	 * 
	 * @param duration New time limit, in milliseconds.
	 */
    set_duration : function(duration)
    {
        ININ.Web.Common.Debug.traceMethodEntered("TypingIndicatorBase.set_duration()");
        if (this._timer)
        {
            if(this._timer.get_duration() != duration)
            {
				this._timer.restart(duration);
            }
        }
        ININ.Web.Common.Debug.traceMethodExited("TypingIndicatorBase.set_duration()");
    },

	/**
	 * Returns whether the web user is typing. 
	 *  
	 * @return True if the web user is typing, false otherwise. 
	 */
    isTyping : function()
    {
        return this._typingState;
    },
    
    /**
     *  If typing indicator is false, calls <code>set()</code>
     *  If typing indicator is true, will reset the timer to the full time interval.
     */
    keyPressed : function()
    {
        if (!this.isTyping())
        {
            this.set(true);
        }
        else
        {
            this._timer.restart();
        }
    },

    /**
     *  Sets this object's typing state to true or false depending on the arg that's passed in, and sends
     *  an AJAX request to set typing state on the WebProcessor to match.
     *  Called by <code>keyPressed()</code>, with arg=true when user presses a key.
     *  Called when the timer times out with arg=false.
     *  Note: If arg=true, then in <code>onAJAXSuccess()</code>, <code>timer</code> will be
     *  started to set typingState back to false after a certain period of time.
	 *  This should be viewed as a private method.
	 *  
	 *  @param true if the web user is typing, false otherwise
     */
    set : function(typingState)
    {
        if(this._running)
        {
            this._typingState = typingState;
            var ajax = this._chatManager.createAjaxManager(ININ.Web.Chat.WebServices.CapabilityRepository.get_setTypingStateCapability());
            var _self = this;
            ajax.registerSuccessListener(function(response)
            {
                ININ.Web.Common.Debug.traceNote("TypingIndicator.set succeeded: " + response);
                _self.onAJAXSuccess(response, typingState);
            });
            ajax.registerFailureListener(function(response)
            {
                ININ.Web.Common.Debug.traceError("TypingIndicator.set failed: " + response);
                _self._typingState = false; // So a failed AJAX request doesn't result in it getting stuck at "true", thus preventing future indicators from being sent.
                _self.notifyListenersOfFailure(response);
            });
            var participantId = ININ.Web.Chat.WebServices.ParticipantRepository.get_currentParticipantId();
            ajax.sendRequest(this.serializeDataToPost(), participantId, true);
        }
    },

    /**
     * This method is called when the AJAX message succeeded.  It does the following:
      * 1) If the typing state was just set to true, this sets a timer to set it back to
     * false if no more typing occurs for a while.
     * 2) Notifies listeners.
	 * This method should not be called directly by clients of the API. 
	 *  
	 * @param response The IC server's response to the AJAX request.
	 * @param typingState True or false, whichever the typing state was set to by the AJAX request. 
     */
    onAJAXSuccess : function(response, typingState)
    {
        ININ.Web.Common.Debug.traceMethodEntered("TypingIndicatorBase.onAJAXSuccess()");
        
        // Could have used this.typingState, and made this method not take any arguments, but
        // that could open the door to thread-safety issues.
        if (typingState)
        {
            this._timer.start();  // Set timer to clear typing state afer a while
        }
        this.notifyListenersOfSuccess(response);

        ININ.Web.Common.Debug.traceMethodExited("TypingIndicatorBase.onAJAXSuccess()");
    },
    
	/**
	 * Make this object active.  If stopped, calls to set() will have no effect.
	 */
    start : function()
    {
        this._running = true;
    },
    
	/**
	 * Make this object inactive.  If stopped, calls to set() will have no effect. 
	 * Note that this will restart the timer so that it will run one last time.
	 */
    stop : function()
    {
        this._running = false;
        this._timer.restart(); // Is this really necessary? If user starts typing and this is called, do we care to receive the stopped typing notification?
    },
    
	/**
	 * Resets the object to its default "off" state.
	 */
    reset : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("TypingIndicatorBase.reset");
        
        ININ.Web.Chat.WebServices.ListenableBase.prototype.reset.call(this);

        this._running = false;
        this._typingState = false;

        if(this._timer)
        {
            this._timer.destroy();
            delete this._timer;
            this._timer = null;
        }

        // A timer to use to know when to set the typing indicator back to false
        ININ.Web.Common.Debug.traceNote("About to create a timer for typing indicator...but not going to start it yet");
        this._timer = new ININ.Web.Chat.WebServices.Timer(ININ.Web.Chat.WebServices.TypingIndicator.DEFAULT_DURATION_MS);
        ININ.Web.Common.Debug.traceNote("Created timer.");

        var _self = this;
        this._timer.registerSuccessListener(function() { _self.set(false); });

        ININ.Web.Common.Debug.traceMethodExited("TypingIndicatorBase.reset");
    },

	/**
	 * Listener for notification that a failover has occurred.  Stops polling, since the chat is dead.
	 * 
	 * @param notification IFailoverNotification
	 */
    processFailoverNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("TypingIndicatorBase.processFailoverNotification()");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IFailoverNotification);

        this.stop();

        ININ.Web.Common.Debug.traceMethodExited("TypingIndicatorBase.processFailoverNotification()");
    },

	/**
	 * Event listener for reconnection of the chat 
	 *  
	 * @param notification Something that implements ININ.Web.Chat.WebServices.Interfaces.IResumedPollingNotification
	 */
    processResumedPollingNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("TypingIndicatorBase.processResumedPollingNotification()");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IResumedPollingNotification);

        this.start();

        ININ.Web.Common.Debug.traceMethodExited("TypingIndicatorBase.processResumedPollingNotification()");
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * This class is the main brains of the chat, but is abstract - use derived class instead
 */
ININ.Web.Chat.WebServices.ChatManagerBase = Class.create(ININ.Web.Chat.WebServices.InteractionManagerBase,
{
	/** 
	 * The amount of time that must elapse after a keystroke before the web user is considered to be no longer typing. 
	 * Specified in milliseconds.
	 */
    typingIndicatorDuration: ININ.Web.Chat.WebServices.TypingIndicator.DEFAULT_DURATION_MS,

	/**
	 * Constructor
	 * 
	 * @param genericResponseBuilder An object to build Response objects (i.e. objects which implement ResponseBase or its subclasses) from the IC server's replies to AJAX requests.
	 * @param capabilityRepository An object to keep track of which Capabilities are enabled or disabled, and provide getter methods for the various Capabilities. 
	 * @param typingIndicator An object to track whether the web user is typing or not
	 * @param failoverHandler In charge of connecting to the other server if the current one goes down for some reason. 
	 */
    initialize : function($super, genericResponseBuilder, capabilityRepository, typingIndicator, failoverHandler)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ChatManagerBase.initialize()");

        var numArgs = 5;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ChatManagerBase constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

//        ININ.Web.Common.ParameterValidation.validate(arguments, [ {}, {"required": true} ]);

        $super(genericResponseBuilder, capabilityRepository, failoverHandler);
        
        this._typingIndicator = typingIndicator;
        this._failoverHandler = failoverHandler;
		this._isReconnecting = false;
        this._partyManager = null;

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IChatCompletionNotification);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantActiveNotificationObserver);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerChatCompletionNotificationObserver(this);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerParticipantActiveNotificationObserver(this);

        ININ.Web.Common.Debug.traceMethodExited("ChatManagerBase.initialize()");
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("ChatManagerBase.destroy()");

        this._typingIndicator = null;

        ININ.Web.Common.Debug.traceMethodExited("ChatManagerBase.destroy()");
    },

    // public methods

	/**
     * Sets the party manager, which can be used to get agent's photos.
	 * 
     * @param partyManager An instance of a subclass of ININ.Web.Chat.WebServices.PartyManagerBase
	 */
    set_partyManager : function(partyManager)
    {
        this._partyManager = partyManager;
    },

	/**
	 * Start a chat.  This method does not return anything, but will cause 
     * either a ChatCreationNotification or a ChatCreationFailureNotification to be 
     * sent to observers of these Notification types. 
	 * 
     * @param parameters An instance of ChatParameters
	 */
    login : function(parameters)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ChatManagerBase.login()");

        var anonymousOk = ININ.Web.Chat.WebServices.CapabilityRepository.isChatAnonymousAuthenticationCapabilityEnabled();
        if (!anonymousOk && !(parameters.get_participantName() && parameters.get_participantCredentials())) {
            ININ.Web.Chat.WebServices.NotificationRegistry.processChatCreationFailureNotification(ININ.Web.Chat.WebServices.NotificationFactory.createChatCreationFailureNotification(new ININ.Web.Chat.WebServices.Error("error.websvc.unsupportedOperation")));
        } else
        {
            // create the start chat capability and start the chat
            var ajax = this.createAjaxManager(this._capabilityRepository.get_startChatCapability());
            var _self = this;
            ajax.registerSuccessListener(function(response)
            {
                ININ.Web.Common.Debug.traceNote("ChatManagerBase.login() succeeded: " + response);
                ININ.Web.Chat.WebServices.Servers.OriginalUriFragment = ININ.Web.Chat.WebServices.Servers.CurrentUriFragment;
                ININ.Web.Chat.WebServices.NotificationRegistry.processChatCreationNotification(ININ.Web.Chat.WebServices.NotificationFactory.createChatCreationNotification(response.chatID, response.currentParticipantID, response.dateFormat, response.timeFormat));
                _self.processResponse(response);
                _self.onAJAXSuccess(response);
            });
            ajax.registerFailureListener(function(response)
            {
                ININ.Web.Common.Debug.traceError("ChatManagerBase.login() failed: " + response);
                _self.onAJAXFailure(response);
                ININ.Web.Chat.WebServices.NotificationRegistry.processChatCreationFailureNotification(ININ.Web.Chat.WebServices.NotificationFactory.createChatCreationFailureNotification(response.get_statusReason()));
            });

            // Necessary kludge for an SU3 ES. Will be resolved in a better way in the normal development timeline.
            ININ.Web.Chat.WebServices.NotificationRegistry.processNewParticipantNotification(ININ.Web.Chat.WebServices.NotificationFactory.createNewParticipantNotification(ININ.Web.Chat.WebServices.ParticipantRepository.SYSTEM_SENDER_ID, "IC", ININ.Web.Chat.WebServices.InteractionTypes.CHAT, new Date(), false));


        ajax.sendRequest(this.serializeLoginPostData(parameters), null, true);
        }

        ININ.Web.Common.Debug.traceMethodExited("ChatManagerBase.login()");
    },

	/**
	 * The UI should call this method when the user presses a key, so that a typing indicator may be sent to the IC server.
	 */
    keyPressed: function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("ChatManagerBase.keyPressed()");
        if (this._typingIndicator) {
            this._typingIndicator.keyPressed();
        }
        ININ.Web.Common.Debug.traceMethodExited("ChatManagerBase.keyPressed()");
    },

	/**
	 * Sends a message during the course of a chat.
	 * 
	 * @param str The message that the web user typed
	 * @param isContentHtml True if the message is in HTML format, false if it is in plain text format.
	 * @param callback This function will be called when a response is received from the IC server.  This function should take 2 arguments. The first argument will be a boolean indicating whether the send attempt was successful.  The second will be the failure reason (not applicable if the send attempt succeeded). 
	 */
    sendMessage: function(str, isContentHtml, callback)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ChatManagerBase.sendMessage()");
        var ajax = this.createAjaxManager(this._capabilityRepository.get_sendMessageCapability());
        var _self = this;
        ajax.registerSuccessListener(function(response)
        {
            ININ.Web.Common.Debug.traceNote("ChatManagerBase.sendMessage() succeeded: " + response);
            _self.processResponse(response);
            _self.onAJAXSuccess(response);
            callback(true, response);
        });
        ajax.registerFailureListener(function(response)
        {
            ININ.Web.Common.Debug.traceError("ChatManagerBase.sendMessage() failed: " + response);
            _self.onAJAXFailure(response);
            callback(false, response);
        });
        var participantId = ININ.Web.Chat.WebServices.ParticipantRepository.get_currentParticipantId();
        ajax.sendRequest(this.serializeMessageToSend(str, isContentHtml), participantId, true);
        ININ.Web.Common.Debug.traceMethodExited("ChatManagerBase.sendMessage()");
    },

	/**
	 * Ends the chat.  This method does not return anything, but will cause 
     * either a ChatCompletionNotification or a ChatCompletionFailureNotification to be 
     * sent to observers of these Notification types. 
	 */
    exitChat: function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("ChatManagerBase.exitChat()");
        var ajax = this.createAjaxManager(this._capabilityRepository.get_exitCapability());
        var _self = this;
        ajax.registerSuccessListener(function(response)
        {
            ININ.Web.Common.Debug.traceNote("ChatManagerBase.exitChat() succeeded: " + response);
            _self.processResponse(response);
            _self.onAJAXSuccess(response);
            ININ.Web.Chat.WebServices.NotificationRegistry.processChatCompletionNotification(ININ.Web.Chat.WebServices.NotificationFactory.createChatCompletionNotification());
            ININ.Web.Chat.WebServices.NotificationRegistry.process(ININ.Web.Chat.WebServices.NotificationFactory.createCurrentParticipantIdChangedNotification(null, new Date()));
        });
        ajax.registerFailureListener(function(response)
        {
            ININ.Web.Common.Debug.traceError("ChatManagerBase.exitChat() failed: " + response);
            response.wasExitRequest = true;
            _self.onAJAXFailure(response);
            ININ.Web.Chat.WebServices.NotificationRegistry.processChatCompletionFailureNotification(ININ.Web.Chat.WebServices.NotificationFactory.createChatCompletionFailureNotification(response.get_statusReason()));
        });
        var participantId = ININ.Web.Chat.WebServices.ParticipantRepository.get_currentParticipantId();
        ajax.sendRequest(null, participantId, false);
        ININ.Web.Common.Debug.traceMethodExited("ChatManagerBase.exitChat()");
    },

	/**
	 * Ends the chat.  No confirmation will be given to the caller.
	 */
    exitChatAsync: function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("ChatManagerBase.exitChatAsync()");
        var ajax = this.createAjaxManager(this._capabilityRepository.get_exitCapability());
        var participantId = ININ.Web.Chat.WebServices.ParticipantRepository.get_currentParticipantId();
        ajax.sendRequest(null, participantId, true);
        ININ.Web.Common.Debug.traceMethodExited("ChatManagerBase.exitChatAsync()");
    },

	/**
	 * Reconnect to a chat for which connectivity was lost.
	 * 
	 * @param callback This function will be called when a response is received from the IC server.  This function should take 2 arguments. The first argument will be a boolean indicating whether the send attempt was successful.  The second will be the ChatResponse representing the response that was received from IC.
	 */
    reconnect : function(callback)
    {
        //var seqNum = ININ.Web.Chat.WebServices.ReceivedMessageRepository.get_lastMessageSequenceNumber();
        var ajax = this.createAjaxManager(this._capabilityRepository.get_reconnectChatCapability());
        var _self = this;
		
		if(this._isReconnecting == true)
		{
			return;
		}
		
		this._isReconnecting = true;
		
        ajax.registerSuccessListener(function(response)
        {
		
            ININ.Web.Common.Debug.traceNote("ChatManagerBase.reconnect() succeeded: " + response);
			ININ.Web.Chat.WebServices.NotificationRegistry.process(ININ.Web.Chat.WebServices.NotificationFactory.createChatReconnectUINotification());
			ININ.Web.Chat.WebServices.EventSequenceManager.reset();		
			//var previousParticipants = ININ.Web.Chat.WebServices.ParticipantRepository.get_participants();
			ININ.Web.Chat.WebServices.ParticipantRepository.reset();	
			
			ININ.Web.Chat.WebServices.NotificationRegistry.process(ININ.Web.Chat.WebServices.NotificationFactory.createCurrentParticipantIdChangedNotification(response.currentParticipantID, new Date()));

			_self._isReconnecting = false;
            _self.processResponse(response);
            _self.onAJAXSuccess(response);
            callback(true, response);
        });
        ajax.registerFailureListener(function(response)
        {
            ININ.Web.Common.Debug.traceError("ChatManagerBase.reconnect() failed: " + response);
            callback(false, response);
			_self._isReconnecting = false;
        });

        ajax.sendRequest(this.serializeReconnectPostData(this.chatID), false, true);
    },

    /** 
     * Handle a successful response to a request to start a chat.
     * This involves creating the typing indicator and the poll manager, and
     * then using <code>onAJAXSuccess()</code> to handle the response.
	 * This method should not be called directly by clients of the API. 
	 *  
	 * @param currentParticipantID The ID of the current participant (i.e. the person whose web browser is running this code) 
     */
    startChat: function(currentChatID, currentParticipantID)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ChatManagerBase.startChat()");
        var _self = this;
		this.chatID = currentChatID;

        try
        {
            // configure
            if(currentParticipantID)
            {
                ININ.Web.Chat.WebServices.NotificationRegistry.process(ININ.Web.Chat.WebServices.NotificationFactory.createCurrentParticipantIdChangedNotification(currentParticipantID, new Date()));
            }
            
            // start the event processor
            ININ.Web.Chat.WebServices.EventProcessor.start();
        
            // configure the failover handler
            this._failoverHandler.set_chatManager(this);

            // configure the poll manager
            ININ.Web.Chat.WebServices.PollManager.set_chatManager(this);
            ININ.Web.Chat.WebServices.PollManager.registerSuccessListener(function(response)
            {
                ININ.Web.Common.Debug.traceNote("PollManager.SuccessListener: " + response);
                _self.processResponse(response);
                _self.onAJAXSuccess(response);
            });
            ININ.Web.Chat.WebServices.PollManager.registerFailureListener(function(response)
            {
                ININ.Web.Common.Debug.traceError("PollManager.FailureListener: " + response);
                _self.onAJAXFailure(response);
            });
            ININ.Web.Chat.WebServices.PollManager.start();

            // configure the typing indicator
            this._typingIndicator.set_chatManager(this);
            this._typingIndicator.set_duration(this.typingIndicatorDuration);
            this._typingIndicator.registerSuccessListener(function(response)
            {
                ININ.Web.Common.Debug.traceNote("TypingIndicator.SuccessListener: " + response);
                _self.processResponse(response);
                _self.onAJAXSuccess(response);
            });
            this._typingIndicator.registerFailureListener(function(response)
            {
                ININ.Web.Common.Debug.traceError("TypingIndicator.FailureListener: " + response);
                _self.onAJAXFailure(response);
            });
            this._typingIndicator.start();
        }
        catch(e)
        {
            ININ.Web.Common.Debug.traceError("Caught unhandled exception:\n" + e);
            ININ.Web.Common.Debug.alert("Caught unhandled exception:\n" + e);
            ININ.Web.Chat.WebServices.ProblemReporter.sendProblemReport(e, "ChatManagerBase.startChat()");
        }
        ININ.Web.Common.Debug.traceMethodExited("ChatManagerBase.startChat()");
    },
    
	/**
	 * This method will be called when a chat is exited successfully.
	 *  
	 * @see exitChat() 
     * @param chatCompletionNotification Notification object. Contents ignored.
	 */
    processChatCompletionNotification : function(chatCompletionNotification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ChatManagerBase.processChatCompletionNotification()");

        this._tearDownChat();

        ININ.Web.Common.Debug.traceMethodExited("ChatManagerBase.processChatCompletionNotification()");
    },

    /**
	 * Set chat's state data, based on response's state data 
	 *  
	 * @param response An instance of a subclass of ResponseBase, which represents the response to an AJAX request received from the IC server
     */
    processResponse : function(response)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ChatManagerBase.processResponse()");

        try
        {
            ININ.Web.Common.Interface.ensureImplements(response, ININ.Web.Chat.WebServices.Interfaces.IChatResponse);

            if (response.get_pollWaitSuggestion())
            {
                ININ.Web.Chat.WebServices.ChatPropertyUpdateRegistry.processPollWaitSuggestionUpdate(response.get_pollWaitSuggestion());
            }

            var events = response.get_events();
            if(events)
            {
                for(var i = 0; i < events.length; ++i)
                {
                    //ININ.Web.Chat.WebServices.EventSequenceManager.addSequenceableObject(events[i]); // temporarily removed and added the following line instead.
                    ININ.Web.Chat.WebServices.EventProcessor.process(events[i], false);
                }
            }

            var cfgVer = response.get_serverConfigVersion();
            if (cfgVer != ININ.Web.Chat.WebServices.Json.ServerConfigurationProcessor.get_lastServerConfigurationVersion())
            {
                ININ.Web.Chat.WebServices.Json.ServerConfigurationManager.getServerConfiguration();
            }
        } catch (e)
        {
            ININ.Web.Chat.WebServices.ProblemReporter.sendProblemReport(e, "ChatManagerBase.processResponse()");
        }

        ININ.Web.Common.Debug.traceMethodExited("ChatManagerBase.processResponse()");
    },

    /** 
	 * Called when a participant has joined the chat.  Queries the agent's photo. 
	 *  
	 * @param notification Something that implements IParticipantActiveNotification
     */
    processParticipantActiveNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantActiveNotification);
        
        if (this._partyManager && ININ.Web.Chat.WebServices.CapabilityRepository.isPartyInfoCapabilityEnabled())
        {
            var currentParticipantId = ININ.Web.Chat.WebServices.ParticipantRepository.get_currentParticipantId();
            var otherPartyId = notification.get_participantId();

            // Don't query the photo of the web visitor - there won't be one.
            if (otherPartyId != currentParticipantId)
            {
                var otherParty = ININ.Web.Chat.WebServices.ParticipantRepository.get_participant(otherPartyId);

                // If otherParty's photo is not known, request it
                if (null == otherParty || null == otherParty.get_photo())
                {
                    this._partyManager.getPartyInfo(currentParticipantId, otherPartyId);
                }
            }
        }
    },

    _tearDownChat : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("ChatManagerBase._tearDownChat()");
        // immediately stop the sub systems that are running
        ININ.Web.Chat.WebServices.EventProcessor.stop();
        ININ.Web.Chat.WebServices.PollManager.stop();
        this._typingIndicator.stop();

        // Remove chat participants, but leave callback participants intact
        ININ.Web.Chat.WebServices.ParticipantRepository.removeAllParticipantsForInteractionType(ININ.Web.Chat.WebServices.InteractionTypes.CHAT);

        // reset the subsystems back to original state
        ININ.Web.Chat.WebServices.PollManager.reset();
        ININ.Web.Chat.WebServices.EventSequenceManager.reset();
        ININ.Web.Chat.WebServices.ReceivedMessageRepository.reset();
        ININ.Web.Chat.WebServices.ReceivedUrlRepository.reset();
        this._typingIndicator.reset();
        ININ.Web.Chat.WebServices.ProblemReporter.reset();
        ININ.Web.Chat.WebServices.Json.ServerConfigurationProcessor.resetServerConfigurationVersion();

        ININ.Web.Common.Debug.traceMethodExited("ChatManagerBase._tearDownChat()");
    },

    _handleInvalidSession : function(response)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ChatManagerBase._handleInvalidSession()");
        if (response.wasExitRequest)
        {
            ININ.Web.Chat.WebServices.NotificationRegistry.process(ININ.Web.Chat.WebServices.NotificationFactory.createChatCompletionNotification());
        } else
        {
            this._tearDownChat();
        }
        ININ.Web.Common.Debug.traceMethodExited("ChatManagerBase._handleInvalidSession()");
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * This class handles reporting problems back to IC
 */
ININ.Web.Chat.WebServices._Internal._ProblemReporterBase = Class.create(ININ.Web.Common.InterfaceImplementation,
{
    MAX_RECORDS_TO_KEEP: 8,

	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ProblemReporterBase.initialize()");

        var numArgs = 1;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ProblemReporterBase constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IFailoverNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IResumedPollingNotificationObserver);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerFailoverNotificationObserver(this);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerResumedPollingNotificationObserver(this);

        this._failedRequestHistory = new Array();
        this._timedOutRequestHistory = new Array();
        this._connectivityFailureHistory = new Array();
        this._regEx = null;

        ININ.Web.Common.Debug.traceMethodExited("ProblemReporterBase.initialize()");
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("ProblemReporterBase.destroy()");

        this._failedRequestHistory = null;
        this._timedOutRequestHistory = null;
        this._connectivityFailureHistory = null;
        this._regEx = null;

        ININ.Web.Common.Debug.traceMethodExited("ProblemReporterBase.destroy()");
    },

	/**
	 * Sets to default state
	 */
    reset : function()
    {
        this._failedRequestHistory = new Array();
        this._timedOutRequestHistory = new Array();
        this._connectivityFailureHistory = new Array();
        this._regEx = null;
    },

    // public methods

    /** 
     * Send a "problem report" to WebProcessorBridge, since browser-side tracing will be difficult to obtain in a production scenario.
     */
    sendProblemReport : function(reason, attemptedWork, giveResetLink)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ChatManagerBase.sendProblemReport()");
        var participantId = ININ.Web.Chat.WebServices.ParticipantRepository.get_currentParticipantId();

        if (ININ.Web.Chat.WebServices.CapabilityRepository.isProblemReportCapabilityEnabled() && (null != participantId))
        {
            var problemReport = this._buildProblemReport(reason, attemptedWork);
            var problemReportStr = this.serializeProblemReport(problemReport);

            if ((null == this.get_regEx()) || (new RegExp(this.get_regEx()).test(problemReportStr)))
            {
                ININ.Web.Common.Debug.traceWarning("Sending problem report.");
                var ajax = this.createAjaxManager();
                ajax.sendRequest(problemReportStr, participantId, true);
            } else
            {
                ININ.Web.Common.Debug.traceNote("Problem report did not match regular expression.");
            }
        } else
        {
            ININ.Web.Common.Debug.traceNote("Problem report capability is not enabled, or participant ID has not been set yet.");
        }
      
        /* TODO: Give the user a link to refresh the page
        if (giveResetLink)
        {
            ININ.Web.Chat.WebServices.NotificationRegistry.processResetUINotification(ININ.Web.Chat.WebServices.NotificationFactory.createResetUINotification(ININ.Web.Chat.WebServices.Servers.CurrentUriFragment));
        } 
        */ 

        ININ.Web.Common.Debug.traceMethodExited("ChatManagerBase.sendProblemReport()");
    },

    /** 
     * Records the failed request (by creating an object representing the failure
     * and adding it to a collection) so that this may be attached to the
     * next problem report to be send. 
     *  
     * @param response A subclass of ResponseBase representing the message that failed to be send properly
     */
    recordFailedRequest : function(response)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ProblemReporterBase.recordFailedRequest()");
        try
        {
            var url = response.xmlHttpRequest.request.url;
            if (url.indexOf(ININ.Web.Chat.WebServices.CapabilityUrls.Common.PROBLEMREPORT) == -1)
            {
                var sendTimestamp = response.xmlHttpRequest.sendTimestamp;
                var duration = new Date() - sendTimestamp;
                var status = response.xmlHttpRequest.transport.status;
                var failedRequestInfo = { "status": status,
                                          "url": url,
                                          "sendTimestamp": sendTimestamp,
                                          "duration": duration
                                        };
                this._failedRequestHistory.push(failedRequestInfo);
                ININ.Web.Common.Debug.traceWarning("Failed request: " + failedRequestInfo);

                while (this._failedRequestHistory.length > this.MAX_RECORDS_TO_KEEP)
                {
                    this._failedRequestHistory.shift();
                }

                this.sendProblemReport("Failed request", response.xmlHttpRequest.request.url);
            }
        } catch (e)
        {
            ININ.Web.Common.Debug.traceError("Unable to record failed request due to exception: " + e);
        }
        ININ.Web.Common.Debug.traceMethodExited("ProblemReporterBase.recordFailedRequest()");
    },

    /** 
     * Records that an AJAX request has timed out (by creating an object representing the failure
     * and adding it to a collection) so that this may be attached to the next problem 
     * report to send. 
     *  
     * @param ajaxRequest An instance of AJAXRequest. 
     */
    recordTimedOutRequest : function(ajaxRequest)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ProblemReporterBase.recordTimedOutRequest()");
        try
        {
            var url = ajaxRequest.request.url;
            if (url.indexOf(ININ.Web.Chat.WebServices.CapabilityUrls.Common.PROBLEMREPORT) == -1)
            {
                var sendTimestamp = ajaxRequest.sendTimestamp;
                var duration = new Date() - sendTimestamp;
                var status = ajaxRequest.transport.status;
                var timedOutRequestInfo = { "status": status,
                                            "url": url,
                                            "sendTimestamp": sendTimestamp,
                                            "duration": duration
                                          };
                this._timedOutRequestHistory.push(timedOutRequestInfo);
                ININ.Web.Common.Debug.traceWarning("Timed-out request: " + timedOutRequestInfo);

                while (this._timedOutRequestHistory.length > this.MAX_RECORDS_TO_KEEP)
                {
                    this._timedOutRequestHistory.shift();
                }
            }
        } catch (e)
        {
            ININ.Web.Common.Debug.traceError("Unable to record timed out request due to exception: " + e);
        }
        ININ.Web.Common.Debug.traceMethodExited("ProblemReporterBase.recordTimedOutRequest()");
    },

	/**
     * Listener for notification that a failover has occurred. Records the failure, to be included in the next problem report.
	 * 
	 * @param notification IFailoverNotification
	 */
    processFailoverNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ProblemReporterBase.processFailoverNotification()");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IFailoverNotification);
        ININ.Web.Common.Debug.traceWarning("ProblemReporterBase received failover notification.");
        var timestamp = new Date();
        var connectivityFailureInfo = {
                                        "activity": "failover",
                                        "timestamp": timestamp
                                      };
        this._connectivityFailureHistory.push(connectivityFailureInfo);

        while (this._connectivityFailureHistory.length > this.MAX_RECORDS_TO_KEEP)
        {
            this._connectivityFailureHistory.shift();
        }
            
        ININ.Web.Common.Debug.traceMethodExited("ProblemReporterBase.processFailoverNotification()");
    },

	/**
     * Listener for notification that polling has resumed after a previous failover. 
     * Records the information to be included in the next problem report.
	 * 
	 * @param notification IResumedPollingNotification
	 */
    processResumedPollingNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ProblemReporterBase.processResumedPollingNotification()");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IResumedPollingNotification);
        ININ.Web.Common.Debug.traceWarning("ProblemReporterBase received resumed polling notification.");
        var timestamp = new Date();
        var connectivityFailureInfo = {
                                        "activity": "resumedPolling",
                                        "timestamp": timestamp
                                      };
        this._connectivityFailureHistory.push(connectivityFailureInfo);

        while (this._connectivityFailureHistory.length > this.MAX_RECORDS_TO_KEEP)
        {
            this._connectivityFailureHistory.shift();
        }

        this.sendProblemReport("Resumed polling", "Sending accumulated problem report info that may not have been transmitted before.");
            
        ININ.Web.Common.Debug.traceMethodExited("ProblemReporterBase.processResumedPollingNotification()");
    },

    /**
     * Gets the regular expression which problem reports must match if they are to be sent. 
     * If this is null, AND if the "sendProblemReport" capability is enabled, problem reports will be sent if problems occur. 
     * If this is non-null, AND if the "sendProblemReport" capability is enabled, problem reports will be sent if problems occur provided 
     * that the problem report that is generated matches this regular expression. 
     * If the "sendProblemReport" capability is disabled, then there is no point in calling get_problemReportRegEx() as its return 
     * value should be ignored. 
     */
    get_regEx : function()
    {
        return this._regEx;
    },

    /**
     * Specifies a regular expression which problem reports must match if they are to be sent. 
     * If this is not set, or set to null, AND if the "sendProblemReport" capability is enabled, problem reports will be sent if problems occur. 
     * If this is set, AND if the "sendProblemReport" capability is enabled, problem reports will be sent if problems occur provided 
     * that the problem report that is generated matches this regular expression. 
     * If the "sendProblemReport" capability is disabled, then there is likely not much point in calling this method.  The value passed will 
     * be stored, but problem reports will not be sent. 
     */
    set_regEx : function(regEx)
    {
        this._regEx = regEx;
    },

    // private methods

    _buildProblemReport : function(reason, attemptedWork)
    {
        var problemReportObject =
        {
            "version": 1,
            "attemptedWork": attemptedWork,
            "userAgent": navigator.userAgent,
            "failedRequestHistory": this._failedRequestHistory,
            "timedOutRequestHistory": this._timedOutRequestHistory,
            "connectivityFailureHistory": this._connectivityFailureHistory,
            "exceptions": reason
        };

        if (ININ_Web_Chat_Bootloader_Fileversion)
        {
            problemReportObject.bootloaderFileVersion = ININ_Web_Chat_Bootloader_Fileversion;
        }

        if (ININ_Web_Chat_WebServices_Fileversion)
        {
            problemReportObject.webServicesFileVersion = ININ_Web_Chat_WebServices_Fileversion;
        }

        // This will not be defined if the customer created a custom UI
        if (ININ_Web_Chat_UI_Fileversion)
        {
            problemReportObject.uiFileVersion = ININ_Web_Chat_UI_Fileversion;
        }

        return problemReportObject;
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * This class is the main brains of callbacks, but is abstract - use derived class instead
 */
ININ.Web.Chat.WebServices.CallbackManagerBase = Class.create(ININ.Web.Chat.WebServices.InteractionManagerBase,
{
	/**
	 * Constructor
	 * 
	 * @param genericResponseBuilder An object to build Response objects (i.e. objects which implement ResponseBase or its subclasses) from the IC server's replies to AJAX requests.
	 * @param capabilityRepository An object to keep track of which Capabilities are enabled or disabled, and provide getter methods for the various Capabilities. 
	 * @param failoverHandler In charge of connecting to the other server if the current one goes down for some reason. 
	 */
    initialize : function($super, genericResponseBuilder, capabilityRepository, failoverHandler)
    {
        ININ.Web.Common.Debug.traceMethodEntered("CallbackManagerBase.initialize()");

        var numArgs = 4;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("CallbackManagerBase constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

//        ININ.Web.Common.ParameterValidation.validate(arguments, [ {}, {"required": true} ]);

        $super(genericResponseBuilder, capabilityRepository, failoverHandler);

        this._failoverHandler = failoverHandler;
        this._partyManager = null;
        this._callbackID = null;
        
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackStatusNotificationObserver);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerCallbackStatusNotificationObserver(this);

        ININ.Web.Common.Debug.traceMethodExited("CallbackManagerBase.initialize()");
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("CallbackManagerBase.destroy()");

        ININ.Web.Common.Debug.traceMethodExited("CallbackManagerBase.destroy()");
    },

    // public methods

    /**
     * Sets the party manager, which can be used to get agent's photos.
     * 
     * @param partyManager An instance of a subclass of ININ.Web.Chat.WebServices.PartyManagerBase
     */
    set_partyManager : function(partyManager)
    {
        this._partyManager = partyManager;
    },

	/**
     * Create a callback interaction.  This method does not return anything, but will cause 
     * either a CallbackCreationNotification or a CallbackCreationFailureNotification to be 
     * sent to observers of these Notification types. 
	 * 
     * @param parameters An instance of CallbackParameters
	 */
    createCallback : function(parameters)
    {
        ININ.Web.Common.Debug.traceMethodEntered("CallbackManagerBase.createCallback()");

        var anonymousOk = ININ.Web.Chat.WebServices.CapabilityRepository.isCallbackAnonymousAuthenticationCapabilityEnabled();
        if (!anonymousOk && !(parameters.get_participantName() && parameters.get_participantCredentials())) {
            ININ.Web.Chat.WebServices.NotificationRegistry.processCallbackCreationFailureNotification(ININ.Web.Chat.WebServices.NotificationFactory.createCallbackCreationFailureNotification(new ININ.Web.Chat.WebServices.Error("error.websvc.unsupportedOperation")));
        } else
        {
            // configure the failover handler
            this._failoverHandler.set_callbackManager(this);

            // create the create callback capability and create the callback
            var ajax = this.createAjaxManager(this._capabilityRepository.get_createCallbackCapability());
            var _self = this;
            ajax.registerSuccessListener(function(response)
            {
                ININ.Web.Common.Interface.ensureImplements(response, ININ.Web.Chat.WebServices.Interfaces.ICallbackResponse);
                ININ.Web.Common.Debug.traceNote("CallbackManagerBase.createCallback() succeeded: " + response);
                _self._callbackID = response.get_callbackId();
                ININ.Web.Chat.WebServices.NotificationRegistry.process(ININ.Web.Chat.WebServices.NotificationFactory.createCallbackCreationNotification(response.get_participantId(), response.get_callbackId(), response.get_userIdentityId(), parameters.get_participantName(), parameters.get_telephone(), parameters.get_subject(), parameters.get_creationDateTime()));
                _self.onAJAXSuccess(response);
            });
            ajax.registerFailureListener(function(response)
            {
                ININ.Web.Common.Debug.traceError("CallbackManagerBase.createCallback() failed: " + response);
                ININ.Web.Chat.WebServices.NotificationRegistry.process(ININ.Web.Chat.WebServices.NotificationFactory.createCallbackCreationFailureNotification(response.get_statusReason()));
                _self.onAJAXFailure(response);
            });

            parameters.set_creationDateTime(new Date());
            ajax.sendRequest(this.serializeCreateCallbackPostData(parameters));
        }

        ININ.Web.Common.Debug.traceMethodExited("CallbackManagerBase.createCallback()");
    },

    /**
     * Query the status of a Callback 
     *  
     * @param participantId Identifies the web visitor (the person whose browser is running this code) in the context of a callback.  In this case, the callback is the one whose status the web visitor wishes to query. 
     */
    queryStatus : function(participantId)
    {
        ININ.Web.Common.Debug.traceMethodEntered("CallbackManagerBase.queryStatus()");

        if (null == participantId)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("CallbackManagerBase.queryStatus(): participantId must be specified");
        }

        // create the callback status capability
        var ajax = this.createAjaxManager(this._capabilityRepository.get_callbackStatusCapability());
        var _self = this;

        ajax.registerSuccessListener(function(response)
        {
            ININ.Web.Common.Interface.ensureImplements(response, ININ.Web.Chat.WebServices.Interfaces.ICallbackResponse);
            ININ.Web.Common.Debug.traceNote("CallbackManagerBase.queryStatus() succeeded: " + response);
            ININ.Web.Chat.WebServices.NotificationRegistry.process(
                ININ.Web.Chat.WebServices.NotificationFactory.createCallbackStatusNotification(
                    participantId,
                    response.get_queueWaitTime(),
                    response.get_assignedAgentName(),
                    response.get_assignedAgentParticipantId(),
                    response.get_interactionState(),
                    response.get_estimatedCallbackTime(), 
                    response.get_queuePosition(),
                    response.get_queueName(),
                    response.get_longestWaitTime(),
                    response.get_interactionsWaitingCount(),
                    response.get_loggedInAgentsCount(),
                    response.get_availableAgentsCount(),
                    response.get_statusIndicator()));
            _self.onAJAXSuccess(response);
        });
        ajax.registerFailureListener(function(response)
        {
            ININ.Web.Common.Debug.traceError("CallbackManagerBase.queryStatus() failed: " + response);
            ININ.Web.Chat.WebServices.NotificationRegistry.process(ININ.Web.Chat.WebServices.NotificationFactory.createCallbackStatusFailureNotification(response.get_statusReason()));
            _self.onAJAXFailure(response);
        });

        ajax.sendRequest(null, participantId, true);
        ININ.Web.Common.Debug.traceMethodExited("CallbackManagerBase.queryStatus()");
    },

    /**
     * Disconnect a Callback 
     *  
     * @param participantId Identifies the web visitor (the person whose browser is running this code) in the context of a callback.  In this case, the callback is the one that the web visitor wishes to disconnect. 
     */
    disconnect : function(participantId)
    {
        ININ.Web.Common.Debug.traceMethodEntered("CallbackManagerBase.disconnect()");
        if (null == participantId)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("CallbackManagerBase.disconnect(): participantId must be specified");
        }

        // create the disconnect callback capability
        var ajax = this.createAjaxManager(this._capabilityRepository.get_disconnectCallbackCapability());
        var _self = this;

        ajax.registerSuccessListener(function(response)
        {
            ININ.Web.Common.Interface.ensureImplements(response, ININ.Web.Chat.WebServices.Interfaces.ICallbackResponse);
            ININ.Web.Common.Debug.traceNote("CallbackManagerBase.disconnect() succeeded: " + response);
            _self._callbackID = null;
            ININ.Web.Chat.WebServices.NotificationRegistry.process(ININ.Web.Chat.WebServices.NotificationFactory.createCallbackDisconnectNotification(participantId));
            _self.onAJAXSuccess(response);
        });
        ajax.registerFailureListener(function(response)
        {
            ININ.Web.Common.Debug.traceError("CallbackManagerBase.disconnect() failed: " + response);
            ININ.Web.Chat.WebServices.NotificationRegistry.process(ININ.Web.Chat.WebServices.NotificationFactory.createCallbackDisconnectFailureNotification(response.get_statusReason()));
            _self.onAJAXFailure(response);
        });

        ajax.sendRequest(null, participantId, true);
        ININ.Web.Common.Debug.traceMethodExited("CallbackManagerBase.disconnect()");
    },

	/**
	 * Reconnect to a callback for which connectivity was lost.
	 * 
     * @param callbackFunction This function will be called when a response is received from the IC server. 
     * This function should take 2 arguments. The first argument will be a boolean indicating whether the 
     * reconnection attempt was successful.  The second will be the CallbackReconnectResponse representing 
     * the response that was received from IC.
	 */
    reconnect : function(callbackFunction)
    {
        ININ.Web.Common.Debug.traceMethodEntered("CallbackManagerBase.reconnect()");
        var ajax = this.createAjaxManager(this._capabilityRepository.get_reconnectCallbackCapability());
        var _self = this;
		
		if(this._isReconnecting)
		{
			return;
		}
		
		this._isReconnecting = true;
		
        ajax.registerSuccessListener(function(response)
        {
		
            ININ.Web.Common.Debug.traceNote("CallbackManagerBase.reconnect() succeeded: " + response);

            ININ.Web.Chat.WebServices.NotificationRegistry.process(ININ.Web.Chat.WebServices.NotificationFactory.createCallbackReconnectNotification(response.get_participantId()));

            callbackFunction(true, response);
			_self._isReconnecting = false;
            _self.onAJAXSuccess(response);
        });
        ajax.registerFailureListener(function(response)
        {
            ININ.Web.Common.Debug.traceError("CallbackManagerBase.reconnect() failed: " + response);
            callbackFunction(false, response);
			_self._isReconnecting = false;
        });

        ajax.sendRequest(this.serializeReconnectPostData(this._callbackID), false);
        ININ.Web.Common.Debug.traceMethodExited("CallbackManagerBase.reconnect()");
    },

    /*
     * In the future, we could receive callback creation and reconnect notifications, and add the local participant
     * to the ParticipantRepository.  But currently there is no benefit in doing so. 
     * The notifications would have to be modified to provide the local participant's name.
     * ININ.Web.Chat.WebServices.NotificationRegistry.process(ININ.Web.Chat.WebServices.NotificationFactory.createNewParticipantNotification(notification.get_participantId(), notification.get_participantName(), ININ.Web.Chat.WebServices.InteractionTypes.CALLBACK, null, false));
     */

    /**
     * Respond to notification that a Callback's status has been received 
     * This just checks to see if the agent's photo is known, and if not, requests it. 
     * @param notification CallbackStatusNotification
     */
    processCallbackStatusNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("CallbackManagerBase.processCallbackStatusNotification()");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.ICallbackStatusNotification);

        var agentParticipantId = notification.get_assignedAgentParticipantId();
        if (null != agentParticipantId)
        {
            // If not there already, put the agent into the participant repository
            var agent = ININ.Web.Chat.WebServices.ParticipantRepository.get_participant(agentParticipantId);
            if (null == agent)
            { 
                ININ.Web.Chat.WebServices.NotificationRegistry.process(ININ.Web.Chat.WebServices.NotificationFactory.createNewParticipantNotification(agentParticipantId, notification.get_assignedAgentName(), ININ.Web.Chat.WebServices.InteractionTypes.CALLBACK, null, false));
                var agent = ININ.Web.Chat.WebServices.ParticipantRepository.get_participant(agentParticipantId);
            }

            // If agent's photo is not known, request it
            if ((null == agent.get_photo()) && this._partyManager && ININ.Web.Chat.WebServices.CapabilityRepository.isPartyInfoCapabilityEnabled())
            {
                var webVisitorParticipantId = notification.get_participantId();
                this._partyManager.getPartyInfo(webVisitorParticipantId, agentParticipantId);
            }
        }
        ININ.Web.Common.Debug.traceMethodExited("CallbackManagerBase.processCallbackStatusNotification()");
    },

	// private methods

    _handleInvalidSession : function(response)
    {
        ININ.Web.Common.Debug.traceMethodEntered("CallbackManagerBase._handleInvalidSession()");
        ININ.Web.Chat.WebServices.NotificationRegistry.process(ININ.Web.Chat.WebServices.NotificationFactory.createCallbackDisconnectNotification(participantId));
        ININ.Web.Common.Debug.traceMethodExited("CallbackManagerBase._handleInvalidSession()");
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * This class is the main brains of tracker registration, but is abstract - use derived class instead
 */
ININ.Web.Chat.WebServices.RegistrationManagerBase = Class.create(ININ.Web.Chat.WebServices.InteractionManagerBase,
{
	/**
	 * Constructor
	 * 
	 * @param genericResponseBuilder An object to build Response objects (i.e. objects which implement ResponseBase or its subclasses) from the IC server's replies to AJAX requests.
	 * @param capabilityRepository An object to keep track of which Capabilities are enabled or disabled, and provide getter methods for the various Capabilities. 
	 * @param failoverHandler In charge of connecting to the other server if the current one goes down for some reason. 
	 */
    initialize : function($super, genericResponseBuilder, capabilityRepository, failoverHandler)
    {
        ININ.Web.Common.Debug.traceMethodEntered("RegistrationManagerBase.initialize()");

        var numArgs = 4;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("RegistrationManagerBase constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

//        ININ.Web.Common.ParameterValidation.validate(arguments, [ {}, {"required": true} ]);

        $super(genericResponseBuilder, capabilityRepository, failoverHandler);
        
        ININ.Web.Common.Debug.traceMethodExited("RegistrationManagerBase.initialize()");
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("RegistrationManagerBase.destroy()");

        ININ.Web.Common.Debug.traceMethodExited("RegistrationManagerBase.destroy()");
    },

    // public methods

	/**
	 * Register with tracker
	 * 
	 * @param username The username of the person attempting to register
	 * @param password The password of the person attempting to register
	 * @param firstName The first name of the person attempting to register
	 * @param middleName The middle name of the person attempting to register
	 * @param lastName The last name of the person attempting to register
	 * @param homeStreetAddress The street address of the person attempting to register
	 * @param homeCity The city of the person attempting to register
	 * @param homeState The state/province/territory of the person attempting to register
	 * @param homePostalCode The postal code of the person attempting to register
	 * @param homeCountry The country of the person attempting to register
	 * @param homeEmail The email address of the person attempting to register
	 * @param homePhone The home telephone number of the person attempting to register
	 * @param homePhone2 The secondary home telephone number of the person attempting to register
	 * @param homeFax The home fax number of the person attempting to register
	 * @param homePager The home pager number of the person attempting to register
	 * @param homeMobile The personal mobile telephone number of the person attempting to register
	 * @param homeUrl The personal URL of the person attempting to register
	 * @param department The department (of their company) of the person attempting to register
	 * @param company The company for which the person attempting to register works
	 * @param jobTitle The job title of the person attempting to register
	 * @param assistantName The name of the assistant of the person attempting to register
	 * @param assistantPhone The telephone number of the assistant of the person attempting to register
	 * @param businessStreetAddress The street address of the company 
	 * @param businessCity The city in which the company is located
	 * @param businessState The state/province/territory in which the company is located
	 * @param businessPostalCode The postal code of the company
	 * @param businessCountry The country in which the company is located
	 * @param businessEmail The business email address of the person attempting to register
	 * @param businessPhone The business telephone number of the person attempting to register
	 * @param businessPhone2 The secondary business telephone number of the person attempting to register
	 * @param businessFax The business fax number of the person attempting to register
	 * @param businessPager The business pager number of the person attempting to register
	 * @param businessMobile The business mobile telephone number of the person attempting to register
	 * @param businessUrl The business URL of the person attempting to register
	 * @param remarks Freeform string
	 * @param callback This function will be called when a response is received from the IC server.  This function should take 3 arguments. The first argument will be a boolean indicating whether the registration attempt was successful.  The second will be the failure reason (not applicable if the registration attempt succeeded).  The third will be the ID of the current participant (i.e. the person in whose web browser this code is running) and is not applicable if the registration attempt failed.
	 */
    register : function(username, password,
                        firstName, middleName, lastName,
                        homeStreetAddress, homeCity, homeState, homePostalCode, homeCountry,
                        homeEmail, homePhone, homePhone2, homeFax, homePager, homeMobile, homeUrl,
                        department, company, jobTitle,
                        assistantName, assistantPhone,
                        businessStreetAddress, businessCity, businessState, businessPostalCode, businessCountry,
                        businessEmail, businessPhone, businessPhone2, businessFax, businessPager, businessMobile, businessUrl,
                        remarks, callback)
    {
        ININ.Web.Common.Debug.traceMethodEntered("RegistrationManagerBase.register()");

        // create the register capability and then register
        var ajax = this.createAjaxManager(this._capabilityRepository.get_trackerRegistrationCapability());
        var _self = this;
        ajax.registerSuccessListener(function(response)
        {
            ININ.Web.Common.Interface.ensureImplements(response, ININ.Web.Chat.WebServices.Interfaces.IRegistrationResponse);
            ININ.Web.Common.Debug.traceNote("RegistrationManagerBase.register() succeeded: " + response);
            callback(response.isSuccessful(), response.get_statusReason(), response.currentParticipantID);
            _self.onAJAXSuccess(response);
        });
        ajax.registerFailureListener(function(response)
        {
            ININ.Web.Common.Debug.traceError("RegistrationManagerBase.register() failed: " + response);
            callback(false, response.get_statusReason());
            _self.onAJAXFailure(response);
        });

        ajax.sendRequest(this.serializeRegistrationPostData(username, password,
                                                            firstName, middleName, lastName,
                                                            homeStreetAddress, homeCity, homeState, homePostalCode, homeCountry,
                                                            homeEmail, homePhone, homePhone2, homeFax, homePager, homeMobile, homeUrl,
                                                            department, company, jobTitle,
                                                            assistantName, assistantPhone,
                                                            businessStreetAddress, businessCity, businessState, businessPostalCode, businessCountry,
                                                            businessEmail, businessPhone, businessPhone2, businessFax, businessPager, businessMobile, businessUrl,
                                                            remarks));

        ININ.Web.Common.Debug.traceMethodExited("RegistrationManagerBase.register()");
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * This class is the main brains pertaining to information about parties in interactions, but is abstract - use derived class instead
 */
ININ.Web.Chat.WebServices.PartyManagerBase = Class.create(ININ.Web.Chat.WebServices.InteractionManagerBase,
{
	/**
	 * Constructor
	 * 
	 * @param genericResponseBuilder An object to build Response objects (i.e. objects which implement ResponseBase or its subclasses) from the IC server's replies to AJAX requests.
	 * @param capabilityRepository An object to keep track of which Capabilities are enabled or disabled, and provide getter methods for the various Capabilities. 
	 * @param failoverHandler In charge of connecting to the other server if the current one goes down for some reason. 
	 */
    initialize : function($super, genericResponseBuilder, capabilityRepository, failoverHandler)
    {
        ININ.Web.Common.Debug.traceMethodEntered("PartyManagerBase.initialize()");

        var numArgs = 4;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("PartyManagerBase constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

//        ININ.Web.Common.ParameterValidation.validate(arguments, [ {}, {"required": true} ]);

        $super(genericResponseBuilder, capabilityRepository, failoverHandler);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IPartyInfoNotificationObserver);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerPartyInfoNotificationObserver(this);

        ININ.Web.Common.Debug.traceMethodExited("PartyManagerBase.initialize()");
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("PartyManagerBase.destroy()");

        ININ.Web.Common.Debug.traceMethodExited("PartyManagerBase.destroy()");
    },

    // public methods

	/**
     * Queries a party's info (name, photo).  This method does not return anything, but will cause 
     * either a PartyInfoNotification or a PartyInfoFailureNotification to be 
     * sent to observers of these Notification types. 
	 * 
     * @param localParticipantId The participantId of the agent whose info is being queried. 
     * @param remoteParticipantId The participantId of the agent whose info is being queried. 
	 */
    getPartyInfo : function(localParticipantId, remoteParticipantId)
    {
        ININ.Web.Common.Debug.traceMethodEntered("PartyManagerBase.getPartyInfo()");

        if (!ININ.Web.Chat.WebServices.CapabilityRepository.isPartyInfoCapabilityEnabled())
        {
            throw ININ.Web.Common.ExceptionFactory.createException("PartyManagerBase.getPartyInfo(): The party info capability is not enabled!");
        }

        // create the get party info capability
        var ajax = this.createAjaxManager(this._capabilityRepository.get_partyInfoCapability());
        var _self = this;
        ajax.registerSuccessListener(function(response)
        {
            ININ.Web.Common.Interface.ensureImplements(response, ININ.Web.Chat.WebServices.Interfaces.PartyResponse);
            ININ.Web.Common.Debug.traceNote("PartyManagerBase.getPartyInfo() succeeded: " + response);
            ININ.Web.Chat.WebServices.NotificationRegistry.process(ININ.Web.Chat.WebServices.NotificationFactory.createPartyInfoNotification(localParticipantId, remoteParticipantId, response.get_name(), response.get_photo()));
            _self.onAJAXSuccess(response);
        });
        ajax.registerFailureListener(function(response)
        {
            ININ.Web.Common.Debug.traceError("PartyManagerBase.getPartyInfo() failed: " + response);
            ININ.Web.Chat.WebServices.NotificationRegistry.process(ININ.Web.Chat.WebServices.NotificationFactory.createPartyInfoFailureNotification(response.get_statusReason()));
            _self.onAJAXFailure(response);
        });

        ajax.sendRequest(this.serializeGetPartyInfoPostData(remoteParticipantId), localParticipantId, true);

        ININ.Web.Common.Debug.traceMethodExited("PartyManagerBase.getPartyInfo()");
    },

    /**
     * Respond to receipt of information (name, photo location) about a party involved in an interaction 
     * by setting the photo property of the appropriate participant. 
     * 
     * @param notification 
     */
    processPartyInfoNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("PartyManagerBase.processPartyInfoNotification()");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IPartyInfoNotification);

        if (notification.get_photo())
        {
            ININ.Web.Common.Debug.traceNote("PartyManagerBase.processPartyInfoNotification(): agent photo is: " +
                                            notification.get_photo() + " [in " + ININ.Web.Chat.WebServices.Servers.CurrentUriFragment + "]");
            var agentParticipantId = notification.get_remoteParticipantId();
            var agent = ININ.Web.Chat.WebServices.ParticipantRepository.get_participant(agentParticipantId);
            if (!agent)
            {
                throw ININ.Web.Common.ExceptionFactory.createException("Received party info for unrecognized agent!");
            }
            agent.set_photo(notification.get_photo());
        }
        ININ.Web.Common.Debug.traceMethodExited("PartyManagerBase.processPartyInfoNotification()");
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/**
 * Chat Response Base class
 * AjaxManager will call ResponseBuilder to create these when HTTP JSON/XML relies are received from the IC server that pertain to chats. 
 */
ININ.Web.Chat.WebServices.ChatResponse = Class.create(ININ.Web.Chat.WebServices.ResponseBase,
{
    EXCEPTION_INVALID_INTERACTION_STATE: "Invalid interaction state",

	/**
	 * Constructor
	 */
    initialize: function($super)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ChatResponse.initalize()");

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IChatResponse)

        this._events = [];
        this._pollWaitSuggestion = null;

        ININ.Web.Common.Debug.traceMethodExited("ChatResponse.initalize()");
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        if(this._events)
        {
            while(this._events.length > 0)
            {
                var event = this._events.pop();
                event.destroy();
            }
            delete this._events;
            this._events = null;
        }
        this._pollWaitSuggestion = null;

        ININ.Web.Chat.WebServices.ResponseBase.prototype.destroy.call(this);
    },

    // methods

	/**
	 * Gets the number of milliseconds that the IC server suggests waiting before polling again 
	 *  
	 * @return An integer representing how many milliseconds the IC server suggests waiting before polling again 
	 */
    get_pollWaitSuggestion : function()
    {
        return this._pollWaitSuggestion;
    },

	/**
	 * Sets the number of milliseconds that the IC server suggests waiting before polling again 
	 *  
	 * @param pollWaitSuggestion An integer representing how many milliseconds the IC server suggests waiting before polling again 
	 */
    set_pollWaitSuggestion : function(pollWaitSuggestion)
    {
        this._pollWaitSuggestion = pollWaitSuggestion;
    },

	/**
	 * Gets the list of events (e.g. participant joined, etc.) contained in this response
	 *  
	 * @return A list of events.  Each shall be an instance of one of the ININ.Web.Chat.WebServices.*Event classes.
	 */
    get_events : function()
    {
        return this._events;
    },

	/**
	 * Adds an event to the list of events (e.g. participant joined, etc.) contained in this response
	 *  
	 * @param event An instance of one of the ININ.Web.Chat.WebServices.*Event classes.
	 */
    addEvent : function(event)
    {
        this._events.push(event);
    },

	/**
     * Gets the config version that the IC server instructed this client to fetch, if any. 
	 *  
     * @return Version number of server configuration
	 */
    get_serverConfigVersion : function()
    {
        return this._cfgVer;
    },

	/**
     * Sets the config version that the IC server instructed this client to fetch. 
	 *  
	 * @param cfgVer Version number of server configuration
	 */
    set_serverConfigVersion : function(cfgVer)
    {
        this._cfgVer = cfgVer;
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/**
 * Callback Response Base class 
 * AjaxManager will call ResponseBuilder to create these when HTTP JSON/XML relies are received 
 * from the IC server that pertain to callbacks. 
 */
ININ.Web.Chat.WebServices.CallbackResponseBase = Class.create(ININ.Web.Chat.WebServices.ResponseBase,
{
	/**
	 * Constructor
	 */
    initialize: function($super)
    {
        ININ.Web.Common.Debug.traceMethodEntered("CallbackResponseBase.initalize()");

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackResponse)

        ININ.Web.Common.Debug.traceMethodExited("CallbackResponseBase.initalize()");
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Chat.WebServices.ResponseBase.prototype.destroy.call(this);
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/**
 * Callback Creation Response class 
 * AjaxManager will call ResponseBuilder to create these when HTTP JSON/XML relies are received 
 * from the IC server that pertain to the creation of callbacks. 
 */
ININ.Web.Chat.WebServices.CallbackCreateResponse = Class.create(ININ.Web.Chat.WebServices.CallbackResponseBase,
{
	/**
	 * Constructor
	 */
    initialize: function($super)
    {
        ININ.Web.Common.Debug.traceMethodEntered("CallbackCreateResponse.initalize()");

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackCreateResponse)

        this._participantId = null;
        this._callbackId = null;
        this._userIdentityId = null;

        ININ.Web.Common.Debug.traceMethodExited("CallbackCreateResponse.initalize()");
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        this._participantId = null;
        this._callbackId = null;
        this._userIdentityId = null;

        ININ.Web.Chat.WebServices.ResponseBase.prototype.destroy.call(this);
    },

    // methods

	/**
     * Gets the ID of the participant to whom this response pertains. 
     * This ID's lifespan is that of the web session. 
	 *  
	 * @return ID of the participant 
	 */
    get_participantId : function()
    {
        return this._participantId;
    },

	/**
	 * Sets the ID of the participant to whom this response pertains
	 * 
	 * @param participantId ID of the participant
	 */
    set_participantId : function(participantId)
    {
        this._participantId = participantId;
    },

	/**
     * Gets the ID of the callback, so it may be reconnected 
     * (i.e. brought into a then-current web session) later. 
     * This ID's lifespan is that of the Callback. 
	 *  
     * @return ID of the callback
	 */
    get_callbackId : function()
    {
        return this._callbackId;
    },

	/**
     * Sets the ID of the callback 
	 * 
	 * @param callbackId ID of the callback
	 */
    set_callbackId : function(callbackId)
    {
        this._callbackId = callbackId;
    },

	/**
     * Gets the ID of the user who created this callback
     * This ID's lifespan is that of the Callback. 
	 *  
	 * @return ID of the user 
	 */
    get_userIdentityId : function()
    {
        return this._userIdentityId;
    },

	/**
     * Sets the ID of the user who created this callback
	 * 
	 * @param userIdentityId ID of the user who created this callback
	 */
    set_userIdentityId : function(userIdentityId)
    {
        this._userIdentityId = userIdentityId;
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/**
 * Callback Status Response class 
 * AjaxManager will call ResponseBuilder to create these when HTTP JSON/XML relies are received 
 * from the IC server that pertain to querying the status of callbacks. 
 */
ININ.Web.Chat.WebServices.CallbackStatusResponse = Class.create(ININ.Web.Chat.WebServices.CallbackResponseBase,
{
	/**
	 * Constructor
	 */
    initialize: function($super)
    {
        ININ.Web.Common.Debug.traceMethodEntered("CallbackStatusResponse.initalize()");

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackStatusResponse)

        this._queueWaitTime = null;
        this._assignedAgentName = null;
        this._assignedAgentParticipantId = null;
        this._interactionState = null;
        this._estimatedCallbackTime = null;
        this._queuePosition = null;
        this._queueName = null;
        this._longestWaitTime = null;
        this._interactionsWaitingCount = null;
        this._loggedInAgentsCount = null;
        this._availableAgentsCount = null;
        this._statusIndicator = null;

        ININ.Web.Common.Debug.traceMethodExited("CallbackStatusResponse.initalize()");
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        this._queueWaitTime = null;
        this._assignedAgentName = null;
        this._assignedAgentParticipantId = null;
        this._interactionState = null;
        this._estimatedCallbackTime = null;
        this._queuePosition = null;
        this._queueName = null;
        this._longestWaitTime = null;
        this._interactionsWaitingCount = null;
        this._loggedInAgentsCount = null;
        this._availableAgentsCount = null;
        this._statusIndicator = null;

        ININ.Web.Chat.WebServices.ResponseBase.prototype.destroy.call(this);
    },

    // methods

	/**
     * Gets the queue's wait time
	 *  
     * @return number of seconds
	 */
    get_queueWaitTime : function()
    {
        return this._queueWaitTime;
    },

	/**
     * Sets the queue's wait time
	 * 
     * @param queueWaitTime number of seconds
	 */
    set_queueWaitTime : function(queueWaitTime)
    {
        this._queueWaitTime = queueWaitTime;
    },

	/**
     * Gets the assigned agent's name
	 *  
     * @return Agent's name
	 */
    get_assignedAgentName : function()
    {
        return this._assignedAgentName;
    },

	/**
     * Sets the assigned agent's name
	 * 
     * @param assignedAgentName Agent's name
	 */
    set_assignedAgentName : function(assignedAgentName)
    {
        this._assignedAgentName = assignedAgentName;
    },

	/**
     * Gets the assigned agent's participant ID
	 *  
     * @return ID identifying the agent
	 */
    get_assignedAgentParticipantId : function()
    {
        return this._assignedAgentParticipantId;
    },

	/**
     * Sets the assigned agent
	 * 
     * @param assignedAgentParticipantId ID identifying the agent
	 */
    set_assignedAgentParticipantId : function(assignedAgentParticipantId)
    {
        this._assignedAgentParticipantId = assignedAgentParticipantId;
    },

	/**
     * Gets the interaction state
	 *  
     * @return interaction state
	 */
    get_interactionState : function()
    {
        return this._interactionState;
    },

	/**
     * Sets the interaction state
	 * 
     * @param interactionState The state of the interaction 
	 */
    set_interactionState : function(interactionState)
    {
        this._interactionState = interactionState;
    },

	/**
     * Gets the estimated callback time, expressed in "seconds after now"
	 *  
     * @return number of seconds before it is estimated that the callback will be made
	 */
    get_estimatedCallbackTime : function()
    {
        return this._estimatedCallbackTime;
    },

	/**
     * Sets the estimated callback time, expressed in "seconds after now"
	 * 
     * @param estimatedCallbackTime number of seconds before it is estimated that the callback will be made
	 */
    set_estimatedCallbackTime : function(estimatedCallbackTime)
    {
        this._estimatedCallbackTime = estimatedCallbackTime;
    },

	/**
     * Gets the callback's position in the queue
	 *  
     * @return integer indicating the callback's position in the queue
	 */
    get_queuePosition : function()
    {
        return this._queuePosition;
    },

	/**
     * Sets the callback's position in the queue
	 * 
     * @param queuePosition integer indicating the callback's position in the queue
	 */
    set_queuePosition : function(queuePosition)
    {
        this._queuePosition = queuePosition;
    },

	/**
     * Gets the name of the queue
	 *  
     * @return the name of the queue
	 */
    get_queueName : function()
    {
        return this._queueName;
    },

	/**
     * Sets the name of the queue
	 * 
     * @param queueName the name of the queue
	 */
    set_queueName : function(queueName)
    {
        this._queueName = queueName;
    },

	/**
     * Gets TODO write this comment block!
	 *  
     * @return 
	 */
    get_longestWaitTime : function()
    {
        return this._longestWaitTime;
    },

	/**
     * Sets TODO write this comment block!
	 * 
     * @param longestWaitTime 
	 */
    set_longestWaitTime : function(longestWaitTime)
    {
        this._longestWaitTime = longestWaitTime;
    },

	/**
     * Gets the number of calls waiting
	 *  
     * @return the number of calls waiting
	 */
    get_interactionsWaitingCount : function()
    {
        return this._interactionsWaitingCount;
    },

	/**
     * Sets the number of calls waiting
	 * 
     * @param interactionsWaitingCount The number of calls waiting
	 */
    set_interactionsWaitingCount : function(interactionsWaitingCount)
    {
        this._interactionsWaitingCount = interactionsWaitingCount;
    },

	/**
     * Gets the number of logged in agents who meet this callback's routing criteria
	 *  
     * @return the number of logged in agents who meet this callback's routing critieria
	 */
    get_loggedInAgentsCount : function()
    {
        return this._loggedInAgentsCount;
    },

	/**
     * Sets the number of logged in agents who meet this callback's routing critieria
	 * 
     * @param loggedInAgentsCount the number of logged in agents who meet this callback's routing critieria
	 */
    set_loggedInAgentsCount : function(loggedInAgentsCount)
    {
        this._loggedInAgentsCount = loggedInAgentsCount;
    },

	/**
     * Gets the number of available agents who meet this callback's routing criteria
	 *  
     * @return the number of available agents who meet this callback's routing criteria
	 */
    get_availableAgentsCount : function()
    {
        return this._availableAgentsCount;
    },

	/**
     * Sets the number of available agents who meet this callback's routing criteria
	 * 
     * @param availableAgentsCount the number of available agents who meet this callback's routing criteria
	 */
    set_availableAgentsCount : function(availableAgentsCount)
    {
        this._availableAgentsCount = availableAgentsCount;
    },

    /**
     * Returns a key to indicate the status of the callback
     *  
     * @return statusIndicator string 
     */
    get_statusIndicator : function()
    {
        return this._statusIndicator;
    },

    /**
     * Sets a key to indicate the status of the callback
     *  
     * @param statusIndicator string 
     */
    set_statusIndicator : function(statusIndicator)
    {
        this._statusIndicator = statusIndicator;
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/**
 * Callback Reconnection Response class 
 * AjaxManager will call ResponseBuilder to create these when HTTP JSON/XML relies are received 
 * from the IC server that pertain to the reconnection of callbacks. 
 */
ININ.Web.Chat.WebServices.CallbackReconnectResponse = Class.create(ININ.Web.Chat.WebServices.CallbackResponseBase,
{
	/**
	 * Constructor
	 */
    initialize: function($super)
    {
        ININ.Web.Common.Debug.traceMethodEntered("CallbackReconnectResponse.initalize()");

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackReconnectResponse)

        this._participantId = null;

        ININ.Web.Common.Debug.traceMethodExited("CallbackReconnectResponse.initalize()");
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        this._participantId = null;

        ININ.Web.Chat.WebServices.ResponseBase.prototype.destroy.call(this);
    },

    // methods

	/**
	 * Gets the ID of the participant to whom this response pertains 
	 *  
	 * @return ID of the participant 
	 */
    get_participantId : function()
    {
        return this._participantId;
    },

	/**
	 * Sets the ID of the participant to whom this response pertains
	 * 
	 * @param participantId ID of the participant
	 */
    set_participantId : function(participantId)
    {
        this._participantId = participantId;
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/**
 * PartyInfoResponse class 
 *  
 * When an AJAX request is made to the IC server to get party info (i.e. the name and photo of a 
 * party in a chat or a callback), PartyInfoResponseBuilder translates the IC server's 
 * JSON/XML reply into a PartyInfoResponse. 
 */
ININ.Web.Chat.WebServices.PartyInfoResponse = Class.create(ININ.Web.Chat.WebServices.ResponseBase,
{
	/**
	 * Constructor
	 */
    initialize: function($super)
    {
        ININ.Web.Common.Debug.traceMethodEntered("PartyInfoResponse.initalize()");

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IPartyInfoResponse)

        ININ.Web.Common.Debug.traceMethodExited("PartyInfoResponse.initalize()");
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Chat.WebServices.ResponseBase.prototype.destroy.call(this);
    },

    // public methods

	/**
	 * Gets the name of the participant to whom this response pertains 
	 *  
	 * @return name of the participant 
	 */
    get_name : function()
    {
        return this._name;
    },

	/**
	 * Sets the name of the participant to whom this response pertains
	 * 
	 * @param name The name of the participant
	 */
    set_name : function(name)
    {
        this._name = name;
    },

	/**
	 * Gets the location of the photo of the participant to whom this response pertains 
	 *  
	 * @return Location of the photo of the participant 
	 */
    get_photo : function()
    {
        return this._photo;
    },

	/**
	 * Sets the location of the photo of the participant to whom this response pertains 
	 *  
	 * @param photo Location of the photo of the participant 
	 */
    set_photo : function(photo)
    {
        this._photo = photo;
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/**
 * Registration Response Base class
 * AjaxManager will call ResponseBuilder to create these when HTTP JSON/XML relies are received 
 * from the IC server that pertain to registration. 
 */
ININ.Web.Chat.WebServices.RegistrationResponse = Class.create(ININ.Web.Chat.WebServices.ResponseBase,
{
	/**
	 * Constructor
	 */
    initialize: function($super)
    {
        ININ.Web.Common.Debug.traceMethodEntered("RegistrationResponse.initalize()");

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IRegistrationResponse)

        ININ.Web.Common.Debug.traceMethodExited("RegistrationResponse.initalize()");
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Chat.WebServices.ResponseBase.prototype.destroy.call(this);
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Json._Internal");

/**
 * ChatResponseBuilder class 
 * Handles translating the JSON received as the IC server's reply to an AJAX request 
 * into an ININ.Web.Chat.WebServices.ChatResponse object.
 */
ININ.Web.Chat.WebServices.Json._Internal.ChatResponseBuilder = Class.create(ININ.Web.Chat.WebServices.Json.ResponseBuilderBase,
{
	/**
	 * Constructor 
	 *  
	 * @param eventFactory An instance of EventFactory, so that the "event" part(s) of the JSON may be translated into ININ.Web.Chat.WebServices.*Event objects.
	 */
    initialize : function($super, eventFactory)
    {
        $super();

        this._eventFactory = eventFactory;
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Chat.WebServices.Json.ResponseBuilderBase.prototype.destroy.call(this);
    },

	/**
     * Handles translating the JSON received as the IC servers reply to an AJAX request 
     * into an ININ.Web.Chat.WebServices.ChatResponse object.
	 * 
	 * @param jsonStr JSON received from the IC server.  This should have already been vetted to ensure that is not empty, its status indicates success, etc.  In the default implementation, that is done in GenericResponseBuilder.
	 * @return ININ.Web.Chat.WebServices.ChatResponse
	 */
    buildChatResponse : function(jsonStr)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.ChatResponseBuilder.buildChatResponse()");
        ININ.Web.Common.Debug.traceStatus("jsonStr is: " + jsonStr);

        var response = null;

        if (jsonStr)
        {
            response = new ININ.Web.Chat.WebServices.ChatResponse();

            var json = null;
            try
            {
                json = jsonStr.evalJSON();
            }
            catch (e)
            {
                ININ.Web.Common.Debug.traceError("Caught exception calling JSON.parse or string.evalJSON:\n" + e);
                ININ.Web.Common.Debug.alert("Caught exception calling JSON.parse or string.evalJSON:\n" + e);
            }

            if(json.chat)
            {
                this._parseStatus(json.chat.status, response);

                ININ.Web.Common.Debug.traceNote("status type has been set.");
                if (response.isSuccessful())
                {
                    ININ.Web.Common.Debug.traceNote("Successful response.");

                    this._parseEvents(json.chat.events, response);

                    ININ.Web.Common.Debug.traceNote("Participant/Chat ID: " + json.chat.participantID);
					response.chatID = json.chat.chatID;
                    response.currentParticipantID = json.chat.participantID;
                    response.dateFormat = json.chat.dateFormat;
                    response.timeFormat = json.chat.timeFormat;

                    if (json.chat.cfgVer)
                    {
                        response.set_serverConfigVersion(json.chat.cfgVer);
                    }
                }
                else
                {
                    ININ.Web.Common.Debug.traceNote("Unsuccessful response");
                }

                if(json.chat.pollWaitSuggestion)
                {
                    response.set_pollWaitSuggestion(json.chat.pollWaitSuggestion);
                }
            }
        }

        ININ.Web.Common.Debug.traceMethodExited("Json.ChatResponseBuilder.buildChatResponse()");

        return response;
    },

	// private methods

    _parseEvents : function(events, response)
    {
        if (events)
        {
            ININ.Web.Common.Debug.traceNote("Creating events...");
            for (var i = 0; i < events.length; ++i)
            {
                var jsonEvent = events[i];

                ININ.Web.Common.Debug.traceNote("Creating event: " + jsonEvent.type);
                response.addEvent(this._eventFactory.createEvent(jsonEvent));
            }
            ININ.Web.Common.Debug.traceNote("Done creating events.");
        }
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Json._Internal");

/**
 * CallbackResponseBuilder class 
 * Handles translating the JSON received as the IC server's reply to an AJAX request 
 * into a ININ.Web.Chat.WebServices.CallbackResponseBase object (or subclass thereof).
 */
ININ.Web.Chat.WebServices.Json._Internal.CallbackResponseBuilder = Class.create(ININ.Web.Chat.WebServices.Json.ResponseBuilderBase,
{
	/**
	 * Constructor 
	 */
    initialize : function($super)
    {
        $super();
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Chat.WebServices.Json.ResponseBuilderBase.prototype.destroy.call(this);
    },

	/**
     * Handles translating the JSON received as the IC servers reply to an AJAX request 
     * into a subclass of an ININ.Web.Chat.WebServices.CallbackResponseBase object.
	 * 
	 * @param jsonStr JSON received from the IC server.  This should have already been vetted to ensure that is not empty, its status indicates success, etc.  In the default implementation, that is done in GenericResponseBuilder.
	 * @return ININ.Web.Chat.WebServices.CallbackResponseBase subclass
	 */
    buildCallbackResponse : function(jsonStr, url)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.CallbackResponseBuilder.buildCallbackResponse()");
        ININ.Web.Common.Debug.traceStatus("jsonStr is: " + jsonStr);
        ININ.Web.Common.Debug.traceStatus("url is: " + url);

        var response = null;

        if (!jsonStr)
        {
            ININ.Web.Common.Debug.traceError("Missing jsonStr!");
        }
        else if (!url)
        {
            ININ.Web.Common.Debug.traceError("Missing URL!");
        }
        else
        {
            var json = null;
            try
            {
                json = jsonStr.evalJSON();
            }
            catch (e)
            {
                ININ.Web.Common.Debug.traceError("Caught exception calling JSON.parse or string.evalJSON:\n" + e);
                ININ.Web.Common.Debug.alert("Caught exception calling JSON.parse or string.evalJSON:\n" + e);
            }

            if(!json.callback)
            {
                ININ.Web.Common.Debug.traceError("JSON has no 'callback' element!");
                ININ.Web.Common.Debug.breakpoint();
                return response;
            }

            if (url.include(ININ.Web.Chat.WebServices.CapabilityUrls.Callback.CREATE))
            {
                response = new ININ.Web.Chat.WebServices.CallbackCreateResponse();
            } else if (url.include(ININ.Web.Chat.WebServices.CapabilityUrls.Callback.STATUS))
            {
                response = new ININ.Web.Chat.WebServices.CallbackStatusResponse();
            } else if (url.include(ININ.Web.Chat.WebServices.CapabilityUrls.Callback.DISCONNECT))
            {
                response = new ININ.Web.Chat.WebServices.CallbackResponseBase();
            } else if (url.include(ININ.Web.Chat.WebServices.CapabilityUrls.Callback.RECONNECT))
            {
                response = new ININ.Web.Chat.WebServices.CallbackReconnectResponse();
            } else
            {
                ININ.Web.Common.Debug.traceError("Unrecognized response type!");
                ININ.Web.Common.Debug.breakpoint();
                return response;
            }

            this._parseStatus(json.callback.status, response);

            ININ.Web.Common.Debug.traceNote("status type has been set.");
            if (response.isSuccessful())
            {
                ININ.Web.Common.Debug.traceNote("Successful response.");

                if (ININ.Web.Common.Interface.doesImplement(response,ININ.Web.Chat.WebServices.Interfaces.ICallbackCreateResponse))
                {
                    ININ.Web.Common.Debug.traceNote("Participant/Callback ID: " + json.callback.participantID);
                    response.set_participantId(json.callback.participantID);
                    if (json.callback.callbackID)
                    {
                        response.set_callbackId(json.callback.callbackID);
                    }
                    if (json.callback.userIdentityID)
                    {
                        response.set_userIdentityId(json.callback.userIdentityID);
                    }
                } else if (ININ.Web.Common.Interface.doesImplement(response,ININ.Web.Chat.WebServices.Interfaces.ICallbackReconnectResponse))
                {
                    ININ.Web.Common.Debug.traceNote("Participant/Callback ID: " + json.callback.participantID);
                    response.set_participantId(json.callback.participantID);
                } else if (ININ.Web.Common.Interface.doesImplement(response,ININ.Web.Chat.WebServices.Interfaces.ICallbackStatusResponse))
                {
                    if (json.callback.assignedAgent)
                    {
                        response.set_assignedAgentName(json.callback.assignedAgent.name);
                        response.set_assignedAgentParticipantId(json.callback.assignedAgent.participantID);
                        response.set_statusIndicator("InProcess");
                    }
                    else
                    {
                        response.set_statusIndicator("Waiting");
                    }

                    if (json.callback.acdStatus)
                    {
                        response.set_queueWaitTime(json.callback.acdStatus.queueWaitTime);
                        response.set_interactionState(json.callback.acdStatus.interactionState);
                        response.set_estimatedCallbackTime(json.callback.acdStatus.estimatedCallbackTime);
                        response.set_queuePosition(json.callback.acdStatus.queuePosition);
                        response.set_queueName(json.callback.acdStatus.queueName);
                        response.set_longestWaitTime(json.callback.acdStatus.longestWaitTime);
                        response.set_interactionsWaitingCount(json.callback.acdStatus.callsWaitingCount); // TODO change
                        response.set_loggedInAgentsCount(json.callback.acdStatus.loggedInAgentsCount);
                        response.set_availableAgentsCount(json.callback.acdStatus.availableAgentsCount);
                    }
                }
                // else { nothing to do, since Disconnect response has no state. }
            }
            else
            {
                ININ.Web.Common.Debug.traceNote("Unsuccessful response");
            }
        }

        ININ.Web.Common.Debug.traceMethodExited("Json.CallbackResponseBuilder.buildCallbackResponse()");

        return response;
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Json._Internal");

/**
 * RegistrationResponseBuilder class 
 * Handles translating the JSON received as the IC server's reply to an AJAX request for registration
 * into an ININ.Web.Chat.WebServices.RegistrationResponse object.
 */
ININ.Web.Chat.WebServices.Json._Internal.RegistrationResponseBuilder = Class.create(ININ.Web.Chat.WebServices.Json.ResponseBuilderBase,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        $super();
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Chat.WebServices.Json.ResponseBuilderBase.prototype.destroy.call(this);
    },

	/**
     * Handles translating the JSON received as the IC servers reply to an AJAX request 
     * into an ININ.Web.Chat.WebServices.RegistrationResponse object.
	 * 
	 * @param jsonStr JSON received from the IC server.  This should have already been vetted to ensure that is not empty, its status indicates success, etc.  In the default implementation, that is done in GenericResponseBuilder.
	 * @return ININ.Web.Chat.WebServices.RegistrationResponse
	 */
    buildRegistrationResponse : function(jsonStr)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.RegistrationResponseBuilder.buildRegistrationResponse()");
        ININ.Web.Common.Debug.traceStatus("jsonStr is: " + jsonStr);

        var response = null;

        if (jsonStr)
        {
            response = new ININ.Web.Chat.WebServices.RegistrationResponse();

            var json = null;
            try
            {
                json = jsonStr.evalJSON();
            }
            catch (e)
            {
                ININ.Web.Common.Debug.traceError("Caught exception calling JSON.parse or string.evalJSON:\n" + e);
                ININ.Web.Common.Debug.alert("Caught exception calling JSON.parse or string.evalJSON:\n" + e);
            }

            if(json.registration)
            {
                if(json.registration.status)
                {
                    if(json.registration.status.type)
                    {
                        response.set_statusType(json.registration.status.type);
                    }

                    if(json.registration.status.reason)
                    {
                        var error = null;
                        try
                        {
                            error = new ININ.Web.Chat.WebServices.Error(json.registration.status.reason);
                        }
                        catch(ex)
                        {
                            ININ.Web.Common.Debug.traceError(ex.message);
                            ININ.Web.Common.Debug.traceWarning("Invalid status reason: " + json.chat.status.reason);
                        }

                        if(error)
                        {
                            response.set_statusReason(error);
                        }
                    }
                }
            }
        }

        ININ.Web.Common.Debug.traceMethodExited("Json.RegistrationResponseBuilder.buildRegistrationResponse()");

        return response;
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Json._Internal");

/**
 * PartyInfoResponseBuilder class 
 * Handles translating the JSON received as the IC server's reply to an AJAX request 
 * into a ININ.Web.Chat.WebServices.PartyInfoResponse object 
 */
ININ.Web.Chat.WebServices.Json._Internal.PartyInfoResponseBuilder = Class.create(ININ.Web.Chat.WebServices.Json.ResponseBuilderBase,
{
	/**
	 * Constructor 
	 */
    initialize : function($super)
    {
        $super();
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Chat.WebServices.Json.ResponseBuilderBase.prototype.destroy.call(this);
    },

	/**
     * Handles translating the JSON received as the IC servers reply to an AJAX request 
     * into a ININ.Web.Chat.WebServices.PartyInfoResponse object.
	 * 
	 * @param jsonStr JSON received from the IC server.  This should have already been vetted to ensure that is not empty, its status indicates success, etc.  In the default implementation, that is done in GenericResponseBuilder.
     * @return ININ.Web.Chat.WebServices.PartyInfoResponse
	 */
    buildPartyInfoResponse : function(jsonStr)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.PartyInfoResponseBuilder.buildPartyInfoResponse()");
        ININ.Web.Common.Debug.traceStatus("jsonStr is: " + jsonStr);

        var response = null;

        if (!jsonStr)
        {
            ININ.Web.Common.Debug.traceError("Missing jsonStr!");
        }
        else
        {
            var json = null;
            try
            {
                json = jsonStr.evalJSON();
            }
            catch (e)
            {
                ININ.Web.Common.Debug.traceError("Caught exception calling JSON.parse or string.evalJSON:\n" + e);
                ININ.Web.Common.Debug.alert("Caught exception calling JSON.parse or string.evalJSON:\n" + e);
            }

            if(!json.partyInfo)
            {
                ININ.Web.Common.Debug.traceError("JSON has no 'partyInfo' element!");
                ININ.Web.Common.Debug.breakpoint();
                return response;
            }

            response = new ININ.Web.Chat.WebServices.PartyInfoResponse();

            this._parseStatus(json.partyInfo.status, response);

            ININ.Web.Common.Debug.traceNote("status type has been set.");
            if (response.isSuccessful())
            {
                ININ.Web.Common.Debug.traceNote("Successful response.");

                response.set_name(json.partyInfo.name);
                response.set_photo(json.partyInfo.photo);
            }
            else
            {
                ININ.Web.Common.Debug.traceNote("Unsuccessful response");
            }
        }

        ININ.Web.Common.Debug.traceMethodExited("Json.PartyInfoResponseBuilder.buildPartyInfoResponse()");

        return response;
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Json");
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Json._Internal");

/**
 * <code>ININ.Web.Chat.WebServices.Json._Internal._TypingIndicator</code> class 
 * This class extends <code>TypingIndicatorBase</code>, to provide a JSON-specific implementation of <code>serializeDataToPost()</code>, 
 * which is the method that creates the textual representation of the typing indicator to send to the IC server. 
 * 
 */
ININ.Web.Chat.WebServices.Json._Internal._TypingIndicator = Class.create(ININ.Web.Chat.WebServices.TypingIndicatorBase,
{
	/**
	 * Constructor
	 */
    initialize: function($super)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.TypingIndicator.initialize");
        $super();
        ININ.Web.Common.Debug.traceMethodExited("Json.TypingIndicator.initialize");
    },

    /**
     *  Create a textual representation of the typing indicator to send to the server in the AJAX request.
     *  (JSON flavor of this method)
     */
    serializeDataToPost: function()
    {
        return "{ \"typingIndicator\": " + this._typingState + "}";
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Json");

/**
 * ChatManager class 
 * Extends ChatManagerBase with JSON-specific functionality
 */
ININ.Web.Chat.WebServices.Json.ChatManager = Class.create(ININ.Web.Chat.WebServices.ChatManagerBase,
{
    // constants
    HTML_MIME_TYPE_VALUE: 'text/html',
    PLAIN_TEXT_MIME_TYPE_VALUE: 'text/plain',

	/**
	 * Constructor
	 * 
	 * @param genericResponseBuilder An instance of GenericResponseBuilder, to turn the JSON received from the IC server into a ResponseBase or subclass thereof
	 * @param capabilityRepository An instance of CapabilityRepository, in which the capabilities are stored.
	 * @param typingIndicator An instance of ININ.Web.Chat.WebServices.Json.TypingIndicator
     * @param failoverHandler An instance of ININ.Web.Chat.WebServices.Json.FailoverHandler 
     * @param acceptHtml If true, this indicates that the client is willing to receive messages from WebProcessorBridge that contain HTML.  Otherwise, only plain text messages are desired.
	 */
    initialize: function($super, genericResponseBuilder, capabilityRepository, typingIndicator, failoverHandler, acceptHtml)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.ChatManager.initialize()");

        // fields will overwrite or append to the corresponding fields in the chat state.
        $super(genericResponseBuilder, capabilityRepository, typingIndicator, failoverHandler);

        this._mimeType = acceptHtml ? this.HTML_MIME_TYPE_VALUE
                                    : this.PLAIN_TEXT_MIME_TYPE_VALUE;

        ININ.Web.Common.Debug.traceMethodExited("Json.ChatManager.initialize()");
    },

    // public methods

	/**
	 * Attempt to log in the specified participant
	 *
     * @param parameters An instance of ChatParameters
	 * @param callback Not to be confused with the callback interaction type.  This is a Javascript function which will be called upon completion of the login attempt (whether the attempt is successful or not).
	 */
    login: function(parameters)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.ChatManager.login()");

        // The idea here is that "chat state" conceptually contains the same data as a response may,
        // so we can just use a response object to represent it.  Each time a response comes in, its
        // fields will overwrite or append to the corresponding fields in the chat state.
        try
        {
            ININ.Web.Common.Debug.traceNote("Creating an empty WebSvcsJSONCommonRequest, to hold ININ.Web.Chat.WebServices.Json.ChatManager's state");
        }
        catch (e)
        {
            ININ.Web.Common.Debug.traceError("Caught unhandled exception:\n" + e);
            ININ.Web.Common.Debug.alert("Caught unhandled exception:\n" + e);
        }

        ININ.Web.Chat.WebServices.ChatManagerBase.prototype.login.call(this, parameters, callback);

        ININ.Web.Common.Debug.traceMethodExited("Json.ChatManager.login()");
    },

    /** 
     * Gets an JSON-specific instance of ININ.Web.Chat.WebServices.AjaxManagerBase
	 * This method should not be called directly by clients of the API. 
	 *  
	 * @param capability A Capability object representing what this AjaxManager object is intended to do (i.e. poll, send a message, etc.) 
	 * @return AjaxManager 
     */
    createAjaxManager : function(capability)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.ChatManager.createAjaxManager()");
        
        if(!capability)
        {
            ININ.Web.Common.Debug.traceError("null capability");
            ININ.Web.Common.Debug.breakpoint();
            ININ.Web.Chat.WebServices.ProblemReporter.sendProblemReport("null capability", "ChatManager.createAjaxManager()");
            return;
        }
        
        ININ.Web.Common.Debug.traceNote("capability=" + capability.toString());
        
        var mgr = new ININ.Web.Chat.WebServices.Json.AjaxManager(this._genericResponseBuilder, capability);
        ININ.Web.Common.Debug.traceMethodExited("Json.ChatManager.createAjaxManager()");
        return mgr;
    },

	/**
	 * Takes data necessary for a login, and puts it into the appropriate JSON format for sending to the IC server.
	 * 
     * @param parameters An instance of ChatParameters
	 * @return String in JSON format, appropriate for sending to IC server 
	 */
    serializeLoginPostData : function(parameters)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.ChatManager.serializeLoginPostData()");
        
        var json = {};

        json.supportedContentTypes = this._mimeType;
        
        json.participant = {};
        json.participant.name = parameters.get_participantName();
        json.participant.credentials = parameters.get_participantCredentials();

        json.target = parameters.get_target();
        json.targetType = parameters.get_targetType();

		if (parameters.get_customInfo())
	    {
			json.customInfo = parameters.get_customInfo();
		}

        if (Bootloader._localizationLanguageCode)
        {
            json.language = Bootloader._localizationLanguageCode;
        }
        else
        {
            ININ.Web.Common.Debug.traceWarning("Starting a chat, but no language has been specified.");
        }

        json.clientToken = "deprecated";

        ININ.Web.Common.Debug.traceMethodExited("Json.ChatManager.serializeLoginPostData()");
        return Object.toJSON(json);
    },
	
	serializeReconnectPostData : function(chatId)
	{
		ININ.Web.Common.Debug.traceMethodEntered("Json.ChatManager.serializeReconnectPostData()");
		
		var json = {};

        json.chatID = chatId;
		
		ININ.Web.Common.Debug.traceMethodExited("Json.ChatManager.serializeReconnectPostData()");
		return Object.toJSON(json);
	},

    /** 
     * Convert Javascript problem report to JSON 
     * @param problemReport An object containing arbitrary data about a problem encountered by the client
     * @return That object, represented as a JSON string 
     */
    serializeProblemReport : function(problemReport)
    {
        return Object.toJSON(problemReport);
    },

	/**
	 * Puts a message that the web user typed during a chat into the appropriate JSON format for sending to the IC server.
	 * 
	 * @param str The message that the web user typed
	 * @param isContentHtml True if the message is in HTML format, false if it is in plain text format.
	 * @return String in JSON format, appropriate for sending to IC server 
	 */
    serializeMessageToSend : function(str, isContentHtml)
    {
        var contentType = (isContentHtml ? this.HTML_MIME_TYPE_VALUE : this.PLAIN_TEXT_MIME_TYPE_VALUE);
        return Object.toJSON( { "message": str, "contentType": contentType } );
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Json");

/**
 * CallbackManager class 
 * Extends CallbackManagerBase with JSON-specific functionality
 */
ININ.Web.Chat.WebServices.Json.CallbackManager = Class.create(ININ.Web.Chat.WebServices.CallbackManagerBase,
{
	/**
	 * Constructor
	 * 
	 * @param genericResponseBuilder An instance of GenericResponseBuilder, to turn the JSON received from the IC server into a ResponseBase or subclass thereof
	 * @param capabilityRepository An instance of CapabilityRepository, in which the capabilities are stored.
     * @param failoverHandler An instance of ININ.Web.Chat.WebServices.Json.FailoverHandler 
	 */
    initialize: function($super, genericResponseBuilder, capabilityRepository, failoverHandler)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.CallbackManager.initialize()");

        $super(genericResponseBuilder, capabilityRepository, failoverHandler);

        ININ.Web.Common.Debug.traceMethodExited("Json.CallbackManager.initialize()");
    },

    // public methods

    /** 
     * Gets an JSON-specific instance of ININ.Web.Chat.WebServices.AjaxManagerBase
	 * This method should not be called directly by clients of the API. 
	 *  
	 * @param capability A Capability object representing what this AjaxManager object is intended to do (i.e. poll, send a message, etc.) 
	 * @return AjaxManager 
     */
    createAjaxManager : function(capability)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.CallbackManager.createAjaxManager()");
        var mgr = new ININ.Web.Chat.WebServices.Json.AjaxManager(this._genericResponseBuilder, capability);
        ININ.Web.Common.Debug.traceMethodExited("Json.CallbackManager.createAjaxManager()");
        return mgr;
    },

	/**
	 * Takes data necessary to create a callback, and puts it into the appropriate JSON format for sending to the IC server.
	 * 
     * @param parameters An instance of CallbackParameters
	 * @return String in JSON format, appropriate for sending to IC server 
	 */
    serializeCreateCallbackPostData : function(parameters)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.CallbackManager.serializeCreateCallbackPostData()");
        var json = { };

        json.target = parameters.get_target();
        json.targettype = parameters.get_targetType();
        json.subject = parameters.get_subject();

        json.participant = {};
        json.participant.name = parameters.get_participantName();
        json.participant.credentials = parameters.get_participantCredentials();
        json.participant.telephone = parameters.get_telephone();

		if (parameters.get_customInfo())
	    {
			json.customInfo = parameters.get_customInfo();
		}

        var attributes = parameters.get_attributes();
        if (attributes)
        {
            json.attributes = {};
            for (key in attributes)
            {
                var value = attributes[key];
                if (key.constructor === String && (value == null || value.constructor === String))
                {
                    json.attributes[key] = value;
                }
            }
        }

        var routingContexts = parameters.get_routingContexts();
        if (routingContexts && !routingContexts.isEmpty())
        {
            json.routingContexts = new Array();
            var categories = routingContexts.categories();
            for (var i=0; i<categories.length; i++)
            {
                var category = categories[i];
                var obj = {};
                obj.category = category;
                obj.context = routingContexts.getContext(category);
                json.routingContexts[i] = obj;
            }
        }

        if (Bootloader._localizationLanguageCode)
        {
            json.language = Bootloader._localizationLanguageCode;
        }
        else
        {
            ININ.Web.Common.Debug.traceWarning("Creating a callback, but no language has been specified.");
        }

        json.clientToken = "deprecated";

        ININ.Web.Common.Debug.traceMethodExited("Json.CallbackManager.serializeCreateCallbackPostData()");
        return Object.toJSON(json);
    },

    /**
     * Takes data necessary to reconnect to a callback, and puts 
     * it into the appropriate JSON format for sending to the IC server.
     *  
     * @param callbackId This was returned when the callback is created.
     */
    serializeReconnectPostData : function(callbackId)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.CallbackManager.serializeReconnectPostData()");
        var json = { };

        json.callbackID = callbackId;

        ININ.Web.Common.Debug.traceMethodExited("Json.CallbackManager.serializeReconnectPostData()");
        return Object.toJSON(json);
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Json");

/**
 * RegistrationManager class 
 * Extends RegistrationManagerBase with JSON-specific functionality
 */
ININ.Web.Chat.WebServices.Json.RegistrationManager = Class.create(ININ.Web.Chat.WebServices.RegistrationManagerBase,
{
	/**
	 * Constructor
	 * 
	 * @param genericResponseBuilder An instance of GenericResponseBuilder, to turn the JSON received from the IC server into a ResponseBase or subclass thereof
	 * @param capabilityRepository An instance of CapabilityRepository, in which the capabilities are stored.
     * @param failoverHandler An instance of ININ.Web.Chat.WebServices.Json.FailoverHandler 
	 */
    initialize: function($super, genericResponseBuilder, capabilityRepository, failoverHandler)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.RegistrationManager.initialize()");

        $super(genericResponseBuilder, capabilityRepository, failoverHandler);

        ININ.Web.Common.Debug.traceMethodExited("Json.RegistrationManager.initialize()");
    },

    // public methods

    /** 
     * Gets an JSON-specific instance of ININ.Web.Chat.WebServices.AjaxManagerBase
	 * This method should not be called directly by clients of the API. 
	 *  
	 * @param capability A Capability object representing what this AjaxManager object is intended to do (i.e. poll, send a message, etc.) 
	 * @return AjaxManager 
     */
    createAjaxManager : function(capability)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.RegistrationManager.createAjaxManager()");
        var mgr = new ININ.Web.Chat.WebServices.Json.AjaxManager(this._genericResponseBuilder, capability);
        ININ.Web.Common.Debug.traceMethodExited("Json.RegistrationManager.createAjaxManager()");
        return mgr;
    },

	/**
	 * Takes data necessary for a registration, and puts it into the appropriate JSON format for sending to the IC server.
	 * 
	 * @param username The username of the person attempting to register
	 * @param password The password of the person attempting to register
	 * @param firstName The first name of the person attempting to register
	 * @param middleName The middle name of the person attempting to register
	 * @param lastName The last name of the person attempting to register
	 * @param homeStreetAddress The street address of the person attempting to register
	 * @param homeCity The city of the person attempting to register
	 * @param homeState The state/province/territory of the person attempting to register
	 * @param homePostalCode The postal code of the person attempting to register
	 * @param homeCountry The country of the person attempting to register
	 * @param homeEmail The email address of the person attempting to register
	 * @param homePhone The home telephone number of the person attempting to register
	 * @param homePhone2 The secondary home telephone number of the person attempting to register
	 * @param homeFax The home fax number of the person attempting to register
	 * @param homePager The home pager number of the person attempting to register
	 * @param homeMobile The personal mobile telephone number of the person attempting to register
	 * @param homeUrl The personal URL of the person attempting to register
	 * @param department The department (of their company) of the person attempting to register
	 * @param company The company for which the person attempting to register works
	 * @param jobTitle The job title of the person attempting to register
	 * @param assistantName The name of the assistant of the person attempting to register
	 * @param assistantPhone The telephone number of the assistant of the person attempting to register
	 * @param businessStreetAddress The street address of the company 
	 * @param businessCity The city in which the company is located
	 * @param businessState The state/province/territory in which the company is located
	 * @param businessPostalCode The postal code of the company
	 * @param businessCountry The country in which the company is located
	 * @param businessEmail The business email address of the person attempting to register
	 * @param businessPhone The business telephone number of the person attempting to register
	 * @param businessPhone2 The secondary business telephone number of the person attempting to register
	 * @param businessFax The business fax number of the person attempting to register
	 * @param businessPager The business pager number of the person attempting to register
	 * @param businessMobile The business mobile telephone number of the person attempting to register
	 * @param businessUrl The business URL of the person attempting to register
	 * @param remarks Freeform string
	 * @return String in JSON format, appropriate for sending to IC server 
	 */
    serializeRegistrationPostData : function(username, password,
                                             firstName, middleName, lastName,
                                             homeStreetAddress, homeCity, homeState, homePostalCode, homeCountry,
                                             homeEmail, homePhone, homePhone2, homeFax, homePager, homeMobile, homeUrl,
                                             department, company, jobTitle,
                                             assistantName, assistantPhone,
                                             businessStreetAddress, businessCity, businessState, businessPostalCode, businessCountry,
                                             businessEmail, businessPhone, businessPhone2, businessFax, businessPager, businessMobile,
                                             businessUrl, remarks)
    {
        var json = { };
        
        json.contact = { };

        json.contact.username = username;
        json.contact.password = password;

        json.contact.firstName = firstName;
        json.contact.middleName = middleName;
        json.contact.lastName = lastName;
        
        json.contact.homeStreetAddress = homeStreetAddress;
        json.contact.homeCity = homeCity;
        json.contact.homeState = homeState;
        json.contact.homePostalCode = homePostalCode;
        json.contact.homeCountry = homeCountry;

        json.contact.homeEmail = homeEmail;
        json.contact.homePhone = homePhone;
        json.contact.homePhone2 = homePhone2;
        json.contact.homeFax = homeFax;
        json.contact.homePager = homePager;
        json.contact.homeMobile = homeMobile;
        json.contact.homeURL = homeUrl;

        json.contact.department = department;
        json.contact.company = company;
        json.contact.jobTitle = jobTitle;

        json.contact.assistantName = assistantName;
        json.contact.assistantPhone = assistantPhone;

        json.contact.businessStreetAddress = businessStreetAddress;
        json.contact.businessCity = businessCity;
        json.contact.businessState = businessState;
        json.contact.businessPostalCode = businessPostalCode;
        json.contact.businessCountry = businessCountry;

        json.contact.businessEmail = businessEmail;
        json.contact.businessPhone = businessPhone;
        json.contact.businessPhone2 = businessPhone2;
        json.contact.businessFax = businessFax;
        json.contact.businessPager = businessPager;
        json.contact.businessMobile = businessMobile;
        json.contact.businessURL = businessUrl;

        json.contact.remarks = remarks;

        return Object.toJSON(json);
    }
});

/*g

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Json");

/**
 * PartyManager class 
 * Extends PartyManagerBase with JSON-specific functionality
 */
ININ.Web.Chat.WebServices.Json.PartyManager = Class.create(ININ.Web.Chat.WebServices.PartyManagerBase,
{
	/**
	 * Constructor
	 * 
	 * @param genericResponseBuilder An instance of GenericResponseBuilder, to turn the JSON received from the IC server into a ResponseBase or subclass thereof
	 * @param capabilityRepository An instance of CapabilityRepository, in which the capabilities are stored.
	 * @param failoverHandler In charge of connecting to the other server if the current one goes down for some reason. 
	 */
    initialize: function($super, genericResponseBuilder, capabilityRepository, failoverHandler)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.PartyManager.initialize()");

        $super(genericResponseBuilder, capabilityRepository, failoverHandler);

        ININ.Web.Common.Debug.traceMethodExited("Json.PartyManager.initialize()");
    },

    // public methods

    /** 
     * Gets an JSON-specific instance of ININ.Web.Chat.WebServices.AjaxManagerBase
	 * This method should not be called directly by clients of the API. 
	 *  
	 * @param capability A Capability object representing what this AjaxManager object is intended to do (i.e. poll, send a message, etc.) 
	 * @return AjaxManager 
     */
    createAjaxManager : function(capability)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.PartyManager.createAjaxManager()");
        var mgr = new ININ.Web.Chat.WebServices.Json.AjaxManager(this._genericResponseBuilder, capability);
        ININ.Web.Common.Debug.traceMethodExited("Json.PartyManager.createAjaxManager()");
        return mgr;
    },

	/**
     * Takes data necessary to query a party's info (name and photo), and puts it into 
     * the appropriate JSON format for sending to the IC server.
	 * 
     * @param participantId The participantId of the agent whose info is being queried. 
	 * @return String in JSON format, appropriate for sending to IC server 
	 */
    serializeGetPartyInfoPostData : function(participantId)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.PartyManager.serializeGetPartyInfoPostData()");
        var json = { };

        json.participantID = participantId;

        ININ.Web.Common.Debug.traceMethodExited("Json.PartyManager.serializeCreateCallbackPostData()");
        return Object.toJSON(json);
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.Json");

/**
 * ProblemReporter class 
 * Extends ProblemReporterBase with JSON-specific functionality
 */
ININ.Web.Chat.WebServices.Json._Internal._ProblemReporter = Class.create(ININ.Web.Chat.WebServices._Internal._ProblemReporterBase,
{
	/**
	 * Constructor
	 * 
	 */
    initialize: function($super)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.ProblemReporter.initialize()");

        $super();

        ININ.Web.Common.Debug.traceMethodExited("Json.ProblemReporter.initialize()");
    },

    // public methods

    /** 
     * Gets an JSON-specific instance of ININ.Web.Chat.WebServices.AjaxManagerBase
	 * This method should not be called directly by clients of the API. 
	 *  
	 * @return AjaxManager 
     */
    createAjaxManager : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("Json.ChatManager.createAjaxManager()");
       
        var capability = ININ.Web.Chat.WebServices.CapabilityRepository.get_problemReportCapability();
        var mgr = new ININ.Web.Chat.WebServices.Json.AjaxManager(this, capability, null, this);
        ININ.Web.Common.Debug.traceMethodExited("Json.ChatManager.createAjaxManager()");
        return mgr;
    },

    /** 
     * Convert Javascript problem report to JSON 
     * @param problemReport An object containing arbitrary data about a problem encountered by the client
     * @return That object, represented as a JSON string, concatenated to a maximum length of 15KB
     */
    serializeProblemReport : function(problemReport)
    {
        var string = Object.toJSON(problemReport);
        return string.substr(0,15359);
    },

    /**
     * Problem report is not expected to send any content in its response. 
     * So, as long as the HTTP status code is 200, build an empty response object indicating success. 
     * Otherwise, build one indicating failure and the received HTTP response code.
     */
    buildResponseFromRequest : function(xmlHttpRequest)
    {
        var response = new ININ.Web.Chat.WebServices.ResponseBase();
        if(xmlHttpRequest && xmlHttpRequest.status == 200)
        {
            response.set_statusType(ININ.Web.Chat.WebServices.ResponseBase.STATUS_TYPE_SUCCESS);
        }
        else
        {
            response.xmlHttpRequest = xmlHttpRequest;
            response.set_statusType(ININ.Web.Chat.WebServices.ResponseBase.STATUS_TYPE_FAILURE);
            var errorCode = ININ.Web.Chat.WebServices.ErrorCodes.ERROR + '.' + ININ.Web.Chat.WebServices.ErrorCodes.HTTP;
            response.set_statusReason(new ININ.Web.Chat.WebServices.Error(errorCode));
        }
        return response;
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");

/**
 * ParticipantDisplayNameFormatter class 
 *  
 * Conversions to display a Participant's name in a visually appealing format. 
 * Currently just displays the name if it is known, or "User " followed by the ID if the name is not known. 
 * But, could be extended, for instance if Participant were extended to include first name, last name, job title, etc. 
 */
ININ.Web.Chat.WebServices._Internal._ParticipantDisplayNameFormatter = Class.create(ININ.Web.Common.InterfaceImplementation,
{
	/**
	 * Constructor
	 * 
	 * @param participantRepository Instance of a subclass of ParticipantRepositoryBase
	 */
    initialize : function($super, participantRepository)
    {
        var numArgs = 2;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ParticipantDisplayNameFormatter constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }

        ININ.Web.Common.Interface.ensureImplements(participantRepository, [ININ.Web.Chat.WebServices.Interfaces.IParticipantRepository]);

        $super();

        // initialize private members
        this._participantRepository = participantRepository;
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Common.InterfaceImplementation.prototype.destroy.call(this);
    },

    // public methods

	/**
	 * Creates a display name, given a participant's ID and their name. 
	 *  
	 * @param id The ID of a participant.
	 * @param name The name of that participant.
	 * @return A string that identifies this participant as well as possible given the values passed in.
	 */
    formatDisplayNameFromIdAndName : function(id, name)
    {
        if(name)
        {
            return name;
        }

        return "User " + id;
    },
    
	/**
	 * Creates a display name, given a participant's ID and their name. 
	 *  
	 * @param id The ID of a participant.
	 * @return A string that identifies this participant as well as possible given the values passed in.
	 */
    formatDisplayNameFromId : function(id)
    {
        var name;
        var participant = this._participantRepository.get_participant(id);
        if(participant)
        {
            name = participant.get_name();
        }

        return this.formatDisplayNameFromIdAndName(id, name);
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

// TODO: This class doesn't seem like it's used anywhere.  Safe to remove?

/**
 * ServiceLocator class 
 * Provides a way to store and retrieve singletons by type 
 */
ININ.Web.Chat.WebServices.ServiceLocator = function()
{
    // public methods

    return {
		/**
		 * Register a singleton 
		 *  
		 * @param type The type of singleton that is being registered
		 * @param instance The singleton that is being registered
		 */
        register : function(type, instance)
        {
            ININ.Web.Common.IoC.registerSingletonInstance(type, instance);
        },

		/**
		 * Retrieve a previously-registered singleton 
		 *  
		 * @param type The type of the singleton that is to be retrieved 
		 * @return Whatever was previously associated with this type by a call to register() 
		 */
        get : function(type)
        {
            return ININ.Web.Common.IoC.getSingleton(type);
        },

		/**
		 * Unregister a previously registered singleton 
		 *  
		 * @param type The type of singleton to be unregistered.  Whatever was previously associated with this type by a call to register() will no longer be associated. 
		 */
        remove : function(type)
        {
            return ININ.Web.Common.IoC.removeSingleton(type);
        }
    };
}();

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices._Internal");
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices");

/** 
 * A "command" is logically a tuple of a parameterless function, and a string which a user can 
 * type in the chat to cause that function to be called. 
 *  
 * This class represents a list of all such commands. 
 *  
 * It also is an observer for IReceivedCommandNotification - when it receives one, it executes the command.
 *  
 * Don't use this directly, use the singleton ININ.Web.Chat.WebServices.CommandRepository. 
 */
ININ.Web.Chat.WebServices._Internal._CommandRepository = Class.create(ININ.Web.Common.InterfaceImplementation,
{
	/**
     * Constructor 
	 */
    initialize : function($super)
    {
        $super();

        this._commands = new Hash();

        this.registerCommand("set tracelevel all",
                             function()
                             {
                                 ININ.Web.Common.Debug.setTraceLevel(ININ.Web.Common.TraceLevels.ALL);
                             });
        this.registerCommand("set tracelevel verbose",
                             function()
                             {
                                 ININ.Web.Common.Debug.setTraceLevel(ININ.Web.Common.TraceLevels.VERBOSE_NOTE);
                             });
        this.registerCommand("set tracelevel note",
                             function()
                             {
                                 ININ.Web.Common.Debug.setTraceLevel(ININ.Web.Common.TraceLevels.NOTE);
                             });
        this.registerCommand("set tracelevel status",
                             function()
                             {
                                 ININ.Web.Common.Debug.setTraceLevel(ININ.Web.Common.TraceLevels.STATUS);
                             });
        this.registerCommand("set tracelevel warning",
                             function()
                             {
                                 ININ.Web.Common.Debug.setTraceLevel(ININ.Web.Common.TraceLevels.WARNING);
                             });
        this.registerCommand("set tracelevel error",
                             function()
                             {
                                 ININ.Web.Common.Debug.setTraceLevel(ININ.Web.Common.TraceLevels.ERROR);
                             });
        this.registerCommand("set tracelevel critical",
                             function()
                             {
                                 ININ.Web.Common.Debug.setTraceLevel(ININ.Web.Common.TraceLevels.CRITICAL_ERROR);
                             });

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IReceivedCommandNotificationObserver);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerReceivedCommandNotificationObserver(this);
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
	},

	/**
     * Adds a command to the repository
     *  
     * @param string The string which, if typed in the chat, will cause the (parameterless) function to be called.
     * @param fn The function that will be called if the string is typed in the chat.  This function should take no parameters, but may return a value.
	 */
    registerCommand : function(string, fn)
    {
        // It would be nice to use an associative array
        this._commands.set(string, fn);
    },

    /**
     * Implementation of IReceivedCommandNotificationObserver 
     * Executes the command that was received 
     * 
	 * @param notification Something that implements IReceivedCommandNotification
     */
    processReceivedCommandNotification : function(notification)
    {
        this.execute(notification.get_command());
    },

    /**
     * Returns whether or not a string is associated with a command.
     * 
     * @param string A string which may or may not have a function associated with it.
     * @return true if the string has a function associated with it, false if not. 
     */
    isCommand : function(string)
    {
        return (-1 != this._commands.keys().indexOf(string));
    },

    /**
     * Executes the function associated with the passed string. 
     *  
     * @param string A string which should have a function associated with it.  If not, no action will be performed. 
     * @return Whatever the function returns.  Throws an exception if the string does not describe a function.
     */
    execute : function(string)
    {
        ININ.Web.Common.Debug.traceMethodEntered("CommandRepository.execute()");

        if (!this.isCommand(string))
        {
            ININ.Web.Common.Debug.traceError("CommandRepository.execute() called on non-existent command.");
            throw ININ.Web.Common.ExceptionFactory.createException("CommandRepository.execute() called on non-existent command.");
        }

        ININ.Web.Common.Debug.traceStatus("Going to execute command: " + string);

        var fn = this._commands.get(string);
        if (null != fn)
        {
            return fn();
        }

        ININ.Web.Common.Debug.traceMethodExited("CommandRepository.execute()");
    }
});

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.WebServices.WebServicesInitialization");

/**
 * Create objects necessary for the chat
 * 
 * @param currentUriFragment The URI fragment currently in use to reverse proxy to the IC server.  See Servers class.
 * @param uriFragments The set of URI fragments that are used to reverse proxy to the IC server(s).  See Servers class.
 * @param useHttps If true, AJAX requests will be made via HTTPS.  If false, they will be made via HTTP.
 */
ININ.Web.Chat.WebServices.WebServicesInitialization.initialize = function(currentUriFragment, uriFragments, useHttps)
{
    // Factories which can be overridden for customization
    ININ.Web.Chat.WebServices.CustomizationFactoryRegistry = new ININ.Web.Chat.WebServices._Internal._CustomizationFactoryRegistry();

    // This factory does not create singletons
    ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.registerFactory(ININ.Web.Chat.WebServices.CustomizableFactoryTypes.RegistrationFormPanel, new ININ.Web.Chat.Customizations.RegistrationFormPanelFactory());

    // These factories create singletons
    ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.registerSingletonFactory(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.Linkifier, new ININ.Web.Chat.Customizations.LinkifierFactory());
    ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.registerSingletonFactory(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.LoginInfoSource, new ININ.Web.Chat.Customizations.LoginInfoSourceFactory());
    ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.registerSingletonFactory(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths, new ININ.Web.Chat.Customizations.MaximumFieldLengthsFactory());
    ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.registerSingletonFactory(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.RetryCounts, new ININ.Web.Chat.Customizations.RetryCountsFactory());
    ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.registerSingletonFactory(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.StatusFieldsDisplay, new ININ.Web.Chat.Customizations.StatusFieldsDisplayFactory());
    ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.registerSingletonFactory(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.TabVisibility, new ININ.Web.Chat.Customizations.TabVisibilityFactory());

    // create singletons
    ININ.Web.Chat.WebServices.ParticipantRepository = new ININ.Web.Chat.WebServices._Internal._ParticipantRepository();
    ININ.Web.Chat.WebServices.ReceivedUrlRepository = new ININ.Web.Chat.WebServices._Internal._ReceivedUrlRepository();
    ININ.Web.Chat.WebServices.ReceivedMessageRepository = new ININ.Web.Chat.WebServices._Internal._ReceivedMessageRepository();
    ININ.Web.Chat.WebServices.PollManager = new ININ.Web.Chat.WebServices._Internal._PollManager();
    ININ.Web.Chat.WebServices.NotificationRegistry = new ININ.Web.Chat.WebServices._Internal._NotificationRegistry();
    ININ.Web.Chat.WebServices.CapabilityRepository = new ININ.Web.Chat.WebServices._Internal._CapabilityRepository();
    ININ.Web.Chat.WebServices.Json.GenericResponseBuilder = new ININ.Web.Chat.WebServices.Json._Internal.GenericResponseBuilder(
                                    new ININ.Web.Chat.WebServices.Json._Internal.ChatResponseBuilder(new ININ.Web.Chat.WebServices.Json.EventFactory()),
                                    new ININ.Web.Chat.WebServices.Json._Internal.CallbackResponseBuilder(),
                                    new ININ.Web.Chat.WebServices.Json._Internal.RegistrationResponseBuilder(),
                                    new ININ.Web.Chat.WebServices.Json._Internal.ServerConfigurationResponseBuilder(),
                                    new ININ.Web.Chat.WebServices.Json._Internal.PartyInfoResponseBuilder(),
                                    new ININ.Web.Chat.WebServices.Json._Internal.QueueQueryResponseBuilder());
    ININ.Web.Chat.WebServices.Json.ServerConfigurationProcessor = new ININ.Web.Chat.WebServices.Json._Internal.ServerConfigurationProcessor(ININ.Web.Chat.WebServices.CapabilityRepository);
    ININ.Web.Chat.WebServices.Json.ServerConfigurationManager = new ININ.Web.Chat.WebServices.Json._Internal._ServerConfigurationManager(ININ.Web.Chat.WebServices.Json.GenericResponseBuilder, ININ.Web.Chat.WebServices.CapabilityRepository, ININ.Web.Chat.WebServices.Json.ServerConfigurationProcessor);
    ININ.Web.Chat.WebServices.Json.FailoverHandler = new ININ.Web.Chat.WebServices.Json._Internal._FailoverHandler(ININ.Web.Chat.WebServices.Json.GenericResponseBuilder, ININ.Web.Chat.WebServices.CapabilityRepository);
    ININ.Web.Chat.WebServices.Json.TypingIndicator = new ININ.Web.Chat.WebServices.Json._Internal._TypingIndicator();
    ININ.Web.Chat.WebServices.ParticipantDisplayNameFormatter = new ININ.Web.Chat.WebServices._Internal._ParticipantDisplayNameFormatter(ININ.Web.Chat.WebServices.ParticipantRepository);
    ININ.Web.Chat.WebServices.CommandRepository = new ININ.Web.Chat.WebServices._Internal._CommandRepository();

    // Set up protocol/servers
    ININ.Web.Chat.WebServices.Servers.UriFragments = uriFragments;
    ININ.Web.Chat.WebServices.Servers.UseHttps = (useHttps == true);

    // use the server as the current uri fragment if it's specified in the query string, else use the one loaded from the page
    var server = ININ.Web.Common.Utilities.getQueryStringValue("server");
    if(server)
    {
        ININ.Web.Chat.WebServices.Servers.CurrentUriFragment = server;
    }
    else
    {
        ININ.Web.Chat.WebServices.Servers.CurrentUriFragment = currentUriFragment;
    }

    ININ.Web.Chat.WebServices.EventProcessor = new ININ.Web.Chat.WebServices._Internal._EventProcessor(ININ.Web.Chat.WebServices.NotificationRegistry, ININ.Web.Chat.WebServices.ParticipantRepository);
    ININ.Web.Chat.WebServices.EventSequenceManager = new ININ.Web.Chat.WebServices._Internal._EventSequenceManager(ININ.Web.Chat.WebServices.EventProcessor);
    ININ.Web.Chat.WebServices.ProblemReporter = new ININ.Web.Chat.WebServices.Json._Internal._ProblemReporter();

    // TODO: the capabilities don't change now, they are simply enabled or disabled based on which server the chat is pointed at
    // so should these objects still 'observe' changes? I guess we only need to support this when we support failover
    // TODO: Support failover
//    ININ.Web.Chat.WebServices.CapabilityRegistry.registerPollCapabilityObserver(ININ.Web.Chat.WebServices.CapabilityRepository);
//    ININ.Web.Chat.WebServices.CapabilityRegistry.registerSendMessageCapabilityObserver(ININ.Web.Chat.WebServices.CapabilityRepository);
//    ININ.Web.Chat.WebServices.CapabilityRegistry.registerTypingIndicatorCapabilityObserver(ININ.Web.Chat.WebServices.CapabilityRepository);
//    ININ.Web.Chat.WebServices.CapabilityRegistry.registerExitChatCapabilityObserver(ININ.Web.Chat.WebServices.CapabilityRepository);

    ININ.Web.Chat.WebServices.NotificationRegistry.registerFailoverNotificationObserver(ININ.Web.Chat.WebServices.Json.FailoverHandler);
    ININ.Web.Chat.WebServices.NotificationRegistry.registerChatReconnectFailureNotificationObserver(ININ.Web.Chat.WebServices.Json.FailoverHandler);
    
    ININ.Web.Chat.WebServices.NotificationRegistry.registerReceivedTextNotificationObserver(ININ.Web.Chat.WebServices.ReceivedMessageRepository);
    ININ.Web.Chat.WebServices.NotificationRegistry.registerReceivedUrlNotificationObserver(ININ.Web.Chat.WebServices.ReceivedMessageRepository);
    ININ.Web.Chat.WebServices.NotificationRegistry.registerReceivedFileNotificationObserver(ININ.Web.Chat.WebServices.ReceivedMessageRepository);

    ININ.Web.Chat.WebServices.NotificationRegistry.registerReceivedUrlNotificationObserver(ININ.Web.Chat.WebServices.ReceivedUrlRepository);

    ININ.Web.Chat.WebServices.ChatPropertyUpdateRegistry.registerPollWaitSuggestionUpdateObserver(ININ.Web.Chat.WebServices.PollManager);
    ININ.Web.Chat.WebServices.NotificationRegistry.registerFailoverNotificationObserver(ININ.Web.Chat.WebServices.PollManager);
    ININ.Web.Chat.WebServices.NotificationRegistry.registerChatReconnectNotificationObserver(ININ.Web.Chat.WebServices.PollManager);
    ININ.Web.Chat.WebServices.NotificationRegistry.registerRefreshPageNotificationObserver(ININ.Web.Chat.WebServices.PollManager);

    ININ.Web.Chat.WebServices.NotificationRegistry.registerCurrentParticipantIdChangedNotificationObserver(ININ.Web.Chat.WebServices.ParticipantRepository);
    ININ.Web.Chat.WebServices.NotificationRegistry.registerNewParticipantNotificationObserver(ININ.Web.Chat.WebServices.ParticipantRepository);
    ININ.Web.Chat.WebServices.NotificationRegistry.registerParticipantJoinedNotificationObserver(ININ.Web.Chat.WebServices.ParticipantRepository);
    ININ.Web.Chat.WebServices.NotificationRegistry.registerParticipantLeftNotificationObserver(ININ.Web.Chat.WebServices.ParticipantRepository);
    ININ.Web.Chat.WebServices.NotificationRegistry.registerParticipantNameChangedNotificationObserver(ININ.Web.Chat.WebServices.ParticipantRepository);
};

ININ.Web.Chat.WebServices.WebServicesInitialization.uninitialize = function()
{
    ININ.Web.Chat.WebServices.Servers.UseHttps = false;
    ININ.Web.Chat.WebServices.Servers.CurrentUriFragment = "";
    ININ.Web.Chat.WebServices.Servers.UriFragments = [];
    
    // TODO: the capabilities don't change now, they are simply enabled or disabled based on which server the chat is pointed at
    // so should these objects still 'observe' changes? I guess we only need to support this when we support failover
    // TODO: Support failover
//    ININ.Web.Chat.WebServices.CapabilityRegistry.registerPollCapabilityObserver(ININ.Web.Chat.WebServices.CapabilityRepository);
//    ININ.Web.Chat.WebServices.CapabilityRegistry.registerSendMessageCapabilityObserver(ININ.Web.Chat.WebServices.CapabilityRepository);
//    ININ.Web.Chat.WebServices.CapabilityRegistry.registerTypingIndicatorCapabilityObserver(ININ.Web.Chat.WebServices.CapabilityRepository);
//    ININ.Web.Chat.WebServices.CapabilityRegistry.registerExitChatCapabilityObserver(ININ.Web.Chat.WebServices.CapabilityRepository);

    ININ.Web.Chat.WebServices.NotificationRegistry.unregisterReceivedTextNotificationObserver(ININ.Web.Chat.WebServices.ReceivedMessageRepository);
    ININ.Web.Chat.WebServices.NotificationRegistry.unregisterReceivedUrlNotificationObserver(ININ.Web.Chat.WebServices.ReceivedMessageRepository);
    ININ.Web.Chat.WebServices.NotificationRegistry.unregisterReceivedFileNotificationObserver(ININ.Web.Chat.WebServices.ReceivedMessageRepository);

    ININ.Web.Chat.WebServices.NotificationRegistry.unregisterReceivedUrlNotificationObserver(ININ.Web.Chat.WebServices.ReceivedUrlRepository);

    ININ.Web.Chat.WebServices.ChatPropertyUpdateRegistry.unregisterPollWaitSuggestionUpdateObserver(ININ.Web.Chat.WebServices.PollManager);
    
    ININ.Web.Chat.WebServices.NotificationRegistry.unregisterParticipantJoinedNotificationObserver(ININ.Web.Chat.WebServices.ParticipantRepository);
    ININ.Web.Chat.WebServices.NotificationRegistry.unregisterParticipantLeftNotificationObserver(ININ.Web.Chat.WebServices.ParticipantRepository);
    ININ.Web.Chat.WebServices.NotificationRegistry.unregisterParticipantNameChangedNotificationObserver(ININ.Web.Chat.WebServices.ParticipantRepository);
};

/**
 * Clean up objects used by the chat.
 */
ININ.Web.Chat.WebServices.WebServicesInitialization.destroy = function()
{
//    are there more that should be here?
//    
//    I need to be called in the single page AJAX index.html as well

    ININ.Web.Chat.WebServices.CapabilityRepository.destroy();
    delete ININ.Web.Chat.WebServices.CapabilityRepository;
    ININ.Web.Chat.WebServices.CapabilityRepository = undefined;

    ININ.Web.Chat.WebServices.Json.TypingIndicator.destroy();
    delete ININ.Web.Chat.WebServices.Json.TypingIndicator;
    ININ.Web.Chat.WebServices.Json.TypingIndicator = undefined;

    ININ.Web.Chat.WebServices.Json.FailoverHandler.destroy();
    delete ININ.Web.Chat.WebServices.Json.FailoverHandler;
    ININ.Web.Chat.WebServices.Json.FailoverHandler = undefined;

    ININ.Web.Chat.WebServices.EventProcessor.destroy();
    delete ININ.Web.Chat.WebServices.EventProcessor;
    ININ.Web.Chat.WebServices.EventProcessor = undefined;

    ININ.Web.Chat.WebServices.EventSequenceManager.destroy();
    delete ININ.Web.Chat.WebServices.EventSequenceManager;
    ININ.Web.Chat.WebServices.EventSequenceManager = undefined;

    ININ.Web.Chat.WebServices.ParticipantRepository.destroy();
    delete ININ.Web.Chat.WebServices.ParticipantRepository;
    ININ.Web.Chat.WebServices.ParticipantRepository = undefined;

    ININ.Web.Chat.WebServices.PollManager.destroy();
    delete ININ.Web.Chat.WebServices.PollManager;
    ININ.Web.Chat.WebServices.PollManager = undefined;

    ININ.Web.Chat.WebServices.ReceivedMessageRepository.destroy();
    delete ININ.Web.Chat.WebServices.ReceivedMessageRepository;
    ININ.Web.Chat.WebServices.ReceivedMessageRepository = undefined;

    ININ.Web.Chat.WebServices.ReceivedUrlRepository.destroy();
    delete ININ.Web.Chat.WebServices.ReceivedUrlRepository;
    ININ.Web.Chat.WebServices.ReceivedUrlRepository = undefined;

    ININ.Web.Chat.WebServices.ProblemReporter.destroy();
    delete ININ.Web.Chat.WebServices.ProblemReporter
    ININ.Web.Chat.WebServices.ProblemReporter = undefined;

    // Factories for customization
    ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.destroy();
    delete ININ.Web.Chat.WebServices.CustomizationFactoryRegistry;
    ININ.Web.Chat.WebServices.CustomizationFactoryRegistry = undefined;
};

Bootloader.onLoadedWebServices();


