package com.xerox.ts.vector.cm;

import java.util.Map;

import javax.el.ELContext;
import javax.faces.FacesException;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;

import com.xerox.ts.vector.cm.managedbeans.CMPageBean;

@FacesConverter(value="editableFileConverter")
public class EditableFileConverter implements Converter{

	@Override
	public Object getAsObject(FacesContext arg0, UIComponent arg1, String value) {
		// TODO Auto-generated method stub
		final String beanName = AppConstants.CM_PAGE_BEAN;  
        FacesContext fc = FacesContext.getCurrentInstance();  
        Object bean;  
  
        try {  
            ELContext elContext = fc.getELContext();  
            bean = elContext.getELResolver().getValue(elContext, null, beanName);  
        } catch (RuntimeException e) {  
            throw new FacesException(e.getMessage(), e);  
        }  
        EditablePage result = null;  
        if (bean != null) {  
        	Map<String, EditablePage> pagesMap = ((CMPageBean)bean).getEditablePages();  
            for (String str:pagesMap.keySet()) {  
            	result = pagesMap.get(str);  
                if (result.getFileName().equals(value)) {  
                    return result;
                }  
            }  
        }  
       
        return null; 
	}

	@Override
	public String getAsString(FacesContext arg0, UIComponent arg1, Object arg2) {
		// TODO Auto-generated method stub
		EditablePage page = (EditablePage) arg2;
		return page.getFileName() ;
	}

}
