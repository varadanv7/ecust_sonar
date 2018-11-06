/**
 * 
 */
package com.xerox.ts.vector.cm.helper;

import java.io.File;
import java.io.IOException;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
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
import com.xerox.ts.vector.cm.EditablePage;
import com.xerox.ts.vector.cm.core.BaseLoader;

/**
 * @author C5030183
 *
 */
public class CMpageHelper implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private transient Logger logger = LogFactory.getLogger(this.getClass().getName());
	
	private EditablePage currPage;
	
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
	}

	
	public EditableComponent addNewFaqComponent(String subpage){
		EditableComponent component = new EditableComponent();
		component.setNewEntry(true);
		component.setDescription(FaqPageMapper.faqPageMap.get(subpage));
		component.setType(ComponentType.COMP_FAQS);
		component.setCompName(ComponentType.COMP_FAQS.getTagName());
		component.setRendertype(EditableComponent.RENDER_TEXT_AREA);
		component.setId("faq_"+BaseLoader.getUniqueId());
		component.setPageName(subpage);
		
		component.setNewval("<br/><hr/><br/>");
		
		return component;
	}
	
	public EditableComponent addNewSectionComponent(String pageName){
		EditableComponent component = new EditableComponent();
		component.setNewEntry(true);
		component.setDescription("New Section");
		component.setType(ComponentType.COMP_SECTION);
		component.setCompName(ComponentType.COMP_SECTION.getTagName());
		component.setRendertype(EditableComponent.RENDER_SECTION);
		component.setId("section_"+BaseLoader.getUniqueId());
		component.setPageName(pageName);
		
		int size = component.getChildComponents().size();
		String id= component.getId()+"_"+size+"_div";
		component.getChildComponents().add(SectionComponentBuilder.getDivForSectionComponent(id,pageName));
		return component;
	}

	public boolean isComponentDataChanged(EditableComponent comp){
		if(comp.getRendertype().equals(EditableComponent.RENDER_TEXT_AREA)){
			if(comp.isNewEntry()) return true;
			return comp.isDataChanged();
		}else if(comp.getRendertype().equals(EditableComponent.RENDER_SECTION)){
			return true;
		}else{
			return comp.isDataChanged();
		}
	}
	
	public boolean savePreviewForSubpages(Map<String,List<EditableComponent>> comps){
		Map<String,Boolean> changesSubPages = new HashMap<String,Boolean>(); 
		for(EditablePage subpage:currPage.getSubPages()){
			if(comps.containsKey(subpage.getFileName())){
				changesSubPages.put(subpage.getFileName(), saveSubpageContents(subpage, comps.get(subpage.getFileName()),subpage.getFullPath()));
			}
		}
		
		return changesSubPages.containsValue(true);
	}
	
	private boolean saveSubpageContents(EditablePage subpage,List<EditableComponent> comps, String currLoctn){
		subpage.setPreviewContent(subpage.getFileContent());
		
		Document doc = Jsoup.parseBodyFragment(subpage.getPreviewContent());
		doc.outputSettings().prettyPrint(false).charset("UTF-8");
		
		Element sectionsContainerDiv = null;
		
		for(Element element:doc.getElementsByTag("div")){
			if(element.hasClass(BaseLoader.getProperty(SectionComponentBuilder.SECTION_CONTAINER_CLASS))){
				sectionsContainerDiv=element;
				sectionsContainerDiv.html("");
			}
		}
		
		StringBuffer htmlBuf;
		String[] elmnst;
		
		for(EditableComponent comp:comps){
			Element element =  doc.getElementsByAttributeValue("editarea",comp.getId()).first();
				
			switch (comp.getType()) {
				case COMP_IMAGE:
					if(comp.getImageMode().equalsIgnoreCase("new") && null != comp.getImageFile()){
						
						try {
							String name = comp.getImageFile().getFileName();
							String type = name.substring(name.lastIndexOf("."));
							logger.info("NAME  TYPE==="+name+"  "+type);
							name=name.replace(type, "");
							logger.info("NAME  TYPE==="+name+"  "+type);
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
						element.addClass("prevHighlight");
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
			if(element != null && !subpage.isNoHighlight())
				element.addClass("prevHighlight");
			subpage.setFileChanged(true);
			
		}
		
		String location=currLoctn.substring(0, currLoctn.lastIndexOf(File.separator)+1)+subpage.getFileName()+"_"+BaseLoader.getUserName()+subpage.getFileext()+".prev";
		String html = doc.getElementsByTag("head").html()+doc.getElementsByTag("body").html();
		
		FileHelper.writeContentToFile(location, html);
		
		return subpage.isFileChanged();
	}
}
