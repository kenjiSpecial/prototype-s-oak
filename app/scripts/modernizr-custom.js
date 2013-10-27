var UA = navigator.userAgent;

Modernizr.addTest({

    mobile         : function() { return /iPhone|iPad|iPod|Android|windows phone|iemobile|\bsilk\b/i.test(UA)},
    phone          : function() { return /i(phone|pod)|android.+mobile|windows phone|iemobile/i.test(UA)},
    tablet         : function() { return /ipad|android(?!.+mobile)|\bsilk\b/i.test(UA)},
    ie9            : function() { return /msie 9/i.test(UA)},
    safari5        : function() { return /version\/5\..+ safari/i.test(UA)},
    ios            : function() { return /i(phone|pod|pad)/i.test(UA)},
    safari         : function() { return /safari/i.test(UA) },
    ipad           : function() { return /iPad/i.test(UA)},
    webkit         : function() { return /webkit/i.test(UA)},
    firefox        : function() { return /firefox/i.test(UA) },
    chrome         : function() { return /chrome/i.test(UA) },
    android        : function() { return /Android/i.test(UA)},
    androidbrowser : function() { return /android(?!.+chrome)/i.test(UA)},
    androidchrome  : function() { return /android.+chrome/i.test(UA)},
    standalone     : function() { return !!navigator.standalone},
});

if(Modernizr.safari && Modernizr.chrome) Modernizr.safari = false;