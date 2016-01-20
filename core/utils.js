/**
 * Created by Roberto on 19/01/16.
 */
Array.prototype.equalsPositional = function(b){
    if (this === b) return true;
    if ( this.length != b.length) return false;

    for(var i = 0; i < this.length; i++){
        if(this[i] != b[i] ) return false;
    }
    return true;
};

Array.prototype.clone = function() {
    return this.slice(0);
};