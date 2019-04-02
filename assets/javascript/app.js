$(document).ready(function(){
  
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
   
    questions: {
      q1: 'Who killed Harrys parents?',
      q2: 'What type animal is Rons pet?',
      q3: 'Who does harry live with ?',
      q4: 'What shape is the scar on Harrys forhead?',
      q5: "Who was Harrys first love interest?",
      q6: 'What was Rons pets name?',
      q7: "What school class does Harry get put in to?"
    },
    options: {
      q1: ['Voldemort', 'Sirius Black', 'Hagrid', 'Snape'],
      q2: ['Fish', 'Cat', 'Owl', 'Rat'],
      q3: ['His siblings', 'Hagrid', 'Aunt and uncle', 'Ron'],
      q4: ['Ring', 'Snake', 'Lightning Bolt', 'Straight Slash'],
      q5: ['Hermione','Ginny','Luna','Cho'],
      q6: ['Scabbers','Gilbert','Scurry','Whiskers'],
      q7: ['Slytherin', 'Hufflepuff', 'Gryffindor','Ravenclaw']
    },
    answers: {
      q1: 'Voldemort',
      q2: 'Rat',
      q3: 'Aunt and uncle',
      q4: 'Lightning Bolt',
      q5: 'Cho',
      q6: 'Scabbers',
      q7: 'Gryffindor'
    },
    
    startGame: function(){
     
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      $('#game').show();
      
      $('#results').html('');
      
      $('#timer').text(trivia.timer);
      
      $('#start').hide();
  
      $('#remaining-time').show();
      
      trivia.nextQuestion();
      
    },
    nextQuestion : function(){
   
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    
    timerRunning : function(){
      
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1500);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
       
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
       
        $('#game').hide();
        
        
        $('#start').show();
      }
      
    },
    
    guessChecker : function() {
      
      var resultId;
    
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      if($(this).text() === currentAnswer){
        
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      else{
        
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Try Again! '+ currentAnswer +'</h3>');
      }
      
    },
    
    guessResult : function(){
      
      trivia.currentSet++;
      
      $('.option').remove();
      $('#results h3').remove();
      
      trivia.nextQuestion();
       
    }
  
  }