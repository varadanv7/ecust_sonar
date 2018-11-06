/**
 * 
 */
package com.acs.ts.vector.ws.tollrate.persistence.dao;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.naming.NamingException;

import org.hibernate.Query;
import org.hibernate.Session;

import com.acs.ts.vector.ws.tollrate.common.vo.EZPassRate;
import com.acs.ts.vector.ws.tollrate.common.vo.FacilityInfo;
import com.acs.ts.vector.ws.tollrate.common.vo.ICC;
import com.acs.ts.vector.ws.tollrate.common.vo.NonICC;
import com.acs.ts.vector.ws.tollrate.common.vo.RequestVO;
import com.acs.ts.vector.ws.tollrate.common.vo.ResponseVO;
import com.acs.ts.vector.ws.tollrate.common.vo.VehicleClassInfo;
import com.acs.ts.vector.ws.tollrate.common.vo.VideoTollRate;

/**
 * @author 20423829
 *
 */
public class TollRateCalcDAO {
	/**
	 * @param plazaGroup
	 * @return list of FacilityInfo objects
	 * @throws SQLException
	 * @throws NamingException
	 */
	public ArrayList<FacilityInfo> getFacilitiesDB(RequestVO requestVO) throws SQLException, NamingException{
		ArrayList<FacilityInfo> facilityList = new ArrayList<FacilityInfo>(); 
		Session session = HibernateUtil.currentSession();
		Query query = session.createQuery(session.getNamedQuery("GET_FACILITIES").getQueryString());//session.getNamedQuery("GET_FACILITIES");
		Iterator it = query.list().iterator();
		Object[] row;
		FacilityInfo info = null;
		while(it.hasNext()){
			row = (Object[]) it.next();
			info = new FacilityInfo();
			if(null != row[0])
				info.setFacilityCode(row[0].toString());
			if(null != row[1])
				info.setFacilityName(row[1].toString());
			if(null != row[2])
				info.setIsICC(row[2].toString());
			facilityList.add(info);
		}
		return facilityList;
	}
	
	/**
	 * @param agencyID
	 * @return list of VehicleClassInfo objects
	 * @throws SQLException
	 * @throws NamingException
	 */
	public ArrayList<VehicleClassInfo> getVehicleClassDB(RequestVO requestVO) throws SQLException, NamingException{
		ArrayList<VehicleClassInfo> vehClassList = new ArrayList<VehicleClassInfo>();
		Session session = HibernateUtil.currentSession();
		Query query = session.createQuery(session.getNamedQuery("GET_VEHICLECLASS").getQueryString());//session.getNamedQuery("GET_FACILITIES");
		Iterator it = query.list().iterator();
		Object[] row;
		VehicleClassInfo info = null;
		while(it.hasNext()){
			row = (Object[]) it.next();
			info = new VehicleClassInfo();
			if(null != row[0])
				info.setVehicleClassCode(row[0].toString());
			if(null != row[1])
				info.setVehicleClassDesc(row[1].toString());
			vehClassList.add(info);
		}
    	return vehClassList;
	}
	
	/**
	 * @param agencyID
	 * @return list of FacilityInfo objects
	 * @throws SQLException
	 * @throws NamingException
	 */
	public ArrayList<FacilityInfo> getEntryPointDB(RequestVO requestVO) throws SQLException, NamingException{
		ArrayList<FacilityInfo> entryPtList = new ArrayList<FacilityInfo>();
		Session session = HibernateUtil.currentSession();
		Query query = session.createQuery(session.getNamedQuery("GET_ENTRY_POINTS").getQueryString());//session.getNamedQuery("GET_FACILITIES");
		query.setString(0, requestVO.getFacilityCode());
		Iterator it = query.list().iterator();
		
		Object[] row;
		FacilityInfo info = null;
		while(it.hasNext()){
			row = (Object[]) it.next();
			info = new FacilityInfo();
			if(null != row[0])
				info.setFacilityCode(row[0].toString());
			if(null != row[1])
				info.setFacilityName(row[1].toString());
			entryPtList.add(info);
		}
		return entryPtList;
	}
	
	/**
	 * @param plazaGroup
	 * @return list of FacilityInfo objects
	 * @throws SQLException
	 * @throws NamingException
	 */
	public ArrayList<FacilityInfo> getExitPointsDB(RequestVO requestVO) throws SQLException, NamingException{
		ArrayList<FacilityInfo> exitPtList = new ArrayList<FacilityInfo>();
		Session session = HibernateUtil.currentSession();
		String possExitPoints = getExitPlazas(requestVO.getEntryPointCode());
//		System.out.println("********>>>>"+possExitPoints);
		String sql="select plaza_Id, Exit_plaza_Name from T_TollRate_Plaza where plaza_Id in ("+possExitPoints+" ) order by plaza_seq_number";
		Query query = HibernateUtil.currentSession().createSQLQuery(sql);
		Iterator it = query.list().iterator();
		Object[] row;
		FacilityInfo info = null;
		while(it.hasNext()){
			row = (Object[]) it.next();
			info = new FacilityInfo();
			if(null != row[0])
				info.setFacilityCode(row[0].toString());
			if(null != row[1])
				info.setFacilityName(row[1].toString());
			exitPtList.add(info);
		}
		return exitPtList;
	}
	
	/**
	 * @param entryplazaID
	 * @return list of String objects
	 * @throws SQLException
	 * @throws NamingException
	 */
	private String getExitPlazas(String entryplazaID) throws SQLException, NamingException{
		String exitPlazas = null;
		
		Session session = HibernateUtil.currentSession();
		Query query = session.createQuery(session.getNamedQuery("GET_POSS_EXIT_POINTS").getQueryString());
		query.setString(0, entryplazaID);
		Iterator it = query.iterate();		
		if(it.hasNext())
		{
			exitPlazas = (String)it.next();
		}		
		return exitPlazas;
	}
	
	public ResponseVO getCalcTollRateDB(RequestVO requestVO) throws SQLException, NamingException{
		ResponseVO calcTollRateresp = null;
		//Condition to check for ICC or NON-ICC
		if(null != requestVO.getExitPointCode() && requestVO.getExitPointCode().trim().length()>0){
			calcTollRateresp = new ResponseVO();
			ICC icc = new ICC();
			icc = getICCTollRateCalc(requestVO);
			calcTollRateresp.setIcc(icc);
		}else{
			calcTollRateresp = new ResponseVO();
			NonICC nonICC = getNonICCTollRateCalc(requestVO);
			calcTollRateresp.setNonicc(nonICC);
		}
		return calcTollRateresp;
	}
	
	public ICC getICCTollRateCalc(RequestVO requestVO) throws SQLException, NamingException{
		 ICC icc = new ICC(); 
		 EZPassRate ezPassRate = new EZPassRate();
		 VideoTollRate nonEzPassRate = new VideoTollRate();
		 
		 String ezPassPeak = getRate(requestVO,selEzpassPeakQuery);
		 String ezPassOffPeak = getRate(requestVO, selEzpassOffPeakQuery);
		 String ezPassOvernight = getRate(requestVO, selEzpassOverNightQuery);
		 ezPassRate.setPeak(ezPassPeak);
		 ezPassRate.setOffPeak(ezPassOffPeak);
		 ezPassRate.setOvernight(ezPassOvernight);
		 
		 String nonEzPassPeak = getRate(requestVO, selNonEzpassPeakQuery);
		 String nonEzPassOffPeak = getRate(requestVO, selNonEzpassOffPeakQuery);
		 String nonEzPassOvernightPeak = getRate(requestVO, selNonEzpassOvernightQuery);
		 nonEzPassRate.setPeak(nonEzPassPeak);
		 nonEzPassRate.setOffPeak(nonEzPassOffPeak);
		 nonEzPassRate.setOvernight(nonEzPassOvernightPeak);
		 
		 icc.setEzpass(ezPassRate);
		 icc.setVideoToll(nonEzPassRate);
		 return icc;
	}
	//ICC IMPLEMENTATION
	private String getRate(RequestVO requestVO, String sqlQuery){
		Query query = HibernateUtil.currentSession().createSQLQuery(
				sqlQuery);
		String rate = null;
		query.setString(0, getTodayInd());
		query.setString(1, requestVO.getFacilityCode());
		query.setString(2, requestVO.getExitPointCode());
		query.setString(3, requestVO.getEntryPointCode());
		query.setString(4, requestVO.getVehicleClassCode());
		Iterator it = query.list().iterator();		
		if(it.hasNext())
		{
			BigDecimal temp = (BigDecimal)it.next();
			if(null != temp){
				NumberFormat format = NumberFormat.getInstance();
				format.setMaximumFractionDigits(2);
				format.setMinimumFractionDigits(2);
				rate = format.format(temp.doubleValue());
			}
		}
//		System.out.println("rate->"+rate);
		return rate;
	}
	//NONICC IMPLEMENTATION
	private NonICC getNonICCTollRateCalc(RequestVO requestVO)
			throws SQLException, NamingException {
		NonICC nonICCInfo = new NonICC();
		Query query = HibernateUtil.currentSession().createSQLQuery(
				selNonICCQuery);
		query.setString(0, requestVO.getFacilityCode());
		Iterator it = query.list().iterator();
		Object[] row;
		BigDecimal temp = null;
		NumberFormat format = NumberFormat.getInstance();
		format.setMaximumFractionDigits(2);
		format.setMinimumFractionDigits(2);
		if (it.hasNext()) {
			row = (Object[]) it.next();
			if (null != row[0]){
				temp = (BigDecimal)row[0];
				nonICCInfo.setCash(format.format(temp.doubleValue()));
			}
			if (null != row[1]){
				temp = (BigDecimal)row[1];
				nonICCInfo.setEzpass(format.format(temp.doubleValue()));
			}
		}
		if (it.hasNext()) {
			row = (Object[]) it.next();
			if (null != row[1]){
				temp = (BigDecimal)row[1];
				nonICCInfo.setCommuter(format.format(temp.doubleValue()));
			}
		}
		if (it.hasNext()) {
			row = (Object[]) it.next();
			if (null != row[1]){
				temp = (BigDecimal)row[1];
				nonICCInfo.setVideo(format.format(temp.doubleValue()));
			}
		}
		return nonICCInfo;
	}

	private String selNonICCQuery = "select T.FULL_FARE, T.DISCOUNT_FARE FROM   T_TOLL_PRICE_SCHEDULE P, T_TOLL_SCHEDULE T WHERE "
		+"  T.PRICE_SCHEDULE_ID = P.PRICE_SCHEDULE_ID"
		+"  AND    P.EFFECTIVE_DATE <= sysdate"
		+"  AND    P.EXPIRY_DATE >= sysdate"
		+"  AND    P.DAYS_IND = 'D'"
		+"  AND    P.AGENCY_ID = 8"
		+"  AND    P.START_TIME <= to_char(sysdate,'HH24:MI:SS')"
		+"  AND    P.END_TIME >= to_char(sysdate,'HH24:MI:SS')"
		+"  AND    T.EFFECTIVE_DATE <= sysdate"
		+"  AND    T.EXPIRY_DATE >= sysdate"
		+"  AND    T.PLAZA_ID = ?"
		+"  AND    T.ENTRY_PLAZA_ID = '0'"
		+"  AND    T.VEHICLE_CLASS = 2"
		+"  AND    (T.REVENUE_TYPE_ID = '1' OR T.REVENUE_TYPE_ID = '50')"
		+"  AND    (T.PLAN_TYPE_ID = '1' OR T.PLAN_TYPE_ID = '206' )"
		+"  ORDER BY T.REVENUE_TYPE_ID, T.PLAN_TYPE_ID";
	
	private String selEzpassPeakQuery = "select T.DISCOUNT_FARE	FROM   T_TOLL_PRICE_SCHEDULE P, T_TOLL_SCHEDULE T WHERE"  
		+" T.PRICE_SCHEDULE_ID = P.PRICE_SCHEDULE_ID"
		+" AND    P.EFFECTIVE_DATE <= sysdate"
		+" AND    P.EXPIRY_DATE >= sysdate"
		+" AND    P.DAYS_IND = ?"
		+" AND    P.AGENCY_ID = (select agency_id from t_tollrate_plaza where plaza_id=?)"
		+" AND    P.START_TIME <= '07:00:00'"
		+" AND    P.END_TIME >= '07:00:00'"
		+" AND    T.EFFECTIVE_DATE <= sysdate"
		+" AND    T.EXPIRY_DATE >= sysdate"
		+" AND    T.PLAZA_ID = ?"
		+" AND    T.ENTRY_PLAZA_ID = ?"
		+" AND    T.VEHICLE_CLASS = ?"
		+" AND    T.REVENUE_TYPE_ID = '1'"
		+" AND    T.PLAN_TYPE_ID = '1'"
		+" ORDER BY T.REVENUE_TYPE_ID, T.PLAN_TYPE_ID";
	
	private String selEzpassOffPeakQuery = "select T.DISCOUNT_FARE FROM   T_TOLL_PRICE_SCHEDULE P, T_TOLL_SCHEDULE T"
		+" WHERE "  
		+" T.PRICE_SCHEDULE_ID = P.PRICE_SCHEDULE_ID"
		+" AND    P.EFFECTIVE_DATE <= sysdate"
		+" AND    P.EXPIRY_DATE >= sysdate"
		+" AND    P.DAYS_IND = ?"
		+" AND    P.AGENCY_ID = (select agency_id from t_tollrate_plaza where plaza_id=?)"
		+" AND    P.START_TIME <= '10:00:00'"
		+" AND    P.END_TIME >= '10:00:00'"
		+" AND    T.EFFECTIVE_DATE <= sysdate"
		+" AND    T.EXPIRY_DATE >= sysdate"
		+" AND    T.PLAZA_ID = ?"
		+" AND    T.ENTRY_PLAZA_ID = ?"
		+" AND    T.VEHICLE_CLASS = ?"
		+" AND    T.REVENUE_TYPE_ID = '1'"
		+" AND    T.PLAN_TYPE_ID = '1'"
		+" ORDER BY T.REVENUE_TYPE_ID, T.PLAN_TYPE_ID";
	
	private String selEzpassOverNightQuery = "select T.DISCOUNT_FARE FROM   T_TOLL_PRICE_SCHEDULE P, T_TOLL_SCHEDULE T"
		+" WHERE  "
		+" T.PRICE_SCHEDULE_ID = P.PRICE_SCHEDULE_ID"
		+" AND    P.EFFECTIVE_DATE <= sysdate"
		+" AND    P.EXPIRY_DATE >= sysdate"
		+" AND    P.DAYS_IND = ?"
		+" AND    P.AGENCY_ID = (select agency_id from t_tollrate_plaza where plaza_id=?)"
		+" AND    P.START_TIME <= '01:00:00'"
		+" AND    P.END_TIME >= '01:00:00'"
		+" AND    T.EFFECTIVE_DATE <= sysdate"
		+" AND    T.EXPIRY_DATE >= sysdate"
		+" AND    T.PLAZA_ID = ?"
		+" AND    T.ENTRY_PLAZA_ID = ?"
		+" AND    T.VEHICLE_CLASS = ?"
		+" AND    T.REVENUE_TYPE_ID = '1'"
		+" AND    T.PLAN_TYPE_ID = '1'"
		+" ORDER BY T.REVENUE_TYPE_ID, T.PLAN_TYPE_ID";
	
	private String selNonEzpassPeakQuery = "select T.DISCOUNT_FARE FROM   T_TOLL_PRICE_SCHEDULE P, T_TOLL_SCHEDULE T"
		+" WHERE  "
		+" T.PRICE_SCHEDULE_ID = P.PRICE_SCHEDULE_ID"
		+" AND    P.EFFECTIVE_DATE <= sysdate"
		+" AND    P.EXPIRY_DATE >= sysdate"
		+" AND    P.DAYS_IND = ?"
		+" AND    P.AGENCY_ID = (select agency_id from t_tollrate_plaza where plaza_id=?)"
		+" AND    P.START_TIME <= '07:00:00'"
		+" AND    P.END_TIME >= '07:00:00'"
		+" AND    T.EFFECTIVE_DATE <= sysdate"
		+" AND    T.EXPIRY_DATE >= sysdate"
		+" AND    T.PLAZA_ID = ?"
		+" AND    T.ENTRY_PLAZA_ID = ?"
		+" AND    T.VEHICLE_CLASS = ?"
		+" AND    T.REVENUE_TYPE_ID = '2'"
		+" AND    T.PLAN_TYPE_ID = '1'"
		+" ORDER BY T.REVENUE_TYPE_ID, T.PLAN_TYPE_ID";
	
	private String selNonEzpassOffPeakQuery = "select T.DISCOUNT_FARE FROM   T_TOLL_PRICE_SCHEDULE P, T_TOLL_SCHEDULE T"
		+" WHERE  "
		+" T.PRICE_SCHEDULE_ID = P.PRICE_SCHEDULE_ID"
		+" AND    P.EFFECTIVE_DATE <= sysdate"
		+" AND    P.EXPIRY_DATE >= sysdate"
		+" AND    P.DAYS_IND = ?"
		+" AND    P.AGENCY_ID = (select agency_id from t_tollrate_plaza where plaza_id=?)"
		+" AND    P.START_TIME <= '10:00:00'"
		+" AND    P.END_TIME >= '10:00:00'"
		+" AND    T.EFFECTIVE_DATE <= sysdate"
		+" AND    T.EXPIRY_DATE >= sysdate"
		+" AND    T.PLAZA_ID = ?"
		+" AND    T.ENTRY_PLAZA_ID = ?"
		+" AND    T.VEHICLE_CLASS = ?"
		+" AND    T.REVENUE_TYPE_ID = '2'"
		+" AND    T.PLAN_TYPE_ID = '1'"
		+" ORDER BY T.REVENUE_TYPE_ID, T.PLAN_TYPE_ID";
	
	private String selNonEzpassOvernightQuery = "select T.DISCOUNT_FARE FROM   T_TOLL_PRICE_SCHEDULE P, T_TOLL_SCHEDULE T"
		+" WHERE  "
		+" T.PRICE_SCHEDULE_ID = P.PRICE_SCHEDULE_ID"
		+" AND    P.EFFECTIVE_DATE <= sysdate"
		+" AND    P.EXPIRY_DATE >= sysdate"
		+" AND    P.DAYS_IND = ?"
		+" AND    P.AGENCY_ID = (select agency_id from t_tollrate_plaza where plaza_id=?)"
		+" AND    P.START_TIME <= '01:00:00'"
		+" AND    P.END_TIME >= '01:00:00'"
		+" AND    T.EFFECTIVE_DATE <= sysdate"
		+" AND    T.EXPIRY_DATE >= sysdate"
		+" AND    T.PLAZA_ID = (?)"
		+" AND    T.ENTRY_PLAZA_ID = (?)"
		+" AND    T.VEHICLE_CLASS = ?"
		+" AND    T.REVENUE_TYPE_ID = '2'"
		+" AND    T.PLAN_TYPE_ID = '1'"
		+" ORDER BY T.REVENUE_TYPE_ID, T.PLAN_TYPE_ID";
	
	private static Map<String, String> DAY_IND_MAP = new HashMap<String, String>();
	static{
		DAY_IND_MAP.put("2", "1");
		DAY_IND_MAP.put("3", "2");
		DAY_IND_MAP.put("4", "3");
		DAY_IND_MAP.put("5", "4");
		DAY_IND_MAP.put("6", "5");
		DAY_IND_MAP.put("7", "6");
		DAY_IND_MAP.put("1", "7");
	}
	
	private static String getTodayInd(){
		Calendar cal = Calendar.getInstance();
		String dayOfWeek = DAY_IND_MAP.get(Integer.toString(cal.get(Calendar.DAY_OF_WEEK)));
//		System.out.println("dayOfWeek->"+dayOfWeek);
		return dayOfWeek;
	}
}
