package com.xerox.ts.vector.cm.helper;

import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import com.hex.framework.core.logger.LogFactory;
import com.hex.framework.core.logger.Logger;
import com.xerox.ts.vector.cm.AppConstants;
import com.xerox.ts.vector.cm.ComponentType;
import com.xerox.ts.vector.cm.EditableComponent;
import com.xerox.ts.vector.cm.core.BaseLoader;

/**
 * @author C5030183
 *
 */
public class SectionComponentBuilder {
	
	private transient static Logger logger = LogFactory.getLogger("SectionComponentBuilder");
	
	/**
	 * BASE PROPERTIES CONSTANTS
	 */
	private static final String SECTION_SECTION_CLASS 			= "SECTION_SECTION_CLASS";
	private static final String SECTION_PANEL_CLASS 			= "SECTION_PANEL_CLASS";
	public static final String SECTION_PANEL_IMAGE_CLASS 		= "SECTION_PANEL_IMAGE_CLASS";
	private static final String SECTION_PANEL_HEADER_CLASS 		= "SECTION_PANEL_HEADER_CLASS";
	private static final String SECTION_PANEL_BODY_CLASS 		= "SECTION_PANEL_BODY_CLASS";
	public static final String SECTION_CONTAINER_CLASS			= "SECTION_CONTAINER_CLASS";
	public static final String SECTION_PANEL_IMAGE_CLASS_REFER	= "SECTION_PANEL_IMAGE_CLASS_REFER";
	private static final String SECTION_IMAGE_CLASS				= "SECTION_IMAGE_CLASS";
	private static final String SECTION_PANEL_IMAGE_STYLE 		= "SECTION_PANEL_IMAGE_STYLE";

	public static EditableComponent getDivForSectionComponent(String id,String pagename){
		
		EditableComponent comp1 = new EditableComponent();
		comp1.setNewEntry(true);
		comp1.setType(ComponentType.COMP_IMAGE);
		comp1.setCompName(ComponentType.COMP_IMAGE.getTagName());
		comp1.setDescription("Image");
		comp1.setRendertype(EditableComponent.RENDER_IMAGE);
		comp1.setId(id+"_image");
		comp1.setPageName(pagename);
		
		EditableComponent comp2 = new EditableComponent();
		comp2.setNewEntry(true);
		comp2.setType(ComponentType.COMP_DIV);
		comp2.setCompName(ComponentType.COMP_DIV.getTagName());
		comp2.setDescription("Heading");
		comp2.setRendertype(EditableComponent.RENDER_TEXT_AREA);
		comp2.setId(id+"_heading");
		comp2.setPageName(pagename);
		
		EditableComponent comp3 = new EditableComponent();
		comp3.setNewEntry(true);
		comp3.setType(ComponentType.COMP_DIV);
		comp3.setCompName(ComponentType.COMP_DIV.getTagName());
		comp3.setDescription("Body");
		comp3.setRendertype(EditableComponent.RENDER_TEXT_AREA);
		comp3.setId(id+"_body");
		comp3.setPageName(pagename);
		
		EditableComponent component = new EditableComponent();
		component.setNewEntry(true);
		component.setType(ComponentType.COMP_DIV);
		component.setCompName(ComponentType.COMP_DIV.getTagName());
		component.setDescription("Panel");
		component.setId(id);
		component.setPageName(pagename);
		
		component.getChildComponents().add(comp1);
		component.getChildComponents().add(comp2);
		component.getChildComponents().add(comp3);
		
		return component;
	}
	
	public static Map<String,EditableComponent> loadSectionComponents(Element element,String pagename){
		Element innerElement=null;
		EditableComponent comp = null;
		String id= null;
		Map<String, EditableComponent> sections=new LinkedHashMap<String, EditableComponent>();
		int i=0;
		
		for(Element sectionElement:element.children()){
			i++;
			id= BaseLoader.getUniqueId()+i;
			
			EditableComponent component = new EditableComponent();
			component.setDescription("Section");
			component.setType(ComponentType.COMP_SECTION);
			component.setCompName(ComponentType.COMP_SECTION.getTagName());
			component.setRendertype(EditableComponent.RENDER_SECTION);
			component.setId("section_"+id);
			component.setPageName(pagename);
			
			
			int j=0;
			for(Element panel:sectionElement.children()){
				j++;
				innerElement = sectionElement.getElementsByClass(BaseLoader.getProperty(SECTION_PANEL_HEADER_CLASS)).first();
				
				EditableComponent divcomponent = new EditableComponent();
				divcomponent.setType(ComponentType.COMP_DIV);
				divcomponent.setCompName(ComponentType.COMP_DIV.getTagName());
				divcomponent.setDescription(null != innerElement ? innerElement.attr("title") : "Description");
				divcomponent.setId(component.getId()+"_"+j+"_div");
				divcomponent.setPageName(pagename);
				divcomponent.setOrderNo(0);
				
				boolean imageAdded=false;
				boolean headerAdded = false;
				boolean bodyAdded = false;
				
				for (Element child : panel.children()){
					
					if(child.classNames().contains(BaseLoader.getProperty(SECTION_PANEL_IMAGE_CLASS_REFER))){
						
						innerElement = child.getElementsByTag("img").first();
						
						if(null != innerElement){
							comp = new EditableComponent();
							
							comp.setType(ComponentType.COMP_IMAGE);
							comp.setCompName(ComponentType.COMP_IMAGE.getTagName());
							comp.setDescription(innerElement.attr("alt"));
							comp.setRendertype(EditableComponent.RENDER_IMAGE);
							comp.setId(divcomponent.getId()+"_image");
							comp.setPageName(pagename);
							comp.setStyleClass(innerElement.className());
							comp.setImageAlt(innerElement.attr("alt"));
							String src=innerElement.attr("src");
							comp.setOldImageSrc(src);
							comp.setOldval(BaseLoader.getImagePath(src.substring(src.lastIndexOf("/")+1), AppConstants.IMAGE_TYPE_IMAGE));
							
							divcomponent.getChildComponents().add(comp);
							imageAdded = true;
						}
						
					}else if(child.classNames().contains(BaseLoader.getProperty(SECTION_PANEL_HEADER_CLASS))){
						
						comp = new EditableComponent();
						
						comp.setType(ComponentType.COMP_DIV);
						comp.setCompName(ComponentType.COMP_DIV.getTagName());
						comp.setDescription(child.attr("title"));
						comp.setRendertype(EditableComponent.RENDER_TEXT_AREA);
						comp.setId(divcomponent.getId()+"_heading");
						comp.setPageName(pagename);
						comp.setOldval(child.html());
						comp.setNewval(child.html());
						
						divcomponent.getChildComponents().add(comp);
						headerAdded = true;
					}else if(child.classNames().contains(BaseLoader.getProperty(SECTION_PANEL_BODY_CLASS))){
						
						comp = new EditableComponent();
						
						comp.setType(ComponentType.COMP_DIV);
						comp.setCompName(ComponentType.COMP_DIV.getTagName());
						comp.setDescription(child.attr("title"));
						comp.setRendertype(EditableComponent.RENDER_TEXT_AREA);
						comp.setId(divcomponent.getId()+"_body");
						comp.setPageName(pagename);
						comp.setOldval(child.html());
						comp.setNewval(child.html());
						
						divcomponent.getChildComponents().add(comp);
						bodyAdded = true;
					}
					
				}
				
				if(!imageAdded){
					
					comp = new EditableComponent();
					
					comp.setNewEntry(true);
					comp.setType(ComponentType.COMP_IMAGE);
					comp.setCompName(ComponentType.COMP_IMAGE.getTagName());
					comp.setDescription("Image");
					comp.setRendertype(EditableComponent.RENDER_IMAGE);
					comp.setId(divcomponent.getId()+"_image");
					comp.setPageName(pagename);
					divcomponent.getChildComponents().add(comp);
				}
				if(!headerAdded){
					comp = new EditableComponent();
					
					comp.setNewEntry(true);
					comp.setType(ComponentType.COMP_DIV);
					comp.setCompName(ComponentType.COMP_DIV.getTagName());
					comp.setDescription("Heading");
					comp.setRendertype(EditableComponent.RENDER_TEXT_AREA);
					comp.setId(divcomponent.getId()+"_heading");
					comp.setPageName(pagename);
					divcomponent.getChildComponents().add(comp);
				}
				if(!bodyAdded){
					comp = new EditableComponent();
					
					comp.setNewEntry(true);
					comp.setType(ComponentType.COMP_DIV);
					comp.setCompName(ComponentType.COMP_DIV.getTagName());
					comp.setDescription("Body");
					comp.setRendertype(EditableComponent.RENDER_TEXT_AREA);
					comp.setId(divcomponent.getId()+"_body");
					comp.setPageName(pagename);
					divcomponent.getChildComponents().add(comp);
				}
				
				if(!divcomponent.getChildComponents().isEmpty())
					component.getChildComponents().add(divcomponent);
			}
			
			if(!component.getChildComponents().isEmpty())
				sections.put("section_"+id, component);
			logger.info("Section Added ---- "+id);
		}
		
		return sections;
	}
	
	public static String getSectionNode(EditableComponent newSectionComponent){
		
		if(newSectionComponent.isDeleted()) return "";
		
		Document doc = Jsoup.parse("<section></section>");
		Element element = doc.select("section").first();
		element.addClass(BaseLoader.getProperty(SECTION_SECTION_CLASS));
		logger.info(element.html());
		Collections.sort(newSectionComponent.getChildComponents());
		for(EditableComponent childComponent:newSectionComponent.getChildComponents()){
			logger.info("=================="+childComponent.getId()+"======================");
			element.html(element.html()+getPanelNode(childComponent));
		}
		logger.info(element.html());
		return element.outerHtml();
	}
	
	public static String getPanelNode(EditableComponent newPanelDivComponent){
		
		if(newPanelDivComponent.isDeleted()) return "";
		
		Document doc = Jsoup.parse("<div></div>");
		Element element = doc.select("div").first();
		element.addClass(BaseLoader.getProperty(SECTION_PANEL_CLASS));
		
		EditableComponent image=null;
		EditableComponent header=null;
		EditableComponent body=null;
		
		for(EditableComponent childComponent:newPanelDivComponent.getChildComponents()){
			if(childComponent.getId().endsWith("_image"))
				image = childComponent;
			else if(childComponent.getId().endsWith("_heading"))
				header = childComponent;
			else if(childComponent.getId().endsWith("_body"))
				body = childComponent;
		}
		element.html((image == null ?"": getPanelImageElement(image))
				+(header == null ?"": getPanelHeaderElement(header))
				+(body == null ?"": getPanelBodyElement(body)));
		if(null == element.html() || element.html().trim().equals(""))
			return "";
		return element.outerHtml();
	}
	
	private static String getPanelImageElement(EditableComponent imageComponent){
		Document doc = Jsoup.parse("<div></div>");
		Element element = doc.select("div").first();
		element.addClass(BaseLoader.getProperty(SECTION_PANEL_IMAGE_CLASS));
		element.attr("style",BaseLoader.getProperty(SECTION_PANEL_IMAGE_STYLE));
		element.html("<img></img>");
		Element imageelem = doc.select("img").first();
		
		if(imageComponent.isDataChanged()){
			
			try {
				
				if(imageComponent.getImageMode().equalsIgnoreCase("new") && null != imageComponent.getImageFile()){
					String name = imageComponent.getImageFile().getFileName();
					String type = name.substring(name.lastIndexOf("."));
					logger.info("NAME TYPE ==="+name+" "+type);
					name=name.replace(type, "");
					logger.info("NAME TYPE ==="+name+" "+type);
					String prevImagename=name+"_"+imageComponent.getPageName()+"_"+BaseLoader.getUserName()+type;
					
					File prevFile = new File(BaseLoader.getProperty(AppConstants.IMAGE_PREVIEW_LOCATION)+File.separator+prevImagename);
					File tempFile = new File(BaseLoader.getProperty(AppConstants.IMAGE_TEMP_LOCATION)+File.separator+name+type);
					
					if(prevFile.exists())
						prevFile.delete();
					
					FileUtils.moveFile(tempFile, prevFile);
					imageelem.attr("src", BaseLoader.getProperty(AppConstants.IMAGE_PREVIEW_LOCATION_REF)+prevImagename);			
					imageelem.attr("oldImg",imageComponent.getOldImageSrc());
				}else if(imageComponent.getImageMode().equalsIgnoreCase("existing") && null != imageComponent.getExistingImgRef()){
					imageelem.attr("src", BaseLoader.getProperty(AppConstants.IMAGE_LOCATION_REF)+imageComponent.getExistingImgRef().getImageName());
					imageelem.attr("oldImg",imageComponent.getOldImageSrc());
				}
				
			} catch (IOException e) {
				// TODO Auto-generated catch block
				logger.info("IOException");
				e.printStackTrace();
			}
		}else{
			if(!imageComponent.isNewEntry()){
				imageelem.attr("src",imageComponent.getOldImageSrc());
			}else{
				return "";
			}
		}
		
		if(null == imageComponent.getImageAlt() || "".equals(imageComponent.getImageAlt().trim()))
			imageelem.attr("alt","New Panel Image");
		else
			imageelem.attr("alt",imageComponent.getImageAlt());
		
		if(null != imageComponent.getStyleClass() && !"".equals(imageComponent.getStyleClass().trim()))
			imageelem.addClass(imageComponent.getStyleClass());
		else
			imageelem.attr("class",BaseLoader.getProperty(SECTION_IMAGE_CLASS));
		
		return element.outerHtml();
	}
	
	private static String getPanelHeaderElement(EditableComponent headerDivComponent){
		if(null==headerDivComponent.getNewval() || headerDivComponent.getNewval().equals("")){
			return "";
		}
		Document doc = Jsoup.parse("<div></div>");
		Element element = doc.select("div").first();
		element.addClass(BaseLoader.getProperty(SECTION_PANEL_HEADER_CLASS));
		element.html(headerDivComponent.getNewval());
		element.attr("title",headerDivComponent.getDescription());
		return element.outerHtml();
	}
	
	private static String getPanelBodyElement(EditableComponent bodyDivComponent){
		if(null==bodyDivComponent.getNewval() || bodyDivComponent.getNewval().equals("")){
			return "";
		}
		Document doc = Jsoup.parse("<div></div>");
		Element element = doc.select("div").first();
		element.addClass(BaseLoader.getProperty(SECTION_PANEL_BODY_CLASS));
		element.html(bodyDivComponent.getNewval());
		element.attr("title",bodyDivComponent.getDescription());
		return element.outerHtml();
	}
}
