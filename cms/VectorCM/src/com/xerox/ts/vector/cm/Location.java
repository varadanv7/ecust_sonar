/**
 * 
 */
package com.xerox.ts.vector.cm;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlAccessOrder;
import javax.xml.bind.annotation.XmlAccessorOrder;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;


/**
 * @author C5030183
 *
 */
@XmlRootElement(name="location")
@XmlType(propOrder = { "id", "icon", "lat", "longitude", "name", "street", "city", "state", "zip", "phone", "notes" })
@XmlAccessorOrder(XmlAccessOrder.ALPHABETICAL)
public class Location implements Serializable,Comparable<Location>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String id;
	
	private String icon;
	
	private String lat;
	
	private String longitude;
	
	private String name;
	
	private String street;
	
	private String city;
	
	private String state;
	
	private String zip;
	
	private String phone;
	
	private String notes;

	/**
	 * @return the id
	 */
	@XmlAttribute(required=true)
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
	 * @return the icon
	 */
	@XmlAttribute(required=true)
	public String getIcon() {
		return icon;
	}

	/**
	 * @param icon the icon to set
	 */
	public void setIcon(String icon) {
		this.icon = icon;
	}

	/**
	 * @return the lat
	 */
	@XmlAttribute(required=true)
	public String getLat() {
		return lat;
	}

	/**
	 * @param lat the lat to set
	 */
	public void setLat(String lat) {
		this.lat = lat;
	}

	/**
	 * @return the longitude
	 */
	@XmlAttribute(name="long",required=true)
	public String getLongitude() {
		return longitude;
	}

	/**
	 * @param longitude the longitude to set
	 */
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	/**
	 * @return the name
	 */
	@XmlElement(required=true,nillable=true)
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the street
	 */
	@XmlElement(required=true,nillable=true)
	public String getStreet() {
		return street;
	}

	/**
	 * @param street the street to set
	 */
	public void setStreet(String street) {
		this.street = street;
	}

	/**
	 * @return the city
	 */
	@XmlElement(required=true,nillable=true)
	public String getCity() {
		return city;
	}

	/**
	 * @param city the city to set
	 */
	public void setCity(String city) {
		this.city = city;
	}

	/**
	 * @return the state
	 */
	@XmlElement(required=true,nillable=true)
	public String getState() {
		return state;
	}

	/**
	 * @param state the state to set
	 */
	public void setState(String state) {
		this.state = state;
	}

	/**
	 * @return the zip
	 */
	@XmlElement(required=true,nillable=true)
	public String getZip() {
		return zip;
	}

	/**
	 * @param zip the zip to set
	 */
	public void setZip(String zip) {
		this.zip = zip;
	}

	/**
	 * @return the phone
	 */
	@XmlElement(required=true,nillable=true)
	public String getPhone() {
		return phone;
	}

	/**
	 * @param phone the phone to set
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}

	/**
	 * @return the notes
	 */
	@XmlElement(required=true,nillable=true)
	public String getNotes() {
		return notes;
	}

	/**
	 * @param notes the notes to set
	 */
	public void setNotes(String notes) {
		this.notes = notes;
	}
	
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return ToStringBuilder.reflectionToString(this,ToStringStyle.SIMPLE_STYLE);
	}


	@Override
	public int compareTo(Location o) {
		// TODO Auto-generated method stub
		if(null == o)return 0;
		return getName().compareToIgnoreCase(o.getName());
	}
	
}
