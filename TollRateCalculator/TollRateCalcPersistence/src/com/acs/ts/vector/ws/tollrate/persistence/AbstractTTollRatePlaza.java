/**
 * 
 */
package com.acs.ts.vector.ws.tollrate.persistence;

import java.io.Serializable;

/**
 * @author 20423829
 * 
 */
public abstract class AbstractTTollRatePlaza implements Serializable {

	private String plazaId;

	private String agencyDesc;

	private String isICC;

	private String plazaGroup;

	private String plazaSeqNumber;

	private String exitPlazaName;

	private String exitPlazas;

	private String plazaName;

	private String isActive;

	private String agencyId;

	/**
	 * @param plazaid
	 */
	public AbstractTTollRatePlaza(String plazaid) {
		super();
		this.plazaId = plazaid;
	}

	/**
	 * @return the agencyDesc
	 */
	public String getAgencyDesc() {
		return agencyDesc;
	}

	/**
	 * @param agencyDesc
	 *            the agencyDesc to set
	 */
	public void setAgencyDesc(String agencyDesc) {
		this.agencyDesc = agencyDesc;
	}

	/**
	 * @return the agencyId
	 */
	public String getAgencyId() {
		return agencyId;
	}

	/**
	 * @param agencyId
	 *            the agencyId to set
	 */
	public void setAgencyId(String agencyId) {
		this.agencyId = agencyId;
	}

	/**
	 * @return the exitPlazaName
	 */
	public String getExitPlazaName() {
		return exitPlazaName;
	}

	/**
	 * @param exitPlazaName
	 *            the exitPlazaName to set
	 */
	public void setExitPlazaName(String exitPlazaName) {
		this.exitPlazaName = exitPlazaName;
	}

	/**
	 * @return the exitPlazas
	 */
	public String getExitPlazas() {
		return exitPlazas;
	}

	/**
	 * @param exitPlazas
	 *            the exitPlazas to set
	 */
	public void setExitPlazas(String exitPlazas) {
		this.exitPlazas = exitPlazas;
	}

	/**
	 * @return the isActive
	 */
	public String getIsActive() {
		return isActive;
	}

	/**
	 * @param isActive
	 *            the isActive to set
	 */
	public void setIsActive(String isActive) {
		this.isActive = isActive;
	}

	/**
	 * @return the isICC
	 */
	public String getIsICC() {
		return isICC;
	}

	/**
	 * @param isICC
	 *            the isICC to set
	 */
	public void setIsICC(String isICC) {
		this.isICC = isICC;
	}

	/**
	 * @return the plazaGroup
	 */
	public String getPlazaGroup() {
		return plazaGroup;
	}

	/**
	 * @param plazaGroup
	 *            the plazaGroup to set
	 */
	public void setPlazaGroup(String plazaGroup) {
		this.plazaGroup = plazaGroup;
	}

	/**
	 * @return the plazaId
	 */
	public String getPlazaId() {
		return plazaId;
	}

	/**
	 * @param plazaId
	 *            the plazaId to set
	 */
	public void setPlazaId(String plazaId) {
		this.plazaId = plazaId;
	}

	/**
	 * @return the plazaName
	 */
	public String getPlazaName() {
		return plazaName;
	}

	/**
	 * @param plazaName
	 *            the plazaName to set
	 */
	public void setPlazaName(String plazaName) {
		this.plazaName = plazaName;
	}

	/**
	 * @return the plazaSeqNumber
	 */
	public String getPlazaSeqNumber() {
		return plazaSeqNumber;
	}

	/**
	 * @param plazaSeqNumber
	 *            the plazaSeqNumber to set
	 */
	public void setPlazaSeqNumber(String plazaSeqNumber) {
		this.plazaSeqNumber = plazaSeqNumber;
	}

}
