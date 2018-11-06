/**
 * 
 */
package com.xerox.ts.vector.cm;

import java.io.Serializable;

import com.xerox.ts.vector.cm.core.BaseLoader;

/**
 * @author C5030183
 * 
 */
public class ExistingFiles implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int id;
	private String imageName;
	private String fileName;
	private String imageSize;
	private String fileRef;
	private String fileExt;
	
	
	public ExistingFiles(int id,String imageName,String fileName,Long size,String fileExt) {
		// TODO Auto-generated constructor stub
		this.id = id;
		this.imageName= imageName;
		this.fileName= fileName;
		this.imageSize=""+Math.ceil(((Double.parseDouble(""+size))/1000))+" KB";
		
		this.fileRef = BaseLoader.getImagePath(
				imageName,
				AppConstants.IMAGE_TYPE_IMAGE);
		this.fileExt = fileExt;
	}
	
	
	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}
	/**
	 * @return the imageName
	 */
	public String getImageName() {
		return imageName;
	}
	/**
	 * @param imageName the imageName to set
	 */
	public void setImageName(String imageName) {
		this.imageName = imageName;
	}
	/**
	 * @return the fileName
	 */
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
	 * @return the imageSize
	 */
	public String getImageSize() {
		return imageSize;
	}
	/**
	 * @param imageSize the imageSize to set
	 */
	public void setImageSize(String imageSize) {
		this.imageSize = imageSize;
	}


	/**
	 * @return the fileRef
	 */
	public String getFileRef() {
		return fileRef;
	}


	/**
	 * @param fileRef the fileRef to set
	 */
	public void setFileRef(String fileRef) {
		this.fileRef = fileRef;
	}


	/**
	 * @return the fileExt
	 */
	public String getFileExt() {
		return fileExt;
	}


	/**
	 * @param fileExt the fileExt to set
	 */
	public void setFileExt(String fileExt) {
		this.fileExt = fileExt;
	}

}
