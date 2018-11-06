/**
 * 
 */
package com.xerox.ts.vector.cm.core;

import java.io.File;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.hex.framework.core.logger.LogFactory;
import com.hex.framework.core.logger.Logger;
import com.xerox.ts.vector.cm.AppConstants;

/**
 * @author C5030183
 *
 */
public class StartUpListener implements ServletContextListener {
	
	private transient Logger logger = LogFactory.getLogger(this.getClass().getName());

	/* (non-Javadoc)
	 * @see javax.servlet.ServletContextListener#contextDestroyed(javax.servlet.ServletContextEvent)
	 */
	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		logger.info("CONTEXT DESTROYED.............."+BaseLoader.getProperty(AppConstants.IMAGE_TEMP_LOCATION));
		File tempfile=new File(BaseLoader.getProperty(AppConstants.IMAGE_TEMP_LOCATION));
		for(File file:tempfile.listFiles())
			file.delete();
		tempfile.delete();
	}

	/* (non-Javadoc)
	 * @see javax.servlet.ServletContextListener#contextInitialized(javax.servlet.ServletContextEvent)
	 */
	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		logger.info("CONTEXT INITIALIZED..............");
		new BaseLoader();
	}

}
