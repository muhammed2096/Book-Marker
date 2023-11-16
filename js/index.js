var nameInput = document.getElementById("nameInput");
var urlInput = document.getElementById("urlInput");
var submitBtn = document.getElementById("submitBtn");
var siteList = [];

if(localStorage.getItem("bookmarks") != null){
    siteList =JSON.parse(localStorage.getItem("bookmarks"));
    displaySite(siteList)
}

submitBtn.onclick = function addSite() {
  if (nameInput.value === "" || urlInput.value === "") {
    alert("Please enter both the site name and URL.");
    return;
  }

  if (!validateSiteUrl()) {
    return;
  }

  var bookmarks = {
    name: nameInput.value,
    url: urlInput.value
  };

  for (var i = 0; i < siteList.length; i++) {
    if (bookmarks.url === siteList[i].url) {
      alert("This site already exists in the list.");
      return;
    }
  }

  siteList.push(bookmarks);
  localStorage.setItem("bookmarks", JSON.stringify(siteList));
  displaySite(siteList);
  clearForm();
}
function clearForm(){
    nameInput.value = "";
    urlInput.value = "";
}
function displaySite(){
        var box = "";
        for(var i = 0; i < siteList.length; i++){
            box += `<tr>
              <td>${i+1}</td>
              <td>${siteList[i].name}</td>
              <td><a href= "${siteList[i].url}" target="_blank"><button type="button" id="visitBtn"  class="btn btn-success btn-sm">Visit</button></a></td>
              <td><button type="button" onclick = "deleteSite(${i})" class="btn btn-danger btn-sm">Delete</button></td>
            </tr>`;
        }
        document.getElementById("tbody").innerHTML = box;
        
    }
    function deleteSite(index){
        siteList.splice(index, 1)
            localStorage.setItem("bookmarks" , JSON.stringify(siteList))
            displaySite(siteList)
}

function validateSiteName() {
    if (nameInput.value === "") {
      document.getElementById("wrongName").classList.remove("d-none");
      return false;
    } else {
      var regexName = /[A-Za-z_]$/;
      if (regexName.test(nameInput.value) == true) {
        document.getElementById("wrongName").classList.add("d-none");
        return true;
      } else {
        document.getElementById("wrongName").classList.remove("d-none");
        return false;
      }
    }
  };
function validateSiteUrl(){
       if(urlInput.value === ""){
        document.getElementById("wrongUrl").classList.remove("d-none");
        return false;
       }else{
        var regexUrl = /^(https:\/\/)?(www\.)?[A-za-z0-9_\.]{1,}\.[a-z]{3}$/;
    
        if(regexUrl.test(urlInput.value)== true){
            document.getElementById("wrongUrl").classList.add("d-none");
            return true;
        }else{
            document.getElementById("wrongUrl").classList.remove("d-none");
            return false;
        }
       }
    
};


