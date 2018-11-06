/**
 * ExitPointsResponse.java
 *
 * This file was auto-generated from WSDL
 * by the IBM Web services WSDL2Java emitter.
 * cf90721.10 v53107135043
 */

package com.acs.ts.vector.ws.service;

public class ExitPointsResponse  {
    private com.acs.ts.vector.ws.service.FacilityInfo[] facilities;
    private java.lang.String attrib01;
    private java.lang.String attrib02;

    public ExitPointsResponse() {
    }

    public com.acs.ts.vector.ws.service.FacilityInfo[] getFacilities() {
        return facilities;
    }

    public void setFacilities(com.acs.ts.vector.ws.service.FacilityInfo[] facilities) {
        this.facilities = facilities;
    }

    public com.acs.ts.vector.ws.service.FacilityInfo getFacilities(int i) {
        return this.facilities[i];
    }

    public void setFacilities(int i, com.acs.ts.vector.ws.service.FacilityInfo value) {
        this.facilities[i] = value;
    }

    public java.lang.String getAttrib01() {
        return attrib01;
    }

    public void setAttrib01(java.lang.String attrib01) {
        this.attrib01 = attrib01;
    }

    public java.lang.String getAttrib02() {
        return attrib02;
    }

    public void setAttrib02(java.lang.String attrib02) {
        this.attrib02 = attrib02;
    }

}
