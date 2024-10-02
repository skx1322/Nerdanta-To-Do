
function CollapseToggle(){ // function for animation display
        const projectList = $(".project-list");
        const arrow = $(".arrow-head")
        const projectHead = $(".project-header");

        projectList.slideToggle(300)
        arrow.toggleClass("rotate"); // I forgot toggle exist in jquery
        projectHead.toggleClass("active-title")
}

// might remove this
$(document).ready(function() { // Board-View + Add-View stuff 
        $('.view').on('click', function() {
            $('.view').removeClass('active-view');
            $(this).addClass('active-view');
        });
    });

    // project name listing.
$(document).ready(function(){
    var ProjectListCounter = 0;
    $(`.project-create-plus`).on(`click`, function(){
        if(ProjectListCounter<3){
        var newProjectList = `
            <li class="list-naming">Name</li>
        `;
        $(`.project-list`).append(newProjectList); 
        }
        else{
            alert("Limit Reached")
        }      
    })
})

// create new-template, need some fixing later
$(document).ready(function(){
    var ProjectCounter = 2;
    $(`.new-template`).on(`click`, function(){
    if (ProjectCounter <= 4){
        var newProjectTemplate =`
            <div class="collapse-container">
                <div class="project-header" onclick="CollapseToggle()">
                    <h2 class="first-project">Projects #${ProjectCounter}</h2>
                    <i class="fa-solid fa-arrow-right arrow-head"></i>
                </div>
                <ul class="project-list project-hidden">
                    <li class="list-naming">Empty</li>
                </ul>
            </div>
        `
        $(`.project-tab`).append(newProjectTemplate);
        ProjectCounter++;
    }
    else{
        alert(`Exceeded Project Counter`)
        return;
    }
    })
})

// function that allow Empty to be editable
$(document).ready(function(){
        $(`.list-naming`).click(function(){
                var currentText = $(this).text();
                var inputField = $(`<input type="text" class="edit-input" />`).val(currentText);
                $(this).html(inputField);
                inputField.focus();

                inputField.blur(function(){
                        var newText = $(this).val();
                        $(this).parent().text(newText);
                });
                inputField.keydown(function(event){
                        if (event.which === 13){
                                var newText = $(this).val();
                                $(this).parent().text(newText);
                        }
                })
        })
})

// user-name editable function

// the nav bar function part
$(document).ready(function() {
    $('.icon-container').click(function() {

        $('.icon-container').removeClass('icon-active');
        
        $(this).addClass('icon-active');

        if ($('.profile').parent().hasClass('icon-active')) {
            $('.profile-container').removeClass('task-hider');
            $('.task-container').addClass('task-hider');
        } else {
            $('.profile-container').addClass('task-hider');
            $('.task-container').removeClass('task-hider');
        }
    });
});


//clock function
var timezoneOffset = 8; 
function updateClock() {
    var now = new Date();
    var utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    var gmtTime = new Date(utc + (3600000 * timezoneOffset));
    var hours = gmtTime.getHours();
    var minutes = gmtTime.getMinutes();
    var seconds = gmtTime.getSeconds();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    $('.current-clock').text(strTime);
}

$(document).ready(function() {
    updateClock();
    setInterval(updateClock, 1000);

    $('.save-btn').click(function() {
        var selectedOffset = $('#timezone-offset').val();
        timezoneOffset = parseFloat(selectedOffset);
        updateClock();
    });
});


//date script, constantly update
$(document).ready(function() {
    var currentDate = new Date();
    
    var formattedDate = currentDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).replace(/ /g, ' ');

    $('.current-date').text(formattedDate);
});

// main-task-container script
$(document).ready(function() {
    // for click to input new text
    function updateText(inputField, originalText) {
        var newText = inputField.val().trim();
        if (newText !== "") {
            inputField.parent().text(newText);
        } else {
            inputField.parent().text(originalText);
        }
    }

    // for editable text function
    function makeEditable(element) {
        var currentText = element.text();
        var inputField = $('<input type="text" class="edit-input" />').val(currentText);
        element.html(inputField);
        inputField.focus();
        inputField.blur(function() {
            updateText($(this), currentText);
        });
        inputField.keypress(function(event) {
            if (event.which == 13) {  // keyboard input lore
                updateText($(this), currentText);
            }
        });
    } // this function is for editable text on click

    // for upper-text, activate function
    $(document).on('click', '.upper-text', function() {
        makeEditable($(this));
    });

    // for bottom-text click, activate function makeEditable
    $(document).on('click', '.bottom-text', function() {
        makeEditable($(this));
    });

    // this is for category 1, 2 and 3 unique counter using object programming
    var taskCounts = {
        do: 0, 
        progress: 0,
        done: 0
    };//an OOP for counter
    // date
    $(document).on('click', '.date-box', function() {
        $('#date-modal').data('target', $(this)).fadeIn(); 
    }); // on click on date-box, popup appear

    $(document).on('click', '.close', function() {
        $('#date-modal').fadeOut(); 
    }); // on click close, popup disappea ramong the sea of butterfly

    // jQuery calender function, 
    $('#date-picker').change(function() {
        var selectedDate = $(this).val();
        var formattedDate = new Date(selectedDate).toLocaleDateString('en-SG', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });

        // when calender date selected, update the date-box 
        var targetDateBox = $('#date-modal').data('target');
        targetDateBox.find('#selected-date').text(formattedDate);

        $('#date-modal').fadeOut();// and close popup
    });

    // function for logic case statement to sort out whether it'll be category 1, 2 or 3.
    function updateTaskCount(category) {
        switch (category) {
            case 'do':
                $('#to-do').text(`Category #1 (${taskCounts.do})`);
                break;
            case 'progress':
                $('#in-progress').text(`Category #2 (${taskCounts.progress})`);
                break;
            case 'done':
                $('#to-done').text(`Category #3 (${taskCounts.done})`);
                break;
        }
    }
    // create main-task-container, no more than 10 container
    function addTask(category) {
        if (taskCounts[category] < 10) { // Adjust task limit
            var containerId = `task-container-${category}-${taskCounts[category]}`;
            var newTaskHTML = `
                <div class="main-task-container" id="${containerId}">
                    <div class="top-sec">
                        <div class="title">
                            <h2 class="upper-text">Project Name #</h2>
                            <h2 class="bottom-text">Information #</h2>
                        </div>
                        <div class="more-icon">
                            <i class="fa-solid fa-trash"></i>
                        </div>
                    </div>
                    <div class="progress">
                        <div class="progress-top">
                            <div class="progress-text">
                                <img src="Images/Progress.png" alt="pro" class="progress-setting">
                                <h2>Progress</h2>
                            </div>
                            <div class="progress-text">
                                <h2>0/0</h2>
                            </div>
                        </div>
                        <div class="progress-bottom">
                            <div class="progress-bar" style="width: 100%;"></div>
                        </div>
                    </div>
                    <div class="bottom-sec">
                        <div class="date-box" id="date-box">
                            <h2 id="selected-date">Day/Month/Year</h2>
                        </div>
                        <div class="comment-link">
                            <div class="comment comment-link-box">
                                <img src="Images/Comment.png" alt="comment" class="comment-icon">
                                <h2 class="comment-num">0</h2>
                            </div>
                            <div class="link comment-link-box">
                                <img src="Images/Link.png" alt="Link" class="comment-icon">
                                <h2 class="comment-num">0</h2>
                            </div>
                        </div>
                    </div>
                    <div class="todo-popup" style="display: none;">
                        <div class="modal-content-todo">
                            <h2>To-Do List</h2>
                            <input type="text" id="todo-input" placeholder="Add a new task">
                            <button id="add-task-btn">Add Task</button>
                            <ul id="todo-list"></ul>
                            <button class="close">Close</button>
                        </div>
                    </div>
                </div>
            `; // set variable as the whole HTML create

            // depending on category logic-statement
            switch (category) {
                case 'do':
                    $('.container-do').append(newTaskHTML);
                    break;
                case 'progress':
                    $('.container-progress').append(newTaskHTML);
                    break;
                case 'done':
                    $('.container-done').append(newTaskHTML);
                    break;
            }

            taskCounts[category]++;
            updateTaskCount(category);
        } else {
            alert('Max 10 tasks allowed.');
        }
    }

    // once done, trigger function depending on category
    $('.new-task-do').click(function() {
        addTask('do');
    });

    $('.new-task-pro').click(function() {
        addTask('progress');
    });

    $('.new-task-done').click(function() {
        addTask('done');
    });

    // To-Do-List inside the progress-box in each task
    // popup function for to-do-list 
    $(document).on('click', '.progress-top', function() {
        $(this).closest('.main-task-container').find('.todo-popup').fadeIn();
    });
    $(document).on('click', '.close', function() {
        $(this).closest('.todo-popup').fadeOut();
    });

    // function that create the to-do-list each time a new container is created
    $(document).on('click', '#add-task-btn', function() {
        var newTask = $(this).siblings('#todo-input').val().trim();
        var todoList = $(this).siblings('#todo-list');
        if (newTask !== "") {
            todoList.append(`
                <li>
                    <input type="checkbox" class="task-checkbox">
                    <span class="task-text">${newTask}</span>
                    <button class="delete-task">Delete</button>
                </li>
            `); // to-do-list html.
            $(this).siblings('#todo-input').val(''); // clear input field
            updateProgress(todoList);
        }
    });

    // function to update to-do-list bar
    $(document).on('change', '.task-checkbox', function() {
        var todoList = $(this).closest('.todo-popup').find('#todo-list');
        updateProgress(todoList);
    });
    $(document).on('click', '.delete-task', function() {
        $(this).closest('li').remove();
        var todoList = $(this).closest('.todo-popup').find('#todo-list');
        updateProgress(todoList);
    });

    // this is hella complex aka progress bar, I'm going insane 
    // function to update progress on to-do-list
    function updateProgress(todoList) {
        var totalTasks = todoList.children('li').length;
        var completedTasks = todoList.find('.task-checkbox:checked').length;
        var progressText = todoList.closest('.main-task-container').find('.progress-text:last');
        progressText.text(`${completedTasks}/${totalTasks}`);
        var progressPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        todoList.closest('.main-task-container').find('.progress-bar').css('width', `${progressPercent}%`);
    }

    // on click, popup confirmation, if confirm delete, else don't
    $(document).on('click', '.more-icon', function() {
        var container = $(this).closest('.main-task-container');
        
        // Determine the category before removing the container
        var category;
        if (container.closest('.container-do').length > 0) {
            category = 'do';
        } else if (container.closest('.container-progress').length > 0) {
            category = 'progress';
        } else if (container.closest('.container-done').length > 0) {
            category = 'done';
        }
    
        if (confirm("Are you sure you want to delete this task?")) {
            // Update the task count before removing the container
            taskCounts[category]--;
            updateTaskCount(category);
    
            // Now remove the container
            container.remove();
        }
    });
//function activation
    updateTaskCount('do');
    updateTaskCount('progress');
    updateTaskCount('done');
});


//profile-setting section
$(document).ready(function() {
    // Trigger the file input when the profile picture container is clicked
    $('#profile-picture-container').click(function() {
        $('#upload-profile-picture').click();
    });

    // Listen for file input change
    $('#upload-profile-picture').change(function(event) {
        const file = event.target.files[0];

        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const newImageSrc = e.target.result;

                $('.profile-picture').attr('src', newImageSrc);
            };

            reader.readAsDataURL(file);
        } else {
            alert("Please upload a valid JPG or PNG image.");
        }
    });
});

// profile name-details update
$(document).ready(function() {
    $('.save-btn').click(function() {
        // assign variable
        var fullName = $('#Full-Name').val().trim();
        var gender = $('#Gender').val();
        var nickName = $(`#Nick-Name`).val().trim();
        
        //logic statement depending on gender 
        var title = "";
        if (gender === "Male") {
            title = "Mr.";
        } else if (gender === "Female") {
            title = "Ms.";
        }

        // update the greeting
        if (fullName && nickName) {
            $('#greeting').html("Welcome back, <b class='user-name'>" + title + " " + fullName + " a.k.a " + nickName +"</b>");
            $(`.profile-name`).html(title + " " + fullName);
        }
        else if (fullName){
            $('#greeting').html("Welcome back, <b class='user-name'>" + title + " " + fullName + "</b>");
            $(`.profile-name`).html(title + " " + fullName);
        }
    });
});



// Function need include:

// Create Active-Tags for project-list
// Create create new task function

// Profile-Picture function
// Calender function

// New-template function that delete previous last if confirmed

// Filter/Sort function maybe?

// Light/Dark mode function

