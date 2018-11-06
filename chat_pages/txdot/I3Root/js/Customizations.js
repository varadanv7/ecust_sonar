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



/*global ININ: true, Class: true, Element: true, alert: true, Event: true, window: true, CKEDITOR: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.Customizations");

/** 
 * LinkifierFactory class 
 *  
 * There is no need to instantiate this class.  Instead, to get this factory, use: 
 * ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_factory(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.Linkifier)
 * or, to get an instance of what this factory creates, use: 
 * ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.Linkifier) 
 *  
 * In a default installation, this class provides an instance of a class 
 * which is used to scan text, turning URLs into HTML tags that point to those URLs. 
 * That class is ININ.Web.Chat.WebServices._Internal._DefaultLinkifier.  It contains methods that 
 * return some default values for what the HTML tags should contain (e.g. target="_blank", 
 * CSS class attribute), the regular expression used to identify a URL, and whether 
 * the "http://" or "mailto:" portion of a URL should be visible to the user (i.e. 
 * <a href="http://inin.com">http://inin.com</a> versus <a href="http://inin.com">inin.com</a>)
 *  
 * If changing any of these default behaviours is desired, do the following: 
 * 1. Create a subclass of ININ.Web.Chat.WebServices._Internal._DefaultLinkifier.  Override one 
 *    or more methods. 
 * 2. Change the line below that instantiates a new ININ.Web.Chat.WebServices._Internal._DefaultLinkifier. 
 *    Make that line instead create an instance of the subclass from step 1.
 */
ININ.Web.Chat.Customizations.LinkifierFactory = Class.create(ININ.Web.Common.InterfaceImplementation,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        if(arguments.length != 1)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("LinkifierFactory constructor called with " + arguments.length + " arguments, but expected 1.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICustomizationSingletonFactory);
    },

    /**
     * The linkifier class is a singleton.
     */
    _instance : null,

    /**
     * This method returns a class which may be used to create hyperlinks
     *  
     * @return An ININ.Web.Chat.WebServices._Internal._DefaultLinkifier, or a subclass thereof. 
     */
    get_instance: function()
    {
        if (null == this._instance)
        {
            this._instance = new ININ.Web.Chat.WebServices._Internal._DefaultLinkifier();
        }
        return this._instance;
    }
});


/*global ININ: true, Class: true, Element: true, alert: true, Event: true, window: true, CKEDITOR: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.Customizations");

/** 
 * LoginInfoSourceFactory class 
 *  
 * There is no need to instantiate this class.  Instead, to get this factory, use: 
 * ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_factory(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.LoginInfoSource)
 * or, to get an instance of what this factory creates, use: 
 * ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.LoginInfoSource) 
 *  
 * In a default installation, this class provides a Login Info Source which 
 * is unable to obtain any login information (username, password, callback 
 * telephone, callback description).  Since it is unable to find this information, 
 * the login forms are presented. 
 *  
 * If bypassing the login forms is desired, do the following: 
 * 1. Create a subclass of ININ.Web.Chat.UI._Internal._DefaultLoginInfoSource.  Implement 
 *    the methods of this subclass to obtain login information from some external
 *    source (a database, a cookie, data submitted from an external form, etc.)  Note that
 *    these methods may be called multiple times, so if they are computationally expensive, some
 *    form of caching is recommended.
 * 2. Change the line below that instantiates a new ININ.Web.Chat.UI._Internal._DefaultLoginInfoSource. 
 *    Make that line instead create an instance of the subclass from step 1.
 */
ININ.Web.Chat.Customizations.LoginInfoSourceFactory = Class.create(ININ.Web.Common.InterfaceImplementation,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        if(arguments.length != 1)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("LoginInfoSourceFactory constructor called with " + arguments.length + " arguments, but expected 1.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICustomizationSingletonFactory);
    },

    /**
     * The login info source is a singleton.
     */
    _instance : null,

    /**
     * This method returns a login info source. 
     *  
     * @return An ININ.Web.Chat.UI._Internal._DefaultLoginInfoSource, or a subclass thereof. 
     */
    get_instance: function()
    {
        if (null == this._instance)
        {
            this._instance = new ININ.Web.Chat.Customizations.CustomLoginInfoSource();
        }
        return this._instance;
    }
});


/*global ININ: true, Class: true, Element: true, alert: true, Event: true, window: true, CKEDITOR: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.Customizations");

/** 
 * MaximumFieldLengthsFactory class 
 *  
 * There is no need to instantiate this class.  Instead, to get this factory, use: 
 * ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_factory(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths)
 * or, to get an instance of what this factory creates, use: 
 * ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths) 
 *  
 * In a default installation, this class provides an instance of a class 
 * which is queried to determine the maximum lengths of text that may be 
 * entered into various fields.  That class is 
 * ININ.Web.Chat.UI._Internal._DefaultMaximumFieldLengths.  It returns the maximum 
 * lengths that Tracker is capable of storing for each field.  Therefore, it is 
 * not suggested to increase these values, but they may be decreased. 
 *  
 * If decreasing maximum field lengths is desired, do the following: 
 * 1. Create a subclass of ININ.Web.Chat.UI._Internal._DefaultMaximumFieldLengths.  Override one 
 *    or more methods to return a different number. 
 * 2. Change the line below that instantiates a new ININ.Web.Chat.UI._Internal._DefaultMaximumFieldLengths. 
 *    Make that line instead create an instance of the subclass from step 1.
 */
ININ.Web.Chat.Customizations.MaximumFieldLengthsFactory = Class.create(ININ.Web.Common.InterfaceImplementation,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        if(arguments.length != 1)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("MaximumFieldLengthsFactory constructor called with " + arguments.length + " arguments, but expected 1.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICustomizationSingletonFactory);
    },

    /**
     * The maximum field lengths class is a singleton.
     */
    _instance : null,

    /**
     * This method returns a class which may be queried to determine how many characters may 
     * be entered into various fields. 
     *  
     * @return An ININ.Web.Chat.UI._Internal._DefaultMaximumFieldLengths, or a subclass thereof. 
     */
    get_instance: function()
    {
        if (null == this._instance)
        {
            this._instance = new ININ.Web.Chat.UI._Internal._DefaultMaximumFieldLengths();
        }
        return this._instance;
    }
});


/*global ININ: true, Class: true, Element: true, alert: true, Event: true, window: true, CKEDITOR: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.Customizations");

/** 
 * RegistrationFormPanelFactory class 
 *  
 * There is no need to instantiate this class.  Instead, to get this factory, use: 
 * ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.create_instance(ININ.Web.Chat.WebServices.CustomizableFactoryTypes.RegistrationFormPanel, arguments) 
 * "args" shall be a JSON object with the following properties:
 * registrationManager: An instance of a class derived from RegistrationManagerBase.
 * statusManager: An implementation of the IStatusManager interface, such as FormContainerPanel.
 * registerFormContainer: The Panel that contains this registration form.  Must have a showRegisterForm() method.
 * registrationCallback: The function to call once the registration attempt is complete (if it succeeds).  May be null.
 * form: An existing form to add the registration formfields to.  May be null, in which case a new form will be created.
 *  
 * In a default installation, this class provides an instance of
 * ININ.Web.Chat.UI._Internal._RegistrationFormPanel.  This panel has certain 
 * fields visible, but there are many other fields which may be included by following 
 * the steps below.  Also, the user is required to fill in certain fields on 
 * this panel, but changing the list of required fields may also be done by 
 * following the steps below. 
 *  
 * 1. Create a subclass of ININ.Web.Chat.UI._Internal._DefaultRegistrationFormPanel. 
 * 2. Make the constructor of this subclass take (at least) the arguments passed to
 *    ININ.Web.Chat.UI._Internal._DefaultRegistrationFormPanel below. Make the constructor
 *    call:
 *    $super(registrationManager, statusManager, registerFormContainer, registrationCallback, form);
 * 3. If desired, override the createDefaultForm() method to change which fields appear 
 *    in the form. 
 * 4. If desired, override the getRequiredFields() method to change which fields the 
 *    user is required to fill in.
 * 5. Change the line below that instantiates a new ININ.Web.Chat.UI._Internal._DefaultRegistrationFormPanel. 
 *    Make that line instead create an instance of the subclass from step 1.
 */
ININ.Web.Chat.Customizations.RegistrationFormPanelFactory = Class.create(ININ.Web.Common.InterfaceImplementation,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        if(arguments.length != 1)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("RegistrationFormPanelFactory constructor called with " + arguments.length + " arguments, but expected 1.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICustomizationFactory);
    },

    /**
     * This method returns a class which may be queried to determine which tabs shall be visible. 
     *  
     * @param args shall be a JSON object with the following properties:
     * registrationManager: An instance of a class derived from RegistrationManagerBase.
     * statusManager: An implementation of the IStatusManager interface, such as FormContainerPanel.
     * registerFormContainer: The Panel that contains this registration form.  Must have a showRegisterForm() method.
     * registrationCallback: The function to call once the registration attempt is complete (if it succeeds).  May be null.
     * form: An existing form to add the registration formfields to.  May be null, in which case a new form will be created.
     * @return An ININ.Web.Chat.UI._Internal._DefaultRegistrationFormPanel, or a subclass thereof. 
     */
    create_instance: function(args)
    {
        return new ININ.Web.Chat.UI._Internal._DefaultRegistrationFormPanel(args.registrationManager, args.statusManager, args.registerFormContainer, args.registrationCallback, args.form);
    }
});


/*global ININ: true, Class: true, Element: true, alert: true, Event: true, window: true, CKEDITOR: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.Customizations");

/** 
 * RetryCountsFactory class 
 *  
 * There is no need to instantiate this class.  Instead, to get this factory, use: 
 * ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_factory(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.RetryCounts)
 * or, to get an instance of what this factory creates, use: 
 * ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.RetryCounts) 
 *  
 * In a default installation, this class provides an instance of a class 
 * which is queried to determine how many times a failed AJAX request should 
 * be retried before switching to the other server or giving up.  That class is 
 * ININ.Web.Chat.WebServices._Internal._DefaultRetryCounts. 
 *  
 * If changing the retry count for one or more AJAX request types is desired, 
 * do the following: 
 * 1. Create a subclass of ININ.Web.Chat.WebServices._Internal._DefaultRetryCounts.  Override one 
 *    or more methods to return a different number. 
 * 2. Change the line below that instantiates a new ININ.Web.Chat.WebServices._Internal._DefaultRetryCounts. 
 *    Make that line instead create an instance of the subclass from step 1.
 */
ININ.Web.Chat.Customizations.RetryCountsFactory = Class.create(ININ.Web.Common.InterfaceImplementation,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        if(arguments.length != 1)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("RetryCountsFactory constructor called with " + arguments.length + " arguments, but expected 1.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICustomizationSingletonFactory);
    },

    /**
     * The retry counts class is a singleton.
     */
    _instance : null,

    /**
     * This method returns a class which may be queried to determine how many times the 
     * various types of AJAX requests should be retried, if they fail. 
     *  
     * @return An ININ.Web.Chat.WebServices._Internal._DefaultRetryCounts, or a subclass thereof. 
     */
    get_instance: function()
    {
        if (null == this._instance)
        {
            this._instance = new ININ.Web.Chat.WebServices._Internal._DefaultRetryCounts();
        }
        return this._instance;
    }
});

/*global ININ: true, Class: true, Element: true, alert: true, Event: true, window: true, CKEDITOR: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.Customizations");

/** 
 * StatusFieldsDisplayFactory class 
 *  
 * There is no need to instantiate this class.  Instead, to get this factory, use: 
 * ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_factory(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.StatusFieldsDisplay)
 * or, to get an instance of what this factory creates, use: 
 * ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.StatusFieldsDisplay) 
 *  
 * In a default installation, this class provides an instance of a class 
 * which is queried to determine which fields (e.g. agent name, position in queue, etc.) to show on the Callback Status panel.
 */
ININ.Web.Chat.Customizations.StatusFieldsDisplayFactory = Class.create(ININ.Web.Common.InterfaceImplementation,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        if(arguments.length != 1)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("StatusFieldsDisplayFactory constructor called with " + arguments.length + " arguments, but expected 1.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICustomizationSingletonFactory);
    },

    /**
     * The retry counts class is a singleton.
     */
    _instance : null,

    /**
     * This method returns a class which may be queried to determine which fields (e.g. agent name, 
     * position in queue, etc.) to show on the Callback Status panel.
     *  
     * @return An ININ.Web.Chat.WebServices._Internal._DefaultStatusFieldsDisplay, or a subclass thereof. 
     */
    get_instance: function()
    {
        if (null == this._instance)
        {
            this._instance = new ININ.Web.Chat.UI._Internal._DefaultStatusFieldsDisplay();
        }
        return this._instance;
    }
});

/*global ININ: true, Class: true, Element: true, alert: true, Event: true, window: true, CKEDITOR: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.Customizations");

/** 
 * TabVisibilityFactory class 
 *  
 * There is no need to instantiate this class.  Instead, to get this factory, use: 
 * ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_factory(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.TabVisibility)
 * or, to get an instance of what this factory creates, use: 
 * ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.TabVisibility) 
 *  
 * In a default installation, this class provides an instance of a class 
 * which is queried to determine which tabs shall be visible.  That class is 
 * ININ.Web.Chat.UI._Internal._DefaultTabVisibility.  It always returns true 
 * when queried about whether a tab should be displayed, so all tabs are displayed. 
 *  
 * If hiding one or more tabs is desired, do the following: 
 * 1. Create a subclass of ININ.Web.Chat.UI._Internal._DefaultTabVisibility.  Override one 
 *    or more methods to return false. 
 * 2. Change the line below that instantiates a new ININ.Web.Chat.UI._Internal._DefaultTabVisibility. 
 *    Make that line instead create an instance of the subclass from step 1.
 */
ININ.Web.Chat.Customizations.TabVisibilityFactory = Class.create(ININ.Web.Common.InterfaceImplementation,
{
	/**
	 * Constructor
	 */
    initialize : function($super)
    {
        if(arguments.length != 1)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("TabVisibilityFactory constructor called with " + arguments.length + " arguments, but expected 1.");
        }

        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICustomizationSingletonFactory);
    },

    /**
     * The tab visibility class is a singleton.
     */
    _instance : null,

    /**
     * This method returns a class which may be queried to determine which tabs shall be visible.
     *  
     * @return An ININ.Web.Chat.UI._Internal._DefaultTabVisibility, or a subclass thereof. 
     */
    get_instance: function()
    {
        if (null == this._instance)
        {
            this._instance = new ININ.Web.Chat.UI._Internal._DefaultTabVisibility();
        }
        return this._instance;
    }
});

ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.Customizations");

/**
 * CustomLoginInfoSource class 
 *  
 * In the default installation, a page is shown which allows the user to 
 * select between tabs for Chat, Callback, and Registration.  To create a 
 * chat, the user must type their name (and optionally, a password) and 
 * press the "Start Chat" button.  To create a callback, the user must type 
 * their name, telephone number, callback description, (and optionally a 
 * password), and press the "Start Callback" button.
 *  
 * This is because ININ.Web.Chat.UI._Internal._DefaultLoginInfoSource is not 
 * able to get login information from any other source, so the default action is 
 * to show that page. 
 *  
 * This subclass of _DefaultLoginInfoSource obtains login data from form submission 
 * data, and the login form is therefore not shown. 
 */
ININ.Web.Chat.Customizations.CustomLoginInfoSource = Class.create(ININ.Web.Chat.UI._Internal._DefaultLoginInfoSource,
{
    initialize : function()
    {
        // Create an instance of the class that is defined just below this one.
        // This line could be placed elsewhere if desired, such as in chatOrCallback.html.
        var customLifecycleEventsObserverSingleton = new ININ.Web.Chat.Customizations.CustomLifecycleEventsObserver();
    },

    /** 
     * Skip the login page, and begin a chat right away using a username 
     * obtained from the form in this example's index.html 
     */
    get_chatUsername : function()
    {
        // This line may be used to extract the value from the query string
        return this.get_queryStringValue("chatUsername");
    },

    /** 
     * If get_chatUsername() returns non-null, this method may optionally be 
     * used to return the password of that user.  If an anonymous chat is 
     * desired, simply implement get_chatUsername() but allow get_chatPassword() to 
     * return null. 
     */
    get_chatPassword : function()
    {
        // This line may be used to extract the value from the query string (though that
        // is perhaps not a wise place for a password to be!)
        return this.get_queryStringValue("chatPassword");
    },

    /** 
     * Skip the login page, and begin a callback right away using a username 
     * obtained from the form in this example's index.html 
     * Note that if get_chatUsername() also returns a non-null value, that will 
     * take priority and a chat will be started, not a callback. 
     */
    get_callbackUsername : function()
    {
        // This line may be used to extract the value from the query string
        return this.get_queryStringValue("callbackUsername");
    },

    /** 
     * If get_callbackUsername() returns non-null, this method may optionally be 
     * used to return the password of that user.  If an anonymous callback is 
     * desired, simply implement get_callbackUsername() but allow get_callbackPassword() to 
     * return null. 
     */
    get_callbackPassword : function()
    {
        // This line may be used to extract the value from the query string (though that
        // is perhaps not a wise place for a password to be!)
        return this.get_queryStringValue("callbackPassword");
    },

    /** 
     * If get_callbackUsername() returns non-null, this method shall return that user's 
     * telephone number. 
     */
    get_callbackTelephone : function()
    {
        // This line may be used to extract the value from the query string
        return this.get_queryStringValue("callbackTelephone");
    },

    /** 
     * If get_callbackUsername() returns non-null, this method shall return the subject which 
     * that user wishes to discuss. 
     */
    get_callbackDescription : function()
    {
        // This line may be used to extract the value from the query string
        return this.get_queryStringValue("callbackDescription");
    },

    /**
     * The purpose of this example is to use usernames, passwords, etc. that were obtained from 
     * an external source.  This is a helper method which uses the query string as that source. 
     * Customers could easily replace this (or the calls to this) with code that gets the values 
     * from other sources instead. 
     *  
     * @param key A key from a key+value pair in the query string
     */
    get_queryStringValue : function(key)
    {
        var value = ININ.Web.Common.Utilities.getQueryStringValue(key);

        if (null == value)
        {
            return null;
        }

        // Undo the URL encoding that was done when the form was submitted.
        // For instance, change "John+Doe" back to "John Doe"
        return decodeURIComponent(value.replace(/\+/g, ' '));
    }
});

ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.Customizations");

/**
 * CustomLifecycleEventObserver class 
 *  
 * In the default implementation, Notifications are sent when a chat or callback is 
 * created, when a chat ends, and when an attempt to create a chat or callback 
 * fails. 
 *  
 * This class listens for these Notifications and simply pops up some Javascript alerts.
 */
ININ.Web.Chat.Customizations.CustomLifecycleEventsObserver = Class.create(ININ.Web.Common.InterfaceImplementation,
{
    initialize : function($super)
    {
        $super();
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IChatCreationNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IChatCreationFailureNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IChatCompletionNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IChatCompletionFailureNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackCreationNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackCreationFailureNotificationObserver);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerChatCreationNotificationObserver(this);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerChatCreationFailureNotificationObserver(this);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerChatCompletionNotificationObserver(this);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerChatCompletionFailureNotificationObserver(this);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerCallbackCreationNotificationObserver(this);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerCallbackCreationFailureNotificationObserver(this);
    },

	/**
	 * This method is called when a chat is created successfully.
	 * 
	 * @param chatCreationNotification An object that implements IChatCreationNotification. (Ignored)
	 */
    processChatCreationNotification : function(chatCreationNotification)
    {
        /**alert('Bypass Login Form Customization: Chat created successfully!');*/
    },

	/**
     * This method is called when an attempt to create a chat fails. 
	 * 
	 * @param chatCreationFailureNotification An object that implements IChatCreationFailureNotification.
	 */
    processChatCreationFailureNotification : function(chatCreationFailureNotification)
    {
        var error = chatCreationFailureNotification.get_error();
        alert('Bypass Login Form Customization: Chat creation failed:\n' +
              'Error Source: ' + error.get_errorSource() +
              '\nError Type: ' + error.get_errorType() +
              '\nError SubType: ' + error.get_subErrorType() +
              '\nError Code: ' + error.get_errorCode());
        //history.go(-1);
    },

	/**
     * This method is called when a chat is exited successfully.
	 * 
	 * @param chatCompletionNotification An object that implements IChatCompletionNotification. (Ignored)
	 */
    processChatCompletionNotification : function(chatCompletionNotification)
    {
        /**alert('Bypass Login Form Customization: Chat complete!');*/
        //history.go(-1);
if(!!top){
	top.window.close();
}
    },

	/**
     * This method is called when an attempt to exit a chat fails. 
	 * 
	 * @param chatCompletionFailureNotification An object that implements IChatCompletionFailureNotification.
	 */
    processChatCompletionFailureNotification : function(chatCompletionFailureNotification)
    {
        var error = chatCompletionFailureNotification.get_error();
        alert('Bypass Login Form Customization: Chat competion failed:\n' +
              'Error Source: ' + error.get_errorSource() +
              '\nError Type: ' + error.get_errorType() +
              '\nError SubType: ' + error.get_subErrorType() +
              '\nError Code: ' + error.get_errorCode());
        //history.go(-1);
    },

	/**
	 * This method is called when a callback is created successfully.
	 * 
	 * @param callbackCreationNotification An object that implements ICallbackCreationNotification. (Ignored)
	 */
    processCallbackCreationNotification : function(callbackCreationNotification)
    {
        alert('Bypass Login Form Customization: Callback created successfully!');
        //history.go(-1);
    },

	/**
     * This method is called when an attempt to create a callback fails. 
	 * 
	 * @param callbackCreationFailureNotification An object that implements ICallbackCreationFailureNotification.
	 */
    processCallbackCreationFailureNotification : function(callbackCreationFailureNotification)
    {
        var error = callbackCreationFailureNotification.get_error();
        alert('Bypass Login Form Customization: Callback creation failed:\n' +
              'Error Source: ' + error.get_errorSource() +
              '\nError Type: ' + error.get_errorType() +
              '\nError SubType: ' + error.get_subErrorType() +
              '\nError Code: ' + error.get_errorCode());
        //history.go(-1);
    }
});

/**
 * This file simply calls the Bootloader's onLoadedCustomizations() handler, so that Bootloader will know that all 
 * the customizations have completed loading. 
 */
Bootloader.onLoadedCustomizations();


