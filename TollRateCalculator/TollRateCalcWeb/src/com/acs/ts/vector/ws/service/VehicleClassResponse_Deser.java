/**
 * VehicleClassResponse_Deser.java
 *
 * This file was auto-generated from WSDL
 * by the IBM Web services WSDL2Java emitter.
 * cf90721.10 v53107135043
 */

package com.acs.ts.vector.ws.service;

public class VehicleClassResponse_Deser extends com.ibm.ws.webservices.engine.encoding.ser.BeanDeserializer {
    /**
     * Constructor
     */
    public VehicleClassResponse_Deser(
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType, 
           com.ibm.ws.webservices.engine.description.TypeDesc _typeDesc) {
        super(_javaType, _xmlType, _typeDesc);
    }
    /**
     * Create instance of java bean
     */
    public void createValue() {
        value = new com.acs.ts.vector.ws.service.VehicleClassResponse();
    }
    protected boolean tryElementSetFromString(javax.xml.namespace.QName qName, java.lang.String strValue) {
        if (qName==QName_0_1) {
          ((VehicleClassResponse)value).setAttrib01(strValue);
          return true;}
        else if (qName==QName_0_2) {
          ((VehicleClassResponse)value).setAttrib02(strValue);
          return true;}
        return false;
    }
    protected boolean tryAttributeSetFromString(javax.xml.namespace.QName qName, java.lang.String strValue) {
        return false;
    }
    protected boolean tryElementSetFromObject(javax.xml.namespace.QName qName, java.lang.Object objValue) {
        if (objValue == null) {
          return true;
        }
        return false;
    }
    protected boolean tryElementSetFromList(javax.xml.namespace.QName qName, java.util.List listValue) {
        if (qName==QName_0_9) {
          com.acs.ts.vector.ws.service.VehicleClassInfo[] array = new com.acs.ts.vector.ws.service.VehicleClassInfo[listValue.size()];
          listValue.toArray(array);
          ((VehicleClassResponse)value).setVehicleClass(array);
          return true;}
        return false;
    }
    private final static javax.xml.namespace.QName QName_0_2 = 
           com.ibm.ws.webservices.engine.utils.QNameTable.createQName(
                  "",
                  "attrib02");
    private final static javax.xml.namespace.QName QName_0_1 = 
           com.ibm.ws.webservices.engine.utils.QNameTable.createQName(
                  "",
                  "attrib01");
    private final static javax.xml.namespace.QName QName_0_9 = 
           com.ibm.ws.webservices.engine.utils.QNameTable.createQName(
                  "",
                  "vehicleClass");
}
