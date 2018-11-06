/**
 * 
 */
package com.xerox.ts.vector.cm.core;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import com.hex.framework.core.logger.LogFactory;
import com.hex.framework.core.logger.Logger;
import com.xerox.ts.vector.cm.AppConstants;
import com.xerox.ts.vector.cm.helper.PreviewHelper;

/**
 * @author C5030183
 *
 */
public class SessionTimerListener implements HttpSessionListener {
	
	private transient Logger logger = LogFactory.getLogger(this.getClass().getName());
	
	private static int count=0;
	
	public static String username = "";

	/* (non-Javadoc)
	 * @see javax.servlet.http.HttpSessionListener#sessionCreated(javax.servlet.http.HttpSessionEvent)
	 */
	@Override
	public void sessionCreated(HttpSessionEvent arg0) {
		// TODO Auto-generated method stub
		count++;
		logger.info("sessionCreated - add one session into counter  "+ count);
		HttpSession session = arg0.getSession();
		logger.info("session.getMaxInactiveInterval()  == "+session.getMaxInactiveInterval());
		logger.info("timeout  == "+(session.getMaxInactiveInterval()*1000-120000));
		session.setAttribute("timeout", (session.getMaxInactiveInterval()*1000-120000));
	}

	
	/* (non-Javadoc)
	 * @see javax.servlet.http.HttpSessionListener#sessionDestroyed(javax.servlet.http.HttpSessionEvent)
	 */
	@Override
	public void sessionDestroyed(HttpSessionEvent arg0) {
		// TODO Auto-generated method stub
		count--;
		logger.info("sessionDestroyed - deduct one session from counter   "+ count);
		PreviewHelper.deleteAllTempPreviewFiles(BaseLoader.getProperty(AppConstants.BASE_LOCATION));;
	}

	/**
	 * @param username the username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}

}
