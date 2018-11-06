/**
 * 
 */
package com.xerox.ts.vector.cm.managedbeans;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.component.html.HtmlSelectOneListbox;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;
import javax.faces.event.AjaxBehaviorEvent;
import javax.faces.model.SelectItem;
import javax.servlet.http.HttpSession;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.primefaces.event.FileUploadEvent;
import org.primefaces.model.UploadedFile;

import com.hex.framework.core.logger.LogFactory;
import com.hex.framework.core.logger.Logger;
import com.xerox.ts.vector.cm.AppConstants;
import com.xerox.ts.vector.cm.ComponentType;
import com.xerox.ts.vector.cm.EditableComponent;
import com.xerox.ts.vector.cm.EditablePage;
import com.xerox.ts.vector.cm.ExistingFiles;
import com.xerox.ts.vector.cm.ExistingImage;
import com.xerox.ts.vector.cm.Location;
import com.xerox.ts.vector.cm.Locations;
import com.xerox.ts.vector.cm.core.BaseLoader;
import com.xerox.ts.vector.cm.helper.CMpageHelper;
import com.xerox.ts.vector.cm.helper.FaqPageMapper;
import com.xerox.ts.vector.cm.helper.FileHelper;
import com.xerox.ts.vector.cm.helper.MailHelper;
import com.xerox.ts.vector.cm.helper.MessageHelper;
import com.xerox.ts.vector.cm.helper.Messages;
import com.xerox.ts.vector.cm.helper.PreviewHelper;
import com.xerox.ts.vector.cm.helper.SectionComponentBuilder;


/**
 * @author C5030183
 *
 */
@ManagedBean(name="cmpagebean")
@SessionScoped
public class CMPageBean{

	private transient Logger logger = LogFactory.getLogger(this.getClass().getName());
	
	/**
	 * 
	 */
	
	private Map<String,EditablePage> editablePages;
	
	private List<EditableComponent> editableComps = new LinkedList<EditableComponent>();
	
	private EditablePage currPage = new EditablePage();
	
	private EditablePage currFolder;
	
	private String currLocation;
	
	private boolean previewAvailable;
	
	private String localprevImage;
	
	private String previewUrl;
	
	private String imageFileSize=BaseLoader.getProperty("IMAGE_FILE_SIZE");
	
	private String imageFileSizeMsg=new DecimalFormat("#.##").format((Float.parseFloat(BaseLoader.getProperty("IMAGE_FILE_SIZE")))/1000000f);
	
	private String imageAllowedTypes=BaseLoader.getProperty("IMAGE_FILE_TYPES_ALLOWED");
	
	private String imageAllowedTypesMsg=BaseLoader.getProperty("IMAGE_FILE_TYPES_ALLOWED").replace("|", ",");
	
	private String fileSize=BaseLoader.getProperty("UPLOAD_FILE_SIZE");
	
	private String fileAllowedTypes=BaseLoader.getProperty("FILE_TYPES_ALLOWED");
	
	private String fileAllowedTypesMsg=BaseLoader.getProperty("FILE_TYPES_ALLOWED").replace("|", ",");
	
	private UploadedFile pdfFile;
	
	private String localprevPDF;
	
	private int filelimit=1;
	
	private String imageMode="existing";
	
	private boolean dataChanged;
	
	private CMpageHelper helper=new CMpageHelper();
	
	private List<SelectItem> subPagesForFAQ = new ArrayList<SelectItem>();
	
	private String subpageForFAQ;
	
	private List<ExistingImage> imageFiles = BaseLoader.getImageFiles();
	
	private List<ExistingFiles> files = BaseLoader.getFiles();
	
	private ExistingImage selectedImage;
	
	private Location selectedLocation;
	
	private List<SelectItem> refPagesForMap = new ArrayList<SelectItem>();
	
	private EditablePage selectedMapRefPage = new EditablePage();
	
	private EditableComponent selectedComponent = null;
	
	public static String SELECTED_COMP_ID;
	
	private List<SelectItem> subPagesForSection = new ArrayList<SelectItem>();
	
	public String subpageForSection;
	
	public CMPageBean() {
		// TODO Auto-generated constructor stub
		currLocation = BaseLoader.getProperty(AppConstants.BASE_LOCATION);
		editablePages = BaseLoader.loadEditablePages(currLocation);
		setCurrPage(editablePages.get(editablePages.keySet().iterator().next()));
	}
	
	
	
	/**
	 * @return the editablePages
	 */
	public Map<String, EditablePage> getEditablePages() {
		return editablePages;
	}

	/**
	 * @param editablePages the editablePages to set
	 */
	public void setEditablePages(Map<String, EditablePage> editablePages) {
		this.editablePages = editablePages;
	}

	/**
	 * @return the currPage
	 */
	public EditablePage getCurrPage() {
		return currPage;
	}

	/**
	 * @param currPage the currPage to set
	 */
	public void setCurrPage(EditablePage currPage) {
		this.currPage = currPage;
		helper.setCurrPage(currPage);
	}

	/**
	 * @return the editableComps
	 */
	public List<EditableComponent> getEditableComps() {
		return editableComps;
	}

	/**
	 * @param editableComps the editableComps to set
	 */
	public void setEditableComps(List<EditableComponent> editableComps) {
		this.editableComps = editableComps;
	}
	
	/**
	 * @return the previewAvailable
	 */
	public boolean isPreviewAvailable() {
		return previewAvailable;
	}

	/**
	 * @param previewAvailable the previewAvailable to set
	 */
	public void setPreviewAvailable(boolean previewAvailable) {
		this.previewAvailable = previewAvailable;
	}
	

	/**
	 * @return the previewUrl
	 */
	public String getPreviewUrl() {
		return previewUrl;
	}

	/**
	 * @param previewUrl the previewUrl to set
	 */
	public void setPreviewUrl(String previewUrl) {
		this.previewUrl = previewUrl;
	}
	
	public String loadEditableContents(){
		if(null == currPage)return null;
        currLocation = currPage.getFullPath();
        if(currPage.isMappage()){
        	setSelectedLocation(null);
        	previewAvailable = PreviewHelper.checkForPreview(currPage.getFullPath(), currPage.getFileName());
        }else{
        	loadEditableContents(currLocation);
        }
        return "main";
	}

	public void loadEditableContentsAjax(AjaxBehaviorEvent event){
        setCurrPage((EditablePage)((HtmlSelectOneListbox)event.getSource()).getValue());
        loadEditableContents();
    }
	
	public void updateComponentWithImage(ActionEvent event){
		
		for(EditableComponent comp:editableComps){
			if(comp.getType().equals(ComponentType.COMP_IMAGE)){
				if(comp.getId().equalsIgnoreCase(SELECTED_COMP_ID)){
					comp.setDataChanged(true);
					comp.setImageMode("existing");
					comp.setExistingImgRef(getSelectedImage());
					break;
				}
			}
			if(!comp.getChildComponents().isEmpty())
				updateCompWithImageForChilds(comp.getChildComponents());
			
		}

    }
	
	private void updateCompWithImageForChilds(List<EditableComponent> childComps){
		for(EditableComponent comp:childComps){
			if(comp.getType().equals(ComponentType.COMP_IMAGE)){
				if(comp.getId().equalsIgnoreCase(SELECTED_COMP_ID)){
					comp.setDataChanged(true);
					comp.setImageMode("existing");
					comp.setExistingImgRef(getSelectedImage());
					break;
				}
			}
			if(!comp.getChildComponents().isEmpty())
				updateCompWithImageForChilds(comp.getChildComponents());
		}
	}
	
	public String saveXMLChanges(){
		if(null != selectedLocation){
			updateLocation();
			setSelectedLocation(null);
		}
		
		try {
			JAXBContext context = JAXBContext.newInstance(Locations.class);
	        Marshaller marshaller = context.createMarshaller();
	        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
	        marshaller.marshal(currPage.getMapLocations(), new File(currPage.getFullPath().replace(".xml", "_"+BaseLoader.getUserName()+"_prev.xml")));
	        
	        MessageHelper.addSuccessMessage("", Messages.XML_SAVED_SECCESS);
	        
	        refreshContents();
	        
		} catch (JAXBException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "main";
	}
	
	public void addLocation(){
		
		Location newloc = new Location();
		newloc.setId(BaseLoader.getUniqueId());
		newloc.setName("New Location");
		currPage.getMapLocations().addLocation(newloc);
		setSelectedLocation(newloc);
	}
	
	public void updateLocation(){
		currPage.getMapLocations().updateLocation(selectedLocation);
	}
	
	public void deleteLocation(){
		currPage.getMapLocations().deleteLocation(selectedLocation);
		setSelectedLocation(null);
	}
	
	public String saveEditedContents(){
//		logger.info(currPage);
		if(currPage==null || currPage.isDirectory()) return "main";
		
		previewAvailable=PreviewHelper.deletePreview(currPage);
		
		currPage.setPreviewContent(null!=currPage.getFileContent()?currPage.getFileContent():"");
		
		Document doc = Jsoup.parse(currPage.getPreviewContent());
		doc.outputSettings().prettyPrint(false).charset("UTF-8");
		
		Map<String,List<EditableComponent>> subComps = new LinkedHashMap<String,List<EditableComponent>>();
		Element sectionsContainerDiv = null;
		
		for(Element element:doc.getElementsByTag("div")){
			if(element.hasClass(BaseLoader.getProperty(SectionComponentBuilder.SECTION_CONTAINER_CLASS))){
				sectionsContainerDiv=element;
				sectionsContainerDiv.html("");
			}
		}
		
		StringBuffer htmlBuf;
		String[] elmnst;
		
		for(EditableComponent comp:editableComps){
			
			Element element =  doc.getElementsByAttributeValue("editarea",comp.getId()).first();
			
			if(!helper.isComponentDataChanged(comp)){
				logger.info("There is no change with the Component "+comp.getDescription()+". Hence Skipped. ");
			}
			else if(comp.getPageName().equals(currPage.getFileName())){
				
				switch (comp.getType()) {
					case COMP_IMAGE:
						if(comp.getImageMode().equalsIgnoreCase("new") && null != comp.getImageFile()){
							
							try {
								String name = comp.getImageFile().getFileName();
								String type = name.substring(name.lastIndexOf("."));
								logger.info("NAME ==="+name);
								logger.info("TYPE ==="+type);
								name=name.replace(type, "");
								logger.info("NAME ==="+name);
								String prevImagename=name+"_"+comp.getPageName()+"_"+BaseLoader.getUserName()+type;
								
								File prevFile = new File(BaseLoader.getProperty(AppConstants.IMAGE_PREVIEW_LOCATION)+File.separator+prevImagename);
								File tempFile = new File(BaseLoader.getProperty(AppConstants.IMAGE_TEMP_LOCATION)+File.separator+name+type);
								
								if(prevFile.exists())
									tempFile.delete();
								else
									FileUtils.moveFile(tempFile, prevFile);
								
								element.attr("src", BaseLoader.getProperty(AppConstants.IMAGE_PREVIEW_LOCATION_REF)+prevImagename);
								element.addClass(comp.getStyleClass());
								element.attr("alt",comp.getImageAlt());
								element.attr("oldImg",comp.getOldImageSrc());
								
							} catch (IOException e) {
								// TODO Auto-generated catch block
								logger.info("IOException");
								e.printStackTrace();
							}
						}else if(comp.getImageMode().equalsIgnoreCase("existing") && null != comp.getExistingImgRef()){
							element.attr("src", BaseLoader.getProperty(AppConstants.IMAGE_LOCATION_REF)+comp.getExistingImgRef().getImageName());
							element.addClass(comp.getStyleClass());
							element.attr("alt",comp.getImageAlt());
							element.attr("oldImg",comp.getOldImageSrc());
						}
						break;
					case COMP_SECTION:
						if(null != sectionsContainerDiv){
							sectionsContainerDiv.html(sectionsContainerDiv.html()+SectionComponentBuilder.getSectionNode(comp));
						}
						break;
					case COMP_DS:
						if(null != element){
							elmnst = comp.getNewval().split("<hr>");
							int i=0;
							htmlBuf = new StringBuffer();
							String tag="";
							for(String str:elmnst){
								tag = comp.getDSinnerElemts().get(i);
								htmlBuf.append("<"+tag+">"+str+"</"+tag+">");
								i++;
							}
							element.html(htmlBuf.toString());
						}
						break;
					case COMP_FAQS:
						element =  doc.getElementsByAttributeValue("id",comp.getId()).parents().first();
						elmnst = comp.getNewval().split("<hr>");
						String faqhtml = "<dt id=\""+comp.getId()+"\">"+elmnst[0]+"</dt><dd>"+elmnst[1]+"</dd>";
						
						if(null == element){
							element = doc.createElement("div");
							element.html(faqhtml);
							element.addClass("faqs");
							doc.getElementsByTag("body").first().append(element.outerHtml());
						}else{
							element.html(faqhtml);
						}
						break;
					default:
						if(null != element){
							element.html(comp.getNewval());
						}
						break;
				}
				if(element != null && !currPage.isNoHighlight())
					element.addClass("prevHighlight");
				currPage.setFileChanged(true);
				
			}else{
				if(subComps.containsKey(comp.getPageName()))
					subComps.get(comp.getPageName()).add(comp);
				else{
					List<EditableComponent> comps=new ArrayList<EditableComponent>();
					comps.add(comp);
					subComps.put(comp.getPageName(), comps);
				}
				
			}
			
			logger.info(comp.getNewval());
		}
		
		boolean subfilesChanged = helper.savePreviewForSubpages(subComps);
		
		String location=currLocation.substring(0, currLocation.lastIndexOf(File.separator)+1)+currPage.getFileName()+"_"+BaseLoader.getUserName()+currPage.getFileext()+".prev";
		
		if(currPage.isFileChanged() || subfilesChanged){
			
			String html = "";
			if(currPage.isSkipEncloseTags())
				html = doc.getElementsByTag("head").html()+doc.getElementsByTag("body").html();
			else
				html = doc.outerHtml();
			
			FileHelper.writeContentToFile(location, 
					PreviewHelper.updatePageforSubpages(currPage,html,PreviewHelper.MODE_PREVIEW,null));
			
		}
		
		editableComps = new ArrayList<EditableComponent>();
		currPage.setFileChanged(false);
		
		loadEditableContents(currPage.getFullPath());
    	previewAvailable = PreviewHelper.checkForPreview(currPage.getFullPath(),currPage.getFileName());
		
		return "main";
	}
	
	public String loadPreview(){
		previewUrl = PreviewHelper.loadPreview(currPage);
		return null;
	}
	
	public void loadPreviewXML(ActionEvent actionEvent){
		logger.info("into loadPreviewXML -- ");
		
		File file = new File(currPage.getFullPath()).getParentFile();
		File prevxmlFile = null;
		for (File currFile : file.listFiles()) {
			logger.info(currFile.getName());
			if(PreviewHelper.isSavedPreviewFile(currPage.getFileName(),currFile.getName())){
				prevxmlFile = currFile;
				break;
			}
		}
		
		String newContent = selectedMapRefPage.getFileContent().replace(currPage.getFileName()+".xml", prevxmlFile.getName());
		
		String fileName = selectedMapRefPage.getFileName();
		String prevFileName = fileName+"_xmlprev_"+BaseLoader.getUserName()+selectedMapRefPage.getFileext();
		
		FileHelper.writeContentToFile(selectedMapRefPage.getFullPath().replace(fileName+selectedMapRefPage.getFileext(),prevFileName), newContent);
		
		file = new File(selectedMapRefPage.getFullPath()).getParentFile();
		setPreviewUrl(BaseLoader.getProperty(AppConstants.PREVIEW_URL_LOCATION)+"/"+BaseLoader.language+"/"+file.getName()+"/"+prevFileName);
	}
	
	public void loadReferredpages(ActionEvent actionEvent){
		refPagesForMap.clear();
		for(EditablePage page:currPage.getMapRefPages()){
			logger.info(page.getFileName());
			refPagesForMap.add(new SelectItem(page, page.getFileName()));
		}
	}
	
	public String cancelPreview(){
		previewAvailable=PreviewHelper.deletePreview(currPage);
		previewUrl=null;
		
		refreshContents();
		return "main";
	}
	
	private void refreshContents(){
		/*String name=currPage.getFileName();
		String ext=currPage.getFileext();
		String path=currPage.getFullPath();
		boolean add=currPage.isAddEnabled();
		boolean skipEnclosing=currPage.isSkipEncloseTags();
		boolean isfaq=currPage.isFaqpage();
		List<EditablePage> subpages=currPage.getSubPages();*/
		
		currPage = currFolder;
		loadEditableContents(currFolder.getFullPath());
		
		/*EditablePage page = new EditablePage(name+ext, path, false, FileHelper.checkPreviewToReadFile(new File(path)),add,skipEnclosing,isfaq);
				
		for(EditablePage sub:subpages){
			String absPath=sub.getFullPath();
			EditablePage subpage = new EditablePage(sub.getFileName()+sub.getFileext(),absPath,false,FileHelper.checkPreviewToReadFile(new File(absPath)),false,false,false);
			subpage.setInnerPage(true);
			page.getSubPages().add(subpage);
		}
		
		setCurrPage(page);
		
		loadEditableContents(path);*/
	}
	
	public String approvePreview(){
		
		if(currPage.isMappage()){
			PreviewHelper.approvePreviewForXML(currPage);
		}
		else{
			PreviewHelper.approvePreview(currPage);
		}
		previewAvailable=false;
		previewUrl=null;
		
		refreshContents();

		return "main";
	}
	
	public void addNewSectionComponent(ActionEvent actionEvent){
		editableComps.add(helper.addNewSectionComponent(subpageForSection));
	}
	
	public void addNewFaq(ActionEvent actionEvent){
		editableComps.add(helper.addNewFaqComponent(subpageForFAQ));
	}
	
	public void addNewFaqGetPages(ActionEvent actionEvent){
		subPagesForFAQ.clear();
		for(EditablePage page:currPage.getSubPages()){
			logger.info(page.getFileName());
			subPagesForFAQ.add(new SelectItem(page.getFileName(), FaqPageMapper.faqPageMap.get(page.getFileName())));
		}
	}
	
	public void addNewSectionGetPages(ActionEvent actionEvent){
		subPagesForSection.clear();
		
		if(currPage.isSectionPage()){
			subPagesForSection.add(new SelectItem(currPage.getFileName(), currPage.getFileName()));
		}
		
		for(EditablePage page:currPage.getSubPages()){
			if(page.isSectionPage()){
				subPagesForSection.add(new SelectItem(page.getFileName(), page.getFileName()));
			}
		}
	}
	
	public void clearPreviewOnClose(ActionEvent actionEvent){
		File file = new File(currPage.getFullPath()).getParentFile();
		
		for (File currFile : file.listFiles()) {
			String name = currFile.getName();
			logger.info(name);
			if(PreviewHelper.isTempPreviewFile(currPage.getFileName(),currPage.getFileext(),name,BaseLoader.getUserName())){
				currFile.delete();
				break;
			}
		}
		if(currPage.isMappage()){
			file = new File(selectedMapRefPage.getFullPath()).getParentFile();
			for (File currFile : file.listFiles()) {
				String name = currFile.getName();
				logger.info(name);
				if(name.contains("_xmlprev_"+BaseLoader.getUserName())){
					currFile.delete();
					break;
				}
			}
		}
		
	}
	
	public void clearAllPreviewOnClose(ActionEvent actionEvent){
		PreviewHelper.deleteAllTempPreviewFiles(BaseLoader.getProperty(AppConstants.BASE_LOCATION));
	}
	
	public String timeoutLogout() {  
		//invalidate session  
		HttpSession session = (HttpSession) FacesContext.getCurrentInstance().getExternalContext().getSession(false);
		session.invalidate();
        return "login";
    }
	
	public String timeoutextend() {  
        //invalidate session  
		return "main";
    }
	
	private void loadEditableContents(String location) {
		
		if(null == editableComps)editableComps = new ArrayList<EditableComponent>();
		else editableComps.clear();
		setSelectedLocation(null);
		
		previewAvailable = false;

		if (currPage.isDirectory()) {
			if (currPage.getFileName().equals("en")
					|| currPage.getFileName().equals("es"))
				BaseLoader.language = currPage.getFileName();
			currFolder = currPage;
			editablePages = BaseLoader
					.loadEditablePages(currPage.getFullPath());
		} else {
			logger.info("=======================================================");
			loadEditableComponents(currPage.getComponents());
			for(EditablePage page:currPage.getSubPages()){
				loadEditableComponents(page.getComponents());
			}
			previewAvailable = PreviewHelper.checkForPreview(currPage.getFullPath(), currPage.getFileName());
			logger.info("=======================================================");
		}
		
		logger.info("currLocation "+ location);
		logger.info(""+currPage);

		String backlocation = location.substring(0,
				location.lastIndexOf(File.separator));
		if (!new File(BaseLoader.getProperty(AppConstants.BASE_LOCATION)).getAbsolutePath().equals(
				location)) {
			editablePages.put("BACK",	
					new EditablePage("BACK",currPage.isDirectory() ? backlocation
										: backlocation.substring(0,	backlocation.lastIndexOf(File.separator)),
										true, null,false,false,false,false));
		}
		return;
	}
	
	private void loadEditableComponents(Map<String, EditableComponent> components){
		if(!components.isEmpty())
			for(Entry<String, EditableComponent> entry:components.entrySet() ){
				EditableComponent component = entry.getValue();
				logger.info(""+component);
//				if(component.isHasChild()){
//					loadEditableComponents(component.getChildComponents());
//				}
//				else
					this.editableComps.add(component);
			}
	}

	/**
	 * @return the imageFileSize
	 */
	public String getImageFileSize() {
		return imageFileSize;
	}

	/**
	 * @param imageFileSize the imageFileSize to set
	 */
	public void setImageFileSize(String imageFileSize) {
		this.imageFileSize = imageFileSize;
	}

	/**
	 * @return the imageAllowedTypes
	 */
	public String getImageAllowedTypes() {
		return imageAllowedTypes;
	}

	/**
	 * @param imageAllowedTypes the imageAllowedTypes to set
	 */
	public void setImageAllowedTypes(String imageAllowedTypes) {
		this.imageAllowedTypes = imageAllowedTypes;
	}

	/**
	 * @return the imageFileSizeMsg
	 */
	public String getImageFileSizeMsg() {
		return imageFileSizeMsg;
	}

	/**
	 * @param imageFileSizeMsg the imageFileSizeMsg to set
	 */
	public void setImageFileSizeMsg(String imageFileSizeMsg) {
		this.imageFileSizeMsg = imageFileSizeMsg;
	}

	/**
	 * @return the imageAllowedTypesMsg
	 */
	public String getImageAllowedTypesMsg() {
		return imageAllowedTypesMsg;
	}

	/**
	 * @param imageAllowedTypesMsg the imageAllowedTypesMsg to set
	 */
	public void setImageAllowedTypesMsg(String imageAllowedTypesMsg) {
		this.imageAllowedTypesMsg = imageAllowedTypesMsg;
	}

	/**
	 * @return the subPagesForFAQ
	 */
	public List<SelectItem> getSubPagesForFAQ() {
		return subPagesForFAQ;
	}

	/**
	 * @param subPagesForFAQ the subPagesForFAQ to set
	 */
	public void setSubPagesForFAQ(List<SelectItem> subPagesForFAQ) {
		this.subPagesForFAQ = subPagesForFAQ;
	}

	/**
	 * @return the subpageForFAQ
	 */
	public String getSubpageForFAQ() {
		return subpageForFAQ;
	}

	/**
	 * @param subpageForFAQ the subpageForFAQ to set
	 */
	public void setSubpageForFAQ(String subpageForFAQ) {
		this.subpageForFAQ = subpageForFAQ;
	}

	/**
	 * @return the imageFiles
	 */
	public List<ExistingImage> getImageFiles() {
		return imageFiles;
	}

	/**
	 * @param imageFiles the imageFiles to set
	 */
	public void setImageFiles(List<ExistingImage> imageFiles) {
		this.imageFiles = imageFiles;
	}

	/**
	 * @return the selectedImage
	 */
	public ExistingImage getSelectedImage() {
		return selectedImage;
	}

	/**
	 * @param selectedImage the selectedImage to set
	 */
	public void setSelectedImage(ExistingImage selectedImage) {
		this.selectedImage = selectedImage;
	}

	/**
	 * @return the selectedLocation
	 */
	public Location getSelectedLocation() {
		return selectedLocation;
	}

	/**
	 * @param selectedLocation the selectedLocation to set
	 */
	public void setSelectedLocation(Location selectedLocation) {
		this.selectedLocation = selectedLocation;
	}

	/**
	 * @return the refPagesForMap
	 */
	public List<SelectItem> getRefPagesForMap() {
		return refPagesForMap;
	}

	/**
	 * @param refPagesForMap the refPagesForMap to set
	 */
	public void setRefPagesForMap(List<SelectItem> refPagesForMap) {
		this.refPagesForMap = refPagesForMap;
	}

	/**
	 * @return the selectedMapRefPage
	 */
	public EditablePage getSelectedMapRefPage() {
		return selectedMapRefPage;
	}

	public void setSelectedComponent(EditableComponent comp) {
		selectedComponent = comp;
	}

	/**
	 * @param selectedMapRefPage the selectedMapRefPage to set
	 */
	public void setSelectedMapRefPage(EditablePage selectedMapRefPage) {
		this.selectedMapRefPage = selectedMapRefPage;
	}

	/**
	 * @return the selectedComponent
	 */
	public EditableComponent getSelectedComponent() {
		
		if(null!=SELECTED_COMP_ID){
			return getSelectedComponentById(SELECTED_COMP_ID,editableComps);
		}
		
		return selectedComponent;
	}
	
	public String saveEditorContentToComponent() {  
		System.out.println(getSelectedComponentById(SELECTED_COMP_ID,editableComps).getNewval());
		getSelectedComponent().setDataChanged(true);
        return "main";
    }
	
	private EditableComponent getSelectedComponentById(String id,List<EditableComponent> list){
		EditableComponent component = null;
		for(EditableComponent comp:list){
			if(comp.getId().equalsIgnoreCase(id)){
				component = comp;
			}
			else if(!comp.getChildComponents().isEmpty()){
				component = getSelectedComponentById(id, comp.getChildComponents());
			}
			if(null!=component)
				break;
		}
		return component;
	}



	/**
	 * @return the subPagesForSection
	 */
	public List<SelectItem> getSubPagesForSection() {
		return subPagesForSection;
	}



	/**
	 * @param subPagesForSection the subPagesForSection to set
	 */
	public void setSubPagesForSection(List<SelectItem> subPagesForSection) {
		this.subPagesForSection = subPagesForSection;
	}



	/**
	 * @return the subpageForSection
	 */
	public String getSubpageForSection() {
		return subpageForSection;
	}



	/**
	 * @param subpageForSection the subpageForSection to set
	 */
	public void setSubpageForSection(String subpageForSection) {
		this.subpageForSection = subpageForSection;
	}



	public String getFileAllowedTypes() {
		return fileAllowedTypes;
	}



	public void setFileAllowedTypes(String fileAllowedTypes) {
		this.fileAllowedTypes = fileAllowedTypes;
	}



	public String getFileAllowedTypesMsg() {
		return fileAllowedTypesMsg;
	}



	public void setFileAllowedTypesMsg(String fileAllowedTypesMsg) {
		this.fileAllowedTypesMsg = fileAllowedTypesMsg;
	}

		
	public void uploadListener(FileUploadEvent event) {

		this.pdfFile = event.getFile();
		String location = null;
		try {
			location = BaseLoader.getProperty("IMAGE_TEMP_LOCATION");
			copyTempFile(event.getFile().getFileName(), event.getFile().getInputstream(),location+File.separator);
			if (!FileHelper.isvalidFile(pdfFile)) {
				this.pdfFile = null;
				return;
			}
//			deleteTempFile(pdfFile.getFileName(),location+File.separator);
			
			location = BaseLoader.getProperty("FILE_LOCATION_REF");
			copyFile(event.getFile().getFileName(), event.getFile().getInputstream(),location+File.separator,BaseLoader.getProperty("IMAGE_TEMP_LOCATION")+File.separator);
			
		} catch (IOException e) { 
			e.printStackTrace();
		}
		

	}
	
	public static void copyTempFile(String fileName, InputStream in,String location){
        try {
        	
        	File file = new File(location + fileName);
             // write the inputStream to a FileOutputStream
             OutputStream out = new FileOutputStream(file);
             int read = 0;
             byte[] bytes = new byte[1024];
           
//             if(file.exists()){approvePreview(file);}
             
             while ((read = in.read(bytes)) != -1) {
                 out.write(bytes, 0, read);
             }
           
             in.close();
             out.flush();
             out.close();
           
             System.out.println("New file created!");
             } catch (IOException e) {
             System.out.println(e.getMessage());
             }
 }

	private void deleteTempFile(String fileName,String location) {
try{
    		
    		File file = new File(location+File.separator+fileName);
        	
    		if(file.delete()){
    			System.out.println(file.getName() + " is deleted!");
    		}else{
    			System.out.println("Delete operation is failed.");
    		}
    	   
    	}catch (Exception  x) {
    	    // File permission problems are caught here.
    	    System.out.println(x);
    	}



	}



	public static void copyFile(String fileName, InputStream in,String location, String tempLocation) {
        try {
        	
        	File file = new File(location + fileName);
        	File tempFile = new File(tempLocation + fileName);
             // write the inputStream to a FileOutputStream
             OutputStream out = new FileOutputStream(file);
             int read = 0;
             byte[] bytes = new byte[1024];
           
             if(file.exists()){
            	 System.out.println("File Exists");
            	 createHistory(tempFile);
            	}
             
             while ((read = in.read(bytes)) != -1) {
                 out.write(bytes, 0, read);
             }
           
             in.close();
             out.flush();
             out.close();
           
             System.out.println("New file created!");
            	
             } catch (IOException e) {
             System.out.println(e.getMessage());
             }
 }



	public UploadedFile getPdfFile() {
		return pdfFile;
	}



	public void setPdfFile(UploadedFile pdfFile) {
		this.pdfFile = pdfFile;
	}



	public String getLocalprevPDF() {
		return localprevPDF;
	}



	public void setLocalprevPDF(String localprevPDF) {
		this.localprevPDF = localprevPDF;
	}



	public int getFilelimit() {
		return filelimit;
	}



	public void setFilelimit(int filelimit) {
		this.filelimit = filelimit;
	}



	public String getFileSize() {
		return fileSize;
	}



	public void setFileSize(String fileSize) {
		this.fileSize = fileSize;
	}



	public String getLocalprevImage() {
		return localprevImage;
	}



	public void setLocalprevImage(String localprevImage) {
		this.localprevImage = localprevImage;
	}



	public List<ExistingFiles> getFiles() {
		return files;
	}



	public void setFiles(List<ExistingFiles> files) {
		this.files = files;
	}
	
	
	public static void createHistory(File file){
		File newFile=null;
		int highestVersion=0;
		File currFile = file;

		String name=currFile.getName();
			if((file.getName()+ FilenameUtils.getExtension(name)).equalsIgnoreCase(name)){
				newFile = currFile;
			}
		highestVersion = histFileVersion(file);
		System.out.println("Version ===  "+highestVersion);
		
		int version=highestVersion+1;
		
		File histFile = new File(BaseLoader.getProperty("BASE_LOCATION")+File.separator+BaseLoader.language+File.separator+"CMHistory"
					+File.separator+currFile.getName().replace("."+FilenameUtils.getExtension(name), "")+"_"+BaseLoader.getUserName()
					+"_"+BaseLoader.getUserName()+"."
					+FilenameUtils.getExtension(name)+"."+version);
		try {
//			copyFileUsingFileStreams(currFile,histFile);
			FileUtils.copyFile(currFile, histFile);
			currFile.delete();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static int histFileVersion(File file){
//		sample55_user1.pdf.1
		File fileLocation = new File(BaseLoader.getProperty("BASE_LOCATION")+File.separator+BaseLoader.language+File.separator+"CMHistory");
		String name = "";
		int currVersion = 0;
		
		for(File currFile:fileLocation.listFiles()){
			name = currFile.getName();
			if(name.startsWith(FilenameUtils.removeExtension(file.getName())) && name.contains("."+FilenameUtils.getExtension(file.getName())+".")){
				int version = Integer.parseInt(name.substring(name.lastIndexOf(".")+1));
				currVersion=version>currVersion?version:currVersion;
			}
		}
		
		return currVersion;
	}
	
}
