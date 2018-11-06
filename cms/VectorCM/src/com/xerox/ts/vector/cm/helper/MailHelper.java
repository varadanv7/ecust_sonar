/**
 * 
 */
package com.xerox.ts.vector.cm.helper;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.xerox.ts.vector.cm.core.BaseLoader;

/**
 * @author c5030183
 *
 */
public class MailHelper {

	private static final String EMAIL_RECEPIENTS = "EMAIL_RECEPIENTS";
	private static final String EMAIL_FROM = "EMAIL_FROM";
	private static final String EMAIL_HOST = "EMAIL_HOST";
	private static final String EMAIL_ENABLE_FLAG = "EMAIL_ENABLE_FLAG";
	private static final String EMAIL_CONTENT = "EMAIL_CONTENT";
	private static final String EMAIL_SUBJECT = "EMAIL_SUBJECT";
	
	public static void notifyOnApproval(String histFileName,String actualFilename,int version) {

		if(!Boolean.parseBoolean(BaseLoader.getProperty(EMAIL_ENABLE_FLAG)))
			return;
			
		Properties properties = System.getProperties();
		properties.setProperty("mail.smtp.host", BaseLoader.getProperty(EMAIL_HOST));
		Session session = Session.getDefaultInstance(properties);
		MimeMessage message = new MimeMessage(session);
		try {
			message.setFrom(new InternetAddress(BaseLoader.getProperty(EMAIL_FROM)));
			
			String[] recepients = BaseLoader.getProperty(EMAIL_RECEPIENTS).split(";");
			for(String recp:recepients){
				message.addRecipient(Message.RecipientType.TO, new InternetAddress(
						recp));
			}
			
			String content = BaseLoader.getProperty(EMAIL_CONTENT);
			
			String[] histItems=histFileName.split("_");
			int length=histItems.length-1;
		
			content = content.replace("{publisher}", histItems[length].substring(0,histItems[length].indexOf(".")));
			content = content.replace("{editor}", histItems[length-1]);
			content = content.replace("{filename}", actualFilename);
			content = content.replace("{version}", ""+version);
			content = content.replace("{update_ts}", new SimpleDateFormat("MM/dd/yyyy hh:mm:ss").format(new Date()));
			
			message.setSubject(BaseLoader.getProperty(EMAIL_SUBJECT));
			message.setContent(content, "text/html");
			Transport.send(message);
		} catch (AddressException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
