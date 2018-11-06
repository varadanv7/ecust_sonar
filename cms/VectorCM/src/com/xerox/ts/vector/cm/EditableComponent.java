/**
 * 
 */
package com.xerox.ts.vector.cm;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.faces.event.ActionEvent;
import javax.faces.event.AjaxBehaviorEvent;
import javax.faces.model.SelectItem;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.primefaces.component.selectoneradio.SelectOneRadio;
import org.primefaces.event.FileUploadEvent;
import org.primefaces.model.UploadedFile;

import com.hex.framework.core.logger.LogFactory;
import com.hex.framework.core.logger.Logger;
import com.xerox.ts.vector.cm.core.BaseLoader;
import com.xerox.ts.vector.cm.helper.FileHelper;
import com.xerox.ts.vector.cm.helper.SectionComponentBuilder;
import com.xerox.ts.vector.cm.managedbeans.CMPageBean;

/**
 * @author C5030183
 *
 */
public class EditableComponent implements Serializable,Comparable<EditableComponent>{

	/**
	 * 
	 */
	private static final long serialVersionUID = -2077975396610746248L;
	private transient Logger logger = LogFactory.getLogger(this.getClass().getName());
	
	public static final String RENDER_TEXT_AREA="textarea";
	public static final String RENDER_IMAGE="image";
	public static final String RENDER_SECTION="section";
	public static final String RENDER_FAQ="faq";
	
	private ComponentType type;
	
	private String compName;
	
	private String oldval;
	
	private String newval;
	
	private String id;
	
	private boolean hasParent;
	
	private boolean hasChild;
	
	private String rendertype=RENDER_TEXT_AREA;
	
	private UploadedFile imageFile;

	private String description; 
	
	private String localprevImage;
	
	private String imageMode="existing";
	
	private ExistingImage existingImgRef;
	
	private int filelimit=1;
	
	private boolean dataChanged;
	
	private boolean newEntry;
	
	private String pageName;
	
	private String oldImageSrc;
	
	private String styleClass;
	
	private String imageAlt;
	
	private boolean deleted;
	
	private List<EditableComponent> childComponents = new LinkedList<EditableComponent>();
	
	private Map<Integer,String> DSinnerElemts;	
	
	private int activeSize;
	
	private int orderNo;
	
	private List<SelectItem> orderNumbers;
	
	private String toDelete;

	public String getToDelete() {
		return toDelete;
	}

	public void setToDelete(String toDelete) {
		this.toDelete = toDelete;
	}

	/**
	 * @return the type
	 */
	public ComponentType getType() {
		return type;
	}

	/**
	 * @param type the type to set
	 */
	public void setType(ComponentType type) {
		this.type = type;
	}

	/**
	 * @return the oldval
	 */
	public String getOldval() {
		return oldval;
	}

	/**
	 * @param oldval the oldval to set
	 */
	public void setOldval(String oldval) {
		this.oldval = oldval;
	}

	/**
	 * @return the newval
	 */
	public String getNewval() {
		if(newval!=null && RENDER_TEXT_AREA.equals(this.rendertype) 
				&& newval.endsWith("<br>")){
			newval = newval.substring(0,newval.length()-4);
		}
		return newval;
	}

	/**
	 * @param newval the newval to set
	 */
	public void setNewval(String newval) {
		this.newval = newval;
	}

	/**
	 * @return the childComponents
	 */
	public List<EditableComponent> getChildComponents() {
		return childComponents;
	}

	/**
	 * @param childComponents the childComponents to set
	 */
	public void setChildComponents(List<EditableComponent> childComponents) {
		this.childComponents = childComponents;
	}

	/**
	 * @return the compName
	 */
	public String getCompName() {
		return compName;
	}

	/**
	 * @param compName the compName to set
	 */
	public void setCompName(String compName) {
		this.compName = compName;
	}

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the hasParent
	 */
	public boolean isHasParent() {
		return hasParent;
	}

	/**
	 * @param hasParent the hasParent to set
	 */
	public void setHasParent(boolean hasParent) {
		this.hasParent = hasParent;
	}

	/**
	 * @return the hasChild
	 */
	public boolean isHasChild() {
		return hasChild;
	}

	/**
	 * @param hasChild the hasChild to set
	 */
	public void setHasChild(boolean hasChild) {
		this.hasChild = hasChild;
	}

	/**
	 * @return the rendertype
	 */
	public String getRendertype() {
		return rendertype;
	}

	/**
	 * @param rendertype the rendertype to set
	 */
	public void setRendertype(String rendertype) {
		this.rendertype = rendertype;
	}

	/**
	 * @return the imageFile
	 */
	public UploadedFile getImageFile() {
		return imageFile;
	}

	/**
	 * @param imageFile the imageFile to set
	 */
	public void setImageFile(UploadedFile imageFile) {
		this.imageFile = imageFile;
	}

	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}
	
	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((childComponents == null) ? 0 : childComponents.hashCode());
		result = prime * result
				+ ((compName == null) ? 0 : compName.hashCode());
		result = prime * result
				+ ((description == null) ? 0 : description.hashCode());
		result = prime * result + (hasChild ? 1231 : 1237);
		result = prime * result + (hasParent ? 1231 : 1237);
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result
				+ ((imageFile == null) ? 0 : imageFile.hashCode());
		result = prime * result + ((newval == null) ? 0 : newval.hashCode());
		result = prime * result + ((oldval == null) ? 0 : oldval.hashCode());
		result = prime * result
				+ ((rendertype == null) ? 0 : rendertype.hashCode());
		result = prime * result + ((type == null) ? 0 : type.hashCode());
		return result;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		EditableComponent other = (EditableComponent) obj;
		if (childComponents == null) {
			if (other.childComponents != null)
				return false;
		} else if (!childComponents.equals(other.childComponents))
			return false;
		if (compName == null) {
			if (other.compName != null)
				return false;
		} else if (!compName.equals(other.compName))
			return false;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (hasChild != other.hasChild)
			return false;
		if (hasParent != other.hasParent)
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (imageFile == null) {
			if (other.imageFile != null)
				return false;
		} else if (!imageFile.equals(other.imageFile))
			return false;
		if (newval == null) {
			if (other.newval != null)
				return false;
		} else if (!newval.equals(other.newval))
			return false;
		if (oldval == null) {
			if (other.oldval != null)
				return false;
		} else if (!oldval.equals(other.oldval))
			return false;
		if (rendertype == null) {
			if (other.rendertype != null)
				return false;
		} else if (!rendertype.equals(other.rendertype))
			return false;
		if (type != other.type)
			return false;
		return true;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
	}
	
	public void uploadListener(FileUploadEvent event) {

		this.imageFile = event.getFile();
		if (!FileHelper.isvalidImageFile(imageFile)) {
			this.imageFile = null;
			return;
		}
		logger.info("Its a Valid Image "+imageFile.getFileName());
		localprevImage = BaseLoader.getImagePath(
				FilenameUtils.getName(imageFile.getFileName()),
				AppConstants.IMAGE_TYPE_TEMP);
		filelimit += 1;
		dataChanged = true;
		imageMode="new";

	}
	
	public void updateSelectedForImage(ActionEvent event) {
		CMPageBean.SELECTED_COMP_ID = this.id;
	}
	
	public void datachangeCapture(AjaxBehaviorEvent event) {
		dataChanged = true;
	}
	
	public void addDivToSection(ActionEvent actionEvent){
		int size= getChildComponents().size()+1;
		String compid=this.id+"_"+size+"_div";
		logger.info("comid "+compid);
		getChildComponents().add(SectionComponentBuilder.getDivForSectionComponent(compid,pageName));
		logger.info("Count "+getChildComponents().size());
	}
	
	public void removeDivFromSection(ActionEvent actionEvent) {
		if(getChildComponents().size()>1)
			getChildComponents().get(getChildComponents().size()-1).setDeleted(true);
		for(EditableComponent comp:getChildComponents()){
			logger.info("DELETE FLAG ==== "+isDeleted());
			logger.info("Delete Field "+getToDelete());
		}
}
	
	public void editContents(ActionEvent actionEvent) {

		if(null != actionEvent.getComponent())
			logger.info("Selected component client id ==== "+actionEvent.getComponent().getClientId());
		
		logger.info("Selected component id ==== "+this.id);
		
        /*try {  
            ELContext elContext = FacesContext.getCurrentInstance().getELContext();  
            Object bean = elContext.getELResolver().getValue(elContext, null, AppConstants.CM_PAGE_BEAN);  
            if (bean != null) {  
            	((CMPageBean)bean).setSelectedComponent(this);;  
            }
        } catch (RuntimeException e) {  
            throw new FacesException(e.getMessage(), e);  
        }  */
		
		CMPageBean.SELECTED_COMP_ID = this.id;
        
	}
	
	public void removeSection(ActionEvent actionEvent) {
		/*CMPageBean cmpagebean = (CMPageBean) FacesContext.getCurrentInstance().
				getExternalContext().getSessionMap().get("cmpagebean");
		
		int index=-1;
		for(EditableComponent comp:cmpagebean.getEditableComps()){
			if(comp.getId().equals(this.id)){
				index = cmpagebean.getEditableComps().indexOf(comp);
				break;
			}
		}
		if(-1 != index)
			cmpagebean.getEditableComps().remove(index);*/
		
		setDeleted(true);
	}
	
	public void updateImageUploadMode(AjaxBehaviorEvent actionEvent) {
		this.imageMode = ""+((SelectOneRadio)actionEvent.getSource()).getValue();
	}
	
	/**
	 * @return the localprevImage
	 */
	public String getLocalprevImage() {
		return localprevImage;
	}

	/**
	 * @param localprevImage the localprevImage to set
	 */
	public void setLocalprevImage(String localprevImage) {
		this.localprevImage = localprevImage;
	}

	/**
	 * @return the filelimit
	 */
	public int getFilelimit() {
		return filelimit;
	}

	/**
	 * @param filelimit the filelimit to set
	 */
	public void setFilelimit(int filelimit) {
		this.filelimit = filelimit;
	}

	/**
	 * @return the dataChanged
	 */
	public boolean isDataChanged() {
		return dataChanged;
	}

	/**
	 * @param dataChanged the dataChanged to set
	 */
	public void setDataChanged(boolean dataChanged) {
		this.dataChanged = dataChanged;
	}

	/**
	 * @return the newEntry
	 */
	public boolean isNewEntry() {
		return newEntry;
	}

	/**
	 * @param newEntry the newEntry to set
	 */
	public void setNewEntry(boolean newEntry) {
		this.newEntry = newEntry;
	}

	/**
	 * @return the pageName
	 */
	public String getPageName() {
		return pageName;
	}

	/**
	 * @param pageName the pageName to set
	 */
	public void setPageName(String pageName) {
		this.pageName = pageName;
	}

	/**
	 * @return the oldImageSrc
	 */
	public String getOldImageSrc() {
		if(null==oldImageSrc){
			oldImageSrc = "";
		}
		return oldImageSrc;
	}

	/**
	 * @param oldImageSrc the oldImageSrc to set
	 */
	public void setOldImageSrc(String oldImageSrc) {
		this.oldImageSrc = oldImageSrc;
	}

	/**
	 * @return the styleClass
	 */
	public String getStyleClass() {
		return styleClass;
	}

	/**
	 * @param styleClass the styleClass to set
	 */
	public void setStyleClass(String styleClass) {
		this.styleClass = styleClass;
	}

	/**
	 * @return the imageAlt
	 */
	public String getImageAlt() {
		return imageAlt;
	}

	/**
	 * @param imageAlt the imageAlt to set
	 */
	public void setImageAlt(String imageAlt) {
		this.imageAlt = imageAlt;
	}

	/**
	 * @return the dSinnerElemts
	 */
	public Map<Integer,String> getDSinnerElemts() {
		return DSinnerElemts;
	}

	/**
	 * @param dSinnerElemts the dSinnerElemts to set
	 */
	public void setDSinnerElemts(Map<Integer,String> dSinnerElemts) {
		DSinnerElemts = dSinnerElemts;
	}

	/**
	 * @return the imageMode
	 */
	public String getImageMode() {
		return imageMode;
	}

	/**
	 * @param imageMode the imageMode to set
	 */
	public void setImageMode(String imageMode) {
		this.imageMode = imageMode;
	}

	/**
	 * @return the existingImgRef
	 */
	public ExistingImage getExistingImgRef() {
		return existingImgRef;
	}

	/**
	 * @param existingImgRef the existingImgRef to set
	 */
	public void setExistingImgRef(ExistingImage existingImgRef) {
		this.existingImgRef = existingImgRef;
	}

	/**
	 * @return the deleted
	 */
	public boolean isDeleted() {
		return deleted;
	}

	/**
	 * @param deleted the deleted to set
	 */
	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	/**
	 * @return the activeSize
	 */
	public int getActiveSize() {
		int size=0;
		if(null != getChildComponents()){
			for(EditableComponent comp:getChildComponents()){
				if(!comp.deleted){
					size++;
				}
			}
		}
		return size;
	}

	@Override
	public int compareTo(EditableComponent o) {
		// TODO Auto-generated method stub
		if(o==null)
			return 0;
		
		return o.getOrderNo() - this.getOrderNo();
	}

	/**
	 * @return the orderNo
	 */
	public int getOrderNo() {
		return orderNo;
	}

	/**
	 * @param orderNo the orderNo to set
	 */
	public void setOrderNo(int orderNo) {
		this.orderNo = orderNo;
	}

	/**
	 * @return the orderNumbers
	 */
	public List<SelectItem> getOrderNumbers() {
//		if(null==this.orderNumbers){
			this.orderNumbers = new ArrayList<SelectItem>();
			if(null != getChildComponents()){
				for(int i=0;i<getChildComponents().size();i++){
					this.orderNumbers.add(new SelectItem(i, ""+i));
				}
			}else{
				this.orderNumbers.add(new SelectItem(0, "0"));
			}
			
//		}
		return orderNumbers;
	}

	/**
	 * @param orderNumbers the orderNumbers to set
	 */
	public void setOrderNumbers(List<SelectItem> orderNumbers) {
		this.orderNumbers = orderNumbers;
	}


}
