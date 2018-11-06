/**
 * ICC_Ser.java
 *
 * This file was auto-generated from WSDL
 * by the IBM Web services WSDL2Java emitter.
 * cf90721.10 v53107135043
 */

package com.acs.ts.vector.ws.service;

public class ICC_Ser extends com.ibm.ws.webservices.engine.encoding.ser.BeanSerializer {
    /**
     * Constructor
     */
    public ICC_Ser(
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType, 
           com.ibm.ws.webservices.engine.description.TypeDesc _typeDesc) {
        super(_javaType, _xmlType, _typeDesc);
    }
    public void serialize(
        javax.xml.namespace.QName name,
        org.xml.sax.Attributes attributes,
        java.lang.Object value,
        com.ibm.ws.webservices.engine.encoding.SerializationContext context)
        throws java.io.IOException
    {
        context.startElement(name, addAttributes(attributes, value, context));
        addElements(value, context);
        context.endElement();
    }
    protected org.xml.sax.Attributes addAttributes(
        org.xml.sax.Attributes attributes,
        java.lang.Object value,
        com.ibm.ws.webservices.engine.encoding.SerializationContext context)
        throws java.io.IOException
    {
        return attributes;
    }
    protected void addElements(
        java.lang.Object value,
        com.ibm.ws.webservices.engine.encoding.SerializationContext context)
        throws java.io.IOException
    {
        ICC bean = (ICC) value;
        java.lang.Object propValue;
        javax.xml.namespace.QName propQName;
        {
          propQName = QName_0_19;
          propValue = bean.getEzpass();
          serializeChild(propQName, null, 
              propValue, 
              QName_2_21,
              true,null,context);
          propQName = QName_0_20;
          propValue = bean.getVideoToll();
          serializeChild(propQName, null, 
              propValue, 
              QName_2_22,
              true,null,context);
        }
    }
    private final static javax.xml.namespace.QName QName_0_19 = 
           com.ibm.ws.webservices.engine.utils.QNameTable.createQName(
                  "",
                  "ezpass");
    private final static javax.xml.namespace.QName QName_2_21 = 
           com.ibm.ws.webservices.engine.utils.QNameTable.createQName(
                  "http://service.ws.vector.ts.acs.com/TollRateCalc/",
                  "EZPassRate");
    private final static javax.xml.namespace.QName QName_2_22 = 
           com.ibm.ws.webservices.engine.utils.QNameTable.createQName(
                  "http://service.ws.vector.ts.acs.com/TollRateCalc/",
                  "VideoTollRate");
    private final static javax.xml.namespace.QName QName_0_20 = 
           com.ibm.ws.webservices.engine.utils.QNameTable.createQName(
                  "",
                  "videoToll");
}
