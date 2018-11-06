/**
 * 
 */
package com.xerox.ts.vector.cm;

import java.io.Serializable;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.hex.framework.core.logger.LogFactory;
import com.hex.framework.core.logger.Logger;
import com.xerox.ts.vector.cm.core.BaseLoader;
import com.xerox.ts.vector.cm.helper.FaqPageMapper;
import com.xerox.ts.vector.cm.helper.SectionComponentBuilder;

/**
 * @author C5030183
 *
 */
public class EditablePage implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 310845903048699516L;
	private transient Logger logger = LogFactory.getLogger(this.getClass().getName());

	private Map<String,EditableComponent> components = new LinkedHashMap<String,EditableComponent>();
	
	private String fileName="";
	
	private String fileext;
	
	private String fullPath;
	
	private String fileContent;
	
	private String previewContent;
	
	private boolean directory;
	
	private boolean addEnabled;
	
	private boolean innerPage;
	
	private boolean fileChanged;
	
	private boolean skipEncloseTags;
	
	private boolean faqpage;
	
	private boolean mappage;
	
	private boolean noHighlight;
	
	private Locations mapLocations;
	
	private boolean sectionPage;
	
	private List<EditablePage> subPages= new ArrayList<EditablePage>();
	
	private List<EditablePage> mapRefPages= new ArrayList<EditablePage>();

	public EditablePage(String fileName,String fullPath,boolean directory,String fileContent,
			boolean addenabled,boolean skipEncloseTags,boolean faqpage,boolean map){
		
		logger.info("**********************************FILE :- " + fileName +" ****************** " +fullPath);
		
		if(directory){
			this.fileName = fileName;
		}else{
			this.fileName = fileName.substring(0,fileName.lastIndexOf("."));
			this.fileext = fileName.substring(fileName.lastIndexOf("."),fileName.length());;
		}
		
		this.fullPath = fullPath;
		this.directory = directory;
		this.fileContent = fileContent;
		this.addEnabled = addenabled;
		this.skipEncloseTags = skipEncloseTags;
		this.faqpage = faqpage;
		this.mappage=map;
		logger.info(""+this);
		if(!mappage){
			processEditableComponents();
		}
		else{
			loadMapXML();
		}
	}
	
	public EditablePage(){
		super();
	}
	
	/**
	 * @return the components
	 */
	public Map<String,EditableComponent> getComponents() {
		return components;
	}

	/**
	 * @return the fileContent
	 */
	public String getFileContent() {
		return fileContent;
	}

	/**
	 * @return the fileext
	 */
	public String getFileext() {
		return fileext;
	}

	/**
	 * @return the fileName
	 */
	public String getFileName() {
		return fileName;
	}

	/**
	 * @return the fullPath
	 */
	public String getFullPath() {
		return fullPath;
	}

	/**
	 * @return the previewContent
	 */
	public String getPreviewContent() {
		return previewContent;
	}

	/**
	 * @return the directory
	 */
	public boolean isDirectory() {
		return directory;
	}

	/**
	 * @param components the components to set
	 */
	public void setComponents(Map<String,EditableComponent> components) {
		this.components = components;
	}

	/**
	 * @param directory the directory to set
	 */
	public void setDirectory(boolean directory) {
		this.directory = directory;
	}

	/**
	 * @param fileContent the fileContent to set
	 */
	public void setFileContent(String fileContent) {
		this.fileContent = fileContent;
	}
	
	/**
	 * @param fileext the fileext to set
	 */
	public void setFileext(String fileext) {
		this.fileext = fileext;
	}

	/**
	 * @param fileName the fileName to set
	 */
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	
	
	/**
	 * @param fullPath the fullPath to set
	 */
	public void setFullPath(String fullPath) {
		this.fullPath = fullPath;
	}
	
	/**
	 * @param previewContent the previewContent to set
	 */
	public void setPreviewContent(String previewContent) {
		this.previewContent = previewContent;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this,ToStringStyle.DEFAULT_STYLE);
	}
	
	private void loadMapXML(){
        try {
        	JAXBContext context = JAXBContext.newInstance(Locations.class);
            Unmarshaller unMarshaller = context.createUnmarshaller();
            this.mapLocations = (Locations) unMarshaller.unmarshal(new StringReader(fileContent));
            
            Collections.sort(mapLocations.getLocnElemnts());
            
            logger.info("mapLocations :- " + mapLocations);

        } catch (JAXBException e) {
			// TODO Auto-generated catch block
        	logger.info("JAXBException Occurred" + e.getMessage());
			e.printStackTrace();
		} 
	}

	private void processEditableComponents(){
		if(directory) return;
		
		Document doc = Jsoup.parseBodyFragment(fileContent);
		
		Element sectionElementsContainer = doc.getElementsByClass(BaseLoader.getProperty(SectionComponentBuilder.SECTION_CONTAINER_CLASS)).tagName("div").first();
		Map<String,EditableComponent> sectionItems=new HashMap<String, EditableComponent>();
		if(null != sectionElementsContainer){
			Element backup = sectionElementsContainer.clone();
			sectionElementsContainer.html("");
			sectionItems = SectionComponentBuilder.loadSectionComponents(backup,fileName);
			setSectionPage(true);
		}
		
		Elements elmnts = doc.getElementsByAttribute("editarea");
		int i=0;
		for(Element currComponent:elmnts){
			i++;
			getComponents().put(fileName+currComponent.attr("editarea"),getInnerComponents(currComponent,true,i,currComponent.attr("editarea")));
		}
		
		elmnts = doc.getElementsByClass("faqs").tagName("div");
		
		for(Element currComponent:elmnts){
			i++;
			String id = currComponent.child(0).attr("id");
			getComponents().put(fileName+id,getInnerComponents(currComponent,true,i,id));
		}
		
		getComponents().putAll(sectionItems);
	}
	
	private EditableComponent getInnerComponents(Element element,boolean parent,int childIdNo,String parentId){
		
		EditableComponent component = new EditableComponent();
		component.setType(ComponentType.getEnum(element.tagName(),element.classNames()));
		component.setCompName(component.getType().toString());
		component.setOldval(element.html());
		component.setNewval(element.html());
		component.setHasParent(!parent);
		component.setPageName(this.fileName);
		
		String desc = "";
		String html = "";
		
		switch (component.getType()) {
		case COMP_IMAGE:
			String src=element.attr("src");
			component.setOldval(BaseLoader.getImagePath(src.substring(src.lastIndexOf("/")+1), AppConstants.IMAGE_TYPE_IMAGE));
			component.setOldImageSrc(src);
			component.setRendertype(EditableComponent.RENDER_IMAGE);
			component.setDescription(element.attr("alt"));
			component.setImageAlt(element.attr("alt"));
			component.setStyleClass(element.className());
			break;
		case COMP_SECTION:
			component.setRendertype(EditableComponent.RENDER_SECTION);
			component.setDescription(element.attr("title"));
			break;
		case COMP_DS:
			component = parseElemetsForDS(component,element);
			component.setRendertype(EditableComponent.RENDER_TEXT_AREA);
			
			desc = element.attr("editareadesc");
			component.setDescription((desc==null || desc.trim().equals(""))?element.attr("title"):desc);
			break;
		case COMP_FAQS:
			html = element.getElementsByTag(ComponentType.COMP_DT.getTagName()).html()
				+"<hr>"
				+element.getElementsByTag(ComponentType.COMP_DD.getTagName()).html();
			
			component.setOldval(html);
			component.setNewval(html);
			component.setRendertype(EditableComponent.RENDER_TEXT_AREA);
			component.setDescription(FaqPageMapper.faqPageMap.get(fileName));
			break;

		default:
			component.setRendertype(EditableComponent.RENDER_TEXT_AREA);
			desc = element.attr("editareadesc");
			component.setDescription((desc==null || desc.trim().equals(""))?element.attr("title"):desc);
			break;
		}
		
		
		if(parent)
			component.setId(parentId);
		else
			component.setId(parentId+"_"+childIdNo);
		
//		int i=0;
//		for(Element currTag:element.children()){
//			if(!ComponentType.COMP_BREAK.getTagName().equals(currTag.tagName()) && !ComponentType.COMP_SUP.getTagName().equals(currTag.tagName())){
//				component.getChildComponents().put(component.getId(),getInnerComponents(currTag,false,i,component.getId()));
//				i++;
//			}
//		}
//		
//		if(!component.getChildComponents().isEmpty())
//			component.setHasChild(true);
		
		return component;
	}
	
	private EditableComponent parseElemetsForDS(EditableComponent component,Element element){
		
		StringBuffer html = new StringBuffer();
		component.setDSinnerElemts(new HashMap<Integer, String>());
		
		int i=0;
		for(Element currElem:element.children()){
			if(i>0)
				html.append("<hr>");
			
			html.append(currElem.html());
			component.getDSinnerElemts().put(i, currElem.tagName());
			i++;
		}
		component.setOldval(html.toString());
		component.setNewval(html.toString());
		return component;
	}
	

	/**
	 * @return the addEnabled
	 */
	public boolean isAddEnabled() {
		return addEnabled;
	}

	/**
	 * @param addEnabled the addEnabled to set
	 */
	public void setAddEnabled(boolean addEnabled) {
		this.addEnabled = addEnabled;
	}

	/**
	 * @return the innerPage
	 */
	public boolean isInnerPage() {
		return innerPage;
	}

	/**
	 * @param innerPage the innerPage to set
	 */
	public void setInnerPage(boolean innerPage) {
		this.innerPage = innerPage;
	}

	/**
	 * @return the subPages
	 */
	public List<EditablePage> getSubPages() {
		return subPages;
	}

	/**
	 * @param subPages the subPages to set
	 */
	public void setSubPages(List<EditablePage> subPages) {
		this.subPages = subPages;
	}

	/**
	 * @return the fileChanged
	 */
	public boolean isFileChanged() {
		return fileChanged;
	}

	/**
	 * @param fileChanged the fileChanged to set
	 */
	public void setFileChanged(boolean fileChanged) {
		this.fileChanged = fileChanged;
	}

	/**
	 * @return the skipEncloseTags
	 */
	public boolean isSkipEncloseTags() {
		return skipEncloseTags;
	}

	/**
	 * @param skipEncloseTags the skipEncloseTags to set
	 */
	public void setSkipEncloseTags(boolean skipEncloseTags) {
		this.skipEncloseTags = skipEncloseTags;
	}

	/**
	 * @return the faqpage
	 */
	public boolean isFaqpage() {
		return faqpage;
	}

	/**
	 * @param faqpage the faqpage to set
	 */
	public void setFaqpage(boolean faqpage) {
		this.faqpage = faqpage;
	}

	/**
	 * @return the mappage
	 */
	public boolean isMappage() {
		return mappage;
	}

	/**
	 * @param mappage the mappage to set
	 */
	public void setMappage(boolean mappage) {
		this.mappage = mappage;
	}

	/**
	 * @return the mapLocations
	 */
	public Locations getMapLocations() {
		return mapLocations;
	}

	/**
	 * @param mapLocations the mapLocations to set
	 */
	public void setMapLocations(Locations mapLocations) {
		this.mapLocations = mapLocations;
	}

	/**
	 * @return the mapRefPages
	 */
	public List<EditablePage> getMapRefPages() {
		return mapRefPages;
	}

	/**
	 * @param mapRefPages the mapRefPages to set
	 */
	public void setMapRefPages(List<EditablePage> mapRefPages) {
		this.mapRefPages = mapRefPages;
	}

	/**
	 * @return the noHighlight
	 */
	public boolean isNoHighlight() {
		return noHighlight;
	}

	/**
	 * @param noHighlight the noHighlight to set
	 */
	public void setNoHighlight(boolean noHighlight) {
		this.noHighlight = noHighlight;
	}

	/**
	 * @return the sectionPage
	 */
	public boolean isSectionPage() {
		return sectionPage;
	}

	/**
	 * @param sectionPage the sectionPage to set
	 */
	public void setSectionPage(boolean sectionPage) {
		this.sectionPage = sectionPage;
	}
}
