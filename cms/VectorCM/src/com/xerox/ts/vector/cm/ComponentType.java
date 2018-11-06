/**
 * 
 */
package com.xerox.ts.vector.cm;

import java.util.Set;

import com.hex.framework.core.logger.LogFactory;
import com.hex.framework.core.logger.Logger;

/**
 * @author C5030183
 *
 */
public enum ComponentType {
	
	COMP_IMAGE("img"),
	COMP_UL("ul"),
	COMP_LI("li"),
	COMP_ANCHOR("a"),
	COMP_BREAK("br"),
	COMP_P("p"),
	COMP_DIV("div"),
	COMP_SECTION("section"),
	COMP_SUP("sup"),
	COMP_DL("dl"),
	COMP_DT("dt"),
	COMP_DD("dd"),
	COMP_DS("ds"),
	COMP_FAQS("faqs"),
	COMP_H1("h1"),
	COMP_H2("h2"),
	COMP_H3("h3"),
	COMP_H4("h4"),
	COMP_H5("h5"),
	COMP_H6("h6"),
	COMP_SPAN("span"),;
	
	private String tagName;
	private transient static Logger logger = LogFactory.getLogger("ComponentType");
	
	ComponentType(String str){
		this.tagName=str;
	}
	
	public static ComponentType getEnum(String value,Set<String> classNames) {
		if(classNames.contains("faqs") && value.equalsIgnoreCase("div"))
			return ComponentType.COMP_FAQS;
		for (ComponentType re : ComponentType.values()) {
			if (re.tagName.equals(value.toLowerCase())) {
				return re;
			}
		}
		logger.info("Invalid RandomEnum value: " + value);
		return COMP_SPAN;
	}
	
	public String getTagName(){
		return tagName;
	}
}
