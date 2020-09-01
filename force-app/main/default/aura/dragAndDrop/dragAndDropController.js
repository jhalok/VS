({
    doInit: function(component, event, helper) {
        console.log('projectid--',component.get('v.proId'));
        var action = component.get("c.getKanbanWrap");
        action.setParams({
            "objName":component.get("v.objName"),
            "objFields":component.get("v.objFields"),
            "kanbanField":component.get("v.kanbanPicklistField"),
            "projectId":component.get("v.proId")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                console.dir(response.getReturnValue());
                console.log('=========',response.getReturnValue());
                component.set("v.kanbanData", response.getReturnValue());
                console.log('=========',component.get('v.kanbanData'));
            }
        });
        $A.enqueueAction(action);
    },
    doView: function(component, event, helper) {
        var editRecordEvent = $A.get("e.force:navigateToSObject");
        editRecordEvent.setParams({
            "recordId": event.target.id
        });
        editRecordEvent.fire();
    },
    allowDrop: function(component, event, helper) {
        event.preventDefault();
    },
    
    drag: function (component, event, helper) {
        event.dataTransfer.setData("text", event.target.id);
    },
    
    drop: function (component, event, helper) {
        event.preventDefault();
        var data = event.dataTransfer.getData("text");
        var tar = event.target;
        while(tar.tagName != 'ul' && tar.tagName != 'UL')
            tar = tar.parentElement;
        tar.appendChild(document.getElementById(data));
        console.log('aaaaaaaaaaaaa   :   ' + tar.getAttribute('data-Pick-Val'));
        document.getElementById(data).style.backgroundColor = "#ffb75d";
        helper.updatePickVal(component,data,component.get("v.kanbanPicklistField"),tar.getAttribute('data-Pick-Val'));
    }
})