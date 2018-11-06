/**
 * 
 */
package com.xerox.ts.vector.cm.helper;

import java.util.ResourceBundle;

import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;

/**
 * @author C5030183
 *
 */
public class MessageHelper {
	
	private static ResourceBundle bundle = ResourceBundle.getBundle("ErrorMessages");

	public static void addErrorMessage(String messageFor,String summary){
		FacesMessage message =  new FacesMessage();
		message.setSeverity(FacesMessage.SEVERITY_ERROR);
		message.setSummary(bundle.getString(summary));
		FacesContext.getCurrentInstance().addMessage(messageFor, message);
	}
	
	public static void addSuccessMessage(String messageFor,String summary){
		FacesMessage message =  new FacesMessage();
		message.setSeverity(FacesMessage.SEVERITY_INFO);
		message.setSummary(bundle.getString(summary));
		FacesContext.getCurrentInstance().addMessage(messageFor, message);
	}
	
	public static void addWarningMessage(String messageFor,String summary){
		FacesMessage message =  new FacesMessage();
		message.setSeverity(FacesMessage.SEVERITY_WARN);
		message.setSummary(bundle.getString(summary));
		FacesContext.getCurrentInstance().addMessage(messageFor, message);
	}
	
}
