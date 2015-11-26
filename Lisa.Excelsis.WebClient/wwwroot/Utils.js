export class Utils {

    doubleDigit(digit){
        return  (digit < 10 && digit.toString().length < 2) ? "0" + digit : digit;
    }

    formatDateTime(date, time){

        if(date.indexOf("/") > 1)
        {
            var splitDate = date.split("/");
        }
        else if(date.indexOf("-") > 1)
        {
            var splitDate = date.split("-");
        }
        else
        {
            alert("Gelieve de datum als 15-10-2015 of 15/10/2015 te noteren.")
        }
        
        var splitTime = time.split(":");

        return splitDate[2] + "-" + this.doubleDigit(splitDate[1]) + 
                              "-" + this.doubleDigit(splitDate[0]) +
                              "T" + this.doubleDigit(splitTime[0]) +
                              ":" + this.doubleDigit(splitTime[1]) + ":00Z";
    }

    formatDate(date){
        var d = new Date(date);
        return d.getDate() + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
    }

    formatTime(time){
        var d = new Date(time);
        return this.doubleDigit((d.getHours()-1)) + ":" + this.doubleDigit(d.getMinutes());
    }

    spaceToDash(url){
        return url.toString().trim().replace(/\s+/g, '-');
    }
    dashToSpace(string){
        return string.toString().replace(/-/g, ' ');
    }
}