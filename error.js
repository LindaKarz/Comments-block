"use strict"
let comments = [];

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);
  
  async function formSend(e) {
    e.preventDefault();
    let error = formValidate(form);

    if (error === 0) {
      let comments = [];
      document.getElementById('button').onclick = function displayComment() {
        e.preventDefault();
        let userName = document.getElementById('user-name');
        let commentText = document.getElementById('comment-text');
        let commentDate = document.getElementById('date').value;

        if (commentDate == '') commentDate = Date.now();

        let date = new Date(commentDate).toISOString().substring(0,10);
        let time = new Date(commentDate).toISOString().substring(11, 19);
        
        let comment = {
          name: userName.value,
          content: commentText.value,
          date: date,
          time: time,
        }

        comments.push(comment);
        saveComments();
        showComments();
      }

      function saveComments() {
        localStorage.setItem('comments', JSON.stringify(comments));
      }

      function loadComment() {
        if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
        showComments();
      }

      function showComments() {
        let commentField = document.getElementById('comments');
        let div = document.createElement('div');
        div.id = 'comment';
        div.className = 'comment';
        commentField.append(div);
        let out = '';
        comments.forEach(function(item) {
          out += `<span class="remove"></span>`;
          out += `<span class="like"></span>`;
          out += `<p class="comment__date">${item.date}</p>`;
          out += `<p class="comment__time">${item.time}</p>`;
          out += `<p class="comment__user-name">Username: ${item.name}</p>`;
          out += `<p class="comment__content">Comment: <br>${item.content}</p>`;
        });
        div.innerHTML = out;
      }
    } 
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('.req');

    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      formRemoveError(input);

      if (input.classList.contains('user-name')) {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      } else if (input.classList.contains('comment-text')) {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add('error');
    input.classList.add('error');
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove('error');
    input.classList.remove('error');
  }
})
