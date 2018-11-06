package com.xerox.ts.vector.cm.core;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.hex.framework.core.logger.LogFactory;
import com.hex.framework.core.logger.Logger;
import com.xerox.ts.vector.cm.managedbeans.UserBean;

/**
 * Servlet Filter implementation class VectorCMFilter
 */
@WebFilter(urlPatterns="/ui/*")
public class VectorCMFilter implements Filter {
	
	private transient Logger logger = LogFactory.getLogger(this.getClass().getName());

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		// TODO Auto-generated method stub
		logger.info("==================requested . . . ========================");
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse resp = (HttpServletResponse) response;
		HttpSession session = req.getSession(false);

		UserBean user = (UserBean) ((boolean) (session != null) ? session.getAttribute("userbean") : null);
		if (!req.getRequestURI().endsWith("/pages/login.xhtml")) {
			logger.info("Inside....................");
			if (user == null) {
				resp.sendRedirect(req.getContextPath() + "/ui/pages/login.xhtml");
				return;
			}
		}

		chain.doFilter(request, response);
	}

}
