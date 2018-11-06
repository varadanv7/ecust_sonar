/**
 * 
 */
package com.acs.ts.vector.ws.tollrate.util.jndi;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.ejb.EJBLocalHome;
import javax.jms.Queue;
import javax.jms.QueueConnectionFactory;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

/**
 * @author abasheer
 *
 */
public class ServiceLocator {

	
	private Map<String, Object> serviceLocatorCache;
	private static ServiceLocator factory = null;
	private Context context;
	private final static String JAVA_COMP = "java:comp/env/";
	
	/**
	 * constructor for ServiceLocator
	 */
	private ServiceLocator() throws NamingException {
		context = new InitialContext();
		this.serviceLocatorCache = Collections.synchronizedMap(new HashMap<String, Object>());
	}


	/**
	*  This method creates and returns the single instance of the ServiceLocator
	*
	* @return ServiceLocator
	* @throws NamingException
	*
	**/
	public static ServiceLocator getInstance() throws NamingException {
		if (ServiceLocator.factory == null) {
			ServiceLocator.factory = new ServiceLocator();
		}
		return ServiceLocator.factory;
	}

	/**
	*  Method to lookup the EJBLocalHome class and return the reference.
	*  If EJBLocalHome class is not found in the cache, it will lookup from the
	*  Directory Service and add it to cache and return the reference.
	*
	* @param localHomeName
	* @return EJBLocalHome
	* @throws NamingException
	* @throws ClassNotFoundException
	*
	**/
	public EJBLocalHome getLocalHome(String localHomeName)
			throws NamingException {
		EJBLocalHome ejbLocalHome = null;

		if (serviceLocatorCache.containsKey(localHomeName)) {
			ejbLocalHome = (EJBLocalHome) serviceLocatorCache
					.get(localHomeName);
		} else {
			ejbLocalHome = (EJBLocalHome) context.lookup(new StringBuffer(
					JAVA_COMP).append(localHomeName).toString());
			serviceLocatorCache.put(localHomeName, ejbLocalHome);
		}
		return ejbLocalHome;
	}
	
	/**
	*  This method returns the reference of the QueueConnectionFactory. 
	*  If QueueConnectionFactory class is not found in the cache, it will lookup from the 
	*  Directory Service and add it to cache and return the reference.
	*    
	* @param queueConnectionFactoryName
	* @return QueueConnectionFactory
	* @throws NamingException
	*
	**/
	public QueueConnectionFactory getQueueConnectionFactory(String queueConnectionFactoryName)
			throws NamingException
	{
		QueueConnectionFactory trcsQcf = null;
		
		if (serviceLocatorCache.containsKey(queueConnectionFactoryName))
		{
			trcsQcf = 
				(QueueConnectionFactory)serviceLocatorCache.get(queueConnectionFactoryName);
		}
		else
		{
			trcsQcf = 
				(javax.jms.QueueConnectionFactory)context.lookup(JAVA_COMP + queueConnectionFactoryName);
			serviceLocatorCache.put(queueConnectionFactoryName, trcsQcf); 
		}
		
		return trcsQcf;
	} 
	
	/**
	*  This method returns the reference of the Queue. 
	*  If Queue class is not found in the cache, it will lookup from the 
	*  Directory Service and add it to cache and return the reference.
	*    
	* @param queueName
	* @return Queue
	* @throws NamingException
	*
	**/
	public Queue getQueue(String queueName) throws NamingException
	{
		Queue trcsQueue = null;
		
		if (serviceLocatorCache.containsKey(queueName))
		{
			trcsQueue = (Queue) serviceLocatorCache.get(queueName);
		}
		else
		{
			trcsQueue = (javax.jms.Queue) context.lookup(queueName);
			serviceLocatorCache.put(queueName, trcsQueue);
		}
		
		return trcsQueue;
	}
}
