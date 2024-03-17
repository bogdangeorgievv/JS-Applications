import { showDetails } from "./detailView.js";
import { getAllTopic } from "./requester.js";
const URL = "http://localhost:3030/jsonstore/collections/myboard/posts"

const main = document.querySelector("main");
const topicContent = document.querySelector("div.topic-title");
const section = document.querySelector("div.new-topic-border");
const form = section.querySelector("form");
const cancel = document.querySelector(".cancel");
cancel.addEventListener("click", clearForm);
form.addEventListener("submit", onSubmit);

section.remove();

export async function showHome(ev) {
    ev?.preventDefault(); // ev && ev.preventDefault()
    topicContent.innerHTML = '';
    const topics = await getAllTopic();
    Object.values(topics).forEach(topic => {
        const temp = createTopicTemp(topic)
        topicContent.appendChild(temp)
    })

    topicContent.querySelector("a")?.addEventListener("click", showDetails)

    main.replaceChildren(section);
    main.appendChild(topicContent);

}

function onSubmit(ev) {
    ev.preventDefault();
    const formData = new formData(ev.target);
    console.log(...formData.entries());

    const topicName = formData.get("topicName");
    const username = formData.get("username");
    const postText = formData.get("postText");
    const createDate = new Date().getTime();

    createTopic({topicName, username, postText, createDate})
}

async function createTopic(data) {
    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    clearForm();
    showHome();
}

function clearForm(ev) {
    ev?.preventDefault();
    form.reset();
}

function createTopicTemp(topic) {
    const div = document.createElement("div");
    div.classList.add("topic-container");
    div.innerHTML = `
    <div class="topic-name-wrapper">
        <div class="topic-name">
            <a href="#" class="normal" data-id=${topic._id}>
                <h2>${topic.topicName}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>Date: <time>${new Date(topic.createDate).toISOString()}</time></p>
                    <div class="nick-name">
                        <p>Username: <span>${topic.username}</span></p>
                    </div>
                </div>
            </div>
        </div>
    ` //може би още един </div>

    return div
}
