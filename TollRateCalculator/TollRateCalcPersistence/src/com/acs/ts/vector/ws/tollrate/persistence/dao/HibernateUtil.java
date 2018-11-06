package com.acs.ts.vector.ws.tollrate.persistence.dao;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.cfg.Configuration;

/**
 * 
 * @author 20423829
 *
 */
public class HibernateUtil {
//	private VectorWSLogger logger = new VectorWSLogger("WEBSERVICE", this.getClass().getName());

    /**
     * Location of hibernate.cfg.xml file. NOTICE: Location should be on the
     * classpath as Hibernate uses #resourceAsStream style lookup for its
     * configuration file. That is place the config file in a Java package - the
     * default location is the default Java package.<br>
     * <br>
     * Examples: <br>
     * <code>CONFIG_FILE_LOCATION = "/hibernate.conf.xml". 
     * CONFIG_FILE_LOCATION = "/com/foo/bar/myhiberstuff.conf.xml".</code>
     */
    private static String CONFIG_FILE_LOCATION = "/hibernate.cfg.xml";

    /** Holds a single instance of Session */
    private static final ThreadLocal<Object> threadLocal = new ThreadLocal<Object>();

    public static boolean USE_CMP_TRANSACTION = true;

    /** The single instance of hibernate configuration */
    private static final Configuration cfg = new Configuration();

    /** The single instance of hibernate SessionFactory */
    private static org.hibernate.SessionFactory sessionFactory;

    /**
     * Returns the ThreadLocal Session instance. Lazy initialize the
     * <code>SessionFactory</code> if needed.
     * 
     * @return Session
     * @throws HibernateException
     */
    public static Session currentSession()
        throws HibernateException {
        // Hiberante > 3.0 and CMT does not require thread local settings.
        if (USE_CMP_TRANSACTION) {
            if (sessionFactory == null) {
                cfg.configure(CONFIG_FILE_LOCATION);
                sessionFactory = cfg.buildSessionFactory();
            }
            return sessionFactory.openSession();
        }
        else {
            Session session = (Session) threadLocal.get();
            if (session == null
                || session.isDirty()) {
                try {
                    if (sessionFactory == null) {
                        cfg.configure(CONFIG_FILE_LOCATION);
                        sessionFactory = cfg.buildSessionFactory();
                    }
                    session = sessionFactory.openSession();
                    threadLocal.set(session);
                }
                catch (HibernateException hbex) {
                    throw hbex;
                }
            }

            return session;
        }
    }

    /**
     * 
     * @return
     */
    public static org.hibernate.SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    /**
     * Close the single hibernate session instance.
     * 
     * @throws HibernateException
     */
    public static void closeSession()
        throws HibernateException {
        if (!USE_CMP_TRANSACTION) {
            Session session = (Session) threadLocal.get();
            threadLocal.set(null);
            if (session != null) {
                session.close();
            }
        }
    }

    /**
     * 
     * @param sess
     * @throws HibernateException
     */
    public static void closeHostSession(Session sess)
        throws HibernateException {
        if (sess != null) {
            sess.close();
        }
    }

    /**
     * 
     * @throws HibernateException
     */
    private HibernateUtil() throws HibernateException {
    }
}
