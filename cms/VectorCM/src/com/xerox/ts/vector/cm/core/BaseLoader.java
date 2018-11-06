/**
 * 
 */
package com.xerox.ts.vector.cm.core;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.faces.context.FacesContext;
import javax.servlet.http.HttpSession;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import org.apache.commons.io.FilenameUtils;

import com.hex.framework.core.logger.LogFactory;
import com.hex.framework.core.logger.Logger;
import com.xerox.ts.vector.cm.AppConstants;
import com.xerox.ts.vector.cm.EditableFile;
import com.xerox.ts.vector.cm.EditableFiles;
import com.xerox.ts.vector.cm.EditablePage;
import com.xerox.ts.vector.cm.ExistingFiles;
import com.xerox.ts.vector.cm.ExistingImage;
import com.xerox.ts.vector.cm.helper.FileHelper;
import com.xerox.ts.vector.cm.managedbeans.UserBean;

/**
 * @author C5030183
 *
 */
public class BaseLoader {

	private static Properties properties = new Properties();
	private static EditableFiles editableFiles = new EditableFiles();
	private static SimpleDateFormat formatter = new SimpleDateFormat("MMddyyyyHHmmssSSS");
	private static transient Logger logger = LogFactory.getLogger("BaseLoader");
	public static String language="en";
	private static List<String> skipFolders = new ArrayList<String>();
	private static List<ExistingImage> imageFiles = new ArrayList<ExistingImage>();
	private static List<ExistingFiles> files = new ArrayList<ExistingFiles>();
	
	public BaseLoader(){
		loadProperties();
		loadEditableFiles();
		loadExistingImages();
		loadExistingFiles();
		File file = new File(getProperty(AppConstants.IMAGE_TEMP_LOCATION));
		if(!file.exists())
			file.mkdirs();
		
	}
	
	
	
	/**
	 * @param location
	 * @return
	 */
	public static Map<String, EditablePage> loadEditablePages(String location) {
		logger.info(location);
		Map<String, EditablePage> editablePages = new LinkedHashMap<String, EditablePage>();
		EditablePage currPage = null;

		File[] faFiles = new File(location).listFiles();
		File subFileObj = null;
		
		for (File file : faFiles) {
			logger.info(file.getName());
			EditableFile editableFile = editableFiles.getFileByName(file.getName());
			if (file.isDirectory()
					|| null != editableFile) {
				EditablePage page = new EditablePage(file.getName(),file.getAbsolutePath(),file.isDirectory(),
										FileHelper.checkPreviewToReadFile(file),
											null==editableFile?false:editableFile.isAddEnabled(),
													null==editableFile?false:editableFile.isSkipEncloseTags(),
															null==editableFile?false:editableFile.isFaqpage(),
																	null==editableFile?false:editableFile.isMap());
				page.setNoHighlight(null==editableFile?false:editableFile.isNoHighlight());
				currPage = page;
				
				if(!file.isDirectory()){
					if(null != editableFile.getInclude()){
						for(String subFile:editableFile.getInclude()){
							subFileObj=new File(BaseLoader.getProperty("BASE_LOCATION")+"/"+BaseLoader.language+"/"+subFile);
							
							EditablePage subpage = new EditablePage(subFileObj.getName(),subFileObj.getAbsolutePath(),false,FileHelper.checkPreviewToReadFile(subFileObj),false,false,false,false);
							subpage.setNoHighlight(null==editableFile?false:editableFile.isNoHighlight());
							subpage.setInnerPage(true);
							currPage.getSubPages().add(subpage);
						}
					}
					if(editableFile.isMap() && null != editableFile.getMapRefPage()){
						for(String subFile:editableFile.getMapRefPage()){
							subFileObj=new File(BaseLoader.getProperty("BASE_LOCATION")+"/"+BaseLoader.language+"/"+subFile);
							
							EditablePage subpage = new EditablePage(subFileObj.getName(),subFileObj.getAbsolutePath(),false,FileHelper.checkPreviewToReadFile(subFileObj),false,false,false,false);
							currPage.getMapRefPages().add(subpage);
							
						}
					}
				}
				if(!skipFolders.contains(file.getName()))
					editablePages.put(file.getName(), currPage);
			}
		}
		return editablePages;
	}
	
	/**
	 * 
	 */
	private void loadProperties() {

        try {
            properties.load(new FileReader(getFilePath("BaseProperties.properties")));
            
            logger.info(""+properties);
            
            String[] skipFldrs = properties.get("SKIP_FOLDERS").toString().split(",");
            for(String str:skipFldrs)
            	skipFolders.add(str);
            
        } catch (IOException e) {
            logger.info("Exception Occurred" + e.getMessage());
            e.printStackTrace();
        }
        
	}
	
	/**
	 * 
	 */
	private void loadEditableFiles() {

        try {
        	JAXBContext context = JAXBContext.newInstance(EditableFiles.class);
            Unmarshaller unMarshaller = context.createUnmarshaller();
            editableFiles = (EditableFiles) unMarshaller.unmarshal(new FileReader(getFilePath("EditableFiles.xml")));
            
            logger.info("editableFiles :- " + editableFiles);

        } catch (JAXBException e) {
			// TODO Auto-generated catch block
        	logger.info("JAXBException Occurred" + e.getMessage());
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			logger.info("FileNotFoundException Occurred" + e.getMessage());
			e.printStackTrace();
		}
	}
	
	/**
	 * 
	 */
	private void loadExistingImages() {

		File[] faFiles = new File(getProperty(AppConstants.IMAGE_LOCATION)).listFiles();
		if(imageFiles == null )imageFiles = new ArrayList<ExistingImage>();
		else imageFiles.clear();
		List<String> allowedtypes = Arrays.asList(getProperty("IMAGE_FILE_TYPES_ALLOWED").split("\\|"));
		int i=1111;
		for (File file : faFiles) {
			logger.info(file.getName());
			String ext = FilenameUtils.getExtension(file.getName());
			if(!allowedtypes.contains(ext.toLowerCase()))continue;
			imageFiles.add(new ExistingImage(i, file.getName(), file.getAbsolutePath(), file.length(),ext));
			i++;
		}
	}
	
	private void loadExistingFiles() {
		
		File[] pdfFileList = new File(getProperty(AppConstants.FILE_LOCATION_REF)).listFiles();
		if(files == null) files = new ArrayList<ExistingFiles>();
		else files.clear();
		List<String> allowedTypes = Arrays.asList(getProperty("FILE_TYPES_ALLOWED").split("\\|"));
		int i=1111;
		for(File file : pdfFileList){
			logger.info(file.getName());
			String ext = FilenameUtils.getExtension(file.getName());
			if(!allowedTypes.contains(ext.toLowerCase()))continue;
			files.add(new ExistingFiles(i, file.getName(), file.getAbsolutePath(), file.length(), ext));
			i++;
		}
		
	}
	
	/**
	 * @param key
	 * @return
	 */
	public static String getProperty(String key){
		if(AppConstants.IMAGE_LOCATION.equals(key))
			return properties.get(AppConstants.BASE_LOCATION)
					+File.separator+language+File.separator+"images";
		else if(AppConstants.IMAGE_PREVIEW_LOCATION.equals(key))
			return properties.get(AppConstants.BASE_LOCATION)
					+File.separator+language+File.separator+"images"
					+File.separator+AppConstants.IMAGE_TYPE_PREVIEW;
		else if(AppConstants.IMAGE_TEMP_LOCATION.equals(key))
			return properties.get(AppConstants.BASE_LOCATION)
					+File.separator+language+File.separator+"images"
					+File.separator+AppConstants.IMAGE_TYPE_PREVIEW+File.separator
					+AppConstants.IMAGE_TYPE_TEMP;
		else if(AppConstants.FILE_LOCATION_REF.equals(key))
			return properties.get(AppConstants.BASE_LOCATION)+File.separator+language+File.separator+"images"+File.separator;
		else
			return ""+properties.get(key);
	}
	
	/**
	 * 
	 * @param filename
	 * @param type
	 * @return
	 */
	public static String getImagePath(String filename,String type){		
		return properties.get(AppConstants.IMAGE_SERVLET)+"name="+filename+"&type="+type;
	}
	
	/**
	 * @param filename
	 * @return
	 */
	public static String getFilePath(String filename){		
		return System.getProperty("Application.home")+filename;
	}
	
	/**
	 * @return
	 */
	public static String getUserName(){
		String uname = "";
		try{
			UserBean user = (UserBean) ((HttpSession)FacesContext.getCurrentInstance().getExternalContext().getSession(false)).getAttribute("userbean");
			uname = user.getUsername();
		}catch(Exception ex){
			logger.info("Exception Occured While getting username... "+ex.getMessage());
			ex.printStackTrace();
		}
		return uname;
	}
	
	public static String getUniqueId(){
		return formatter.format(new Date());
	}

	/**
	 * @return the imageFiles
	 */
	public static List<ExistingImage> getImageFiles() {
		return imageFiles;
	}



	public static List<ExistingFiles> getFiles() {
		return files;
	}



	public static void setFiles(List<ExistingFiles> files) {
		BaseLoader.files = files;
	}

}