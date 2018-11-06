/**
 * ICC_Helper.java
 *
 * This file was auto-generated from WSDL
 * by the IBM Web services WSDL2Java emitter.
 * cf90721.10 v53107135043
 */

package com.acs.ts.vector.ws.service;

public class ICC_Helper {
    // Type metadata
    private static final com.ibm.ws.webservices.engine.description.TypeDesc typeDesc =
        new com.ibm.ws.webservices.engine.description.TypeDesc(ICC.class);

    static {
        typeDesc.setOption("buildNum","cf90721.10");
        com.ibm.ws.webservices.engine.description.FieldDesc field = new com.ibm.ws.webservices.engine.description.ElementDesc();
        field.setFieldName("ezpass");
        field.setXmlName(com.ibm.ws.webservices.engine.utils.QNameTable.createQName("", "ezpass"));
        field.setXmlType(com.ibm.ws.webservices.engine.utils.QNameTable.createQName("http://service.ws.vector.ts.acs.com/TollRateCalc/", "EZPassRate"));
        typeDesc.addFieldDesc(field);
        field = new com.ibm.ws.webservices.engine.description.ElementDesc();
        field.setFieldName("videoToll");
        field.setXmlName(com.ibm.ws.webservices.engine.utils.QNameTable.createQName("", "videoToll"));
        field.setXmlType(com.ibm.ws.webservices.engine.utils.QNameTable.createQName("http://service.ws.vector.ts.acs.com/TollRateCalc/", "VideoTollRate"));
        typeDesc.addFieldDesc(field);
    };

    /**
     * Return type metadata object
     */
    public static com.ibm.ws.webservices.engine.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

    /**
     * Get Custom Serializer
     */
    public static com.ibm.ws.webservices.engine.encoding.Serializer getSerializer(
           java.lang.String mechType, 
           java.lang.Class javaType,  
           javax.xml.namespace.QName xmlType) {
        return 
          new ICC_Ser(
            javaType, xmlType, typeDesc);
    };

    /**
     * Get Custom Deserializer
     */
    public static com.ibm.ws.webservices.engine.encoding.Deserializer getDeserializer(
           java.lang.String mechType, 
           java.lang.Class javaType,  
           javax.xml.namespace.QName xmlType) {
        return 
          new ICC_Deser(
            javaType, xmlType, typeDesc);
    };

}
