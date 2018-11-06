/**
 * TollRateCalcSOAPImpl.java
 *
 * This file was auto-generated from WSDL
 * by the IBM Web services WSDL2Java emitter.
 * cf90721.10 v53107135043
 */

package com.acs.ts.vector.ws.service;

import java.util.List;

import javax.ejb.CreateException;
import javax.naming.NamingException;

import com.acs.ts.vector.ws.tollrate.common.vo.RequestVO;
import com.acs.ts.vector.ws.tollrate.common.vo.ResponseVO;
import com.acs.ts.vector.ws.tollrate.util.jndi.ServiceLocator;

import ejbs.com.acs.ts.vector.ws.tollrate.TollRateCalcLocal;
import ejbs.com.acs.ts.vector.ws.tollrate.TollRateCalcLocalHome;

public class TollRateCalcSOAPImpl implements com.acs.ts.vector.ws.service.TollRateCalc_PortType{
	
    public com.acs.ts.vector.ws.service.FacilityResponse getFacilities(com.acs.ts.vector.ws.service.FacilityRequest req) throws java.rmi.RemoteException {
    	RequestVO requestVO = new RequestVO();
    	requestVO.setAgency(req.getAgency());
    	List facilityList = null;
		try {
			facilityList = getCCOutBoundService().getFacilities(requestVO);
//			System.out.println("**********>>"+facilityList.size());
		} catch (Exception e) {
			e.printStackTrace();
		}
    	FacilityResponse response = new FacilityResponse();
    	FacilityInfo[] info = null;
    	if(null != facilityList && facilityList.size()>0){
    		info = new FacilityInfo[facilityList.size()];
    		for(int i=0,l=facilityList.size();i<l;i++){
    			com.acs.ts.vector.ws.tollrate.common.vo.FacilityInfo confVO = (com.acs.ts.vector.ws.tollrate.common.vo.FacilityInfo) facilityList.get(i);
        		info[i] = new FacilityInfo();
        		info[i].setFacilityCode(confVO.getFacilityCode());
        		info[i].setFacilityName(confVO.getFacilityName());
        		info[i].setIsICC(confVO.getIsICC());
    		}
    	}
    	 
    	response.setFacilities(info);
    	return response;
    }

    public com.acs.ts.vector.ws.service.VehicleClassResponse getVehicleClass(com.acs.ts.vector.ws.service.VehicleClassRequest req) throws java.rmi.RemoteException {
    	RequestVO requestVO = new RequestVO();
    	requestVO.setAgency(req.getAgency());
    	List vehicleClass = null;
		try {
			vehicleClass = getCCOutBoundService().getVehicleClassInfo(requestVO);
//			System.out.println("**********>>"+vehicleClass.size());
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		VehicleClassResponse response = new VehicleClassResponse();
		VehicleClassInfo[] info = null;
    	if(null != vehicleClass && vehicleClass.size()>0){
    		info = new VehicleClassInfo[vehicleClass.size()];
    		for(int i=0,l=vehicleClass.size();i<l;i++){
    			com.acs.ts.vector.ws.tollrate.common.vo.VehicleClassInfo confVO = (com.acs.ts.vector.ws.tollrate.common.vo.VehicleClassInfo) vehicleClass.get(i);
        		info[i] = new VehicleClassInfo();
        		info[i].setVehicleClassCode(confVO.getVehicleClassCode());
        		info[i].setVehicleClassDesc(confVO.getVehicleClassDesc());
    		}
    	}
    	response.setVehicleClass(info);
    	return response;
    }

    public com.acs.ts.vector.ws.service.EntryPointsResponse getEntryPoints(com.acs.ts.vector.ws.service.EntryPointsRequest req) throws java.rmi.RemoteException {
    	RequestVO requestVO = new RequestVO();
    	requestVO.setFacilityCode(req.getFacilityCode());
    	List facilityList = null;
		try {
			facilityList = getCCOutBoundService().getEntryPoints(requestVO);
		} catch (Exception e) {
			e.printStackTrace();
		}
		EntryPointsResponse response = new EntryPointsResponse();
    	FacilityInfo[] info = null;
    	if(null != facilityList && facilityList.size()>0){
    		info = new FacilityInfo[facilityList.size()];
    		for(int i=0,l=facilityList.size();i<l;i++){
    			com.acs.ts.vector.ws.tollrate.common.vo.FacilityInfo confVO = (com.acs.ts.vector.ws.tollrate.common.vo.FacilityInfo) facilityList.get(i);
        		info[i] = new FacilityInfo();
        		info[i].setFacilityCode(confVO.getFacilityCode());
        		info[i].setFacilityName(confVO.getFacilityName());
    		}
    	}
    	response.setFacilities(info);
    	return response;
    }

    public com.acs.ts.vector.ws.service.ExitPointsResponse getExitPoints(com.acs.ts.vector.ws.service.ExitPointsRequest req) throws java.rmi.RemoteException {
    	RequestVO requestVO = new RequestVO();
    	requestVO.setFacilityCode(req.getFacilityCode());
    	requestVO.setEntryPointCode(req.getEntryPointCode());
    	List facilityList = null;
		try {
			facilityList = getCCOutBoundService().getExitPoints(requestVO);
		} catch (Exception e) {
			e.printStackTrace();
		}
		ExitPointsResponse response = new ExitPointsResponse();
    	FacilityInfo[] info = null;
    	if(null != facilityList && facilityList.size()>0){
    		info = new FacilityInfo[facilityList.size()];
    		for(int i=0,l=facilityList.size();i<l;i++){
    			com.acs.ts.vector.ws.tollrate.common.vo.FacilityInfo confVO = (com.acs.ts.vector.ws.tollrate.common.vo.FacilityInfo) facilityList.get(i);
        		info[i] = new FacilityInfo();
        		info[i].setFacilityCode(confVO.getFacilityCode());
        		info[i].setFacilityName(confVO.getFacilityName());
    		}
    	}
    	response.setFacilities(info);
    	return response;
    }

    public com.acs.ts.vector.ws.service.CalcTollRateResponse calcTollRate(com.acs.ts.vector.ws.service.CalcTollRateRequest req) throws java.rmi.RemoteException {
    	RequestVO requestVO = new RequestVO();
    	requestVO.setFacilityCode(req.getFacilityCode());
    	requestVO.setVehicleClassCode(req.getVehicleClassCode());
    	requestVO.setEntryPointCode(req.getEntryPointCode());
    	requestVO.setExitPointCode(req.getExitPointCode());
    	ResponseVO responseVO = null;
		try {
			responseVO = getCCOutBoundService().getTollRateCalc(requestVO);
		} catch (Exception e) {
			e.printStackTrace();
		}
		CalcTollRateResponse response = new CalcTollRateResponse();
		ICC icc = new ICC();
		NonICC nonIcc = new NonICC();
		if(null != responseVO && null != responseVO.getNonicc()){
			nonIcc.setCash(responseVO.getNonicc().getCash());
			nonIcc.setCommuter(responseVO.getNonicc().getCommuter());
			nonIcc.setEzpass(responseVO.getNonicc().getEzpass());
			nonIcc.setVideo(responseVO.getNonicc().getVideo());
		}
		EZPassRate rate = new EZPassRate();
		VideoTollRate video = new VideoTollRate();
		if(null != responseVO && null != responseVO.getIcc()){
			if(null != responseVO.getIcc().getEzpass()){
				rate.setOffPeak(responseVO.getIcc().getEzpass().getOffPeak());
				rate.setPeak(responseVO.getIcc().getEzpass().getPeak());
				rate.setOvernight(responseVO.getIcc().getEzpass().getOvernight());
				icc.setEzpass(rate);
			}
			if(null != responseVO.getIcc().getVideoToll()){
				video.setOffPeak(responseVO.getIcc().getVideoToll().getOffPeak());
				video.setPeak(responseVO.getIcc().getVideoToll().getPeak());
				video.setOvernight(responseVO.getIcc().getVideoToll().getOvernight());
				icc.setVideoToll(video);
			}
		}
		response.setIcc(icc);
		response.setNonicc(nonIcc);
    	return response;
    }

    private TollRateCalcLocal getCCOutBoundService() {
    	TollRateCalcLocal TollRateCalcLocal = null;
		ServiceLocator serviceLocator = null;
		TollRateCalcLocalHome TollRateCalcLocalHome = null;
		try {
			serviceLocator = ServiceLocator.getInstance();
			TollRateCalcLocalHome = (TollRateCalcLocalHome) serviceLocator
					.getLocalHome("ejb/TollRateCalc");
		
		} catch (NamingException namingExp) {
			namingExp.printStackTrace();
		}
		try {
			TollRateCalcLocal = TollRateCalcLocalHome.create();
		} catch (CreateException crEx) {
			crEx.printStackTrace();
		}
		return TollRateCalcLocal;
	}
}
