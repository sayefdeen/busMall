var imageContainer = document.getElementById("content-img");
var restLocalStorage = document.getElementById("rest");
restLocalStorage.addEventListener("click", function () {
  if (localStorage.length <= 0) {
    alert("You dont have local Storage");
  } else {
    localStorage.clear();
    alert("Your Local Storage has been cleared");
  }
});

// console.log(imageContainer.children[0].attributes.src.value);
// imageContainer.children[0].attributes.src.value = "../img/banana.jpg";
var jsonObject;
var allProducts = [];
var totalClicks = 10;
var allNames = [];
var clickPerRef = [];
var viewsPerRef = [];
var totalClicksArr = [];
var totalViewsArr = [];
var randomColors = [];
var nextArray = [];
var checkArr = [];

// Constructor

function Product(name, path) {
  this.name = name;
  this.path = path;
  this.numberOfViews = 0;
  this.numberOfClicks = 0;
  this.allNumberOfClicks = 0;
  this.allNumberOfViews = 0;

  allProducts.push(this);
  allNames.push(this.name);
}

// create Objects

var product1 = new Product("bag", "../img/bag.jpg");
var product2 = new Product("banana", "../img/banana.jpg");
var product3 = new Product("bathroom", "../img/bathroom.jpg");
var product4 = new Product("boots", "../img/boots.jpg");
var product5 = new Product("breakfast", "../img/breakfast.jpg");
var product6 = new Product("bubblegum", "../img/bubblegum.jpg");
var product7 = new Product("chair", "../img/chair.jpg");
var product8 = new Product("cthulhu", "../img/cthulhu.jpg");
var product9 = new Product("dragon", "../img/dragon.jpg");
var product10 = new Product("pen", "../img/pen.jpg");
var product11 = new Product("pet-sweep", "../img/pet-sweep.jpg");
var product12 = new Product("scissors", "../img/scissors.jpg");
var product13 = new Product("shark", "../img/shark.jpg");
var product14 = new Product("sweep", "../img/sweep.png");
var product15 = new Product("unicorn", "../img/unicorn.jpg");
var product16 = new Product("tauntaun", "../img/tauntaun.jpg");
var product17 = new Product("usb", "../img/usb.gif");
var product18 = new Product("water-can", "../img/water-can.jpg");

function generateRandomNumber() {
  var randomNumber = Math.floor(Math.random() * allProducts.length);
  return randomNumber;
}

function generateRAndomImage() {
  checkArr = nextArray;
  // console.log("Checked Array values " + checkArr);
  nextArray = [];

  for (var i = 0; i < 3; i++) {
    nextArray.push(generateRandomNumber());
  }

  while (
    nextArray[0] === nextArray[1] ||
    nextArray[1] === nextArray[2] ||
    nextArray[0] === nextArray[2]
  ) {
    nextArray[1] = generateRandomNumber();
    nextArray[2] = generateRandomNumber();
  }
  if (checkArr.length == 0) {
    nextArray = nextArray;
  } else {
    nextArray = hasMultible();
  }

  // console.log("Next Array values " + nextArray);

  for (var i = 0; i < imageContainer.children.length; i++) {
    var img = imageContainer.children[i];
    img.setAttribute("src", allProducts[nextArray[i]].path);
    img.setAttribute("name", allProducts[nextArray[i]].name);
    allProducts[nextArray[i]].numberOfViews++;
    allProducts[nextArray[i]].allNumberOfViews++;
  }
}
generateRAndomImage();

imageContainer.addEventListener("click", function clickgenerator() {
  var eventId = event.target.id;
  var elementName = event.target.name;
  console.log(elementName);
  if (eventId != "content-img") {
    if (totalClicks > 0) {
      for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].name === elementName) {
          allProducts[i].numberOfClicks++;
          allProducts[i].allNumberOfClicks++;
          break;
        }
      }
      generateRAndomImage();
      totalClicks--;
    } else {
      storeToLocalStorage();
      generateMessage();
      getAllClickAndViews();
      generateClickedChart();
      generateTotalChart();
      imageContainer.removeEventListener("click", clickgenerator);
    }
  }
});

function getRandomColor() {
  var letters = "0123456789ABCDEF";

  for (var j = 0; j < allProducts.length; j++) {
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    randomColors.push(color);
  }
}

function getAllClickAndViews() {
  console.log(jsonObject == null);
  if (jsonObject == null) {
    for (var i = 0; i < allProducts.length; i++) {
      clickPerRef.push(allProducts[i].numberOfClicks);
      viewsPerRef.push(allProducts[i].numberOfViews);
    }
    totalClicksArr = clickPerRef;
    totalViewsArr = viewsPerRef;
  } else {
    for (var i = 0; i < allProducts.length; i++) {
      clickPerRef.push(allProducts[i].numberOfClicks);
      viewsPerRef.push(allProducts[i].numberOfViews);
      totalClicksArr.push(jsonObject[i].allNumberOfClicks);
      totalViewsArr.push(jsonObject[i].allNumberOfViews);
    }
  }

  console.table(totalViewsArr);
  console.table(totalClicksArr);
}

function generateMessage() {
  var resultList = document.getElementById("result-list");
  var listItem;
  for (var i = 0; i < allProducts.length; i++) {
    listItem = document.createElement("li");
    listItem.textContent = `${allProducts[i].name} had ${allProducts[i].numberOfClicks} votes \n and was shown ${allProducts[i].numberOfViews} times`;
    resultList.appendChild(listItem);
  }
}

function generateClickedChart() {
  getRandomColor();
  var ctx = document.getElementById("eachTime");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: allNames,
      datasets: [
        {
          label: "Clicks each Time",
          data: clickPerRef,
          backgroundColor: randomColors,
          borderColor: randomColors,
          borderWidth: 1,
        },
        {
          label: "views each Time",
          data: viewsPerRef,
          backgroundColor: randomColors,
          borderColor: randomColors,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  myChart.canvas.parentNode.style.height = "100%";
  myChart.canvas.parentNode.style.width = "100%";
}

function generateTotalChart() {
  getRandomColor();
  var ctx = document.getElementById("totalResult");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: allNames,
      datasets: [
        {
          label: "Total Clicks",
          data: totalClicksArr,
          backgroundColor: randomColors,
          borderColor: randomColors,
          borderWidth: 1,
        },
        {
          label: "Total Views",
          data: totalViewsArr,
          backgroundColor: randomColors,
          borderColor: randomColors,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  myChart.canvas.parentNode.style.height = "100%";
  myChart.canvas.parentNode.style.width = "50%";
}

function hasDuplicates(array) {
  return new Set(array).size !== array.length;
}

function hasMultible() {
  for (var i = 0; i < checkArr.length; i++) {
    while (checkArr.indexOf(nextArray[i]) !== -1) {
      nextArray[i] = generateRandomNumber();
    }
  }
  while (hasDuplicates(nextArray)) {
    hasMultible();
  }
  return nextArray;
}

function storeToLocalStorage() {
  var jsonStringiyObject = JSON.stringify(allProducts);
  localStorage.setItem("products", jsonStringiyObject);
}
if (localStorage.length > 0) {
  returnLocalStorageObject();
}

function returnLocalStorageObject() {
  jsonObject = JSON.parse(localStorage["products"]);
  updateLocalStorage(jsonObject);
}

function updateLocalStorage(jsonObject) {
  for (let index = 0; index < allProducts.length; index++) {
    allProducts[index].allNumberOfClicks = jsonObject[index].allNumberOfClicks;
    allProducts[index].allNumberOfViews = jsonObject[index].allNumberOfViews;
  }
  console.log(jsonObject);
}
