
// [
//     {
//         "name": "example.md",
//         "last_modified": "2025-07-07T01:48:00.4960591Z",
//         "created": "2025-07-07T01:47:49.5008945Z",
//         "summary": { "title": "Example", "preview": "summary of the blog post", "preview_image": null }
//     }
// ]
async function GetBlogs() {
    return await (await fetch("/personal/api/blog/Blogs")).json();
}
async function GetBlogByName(name) {
    return await (await fetch(`/personal/api/blog/ByName/${name}`)).text();
}
async function RedirectToBlogView(name) {
    document.location.href = `/personal/blogView/${name}`;
}
async function GetBlogInfoByName(name) {
    return await (await fetch(`/personal/api/blog/InfoByName/${name}`)).json();
}
async function RefreshBlogs(adminPass) {
    await fetch("/personal/api/blog/RefreshBlogs", { method: "PATCH", body: adminPass.toString() });
}