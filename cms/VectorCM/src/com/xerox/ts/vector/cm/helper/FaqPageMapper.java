/**
 * 
 */
package com.xerox.ts.vector.cm.helper;

import java.util.HashMap;
import java.util.Map;

/**
 * @author C5030183
 *
 */
public final class FaqPageMapper {

	public static Map<String,String> faqPageMap = new HashMap<String,String>();
	
	static {
		// TODO Auto-generated constructor stub
		faqPageMap.put("faq_general_gnrl_content", "General FAQs");
		faqPageMap.put("faq_general_retlr_content", "Retailer Account");
		faqPageMap.put("faq_general_buss_content", "Business Account");
		faqPageMap.put("faq_gettingAroung_ExpLanes_content", "Express Lanes");
		faqPageMap.put("faq_gettingAroung_SFO_content", "SFO");
		faqPageMap.put("faq_yourAccount_using_content", "Using Your Account");
		faqPageMap.put("faq_yourAccount_accessing_content", "Accessing Your Account");
		faqPageMap.put("faq_yourAccount_maintaining_content", "Account Maintenance");
		faqPageMap.put("faq_goldenGateBridge_content", "GGB");
		faqPageMap.put("faq_makingaPayment_content", "Making a Payment");
		faqPageMap.put("faq_vehicles_rental_content", "Rental Vehicles");
		faqPageMap.put("faq_vehicles_commercial_content", "Commercial Vehicles");
		faqPageMap.put("faq_vehicles_clearAir_content", "Clean Air Vehicles");
	}
}
