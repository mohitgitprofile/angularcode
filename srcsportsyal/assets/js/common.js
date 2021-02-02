
function headerbg(){
	var scroll = $(window).scrollTop();  
    if (scroll >= 100) {
        $("header").addClass("header-bg");
    } else {
    	$("header").removeClass("header-bg");
    }
}

$(window).scroll(function() {    
    headerbg();
});

$(function(){

	// Menu Script
	$('.btn-mobmenu').on('click', function(){
		$('.menu').toggleClass('mobmenushow');
		$(this).children('.fa').toggleClass('fa-bars fa-times');
	});
	$('.plus-minus').on('click', function(){
		$(this).next().slideToggle();
		$(this).toggleClass('fa-minus fa-plus');
	});
	//End Menu Script

	// $('#otpModal').modal('show');
});




$(document).ready(function(){
	$(document).on("click",".toggle_menu",function(){
		$(".menu_box_list").toggleClass("show"); 
	 });
	
	
	$(document).on("click",".head-user-img",function(){
		$(".head-drop-down").toggleClass("show"); 
	 });
	 
	 $(document).on("click",".product_size .btn",function(){
		$(this).toggleClass("active").siblings().removeClass("active"); 
	 });
	
	$(document).on("click",".appoint_btn",function(){
	 $(this).addClass("hide-tag");
	 $(".book_slot_box").removeClass("hide-tag");
    });
	$(document).on("click",".cancel_appoint_btn",function(){
	 $(".appoint_btn").removeClass("hide-tag");
	 $(".book_slot_box").addClass("hide-tag");
    });
	
    $(document).on("click",".proceed-btn",function(){
	 $(".booking-field").removeClass("hide-tag");
    });
	
    $(document).on("click",".openlegend",function(){
	 $(".color-instruction").toggleClass("hide-tag");
    });
	
	// var top_offset=$(".lets_move_section").offset().top;
	// var header_height=$("header").outerHeight();
	// var setlandingOffset=top_offset-header_height;
// 	 $('.btn_mouse').click(function(){
// 	 $("html, body").animate({ scrollTop:setlandingOffset}, 600);
//     return false;
//   });
	
	
	
	
	
	$('#booking_legend').on('shown.bs.modal', function (e) {
		
     var now = new Date();
	var demoPicker = new Datepickk({
		container: document.querySelector('#demoPicker'),
		inline:true,
		range: true,
		tooltips: {
			date: new Date(),
			text: 'Tooltip'
		},
		highlight:{
			start: new Date(now.getFullYear(),now.getMonth(),3),
			end: new Date(now.getFullYear(),now.getMonth(),6),
			backgroundColor:'none',
			color:'#444c63'
			/* legend: 'Highlight' */
		}
	});
	
	});


$('.panel-collapse').on('show.bs.collapse', function () {
	$(this).siblings('.panel-heading').addClass('active');
});

$('.panel-collapse').on('hide.bs.collapse', function () {
	$(this).siblings('.panel-heading').removeClass('active');
});

$(".modeDropdown").click(function(e){
    e.stopPropagation(); 
});

$(".chat-btn").click(function(){
 $(".chat-box").toggleClass("chat-toggle");	
});
$(".chat-toggle").click(function(){
 $(".chat-box").removeClass("chat-toggle");	
});




});/* ==============Ready End============ */


