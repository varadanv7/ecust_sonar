/**
 * 
 */
package com.xerox.ts.vector.cm;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 * @author C5030183
 *
 */
@XmlRootElement(name="EditableFiles")
public class EditableFiles {
	
	
	private List<EditableFile> editableFileList;
	
	@XmlTransient
	private Map<String,EditableFile> files;

	/**
	 * @return the editableFileList
	 */
	@XmlElement(name="EditableFile")
	public List<EditableFile> getEditableFileList() {
		return editableFileList;
	}

	/**
	 * @param editableFileList the editableFileList to set
	 */
	public void setEditableFileList(List<EditableFile> editableFileList) {
		this.editableFileList = editableFileList;
	}

	public EditableFile getFileByName(String fileName){
		
		if(null==files){
			files = new HashMap<String, EditableFile>();
			for(EditableFile file:editableFileList)
				files.put(file.getFileName(), file);
		}
		return files.get(fileName);
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "EditableFiles [editableFileList=" + editableFileList
				+ ", files=" + files + "]";
	}
	
}
