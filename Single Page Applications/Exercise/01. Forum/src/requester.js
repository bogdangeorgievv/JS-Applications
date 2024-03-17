async function createComment(data) {
    const response = await fetch(COMMENTS_URI, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(data)
    })
}

async function getAllTopic() {
    const response = await fetch(URI);
    const data = await response.json();
    return data
}

export {
    getAllTopic,
    
}
