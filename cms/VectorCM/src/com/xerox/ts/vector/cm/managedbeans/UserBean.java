/**
 * 
 */
package com.xerox.ts.vector.cm.managedbeans;

import java.io.File;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.hex.framework.core.logger.LogFactory;
import com.hex.framework.core.logger.Logger;
import com.xerox.ts.vector.cm.core.BaseLoader;

/**
 * @author C5030183
 *
 */
@ManagedBean(name="userbean")
@SessionScoped
public class UserBean {

	private transient Logger logger = LogFactory.getLogger(this.getClass().getName());
	
	private String username;
	
	private String password;
	
	private List<String> roles=new ArrayList<String>();

	/**
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * @param username the username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * @return the roles
	 */
	public List<String> getRoles() {
		return roles;
	}

	/**
	 * @param roles the roles to set
	 */
	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((password == null) ? 0 : password.hashCode());
		result = prime * result + ((roles == null) ? 0 : roles.hashCode());
		result = prime * result
				+ ((username == null) ? 0 : username.hashCode());
		return result;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserBean other = (UserBean) obj;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (roles == null) {
			if (other.roles != null)
				return false;
		} else if (!roles.equals(other.roles))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "UserBean [username=" + username + ", password=" + password
				+ ", roles=" + roles + "]";
	}

	public String login(){
		
		try {
			
			DocumentBuilderFactory builderFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder =  builderFactory.newDocumentBuilder();
	        Document xmlDocument = builder.parse(new File(BaseLoader.getFilePath("Users.xml")));
	        
	        XPath xPath =  XPathFactory.newInstance().newXPath();

	        logger.info("*************************");
	        String expression = "/Users/User[@username='"+this.username+"']";
	        logger.info(expression);
            Node node = (Node) xPath.compile(expression).evaluate(xmlDocument, XPathConstants.NODE);
            if(null != node) {
            	NodeList nodeList = node.getChildNodes();
                for (int i = 0;null!=nodeList && i < nodeList.getLength(); i++) {
                    Node nod = nodeList.item(i);
                    logger.info(nod.getNodeName());
                    logger.info(""+nod);
                    
                    if("password".equals(nod.getNodeName())){
                    	String val = nod.getFirstChild().getNodeValue();
                    	
                    	logger.info("pass "+val);
                    	if(val.equals(getHashedPassword())){
                    		this.password=val;
                    	}else{
                    		FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Invalid Credentials !!!", "Login Error"));
                        	this.password="";
                        	this.roles = new ArrayList<String>();
                        	return null;
                    	}
                    }else if("role".equals(nod.getNodeName())){
                    	this.roles.add(nod.getFirstChild().getNodeValue());
                    }
                }
                return "main";
            }
            else{
            	FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Not a Valid User !!!", "Login Error"));
            	this.password="";
            	this.roles = new ArrayList<String>();
            	return null;
            }
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.info("Exception occured while validating Login");
			e.printStackTrace();
		}
        
		return null;
	}
	
	private String getHashedPassword() throws NoSuchAlgorithmException{
		MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(password.getBytes());
        byte[] mdbytes = md.digest();
 
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < mdbytes.length; i++) {
          sb.append(Integer.toString((mdbytes[i] & 0xff) + 0x100, 16).substring(1));
        }
        
    	return new String(sb);
	}
	
}
