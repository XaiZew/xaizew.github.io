function nav_open_close(burger_press = false) {
    if (window.innerWidth > 768) return;
    let nav = document.getElementsByTagName("nav")[0];
    let nav_btm = document.getElementsByTagName("nav_btm")[0];
    let burger = document.getElementById("nav_burger");
    
    if (getComputedStyle(nav_btm).getPropertyValue('display') == "none" && burger_press == true) {
        burger.classList.add('burger_open');
        nav_btm.style = "display: flex;";
        nav.style = "height: 100vh;"
    }
    else {
        burger.classList.remove('burger_open');
        nav_btm.style = "display: none;";
        nav.style = "height: 80px;";
    }
}

function getHeight()
{
  var body = document.body;
  var html = document.documentElement; 
  var bodyH = Math.max(body.scrollHeight, body.offsetHeight, body.getBoundingClientRect().height, html.clientHeight, html.scrollHeight, html.offsetHeight);
  return bodyH;
}

var skillsOffsetY;

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
    scrollFunction();
});

var navtoggleThreshold = 120;

function scrollFunction() {

    // navbar dark mode
    if (window.scrollY > navtoggleThreshold && oldScrollY < navtoggleThreshold) {
        dark_mode_nav();
    }
    else if (window.scrollY < navtoggleThreshold && oldScrollY > navtoggleThreshold) {
        dark_mode_nav();
    }

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
    if (window.scrollY < skillsOffsetY - 800 && oldScrollY > skillsOffsetY - 800 || window.scrollY >= skillsOffsetY + 400 && oldScrollY < skillsOffsetY + 400) {
        console.log("hidden skills---------------------")
        for (i = 0; i < skillsImgs.length; i++) {
            skillsImgs[i].style.display = "none";
        }
    }


    timelineText = document.getElementsByClassName("timeline_text");
    if ( (window.scrollY >= timelineOffsetY - 700 && oldScrollY < timelineOffsetY - 700) || (window.scrollY <= (timelineOffsetY + 400) && oldScrollY > timelineOffsetY + 400) ) {
        console.log("scrolled timeline");

        for (i = 0; i < timelineText.length; i++) {
            timelineText[i].style.display = "inline";
        }
        for (i = 0; i < timeline_sections.length; i++) {
            var translateXVal = 96;
            if (window.innerWidth >= 768) translateXVal = 189;
            timeline_sections[i].style = "transform: translateX("+translateXVal+"px)";
            if (i == 1)
            timeline_sections[i].style = "transform: translateX("+-translateXVal+"px)";
        }
    }
    if (window.scrollY <= timelineOffsetY - 800 && oldScrollY > timelineOffsetY - 800 || window.scrollY >= timelineOffsetY + 900 && oldScrollY < timelineOffsetY + 900) {
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
}

function getOffset(el) {
    var bodyRect = document.body.getBoundingClientRect(),
    elemRect     = el.getBoundingClientRect(),
    offset       = elemRect.top - bodyRect.top;
    return offset;
}

function testimonial_slides() {
    let myRequest = new Request("./testimonial_json.json");
    let cardCount = 0;
    
    fetch(myRequest)
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            let testimonial_slides = document.getElementById("testimonial_slides");
            let testimonial_btns = document.getElementById("testimonial_btns");
            let cardPerSlide = 2;
            if (innerWidth < 1024) cardPerSlide = 1;
            for (y = 0; y < Math.ceil(data.length / cardPerSlide); y++) { // foreach slide
                let testimonial_btn = testimonial_btns.appendChild(document.createElement("div"));
                testimonial_btn.classList.add("testimonial_dot");
                testimonial_btn.setAttribute("onclick", "testimonial_btn("+y+")");
                if (y == 0) testimonial_btn.classList.add("testimonial_dot_active");
                let testimonial_slide = testimonial_slides.appendChild(document.createElement("div"));
                testimonial_slide.classList.add("testimonial_slide")
                if (y == 0) testimonial_slide.classList.add("testimonial_slide_active");
                for (x = 0; x < cardPerSlide; x++) { // foreach card per slide
                        if (cardCount >= data.length) return
                        let testimonial_card = testimonial_slide.appendChild(document.createElement("div"));
                        testimonial_card.classList.add("testimonial_card");
                        let testimonial_card_top = testimonial_card.appendChild(document.createElement("div"))
                        testimonial_card_top.classList.add("testimonial_card_top");
                        let testimonial_card_top_img = testimonial_card_top.appendChild(document.createElement("img"));
                        testimonial_card_top_img.setAttribute("src", data[cardCount].img);
                        let testimonial_card_top_div = testimonial_card_top.appendChild(document.createElement("div"));
                        let testimonial_card_title = testimonial_card_top_div.appendChild(document.createElement("h1"));
                        testimonial_card_title.innerHTML = data[cardCount].title
                        testimonial_card_subtitle = testimonial_card_top_div.appendChild(document.createElement("h2"));
                        testimonial_card_subtitle.innerHTML = data[cardCount].subtitle;
                        testimonial_card_text = testimonial_card.appendChild(document.createElement("p"));
                        testimonial_card_text.innerHTML = data[cardCount].text;
                        cardCount++;
                }
            }

        })
}

function testimonial_btn(index) {
    let testimonial_slide_array = document.getElementsByClassName("testimonial_slide");
    let testimonial_dots = document.getElementsByClassName("testimonial_dot");
    for (x = 0; x < testimonial_slide_array.length; x++) {
        testimonial_slide_array[x].classList.remove("testimonial_slide_active");
        testimonial_dots[x].classList.remove("testimonial_dot_active");
        if (x == index) {
            testimonial_slide_array[x].classList.add("testimonial_slide_active");
            testimonial_dots[x].classList.add("testimonial_dot_active");
        }
    }
}

function dark_mode_nav() {
    let nav = document.getElementsByClassName("nav_holder")[0];
    let nav_burger_span = document.getElementById("nav_burger").getElementsByTagName("span");
    console.log(oldScrollY);
    if (oldScrollY <= navtoggleThreshold) {
        nav.classList.add("nav_scroll_active");
        for (i = 0; i < nav_burger_span.length; i++) {
            nav_burger_span[i].style = "background: #FFFFFF";
        }
    }
    else {
        nav.classList.remove("nav_scroll_active");
        for (i = 0; i < nav_burger_span.length; i++) {
            nav_burger_span[i].style = "background: #2C2C2CFF";
        }
    }
}

function nav_a_active_func(el, tX = 0, w = 69) {
    nav_btm_div = document.getElementsByTagName("nav_btm")[0].getElementsByTagName("div")[0];
    nav_btm_links = nav_btm_div.getElementsByTagName("a");
    nav_active_div = document.getElementsByClassName("nav_active_div")[0];
    for (i = 0; i < nav_btm_links.length; i++) {
        nav_btm_links[i].style = "color: black;";
    }
    el.style = "color: white;";
    var tvar = (w - el.offsetWidth) / 2;
    if (window.innerWidth <= 768) {
        nav_active_div.style = "top: "+(el.offsetTop - 4)+"px; width: "+w+"px;";
    }
    else {
        console.log(tvar);
        if (tvar > 0)
            nav_active_div.style = "left: "+(el.offsetLeft - tvar)+"px; width: "+w+"px;";
        else
            nav_active_div.style = "left: "+(el.offsetLeft)+"px; width: "+w+"px;";
    }
}

addEventListener("load", (event) => {
    testimonial_slides();
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

    scrollFunction();
    setTimeout(function(){
        document.getElementById("gradient_body").style = "height: "+getHeight()+"px;";
        console.log(document.body.scrollHeight);
    }, 200);
    if (window.innerWidth <= 780)
        setInterval(infinity_animate_object);
});

var iao_timer = 0;
var iao_x = 0;
var iao_y = 0;

var floating_x = 1;
var floating_y = 1;

function infinity_animate_object() {
    iao_timer++;
    console.log(iao_timer);
    iao_x = Math.cos(iao_timer / 1500);
    iao_y = Math.sin(2*(iao_timer / 1500)) / 2;
    document.querySelectorAll('.floating_object').forEach(function(obj) {
        floating_x = (iao_x * 50 * obj.getAttribute('data-strength'));
        floating_y = (iao_y * 50 * obj.getAttribute('data-strength'));
        obj.style.transform = "translateX(" + floating_x + "px) translateY(" + floating_y + "px) rotate(" + 0 + "deg)";
    });
}

document.addEventListener("mousemove", floating_function);

function floating_function(e) {
    console.log("mousemoved");
    document.querySelectorAll('.floating_object').forEach(function(obj) {
        let strength = obj.getAttribute('data-strength');

        let a = obj.offsetLeft - e.clientX;
        let b = obj.offsetTop - e.clientY;

        // let x = (e.clientX * strength / 150) / Math.sqrt(a*a + b*b);
        let floating_x = (Math.sqrt(a*a + b*b) / strength / 10);
        
        // if (obj.src == "http://127.0.0.1:5500/images/hero_triangles/1.svg")
        //     console.log(Math.sqrt(a*a + b*b) / strength);
        
        let floating_y = (e.clientY * strength / 150);
        let r = (e.clientX * strength / 150) + (e.clientY * strength / 150);

        obj.style.transform = "translateX(" + floating_x + "px) translateY(" + floating_y + "px) rotate(" + 0 + "deg)";
    });
}