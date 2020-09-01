({
	doInit : function(component, event, helper) {
		helper.doInitHelper(component, event);
	},


     navigate : function(component, event, helper) {
         console.log('===navigate==');

          helper.navigateForTask(component, event);
         
       
         
    },

    
    handleChangeProject : function(component, event, helper) {
         console.log('===selectProject==@@');
        var selectProject = component.find("selectproject").get("v.value");
        component.set('v.selectProjectId', selectProject);
        console.log('===selectProject=='+selectProject);
        var selectProject1 = component.get("v.selectProjectId");
        console.log('===selectProject@@=='+selectProject1);
        
        
    }
})