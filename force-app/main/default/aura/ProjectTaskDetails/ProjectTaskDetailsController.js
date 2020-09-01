({
	doInit : function(component, event, helper) {
        console.log('===navigate in 2==',component.get('v.expense'));
        var list1 =[];
                list1= component.get("v.expense");
                console.log('=======list1======',list1[0].Project__c);
        component.set('v.projId', list1[0].Project__c);
        console.log('id=',component.get('v.projId'));
		//helper.doInitHelper(component, event);
	},
})