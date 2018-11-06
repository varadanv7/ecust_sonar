/**
 * 
 */
package com.acs.ts.vector.ws.tollrate.common.vo;

import java.io.Serializable;

/**
 * @author 20423829
 *
 */
public class RequestVO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3940674789266937428L;

	private java.lang.String facilityCode;
    private java.lang.String agency;
    private java.lang.String entryPointCode;
    private java.lang.String exitPointCode;
    private java.lang.String vehicleClassCode;
    
	/**
	 * @return the facilityCode
	 */
	public java.lang.String getFacilityCode() {
		return facilityCode;
	}
	/**
	 * @param facilityCode the facilityCode to set
	 */
	public void setFacilityCode(java.lang.String facilityCode) {
		this.facilityCode = facilityCode;
	}
	/**
	 * @return the agency
	 */
	public java.lang.String getAgency() {
		return agency;
	}
	/**
	 * @param agency the agency to set
	 */
	public void setAgency(java.lang.String agency) {
		this.agency = agency;
	}
	/**
	 * @return the entryPointCode
	 */
	public java.lang.String getEntryPointCode() {
		return entryPointCode;
	}
	/**
	 * @param entryPointCode the entryPointCode to set
	 */
	public void setEntryPointCode(java.lang.String entryPointCode) {
		this.entryPointCode = entryPointCode;
	}
	/**
	 * @return the exitPointCode
	 */
	public java.lang.String getExitPointCode() {
		return exitPointCode;
	}
	/**
	 * @param exitPointCode the exitPointCode to set
	 */
	public void setExitPointCode(java.lang.String exitPointCode) {
		this.exitPointCode = exitPointCode;
	}
	/**
	 * @return the vehicleClassCode
	 */
	public java.lang.String getVehicleClassCode() {
		return vehicleClassCode;
	}
	/**
	 * @param vehicleClassCode the vehicleClassCode to set
	 */
	public void setVehicleClassCode(java.lang.String vehicleClassCode) {
		this.vehicleClassCode = vehicleClassCode;
	}
}
