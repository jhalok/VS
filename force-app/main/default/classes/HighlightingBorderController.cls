public class HighlightingBorderController {
    
    @AuraEnabled
    public static String ldRating(String leadId){
        return [select id,rating from lead where id =: leadId].rating;
    }
}