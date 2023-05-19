function nav_func(el) {
    let nav = document.getElementsByTagName("nav")[0];
    let nav_btm = document.getElementsByTagName("nav_btm")[0];
    
    if (nav_btm.style.display == "none") {
        el.classList.add('burger_open');
        nav_btm.style = "display: flex;";
        nav.style = "height: 100vh;"
    }
    else {
        el.classList.remove('burger_open');
        nav_btm.style = "display: none;";
        nav.style = "height: 80px;";
    }
}

var skillsOffsetY;

addEventListener("load", (event) => {

    skillsOffsetY = getOffset(document.getElementsByTagName("skills")[0]) - 50;
    timelineOffsetY = getOffset(document.getElementsByTagName("timeline")[0]) - 50
    timeline_sections = document.getElementsByClassName("timeline_section");
    for (i = 0; i < timeline_sections.length; i++) {
        if (timeline_sections[i] == document.getElementsByClassName("timeline_section_left")[0])
            timeline_sections[i] = document.getElementsByClassName("timeline_section_left")[0];
    }

    var graphs = document.getElementsByClassName("graph");

    for (i = 0; i < graphs.length; i++) {
    
        var options = {
            percent:  graphs[i].getAttribute('data-percent') || 25,
            size: graphs[i].getAttribute('data-size') || 220,
            lineWidth: graphs[i].getAttribute('data-line') || 15,
            rotate: graphs[i].getAttribute('data-rotate') || 0,
            length: graphs[i].getAttribute('data-length') || 0
        }
        var canvas = document.createElement('canvas');
        var span = document.createElement('span');
        span.textContent = options.length + ' Months';
            
        if (typeof(G_vmlCanvasManager) !== 'undefined') {
            G_vmlCanvasManager.initElement(canvas);
        }
        var ctx = canvas.getContext('2d');
        canvas.width = canvas.height = options.size;
    
        span = graphs[i].appendChild(span);
        graphs[i].appendChild(canvas);
         
        ctx.translate(options.size / 2, options.size / 2); // change center
        ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg
    
        var radius = (options.size - options.lineWidth) / 2;
        // drawCircle('#efefef', options.lineWidth, 100 / 100, radius, ctx);
        // drawCircle('#555555', options.lineWidth, options.percent / 100, radius, ctx);
        
        percent = Math.min(Math.max(0, 1), 1);
		ctx.beginPath();
		ctx.arc(0, 0, radius, 0, Math.PI * 2 * 1, false);
		ctx.strokeStyle = '#0000000';
        ctx.lineCap = 'round'; // butt, round or square
		ctx.lineWidth = options.lineWidth
		ctx.stroke();

        percent = Math.min(Math.max(0, options.percent / 100), 1);
		ctx.beginPath();
		ctx.arc(0, 0, radius, 0, Math.PI * 2 * options.percent / 100, false);
		ctx.strokeStyle = '#00A3FF';
        ctx.lineCap = 'square'; // butt, round or square
		ctx.lineWidth = options.lineWidth
		ctx.stroke();
    }

});

var drawCircle = function(color, lineWidth, percent, ctx, radius) {
		percent = Math.min(Math.max(0, percent), 1);
		ctx.beginPath();
		ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
		ctx.strokeStyle = color;
        ctx.lineCap = 'round'; // butt, round or square
		ctx.lineWidth = lineWidth
		ctx.stroke();
};

var oldScrollY;
var skillsImgs = [];

var skillsScroll = 550;

var timelineOffsetY;
var timelineText = [];
var timeline_sections = [];

addEventListener("scroll", (event) => {

    if ( (window.scrollY >= skillsOffsetY - skillsScroll && oldScrollY < (skillsOffsetY - skillsScroll)) || (window.scrollY <= (skillsOffsetY + 300) && (oldScrollY) > (skillsOffsetY + 300)) ) {
        console.log("scrolled eng");
        var skillsCards = document.getElementsByClassName("skills_card");
        for (i = 0; i < skillsCards.length; i++) {
            skillsImgs.push(skillsCards[i].getElementsByTagName("img")[0]);
        }

        for (i = 0; i < skillsImgs.length; i++) {
            skillsImgs[i].style.display = "inline";
        }
    }
    if (window.scrollY < skillsOffsetY - 800 || window.scrollY > skillsOffsetY + 400) {
        console.log("hidden")
        for (i = 0; i < skillsImgs.length; i++) {
            skillsImgs[i].style.display = "none";
        }
    }


    timelineText = document.getElementsByClassName("timeline_text");
    if ( (window.scrollY >= timelineOffsetY - 700 && oldScrollY < timelineOffsetY - 700) || (window.scrollY <= (timelineOffsetY + 400) && oldScrollY > window.scrollY) ) {
        console.log("scrolled timeline");

        for (i = 0; i < timelineText.length; i++) {
            timelineText[i].style.display = "inline";
        }
        for (i = 0; i < timeline_sections.length; i++) {
            var translateXVal = 120;
            if (window.innerWidth >= 768) translateXVal = 189;
            timeline_sections[i].style = "transform: translateX("+translateXVal+"px)";
            if (i == 1)
            timeline_sections[i].style = "transform: translateX("+-translateXVal+"px)";
        }
    }
    if (window.scrollY < timelineOffsetY - 800 || window.scrollY > timelineOffsetY + 900) {
        console.log("hidden timeline")
        for (i = 0; i < timelineText.length; i++) {
            timelineText[i].style.display = "none";
        }
        var translateXVal = 16;
        if (window.innerWidth > 768) translateXVal = 44;
        for (i = 0; i < timeline_sections.length; i++) {
            timeline_sections[i].style = "transform: translateX("+translateXVal+"px)";
            if (i == 1)
                timeline_sections[i].style = "transform: translateX("+-translateXVal+"px)";
        }
    }

    oldScrollY = window.scrollY;

});

function getOffset(el) {
    var bodyRect = document.body.getBoundingClientRect(),
    elemRect     = el.getBoundingClientRect(),
    offset       = elemRect.top - bodyRect.top;
    return offset;
}