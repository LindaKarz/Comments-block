"use strict"
let comments = [];

document.getElementById('button').onclick = function displayComment() {
  event.preventDefault;
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

function showComments() {
  let commentField = document.getElementById('comments');
  let div = document.createElement('div');
  div.id = 'comment';
  commentField.append(div);
  let out = '';
  comments.forEach(function(item) {
    out = `<p class="comment__date">${item.date}</p>`;
    out += `<p class="comment__time">${item.time}</p>`;
    out += `<p class="comment__user-name">${item.name}</p>`;
    out += `<p class="comment__content">${item.content}</p>`;
  });
  div.innerHTML = out;
}