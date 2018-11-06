/**
 * 
 */
package com.xerox.ts.vector.cm.helper;

import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.BufferedWriter;
import java.io.Closeable;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.Scanner;

import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.imageio.ImageIO;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.primefaces.model.UploadedFile;

import com.hex.framework.core.logger.LogFactory;
import com.hex.framework.core.logger.Logger;
import com.xerox.ts.vector.cm.AppConstants;
import com.xerox.ts.vector.cm.ComponentType;
import com.xerox.ts.vector.cm.core.BaseLoader;
import com.xerox.ts.vector.cm.managedbeans.CMPageBean;

/**
 * @author c5030183
 *
 */
public class FileHelper {

	private static transient Logger logger = LogFactory.getLogger("FileHelper");
	private static final String IMAGE_SCAN_IP			= "IMAGE_SCAN_IP";
	private static final String IMAGE_SCAN_PORT			= "IMAGE_SCAN_PORT";
	private static final String IMAGE_SCAN_MODE			= "IMAGE_SCAN_MODE";
	
	/**
	 * @param file
	 * @return
	 */
	public static String readFileAsString(File file) {
		FileReader in = null;
		StringBuilder contents = new StringBuilder();
		try {
			in = new FileReader(file);

			char[] buffer = new char[4096];
			int read = 0;
			do {
				contents.append(buffer, 0, read);
				read = in.read(buffer);
			} while (read >= 0);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			logger.info("FileNotFoundException Occurred" + e.getMessage());
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			logger.info("IOException Occurred" + e.getMessage());
			e.printStackTrace();
		}finally{
			closeStream(in);
		}
		return contents.toString();
	}
	
	
	public static String checkPreviewToReadFile(File file) {
		if(!file.isDirectory()){
			File prevFile = PreviewHelper.getPreviewFile(file.getAbsolutePath(), file.getName().substring(0,file.getName().lastIndexOf(".")));
			if(null == prevFile)
				return FileHelper.readFileAsString(file);
			else
				return FileHelper.readFileAsString(prevFile);
		}
		return null;
		
	}
	
	/**
	 * @param location
	 * @param content
	 */
	public static void writeContentToFile(String location,String content){
		
		FileOutputStream fop = null;
		BufferedWriter htmlWriter=null;
		
		logger.info(location);
		
		try {
			File file = new File(location);
			fop = new FileOutputStream(file);
			if (!file.exists()) {
				file.createNewFile();
			}
			
			OutputStreamWriter writer = new OutputStreamWriter(fop, "UTF-8");
			htmlWriter = new BufferedWriter(writer);
			
			htmlWriter.write(content);
			
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			logger.info("UnsupportedEncodingException");
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			logger.info("FileNotFoundException");
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			logger.info("IOException");
			e.printStackTrace();
		}finally{
			closeStream(htmlWriter);
			closeStream(fop);
		}
	}
	
	
	/**
	 * @param newFile
	 * @param issubpage
	 */
	public static void movePreviewImagesToMain(File newFile,String pagename,boolean issubpage,boolean skipEncloseTag,int version,String parentFileName){
		
		Document doc = issubpage?Jsoup.parseBodyFragment(readFileAsString(newFile)):Jsoup.parse(readFileAsString(newFile));
		doc.outputSettings().prettyPrint(false).charset("UTF-8");
		
		Elements elmnts = doc.getElementsByTag(ComponentType.COMP_IMAGE.getTagName());
		
		String newname,newtype,actualName,prevLoc;
		File prevImage,newImage;
		
		prevImage = newImage = null;
		newname = newtype = actualName = prevLoc = null;
		
		for(Element currComponent:elmnts){
			String s = currComponent.parent().attr("class");
			
			if(currComponent.hasAttr("editarea") || BaseLoader.getProperty(SectionComponentBuilder.SECTION_PANEL_IMAGE_CLASS).trim().equals(s.trim())){
				String src= currComponent.attr("src");
				
				/**
				 * Moving preview image to actual location
				 */
				
				if(src.contains("/preview/")){
					newname = src.substring(src.lastIndexOf("/")+1);
					newtype = newname.substring(newname.lastIndexOf("."));
					actualName = newname.substring(0,newname.indexOf("_"+pagename));
					
					prevLoc = BaseLoader.getProperty(AppConstants.IMAGE_PREVIEW_LOCATION);
					try {
						prevImage = new File(prevLoc+File.separator+newname);
						newImage = new File(BaseLoader.getProperty(AppConstants.IMAGE_LOCATION)+File.separator+actualName+newtype);
						
						if(newImage.exists())
							newImage.delete();
						
						FileUtils.moveFile(prevImage, newImage);
						currComponent.attr("src", src.replace("preview/"+newname, actualName+newtype));
						currComponent.removeAttr("oldImg");
					} catch (IOException e) {
						// TODO Auto-generated catch block
						logger.info("IOException");
						e.printStackTrace();
					}
				}
				
				/**
				 * Saving old image to history
				 */
				
				String oldname,oldtype,histname;
				File oldImage,histImage;
				oldname = oldtype = histname = null;
				oldImage = histImage = null;
				
				String oldSrc = currComponent.attr("oldImg");
				if(oldSrc != null && oldSrc.trim().length()>0){
					oldname = oldSrc.substring(oldSrc.lastIndexOf("/")+1);
					oldtype = oldname.substring(oldname.lastIndexOf("."));
					histname = oldname.replace(oldtype, (issubpage?"_"+parentFileName:"")+"_"+pagename+"_"+BaseLoader.getUserName()+oldtype);
					
					if(oldname != null){
						oldImage = new File(BaseLoader.getProperty(AppConstants.IMAGE_LOCATION)+File.separator+oldname);
						histImage = new File(BaseLoader.getProperty("BASE_LOCATION")+File.separator+BaseLoader.language+File.separator+"CMHistory"
									+File.separator+histname+"."+version);
					}
					
					if(oldImage != null)
						try {
							FileUtils.copyFile(oldImage, histImage);
						} catch (IOException e) {
							// TODO Auto-generated catch block
							logger.info("IOException");
							e.printStackTrace();
						}
				}
			}
		}
		
		String html = "";
		if(issubpage || skipEncloseTag)
			html = doc.getElementsByTag("head").html()+doc.getElementsByTag("body").html();
		else
			html = doc.outerHtml();
		
		writeContentToFile(newFile.getAbsolutePath(), html);
		
	}
	
	public static boolean isvalidImageFile(UploadedFile uploadedFile) {

		boolean validImage=false;
		
		try {
			
			String name = FilenameUtils.getName(uploadedFile.getFileName());
			String type = uploadedFile.getContentType().toLowerCase();
			type = type.substring(type.lastIndexOf("/") + 1, type.length());
					
			File imageFile = new File(BaseLoader.getProperty(AppConstants.IMAGE_TEMP_LOCATION)
										+ File.separator + name);
			if (!imageFile.exists())
				imageFile.mkdirs();

			BufferedImage image = ImageIO.read(uploadedFile.getInputstream());
			ImageIO.write(image,type,imageFile);

			if(hasVirus(imageFile.getAbsolutePath())){
				FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Image Scanning Failed...",""));
				imageFile.delete();
				return false;
			}
			validImage=true;
			
		} catch (IOException e) {
			logger.info("IOException Occurred" + e.getMessage());
			e.printStackTrace();
		}

		return validImage;
	}
	
	private static boolean hasVirus(String location){
		ScanClient avc = new ScanClient(
				BaseLoader.getProperty(IMAGE_SCAN_IP),
				Integer.parseInt(BaseLoader.getProperty(IMAGE_SCAN_PORT)),
				BaseLoader.getProperty(IMAGE_SCAN_MODE));

		return (-1 == avc.scanfile(location));
	}
	
	/**
	 * @param resource
	 */
	public static void closeStream(Closeable resource) {
        if (resource != null) {
            try {
                resource.close();
            } catch (IOException e) {
                // Do your thing with the exception. Print it, log it or mail it.
            	logger.info("IOException Occurred" + e.getMessage());
                e.printStackTrace();
            }
        }
    }
	
	public static boolean isvalidFile(UploadedFile uploadedFile) {

		boolean validImage=false;
		
		try {
			
			String name = FilenameUtils.getName(uploadedFile.getFileName());
			String type = uploadedFile.getContentType().toLowerCase();
			type = type.substring(type.lastIndexOf("/") + 1, type.length());
					
			File file = new File(BaseLoader.getProperty(AppConstants.IMAGE_TEMP_LOCATION)
										+ File.separator + name);
			
			if(hasVirus(file.getAbsolutePath())){
				FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Image Scanning Failed...",""));
				file.delete();
				return false;
			}
			validImage=true;
			
		} catch (Exception e) {
			logger.info("Exception Occurred" + e.getMessage());
			e.printStackTrace();
		}

		return validImage;
	}
}
