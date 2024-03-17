const TOPIC_URI = "http://localhost:3030/jsonstore/collections/myboard/posts/";
const COMMENTS_URI = "http://localhost:3030/jsonstore/collections/myboard/comments";

const main = document.querySelector("main");
const section = document.getElementById("comments");
const createCommentFormContainer = document.querySelector("div.answer-comment");
const form = createCommentFormContainer.querySelector("form");
form.addEventListener("submit", onSubmit);
createCommentFormContainer.remove();

let id = "";
section.remove();

export async function showDetails(ev) {
    id = ev ? ev.target.parentElement.dataset.id : id;
    const topic = await getTopic(id);
    const comments = await getAllCommentsById();
    const div = document.createElement("div");
    div.classList.add("comment");
    const topicElement = createTopicTemp(topic);
    div.appendChild(topicElement);
    Object.values(comments).forEach(comment => {
        const commentElement = createCommentTemp(comment)
        div.appendChild(commentElement)
    })

    section.replaceChildren(div);
    section.appendChild(createCommentFormContainer)

    main.replaceChildren(section)
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(...formData.entries());
    const postText = formData.get("postText");
    const username = formData.get("username");
    const date = new Date().getTime();
    createComment({postText, username, _topicId: id, date})
    showDetails();
}

async function getTopic(id) {
    const response = await fetch(TOPIC_URI + id);
    const data = await response.json();
    return data;
}

async function getAllCommentsById() {
    const response = await fetch(COMMENTS_URI);
    const data = await response.json();
    return Object.values(data).filter(x => x._topicId === id)
}

function createTopicTemp(data) {
    const date = new Date(data.createDate);
    
}
