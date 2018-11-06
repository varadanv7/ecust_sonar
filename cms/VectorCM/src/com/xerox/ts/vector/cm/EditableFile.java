/**
 * 
 */
package com.xerox.ts.vector.cm;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

/**
 * @author C5030183
 *
 */
@XmlRootElement(name="EditableFile")
public class EditableFile {

	private String fileName;
	
	private boolean addEnabled;
	
	private boolean skipEncloseTags;
	
	private boolean faqpage;
	
	private boolean map;
	
	private List<String> include;
	
	private List<String> mapRefPage;
	
	private boolean noHighlight;

	/**
	 * @return the fileName
	 */
	@XmlElement
	public String getFileName() {
		return fileName;
	}

	/**
	 * @param fileName the fileName to set
	 */
	public void setFileName(String fileName) {
		this.fileName = fileName;
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
	 * @return the include
	 */
	public List<String> getInclude() {
		return include;
	}

	/**
	 * @param include the include to set
	 */
	public void setInclude(List<String> include) {
		this.include = include;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this,ToStringStyle.SIMPLE_STYLE);
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
	 * @return the map
	 */
	public boolean isMap() {
		return map;
	}

	/**
	 * @param map the map to set
	 */
	public void setMap(boolean map) {
		this.map = map;
	}

	/**
	 * @return the mapRefPage
	 */
	public List<String> getMapRefPage() {
		return mapRefPage;
	}

	/**
	 * @param mapRefPage the mapRefPage to set
	 */
	public void setMapRefPage(List<String> mapRefPage) {
		this.mapRefPage = mapRefPage;
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

	
}
