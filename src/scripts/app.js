let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
let input = document.getElementById("taskInput");

if (input.value === "") return;

tasks.push({ text: input.value, done: false });
input.value = "";
save();
render();
}

function toggle(i) {
tasks[i].done = !tasks[i].done;
save();
render();
}

function removeTask(i) {
tasks.splice(i, 1);
save();
render();
}

function render(filter = "all") {
let list = document.getElementById("taskList");
list.innerHTML = "";

let filtered = tasks.filter(t =>
filter === "all" ? true :
filter === "active" ? !t.done :
t.done
);

filtered.forEach((task, i) => {
let li = document.createElement("li");
li.innerHTML = `
<span onclick="toggle(${i})" class="${task.done ? 'done' : ''}">
${task.text}
</span>
<button onclick="removeTask(${i})">X</button>
`;
list.appendChild(li);
});

document.getElementById("counter").innerText =
"Total Tasks: " + tasks.length;
}

function filterTasks(type) {
render(type);
}

render();
