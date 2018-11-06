package com.xerox.ts.vector.cm.core;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.hex.framework.core.logger.LogFactory;
import com.hex.framework.core.logger.Logger;
import com.xerox.ts.vector.cm.AppConstants;
import com.xerox.ts.vector.cm.helper.FileHelper;

/**
 * Servlet implementation class ImageLoaderServlet
 */
@WebServlet("/ImageLoaderServlet")
public class ImageLoaderServlet extends HttpServlet {
       
	private transient Logger logger = LogFactory.getLogger(this.getClass().getName());
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -7422712316555387923L;

    private static final int DEFAULT_BUFFER_SIZE = 2048; 
    private String imagePath;

    public void init() throws ServletException {

        // Define base path somehow. You can define it as init-param of the servlet.
        this.imagePath = BaseLoader.getProperty(AppConstants.BASE_LOCATION)+File.separator+BaseLoader.language+File.separator+"images";
        logger.info("imagePath ========= "+imagePath);
    }

    /**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        // Get requested image by path info.
    	
    	String fileName = request.getParameter("name");
    	String type = request.getParameter("type");
    	
        String requestedImage = imagePath+(AppConstants.IMAGE_TYPE_IMAGE.equals(type)?"":File.separator+"preview")+(AppConstants.IMAGE_TYPE_TEMP.equals(type)?File.separator+"temp":"")+File.separator+fileName;
        logger.info("requestedImage ========= "+requestedImage);

        File image = new File(requestedImage);

        // Check if file actually exists in filesystem.
        if (!image.exists()) {
        	logger.info("IMAGE FILE NOT FOUND. . . ");
            response.sendError(HttpServletResponse.SC_NOT_FOUND); // 404.
            return;
        }

        // Get content type by filename.
        String contentType = getServletContext().getMimeType(image.getName().toLowerCase());

        if (contentType == null || !contentType.startsWith("image")) {
        	logger.info("NOT A VALID IMAGE . . . contenttype = "+contentType);
            response.sendError(HttpServletResponse.SC_NOT_FOUND); // 404.
            return;
        }

        // Init servlet response.
        response.reset();
        response.setBufferSize(DEFAULT_BUFFER_SIZE);
        response.setContentType(contentType);
        response.setHeader("Content-Length", String.valueOf(image.length()));
        response.setHeader("Content-Disposition", "inline; filename=\"" + image.getName() + "\"");

        // Prepare streams.
        BufferedInputStream input = null;
        BufferedOutputStream output = null;

        try {
            // Open streams.
            input = new BufferedInputStream(new FileInputStream(image), DEFAULT_BUFFER_SIZE);
            output = new BufferedOutputStream(response.getOutputStream(), DEFAULT_BUFFER_SIZE);

            // Write file contents to response.
            byte[] buffer = new byte[DEFAULT_BUFFER_SIZE];
            int length;
            while ((length = input.read(buffer)) > 0) {
                output.write(buffer, 0, length);
            }
        }catch(Exception e){
        	logger.info("EXCEPTION OCCURED. . . ");
            response.sendError(HttpServletResponse.SC_NOT_FOUND); // 404.
            return;
        }finally {
            // Gently close streams.
            FileHelper.closeStream(output);
            FileHelper.closeStream(input);
        }
    }

}
