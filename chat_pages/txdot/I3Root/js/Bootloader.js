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
var ININ_Web_Chat_Bootloader_Fileversion = "4.0004.0017.316"; 


/*global ININ: true, Class: true, debug: true, navigator: true, window: true */

/**
 * Bootloader class 
 * This handles bootstrapping this web application, including methods to read the config file, load the various 
 * components of Interaction Web Tools, query whether components have been loaded, and notify the caller when loading is 
 * complete. 
 */ 
Bootloader = new Object();

// private members
Bootloader._configLoaded = false;
Bootloader._externalLoaded = false;
Bootloader._webServicesLoaded = false;
Bootloader._localizationLoaded = false;
Bootloader._localizationCustomizationLoaded = false;
Bootloader._uiLoaded = false;
Bootloader._ckEditorLoaded = false;
Bootloader._customizationsLoaded = false;

Bootloader._configLoading = false;
Bootloader._externalLoading = false;
Bootloader._webServicesLoading = false;
Bootloader._localizationLoading = false;
Bootloader._localizationCustomizationLoading = false;
Bootloader._uiLoading = false;
Bootloader._ckEditorLoading = false;
Bootloader._customizationsLoading = false;

Bootloader._flagConfig = false;
Bootloader._flagExternal = false;
Bootloader._flagWebServices = false;
Bootloader._flagLocalization = false;
Bootloader._flagLocalizationCustomization = false;
Bootloader._flagUI = false;
Bootloader._flagCKEditor = false;
Bootloader._flagCustomizations = false;

// If user clicks customized French flag icon or "chat in French" link, this is where "FR" gets stored.
Bootloader._languageCode = null;

// This will end up being the directory in which whatever HTML file that contains <script src="somewhere/Bootloader.js"> is located.
Bootloader._basePath = "./js";

// How long to wait after calling _loadScript() before checking to see if the file has finished loading.
Bootloader._scriptLoadWaitTimeMilliseconds = 500;

// How long to wait after calling _loadScript() before informing the user that the script is taking too long to load, and may never finish.
Bootloader._scriptSlowLoadWarningTimeMilliseconds = 15000;

// How many times we should attempt to load each resource file.
Bootloader._localizationLoadAttemptsPerLanguage = 3;

// Index into list of user's preferred languages of the language that we're currently trying to load.
Bootloader._localizationCurrentLanguageIndex = 0;

// How many times we've attempted to load the resources for the language we're currently trying.
Bootloader._localizationCurrentLanguageAttempts = 0;

// Timer to handle informing the user if config takes too long to load
Bootloader._configSlowLoadTimer = null;

// Timer to handle informing the user if external components take too long to load
Bootloader._externalSlowLoadTimer = null;

// Timer to handle informing the user if WebServices.js takes too long to load
Bootloader._webServicesSlowLoadTimer = null;

// Timer to handle informing the user if localization customization takes too long to load
Bootloader._localizationCustomizationSlowLoadTimer = null;

// Timer to handle informing the user if UI takes too long to load
Bootloader._uiSlowLoadTimer = null;

// Timer to handle informing the user if WYSIWYG editor takes too long to load
Bootloader._ckEditorSlowLoadTimer = null; 

// Timer to handle informing the user if built-in customization mechanism takes too long to load
Bootloader._customizationsSlowLoadTimer = null; 

// methods

/**
 * If customers wish to change the strings in localization.(languagecode).js, they should not 
 * modify these files directly!  If this is done, the customizations may be overwritten during 
 * installation of a future SU. 
 * Instead, these overrides should be made in localizationCustomization.(languagecode).js. 
 * @param shouldLoadLocalizationCustomization Boolean.  If true, an attempt to load localizationCustomization.(languagecode).js will be made.
 */
Bootloader.setShouldLoadLocalizationCustomization = function(shouldLoadLocalizationCustomization)
{
    Bootloader._flagLocalizationCustomization = shouldLoadLocalizationCustomization;
};

/**
 * Loads all available components of this web application.  A callback method may be supplied. 
 *  
 * Note that while localization will be loaded, localization customizations will not be loaded unless 
 * setShouldLoadLocalizationCustomization(true) is called. 
 * 
 * @param callback If this parameter is supplied, this method will be called once the components have finished loading.
 */
Bootloader.loadAll = function(callback)
{
    Bootloader._callback = callback;

    Bootloader._flagConfig = true;
    Bootloader._flagExternal = true;
    Bootloader._flagWebServices = true;
    Bootloader._flagLocalization = true;
    Bootloader._flagUI = true;
    Bootloader._flagCKEditor = true;
    Bootloader._flagCustomizations = true;

    // External and CKEditor don't have any dependencies so load them first
    Bootloader._loadExternal();
    Bootloader._loadCKEditor();

    Bootloader._checkForCompletion();
};

/**
 * Loads all available components of this web application, except localization.  A callback method may be supplied. 
 * This is useful for applications in which WebServices functionality must be used to determine which language to localize to. 
 *  
 * It's just called load() because it's what is used by the default implementation.  The default implementation loads localization 
 * separately. 
 *  
 * @param callback If this parameter is supplied, this method will be called once the components have finished loading.
 */
Bootloader.load = function(callback)
{
    Bootloader._callback = callback;

    Bootloader._flagConfig = true;
    Bootloader._flagExternal = true;
    Bootloader._flagWebServices = true;
    Bootloader._flagLocalization = false;
    Bootloader._flagUI = true;
    Bootloader._flagCKEditor = false;
    Bootloader._flagCustomizations = true;

    // External and CKEditor don't have any dependencies so load them first
    Bootloader._loadExternal();

    Bootloader._checkForCompletion();
};

/**
 * This may be called to load localization, if it wasn't loaded previously. 
 * Rather than calling loadAll(), the default implementation calls load(), performs other tasks, and then calls this.
 * 
 * @param callback If this parameter is supplied, this method will be called once the components have finished loading.
 */
Bootloader.loadLocalization = function(callback)
{
    ININ.Web.Common.Debug.traceMethodEntered("Bootloader.loadLocalization()");
    Bootloader._localizationCallback = callback;
    Bootloader._checkForLocalizationCompletion();
    ININ.Web.Common.Debug.traceMethodExited("Bootloader.loadLocalization()");
}

Bootloader._checkForLocalizationCompletion = function()
{
    ININ.Web.Common.Debug.traceMethodEntered("Bootloader._checkForLocalizationCompletion()");
    if(Bootloader.isLocalizationLoaded())
    {
        ININ.Web.Common.Debug.traceStatus("Localization has been loaded.  Language: " + Bootloader._localizationLanguageCode);
        if(Bootloader._flagLocalizationCustomization)
        {
            if(!Bootloader._localizationCustomizationLoaded)
            {
                ININ.Web.Common.Debug.traceStatus("Going to attempt to load localization customization in language: " + Bootloader._localizationLanguageCode);
                if(!Bootloader._localizationCustomizationLoading)
                {
                    Bootloader._loadLocalizationCustomization();
                }
                window.setTimeout(Bootloader._checkForLocalizationCompletion, Bootloader._scriptLoadWaitTimeMilliseconds);
                return;
            }
            else
            {
                ININ.Web.Common.Debug.traceStatus("Localization customization has been loaded.  Loading of localization is now complete.");
                if (Bootloader._localizationCallback)
                {
                    Bootloader._localizationCallback();
                }
            }
        } else
        {
            ININ.Web.Common.Debug.traceStatus("No localization customization to load.  Loading of localization is now complete.");
            if (Bootloader._localizationCallback)
            {
                Bootloader._localizationCallback();
            }
        }
    }
    else
    {
        if(!Bootloader._localizationLoading)
        {
            ININ.Web.Common.Debug.traceStatus("Localization not loaded yet.");
            Bootloader._loadLocalization();
        }

        ININ.Web.Common.Debug.traceStatus("Setting timer to check in " + Bootloader._scriptLoadWaitTimeMilliseconds + "ms whether localization is loaded.");
        window.setTimeout(Bootloader._checkForLocalizationCompletion, Bootloader._scriptLoadWaitTimeMilliseconds);
    }
    ININ.Web.Common.Debug.traceMethodExited("Bootloader._checkForLocalizationCompletion()");
};

/**
 * Loads the UI components of this web application and their dependencies (i.e. everything except the 
 * WYSIWYG text editor). A callback method may be supplied. 
 * 
 * @param callback If this parameter is supplied, this method will be called once the components have finished loading.
 */
Bootloader.loadUIAndDependencies = function(callback)
{
    Bootloader._callback = callback;

    Bootloader._flagConfig = true;
    Bootloader._flagExternal = true;
    Bootloader._flagWebServices = true;
    Bootloader._flagLocalization = true;
    Bootloader._flagUI = true;
    Bootloader._flagCKEditor = false;
    Bootloader._flagCustomizations = true;

    // External doesn't have any dependencies so load them first
    Bootloader._loadExternal();

    Bootloader._checkForCompletion();
};

/**
 * Loads all non-UI components of this web application and their dependencies.  This will be useful to
 * customers wishing to implement the Interaction Web Tools protocol but with a completely different UI.  A callback method may
 * be supplied.
 * 
 * @param callback If this parameter is supplied, this method will be called once the components have finished loading.
 */
Bootloader.loadWebServicesAndDependencies = function(callback)
{
    Bootloader._callback = callback;

    Bootloader._flagConfig = true;
    Bootloader._flagExternal = true;
    Bootloader._flagWebServices = true;
    Bootloader._flagLocalization = false;
    Bootloader._flagUI = false;
    Bootloader._flagCKEditor = false;
    Bootloader._flagCustomizations = true;

    // External doesn't have any dependencies so load them first
    Bootloader._loadExternal();

    Bootloader._checkForCompletion();
};

/**
 * Loads external (third-party) components of this web application and their dependencies, 
 * excluding the WYSIWYG editor.  This currently includes only the Prototype library.  A callback method may be supplied. 
 * 
 * @param callback If this parameter is supplied, this method will be called once the components have finished loading.
 */
Bootloader.loadExternalAndDependencies = function(callback)
{
    Bootloader._callback = callback;

    Bootloader._flagConfig = true;
    Bootloader._flagExternal = true;
    Bootloader._flagWebServices = false;
    Bootloader._flagLocalization = false;
    Bootloader._flagUI = false;
    Bootloader._flagCKEditor = false;

    // External doesn't have any dependencies so load them first
    Bootloader._loadExternal();

    Bootloader._checkForCompletion();
};

/**
 * Loads the application config file. 
 * (Private method) 
 */
Bootloader._loadConfig = function()
{
    if(!Bootloader.isConfigLoaded())
    {
        Bootloader._configLoading = true;
        Bootloader._configSlowLoadTimer = window.setTimeout(Bootloader._onTimeoutLoadingConfig, Bootloader._scriptSlowLoadWarningTimeMilliseconds);
        Bootloader._loadScript('config.js');
    }
};

/**
 * Called if loading config takes longer than _scriptSlowLoadWarningTimeMilliseconds. 
 * Does not abort the load attempt, just provides a mechanism to inform the user that 
 * the load is taking a long time, and may not ever complete. 
 */
Bootloader._onTimeoutLoadingConfig = function()
{
    Bootloader.addLoadError("configuration file");
};

/**
 * Loads the third-party components of this web application, excluding the WYSIWYG editor.
 * (Private method) 
 */
Bootloader._loadExternal = function()
{
    if(!Bootloader.isExternalLoaded())
    {
        Bootloader._externalLoading = true;
        Bootloader._externalSlowLoadTimer = window.setTimeout(Bootloader._onTimeoutLoadingExternal, Bootloader._scriptSlowLoadWarningTimeMilliseconds);
        Bootloader._loadScript('External.js');
    }
};

/**
 * Called if loading external (third-party) components takes longer than _scriptSlowLoadWarningTimeMilliseconds. 
 * Does not abort the load attempt, just provides a mechanism to inform the user that 
 * the load is taking a long time, and may not ever complete. 
 */
Bootloader._onTimeoutLoadingExternal = function()
{
    Bootloader.addLoadError("third-party components");
};

/**
 * Loads the implementation of the Interaction Web Tools protocol
 * (Private method) 
 */
Bootloader._loadWebServices = function()
{
    if(!Bootloader.isWebServicesLoaded())
    {
        Bootloader._webServicesLoading = true;
        Bootloader._webServicesSlowLoadTimer = window.setTimeout(Bootloader._onTimeoutLoadingWebServices, Bootloader._scriptSlowLoadWarningTimeMilliseconds);
        Bootloader._loadScript('WebServices.js');
    }
};

/**
 * Called if loading WebServices.js takes longer than _scriptSlowLoadWarningTimeMilliseconds. 
 * Does not abort the load attempt, just provides a mechanism to inform the user that 
 * the load is taking a long time, and may not ever complete. 
 */
Bootloader._onTimeoutLoadingWebServices = function()
{
    Bootloader.addLoadError("Web Services");
};

/**
 * Allows a chat to be created, with the UI displaying text from a language other than 
 * the one specified in the config file. 
 *  
 * This will override the web user's browser's language settings. 
 *  
 * If creating a custom UI, perhaps the page before the chat page could ask the user to 
 * select a language, and their choice could determine the value of languageCode when 
 * this function is called. 
 * 
 * @param languageCode A language code, such as "fr-ca".  Case-insensitive.
 */
Bootloader.setLanguage = function(languageCode)
{
    // Ideally, we would just call a setter method of LanguagePreferenceRepository, but that may not be loaded yet!
    // So, this value must live here in Bootloader.
    languageCode = (null == languageCode ? null : languageCode.toLowerCase());
    this._languageCode = languageCode;
};

/**
 * Returns the language that was previously passed to setLanguage(), if any.  Otherwise returns null.
 *  
 * @return Language code, or null. 
 */
Bootloader.getLanguage = function()
{
    return this._languageCode;
};

/**
 * Loads code necessary for localization
 * (Private method) 
 */
Bootloader._loadLocalization = function()
{
    ININ.Web.Common.Debug.traceMethodEntered("Bootloader._loadLocalization()");
    if(!Bootloader.isLocalizationLoaded())
    {
        // This should not be set for localization, because we DO want checkForCompletion() to call this over and over again.
        //Bootloader._localizationLoading = true;

        // Get a list of languages that the user prefers, in order of their preference.
        var languagePreferenceOrder = ININ.Web.Chat.WebServices.LanguagePreferenceRepository.getLanguagePreferenceOrder();

        // If there have already been too many attempts to load a language, move on to the next one.
        if (Bootloader._localizationCurrentLanguageAttempts >= Bootloader._localizationLoadAttemptsPerLanguage)
        {
            ++Bootloader._localizationCurrentLanguageIndex;
            Bootloader._localizationCurrentLanguageAttempts = 0;

            if (Bootloader._localizationCurrentLanguageIndex >= languagePreferenceOrder.length)
            {
                // We've tried to load all languages in the list, and failed.  This indicates a configuration problem,
                // since there should, at the very least, be a resource file for the language specified in config.js.
                // Since localization is not loaded, error message below is non-localized.
                throw ININ.Web.Common.ExceptionFactory.createException("Could not load localized resource file for any of the following languages: " + languagePreferenceOrder.join());
                ININ.Web.Common.Debug.alert("Could not load localized resource file for any of the following languages: " + languagePreferenceOrder.join());

                // Localization hasn't been loaded, of course, but calling this will stop attempts to load localization so the
                // application can attempt to proceed.  That will result in a "Need to localize" exception, but that's better than just
                // looping forever here.
                Bootloader.onLoadedLocalization(null);
                return;
            }
        }

        var languageCode = languagePreferenceOrder[Bootloader._localizationCurrentLanguageIndex];
        ININ.Web.Common.Debug.traceStatus("Language #" + Bootloader._localizationCurrentLanguageIndex + " (" + languageCode + "), attempt #" + Bootloader._localizationCurrentLanguageAttempts);

        var filePath = 'resources/localization.' + Bootloader._getMostPreciseI3LanguageCode(languageCode) + '.js';
        Bootloader._loadScript(filePath);
        ++Bootloader._localizationCurrentLanguageAttempts;
    }
    ININ.Web.Common.Debug.traceMethodExited("Bootloader._loadLocalization()");
};

/**
 * Loads code necessary for localization customization
 * (Private method) 
 */
Bootloader._loadLocalizationCustomization = function()
{
    ININ.Web.Common.Debug.traceMethodEntered("Bootloader._loadLocalizationCustomization()");
    if(!Bootloader.isLocalizationCustomizationLoaded())
    {
        Bootloader._localizationCustomizationLoading = true;
        Bootloader._localizationCustomizationSlowLoadTimer = window.setTimeout(Bootloader._onTimeoutLoadingLocalizationCustomization, Bootloader._scriptSlowLoadWarningTimeMilliseconds);

        var languageLoaded = Bootloader._localizationLanguageCode;
        if (null != languageLoaded)
        {
            // _loadLocalization() was successful.
            ININ.Web.Common.Debug.traceStatus("Attempting to load language customization for language: " + languageLoaded);
            Bootloader._loadScript('resources/localizationCustomization.' + languageLoaded + '.js');
        } else
        {
            ININ.Web.Common.Debug.traceWarning("Failed to load localization, so not attempting to load localization customization.");
        }
    }
    ININ.Web.Common.Debug.traceMethodExited("Bootloader._loadLocalizationCustomization()");
};

/**
 * Called if loading localization customization takes longer than _scriptSlowLoadWarningTimeMilliseconds. 
 * Does not abort the load attempt, just provides a mechanism to inform the user that 
 * the load is taking a long time, and may not ever complete. 
 * If this error message is appearing, Bootloader.setShouldLoadLocalizationCustomization(true) was called, the resource file 
 * resources/localization.(languagecode).js was loaded for some language code, but the customized resource file 
 * resources/localizationCustomization.(languagecode).js for the same language was not able to be loaded. 
 * Check the following: 
 * 1. Does every resources/localization.(languagecode).js have a corresponding resources/localizationCustomization.(languagecode).js? 
 * 2. Should Bootloader.setShouldLoadLocalizationCustomization(true) really have been called?
 */
Bootloader._onTimeoutLoadingLocalizationCustomization = function()
{
    Bootloader.addLoadError("Localization Customization");
};

Bootloader._getMostPreciseI3LanguageCode = function(languageCode)
{
    languageCode = (null == languageCode ? null : languageCode.toLowerCase());

    // In the future, this method could implement a mapping from unsupported language codes to supported ones.
    // But the current solution is to simply try to load a resource file for the language code
    // specified, and if that fails, continue looping through the list of preferred languages until a supported one is found.
    return languageCode;
};

/** 
 * Loads the default UI 
 * (Private method) 
 */
Bootloader._loadUI = function()
{
    if(!Bootloader.isUILoaded())
    {
        Bootloader._uiLoading = true;
        Bootloader._uiSlowLoadTimer = window.setTimeout(Bootloader._onTimeoutLoadingUI, Bootloader._scriptSlowLoadWarningTimeMilliseconds);
        Bootloader._loadScript('UI.js');
    }
};

/**
 * Called if loading UI takes longer than _scriptSlowLoadWarningTimeMilliseconds. 
 * Does not abort the load attempt, just provides a mechanism to inform the user that 
 * the load is taking a long time, and may not ever complete. 
 */
Bootloader._onTimeoutLoadingUI = function()
{
    Bootloader.addLoadError("User Interface");
};

/** 
 * Loads the WYSIWYG editor
 * (Private method) 
 */
Bootloader._loadCKEditor = function()
{
    if(!Bootloader.isCKEditorLoaded())
    {
        Bootloader._ckEditorLoading = true;
        Bootloader._ckEditorSlowLoadTimer = window.setTimeout(Bootloader._onTimeoutLoadingCKEditor, Bootloader._scriptSlowLoadWarningTimeMilliseconds);
        Bootloader._loadScript('external/ckeditor/ckeditor.js');
    }
};

/**
 * Called if loading the WYSIWYG takes longer than _scriptSlowLoadWarningTimeMilliseconds. 
 * Does not abort the load attempt, just provides a mechanism to inform the user that 
 * the load is taking a long time, and may not ever complete. 
 */
Bootloader._onTimeoutLoadingCKEditor = function()
{
    Bootloader.addLoadError("WYSIWYG Editor");
};

/** 
 * Loads the built-in customization mechanism
 * (Private method) 
 */
Bootloader._loadCustomizations = function()
{
    if(!Bootloader.isCustomizationsLoaded())
    {
        Bootloader._customizationsLoading = true;
        Bootloader._customizationsSlowLoadTimer = window.setTimeout(Bootloader._onTimeoutLoadingCustomizations, Bootloader._scriptSlowLoadWarningTimeMilliseconds);
        Bootloader._loadScript('Customizations.js');
    }
};

/**
 * Called if loading the built-in customization mechanism takes longer than _scriptSlowLoadWarningTimeMilliseconds. 
 * Does not abort the load attempt, just provides a mechanism to inform the user that 
 * the load is taking a long time, and may not ever complete. 
 */
Bootloader._onTimeoutLoadingCustomizations = function()
{
    Bootloader.addLoadError("Customizations");
};

/**
 * Displays a message to the web user indicating that a certain component is taking too long to load. 
 * This message should be cleared if/when the component does finally load. 
 *  
 * Since this may be called before localization has been loaded, this method contains hard-coded English string(s). 
 *  
 * @param component Which component is taking too long to load
 */
Bootloader.addLoadError = function(component)
{
    // We only try to load one thing at a time, so any previous error is no longer relevant.  It should have
    // been removed already, but this is just to be safe.
    Bootloader._removeLoadError();

    var parent = document.getElementById('iwc-web-chat-container');
    if (!parent)
    {
        parent = this.getBody();
    }
    var errorDiv = new Element('div', { 'class': 'iwc-load-error' });
    errorDiv.id = 'iwc-load-error';
    var errorImg = new Element('img', { 'src': 'img/error.png' });
    var errorMsg = new Element('span', null);
    errorMsg.innerHTML = "The attempt to load " + component + " is taking a long time.  Attempting to load it will continue, but may not ever succeed.";
    errorDiv.appendChild(errorImg);
    errorDiv.appendChild(errorMsg);
    parent.appendChild(errorDiv);
};

/**
 * Removes the error message created by addLoadError()
 */
Bootloader._removeLoadError = function()
{
    var errorDiv = document.getElementById('iwc-load-error');
    if (null != errorDiv)
    {
        var parent = errorDiv.parentNode;
        if (null != parent)
        {
            parent.removeChild(errorDiv);
        }
    }
};

/** 
 * Sets the relative path from the HTML file that is loading the script files to those script files. 
 *  
 * In a default installation, index.html is located in the "I3Root" directory, and the "js" directory 
 * which contains Bootloader.js, WebServices.js, etc. is also a child of "I3Root".
 *  
 * In a customized installation, if "js" is copied or moved, and the HTML file is still located in the 
 * parent directory of "js" (i.e. the relative path from the HTML file to this source file is "js/Bootloader.js") 
 * then it is unnecessary to call this method. 
 *  
 * However, if for instance the HTML file being loaded is <webroot>/MyCompany/MyCustomization/index.html and the 
 * Javascript files, including this one, are in <webroot>/Scripts/InteractiveIntelligenceScripts, then index.html should 
 * include a call to:  Bootloader.setBasePath("/Scripts/InteractiveIntelligenceScripts"); 
 */
Bootloader.setBasePath = function(path) {
    Bootloader._basePath = path;
}

/** 
 * Helper method for the above methods. 
 * Implements functionality similar to an #include or import statement in C++/Java. 
 * Returns asynchronously, hence the need for the ___Loading and ___Loaded variables and the is___Loaded() methods. 
 * (Private method) 
 */
Bootloader._loadScript = function(url)
{
    var element = document.createElement("script");
    element.src = Bootloader._basePath + "/" + url;
    element.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(element);
};

/**
 * Returns true if the config file has been loaded, false otherwise. 
 * Note that it is not required for the config file to be loaded.  Some applications may wish to set 
 * ININ.Web.Chat.Config's attributes manually (for instance, perhaps a page may have a list of links 
 * for chatting with each employee such as chat.jsp?target=John+Doe, and then chat.jsp could set 
 * ININ.Web.Chat.Config.ChatTarget to the value of the "target" URL parameter). 
 */
Bootloader.isConfigLoaded = function()
{
    return Bootloader._configLoaded;
};

/**
 * Returns true if external (third-party) components of this web application and their 
 * dependencies have completed loading, false otherwise.
 */
Bootloader.isExternalLoaded = function()
{
    return Bootloader._externalLoaded;
};

/**
 * Returns true if all non-UI components of this web application and their dependencies have 
 * completed loading, false otherwise. 
 */
Bootloader.isWebServicesLoaded = function()
{
    return Bootloader._webServicesLoaded;
};

/**
 * Returns true if code necessary for localization has completed loading, false otherwise.
 */
Bootloader.isLocalizationLoaded = function()
{
    return Bootloader._localizationLoaded;
};

/**
 * Returns the language code of the language in which the UI shall be presented.  May be null if localization has not been loaded yet.
 */
Bootloader.getLocalizationLanguage = function()
{
    return Bootloader._localizationLanguageCode;
};

/**
 * Returns true if code necessary for localization customization has completed loading, false otherwise.
 */
Bootloader.isLocalizationCustomizationLoaded = function()
{
    return Bootloader._localizationCustomizationLoaded;
};

/**
 * Returns true if the UI has completed loading, false otherwise.
 */
Bootloader.isUILoaded = function()
{
    return Bootloader._uiLoaded;
};

/**
 * Returns true if the WYSIWYG editor has completed loading, false otherwise.
 */
Bootloader.isCKEditorLoaded = function()
{
    return Bootloader._ckEditorLoaded;
};

/**
 * Returns true if the built-in customization mechanism has completed loading, false otherwise.
 */
Bootloader.isCustomizationsLoaded = function()
{
    return Bootloader._customizationsLoaded;
};

/**
 * A callback that is called when the config file has finished loading.
 */
Bootloader.onLoadedConfig = function()
{
    Bootloader._configLoaded = true;
    Bootloader._configLoading = false;
    window.clearTimeout(Bootloader._configSlowLoadTimer);
    Bootloader._removeLoadError();
};

/**
 * A callback that is called when the external (third-party) components of this web application have finished loading.
 */
Bootloader.onLoadedExternal = function()
{
    Bootloader._externalLoaded = true;
    Bootloader._externalLoading = false;
    window.clearTimeout(Bootloader._externalSlowLoadTimer);
    Bootloader._removeLoadError();
};

/**
 * A callback that is called when the non-UI components of this web application have finished loading.
 */
Bootloader.onLoadedWebServices = function()
{
    Bootloader._webServicesLoaded = true;
    Bootloader._webServicesLoading = false;
    window.clearTimeout(Bootloader._webServicesSlowLoadTimer);
    Bootloader._removeLoadError();
};

/**
 * A callback that is called when the code necessary for localization has finished loading.
 */
Bootloader.onLoadedLocalization = function(languageCode)
{
    ININ.Web.Common.Debug.traceMethodEntered("Bootloader.onLoadedLocalization(" + languageCode + ")");
    Bootloader._localizationLanguageCode = (null == languageCode ? null : languageCode.toLowerCase());
    Bootloader._localizationLoading = false;
    Bootloader._localizationLoaded = true;
    ININ.Web.Common.Debug.traceMethodExited("Bootloader.onLoadedLocalization(" + languageCode + ")");
};

/**
 * A callback that is called when the code necessary for localization customization has finished loading.
 */
Bootloader.onLoadedLocalizationCustomization = function(languageCode)
{
    ININ.Web.Common.Debug.traceMethodEntered("Bootloader.onLoadedLocalizationCustomization(" + languageCode + ")");
    window.clearTimeout(Bootloader._localizationCustomizationSlowLoadTimer);
    Bootloader._removeLoadError();
    Bootloader._localizationCustomizationLoaded = true;
    Bootloader._localizationCustomizationLoading = false;
    Bootloader._localizationCustomizationLanguageCode = (null == languageCode ? null : languageCode.toLowerCase());
    ININ.Web.Common.Debug.traceMethodExited("Bootloader.onLoadedLocalizationCustomization(" + languageCode + ")");
};

/**
 * A callback that is called when the UI has finished loading.
 */
Bootloader.onLoadedUI = function()
{
    Bootloader._uiLoaded = true;
    Bootloader._uiLoading = false;
    window.clearTimeout(Bootloader._uiSlowLoadTimer);
    Bootloader._removeLoadError();
};

/**
 * A callback that is called when the WYSIWYG editor has finished loading.
 */
Bootloader.onLoadedCKEditor = function()
{
    Bootloader._ckEditorLoaded = true;
    Bootloader._ckEditorLoading = false;
    window.clearTimeout(Bootloader._ckEditorSlowLoadTimer);
    Bootloader._removeLoadError();
};

/**
 * A callback that is called when the built-in customization mechanism has finished loading.
 */
Bootloader.onLoadedCustomizations = function()
{
    Bootloader._customizationsLoaded = true;
    Bootloader._customizationsLoading = false;
    window.clearTimeout(Bootloader._customizationsSlowLoadTimer);
    Bootloader._removeLoadError();
};

/**
 * Waits until all requested modules have loaded.  Then calls the callback that was supplied to the call to 
 * load____().  (If any callback was supplied at all)
 *  
 * There is no synchronous "#include" in Javascript.  So we must use the asynchronous _loadScript() method.  If the filename 
 * passed to _loadScript() exists, we will eventually get a callback (since we should only be loading JS source files that 
 * include that callback).  If the filename doesn't exist, we will not be notified. 
 *  
 * So this method loops through the list of preferred languages, attempts to load one, and recurses to wait for the callback. 
 * If it is received, the method stops.  If it is not received, the method tries the next language. 
 *  
 * (Private method) 
 */
Bootloader._checkForCompletion = function()
{
    // The order of loading here is dependency driven

    // External has no dependencies
    if(Bootloader._flagExternal)
    {
        if(!Bootloader._externalLoaded)
        {
            if(!Bootloader._externalLoading)
            {
                Bootloader._loadExternal();
            }

            window.setTimeout(Bootloader._checkForCompletion, Bootloader._scriptLoadWaitTimeMilliseconds);
            return;
        }
    }

    // WebServices is dependent on External
    if(Bootloader._flagWebServices)
    {
        if(!Bootloader._webServicesLoaded)
        {
            if(!Bootloader._webServicesLoading)
            {
                Bootloader._loadWebServices();
            }

            window.setTimeout(Bootloader._checkForCompletion, Bootloader._scriptLoadWaitTimeMilliseconds);
            return;
        }
    }

    // CKEditor has no dependencies
    if(Bootloader._flagCKEditor)
    {
        if(!Bootloader._ckEditorLoaded)
        {
            if(!Bootloader._ckEditorLoading)
            {
                Bootloader._loadCKEditor();
            }

            window.setTimeout(Bootloader._checkForCompletion, Bootloader._scriptLoadWaitTimeMilliseconds);
            return;
        }
    }

    // Config is dependent on WebServices and External
    if(Bootloader._flagConfig)
    {
        if(!Bootloader._configLoaded)
        {
            if(!Bootloader._configLoading)
            {
                Bootloader._loadConfig();
            }

            window.setTimeout(Bootloader._checkForCompletion, Bootloader._scriptLoadWaitTimeMilliseconds);
            return;
        }
    }

    // Localization is dependent on WebServices and External and Config (for the language code)
    if(Bootloader._flagLocalization)
    {
        if(!Bootloader.isLocalizationLoaded())
        {
            if(!Bootloader._localizationLoading)
            {
                Bootloader._loadLocalization();
            }

            window.setTimeout(Bootloader._checkForCompletion, Bootloader._scriptLoadWaitTimeMilliseconds);
            return;
        }
    }

    // Localization customization will only be loaded if setShouldLoadLocalizationCustomization(true) is called,
    // and if localization has already been loaded. 
    if(Bootloader._flagLocalizationCustomization && Bootloader.isLocalizationLoaded())
    {
        if(!Bootloader._localizationCustomizationLoaded)
        {
            if(!Bootloader._localizationCustomizationLoading)
            {
                Bootloader._loadLocalizationCustomization();
            }

            window.setTimeout(Bootloader._checkForCompletion, Bootloader._scriptLoadWaitTimeMilliseconds);
            return;
        }
    }

    // UI is dependent on Config, Localization, WebServices and External
    if(Bootloader._flagUI)
    {
        if(!Bootloader._uiLoaded)
        {
            if(!Bootloader._uiLoading)
            {
                Bootloader._loadUI();
            }

            window.setTimeout(Bootloader._checkForCompletion, Bootloader._scriptLoadWaitTimeMilliseconds);
            return;
        }
    }

    // Customization is dependent on UI, Config, Localization, WebServices and External
    if(Bootloader._flagCustomizations)
    {
        if(!Bootloader._customizationsLoaded)
        {
            if(!Bootloader._customizationsLoading)
            {
                Bootloader._loadCustomizations();
            }

            window.setTimeout(Bootloader._checkForCompletion, Bootloader._scriptLoadWaitTimeMilliseconds);
            return;
        }
    }

    // got here which means that everything is loaded, so call the callback
    if(Bootloader._callback)
    {
        Bootloader._callback();
    }
};


