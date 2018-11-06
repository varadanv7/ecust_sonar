package com.xerox.ts.vector.cm.helper;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Date;
import java.util.Iterator;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.io.FileUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.hex.framework.core.logger.LogFactory;
import com.hex.framework.core.logger.Logger;
import com.xerox.ts.vector.cm.AppConstants;
import com.xerox.ts.vector.cm.EditablePage;
import com.xerox.ts.vector.cm.core.BaseLoader;

public class PreviewHelper {

	private static Logger logger = LogFactory.getLogger("PreviewHelper");
	
	public static final int MODE_PREVIEW= 1;
	public static final int MODE_APPROVAL= 2;
	
	/**
	 * @param page
	 * @return
	 */
	public static String loadPreview(EditablePage page){
		File file = new File(page.getFullPath()).getParentFile();

		for (File currFile : file.listFiles()) {
			logger.info(currFile.getName());
			if(isSavedPreviewFile(page.getFileName(),currFile.getName())){
				logger.info(file.getAbsolutePath());
				
				File destFile = null;
				
				destFile = new File(currFile.getAbsolutePath().replace(page.getFileext()+".prev", "_"+BaseLoader.getUserName()+"_preview"+page.getFileext()));
				
				String fileName=destFile.getName();
				try {
					FileUtils.copyFile(currFile, destFile);
				} catch (IOException e) {
					logger.info("IOException Occured .....");
					e.printStackTrace();
				}
//				for(EditablePage subpage:page.getSubPages())
//					loadPreviewSubPages(subpage);
				
				String rootpath=file.getName();
				String path="";
				while(!BaseLoader.language.equals(rootpath)){
					path="/"+rootpath+path;
					rootpath=file.getParentFile().getName();
				}
				return BaseLoader.getProperty(AppConstants.PREVIEW_URL_LOCATION)+"/"+BaseLoader.language+path+"/"+fileName;
			}
		}
		return null;
		
	}
	
	/**
	 * @param subpage
	 */
	/*
	private static void loadPreviewSubPages(EditablePage subpage){
		File file = new File(subpage.getFullPath()).getParentFile();

		for (File currFile : file.listFiles()) {
			logger.info(currFile.getName());
			if(isSavedPreviewFile(subpage.getFileName(),currFile.getName())){
				logger.info(file.getAbsolutePath());
				File destFile = new File(currFile.getAbsolutePath().replace(subpage.getFileext()+".prev", "_preview"+subpage.getFileext()));
				try {
					FileUtils.copyFile(currFile, destFile);
				} catch (IOException e) {
					logger.info("IOException Occured .....");
					e.printStackTrace();
				}
			}
		}
		
	}*/
	

	/**
	 * @param fullpath
	 * @param filename
	 * @return
	 */
	public static File getPreviewFile(String fullpath,String filename) {
		File file = new File(fullpath).getParentFile();

		for (File currfile : file.listFiles()) {
			logger.info(currfile.getName());
			if(isSavedPreviewFile(filename,currfile.getName())){
				return currfile;
			}
		}
		return null;
	}

	/**
	 * @param fullpath
	 * @param filename
	 * @return
	 */
	public static boolean checkForPreview(String fullpath,String filename) {
		File file = new File(fullpath).getParentFile();

		for (String currfileName : file.list()) {
			logger.info(currfileName);
			if(isSavedPreviewFile(filename,currfileName)){
				return true;
			}
		}
		return false;
	}
	
	/**
	 * @param fullpath
	 * @param filename
	 * @return
	 */
	public static boolean deletePreview(EditablePage page){
		File file = new File(page.getFullPath()).getParentFile();

		for (File currFile : file.listFiles()) {
			String name = currFile.getName();
			logger.info(name);
			if(PreviewHelper.isSavedPreviewFile(page.getFileName(), name)){
				for(EditablePage subpage:page.getSubPages()){
					deletePreview(subpage);
				}
				try {
					logger.info("Before Delay"+ new Date());
					Thread.sleep(5000);
					System.out.println("File Exists "+currFile.exists());
					currFile.delete();
					System.out.println("File Exists "+currFile.exists());
					logger.info("After Delay"+ new Date());
					
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					Thread.currentThread().interrupt();
				}
				return false;
			}
		}
		
		return true;
	}
	
	/**
	 * @param fullpath
	 * @param filename
	 * @return
	 *//*
	private static boolean deletePreview(String fullpath,String filename){
		File file = new File(fullpath).getParentFile();

		for (File currFile : file.listFiles()) {
			String name = currFile.getName();
			logger.info(name);
			if(PreviewHelper.isSavedPreviewFile(filename, name)){
				currFile.delete();
				return false;
			}
		}
		
		return true;
	}*/
	
	/**
	 * @param location
	 * @throws InterruptedException 
	 */
	public static void deleteAllTempPreviewFiles(String location){
		
		File file = new File(location);
			for(File currFile:file.listFiles()){
				if(currFile.isDirectory())
					deleteAllTempPreviewFiles(currFile.getAbsolutePath());
				else if(null != currFile.getName() && currFile.getName().contains(BaseLoader.getUserName()+"_preview.")){
					currFile.delete();
				}
				else if(null != currFile.getName() && currFile.getName().contains("_xmlprev_"+BaseLoader.getUserName()))
					currFile.delete();
			}
	}
	
	
	public static void approvePreviewForXML(EditablePage currPage){
		File file = new File(currPage.getFullPath()).getParentFile();
		File prevFile=null;
		File newFile=null;
		for (File currFile : file.listFiles()) {
			String name=currFile.getName();
			
			if(PreviewHelper.isSavedPreviewFile(currPage.getFileName(), name)){
				prevFile = currFile;
			}
			else if((currPage.getFileName()+currPage.getFileext()).equalsIgnoreCase(name)){
				newFile = currFile;
			}
			
		}
		int version = histFileVersion(currPage)+1;
		
		File histFile = new File(BaseLoader.getProperty("BASE_LOCATION")+File.separator+BaseLoader.language+File.separator+"CMHistory"
				+File.separator+prevFile.getName().replace("_prev.xml", "")
				+"_"+BaseLoader.getUserName()+".xml."+version);
		try{
			FileUtils.copyFile(newFile,histFile);
			FileUtils.copyFile(prevFile,newFile);
		
	        prevFile.delete();
			
			MailHelper.notifyOnApproval(histFile.getName(), currPage.getFileName()+currPage.getFileext(),version+1);
	        
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/**
	 * @param currPage
	 */
	public static void approvePreview(EditablePage currPage){
		File file = new File(currPage.getFullPath()).getParentFile();
		File prevFile=null;
		File newFile=null;
		int highestVersion=0;

		for (File currFile : file.listFiles()) {
			
			String name=currFile.getName();
			
			if(PreviewHelper.isSavedPreviewFile(currPage.getFileName(), name)){
				prevFile = currFile;
			}
			else if((currPage.getFileName()+currPage.getFileext()).equalsIgnoreCase(name)){
				newFile = currFile;
			}
			
		}
		
		highestVersion = histFileVersion(currPage);
		logger.info("Version ===  "+highestVersion);
		
		removePreviewStyleOnApproval(prevFile, false, currPage.isSkipEncloseTags());
		
		int version=highestVersion+1;
		
		File histFile = new File(BaseLoader.getProperty("BASE_LOCATION")+File.separator+BaseLoader.language+File.separator+"CMHistory"
					+File.separator+prevFile.getName().replace(currPage.getFileext()+".prev", "")
					+"_"+BaseLoader.getUserName()
					+currPage.getFileext()+"."+version);
		
		FileHelper.movePreviewImagesToMain(prevFile,currPage.getFileName(),false,currPage.isSkipEncloseTags(),version,"");
		
		for(EditablePage subpage:currPage.getSubPages()){
			approvePreviewSubPages(subpage,version,currPage.getFileName());
		}
		
		try {
			
			FileUtils.copyFile(newFile,histFile);
			FileHelper.writeContentToFile(newFile.getAbsolutePath(), updatePageforSubpages(currPage, FileHelper.readFileAsString(prevFile), MODE_APPROVAL,prevFile));
			
			prevFile.delete();
			
			MailHelper.notifyOnApproval(histFile.getName(), currPage.getFileName()+currPage.getFileext(),version+1);
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}
	
	/**
	 * @param subpage
	 * @param version
	 */
	public static void approvePreviewSubPages(EditablePage subpage,int version,String parentFileName){
		
		File file = new File(subpage.getFullPath()).getParentFile();
		File prevFile=null;
		File newFile=null;

		for (File currFile : file.listFiles()) {
			String name=currFile.getName();
			
			if(PreviewHelper.isSavedPreviewFile(subpage.getFileName(), name)){
				prevFile = currFile;
			}
			else if((subpage.getFileName()+subpage.getFileext()).equalsIgnoreCase(name)){
				newFile = currFile;
			}
		}
		
		if(prevFile == null)return;
		
		removePreviewStyleOnApproval(prevFile, true, false);
		
		File histFile = new File(BaseLoader.getProperty("BASE_LOCATION")+File.separator+BaseLoader.language+File.separator+"CMHistory"
					+File.separator+parentFileName
					+"_"+prevFile.getName().replace(subpage.getFileext()+".prev", "")
					+"_"+BaseLoader.getUserName()
					+subpage.getFileext()+"."+version);
		
		FileHelper.movePreviewImagesToMain(prevFile,subpage.getFileName(),true,true,version,parentFileName);
		
		try {
			FileUtils.copyFile(newFile,histFile);
			FileUtils.copyFile(prevFile,newFile);
			
			prevFile.delete();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	/**
	 * @param currPage
	 * @param mode
	 * @return
	 */
	public static String updatePageforSubpages(EditablePage currPage,String html,int mode,File prevFile){
		
		for(EditablePage subPage:currPage.getSubPages()){
			if(mode == MODE_PREVIEW){
				if(subPage.isFileChanged() ){
					
					String match = checkSubpagePatternExists(html, subPage.getFileName(),subPage.getFileext());
					if(null != match){
						html = html.replaceAll(match, subPage.getFileName()+"_"+BaseLoader.getUserName()+subPage.getFileext()+".prev");
						currPage.setFileChanged(true);
					}
				}
			}else if(mode == MODE_APPROVAL){
				
				BufferedReader file=null;
				String line="";String newline = "";
				try {
					file = new BufferedReader(new FileReader(prevFile));
					
					while ((line = file.readLine()) != null) {
						if(line.contains("file=\"") && line.contains(subPage.getFileName()) && line.contains(subPage.getFileext()+".prev\"")){
							newline = line.replace(line.substring(line.lastIndexOf("_"),line.lastIndexOf("prev")+4),subPage.getFileext());
							break;
						}
					}
					 
				} catch (FileNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}finally{
					FileHelper.closeStream(file);
				}
		        if(line != null)
		        	html = html.replaceAll(line, newline);
			}
		}
		return html;
	}
	
	public static String checkSubpagePatternExists(String page,String subpageName,String subpageExt){
		Pattern pattern = Pattern.compile(subpageName+"\\S*"+subpageExt+"[.prev]*");
		Matcher matcher = pattern.matcher(page);
		if (matcher.find()) {
		    logger.info(matcher.group(0)); //prints /{item}/
		    return matcher.group(0);
		} else {
			return null;
		}
	}
	
	/**
	 * @param pageName
	 * @param name
	 * @return
	 */
	public static boolean isSavedPreviewFile(String pageName,String name){
		if(name.startsWith(pageName) && (name.endsWith("_prev.xml") || name.endsWith(".prev"))){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * @param pageName
	 * @param extn
	 * @param name
	 * @param username
	 * @return
	 */
	public static boolean isTempPreviewFile(String pageName,String extn,String name,String username){
		return name.startsWith(pageName) && name.endsWith("_"+username+"_preview"+extn);
	}
	
	/**
	 * @param pageName
	 * @param extn
	 * @param name
	 * @return
	 */
	public static int histFileVersion(EditablePage page){
		
		File file = new File(BaseLoader.getProperty("BASE_LOCATION")+File.separator+BaseLoader.language+File.separator+"CMHistory");
		String name = "";
		int currVersion = 0;
		
		for(File currFile:file.listFiles()){
			name = currFile.getName();
			if(name.startsWith(page.getFileName()) && name.contains(page.getFileext()+".")){
				int version = Integer.parseInt(name.substring(name.lastIndexOf(".")+1));
				currVersion=version>currVersion?version:currVersion;
			}
		}
		
		return currVersion;
	}
	
	public static File removePreviewStyleOnApproval(File file,boolean isSubPage,boolean skipEnclose){
		String fileContent = FileHelper.readFileAsString(file);
		Document doc = null;
		String html = null;
		
		if(isSubPage)
			doc = Jsoup.parseBodyFragment(fileContent);
		else
			doc = Jsoup.parse(fileContent);

		doc.outputSettings().prettyPrint(false).charset("UTF-8");
		
		Elements elements = doc.getElementsByClass("prevHighlight");
		Iterator<Element> elemIter = elements.iterator();
		while(elemIter.hasNext()){
			elemIter.next().removeClass("prevHighlight");
		}
		
		if(isSubPage || skipEnclose)
			html = doc.getElementsByTag("head").html()+doc.getElementsByTag("body").html();
		else{
			html = doc.outerHtml();
		}
		
		FileHelper.writeContentToFile(file.getAbsolutePath(), html);
		return file;
	}
}
