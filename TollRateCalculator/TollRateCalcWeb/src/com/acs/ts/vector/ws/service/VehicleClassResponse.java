/**
 * VehicleClassResponse.java
 *
 * This file was auto-generated from WSDL
 * by the IBM Web services WSDL2Java emitter.
 * cf90721.10 v53107135043
 */

package com.acs.ts.vector.ws.service;

public class VehicleClassResponse  {
    private com.acs.ts.vector.ws.service.VehicleClassInfo[] vehicleClass;
    private java.lang.String attrib01;
    private java.lang.String attrib02;

    public VehicleClassResponse() {
    }

    public com.acs.ts.vector.ws.service.VehicleClassInfo[] getVehicleClass() {
        return vehicleClass;
    }

    public void setVehicleClass(com.acs.ts.vector.ws.service.VehicleClassInfo[] vehicleClass) {
        this.vehicleClass = vehicleClass;
    }

    public com.acs.ts.vector.ws.service.VehicleClassInfo getVehicleClass(int i) {
        return this.vehicleClass[i];
    }

    public void setVehicleClass(int i, com.acs.ts.vector.ws.service.VehicleClassInfo value) {
        this.vehicleClass[i] = value;
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
