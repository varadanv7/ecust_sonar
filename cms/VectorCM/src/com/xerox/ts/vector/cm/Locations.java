/**
 * 
 */
package com.xerox.ts.vector.cm;

import java.io.Serializable;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

/**
 * @author C5030183
 *
 */
@XmlRootElement(name="locations")

public class Locations implements Serializable{

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<Location> locnElemnts;

	/**
	 * @return the include
	 */
	public List<Location> getLocnElemnts() {
		return locnElemnts;
	}

	/**
	 * @param include the include to set
	 */
	@XmlElement(name="location")
	public void setLocnElemnts(List<Location> locnElemnts) {
		this.locnElemnts = locnElemnts;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return ToStringBuilder.reflectionToString(this,ToStringStyle.SIMPLE_STYLE);
	}
	
	private Location getLocationByIndex(int index){
		if(null != locnElemnts && !this.locnElemnts.isEmpty()){
			if(locnElemnts.size()>index){
				return locnElemnts.get(index);
			}
		}
		return null;
	}
	
	private Location getLocationById(String id){
		if(null != locnElemnts && !this.locnElemnts.isEmpty()){
			for(Location loc:locnElemnts){
				if(id.equalsIgnoreCase(loc.getId())){
					return loc;
				}
			}
		}
		return null;
	}
	
	public Location deleteLocation(Location inlocn){
		Location oldloc = getLocationById(inlocn.getId());
		if(null != oldloc)
			locnElemnts.remove(locnElemnts.indexOf(oldloc));
		return null;
	}
	
	public Location addLocation(Location inlocn){
		if(null != inlocn && null != locnElemnts)
			locnElemnts.add(inlocn);
		return null;
	}
	
	public Location updateLocation(Location inlocn){
		Location oldloc = getLocationById(inlocn.getId());
		if(null != oldloc)
			locnElemnts.set(locnElemnts.indexOf(oldloc), inlocn);
		return null;
	}
	
}
