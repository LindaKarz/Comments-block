"use strict"
let comments = [];

document.addEventListener('DOMContentLoaded', async function() {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);
  
  async function formSend(e) {
    e.preventDefault();
    let error = formValidate(form);

    if (error === 0) {
      let comments = [];
      document.getElementById('button').onclick = async function displayComment() {
        let userName = document.getElementById('user-name');
        let commentText = document.getElementById('comment-text');
        let commentDate = document.getElementById('date').value;
        
        if (commentDate == '') commentDate = Date.now();
        
        let date = new Date(commentDate).toISOString().substring(0,10);
        let time = new Date(commentDate).toISOString().substring(11, 19);

        let nowDate = new Date;
        if (Number(date[8]+date[9]) == nowDate.getDate()) date = "today";
        if (Number(date[8]+date[9]) == (nowDate.getDate() - 1)) date = "yesterday", time = `${nowDate.getHours()}:${nowDate.getMinutes()}`;

        let comment = {
          name: userName.value,
          content: commentText.value,
          date: date,
          time: time,
        }
      
        comments.push(comment);
        saveComments();
        showComments();
        removeComments();
        addLike();
      }

      function saveComments() {
        localStorage.setItem('comments', JSON.stringify(comments));
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

      function removeComments() {
        let deleteButton = document.querySelectorAll('.remove');
        for (let item of deleteButton){
          item.onclick = function() {
            item.parentElement.remove();
          };
        }
      }

      function addLike() {
        let likeButton = document.querySelectorAll('.like');
        for (let item of likeButton) {
          item.onclick = function() {
            item.classList.toggle('active')
          }
        }
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

