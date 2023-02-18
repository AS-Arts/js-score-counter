$(document).ready(function(){
	
	$(".album").hide();

	$('#go').on('click', function () {
		var players_sum = $("#players").val();
		
		if (players_sum > 12){
			var players_sum = 12;
		}

		for (i = 0; i < players_sum; i++) {

			var player_num = i + 1;
			$('#player-cards').append('<div class="col"><div class="card m-1" ><div class="card-header text-center bg-dark text-light py-5"><input type="text" class="form-control form-control-lg border border-0 text-center bg-dark text-light" placeholder="Player ' + player_num + '"><h6><span id="total" class="badge text-bg-primary me-1"><i class="bi bi-star-fill"></i></span><span id="average" class="badge text-bg-secondary"><i class="bi bi-circle-half"></i></span></h6></div><div class="card-body"><table class="table"><thead><tr><th scope="col">#</th><th scope="col"><i class="bi bi-star-fill"></i> Points</th></tr></thead><tbody><tr><td class="rounds">1</td><td><input type="number"class="form-control border border-0" placeholder="Round"></td></tr><tr><td class="rounds">2</td><td><input type="number"class="form-control border border-0" placeholder="Round"></td></tr><tr><td class="rounds">3</td><td><input type="number"class="form-control border border-0" placeholder="Round"></td></tr></tbody></table></div></div></div>')
		}
		
		$(".intro").hide();
		$(".album").show();

		$('.card').on('input', function () {
		
			// Counter
			var scorecount = 0;
			$('input', this).each(function () {
				var get_input_value = $(this).val();
				if ($.isNumeric(get_input_value)) {
					scorecount += parseFloat(get_input_value);
				}                  
			});	

			var input_filled = $('table :input', this).filter((i, el) => el.value.trim() !== '').filter((i, el) => el.value.trim() !== '-').length; 
			var score_average = scorecount / input_filled; 
			var score_average = Math.round(score_average);
			
			$('#total', this).html('<i class="bi bi-star-fill"></i> ' + scorecount);
			$('#average', this).html('<i class="bi bi-circle-half"></i> ' + score_average);
			
			// New round	
			if( $('table tr:last input' ,this).val().length !== 0 ) {		
				var nextround = parseFloat($('table tr:last td.rounds' ,this).text()) + 1;			 
				$('table tr:last' ,this).after('<tr><td class="rounds">' + nextround + '</td><td><input type="number" class="form-control border border-0" placeholder="Round"></td></tr>');
				var rowpos = $('table tr:last' ,this).position();
				$('.card-body' ,this).scrollTop(rowpos.top);
			}				
		});	
	});
});

// Notification Modal
$(function () {
	
	var modal_template_01 = '<div class="modal fade" tabindex="-1" role="dialog" id="modal"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content rounded-3 shadow"><div class="modal-body p-4 text-center"><h5 class="mb-0">';
	var modal_template_02 = 'Titel';
	var modal_template_03 = '</h5><p class="mb-0">';
	var modal_template_04 = 'Text';
	var modal_template_05 = '</p></div><div class="modal-footer flex-nowrap p-0">';
	var modal_template_06 = '<button type="button" id="';
	var modal_template_07 = 'Funktion';
	var modal_template_08 = '" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0 border-end">';
	var modal_template_09 = 'YES';
	var modal_template_10 = '</button><button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0" data-bs-dismiss="modal">';
	var modal_template_11 = 'NO';
	var modal_template_12 = '</button></div></div></div></div>';
	
	// Clean input 
	$("#restart").on('click', function() {

		var modal_template_02 = 'Warning!';
		var modal_template_04 = 'Do you really want to delete the entries?';
		var modal_template_07 = 'clean-form';

		$('#notify').html(modal_template_01 + modal_template_02 + modal_template_03 + modal_template_04 + modal_template_05 + modal_template_06 + modal_template_07 + modal_template_08 + modal_template_09 + modal_template_10 + modal_template_11 + modal_template_12);
		$("#modal").modal("show");

		$("#clean-form").on('click', function() {

			location.reload(true);
		
		});
					
	});
	
});