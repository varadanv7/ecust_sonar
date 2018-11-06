/**
 * 
 */
package com.acs.ts.vector.ws.tollrate.common.vo;

import java.io.Serializable;

/**
 * @author 20423829
 *
 */
public class ResponseVO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2834525672968164862L;
	
	private ICC icc;
    private NonICC nonicc;
    
	/**
	 * @return the icc
	 */
	public ICC getIcc() {
		return icc;
	}
	/**
	 * @param icc the icc to set
	 */
	public void setIcc(ICC icc) {
		this.icc = icc;
	}
	/**
	 * @return the nonicc
	 */
	public NonICC getNonicc() {
		return nonicc;
	}
	/**
	 * @param nonicc the nonicc to set
	 */
	public void setNonicc(NonICC nonicc) {
		this.nonicc = nonicc;
	}

}
