/**
 * 
 */
package com.acs.ts.vector.ws.tollrate.persistence;

import java.io.Serializable;

/**
 * @author 20423829
 * 
 */
public abstract class AbstractTVehicleClass implements Serializable {


	private String agencyClass;

	private String classDescription;
	private String agencyId;

	/**
	 * @param agencyClass
	 */
	public AbstractTVehicleClass(String agencyClass) {
		super();
		this.agencyClass = agencyClass;
	}

	/**
	 * @return the agencyClass
	 */
	public String getAgencyClass() {
		return agencyClass;
	}

	/**
	 * @param agencyClass the agencyClass to set
	 */
	public void setAgencyClass(String agencyClass) {
		this.agencyClass = agencyClass;
	}

	/**
	 * @return the class_description
	 */
	public String getClassDescription() {
		return classDescription;
	}

	/**
	 * @param class_description the class_description to set
	 */
	public void setClassDescription(String classDescription) {
		this.classDescription = classDescription;
	}

	/**
	 * @return the agencyId
	 */
	public String getAgencyId() {
		return agencyId;
	}

	/**
	 * @param agencyId the agencyId to set
	 */
	public void setAgencyId(String agencyId) {
		this.agencyId = agencyId;
	}
}
