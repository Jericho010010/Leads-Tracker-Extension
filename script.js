let myLeads = [];
const inputElement = document.querySelector(".input-el");
const saveBtn = document.querySelector(".save-btn");
const tabBtn = document.querySelector(".tab-btn");
const deleteBtn = document.querySelector(".delete-btn");
const ulElement = document.querySelector(".ul-el");

const savedLink = JSON.parse(localStorage.getItem("myLeads"));

if (savedLink) {
  myLeads = savedLink;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (!myLeads.includes(tabs[0].url)) myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `<i><a target="_blank" href="${leads[i]}">${leads[i]}</a></i>`;
  }
  ulElement.innerHTML = listItems;
}

saveBtn.addEventListener("click", function () {
  if (!myLeads.includes(inputElement.value)) {
    myLeads.push(inputElement.value);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    inputElement.value = "";
    render(myLeads);
  }
});

deleteBtn.addEventListener("dblclick", function () {
  myLeads = [];
  localStorage.removeItem("myLeads");
  render(myLeads);
});
