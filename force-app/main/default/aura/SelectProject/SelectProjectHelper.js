({
    doInitHelper : function(component, event) {
        var action = component.get("c.getProjectList");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                for(let i of response.getReturnValue()) {
                    console.log('----->', i);
                }
                component.set("v.projectList", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    } ,
    
  
    navigateForTask : function(component, event) {
         
        var action1 = component.get("v.selectProjectId");
        console.log('----->action1', action1);
        var action = component.get("c.getTask");
        action.setParams({ projectId : action1 });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('----->state', state);
            if (state === "SUCCESS") {
                for(let i of response.getReturnValue()) {
                    console.log('----->', i);
                }
                console.log('----->response.getReturnValue()', response.getReturnValue());
                
                component.set("v.expense1", response.getReturnValue());
                var taskLst = component.get("v.expense1");
                console.log('==component.set("v.expense"=='+taskLst);
                var evt = $A.get("e.c:NavigateToC2");
                evt.setParams({ "expense": taskLst});
      			evt.fire();
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
        
        
    } 
 })